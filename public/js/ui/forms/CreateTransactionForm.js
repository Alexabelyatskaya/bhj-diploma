/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element)
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    let callback = (error, response) => {
      document.querySelector('#income-accounts-list').innerHTML = '';
      document.querySelector('#expense-accounts-list').innerHTML = '';
      for (let item of response.data) {
        let option = `<option value="${item.id}">${item.name}</option>`;
        let element1 = document.createElement('div');
        let element2 = document.createElement('div');
        element1.innerHTML = option;
        element2.innerHTML = option;
          document.querySelector('#income-accounts-list').appendChild(element1.firstChild);
          document.querySelector('#expense-accounts-list').appendChild(element2.firstChild);
      }
    };
    let user = User.current();
    if (user) {
      let data = {mail: user.email, password: user.password};
      Account.list(data, callback);
    }

  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(data) {
    let callback = (error, response) => {
      if (response.success) {
        this.element.reset();
        App.getModal('newIncome').close();
        App.getModal('newExpense').close();
        App.update();
      }
    }
    Transaction.create(data, callback);
  }
}
