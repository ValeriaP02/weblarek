import { BaseForm } from "./BaseForm";
import { IBuyer } from "../../../types";
import { ensureElement } from "../../../utils/utils";
import { IEvents } from "../Events";

// Тип, описывающий состояние формы контактных данных для отрисовки
export type IContacts = Pick<IBuyer, "email" | "phone"> & {
  enable: boolean;
  error: object;
};

// Компонент формы ввода контактных данных (email и телефон)
export class Contacts extends BaseForm<IContacts> {
  protected emailElement: HTMLInputElement;
  protected phoneElement: HTMLInputElement;

  // Конструктор инициализирует элементы ввода и настраивает слушатели событий ввода и отправки
  constructor(container: HTMLElement, events: IEvents) {
    super(container, events);
    this.emailElement = ensureElement<HTMLInputElement>(
      '[name="email"]',
      this.container,
    );
    this.phoneElement = ensureElement<HTMLInputElement>(
      '[name="phone"]',
      this.container,
    );

    // Обработчик ввода email — генерирует событие обновления данных покупателя
    this.emailElement.addEventListener("input", () => {
      this.events.emit("buyer:set", { email: this.emailElement.value });
    });

    // Обработчик ввода телефона — генерирует событие обновления данных покупателя
    this.phoneElement.addEventListener("input", () => {
      this.events.emit("buyer:set", { phone: this.phoneElement.value });
    });

    // Обработчик отправки формы
    this.container.addEventListener("submit", (event: SubmitEvent) => {
      event.preventDefault();
      this.events.emit("contacts:close");
    });
  }

  // Устанавливает значение поля email
  set email(value: string) {
    this.emailElement.value = value;
  }

  // Устанавливает значение поля телефон
  set phone(value: string) {
    this.phoneElement.value = value;
  }

  // Возвращает корневой элемент формы
  render(): HTMLElement {
    return this.container;
  }
}
