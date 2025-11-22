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
}

exchangaRate();
setInterval(exchangaRate, 6000);
