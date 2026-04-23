import { IProduct } from "../../../types";
import { EventEmitter } from "../Events";

// Класс для управления каталогом товаров
export class ProductCatalog {
  private allProducts: IProduct[] = [];
  private selectedProduct: IProduct | null = null;
  private events = new EventEmitter();

  // Возвращает массив всех товаров, загруженных в каталог
  public getAllProducts(): IProduct[] {
    return this.allProducts;
  }

  // Возвращает товар, который выбран в данный момент
  public getSelectedProduct(): IProduct | null {
    return this.selectedProduct;
  }

  // Полностью заменяет текущий список товаров в каталоге новыми данными
  public setAllProducts(products: IProduct[]): void {
    const previousProducts = [...this.allProducts];
    this.allProducts = products;
    this.events.emit("catalog:productsUpdated", {
      previousProducts,
      currentProducts: products,
    });
  }

  // Ищет товар в каталоге по его уникальному идентификатору
  public getProductById(id: string): IProduct | undefined {
    return this.allProducts.find((p) => p.id === id);
  }

  // Используется для открытия карточки товара
  public selectProduct(product: IProduct): void {
    const previous = this.selectedProduct;
    this.selectedProduct = product;
    this.events.emit("catalog:productSelected", { product, previous });
  }

  // Подписка на события каталога
  public on(event: string, callback: (data?: any) => void): void {
    this.events.on(event, callback);
  }
}
