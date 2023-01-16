var nextId = 0;   //the next Id will be added 
function addTodo(title, date, time, left){

    document.getElementById("todoList").innerHTML+=`
                                        <ul id='todo_${nextId}' class="list-group list-group-horizontal rounded-0  bg-transparent">
                                        <li
                                        class="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
                                        <div class="form-check">
                                            <input class="form-check-input me-0" type="checkbox" value="" id="flexCheckChecked_${nextId}'"
                                            aria-label="..."  />
                                        </div>
                                        </li>
                                        <li
                                        class="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
                                        <p id="title_${nextId}" class="lead fw-normal mb-0"> ${title} </p>
                                        </li>
                                        <li class="list-group-item ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
                                        <div class="d-flex flex-row justify-content-end mb-1">
                                            <a href="#!" class="text-info" data-mdb-toggle="tooltip" title="Edit todo"><i
                                                class="fas fa-pencil-alt me-3" onclick="edit_todo('${nextId}')"></i></a>
                                            <a href="#!" class="text-danger" data-mdb-toggle="tooltip" title="Delete todo"><i
                                                class="fas fa-trash-alt" onclick="delete_todo('${nextId}')"></i></a>
                                        </div>
                                        <div class="text-end text-muted">
                                            <a href="#!" class="text-muted" data-mdb-toggle="tooltip" title="Created date">
                                            <p class="small mb-0">${date}  ${time}</p>
                                            <small id="timeLeft_${nextId}" class="text-muted"> ${left} </small>
                                            </a>
                                        </div>
                                        </li>
                                    </ul>
                                                    `
    nextId += 1;
}

function finished(id){
    //alert(document.getElementById("todo_" + id).value);
    var current = document.getElementById("todo_" + id);
    alert(current.style.backgroundColor);
    if (current.style.backgroundColor == 'white'){
        current.style.backgroundColor = 'lavender';
    }

}

var currId = null; //currently being edited 
var curDiv = null;

function edit_todo(id){
    currId = id;
    curDiv = document.getElementById("todo_" + id);
    curDiv.style.backgroundColor = "beige";
    $("#titleInput").val($("#title_" + id).text());
    $("#submit").text("Update");
    addCancelButton();

}

function updateTodo(title, date, time, left){
    $("#title_" + currId).text(title);
    $("#datetime_" + currId).text(date + "    " + time);
    $("#timeLeft_" + currId).text(left);
    resetingButton();
    curDiv.style.backgroundColor = "white";

}

function resetingButton(){
    document.getElementById("todo-form").reset();
    curDiv.style.backgroundColor = "white"
    $("#submit").text("Add Todo");
    $("#cancelButton").remove();
}

function addCancelButton(){
    var cancelbutton = document.createElement("button");
    cancelbutton.type= null;
    cancelbutton.id = "cancelButton";
    cancelbutton.className= "mx-auto btn btn-primary";
    cancelbutton.style.backgroundColor="orange";
    cancelbutton.innerText= "Cancel";
    cancelbutton.addEventListener('click', function(){resetingButton()});
    document.getElementById("buttons").appendChild(cancelbutton);
    
}


function delete_todo(id){
    resetingButton();
    document.getElementById("todo-form").reset();
    $("#todo_" + id).remove();
}

$("#todo-form").submit(function(){
    //ajax
    var title = document.getElementById("titleInput").value;
    var date = document.getElementById("dateInput").value;
    var time = document.getElementById("timeInput").value;
    var diff = Math.abs(new Date(date) - new Date());
    if ($("#submit").text() == "Update"){
        updateTodo(title, date, time,dhm(diff));
    } else {
        addTodo(title, date, time,dhm(diff));
    }
    document.getElementById("todo-form").reset();
    return false;
})

function dhm(t){
    if (isNaN(t)){
        return "No deadline";
    }
    var cd = 24 * 60 * 60 * 1000,
        ch = 60 * 60 * 1000,
        d = Math.floor(t / cd),
        h = Math.floor( (t - d * cd) / ch),
        m = Math.round( (t - d * cd - h * ch) / 60000),
        pad = function(n){ return n < 10 ? '0' + n : n; };
    if( m === 60 ){
        h++;
        m = 0;
    }
    if( h === 24 ){
        d++;
        h = 0;
    }
    return d + " days " + pad(h) + " hours " + pad(m) + " minutes left" ;
    }
