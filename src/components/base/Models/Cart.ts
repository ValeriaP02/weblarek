import { IProduct } from "../../../types";

// Класс Cart представляет корзину покупок
export class Cart {
  private items: IProduct[] = [];

  // Метод для получения всех товаров из корзины
  public getItems(): IProduct[] {
    console.log("Cart: Получение всех товаров из корзины.");
    return this.items;
  }

  // Метод для добавления товара в корзину
  public addItem(product: IProduct): void {
    // Проверяет, есть ли товар с таким ID уже в корзине
    if (!this.hasItem(product.id)) {
      this.items.push(product);
      // Если нет, добавляет товар в массив items
      console.log(
        `Cart: Товар "${product.title}" (ID: ${product.id}) добавлен в корзину.`,
      );
    } else {
      // Если товар уже есть, выводит сообщение
      console.log(
        `Cart: Товар "${product.title}" (ID: ${product.id}) уже есть в корзине.`,
      );
    }
  }

  // Метод для удаления товара из корзины по его ID
  public removeItem(productId: string): void {
    const initialLength = this.items.length;
    // Фильтруем массив, оставляя только те товары, ID которых не совпадает с удаляемым
    this.items = this.items.filter((item) => item.id !== productId);

    // Проверяет, уменьшилось ли количество товаров
    if (this.items.length < initialLength) {
      console.log(`Cart: Товар с ID ${productId} удален из корзины.`);
    } else {
      console.log(`Cart: Товар с ID ${productId} не найден в корзине.`);
    }
  }

  // Метод для получения общего количества товаров в корзине
  public getItemCount(): number {
    const count = this.items.length; // Получаем длину массива товаров
    console.log(`Cart: Получение количества товаров. Всего: ${count}`);
    return count;
  }

  // Метод для расчета общей стоимости всех товаров в корзине
  public getTotalPrice(): number {
    const total = this.items.reduce((sum, item) => {
      // Добавляет цену товара к сумме, если цена не null, иначе добавляет 0
      return sum + (item.price !== null ? item.price : 0);
    }, 0); // Начальное значение суммы - 0
    console.log(`Cart: Расчет общей стоимости. Итог: ${total}`);
    return total;
  }

  // Метод для проверки наличия товара в корзине по его ID
  public hasItem(productId: string): boolean {
    // Проверяет, существует ли хотя бы один товар с указанным ID
    const has = this.items.some((item) => item.id === productId);
    console.log(
      `Cart: Проверка наличия товара с ID ${productId}. Есть: ${has}`,
    );
    return has;
  }

  // Метод для полной очистки корзины
  public clearCart(): void {
    this.items = [];
    console.log("Cart: Корзина очищена.");
  }
}
