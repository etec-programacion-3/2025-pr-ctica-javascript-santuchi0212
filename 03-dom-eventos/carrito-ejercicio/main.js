// Referencias a los elementos del DOM
const productList = document.getElementById('product-list');
const cartList = document.getElementById('cart-list');
const emptyCartBtn = document.getElementById('empty-cart');
const cartSummary = document.getElementById('cart-summary');

// Estado del carrito (array de productos)
let cart = [];

// Renderiza el carrito en el DOM y muestra el resumen
const renderCart = () => {
    cartList.innerHTML = '';
    
    cart.forEach((item, idx) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        
        // EJERCICIO 3: Crear botón de eliminar (la delegación se maneja abajo)
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Eliminar';
        removeBtn.classList.add('remove-item');
        removeBtn.dataset.index = idx; // Guardamos el índice para identificar el producto
        
        li.appendChild(removeBtn);
        cartList.appendChild(li);
    });
    
    // EJERCICIO 2: Calcula y muestra el total y la cantidad de productos
    const totalProducts = cart.length;
    const totalPrice = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
    
    cartSummary.textContent = `Total: $${totalPrice.toFixed(2)} | Productos: ${totalProducts}`;
    
    // Opcional: Deshabilitar botón de vaciar carrito si está vacío
    emptyCartBtn.disabled = cart.length === 0;
};

// Maneja el evento de agregar productos al carrito usando delegación de eventos
productList.addEventListener('click', e => {
    if (e.target.classList.contains('add')) {
        const li = e.target.closest('li');
        const { id, name, price } = li.dataset;
        cart.push({ id, name, price });
        renderCart();
        
        // Opcional: Feedback visual
        e.target.textContent = '¡Agregado!';
        setTimeout(() => {
            e.target.textContent = 'Agregar al carrito';
        }, 1000);
    }
});

// EJERCICIO 3: Maneja el evento de eliminar productos del carrito usando delegación de eventos
cartList.addEventListener('click', e => {
    if (e.target.classList.contains('remove-item')) {
        const index = parseInt(e.target.dataset.index);
        
        // Eliminar el producto del carrito por su índice
        cart.splice(index, 1);
        
        // Volver a renderizar el carrito
        renderCart();
        
        // Opcional: Mostrar mensaje de confirmación
        console.log('Producto eliminado del carrito');
    }
});

// EJERCICIO 1: Maneja el evento de vaciar el carrito
emptyCartBtn.addEventListener('click', () => {
    // Opcional: Pedir confirmación antes de vaciar
    if (cart.length > 0) {
        const confirmed = confirm('¿Estás seguro de que quieres vaciar el carrito?');
        if (confirmed) {
            cart = []; // Vaciar el array del carrito
            renderCart(); // Actualizar la vista
            
            // Opcional: Mostrar mensaje de confirmación
            alert('Carrito vaciado exitosamente');
        }
    } else {
        alert('El carrito ya está vacío');
    }
});

// Render inicial del carrito
renderCart();

// ============================================
// FUNCIONES ADICIONALES (OPCIONALES)
// ============================================

// Función para obtener estadísticas del carrito
const getCartStats = () => {
    const stats = {
        totalItems: cart.length,
        totalPrice: cart.reduce((sum, item) => sum + parseFloat(item.price), 0),
        uniqueProducts: [...new Set(cart.map(item => item.id))].length,
        averagePrice: cart.length > 0 ? cart.reduce((sum, item) => sum + parseFloat(item.price), 0) / cart.length : 0
    };
    return stats;
};

// Función para encontrar el producto más caro en el carrito
const getMostExpensiveProduct = () => {
    if (cart.length === 0) return null;
    return cart.reduce((max, item) => parseFloat(item.price) > parseFloat(max.price) ? item : max);
};

// Función para contar productos duplicados
const getProductCount = () => {
    const productCount = {};
    cart.forEach(item => {
        productCount[item.id] = (productCount[item.id] || 0) + 1;
    });
    return productCount;
};

// Función para guardar carrito en localStorage (persistencia)
const saveCartToStorage = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
};

// Función para cargar carrito desde localStorage
const loadCartFromStorage = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        renderCart();
    }
};

// Función mejorada de renderCart con persistencia
const renderCartWithPersistence = () => {
    cartList.innerHTML = '';
    
    cart.forEach((item, idx) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - $${item.price}`;
        
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Eliminar';
        removeBtn.classList.add('remove-item');
        removeBtn.dataset.index = idx;
        
        li.appendChild(removeBtn);
        cartList.appendChild(li);
    });
    
    // Calcular totales
    const totalProducts = cart.length;
    const totalPrice = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
    
    cartSummary.textContent = `Total: $${totalPrice.toFixed(2)} | Productos: ${totalProducts}`;
    
    emptyCartBtn.disabled = cart.length === 0;
    
    // Guardar en localStorage
    saveCartToStorage();
};

// ============================================
// VERSIÓN CON NOTIFICACIONES TOAST (OPCIONAL)
// ============================================

// Función para mostrar notificaciones toast
const showToast = (message, type = 'info') => {
    // Crear elemento toast
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // Estilos básicos
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 4px;
        color: white;
        z-index: 1000;
        transition: opacity 0.3s ease;
    `;
    
    // Colores según tipo
    const colors = {
        success: '#4CAF50',
        error: '#f44336',
        info: '#2196F3',
        warning: '#ff9800'
    };
    toast.style.backgroundColor = colors[type] || colors.info;
    
    // Agregar al DOM
    document.body.appendChild(toast);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
};

// Versión mejorada con notificaciones
const enhancedCartFunctions = {
    addProduct: (product) => {
        cart.push(product);
        renderCart();
        showToast(`${product.name} agregado al carrito`, 'success');
    },
    
    removeProduct: (index) => {
        const removedProduct = cart[index];
        cart.splice(index, 1);
        renderCart();
        showToast(`${removedProduct.name} eliminado del carrito`, 'info');
    },
    
    emptyCart: () => {
        if (cart.length > 0) {
            const confirmed = confirm('¿Estás seguro de que quieres vaciar el carrito?');
            if (confirmed) {
                cart = [];
                renderCart();
                showToast('Carrito vaciado exitosamente', 'success');
            }
        } else {
            showToast('El carrito ya está vacío', 'warning');
        }
    }
};

// ============================================
// INICIALIZACIÓN OPCIONAL CON PERSISTENCIA
// ============================================

// Cargar carrito al iniciar la página
// loadCartFromStorage();