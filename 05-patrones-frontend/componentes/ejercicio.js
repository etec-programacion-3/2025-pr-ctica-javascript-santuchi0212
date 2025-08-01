// Componente Tarjeta: genera un elemento visual para mostrar información
export function Tarjeta({ titulo, contenido, onEdit }) {
    const div = document.createElement('div');
    div.className = 'tarjeta';
    div.innerHTML = `<h2>${titulo}</h2><p class="contenido">${contenido}</p>`;
    const btnEditar = document.createElement('button');
    btnEditar.textContent = 'Editar';
    btnEditar.onclick = () => {
        const nuevoContenido = prompt('Edita el contenido:', contenido);
        if (nuevoContenido !== null) {
            div.querySelector('.contenido').textContent = nuevoContenido;
            if (onEdit) onEdit(nuevoContenido);
        }
    };
    div.appendChild(btnEditar);
    return div;
}

// Componente Formulario: genera un formulario reutilizable
export function Formulario({ onSubmit }) {
    const form = document.createElement('form');
    form.className = 'formulario';
    

    // Maneja el evento submit y llama al callback con el dato ingresado
    form.onsubmit = e => {
        e.preventDefault();
        const dato = form.dato.value;
        const errorMessage = form.querySelector('.error-message');

        // Validación simple
        if (dato.trim() === '') {
            errorMessage.textContent = 'El campo no puede estar vacío.';
            errorMessage.style.display = 'block';
        } else {
            errorMessage.style.display = 'none';
            onSubmit(dato);
            form.reset();
        }
    };

    return form;
}

// Función para mostrar una tarjeta en el DOM
function mostrarTarjeta(dato) {
    const tarjeta = Tarjeta({
        titulo: 'Nueva Tarea',
        contenido: dato,
        onEdit: nuevo => {
            // Aquí puedes manejar el cambio si lo necesitas
            // Por ejemplo, mostrar un mensaje o actualizar datos
            console.log('Contenido editado:', nuevo);
        }
    });
    app.appendChild(tarjeta);
}

// Montaje de componentes en la página
const app = document.getElementById('app');

// Monta el formulario en la página y pásale la función mostrarTarjeta como callback
app.appendChild(Formulario({ onSubmit: mostrarTarjeta }));
