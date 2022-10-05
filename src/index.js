import _ from 'lodash';
import './style.css';

const toDoTasks = [
  {
    Index: 0,
    description: 'Finish the Profesional Skils Project',
    completed: false,
  },
  {
    Index: 1,
    description: 'Read All the lessons',
    completed: false,
  },
  {
    Index: 2,
    description: "Finish today's project",
    completed: false,   
  },
];

const wrapper = document.querySelector('.wrapper');
wrapper.innerHTML = `
<div class ="task-lists title part"> 
<p class ="opacity"> Today's To Do </p>
<button type = "button" class = "btn refresh">
  <i class="fa fa-refresh"></i>  
</div>
<div class = "add-part part">
  <input type = "text" id = "input-task" name = "task-add" placeholder = "Add your list here ..." class ="opacity">
 <button type = "button" class = "btn">
 <i class="fa-solid fa-turn-down-left"></i>
 </button>
</div>`;
const displayTasks = () => {
  for (let i = 0; i < toDoTasks.length; i += 1) {
    const task = document.createElement('div');
    task.className = 'task';
    task.innerHTML = `
    
    <div class ="task-lists part">
      <div>
        <input type="checkbox" id="${toDoTasks[i].Index}" value="${toDoTasks[i].description}" name = "Task" class = "input-task opacity">
        <label class = "opacity" for="${toDoTasks[i].Index}"> ${toDoTasks[i].description}  </label>
      </div>
      <button type = "button" class = "edit-task btn">
        <i class='fas fa-ellipsis-v'></i>
      </button>
    </div>
    `;
    wrapper.appendChild(task);
  }
  const clearBtn = document.createElement('button');
  clearBtn.className = 'clear-btn';
  clearBtn.innerHTML = 'Clear all completed';
  wrapper.append(clearBtn);
};

displayTasks();

const inputTask = document.querySelector('.input-task');