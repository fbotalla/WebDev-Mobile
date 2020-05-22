import {Todo} from './ToDoClass.js'

var list = new Array();


const btn = document.getElementById('addBtn');
btn.addEventListener('click', addToList,false)

function addToList(){
    var input = document.getElementById('inputTodo').value;
    var todo = new Todo(input, new Date())
    list.push(todo);

    localStorage.setItem('ToDos', JSON.stringify(list))

    var div = document.createElement('div');
    var btnDiv = document.createElement('button');
    var checkBox = document.createElement('input')
    var spanPar = document.createElement('span')

    spanPar.id = 'todopar'
    spanPar.innerHTML = todo.getValue();

    checkBox.type = 'checkbox'
    checkBox.id = 'check'
    checkBox.addEventListener('change',completeTodo,false)
    
    btnDiv.id = 'delete' 
    btnDiv.innerHTML = 'delete'
    btnDiv.addEventListener('click', deleteFromList,false);
    

    div.id = 'container';
    div.innerHTML = todo.getValue();
    if(input != ''){
       // document.getElementById('todoContainer').appendChild(div).appendChild(spanPar);
        document.getElementById('todoContainer').appendChild(div).appendChild(btnDiv);
        document.getElementById('todoContainer').appendChild(div).appendChild(checkBox);
    }

    document.getElementById('itemsNum').innerHTML = localStorage.length + ' tasks left'

}

function deleteFromList(){
    var div = this;
    if (div) {
        div.parentNode.remove(div);
        localStorage.removeItem('ToDos')
    }
}
function completeTodo(){
  var div = this;
   this
  
}

