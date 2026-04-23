import { Component } from "../Component";
import { IEvents } from "../Events";

// Интерфейс, описывающий содержимое галереи
interface IGallery {
  catalog: HTMLElement[];
}

// Компонент галереи для отображения списка карточек товаров на главной странице
export class Gallery extends Component<IGallery> {
  protected catalogContainer: HTMLElement;

  // Конструктор инициализирует контейнер для каталога
  constructor(container: HTMLElement, events: IEvents) {
    super(container);
    this.catalogContainer = container;
  }

  // Заменяет текущее содержимое галереи новыми элементами карточек
  set catalog(value: HTMLElement[]) {
    this.catalogContainer.replaceChildren(...value);
  }

  // Отрисовывает галерею и обновляет каталог, если переданы новые данные
  render(data?: Partial<IGallery>): HTMLElement {
    if (data?.catalog) {
      this.catalog = data.catalog;
    }
    return this.container;
  }
}
