import _ from 'lodash';
import './style.css';

const toDoTasks = [
  {
    Index: 0,
    description: "Finish the Profesional Skils Project",
  
  },
  {
    Index: 1,
    description: "Read All the lessons",
   
  },
  {
    Index: 2,
    description: "Finish today's project",
    
  },
];

const wrapper = document.querySelector('.wrapper');
wrapper.innerHTML = `
<div class ="task-lists title"> 
<p> Today's To Do </p>
<i class="fa fa-refresh"></i>  
</div>
<div class = "add-part">
  <input type = "text" id = "input-task" name = "task-add" placehlder = "Add our list here ...>
  <i class='fas fa-level-up-alt'></i>
</div>`;
const displayTasks = () => {
  for(let i = 0; i < toDoTasks.length; i++) {
    const task = document.createElement('div');
    task.className = 'task';
    task.innerHTML = `
    
    <div class ="task-lists">
      <div>
        <input type="checkbox" id="${toDoTasks[i].Index}" value="${toDoTasks[i].description}" name = "Task" class = "input-task">
        <label for="${toDoTasks[i].Index}"> ${toDoTasks[i].description}  </label>
      </div>
      <i class="fab fa‑accessible‑icon"></i>
    </div>
    `;
    wrapper.appendChild(task);
  }
};

displayTasks();

const inputTask = document.querySelector('.input-task');
inputTask.style.color = "white";