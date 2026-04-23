import { ensureElement } from "../../../utils/utils";
import { Component } from "../Component";
import { IEvents } from "../Events";

// Интерфейс, описывающий состояние корзины для отрисовки
export interface IBasket {
  cost: number;
  products: HTMLElement[];
  enable: boolean;
}

// Компонент корзины
export class Basket extends Component<IBasket> {
  protected priceElement: HTMLSpanElement;
  protected buttonElement: HTMLButtonElement;
  protected listElement: HTMLUListElement;

  // Конструктор инициализирует элементы разметки и настраивает слушатель клика на кнопку оформления
  constructor(
    container: HTMLElement,
    protected events: IEvents,
  ) {
    super(container);
    this.priceElement = ensureElement<HTMLSpanElement>(
      ".basket__price",
      this.container,
    );
    this.buttonElement = ensureElement<HTMLButtonElement>(
      ".basket__button",
      this.container,
    );
    this.listElement = ensureElement<HTMLUListElement>(
      ".basket__list",
      this.container,
    );

    // Слушатель события клика для открытия окна оформления заказа
    this.buttonElement.addEventListener("click", () => {
      this.events.emit("order:open");
    });
  }

  // Устанавливает и отображает общую стоимость товаров в корзине
  set cost(value: number) {
    this.priceElement.textContent = `${value} синапсов`;
  }

  // Заменяет текущий список элементов товаров в корзине на переданные
  // Если массив пуст, содержимое корзины очищается
  set products(items: HTMLElement[]) {
    this.listElement.replaceChildren(...items);
  }

  // Управляет блокировкой кнопки "Оформить"
  // Используется для отключения кнопки, если корзина пуста
  // true — кнопка активна, false — кнопка заблокирована
  set enable(value: boolean) {
    this.buttonElement.disabled = !value;
  }

  // Возвращает корневой элемент корзины
  render(): HTMLElement {
    return this.container;
  }
}
