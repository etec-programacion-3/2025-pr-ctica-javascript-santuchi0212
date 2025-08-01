// Importa las funciones del módulo de tareas
import { getTasks, addTask, removeTask } from './tareas.js';

// Referencias a los elementos del DOM
const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');

// Variable para controlar el filtro actual
let currentFilter = 'all'; // 'all', 'completed', 'pending'

// Función para crear los controles de filtro
function createFilterControls() {
    // Verifica si ya existen los controles para evitar duplicados
    if (document.getElementById('filter-controls')) return;
    
    const filterDiv = document.createElement('div');
    filterDiv.id = 'filter-controls';
    filterDiv.style.marginBottom = '20px';
    
    const filterLabel = document.createElement('label');
    filterLabel.textContent = 'Filtrar tareas: ';
    filterLabel.style.marginRight = '10px';
    
    const filterSelect = document.createElement('select');
    filterSelect.id = 'filter-select';
    filterSelect.innerHTML = `
        <option value="all">Todas</option>
        <option value="pending">Pendientes</option>
        <option value="completed">Completadas</option>
    `;
    
    filterSelect.onchange = (e) => {
        currentFilter = e.target.value;
        renderTasks();
    };
    
    filterDiv.appendChild(filterLabel);
    filterDiv.appendChild(filterSelect);
    
    // Inserta los controles antes de la lista de tareas
    list.parentNode.insertBefore(filterDiv, list);
}

// Renderiza la lista de tareas en el DOM
function renderTasks() {
    list.innerHTML = '';
    
    // Crear controles de filtro si no existen
    createFilterControls();
    
    const tasks = getTasks();
    
    // Filtrar tareas según el filtro actual
    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'all') return true;
        if (currentFilter === 'completed') return task.completed;
        if (currentFilter === 'pending') return !task.completed;
        return true;
    });
    
    filteredTasks.forEach((task, originalIdx) => {
        // Encontrar el índice original de la tarea
        const taskIndex = tasks.findIndex(t => t === task || (t.text === task.text && t.completed === task.completed));
        
        const li = document.createElement('li');
        li.style.display = 'flex';
        li.style.alignItems = 'center';
        li.style.marginBottom = '10px';
        li.style.padding = '10px';
        li.style.border = '1px solid #ddd';
        li.style.borderRadius = '5px';
        
        // Checkbox para marcar como completada
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed || false;
        checkbox.style.marginRight = '10px';
        checkbox.onchange = () => {
            // Actualizar el estado de la tarea
            const updatedTasks = getTasks();
            if (typeof updatedTasks[taskIndex] === 'string') {
                // Si la tarea es un string, convertirla a objeto
                updatedTasks[taskIndex] = {
                    text: updatedTasks[taskIndex],
                    completed: checkbox.checked
                };
            } else {
                // Si ya es un objeto, solo actualizar el estado
                updatedTasks[taskIndex].completed = checkbox.checked;
            }
            
            // Aquí necesitarías una función updateTask en tareas.js
            // Por ahora, simulamos la actualización
            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            renderTasks();
        };
        
        // Span para el texto de la tarea
        const taskText = document.createElement('span');
        const displayText = typeof task === 'string' ? task : task.text;
        taskText.textContent = displayText;
        taskText.style.flex = '1';
        taskText.style.marginRight = '10px';
        
        // Aplicar estilo de tachado si está completada
        if (task.completed) {
            taskText.style.textDecoration = 'line-through';
            taskText.style.opacity = '0.6';
        }
        
        // Botón para editar la tarea
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Editar';
        editBtn.style.marginRight = '5px';
        editBtn.style.padding = '5px 10px';
        editBtn.style.backgroundColor = '#4CAF50';
        editBtn.style.color = 'white';
        editBtn.style.border = 'none';
        editBtn.style.borderRadius = '3px';
        editBtn.style.cursor = 'pointer';
        
        editBtn.onclick = () => {
            const newText = prompt('Editar tarea:', displayText);
            if (newText && newText.trim() !== '') {
                // Actualizar la tarea
                const updatedTasks = getTasks();
                if (typeof updatedTasks[taskIndex] === 'string') {
                    updatedTasks[taskIndex] = {
                        text: newText.trim(),
                        completed: false
                    };
                } else {
                    updatedTasks[taskIndex].text = newText.trim();
                }
                
                // Guardar los cambios (simulando updateTask)
                localStorage.setItem('tasks', JSON.stringify(updatedTasks));
                renderTasks();
            }
        };
        
        // Botón para eliminar la tarea
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.style.padding = '5px 10px';
        deleteBtn.style.backgroundColor = '#f44336';
        deleteBtn.style.color = 'white';
        deleteBtn.style.border = 'none';
        deleteBtn.style.borderRadius = '3px';
        deleteBtn.style.cursor = 'pointer';
        
        deleteBtn.onclick = () => {
            if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
                removeTask(taskIndex);
                renderTasks();
            }
        };
        
        // Agregar todos los elementos al li
        li.appendChild(checkbox);
        li.appendChild(taskText);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);
        
        list.appendChild(li);
    });
    
    // Mostrar mensaje si no hay tareas para el filtro actual
    if (filteredTasks.length === 0) {
        const emptyMessage = document.createElement('li');
        emptyMessage.textContent = currentFilter === 'all' ? 
            'No hay tareas' : 
            `No hay tareas ${currentFilter === 'completed' ? 'completadas' : 'pendientes'}`;
        emptyMessage.style.textAlign = 'center';
        emptyMessage.style.color = '#666';
        emptyMessage.style.fontStyle = 'italic';
        emptyMessage.style.padding = '20px';
        list.appendChild(emptyMessage);
    }
}

// Función auxiliar para inicializar las tareas como objetos si son strings
function initializeTasks() {
    const tasks = getTasks();
    const needsUpdate = tasks.some(task => typeof task === 'string');
    
    if (needsUpdate) {
        const updatedTasks = tasks.map(task => 
            typeof task === 'string' ? 
            { text: task, completed: false } : 
            task
        );
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
}

// Maneja el evento submit del formulario para agregar una tarea
form.onsubmit = e => {
    e.preventDefault();
    if (input.value.trim() !== '') {
        // Agregar como objeto desde el inicio
        const tasks = getTasks();
        tasks.push({ text: input.value.trim(), completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        
        input.value = '';
        renderTasks();
    }
};

// Inicialización
initializeTasks();
renderTasks();