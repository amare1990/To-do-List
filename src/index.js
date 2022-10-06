// import _ from 'lodash';
import './style.css';

window.onload = () => {
  const parser = new DOMParser();
  const wrapper = document.querySelector('.wrapper');
const addBtn = document.querySelector('.add-btn');

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
    showTask();
    localStorage.setItem('listsKey', JSON.stringify(listArray));
    
  }); // End of addBtn event


  function showTask() {
    //const doList = document.createElement('div');
    //doList.classList.add('task-lists', 'part');
    //doList.innerHTML = '';
    for(let i = 0; i < listArray.length; i++){
      //console.log("ListArray new = "+listArray)
      const newList = `
      <div class = "task-lists part"> 
      <div class = "input-field>
      <input type="checkbox" id="${i}" value="ggh" name = "task" class = "input-task-class opacity" myIndex = ${i}>
      <label class = "opacity task-label" for="${i}"> ${listArray[i].description}  </label>
    </div>
    <div class = "btn-group>   
      <button type = "button" class = " btn">
        <i class='fas fa-ellipsis-v edit-task'></i>
      </button>
      <button type = "button" class = "edit btn hidden">
        <i class="fas fa-i-cursor edit"></i>
      </button>
      <button type = "button" class = "delete btn hidden">
        <i class="fa-solid fa-trash-can delete"></i>
      </button>    
    </div>
  </div>
     
      `;
      //console.log('Still I am working');
      const newListElement = parser.parseFromString(newList, 'text/html').body.firstElementChild;
      const threeVBtn = newListElement.querySelector('.edit-task');
      const toBeEdited = newListElement.querySelector('.task-label');

      const edit = newListElement.querySelector('.input-task-class');
      const editBtn = newListElement.querySelector('.edit');

      threeVBtn.addEventListener('keypress', (e) => {
        if(e.key === "Enter") {
          e.preventDefault();
          toBeEdited.innerHTML = edit.innerHTML;
          editBtn.classList.remove('hidden');
          
        }
      })

      editBtn.addEventListener('keypress', (e) => {
        if(e.key === "Enter") {
          e.preventDefault();
          toBeEdited.innerHTML = edit.innerHTML;
          editBtn.classList.remove('hidden');
          
        }
      });


      wrapper.append(newListElement);
    } //end of for loop

    //wrapper.append(doList);
  }
  //localStorage.removeItem('listsKey')

}; //End of window loads