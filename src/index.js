/* eslint no-use-before-define: */

import './style.css';
import List from './task.js';

window.onload = () => {
  const parser = new DOMParser();
  const wrapper = document.querySelector('.wrapper');
  const listsContainer = document.querySelector('.lists-container');
  const remCompTaskBtn = document.querySelector('.clear-btn');
  const addBtn = document.querySelector('.add-btn');
  let listArray = [];

  // localStorage.removeItem('listsKey');
  const taskCompleteUpdate = (e, index, t) => {
    if (e.target.checked) {
      listArray[index].completed = true;
      t.style.textDecoration = 'line-through';
    } else {
      listArray[index].completed = false;
      t.style.textDecoration = 'none';
    }

    localStorage.setItem('listsKey', JSON.stringify(listArray));
  };

  // Update all completed tasks
  const updateClearAllCompleted = (updatedArray, newListElement) => {
    for(let i = 0; i < updatedArray.length; i++) {
      listArray.Index = i +1;    
    }
    newListElement.remove();
    localStorage.setItem('listsKey', JSON.stringify(updatedArray));
  }

  // Update task list Index
  const updateTask = () => {
    for (let i = 0; i < listArray.length; i += 1) {
      listArray[i].Index = i +1;
    }
    localStorage.setItem('listsKey', JSON.stringify(listArray));
  };

  const removeTask = (i, newListElement) => {
    const index = i + 1;
    console.log('remove task Index = '+ index);
    newListElement.remove();
    listArray.splice(index-1, 1);
    updateTask();
  };

  addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const listObj = new List();
    const inputTextValue = document.querySelector('#input-task').value;
    const ind = 0 || listArray.length + 1;
    const comp = listObj.completed || false;
    const taskObj = new List(ind, comp, inputTextValue);
    listArray.push(taskObj);
    showTask();
    localStorage.setItem('listsKey', JSON.stringify(listArray));
    console.log(`listarray=${localStorage.getItem('listsKey')} index= `
    + ` ${listArray[listArray.length - 1].Index}`);
    document.querySelector('#input-task').value = '';
  }); // End of addBtn event

  const showTask = () => {
    listsContainer.innerHTML = '';
    for (let i = 0; i < listArray.length; i += 1) {
      const newList = `
      <div class = "task-lists part"> 
        
        <label class = "opacity task-label"> 
        <input type="checkbox" id="${i}" ${listArray[i].completed ? 'checked' : ''}
        name = "task" class = "input-task-class opacity">
        ${listArray[i].description} </label>
       
        <input type="text" class="edit-Input hidden" value=${listArray[i].description}>
        <div class = "btn-group>   
          <button type = "button" class = " btn">
            <i class='fas fa-ellipsis-v edit-task'></i>
          </button>
          <button type = "button" class = "edit-btn btn hidden">
            <i class="fas fa-i-cursor edit"></i>
          </button>
          <button type = "button" class = "delete-btn btn hidden" myIndex = ${i}>
            <i class="fa-solid fa-trash-can delete"></i>
          </button>    
        </div>
      </div>
    
      `;
      const newListElement = parser.parseFromString(newList, 'text/html').body.firstChild;
      const threeVBtn = newListElement.querySelector('.edit-task');
      const toBeEdited = newListElement.querySelector('.task-label');

      const editInput = newListElement.querySelector('.edit-Input');
      const editBtn = newListElement.querySelector('.edit-btn');

      threeVBtn.addEventListener('click', (e) => {
        e.preventDefault();
        editBtn.classList.remove('hidden');
        threeVBtn.classList.add('hidden');
        editInput.classList.remove('hidden');
        editInput.style.width = '100%';
        editInput.style.marginRight = '10px';
        toBeEdited.classList.add('hidden');
        editInput.focus();
      });

      editInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          toBeEdited.innerHTML = editInput.value;
          toBeEdited.classList.remove('hidden');
          editBtn.classList.add('hidden');
          delBtn.classList.remove('hidden');
          editInput.classList.add('hidden');
          listArray[i].description = editInput.value;
          localStorage.setItem('listsKey', JSON.stringify(listArray));
        }
      });

      const taskCheckBox = newListElement.querySelector('.input-task-class');
      taskCheckBox.addEventListener('change', (e) => {
        taskCompleteUpdate(e, i, newListElement);
      });

      // Remove task from the list
      const delBtn = newListElement.querySelector('.delete-btn');
      delBtn.addEventListener('click', (e) => {
        e.preventDefault();
        removeTask(i, newListElement);
      });

      // Remove Completed tasks
      remCompTaskBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const updatedArray = listArray.filter(todo => todo.completed === false);      
        updateClearAllCompleted(updatedArray, newListElement);
      });
      
    listsContainer.appendChild(newListElement);
    } // end of for loop

    wrapper.insertBefore(listsContainer, remCompTaskBtn);
  }; // end of showtask() function

  const storedListJSON = localStorage.getItem('listsKey');
  if (storedListJSON) {
    listArray = JSON.parse(storedListJSON);
    showTask();

    localStorage.removeItem('tasks');
  }
}; // End of window loads