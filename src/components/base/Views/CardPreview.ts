import { BaseCard } from "./BaseCard";
import { ensureElement } from "../../../utils/utils";

// Компонент карточки товара в режиме предварительного просмотра (модальное окно)
// Включает расширенное описание товара и кнопку добавления в корзину
export class CardPreview extends BaseCard<null> {
  public text: HTMLElement;
  public button: HTMLButtonElement;

  // Конструктор инициализирует дополнительные элементы превью и устанавливает обработчик покупки
  constructor(container: HTMLElement, onAddToCart?: () => void) {
    super(container);
    this.text = ensureElement<HTMLElement>(".card__text", this.container);
    this.button = ensureElement<HTMLButtonElement>(
      ".card__button",
      this.container,
    );

    // Слушатель для кнопки добавления товара в корзину
    this.button.addEventListener("click", () => {
      if (onAddToCart) {
        onAddToCart();
      }
    });
  }

   // Добавьте этот сеттер
  set buttonText(value: string) {
    this.button.textContent = value;
  }

  // Возвращает настроенный HTML-элемент карточки для отображения в модальном окне.
  render(): HTMLElement {
    return this.container;
  }
}
