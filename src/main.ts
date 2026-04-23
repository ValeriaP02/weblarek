import "./scss/styles.scss";

import { ProductCatalog } from "./components/base/Models/ProductCatalog";
import { Cart } from "./components/base/Models/Cart";
import { Customer } from "./components/base/Models/Customer";

import { Api } from "./components/base/Api";
import { CommunicationLayer } from "./components/base/Communication/CommunicationLayer";
import { API_URL } from "./utils/constants";

import { Gallery } from "./components/base/Views/Gallery";
import { Header } from "./components/base/Views/Header";
import { Modal } from "./components/base/Views/Modal";
import { Contacts } from "./components/base/Views/FormContacts";
import { Order } from "./components/base/Views/FormOrder";
import { Success } from "./components/base/Views/Success";
import { CardCatalog } from "./components/base/Views/CardCatalog";
import { CardBasket } from "./components/base/Views/CardBasket";
import { CardPreview } from "./components/base/Views/CardPreview";
import { Basket } from "./components/base/Views/Basket";

import { ensureElement } from "./utils/utils";
import { EventEmitter } from "./components/base/Events";
import {
  IProduct,
  IBuyer,
  IOrderData,
  IOrderResponse,
  TPayment,
} from "./types";

// Инициализация инфраструктурных компонентов: брокера событий, API и слоя коммуникации
const events = new EventEmitter();
const apiInstance = new Api(API_URL);
const comms = new CommunicationLayer(apiInstance);

// Инициализация моделей данных: каталога, корзины и данных покупателя
const productsModel = new ProductCatalog();
const cartModel = new Cart();
const customerModel = new Customer();

// Поиск HTML-шаблонов для различных компонентов интерфейса
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>("#card-catalog");
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>("#card-preview");
const cardBasketTemplate = ensureElement<HTMLTemplateElement>("#card-basket");
const basketTemplate = ensureElement<HTMLTemplateElement>("#basket");
const orderTemplate = ensureElement<HTMLTemplateElement>("#order");
const contactsTemplate = ensureElement<HTMLTemplateElement>("#contacts");
const successTemplate = ensureElement<HTMLTemplateElement>("#success");

// Инициализация глобальных компонентов представления (галерея, заголовок, модальное окно)
const gallery = new Gallery(ensureElement<HTMLElement>(".gallery"), events);
const header = new Header(ensureElement<HTMLElement>(".header"), events);
const modal = new Modal(ensureElement<HTMLElement>(".modal"), events);

// Создание экземпляров форм на основе клонированных шаблонов
const contactsForm = new Contacts(
  contactsTemplate.content.firstElementChild!.cloneNode(true) as HTMLElement,
  events,
);

const orderForm = new Order(
  orderTemplate.content.firstElementChild!.cloneNode(true) as HTMLElement,
  events,
);

const successForm = new Success(
  successTemplate.content.firstElementChild!.cloneNode(true) as HTMLElement,
  events,
);

// Подписка на обновление каталога для отрисовки карточек товаров в галерее
productsModel.on(
  "catalog:productsUpdated",
  ({ currentProducts }: { currentProducts: IProduct[] }) => {
    const cardElements: HTMLElement[] = currentProducts.map((product) => {
      const cardClone =
        cardCatalogTemplate.content.firstElementChild!.cloneNode(
          true,
        ) as HTMLElement;
      const card = new CardCatalog(cardClone, () =>
        productsModel.selectProduct(product),
      );
      card.title = product.title;
      card.image = product.image;
      card.price = product.price;
      card.category = product.category;
      return card.render();
    });

    gallery.catalog = cardElements;
  },
);

// Обработка выбора товара для отображения детальной информации в модальном окне
productsModel.on("catalog:productSelected", ({ product }) => {
  const cardClone = cardPreviewTemplate.content.firstElementChild!.cloneNode(
    true,
  ) as HTMLElement;

  const updateButtonState = (cardInstance: CardPreview) => {
    if (cartModel.hasItem(product.id)) {
      cardInstance.buttonText = "Удалить из корзины";
    } else {
      cardInstance.buttonText = "В корзину";
    }
  };

  const card = new CardPreview(cardClone, () => {
    if (cartModel.hasItem(product.id)) {
      cartModel.removeItem(product.id);
    } else {
      cartModel.addItem(product);
    }

    modal.show = false;
  });

  card.title = product.title;
  card.image = product.image;
  card.price = product.price;
  card.category = product.category;
  card.text.textContent = product.description;

  updateButtonState(card);

  // Блокировка кнопки, если цена не указана (null)
  if (product.price === null) {
    card.buttonText = "Недоступно";
    card.button.disabled = true;
  }

  modal.content = card.render();
  modal.show = true;
});

// Синхронизация счетчика в хедере при добавлении товара в корзину
cartModel.on("cart:itemAdded", () => {
  header.counter = cartModel.getItemCount();
});

// Обновление счетчика хедера при удалении товара
cartModel.on("cart:itemRemoved", ({}) => {
  header.counter = cartModel.getItemCount();
});

// Сброс счетчика хедера при очистке корзины
cartModel.on("cart:cleared", () => {
  header.counter = 0;
});

// Обновление полей ввода в формах при изменении данных в модели покупателя
customerModel.on("customer:dataUpdated", () => {
  // Получаем актуальные данные из модели
  const data = customerModel.getAllData();

  // Обновляем поля ввода и кнопки выбора оплаты
  orderForm.address = data.address;
  orderForm.payment = data.payment as TPayment;

  contactsForm.email = data.email;
  contactsForm.phone = data.phone;

  const errors = customerModel.validateData();

  // Управление формой Order
  const orderErrorStrings = [errors.address, errors.payment].filter(Boolean);
  orderForm.error = {
    error: orderErrorStrings.length > 0 ? orderErrorStrings.join("; ") : "",
  };
  orderForm.enable = !errors.address && !errors.payment;

  // Управление формой Contacts
  const contactsErrorStrings = [errors.email, errors.phone].filter(Boolean);
  contactsForm.error = {
    error:
      contactsErrorStrings.length > 0 ? contactsErrorStrings.join("; ") : "",
  };
  contactsForm.enable = !errors.email && !errors.phone;
});

// Обработка события открытия корзины и рендеринг её содержимого
events.on("basket:open", () => {
  const basketClone = basketTemplate.content.firstElementChild!.cloneNode(
    true,
  ) as HTMLElement;
  const basketView = new Basket(basketClone, events);

  const items = cartModel.getItems();

  const basketItems = items.map((product, index) => {
    const itemClone = cardBasketTemplate.content.firstElementChild!.cloneNode(
      true,
    ) as HTMLElement;
    const card = new CardBasket(itemClone, () => {
      cartModel.removeItem(product.id);
      events.emit("basket:open");
    });
    card.title = product.title;
    card.price = product.price;
    card.index.textContent = (index + 1).toString();
    return card.render();
  });

  basketView.products = basketItems;
  basketView.cost = cartModel.getTotalPrice();
  basketView.enable = cartModel.getItemCount() > 0;

  modal.content = basketView.render();
  modal.show = true;
});

// Адрес и Оплата
events.on("order:open", () => {
  modal.content = orderForm.render();
  modal.show = true;
});

// Срабатывает при нажатии на кнопку "Далее" в форме заказа
events.on("order:close", () => {
  modal.content = contactsForm.render();
  modal.show = true;
});

// Контакты
events.on("contacts:close", async () => {
  const formData = { email: contactsForm.email, phone: contactsForm.phone };
  customerModel.saveData(formData);

  const errors = customerModel.validateData();

  // Если валидация пройдена (ошибок нет)
  if (!errors.email && !errors.phone) {
    try {
      const customerData = customerModel.getAllData();
      const itemsInCart = cartModel.getItems();

      const orderData: IOrderData = {
        payment: customerData.payment,
        address: customerData.address,
        email: customerData.email,
        phone: customerData.phone,
        total: cartModel.getTotalPrice(),
        items: itemsInCart.map((item) => item.id),
      };

      // Отправляем заказ на сервер через ваш слой коммуникации
      const result: IOrderResponse = await comms.sendOrder(orderData);

      // Если запрос успешен — показываем форму успеха с итоговой суммой
      successForm.cost = result.total;
      modal.content = successForm.render();
      modal.show = true;

      // Очищаем данные корзины и пользователя только после успешной оплаты
      cartModel.clearCart();
      customerModel.clearCustomerData();
    } catch (error) {
      // Обработка ошибок сети или API
      console.error("Ошибка при оформлении заказа:", error);
      contactsForm.error = {
        general: "Не удалось отправить заказ. Попробуйте позже.",
      };
    }
  } else {
    // Высвечиваем ошибки валидации
    contactsForm.error = {
      email: errors.email,
      phone: errors.phone,
    };
  }
});

// Обработка кнопки "За новыми покупками" в окне успеха
events.on("success:close", () => {
  modal.show = false;
});

// Обновление данных покупателя через формы
events.on("buyer:set", (data: Partial<IBuyer>) => {
  customerModel.saveData(data);
});

// Загрузка первичного списка товаров с сервера при старте приложения
(async () => {
  try {
    const response = await comms.fetchProducts();
    productsModel.setAllProducts(response.items);
  } catch (error) {
    console.error("Ошибка загрузки товаров:", error);
  }
})();
