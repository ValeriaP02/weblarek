import { IProduct } from "../../../types";

// Класс ProductCatalog представляет каталог товаров
export class ProductCatalog {
  private allProducts: IProduct[] = [];
  private selectedProduct: IProduct | null = null;

  // Метод для получения списка всех товаров из каталога
  public getAllProducts(): IProduct[] {
    console.log("ProductCatalog: Получение всех товаров.");
    return this.allProducts;
  }

  // Метод для сохранения (добавления или обновления) товара в каталоге
  public saveProduct(product: IProduct): void {
    // Ищет индекс товара с таким же ID среди существующих
    const existingProductIndex = this.allProducts.findIndex(
      (p) => p.id === product.id,
    );
    if (existingProductIndex > -1) {
      // Если товар с таким ID уже существует, обновляем его
      this.allProducts[existingProductIndex] = product;
      console.log(`ProductCatalog: Товар с ID ${product.id} обновлен.`);
    } else {
      // Если товара с таким ID нет, добавляем новый товар
      this.allProducts.push(product);
      console.log(`ProductCatalog: Товар с ID ${product.id} добавлен.`);
    }
    //
    if (this.selectedProduct && this.selectedProduct.id === product.id) {
      this.selectedProduct = product;
    }
  }

  // Метод для получения текущего выбранного товара
  public getSelectedProduct(): IProduct | null {
    console.log("ProductCatalog: Получение выбранного товара.");
    return this.selectedProduct; // Возвращает выбранный товар или null
  }

  // Метод для полной замены всего списка товаров в каталоге
  public setAllProducts(products: IProduct[]): void {
    console.log(
      `ProductCatalog: Установка всех товаров, количество: ${products.length}`,
    );
    this.allProducts = products;
    this.selectedProduct = null;
  }

  // Метод для получения конкретного товара по его ID
  public getProductById(id: string): IProduct | undefined {
    console.log(`ProductCatalog: Получение товара по ID: ${id}`);
    // Ищет товар в массиве allProducts по совпадению ID
    const product = this.allProducts.find((p) => p.id === id);
    return product; // Возвращаем найденный товар или undefined, если товар не найден
  }

  // Метод для установки конкретного товара в качестве выбранного
  public selectProduct(productId: string): void {
    const product = this.getProductById(productId); // Получаем товар по ID
    this.selectedProduct = product || null; // Устанавливаем найденный товар как выбранный, или null, если товар не найден
    console.log(
      `ProductCatalog: Товар с ID ${productId} выбран.`,
      this.selectedProduct,
    );
  }
}
