import { ensureElement } from "../../../utils/utils";
import { Component } from "../Component";
import { IEvents } from "../Events";

// Базовый компонент для работы с формами
// Предоставляет общую логику управления состоянием кнопки отправки и отображения ошибок
export class BaseForm<T> extends Component<T> {
  protected submitElement: HTMLButtonElement;
  protected errorElement: HTMLElement;

  // Конструктор инициализирует элементы формы и сохраняет ссылку на обработчик событий
  constructor(
    container: HTMLElement,
    protected events: IEvents,
  ) {
    super(container);

    this.submitElement = ensureElement<HTMLButtonElement>(
      '[type="submit"]',
      this.container,
    );
    this.errorElement = ensureElement<HTMLElement>(
      ".form__errors",
      this.container,
    );
  }

  // Управляет состоянием активности кнопки отправки (submit)
  // true — кнопка активна, false — заблокирована
  set enable(value: boolean) {
    this.submitElement.disabled = !value;
  }

  // Устанавливает и отображает текст ошибок в специальном поле формы
  set error(value: object) {
    this.errorElement.innerHTML = Object.values(value).join("<br/>");
  }
}
