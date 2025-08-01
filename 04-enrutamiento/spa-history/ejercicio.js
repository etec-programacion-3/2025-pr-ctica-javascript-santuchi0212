// Referencia al contenedor principal de la SPA
const app = document.getElementById('app');

// Base de datos simulada de productos
const products = {
    1: { id: 1, name: 'Laptop Gaming', price: 1299.99, description: 'Laptop de alto rendimiento para gaming y trabajo profesional', image: 'laptop.jpg' },
    2: { id: 2, name: 'Mouse Inalámbrico', price: 59.99, description: 'Mouse ergonómico con tecnología inalámbrica avanzada', image: 'mouse.jpg' },
    3: { id: 3, name: 'Teclado Mecánico', price: 149.99, description: 'Teclado mecánico con switches azules y retroiluminación RGB', image: 'keyboard.jpg' },
    4: { id: 4, name: 'Monitor 4K', price: 399.99, description: 'Monitor 4K de 27 pulgadas con tecnología IPS', image: 'monitor.jpg' }
};

// Definición de rutas y sus vistas asociadas
const routes = {
    '/': () => `
        <div class="home-page">
            <h1>🏠 Inicio</h1>
            <p>Bienvenido a nuestra tienda online.</p>
            <div class="quick-actions">
                <button data-route="/productos" class="btn btn-primary">Ver Productos</button>
                <button data-route="/contacto" class="btn btn-secondary">Contactanos</button>
            </div>
        </div>
    `,
    
    '/productos': () => {
        const productList = Object.values(products).map(product => `
            <div class="product-card">
                <h3>${product.name}</h3>
                <p class="price">$${product.price}</p>
                <p class="description">${product.description.substring(0, 50)}...</p>
                <button data-route="/producto/${product.id}" class="btn btn-outline">Ver Detalles</button>
            </div>
        `).join('');
        
        return `
            <div class="products-page">
                <h1>📦 Productos</h1>
                <p>Descubre nuestra selección de productos.</p>
                <div class="product-grid">
                    ${productList}
                </div>
            </div>
        `;
    },
    
    '/contacto': () => `
        <div class="contact-page">
            <h1>📞 Contacto</h1>
            <p>¿Tienes alguna pregunta? ¡Contáctanos!</p>
            <form class="contact-form">
                <div class="form-group">
                    <label for="name">Nombre:</label>
                    <input type="text" id="name" name="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>
                </div>
                <div class="form-group">
                    <label for="message">Mensaje:</label>
                    <textarea id="message" name="message" rows="4" required></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Enviar Mensaje</button>
            </form>
        </div>
    `
};

// EJERCICIO 1: Vista de detalle con parámetros
const getProductDetailView = (productId) => {
    const product = products[productId];
    
    if (!product) {
        return `
            <div class="error-page">
                <h1>❌ Producto no encontrado</h1>
                <p>El producto con ID ${productId} no existe.</p>
                <button data-route="/productos" class="btn btn-primary">Volver a Productos</button>
            </div>
        `;
    }
    
    return `
        <div class="product-detail">
            <nav class="breadcrumb">
                <button data-route="/" class="breadcrumb-link">Inicio</button> > 
                <button data-route="/productos" class="breadcrumb-link">Productos</button> > 
                <span>${product.name}</span>
            </nav>
            
            <div class="product-detail-content">
                <div class="product-image">
                    <div class="image-placeholder">📷 ${product.image}</div>
                </div>
                
                <div class="product-info">
                    <h1>${product.name}</h1>
                    <p class="product-price">$${product.price}</p>
                    <p class="product-description">${product.description}</p>
                    
                    <div class="product-actions">
                        <button class="btn btn-primary add-to-cart" data-product-id="${product.id}">
                            🛒 Agregar al Carrito
                        </button>
                        <button data-route="/productos" class="btn btn-secondary">
                            ← Volver a Productos
                        </button>
                    </div>
                    
                    <div class="product-specs">
                        <h3>Especificaciones</h3>
                        <ul>
                            <li><strong>ID:</strong> ${product.id}</li>
                            <li><strong>Precio:</strong> $${product.price}</li>
                            <li><strong>Disponibilidad:</strong> En stock</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// Función para extraer parámetros de la ruta
const extractRouteParams = (route) => {
    // Buscar rutas que coincidan con patrones como /producto/:id
    if (route.startsWith('/producto/')) {
        const id = route.split('/')[2];
        return { route: '/producto/:id', params: { id } };
    }
    
    return { route, params: {} };
};

// Renderiza la vista correspondiente a la ruta actual
const render = (route) => {
    const { route: matchedRoute, params } = extractRouteParams(route);
    
    let content;
    
    // Manejar rutas con parámetros
    if (matchedRoute === '/producto/:id') {
        content = getProductDetailView(params.id);
    } else if (routes[route]) {
        content = routes[route]();
    } else {
        content = `
            <div class="error-page">
                <h1>🔍 404 - Página no encontrada</h1>
                <p>La ruta <code>${route}</code> no existe.</p>
                <button data-route="/" class="btn btn-primary">Ir al Inicio</button>
            </div>
        `;
    }
    
    app.innerHTML = content;
    
    // Actualizar navegación activa
    updateActiveNavigation(route);
    
    // Scroll al top al cambiar de página
    window.scrollTo(0, 0);
};

// Actualizar estado visual de la navegación
const updateActiveNavigation = (currentRoute) => {
    // Remover clase active de todos los botones de navegación
    document.querySelectorAll('nav button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Agregar clase active al botón correspondiente
    const activeBtn = document.querySelector(`nav button[data-route="${currentRoute}"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
};

// EJERCICIO 3: Cambia la ruta usando history.pushState y renderiza la nueva vista
const navigate = (route) => {
    // Evitar navegación innecesaria a la misma ruta
    if (window.location.pathname === route) {
        return;
    }
    
    window.history.pushState({ route }, '', route);
    render(route);
    
    // Opcional: Analytics o logging
    console.log(`Navegando a: ${route}`);
};

// Maneja los clics en la navegación para cambiar de vista sin recargar
// Usa delegación de eventos en todo el documento para capturar todos los botones con data-route
document.addEventListener('click', (e) => {
    if (e.target.matches('button[data-route]')) {
        e.preventDefault();
        navigate(e.target.dataset.route);
    }
    
    // Manejar botones de agregar al carrito
    if (e.target.matches('.add-to-cart')) {
        const productId = e.target.dataset.productId;
        const product = products[productId];
        if (product) {
            alert(`¡${product.name} agregado al carrito!`);
            // Aquí podrías integrar con el código del carrito anterior
        }
    }
});

// EJERCICIO 2: Maneja el evento popstate para soportar navegación con los botones del navegador
window.addEventListener('popstate', (e) => {
    // Obtener la ruta actual del navegador
    const currentRoute = window.location.pathname;
    
    // Renderizar la vista correspondiente
    render(currentRoute);
    
    console.log('Navegación con botones del navegador:', currentRoute);
});

// Función para navegar programáticamente (útil para redirects)
const redirect = (route) => {
    window.history.replaceState({ route }, '', route);
    render(route);
};

// Función para ir atrás en el historial
const goBack = () => {
    window.history.back();
};

// Función para ir adelante en el historial
const goForward = () => {
    window.history.forward();
};

// ============================================
// FUNCIONES ADICIONALES Y MEJORAS
// ============================================

// Función para obtener la ruta actual
const getCurrentRoute = () => window.location.pathname;

// Función para verificar si una ruta existe
const routeExists = (route) => {
    const { route: matchedRoute } = extractRouteParams(route);
    return routes[route] || matchedRoute === '/producto/:id';
};

// Middleware para autenticación (ejemplo)
const requireAuth = (callback) => {
    // Simulación de verificación de autenticación
    const isAuthenticated = localStorage.getItem('user') !== null;
    
    if (isAuthenticated) {
        return callback();
    } else {
        return `
            <div class="auth-required">
                <h1>🔒 Acceso Restringido</h1>
                <p>Necesitas iniciar sesión para acceder a esta página.</p>
                <button data-route="/login" class="btn btn-primary">Iniciar Sesión</button>
            </div>
        `;
    }
};

// Sistema de breadcrumbs
const generateBreadcrumbs = (route) => {
    const parts = route.split('/').filter(part => part);
    let breadcrumbs = [{ name: 'Inicio', route: '/' }];
    
    let currentPath = '';
    parts.forEach(part => {
        currentPath += `/${part}`;
        if (part === 'productos') {
            breadcrumbs.push({ name: 'Productos', route: '/productos' });
        } else if (part === 'producto') {
            // Esta parte se manejará específicamente en getProductDetailView
        }
    });
    
    return breadcrumbs;
};

// Función para manejar errores de navegación
const handleNavigationError = (error, route) => {
    console.error('Error de navegación:', error);
    app.innerHTML = `
        <div class="error-page">
            <h1>⚠️ Error de Navegación</h1>
            <p>Ocurrió un error al intentar navegar a: <code>${route}</code></p>
            <p class="error-details">${error.message}</p>
            <button data-route="/" class="btn btn-primary">Ir al Inicio</button>
        </div>
    `;
};

// Función para precargar rutas (opcional)
const preloadRoute = (route) => {
    try {
        const { route: matchedRoute, params } = extractRouteParams(route);
        if (matchedRoute === '/producto/:id') {
            // Precargar datos del producto
            const product = products[params.id];
            if (product) {
                console.log(`Producto ${params.id} precargado:`, product);
            }
        }
    } catch (error) {
        console.warn('Error al precargar ruta:', error);
    }
};

// ============================================
// INICIALIZACIÓN
// ============================================

// Render inicial según la ruta actual
document.addEventListener('DOMContentLoaded', () => {
    const initialRoute = window.location.pathname;
    render(initialRoute);
    
    // Opcional: Precargar rutas comunes
    preloadRoute('/productos');
});

// Manejar errores globales de JavaScript
window.addEventListener('error', (e) => {
    console.error('Error global:', e.error);
    // Opcional: Mostrar mensaje de error al usuario
});

// Render inicial para casos donde DOMContentLoaded ya se ejecutó
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => render(window.location.pathname));
} else {
    render(window.location.pathname);
}