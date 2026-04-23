import { BaseCard } from "./BaseCard";

// Компонент карточки товара для отображения в каталоге на главной странице
export class CardCatalog extends BaseCard<null> {
  // Конструктор инициализирует карточку и устанавливает слушатель события клика
  constructor(container: HTMLElement, onClick?: () => void) {
    super(container);

    // Если передан обработчик, вешаем его на весь контейнер карточки
    if (onClick) {
      this.container.addEventListener("click", onClick);
    }
  }

  // Возвращает подготовленный HTML-элемент карточки для отрисовки в контейнере каталога
  render(): HTMLElement {
    return this.container;
  }
}
