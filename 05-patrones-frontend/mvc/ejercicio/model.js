// Validación de tarea
export function validarTarea(tarea) {
  if (!tarea || !tarea.texto || tarea.texto.length < 3) {
    return 'La tarea debe tener al menos 3 caracteres.';
  }
  return null;
}
// Modelo: Maneja los datos y la lógica de negocio de las tareas
export class TaskModel {
    constructor() {
        // Inicializa las tareas desde localStorage o como array vacío
        this.tasks = JSON.parse(localStorage.getItem('mvc-tasks')) || [];
    }

    // Devuelve una copia de la lista de tareas
    getTasks() {
        return [...this.tasks];
    }

    // Agrega una nueva tarea y guarda el estado
    addTask(task) {
        this.tasks.push(task);
        this._commit();
    }

    // Elimina una tarea por índice y guarda el estado
    removeTask(index) {
        this.tasks.splice(index, 1);
        this._commit();
    }

    // Guarda el estado actual de las tareas en localStorage
    _commit() {
        localStorage.setItem('mvc-tasks', JSON.stringify(this.tasks));
    }
}
