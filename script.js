document.addEventListener('DOMContentLoaded', () => {
    // HTML elemanlarını seçme
    const loginForm = document.getElementById('login-form');
    const mainContent = document.getElementById('main-content');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('login-button');
    const logoutButton = document.getElementById('logout-button');
    const errorMessage = document.getElementById('error-message');

    // Güncellenmiş kullanıcı adı ve şifre
    const validUsername = 'DaUser';
    const validPassword = 'remuser2569';

    // Sayfanın giriş durumunu kontrol eden fonksiyon
    const checkLoginState = () => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (isLoggedIn) {
            loginForm.classList.add('hidden');
            mainContent.classList.remove('hidden');
            usernameInput.value = '';
            passwordInput.value = '';
        } else {
            loginForm.classList.remove('hidden');
            mainContent.classList.add('hidden');
        }
    };

    // Giriş butonuna tıklandığında
    loginButton.addEventListener('click', () => {
        const username = usernameInput.value;
        const password = passwordInput.value;

        if (username === validUsername && password === validPassword) {
            localStorage.setItem('isLoggedIn', 'true');
            errorMessage.classList.add('hidden');
            checkLoginState(); // Durumu güncelle
        } else {
            errorMessage.textContent = 'Kullanıcı adı veya şifre hatalı!';
            errorMessage.classList.remove('hidden');
        }
    });

    // Çıkış butonuna tıklandığında
    logoutButton.addEventListener('click', () => {
        localStorage.setItem('isLoggedIn', 'false');
        checkLoginState(); // Durumu güncelle
        usernameInput.value = '';
        passwordInput.value = '';
    });

    // Sayfa yüklendiğinde giriş durumunu kontrol et
    checkLoginState();
});