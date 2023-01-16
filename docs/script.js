var nextId = 0;   //the next Id will be added 
function addTodo(title, date, time, left){

    document.getElementById("todoList").innerHTML+=`
                                                    <div id='todo_${nextId}' class="todo-item p-4 border card" onclick="finished(${nextId})">
                                                            
                                                                <div class="">
                                            
                                                                    <h4 id="title_${nextId}" style="float:left"> ${title}</h4>
                                                                    <div style="float:right">
                                                                        <i style="cursor:pointer;" onclick="edit_todo('${nextId}')" class="far fa-edit"></i>
                                                                        <i style="cursor:pointer;" onclick="delete_todo('${nextId}')" class="fas fa-trash-alt "></i>
                                                                    </div>
                                                                </div>
                                                                <small id="datetime_${nextId}" class="text-muted"> ${date}    ${time}</small>
                                                                <small id="timeLeft_${nextId}" class="text-muted"> ${left} </small>
                                                              

                                                            
                                                            
                                                        
                                                    </div>
                                                    `
    nextId += 1;
}

function finished(id){
    //alert(document.getElementById("todo_" + id).value);
    var current = document.getElementById("todo_" + id);
    //current.classList.toggle("checked");

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
