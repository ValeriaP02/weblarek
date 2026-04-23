import { ensureElement } from "../../../utils/utils";
import { Component } from "../Component";
import { IEvents } from "../Events";

// Интерфейс, описывающий состояние заголовка (счетчик товаров в корзине)
export interface IHeader {
  counter: number;
}

// Компонент заголовка страницы
export class Header extends Component<IHeader> {
  protected counterElement: HTMLElement;
  protected basketButton: HTMLButtonElement;
  protected events: IEvents;

  // Конструктор инициализирует элементы управления заголовка и настраивает открытие корзины
  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this.events = events;

    this.counterElement = ensureElement<HTMLElement>(
      ".header__basket-counter",
      this.container,
    );
    this.basketButton = ensureElement<HTMLButtonElement>(
      ".header__basket",
      this.container,
    );

    // Слушатель клика по кнопке корзины для генерации события её открытия
    this.basketButton.addEventListener("click", () => {
      this.events.emit("basket:open");
    });
  }

  // Обновляет текстовое значение счетчика товаров в корзине
  set counter(value: number) {
    this.counterElement.textContent = String(value);
  }
}
