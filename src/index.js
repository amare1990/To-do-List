// import _ from 'lodash';
import './style.css';

window.onload = () => {
  const parser = new DOMParser();
  const wrapper = document.querySelector('.wrapper');
  const listsContainer = document.querySelector('.lists-container');
const addBtn = document.querySelector('.add-btn');

class List{
  constructor(Index = listArray.length, completed = false, description) {
    this.Index = Index;
    this.completed = completed;
    this.description = description;
  }
}
//localStorage.removeItem('listsKey');
let listArray = [];
const storedListJSON = localStorage.getItem('listsKey');
if(storedListJSON) {
  listArray = JSON.parse(storedListJSON);
  showTask(); 
}

 let listObj = new List();
  addBtn.addEventListener("click", (e) => {
    
    const inputTextValue = document.querySelector('#input-task').value;
    const ind = null || listArray.length+1;
    const comp = listObj.completed || false;
    const taskObj = new List(ind, comp, inputTextValue);
    listArray.push(taskObj);
    //console.log(taskObj);
    //showOnlyThisTask(taskObj);
    showTask();
    localStorage.setItem('listsKey', JSON.stringify(listArray));
    
  }); // End of addBtn event

  function showOnlyThisTask(taskObj) {

  }

  function showTask() {
    //const doList = document.createElement('div');
    //doList.classList.add('task-lists', 'part');
    //doList.innerHTML = '';
    listsContainer.innerHTML = '';
    for(let i = 0; i < listArray.length; i++){
      //console.log("ListArray new = "+listArray)
      const newList = `
      <div class = "task-lists part"> 
        <div class = "input-field>
        <input type="checkbox" id="${i}" ${listArray[i].completed ? 'checked':''}  value="${listArray[i].description} " name = "task" class = "input-task-class opacity">
        <label class = "opacity task-label" for="${i}"> ${listArray[i].description}  </label>
        </div>
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
      //console.log('Still I am working');
      const newListElement = parser.parseFromString(newList, 'text/html').body.firstElementChild;
      const threeVBtn = newListElement.querySelector('.edit-task');
      const toBeEdited = newListElement.querySelector('.task-label');

      const editInput = newListElement.querySelector('.edit-Input');
      const editBtn = newListElement.querySelector('.edit-btn');

      threeVBtn.addEventListener('click', (e) => {        
          editBtn.classList.remove('hidden');
          threeVBtn.classList.add('hidden');
          editInput.classList.remove('hidden');
          editInput.style.width = "100%";
          editInput.style.marginRight = '10px';
          toBeEdited.classList.add('hidden');
          editInput.focus();
      });

       const delBtn = newListElement.querySelector('.delete-btn');
       editInput.addEventListener('keypress', (e) => {
        if(e.key === "Enter") {
          e.preventDefault();
          toBeEdited.innerHTML = editInput.value;
          toBeEdited.classList.remove('hidden');
          editBtn.classList.add('hidden');  
          delBtn.classList.remove('hidden');
          editInput.classList.add('hidden');
          //threeVBtn.classList.remove('hidden');
          listArray[i].description = editInput.value;
          localStorage.setItem('listsKey', JSON.stringify(listArray));
        }
      });
      
      // Remove task from the list
      delBtn.addEventListener('click', (e) => {
        e.preventDefault();
        removeTask(e, newListElement);
      });


      listsContainer.append(newListElement);
    } //end of for loop

    wrapper.append(listsContainer);
  } //end of showtask() function

  function removeTask(e, newListElement) {
    const index = e.target.getAttribute('myIndex');
    console.log('Index log = '+index);
    newListElement.remove();
    
    listArray.splice(index+1, 1);
 
    updateTask();
    console.log('listArray after trashing'+listArray);
    //showTask();
  }

  //Update task list
  function updateTask() {
    for(let i = 0; i < listArray.length; i++) {
      listArray[i].Index = i+1;
    }
    localStorage.setItem('listsKey', JSON.stringify(listArray));
  }
  //localStorage.removeItem('listsKey')

}; //End of window loads