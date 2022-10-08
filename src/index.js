/* eslint no-use-before-define: */

import './style.css';
import List from './task.js';

window.onload = () => {
  const parser = new DOMParser();
  const wrapper = document.querySelector('.wrapper');
  const listsContainer = document.querySelector('.lists-container');
  const clearBtn = document.querySelector('.clear-btn');
  const addBtn = document.querySelector('.add-btn');
  let listArray = [];

//localStorage.removeItem('listsKey');
  const taskCompleteUpdate = (e, index, t) => {
    if (e.target.checked) {
      listArray[index].completed = true;
      t.style.textDecoration = "line-through";
      }
    else {
      listArray[index].completed = false;
      t.style.textDecoration = "none";
    }

    localStorage.setItem('listsKey', JSON.stringify(listArray));
  };

  // Update task list Index
  const updateTask = () => {
    for (let i = 0; i < listArray.length; i += 1) {
      listArray[i].Index = i + 1;
    }
    localStorage.setItem('listsKey', JSON.stringify(listArray));
  };

  const removeTask = (e, newListElement) => {
    const index = e.target.getAttribute('myIndex');
    newListElement.remove();
    listArray.splice(index + 1, 1);
    updateTask();
  };

  const listObj = new List();
  addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const inputTextValue = document.querySelector('#input-task').value;
    const ind = null || listArray.length + 1;
    const comp = listObj.completed || false;
    const taskObj = new List(ind, comp, inputTextValue);
    listArray.push(taskObj);
    showTask();
    localStorage.setItem('listsKey', JSON.stringify(listArray));
    document.querySelector('#input-task').value = '';
  }); // End of addBtn event

  const showTask = () => {
    listsContainer.innerHTML = '';
    for (let i = 0; i < listArray.length; i += 1) {
      const newList = `
      <div class = "task-lists part"> 
        
        <label class = "opacity task-label"> 
        <input type="checkbox" id="${i}" ${listArray[i].completed ? 'checked' : ''}  name = "task" class = "input-task-class opacity">
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

      const delBtn = newListElement.querySelector('.delete-btn');
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

      const taskCheckBox= newListElement.querySelector('.input-task-class');
      taskCheckBox.addEventListener('change', (e) => {
        //const isComplete = listArray[i].completed;
        taskCompleteUpdate(e, i, newListElement);
      });

      // Remove task from the list
      delBtn.addEventListener('click', (e) => {
        e.preventDefault();
        removeTask(e, newListElement);
      });

      //Remove Completed tasks
      const remCompTaskBtn = document.querySelector('.clear-btn');
      remCompTaskBtn.addEventListener('click', (e) => {
        const completedTaskArray = listArray.filter(() => {
          listArray[i].completed != true;
        });
        const tempArray = [];
        for(let i = 0; i < listArray.length; i++){
          if(listArray.completed === true) {
            tempArray.push(tempArray);
          }
        }
        console.log("temp array = "+tempArray);
        //removeTask(e, newListElement);
        newListElement.remove();
        localStorage.setItem('listsKey', JSON.stringify(completedTaskArray));        
      });

      listsContainer.appendChild(newListElement);
    } // end of for loop

    wrapper.insertBefore(listsContainer, clearBtn);
  }; // end of showtask() function

  const storedListJSON = localStorage.getItem('listsKey');
  if (storedListJSON) {
    listArray = JSON.parse(storedListJSON);
    showTask();
  }
}; // End of window loads