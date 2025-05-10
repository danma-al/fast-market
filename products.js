// simulamos algunos productos en el localStorage para despues llamarlos
const sampleProducts = [
    {
        code: "123",
        name: "Leche Colanta",
        price: 5900,
        image: "/Public/lechecolanta.png"
    },
    {
        code: "456",
        name: "Queso Holandes",
        price: 14940,
        image: "/Public/quesoholandes.jpg"
    },
    {
        code: "789",
        name: "Queso Crema",
        price: 7810,
        image: "/Public/quesocrema.jpg"
    },
    {
        code: "120",
        name: "Coca Cola",
        price: 5400,
        image: "",
    }
];

// guarda los productos en localStorage si no existen
if (!localStorage.getItem('products')) {
    localStorage.setItem('products', JSON.stringify(sampleProducts));
}

// inicializamos el carrito si no existe
if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
}

// funciones para los modales
function openScanModal() {
    document.getElementById('scanModal').style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// cerrar modales cuando se hace clic fuera de ellos
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

// el toggle del carrito
function toggleCart() {
    const cartModal = document.getElementById('cartModal');
    if (cartModal.style.display === 'block') {
        cartModal.style.display = 'none';
    } else {
        updateCartDisplay();
        cartModal.style.display = 'block';
    }
}

// aqui busca producto por código
function searchProduct() {
    const code = document.getElementById('productCode').value;
    const products = JSON.parse(localStorage.getItem('products'));
    const product = products.find(p => p.code === code);

    if (product) {
        addToCart(product);
        alert('Producto agregado al carrito!');
        document.getElementById('scanModal').style.display = 'none';
        document.getElementById('productCode').value = '';
    } else {
        alert('Producto no encontrado');
    }
}

// para agregar productos al carrito
function addToCart(product) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();
}

// esto es para remover productos del carrito
function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartDisplay();
}

// en esta parte se actualiza el contador del carrito
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.querySelector('.cart-count').textContent = cart.length;
}

// aqui se actualiza el display del carrito

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        cartItems.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">$${item.price}</div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${index})">Eliminar</button>
            </div>
        `;
    });

    document.getElementById('cartTotal').textContent = total.toFixed(2);
}

// Inicializar contador del carrito al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
});


// Esto es para borrar los datos del LS

// localStorage.clear();

