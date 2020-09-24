// Define UI vars
const form      = document.querySelector('#task-form');
const taskList  = document.querySelector('.collection');
const clearBtn  = document.querySelector('.clear-tasks');
const taskInput = document.querySelector('#task');
const filter    = document.querySelector('#filter');


// Load AlleventListeners
loadEventListeners ();

//Load all EventListeners
function loadEventListeners() {
    // Add Task event-inside of the loadEventListeners function
document.addEventListener('DOMContentLoaded', getTasks);
form.addEventListener('submit', addTask);
taskList.addEventListener('click',removeTask);
clearBtn.addEventListener('click',clearTasks);
filter.addEventListener('keyup',filterTasks)
}

// Function Add task event function
function addTask(e){
    if (taskInput.value==='') {
        alert('Add a Task')
    }
   
    // create Element li
    const li            = document.createElement('li');
    // Add class
    li.className        = 'collection-item';
    //Append li collection class which is defined as taskList, create textNode
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link to delete li
    const link          = document.createElement('a');
    //Add className 
    link.className      = 'delete-item secondary-content';
    //Add icon Html
    link.innerHTML      = '<i class="fa fa-remove"></i>';
    //Add the link to li
    li.appendChild(link);
    //Append li to ul
    taskList.appendChild(li);
    
    //LS
    storeTaskInLocalStorage(taskInput.value);
    
    
    // clear input
    taskInput.value = '';

    

    e.preventDefault();
    console.log(li);
} 

// Remove Task funtion
function removeTask (e){
    if (e.target.parentElement.classList.contains('delete-item')){
        if (confirm('Are you sure?')) {
    e.target.parentElement.parentElement.remove(); 
    // Remove from LS
    removeTaskFromLocalStorage(e.target.parentElement.parentElement);

}
} }
// function remove LS
function removeTaskFromLocalStorage (taskItem){
    let tasks ;
    if (localStorage.getItem('tasks') === null) {
        tasks = [] ;
    } else { 
        tasks =JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task,index) {
        if (taskItem.textContent === task) {
            tasks.splice(index,1);
        }
     });
     localStorage.setItem('tasks',JSON.stringify(tasks));  
     console.log(`${tasks} deleted`);  
}

//clear Tasks
function clearTasks(){
    if (confirm('It deletes all Tasks on the List')) {
        while (taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }
    }   
}

// Clear from Local Storage
clearTasksFromLocalStorage();

//Clear Task from LS

function clearTasksFromLocalStorage () {
    localStorage.clear();

}



// Filter Tasks
function filterTasks (e){
    const text  = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(function(task) {
        const item= task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display  = 'block';
        } else {
            task.style.display  = 'none';
        }
    }
    );

}
// Store Task
function storeTaskInLocalStorage (task) {
    let tasks ;
    if (localStorage.getItem('tasks') === null) {
        tasks = [] ;
    } else { 
        tasks =JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    }

// Get Tasks from LS
    function getTasks () {
    let tasks ;
    if (localStorage.getItem('tasks') === null) {
     tasks = [] ;
    } else { 
       tasks =JSON.parse(localStorage.getItem('tasks'));
    }   
    tasks.forEach(function(task){
        // create Element li
        const li            = document.createElement('li');
        // Add class
        li.className        = 'collection-item';
        //Append li collection class which is defined as taskList, create textNode
        li.appendChild(document.createTextNode(task));
        // Create new link to delete li
        const link          = document.createElement('a');
        //Add className 
        link.className      = 'delete-item secondary-content';
        //Add icon Html
        link.innerHTML      = '<i class="fa fa-remove"></i>';
        //Add the link to li
        li.appendChild(link);
        //Append li to ul
        taskList.appendChild(li);

    })    
}