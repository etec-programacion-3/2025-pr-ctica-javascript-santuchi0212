import { validarTarea } from './model.js';
import { mostrarError } from './view.js';

export function agregarTarea(tarea) {
  const error = validarTarea(tarea);
  if (error) {
    mostrarError(error);
    return;
  }
  // ...lógica para agregar tarea...
}
// Controlador: Maneja la lógica de la aplicación
export class TaskController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        // Vincula el evento de agregar tarea
        this.view.bindAddTask(this.handleAddTask.bind(this));
        this.render();
    }

    // Maneja la adición de una tarea
    handleAddTask(task) {
        this.model.addTask(task);
        this.render();
    }

    // Renderiza la vista con las tareas actuales
    render() {
        const tasks = this.model.getTasks();
        this.view.render(tasks);
    }
}
