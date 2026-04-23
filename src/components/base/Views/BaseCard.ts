import { Component } from "../Component";
import { categoryMap } from "../../../utils/constants";
import { CDN_URL } from "../../../utils/constants";

// Ключи доступных категорий товаров, используемые для стилизации
export type CategoryKey = keyof typeof categoryMap;

// Базовый компонент карточки товара. Отвечает за отображение основных полей
export class BaseCard<T> extends Component<T> {
  protected titleElement: HTMLElement | null;
  protected imageElement: HTMLImageElement | null;
  protected priceElement: HTMLElement | null;
  protected categoryElement: HTMLElement | null;

  // Конструктор инициализирует элементы разметки внутри контейнера карточки
  constructor(container: HTMLElement) {
    super(container);

    this.titleElement = container.querySelector<HTMLElement>(".card__title");
    this.imageElement =
      container.querySelector<HTMLImageElement>(".card__image");
    this.priceElement = container.querySelector<HTMLElement>(".card__price");
    this.categoryElement =
      container.querySelector<HTMLElement>(".card__category");
  }

  // Устанавливает текст заголовка карточки
  set title(value: string) {
    if (this.titleElement) {
      this.titleElement.textContent = value;
    }
  }

  // Устанавливает изображение карточки
  set image(value: string) {
    if (this.imageElement) {
      this.imageElement.src = CDN_URL + value;
      this.imageElement.alt = this.titleElement?.textContent || "";
    }
  }

  // Устанавливает цену товара
  set price(value: number | null) {
    if (this.priceElement) {
      if (value !== null) {
        this.priceElement.textContent = `${value} синапсов`;
      } else {
        this.priceElement.textContent = "Бесценно";
      }
    }
  }

  // Устанавливает категорию товара
  set category(value: string) {
    if (this.categoryElement) {
      this.categoryElement.textContent = value;
      for (const key in categoryMap) {
        this.categoryElement.classList.toggle(
          categoryMap[key as CategoryKey],
          key === value,
        );
      }
    }
  }
}
