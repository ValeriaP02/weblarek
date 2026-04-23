import { BaseForm } from "./BaseForm";
import { IBuyer, TPayment } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../Events";

// Тип, описывающий состояние формы заказа (способ оплаты и адрес)
export type IOrder = Pick<IBuyer, "payment" | "address"> & {
  enable: boolean;
  error: object;
};

// Компонент формы оформления заказа
export class Order extends BaseForm<IOrder> {
  protected cardElement: HTMLButtonElement;
  protected cashElement: HTMLButtonElement;
  protected addressElement: HTMLInputElement;

  // Конструктор инициализирует элементы выбора оплаты, поле адреса и вешает слушатели событий
  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);
    this.cardElement = ensureElement<HTMLButtonElement>(
      '[name="card"]',
      this.container,
    );
    this.cashElement = ensureElement<HTMLButtonElement>(
      '[name="cash"]',
      this.container,
    );
    this.addressElement = ensureElement<HTMLInputElement>(
      '[name="address"]',
      this.container,
    );

    // Установка онлайн-оплаты при клике
    this.cardElement.addEventListener("click", () => {
      this.events.emit("buyer:set", { payment: "online" });
    });

    // Установка оплаты при получении при клике
    this.cashElement.addEventListener("click", () => {
      this.events.emit("buyer:set", { payment: "cash" });
    });

    // Генерация события при вводе адреса
    this.addressElement.addEventListener("input", () => {
      this.events.emit("buyer:set", { address: this.addressElement.value });
    });

    // Обработчик отправки формы заказа
    this.container.addEventListener("submit", (event: SubmitEvent) => {
      event.preventDefault();
      this.events.emit("order:close");
    });
  }

  // Переключает активные классы кнопок в зависимости от выбранного метода оплаты
  set payment(value: TPayment) {
    this.cardElement.classList.toggle("button_alt-active", value === "online");
    this.cashElement.classList.toggle("button_alt-active", value === "cash");
  }

  // Устанавливает значение в поле адреса
  set address(value: string) {
    this.addressElement.value = value;
  }

  // Возвращает корневой элемент формы
  render(): HTMLElement {
    return this.container;
  }
}
