import {Todo} from './ToDoClass.js'

//Constant variables
const CHECKED = "inputChecked";
const UNCHECKED = "inputUncheked";
const LINED = 'line-through'

//Selectors
const inputText = document.getElementById('inputTodo');
const list = document.getElementById('listTodos');
const itemsNum = document.getElementById('itemsNum')
const active = document.getElementById('active')
const completed = document.getElementById('completed')
const all = document.getElementById('all')
const btnAdd = document.getElementById('addBtn');

//Initial logic
let listToDo = [];
let id = 0;
let itemsToDo = 0

//LocalStorage Initlization
let data = localStorage.getItem('TODO');
if(data){
    listToDo = JSON.parse(data);
    id = listToDo.length;
    loadList(listToDo);
}else{
    listToDo = [];
    id = 0;
}

//LISTENERS
all.addEventListener('click', function(event){
    list.innerHTML = ''
    listToDo.forEach(element =>{
            addToDo(element)   
    })
})
 
active.addEventListener('click', function(event){
    list.innerHTML = ''
    listToDo.forEach(element =>{
        if(!element.completed){
            addToDo(element)
        }
    })
})

completed.addEventListener('click', function(event){
    list.innerHTML = ''
    listToDo.forEach(element =>{
        if(element.completed){
         
            addToDo(element)
        }
    })
})


btnAdd.addEventListener('click', function(event){
    const todo = inputText.value;
    if(todo){
        var toDoToAdd = new Todo(todo,false,false,id)
        addToDo(toDoToAdd);
        listToDo.push(toDoToAdd);
    }
    itemsToDo++
    localStorage.setItem('TODO', JSON.stringify(listToDo));
    id++;
    itemsNum.innerHTML ='Remaining:'+ itemsToDo;
    inputText.value =''
});


list.addEventListener('click', function(event){
    console.log(event.target)
    const element = event.target;
    const elementJob = element.attributes.job.value;
    
    if(elementJob == 'complete'){
        completeToDo(element);
    }else if(elementJob == 'delete')
        removeToDO(element);
    }
)

//FUNCTIONS

function loadList(array){ 
    array.forEach(element => {
        addToDo(element)
        itemsToDo++;
    });
}

function addToDo(item){
    if(item.trash) {return};

    const done = item.completed ? CHECKED : UNCHECKED
    const line = item.completed ? LINED : ''

    const itemHTML = `<div class='item'>
            <input type="checkbox" job='complete' class = ${done} name="" id="${item.id}">
            <p class='text ${line}'>${item.content}</p> 
            <button job='delete' id=${item.id}>Remove</button>
    </div>
    `
    const position = 'beforeend';
    list.insertAdjacentHTML(position,itemHTML);
}

function completeToDo(element){
    console.log('in here');
    element.classList.toggle(CHECKED);
    element.classList.toggle(UNCHECKED);
    element.parentNode.querySelector(".text").classList.toggle(LINED);

    listToDo[element.id].completed =  listToDo[element.id].completed ? false : true;
    listToDo[element.id].completed ? itemsToDo-- : itemsToDo++;
    itemsNum.innerHTML ='Remaining:'+ itemsToDo;
}

function removeToDO(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    listToDo[element.id].trash = true;
    itemsToDo--;
    itemsNum.innerHTML ='Remaining:'+ itemsToDo;
    localStorage.setItem('TODO', JSON.stringify(listToDo));
}

