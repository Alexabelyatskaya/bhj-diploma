/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    let callback = function(error, response) {
      if (response.success) {
        App.setState('user-logged');
        let modal = App.getModal('register');
        modal.element.querySelector('*[name="name"]').value = '';
        modal.element.querySelector('*[name="email"]').value = '';
        modal.element.querySelector('*[name="password"]').value = '';
        modal.close();
      }
    }
    User.register(data, callback);
  }
}