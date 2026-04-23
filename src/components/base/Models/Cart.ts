import { IProduct } from "../../../types";
import { EventEmitter } from "../Events";

// Класс, представляющий корзину товаров
export class Cart {
  private items: IProduct[] = [];
  private events = new EventEmitter();

  // Возвращает список всех товаров в корзине
  public getItems(): IProduct[] {
    return this.items;
  }

  // Добавляет товар в корзину, если его там еще нет
  public addItem(product: IProduct): void {
    if (!this.hasItem(product.id)) {
      this.items.push(product);
      this.events.emit("cart:itemAdded", { productId: product.id });
    }
  }

  // Удаляет товар из корзины по идентификатору
  public removeItem(productId: string): void {
    const item = this.items.find((item) => item.id === productId);
    if (item) {
      this.items = this.items.filter((item) => item.id !== productId);
      this.events.emit("cart:itemRemoved", { productId });
    }
  }

  // Возвращает общее количество товаров в корзине
  public getItemCount(): number {
    return this.items.length;
  }

  // Рассчитывает суммарную стоимость всех товаров в корзине
  public getTotalPrice(): number {
    const total = this.items.reduce((sum, item) => {
      return sum + (item.price !== null ? item.price : 0);
    }, 0);
    return total;
  }

  // Проверяет, содержится ли товар в корзине
  public hasItem(productId: string): boolean {
    return this.items.some((item) => item.id === productId);
  }

  // Полностью очищает содержимое корзины
  public clearCart(): void {
    const previousItems = [...this.items];
    this.items = [];
    this.events.emit("cart:cleared", { items: previousItems });
  }

  // Подписка на события корзины
  public on(event: string, callback: (data?: any) => void): void {
    this.events.on(event, callback);
  }
}
