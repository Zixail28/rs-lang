import { createUser, getUserStatistic, loginUser, updateUserStatistic } from "../../core/components/api/api";
import { dataUser } from "../../core/components/interfaces/interface";

export const authScr = () => {
let isLogin : boolean = true;

function logRegCallback() {
	event.preventDefault();
		
		if(isLogin) {
			const name = (document.querySelector('[type="name"]') as HTMLInputElement).value;
			const email = (document.querySelector('[type="email"]') as HTMLInputElement).value;
			const password = (document.querySelector('[type="password"]') as HTMLInputElement).value;

			createUser({ 'name': name, 'email': email, 'password': password }).then(async () => {
				if (dataUser.errCode != '') {
					document.querySelector('p.auth-title').textContent = 'Проверьте корректность введенных Вами данных!';
					dataUser.errCode == '417' ? document.querySelector('p.auth-title').textContent = 'Пользователь с указанной электронной почтой уже зарегистрирован!' : false;
					dataUser.errCode = '';
				} else {
          changePage(isLogin);
        }
			});
		}
		if(!isLogin) {
			const email = (document.querySelector('[type="email"]') as HTMLInputElement).value;
			const password = (document.querySelector('[type="password"]') as HTMLInputElement).value;
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);

			loginUser({ 'email': email, 'password': password }).then(() => {
				if (dataUser.errCode != '') {
					document.querySelector('p.auth-title').textContent = 'Неверный адрес электронной почты или пароль!';
					dataUser.errCode = '';
				} else {
					localStorage.setItem('token', dataUser.token);
					localStorage.setItem('userId', dataUser.userId);
					localStorage.setItem('nameUser', dataUser.name);
					location.href = '#/'
				}
			});
		}
}

function changePage(bool : boolean = isLogin) {
  const authenticationBox = document.querySelector('.authentication-box');

  if (bool === false) {
    authenticationBox.innerHTML = `<p class="auth-title">Ещё не зарегестрированы?</p>
    <p class="auth-subtitle">Создайте аккаунт и начните</br>изучать английский</p>
    <form method="post" class="auth-form" action="./">
      <input type="name" name="name" id="name" placeholder="имя">
      <input type="email" name="email" id="email" placeholder="email">
      <input type="password" name="password" id="password" placeholder="password">
    <button class="btn login-btn">Зарегистрироваться</button>
    </form>
    <p class="text-above-login-btn">Уже зарегестрированы? 
    <span class="span-change">Войдите</span>
    </p>`;
    isLogin = !isLogin;
    (document.querySelector('.span-change')).addEventListener('click', () => {
      changePage(isLogin);
    });
  }
  if (bool === true) {
    authenticationBox.innerHTML = `<p class="auth-title">Уже зарегестрированы?</p>
    <p class="auth-subtitle">Войдите в свой аккаунт</p>
    <form class="auth-form" action="./">
      <input type="email" name="email" id="email" placeholder="email">
      <input type="password" name="password" id="password" placeholder="password">
      <button class="btn login-btn">Войти</button>
    </form>
    <p class="text-above-login-btn">Ещё не зарегестрированы? 
    <span class="span-change">Зарегестрируйтесь</span>
    </p>`;
    isLogin = !isLogin;
    (document.querySelector('.span-change')).addEventListener('click', () => {
      changePage(isLogin);
    });
  }

	document.addEventListener('submit', logRegCallback)
}

changePage(isLogin);
}