import { BaseCard } from "./BaseCard";
import { ensureElement } from "../../../utils/utils";

// Компонент карточки товара в корзине
// Расширяет базовую карточку, добавляя порядковый номер и возможность удаления
export class CardBasket extends BaseCard<null> {
  public index: HTMLElement;
  public deleteButton: HTMLButtonElement;

  // Конструктор инициализирует элементы управления в карточке корзины
  constructor(container: HTMLElement, onDelete?: () => void) {
    super(container);
    this.index = ensureElement<HTMLElement>(
      ".basket__item-index",
      this.container,
    );
    this.deleteButton = ensureElement<HTMLButtonElement>(
      ".basket__item-delete",
      this.container,
    );

    // Настройка слушателя на кнопку удаления товара из корзины
    this.deleteButton.addEventListener("click", () => {
      if (onDelete) {
        onDelete();
      }
    });
  }

  // Возвращает полностью настроенный HTML-элемент карточки для вставки в список корзины
  render(): HTMLElement {
    return this.container;
  }
}
