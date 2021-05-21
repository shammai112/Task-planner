// Heading code
text = 'TASK PLANNER';  // The message displayed
chars = 'ABCDEFG HIJKLMNOPQRSTUVWXYZ';  // All possible Charactrers
scale = 50;  // Font size and overall scale
breaks = 0.003;  // Speed loss per frame
endSpeed = 0.05;  // Speed at which the letter stops
firstLetter = 20;  // Number of frames untill the first letter stopps (60 frames per second)
delay = 18;  // Number of frames between letters stopping

canvas = document.querySelector('canvas');
ctx = canvas.getContext('2d');

text = text.split('');
chars = chars.split('');
charMap = [];
offset = [];
offsetV = [];

for(var i=0;i<chars.length;i++){
  charMap[chars[i]] = i;
}

for(var i=0;i<text.length;i++){
  var f = firstLetter+delay*i;
  offsetV[i] = endSpeed+breaks*f;
  offset[i] = -(1+f)*(breaks*f+2*endSpeed)/2;
}

(onresize = function(){
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
})();

requestAnimationFrame(loop = function(){
  ctx.setTransform(1,0,0,1,0,0);
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.globalAlpha = 1;
  ctx.fillStyle = 'rgba(255,255,255,0)';
  ctx.fillRect(0,(canvas.height-scale)/2,canvas.width,scale);
  for(var i=0;i<text.length;i++){
    ctx.fillStyle = 'slategrey';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.setTransform(1,0,0,1,Math.floor((canvas.width-scale*(text.length-1))/2),Math.floor(canvas.height/2));
    var o = offset[i];
    while(o<0)o++;
    o %= 1;
    var h = Math.ceil(canvas.height/2/scale)
    for(var j=-h;j<h;j++){
      var c = charMap[text[i]]+j-Math.floor(offset[i]);
      while(c<0)c+=chars.length;
      c %= chars.length;
      var s = 1-Math.abs(j+o)/(canvas.height/2/scale+1)
      ctx.globalAlpha = s
      ctx.font = scale*s + 'px Helvetica'
      ctx.fillText(chars[c],scale*i,(j+o)*scale);
    }
    offset[i] += offsetV[i];
    offsetV[i] -= breaks;
    if(offsetV[i]<endSpeed){
      offset[i] = 0;
      offsetV[i] = 0;
    }
  }
  
  requestAnimationFrame(loop);
});

// Form ------

let myTask = []
let arrayBack = localStorage.getItem("submittedTask")

// stores value into Storage and cards

document.querySelector('#myButton').addEventListener('click', function () {
  console.log('Button was clicked');

const Name = document.querySelector("#Name").value;
const Description = document.querySelector("#Description").value;
const Assignedto = document.querySelector("#Assignedto").value;
const DueDate = document.querySelector("#Duedate").value;
const Status = document.querySelector("#Status").value;
  
// this is where you call the Storage function
let isAllValid = validateForm(Name, Assignedto, Description, DueDate, Status);
if(isAllValid == true){
  console.log("valid")
  storeInStorage(Name, Description, Assignedto, DueDate, Status);
  DisplayOnCard();
} else{
  console.log("invalid")
  alert("Fill out all boxes and meet all requirements")
}
document.getElementById("taskPlanner").reset();
  
});
// this is the storage function
function storeInStorage(Name, Description, Assignedto, DueDate, Status){
  let ID = 0
    
    if(myTask.length == 0){
        ID = 1
    } else {
        let lastItemID = myTask[myTask.length-1].ID
        ID = lastItemID + 1
    }
  let JObject = {
    "Name": Name,
    "Description": Description,
    "Assignedto": Assignedto,
    "Duedate": DueDate,
    "Status": Status,
    "ID": ID
  }

  myTask.push(JObject);

  localStorage.setItem("submittedTask", JSON.stringify(myTask));
}
// this is displayed on htlm when button is clicked
function DisplayOnCard(){
        let taskCards = document.querySelector("#col3");
        taskCards.innerHTML = "";
        
        for (x in myTask){
          let taskHTML = `<div taskID="${myTask[x]['ID']}">
            <div class="card-header">
                Task ${myTask[x]['ID']}
                
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Name: ${myTask[x]['Name']}</li>
                <li class="list-group-item">Assigned To: ${myTask[x]['Assignedto']}</li>
                <li class="list-group-item">Due Date: ${myTask[x]['Description']}</li>
                <li class="list-group-item">Description : ${myTask[x]['Duedate']}</li>
                <li class="list-group-item">Status: ${myTask[x]['Status']}</li>
            </ul>
            <div class="btn-group list-group-flush"  role="group" aria-label="Basic example">
                <button type="button" class="btn btn-primary" onclick ="deleteCard()">Delete</button>
                <button type="button" class="btn btn-primary" onclick="updateCard()">Update</button>
            </div>`  
        taskCards.innerHTML += taskHTML;
        }
      }
      
// this makes everything valid
function validateForm(Name, Assignedto, Description, DueDate, Status){
  //get the values retrieved on the click event and check valid 
  //assigned by and to are > 0 and < 20
  //description is technically meant to be > 20 (over 10 for testing)
  //due date is supplied
  //status is supplied
  //test all the info supplied and return true or false

  let isAllValid = false

  if (((Name.length > 0) && (Name.length < 20)) 
  && ((Assignedto.length > 0) && (Assignedto.length < 20)) && 
  ((Description.length > 0) && (Description.length < 40)) && (DueDate) && (Status)) {
      isAllValid = true
      return isAllValid;
  }
}

// Delete button
function deleteCard (event){
let deteleB = window.event.target
// let taskID1 = deteleB.attributes.taskID1.value
for(i in myTask
) {if(myTask [i]['ID'] == myTask[x]['ID'])   
      {myTask.splice(i, 1)
      localStorage.setItem("submittedTask", JSON.stringify(myTask));
    }
  }
  location.reload()
}



