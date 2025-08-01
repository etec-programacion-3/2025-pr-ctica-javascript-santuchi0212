// Componente Formulario: genera un formulario reutilizable
// Recibe un objeto con un callback 'onSubmit' que se ejecuta al enviar el formulario
export function Formulario({ onSubmit }) {
    const form = document.createElement('form');
    form.className = 'formulario';
    
    // Estructura del formulario con un input y un botón
    form.innerHTML = `
        <input type="text" name="dato" placeholder="Dato" required />
        <span class="error-message" style="color: red; display: none;"></span>
        <button type="submit">Enviar</button>
    `;

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
