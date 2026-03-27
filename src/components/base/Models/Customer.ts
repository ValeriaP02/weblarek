import { IBuyer, TPayment } from "../../../types";

// Класс Customer представляет собой покупателя и хранит его данные
export class Customer {
  private payment?: TPayment;
  private email?: string;
  private phone?: string;
  private address?: string;

  // Метод для валидации данных покупателя
  public validateData(): boolean {
    // Проверяет, что все необходимые поля (email, phone, address, payment) заполнены
    const isValid =
      !!this.email &&
      !!this.phone &&
      !!this.address &&
      this.payment !== undefined &&
      this.payment !== null;

    console.log(
      `Customer: Валидация данных. Email: ${!!this.email}, Телефон: ${!!this.phone}, Адрес: ${!!this.address}, Оплата: ${this.payment !== undefined && this.payment !== null}. Результат: ${isValid}`,
    );
    return isValid;
  }

  // Метод для сохранения данных покупателя
  public saveData(buyerData: IBuyer): void {
    this.email = buyerData.email;
    this.phone = buyerData.phone;
    this.address = buyerData.address;
    this.payment = buyerData.payment;

    console.log("Customer: Данные сохранены.", {
      email: this.email,
      phone: this.phone,
      address: this.address,
      payment: this.payment,
    });
  }

  // Метод для получения всех данных покупателя
  public getAllData(): IBuyer {
    // Проверяет, заполнены ли все необходимые поля. Если нет, выбрасывает ошибку
    if (!this.email || !this.phone || !this.address || !this.payment) {
      throw new Error("Данные покупателя не полные.");
    }
    return {
      email: this.email,
      phone: this.phone,
      address: this.address,
      payment: this.payment,
    };
  }

  // Метод для очистки всех данных покупателя
  public clearCustomerData(): void {
    this.email = undefined;
    this.phone = undefined;
    this.address = undefined;
    this.payment = undefined;
    console.log("Customer: Данные покупателя очищены.");
  }
}
