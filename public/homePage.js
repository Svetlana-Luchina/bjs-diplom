// Выход из личного кабинета
const logoutButton = new LogoutButton();
logoutButton.action = () => {
  ApiConnector.logout((response) => {
    if (response.success) {
      location.reload();
    }
  });
};

// Получение информации о пользователе
ApiConnector.current((response) => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
});

// Получение текущих курсов валют
const ratesBoard = new RatesBoard();
function exchangaRate() {
    ApiConnector.getStocks((response) => {
        if (response.success) {
         ratesBoard.clearTable();
         ratesBoard.fillTable(response.data);
        }
    });
};

exchangaRate();
setInterval(exchangaRate, 6000);

// Операции с деньгами
// Пополнение баланса
const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, 'Баланс успешно пополнен');
    } else {
      moneyManager.setMessage(false, response.error);
    }
  });
};

// Конвертирование валюты
moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, 'Конвертация выполнена успешно');
    } else {
      moneyManager.setMessage(false, response.error);
    }
  });
};

// Перевод средств
moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      moneyManager.setMessage(true, 'Перевод выполнен успешно');
    } else {
      moneyManager.setMessage(false, response.error);
    }
  });
};

// Работа с избранным
// Запрос начального списока избранного
const favoritesWidget = new FavoritesWidget();
function updateFavorites() {
    ApiConnector.getFavorites((response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        }
    });
}
updateFavorites();

// Добавлени пользователя в список избранных
favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(true, 'Пользователь добавлен в избранное');
        } else {
            favoritesWidget.setMessage(false, response.error);
        }
    });
};

// Удаление пользователя из избранного
favoritesWidget.removeUserCallback = (userId) => {
    ApiConnector.removeUserFromFavorites(userId, (response) => {
      if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
        favoritesWidget.setMessage(true, 'Пользователь удален из избранного');
      } else {
        favoritesWidget.setMessage(false, response.error);
      }
  });
};