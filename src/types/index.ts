// Тип для методов, которые отправляют данные на сервер
export type ApiPostMethods = "POST" | "PUT" | "DELETE";

// Интерфейс для API, описывающий методы взаимодействия с сервером
export interface IApi {
  // Получение данных по указанному URI, возвращает промис с объектом типа T
  get<T extends object>(uri: string): Promise<T>;
  // Отправка данных на сервер (POST, PUT, DELETE), возвращает промис с объектом типа T
  post<T extends object>(
    uri: string,
    data: object,
    method?: ApiPostMethods,
  ): Promise<T>;
}

// Интерфейс для описания товара
export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: string;
  price: number | null;
}

// Интерфейс для данных покупателя
export interface IBuyer {
  payment?: TPayment;
  email: string;
  phone: string;
  address: string;
}

// Тип, перечисляющий доступные способы оплаты
export type TPayment = "online" | "cash" | "";

// Интерфейс для ответа сервера, содержащего список товаров и их количество
export interface IProductResponse {
  total: number;
  items: IProduct[];
}

// Интерфейс для формирования данных заказа, отправляемых на сервер
export interface IOrderData extends IBuyer {
  items: string[];
  total: number;
}

// Интерфейс для ответа сервера после успешного создания заказа
export interface IOrderResponse {
  id: string;
  total: number;
}
