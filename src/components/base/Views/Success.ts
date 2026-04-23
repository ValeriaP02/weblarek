import { ensureElement } from "../../../utils/utils";
import { Component } from "../Component";
import { IEvents } from "../Events";

// Интерфейс для отображения данных в окне успешного заказа
export interface ISuccess {
  cost: number;
}

// Компонент сообщения об успешном оформлении покупки
export class Success extends Component<ISuccess> {
  protected descriptionElement: HTMLElement;
  protected buttonElement: HTMLButtonElement;

  // Конструктор находит элементы описания и кнопку закрытия, устанавливает слушатель события
  constructor(
    container: HTMLElement,
    protected events: IEvents,
  ) {
    super(container);
    this.descriptionElement = ensureElement<HTMLElement>(
      ".order-success__description",
      this.container,
    );
    this.buttonElement = ensureElement<HTMLButtonElement>(
      ".order-success__close",
      this.container,
    );

    // Закрытие модального окна при клике на кнопку подтверждения
    this.buttonElement.addEventListener("click", () => {
      this.events.emit("modal:close");
    });
  }

  // Устанавливает текст с итоговой суммой списанных средств
  set cost(value: number) {
    this.descriptionElement.textContent = `Списано ${value} синапсов`;
  }

  // Возвращает корневой элемент компонента успеха
  render(): HTMLElement {
    return this.container;
  }
}
