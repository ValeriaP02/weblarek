import "./scss/styles.scss"; // Импорт основного файла стилей

// Импортируем классы моделей
import { ProductCatalog } from "./components/base/Models/ProductCatalog";
import { Customer } from "./components/base/Models/Customer";
import { Cart } from "./components/base/Models/Cart";

// Импорт класса для работы с API
import { Api } from "./components/base/Api";
// Импортируем константу с URL API
import { API_URL } from "./utils/constants";
// Импорт слоя коммуникации для взаимодействия с API
import { CommunicationLayer } from "./components/base/Communication/CommunicationLayer";

// Импорт данных товаров
import { apiProducts } from "./utils/data";

/* 
__________________________________________Модель каталога товаров (ProductCatalog)______________________________________
*/

// Создаем экземпляр модели каталога
const productsModel = new ProductCatalog();

// Устанавливаем список всех товаров из полученных данных
productsModel.setAllProducts(apiProducts.items);

console.log("Массив товаров из каталога:", productsModel.getAllProducts());

/* 
__________________________________________Модель клиента (Customer)_____________________________________________________
*/

// Создаем экземпляр модели клиента
const customer = new Customer();

// Данные клиента
const customerData = {
  email: "test@domain.com",
  phone: "+7(999)123-45-67",
  address: "Калининград, ул. Александра Невского, д. 1",
  payment: { method: "card", amount: 750 },
};

// Сохраняем данные клиента в модель
customer.saveData(customerData);

console.log("Данные клиента:", customer.getAllData());
console.log("Валидность данных:", customer.validateData());

/* 
__________________________________________Модель корзины (Cart)_________________________________________________________
*/

// Создаем экземпляр корзины
const cart = new Cart();

// Добавляем первый товар из каталога в корзину
cart.addItem(productsModel.getAllProducts()[0]);

console.log("Товары в корзине:", cart.getItems());
console.log("Общая цена:", cart.getTotalPrice());

/* 
__________________________________________Слой коммуникации (CommunicationLayer)_________________________________________
*/

// Создаем экземпляр API с указанным URL
const apiInstance = new Api(API_URL);

// Создаем слой коммуникации, передавая ему объект API
const comms = new CommunicationLayer(apiInstance);

(async () => {
  try {
    // Выполняем асинхронный запрос на получение товаров
    const productsResponse = await comms.fetchProducts();
    const products = productsResponse.items;

    // Создаем новый каталог и заполняем его полученными товарами
    const productsModel = new ProductCatalog();
    productsModel.setAllProducts(products);

    console.log("Модель каталога:", productsModel.getAllProducts());
  } catch (error) {
    console.error("Ошибка при получении товаров:", error);
  }
})();
