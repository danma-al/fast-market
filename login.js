// registro del nuevo usuario

document.getElementById('registerForm')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const newUsername = document.getElementById('newUsername').value.trim();
  const newPassword = document.getElementById('newPassword').value.trim();
  const registerMessage = document.getElementById('registerMessage');

  if (newUsername && newPassword) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.username === newUsername);

    if (userExists) {
      registerMessage.textContent = 'Este usuario ya está registrado.';
      registerMessage.style.color = 'red';
    } else {
      users.push({ username: newUsername, password: newPassword });
      localStorage.setItem('users', JSON.stringify(users));
      registerMessage.textContent = 'Usuario registrado exitosamente. Redirigiendo...';
      registerMessage.style.color = 'green';
      setTimeout(() => window.location.href = '/Pages/products.html', 2000);
    }
  } else {
    registerMessage.textContent = 'Por favor, completa todos los campos.';
    registerMessage.style.color = 'red';
  }
});

// inicio de seccion (usuario guardado anteriormente)
document.getElementById('loginForm')?.addEventListener('submit', function (e) {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const messageElement = document.getElementById('message');

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    sessionStorage.setItem('SesionActiva', JSON.stringify(user));
    messageElement.textContent = 'Sesión iniciada correctamente. Redirigiendo...';
    messageElement.style.color = 'green';
    setTimeout(() => window.location.href = '/Pages/products.html', 2000);
  } else {
    messageElement.textContent = 'Usuario o contraseña incorrecta.';
    messageElement.style.color = 'red';
  }
});

// cierre de seccion activa
const cerrarSesion = () => {
  if (sessionStorage.getItem('SesionActiva')) {
    sessionStorage.removeItem('SesionActiva');
    alert('Sesión cerrada correctamente.');
  }
  window.location.href = '/front-page.html';
};

// verificar sesión activa en páginas protegidas
const verificarSesion = () => {
  const activeSession = JSON.parse(sessionStorage.getItem('SesionActiva'));
  if (!activeSession) {
    alert('Debes iniciar sesión para acceder a esta página.');
    window.location.href = '/login.html';
  }
};

// Mostrar mensaje de bienvenida en front-page
const mostrarBienvenida = () => {
  const activeSession = JSON.parse(sessionStorage.getItem('SesionActiva'));
  if (activeSession) {
    const welcomeElement = document.createElement('p');
    welcomeElement.textContent = `Bienvenido, ${activeSession.username}`;
    welcomeElement.style.fontSize = '1.2rem';
    welcomeElement.style.color = 'green';
    document.querySelector('.navbar__right').prepend(welcomeElement);
  }
};

// Llama a la función `mostrarBienvenida` si estás en la página principal
if (window.location.pathname === '/front-page.html') {
  mostrarBienvenida();
}
