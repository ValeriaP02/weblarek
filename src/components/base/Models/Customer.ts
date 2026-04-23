import { IBuyer, TPayment } from "../../../types";
import { EventEmitter } from "../Events";

// Тип для хранения ошибок валидации данных покупателя
type CustomerErrors = Partial<Record<keyof IBuyer, string>>;

// Класс, отвечающий за управление данными покупателя
export class Customer {
  private payment: TPayment = "";
  private email: string = "";
  private phone: string = "";
  private address: string = "";
  private events = new EventEmitter();

  // Проверяет заполненность обязательных полей профиля
  public validateData(): CustomerErrors {
    const errors: CustomerErrors = {};
    if (!this.email) {
      errors.email = "необходимо указать email";
    }
    if (!this.phone) {
      errors.phone = "необходимо указать телефон";
    }
    if (!this.address) {
      errors.address = "необходимо указать адрес";
    }
    if (!this.payment) {
      errors.payment = "необходимо указать способ оплаты";
    }
    return errors;
  }

  // Частично или полностью обновляет данные покупателя
  public saveData(buyerData: Partial<IBuyer>): void {
    const changes: Partial<IBuyer> = {};

    if (buyerData.email !== undefined) {
      this.email = buyerData.email;
      changes.email = buyerData.email;
    }
    if (buyerData.phone !== undefined) {
      this.phone = buyerData.phone;
      changes.phone = buyerData.phone;
    }
    if (buyerData.address !== undefined) {
      this.address = buyerData.address;
      changes.address = buyerData.address;
    }
    if (buyerData.payment !== undefined) {
      this.payment = buyerData.payment;
      changes.payment = buyerData.payment;
    }

    if (Object.keys(changes).length > 0) {
      this.events.emit("customer:dataUpdated", changes);
    }
  }

  // Возвращает текущее состояние данных покупателя в виде объекта
  public getAllData(): IBuyer {
    return {
      email: this.email,
      phone: this.phone,
      address: this.address,
      payment: this.payment,
    };
  }

  // Сбрасывает все поля данных покупателя к начальным значениям
  public clearCustomerData(): void {
    const previousData = this.getAllData();
    this.email = "";
    this.phone = "";
    this.address = "";
    this.payment = "";
    this.events.emit("customer:cleared", previousData);
  }

  // Подписка на события изменения данных покупателя
  public on(event: string, callback: (data?: any) => void): void {
    this.events.on(event, callback);
  }
}
