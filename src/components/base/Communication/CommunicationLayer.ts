import { IApi } from "../../../types";
import { IProductResponse, IOrderData } from "../../../types";

// Класс CommunicationLayer для взаимодействия с API (слой коммуникации)
export class CommunicationLayer {
  // Приватное поле для хранения объекта API
  private api: IApi;

  // Конструктор класса, принимает объект API и сохраняет его для дальнейшего использования
  constructor(api: IApi) {
    this.api = api;
  }

  // Метод для получения списка продуктов
  async fetchProducts(): Promise<IProductResponse> {
    const response = await this.api.get<IProductResponse>("/product/");
    return response; // Возвращает полученные данные
  }

  // Метод для отправки заказа
  async sendOrder(
    orderData: IOrderData,
  ): Promise<{ confirmation: string; totalAmount: number }> {
    const response = await this.api.post<{
      confirmation: string; // Подтверждение заказа
      totalAmount: number; // Итоговая сумма заказа
    }>("/order/", orderData);
    return response; // Возвращает ответ с подтверждением и суммой
  }
}
