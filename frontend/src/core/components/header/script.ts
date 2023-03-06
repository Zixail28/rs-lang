import { infoBook } from "../../../pages/audiocall/utils/utils";

export const headerScript = () => {
	document.querySelector('.login-auth-btn').addEventListener('mouseup', (e) => {
		document.querySelector('.nav').classList.toggle('ds-none');
		document.body.addEventListener('mousedown', closeNavWindow);
	});
	
	document.querySelectorAll('.nav path, .nav-items, .nav-item').forEach(e => {
		e.addEventListener('mouseup', closeNavWindow);
	})
	
	function closeNavWindow() {
		document.body.addEventListener('click', (e) => {
			if(!(e.target as HTMLElement).classList.contains('nav') && !(e.target as HTMLElement).classList.contains('login-auth-btn') && (e.target as HTMLElement).tagName !== 'path' && !(e.target as HTMLElement).classList.contains('.nav-item') && !(e.target as HTMLElement).classList.contains('.nav-items')) document.querySelector('.nav').classList.add('ds-none');
		},{once: true})
	}

	document.querySelector('.logout-btn').addEventListener('click', () => {
		localStorage.removeItem('token');
		localStorage.removeItem('userId');
		localStorage.removeItem('nameUser');
		localStorage.removeItem('email');
		localStorage.removeItem('password');
		
		document.location.href = '#/';
	})
}
