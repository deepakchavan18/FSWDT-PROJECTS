
//This is Static Approach we need Dynamic Approach so we`ll not use it

// var state={
//     taskList:[
//         {
//             ImageURL:"",
//             TaskTitle:"",
//             TaskType:"",
//             TaskDescription:"",
//         },
//         {
//             ImageURL:"",
//             TaskTitle:"",
//             TaskType:"",
//             TaskDescription:"",
//         },
//         {
//             ImageURL:"",
//             TaskTitle:"",
//             TaskType:"",
//             TaskDescription:"",
//         }
//     ]
// }


//Image /Task Name/ task Type/ Task Description all the info in the card is stored in JSON Format


//Dynamic       Storing Objects in Array
var state={
    taskList: [],
};


// // DOM OBJECTS ->>>>
var taskContents = document.querySelector(".task_contents")
var taskModal = document.querySelector(".task_modal_body")
// console.log(taskModal);




//Dynamic Card Creation
//To write an HTML code in JS (``)->Backticks are used      //Used to get dynamic card
var htmlTaskContent = ({id, title, description, type, url}) => `  
   <div class='col-md-6 col-lg-4 mt-3' id=${id} key=${id}>
        <div class='card shadow-sm task__card'>
            <div class='card-header d-flex justify-content-end task__card__header'>
              <button type="button" class="btn btn-outline-info mr-2" name="${id}" onclick="editTask.apply(this, arguments)">
                <i class="fas fa-pencil-alt" name=${id}></i>
              </button>
               <button type="button" class="btn btn-outline-danger mr-2" name="${id}" onclick="deleteTask.apply(this,arguments)">
                <i class="fas fa-trash-alt" name=${id}></i>
              </button>
            </div>
            <div class="card-body">
               ${
                url
                ? `<img width='100%' src=${url} alt='card image cap' class='card-img-top md-3 rounded-lg' />`
                : `<img width='100%' src="https://imageio.forbes.com/specials-images/dam/imageserve/1092571024/960x0.jpg?height=474&width=711&fit=bounds" alt='card image cap' class='card-img-top md-3 rounded-lg' />`
            }
            <h4 class="card-title">${title}</h4>
            <p class="description trim-3-lines text-muted data-gram_editor='false'">${description}</p>
            <div class="tags text-white d-flex flex-wrap">
              <span class="badge bg-primary m-1">${type}</span>
            </div>
            </div>
            <div class="card-footer">
              <button type="button" class="btn btn-outline-primary float-right" data-bs-toggle="modal" data-bs-target="#showTask" id=${id} onclick='openTask.apply(this, arguments)'>Open Task</button>   
            </div>
        </div>
    </div>
`;


//dynamic open task Model contents
  var htmlModalContent = ({ id, title, description, url }) => {
    var date = new Date(parseInt(id));  //Date is Displayed on the Model
    return `
    <div id=${id}>
       ${
         url
           ? `<img width='100%' src=${url} alt='card image cap' class='card-img-top md-3 rounded-lg' />`
           : `<img width='100%' src="https://imageio.forbes.com/specials-images/dam/imageserve/1092571024/960x0.jpg?height=474&width=711&fit=bounds" alt='card image cap' class='card-img-top md-3 rounded-lg' />`
       }
       <strong class='text-sm text-muted'>Created on ${date.toDateString()}</strong>
       <h2 class='my-3'>${title}</h2>
       <p class='lead'>${description}</p>
    </div>
    `;
  };


//This function is called when we need to update Browsers Local Storage from the tasklist array
  var updateLocalStorage = () => {          // Info in array should be updated on local Storage
    localStorage.setItem("task",JSON.stringify({    // JSON stands for => JavaScript Object Notation    //To store data in local storage we need data in String
      tasks: state.taskList,
    }))
  }

//LoadInitiaalData     //Method is used to get the data displayed on the UI to display the data should be in JSON format
  var loadInitialData = () =>{
    var localStorageCopy = JSON.parse(localStorage.task);

    if(localStorageCopy) state.taskList = localStorageCopy.tasks;

    state.taskList.map((cardDate) =>  {
      taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardDate));
    })
  }

  

//When we create new Task and click on Save Changees this Function is Called to save the data 
  var handleSubmit = (event) => {
    // Add event listeners for the form submission and button click events.
    const id = `${Date.now()}`;
    const input = {                   //*******************
      // Function to generate HTML content for each card in the task list.
      // Initialize the application's state by creating an empty object.
      // Verify that all required elements are present before running the script.
      url : document.getElementById("imageUrl").value,
      title : document.getElementById("taskTitle").value,
      type : document.getElementById("tags").value,
      description : document.getElementById("taskDescription").value,
    };
    if(input.title === "" || input.type === "" || input.description === "" ){
      return alert(" * PLEASE FILL ALL THE REQUIRED FIELDS * ")   //Checks and Displays when the user does not gives any input while creating an task
    }

    
    //Spread Operator
    taskContents.insertAdjacentHTML("beforeend", htmlTaskContent({
      ...input,id                      //************   this input is fetching all the info using (...) followed by upper input declared 
    }))

    state.taskList.push({ ...input,id });     // There are 2 inputs one for local browser storage and other for array
    updateLocalStorage();  // this function is not pre-defined it is defined above by the user 
};


//In task sections when we click on button " Open Task " an modal is Opened so function of this is event to be triggered [A Popun window Occurs]
var openTask = (e) =>{   //e stands for Event
    if(!e) e =window.event;
    
    var getTask = state.taskList.find(({id})=> id === e.target.id)   // to open a particular modal when an button is clicked no other window should open 
    taskModal.innerHTML = htmlModalContent(getTask)

};


// We are storing information in 3 Ways
// Array
// Local Storage 
// UI (Cards)


//DELETE TASK
//When we click on Delete Button there are 2 Chances it may be clicked on Button or Icon 
var deleteTask= (e) =>{    //e stands for Event 
  if(!e) e =window.event;

  var targetID = e.target.getAttribute("name")
  var type = e.target.tagName;
  // console.log(type); //Remove 

  var removeTask = state.taskList.filter(({id})=>id !== targetID);
  console.log(removeTask);

  state.taskList =removeTask;
  updateLocalStorage();

  if (type === "BUTTON" | "I") {
    console.log(e.target.parentNode.parentNode.parentNode);
    return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
      e.target.parentNode.parentNode.parentNode
    );
  }
  return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
    e.target.parentNode.parentNode.parentNode.parentNode
  );
};




//EDIT TASK 
var editTask = (e) => {
  if (!e) e = window.event;
  var targetID = e.target.id;
  var type = e.target.tagName;

  var parentNode;
  let taskTitle;
  var taskDescription;
  var taskType;
  let submitButton;

  if (type === "BUTTON") {
    parentNode = e.target.parentNode.parentNode;
  } else {
    parentNode = e.target.parentNode.parentNode.parentNode;
  }

  taskTitle = parentNode.childNodes[3].childNodes[3];
  // console.log(taskTitle);
  taskDescription = parentNode.childNodes[3].childNodes[5];
  taskType = parentNode.childNodes[3].childNodes[7].childNodes[1];
  console.log(taskTitle, taskDescription, taskType);
  submitButton = parentNode.childNodes[5].childNodes[1];

  taskTitle.setAttribute("contenteditable", "true");
  taskDescription.setAttribute("contenteditable", "true");
  taskType.setAttribute("contenteditable", "true");

  submitButton.setAttribute("onclick", "saveEdit.apply(this, arguments)");
  submitButton.removeAttribute("data-bs-toggle");
  submitButton.removeAttribute("data-bs-target");
  submitButton.innerHTML = "Save Changes";
};

var saveEdit = (e) => {
  if (!e) e = window.event;

  var targetID = e.target.id;
  var parentNode = e.target.parentNode.parentNode;
  // console.log(parentNode);

  var taskTitle = parentNode.childNodes[3].childNodes[3];
  var taskDescription = parentNode.childNodes[3].childNodes[5];
  var taskType = parentNode.childNodes[3].childNodes[7].childNodes[1];
  var submitButton = parentNode.childNodes[5].childNodes[1];

  var updateData = {
    taskTitle: taskTitle.innerHTML,
    taskDescription: taskDescription.innerHTML,
    taskType: taskType.innerHTML,
  };

  var stateCopy = state.taskList;
  stateCopy = stateCopy.map((task) =>
    task.id === targetID
      ? {
          id: task.id,
          title: updateData.taskTitle,
          description: updateData.taskDescription,
          type: updateData.taskType,
          url: task.url,
        }
      : task
  );

  state.taskList = stateCopy;
  updateLocalStorage();

  taskTitle.setAttribute("contenteditable", "false");
  taskDescription.setAttribute("contenteditable", "false");
  taskType.setAttribute("contenteditable", "false");

  submitButton.setAttribute("onclick", "openTask.apply(this, arguments)");
  submitButton.setAttribute("data-bs-toggle", "modal");
  submitButton.setAttribute("data-bs-target", "#showTask");
  submitButton.innerHTML = "Open Task";
};

// Search Functionality
const searchTask = (e) =>{
  if(!e) e = window.event;
  
  while(taskContents.firstChild){
      taskContents.removeChild(taskContents.firstChild);
  }

  const resultData = state.taskList.filter(({title})=>  title.includes(e.target.value));

  console.log(resultData);
  resultData.map((cardData) => {
      taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardData));
  });
}