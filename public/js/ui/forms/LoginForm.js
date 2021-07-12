/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    let callback = function(error, response) {
      if (response.success) {
        App.setState('user-logged');
        let modal = App.getModal('login');
        modal.element.querySelector('*[name="email"]').value = '';
        modal.element.querySelector('*[name="password"]').value = '';
        modal.close();
      }
    }
    User.login(data, callback);
    }
  }