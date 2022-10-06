// import _ from 'lodash';
import './style.css';

window.onload = () => {
  const parser = new DOMParser();

class List{
  constructor(Index = listArray.length, completed = false, description) {
    this.Index = Index;
    this.completed = completed;
    this.description = description;
  }
}

let listArray = [];
const storedListJSON = localStorage.getItem('listsKey');
if(storedListJSON) {
  listArray = JSON.parse(storedListJSON);
  console.log(storedListJSON);  
}
//localStorage.removeItem('listsKey');
const wrapper = document.createElement('div');
wrapper.className = 'wrapper';
wrapper.innerHTML = `
  <div class ="task-lists title part"> 
    <p class ="opacity"> Today's To Do </p>
    <button type = "button" class = "btn refresh">
    <i class="fa fa-refresh"></i>  
    </button>
  </div>
  <div class = "add-part part">
    <input type = "text" id = "input-task" name = "task-add" placeholder = "Add your list here ..." class ="opacity">
    <button type = "button" class = "btn add-btn"">
      <i class="fa-solid fa-turn-down-left"></i>
    </button>
  </div>
`;
const body = document.querySelector('body');
body.append(wrapper);

const addBtn = document.querySelector('.add-btn');
/*  
taskInput.addEventListener("keypress", (e) => {
  if(e.key === "Enter") {
    e.preventDefault();
    //addEvent();
    addBtn.click();
  }
}); */


 //let listObj = new List(0, false, null);
  addBtn.addEventListener("click", (e) => {
    const taskInput = document.querySelector('#input-task');
    //console.log('Input task value = '+taskInput.value);
    const taskInputValue = taskInput.value;
    const l = listArray.length;
    //console.log('listArray len= '+l)
    listObj = new List([l, listObj.completed, taskInputValue]);
    console.log('listobj...= '+listObj);
    if(Array.isArray(listArray)) {
    listArray.push(listObj);
    console.log('Newest Logged= '+listArray);
    showLists();
    }
    else {
      console.log('not an Array');
    }
    
    localStorage.setItem('listsKey', JSON.stringify(listArray));  
    taskInput.innerHTML = '';
  }); // End of addBtn event


 

  console.log('storedlistJson= '+storedListJSON); 
  console.log('And listArray= '+JSON.parse(storedListJSON));
function showLists() {
  const doList = document.createElement('div');
  doList.classList.add('task-lists', 'part');
  doList.innerHTML = '';
    listArray.forEach((e, i) => {
      const newList = `
      <div class = "input-field>
        <input type="checkbox" id="t" value="ggh" name = "task" class = "input-task-class opacity" myIndex = ${i}>
        <label class = "opacity" for="t"> hellooo  </label>
      </div>
      <button type = "button" class = "edit-task btn">
        <i class='fas fa-ellipsis-v'></i>
      </button>
      `;
      console.log('Still I am working');
      const newListElement = parser.parseFromString(
        newList, 'text/html').body.firstChild;
      const removeBtn = newListElement.querySelector('.edit-task');
      removeBtn.addEventListener('click', (e) => {
        removeBook(e, newListElement);
      });
      doList.append(newList);
    });

    wrapper.append(doList);
}

function removeBook(e, newListElement) {
  const index = e.target.getAttribute('myIndex');

  function checkBtnclicked(element, i) {
    if (i === parseInt(index, 10)) {
      return false;
    }
    return true;
  }

  listArray = listArray.filter(checkBtnclicked);
  newListElement.remove();
  localStorage.setItem('listsKey', JSON.stringify(listArray));
  showLists();
}
//localStorage.removeItem('listsKey');
}; // End of window.onload event
//localStorage.removeItem('listsKey');

/* const wrapper = document.querySelector('.wrapper');
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
      <div class = "input-field>
        <input type="checkbox" id="${toDoTasks[i].Index}" value="${toDoTasks[i].description}" name = "Task" class = "input-task-class opacity">
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

displayTasks(); */