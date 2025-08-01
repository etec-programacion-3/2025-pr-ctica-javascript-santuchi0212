const cors = require('cors');
app.use(cors());


// URL base de la API de productos
const BASE_URL = 'http://localhost:5500/api/products';

// Referencias a los elementos del DOM
const list = document.getElementById('product-list');
const form = document.getElementById('product-form');

// Obtiene y muestra la lista de productos desde la API
async function fetchProducts() {
    try {
        const res = await fetch(BASE_URL); // Realiza una petición GET
        if (!res.ok) {
            throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        const products = await res.json(); // Convierte la respuesta a JSON
        list.innerHTML = '';
        
        products.forEach(prod => {
            const li = document.createElement('li');
            li.textContent = `${prod.name} - $${prod.price}`;
            
            // Llama a showDetails al hacer clic en el nombre del producto
            li.onclick = () => showDetails(prod.id);
            
            // Crea el botón de eliminar y llama a deleteProduct
            const btn = document.createElement('button');
            btn.textContent = 'Eliminar';
            btn.onclick = e => {
                e.stopPropagation(); // Evita que se dispare el evento de detalles
                deleteProduct(prod.id).then(fetchProducts);
            };
            
            li.appendChild(btn);
            list.appendChild(li);
        });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        alert('Error al cargar los productos. Por favor, intenta de nuevo.');
    }
}

// EJERCICIO 1: Crear producto
// Completa esta función para enviar los datos del formulario usando fetch POST
async function createProduct(name, price, description) {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                price: parseFloat(price),
                description: description
            })
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const newProduct = await response.json();
        console.log('Producto creado:', newProduct);
        alert('Producto creado exitosamente!');
        
    } catch (error) {
        console.error('Error al crear producto:', error);
        alert('Error al crear el producto. Por favor, verifica los datos e intenta de nuevo.');
    }
}

// EJERCICIO 2: Eliminar producto
// Completa esta función para eliminar un producto usando fetch DELETE
async function deleteProduct(id) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        console.log(`Producto con ID ${id} eliminado`);
        alert('Producto eliminado exitosamente!');
        
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        alert('Error al eliminar el producto. Por favor, intenta de nuevo.');
    }
}

// EJERCICIO 3: Ver detalles de producto
// Completa esta función para mostrar detalles usando fetch GET /products/:id
async function showDetails(id) {
    try {
        const response = await fetch(`${BASE_URL}/${id}`);
        
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const product = await response.json();
        
        // Mostrar detalles con alert (puedes cambiarlo por DOM si prefieres)
        const details = `
DETALLES DEL PRODUCTO:
------------------------
ID: ${product.id}
Nombre: ${product.name}
Precio: $${product.price}
Descripción: ${product.description || 'Sin descripción'}
        `;
        
        alert(details);
        
        // Alternativa: mostrar en el DOM
        // const detailsDiv = document.getElementById('product-details');
        // if (detailsDiv) {
        //     detailsDiv.innerHTML = `
        //         <h3>Detalles del Producto</h3>
        //         <p><strong>ID:</strong> ${product.id}</p>
        //         <p><strong>Nombre:</strong> ${product.name}</p>
        //         <p><strong>Precio:</strong> $${product.price}</p>
        //         <p><strong>Descripción:</strong> ${product.description || 'Sin descripción'}</p>
        //     `;
        // }
        
    } catch (error) {
        console.error('Error al obtener detalles del producto:', error);
        alert('Error al cargar los detalles del producto. Por favor, intenta de nuevo.');
    }
}

// Maneja el submit del formulario para crear un producto
form.onsubmit = async e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const description = document.getElementById('description').value;
    
    // Validación básica
    if (!name.trim() || !price.trim()) {
        alert('Por favor, completa al menos el nombre y el precio del producto.');
        return;
    }
    
    // Llama a la función de crear producto
    await createProduct(name, price, description);
    form.reset();
    fetchProducts();
};

// Llama a la función para mostrar los productos al cargar la página
fetchProducts();