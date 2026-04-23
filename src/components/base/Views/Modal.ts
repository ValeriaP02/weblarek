import { ensureElement } from "../../../utils/utils";
import { Component } from "../../base/Component";
import { IEvents } from "../../base/Events";

// Компонент модального окна для отображения контента поверх основного интерфейса
export class Modal extends Component<{}> {
  protected closeButton: HTMLButtonElement;
  protected contentElement: HTMLElement;

  // Конструктор инициализирует элементы управления модальным окном и настраивает закрытие
  constructor(
    container: HTMLElement,
    protected events: IEvents,
  ) {
    super(container);

    this.closeButton = ensureElement<HTMLButtonElement>(
      ".modal__close",
      this.container,
    );
    this.contentElement = ensureElement<HTMLElement>(
      ".modal__content",
      this.container,
    );

    // Закрытие модального окна при клике на кнопку «крестик»
    this.closeButton.addEventListener("click", () => (this.show = false));

    // Закрытие модального окна при клике на оверлей (пустую область вокруг контента)
    this.container.addEventListener("click", (e) => {
      if (e.target === this.container) {
        this.show = false;
      }
    });
  }

  // Управляет видимостью модального окна: добавляет класс активности и блокирует прокрутку страницы
  set show(value: boolean) {
    if (value) {
      this.container.classList.add("modal_active");
      document.body.style.overflow = "hidden";
    } else {
      this.container.classList.remove("modal_active");
      document.body.style.overflow = "auto";
      this.events.emit("modal:close");
    }
  }

  // Заменяет содержимое модального окна переданным элементом
  set content(value: HTMLElement) {
    this.contentElement.replaceChildren(value);
  }

  // Возвращает корневой элемент модального окна
  render(): HTMLElement {
    return this.container;
  }
}
