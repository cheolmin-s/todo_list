
const init = function(){

    const form = document.querySelector('.form'),
      input = form.querySelector('.input')

    const ul = document.createElement('ul');
    const TODO_LS = "loadToDo";
    let toDos = [];

    form.appendChild(ul);
    const toDoList = document.querySelector('ul');
    ul.id = "todo-list";
    input.setAttribute('placeholder', 'Enter To Do Today');

    function delSelected(event){
        const target = event.target;
        const list = target.parentNode;

        toDoList.removeChild(list);
        const cleanToDos = toDos.filter(function(toDo){
            return toDo.id !== parseInt(list.id);
        });
        toDos = cleanToDos;
        saveToDo();
    }
    
    function saveToDo(){
        localStorage.setItem(TODO_LS, JSON.stringify(toDos));
    }

    function text(text){
        const li = document.createElement('li');
        const span = document.createElement('span');
        const button = document.createElement('button');
        const newId = toDos.length + 1;

        button.addEventListener('click', delSelected);
        
        ul.appendChild(li);
        li.appendChild(span);
        li.appendChild(button);
        button.setAttribute( 'type', 'button');
        span.innerText = text;
        li.id = newId;

        const toDoObj = {
            text: text,
            id: newId
        }
        toDos.push(toDoObj);
        saveToDo();
    }

    function handleSubmit(event){
        event.preventDefault();

        const currentValue = input.value;
        
        if( currentValue !== "" ){
            text(currentValue);   
        };
        
        input.value = "";
    }

    function loadToDos(){
        const loadToDo = localStorage.getItem(TODO_LS);
        
        if( loadToDo !== null ){
            const parsedToDos = JSON.parse(loadToDo);
            parsedToDos.forEach(function(toDo){
                text(toDo.text);
            });
        } 
    }   

    //init
    loadToDos();
    form.addEventListener('submit', handleSubmit);
    
}

init();