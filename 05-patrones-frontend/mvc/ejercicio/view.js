// Feedback visual de error
export function mostrarError(mensaje) {
  let errorDiv = document.getElementById('error-tarea');
  if (!errorDiv) {
    errorDiv = document.createElement('div');
    errorDiv.id = 'error-tarea';
    errorDiv.style.color = 'red';
    document.body.appendChild(errorDiv);
  }
  errorDiv.textContent = mensaje;
}
// Vista: Se encarga de la presentación y la interacción con el usuario
export class TaskView {
    constructor() {
        // Referencias a los elementos del DOM
        this.list = document.getElementById('task-list');
        this.form = document.getElementById('task-form');
        this.input = document.getElementById('task-input');
    }

    // Renderiza la lista de tareas en el DOM
    render(tasks) {
        this.list.innerHTML = '';
        tasks.forEach((task, idx) => {
            const li = document.createElement('li');
            li.textContent = task;
            // Agrega botón para eliminar tarea
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.onclick = () => {
                this.removeTask(idx);
            };
            li.appendChild(deleteButton);
            this.list.appendChild(li);
        });
    }

    // Asocia el evento de agregar tarea al formulario
    bindAddTask(handler) {
        this.form.onsubmit = e => {
            e.preventDefault();
            handler(this.input.value); // Llama al controlador con el valor ingresado
            this.input.value = '';
        };
    }

    // Asocia el evento de eliminar tarea a la lista
    removeTask(index) {
        // Aquí se llamaría al controlador para eliminar la tarea
    }
}
