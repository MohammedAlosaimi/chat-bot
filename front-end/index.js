//Link
const link = "/phpinvisualStudioCode/chat-bot/";
// arabic and english buttons
const arabic = document.getElementById("arabic");
const english = document.getElementById("english");
// container A
const motors = Array.from(document.getElementsByClassName("motor"));
const output = Array.from(document.getElementsByClassName("motor-value"));
const motorsName = Array.from(document.getElementsByClassName("motor-num"));
const container = document.getElementById("container-A");
const runAngles = document.getElementById("run-angles");
const reset = document.getElementById("reset");
const runValue = document.getElementById("run-value");
// container B
const run = document.getElementById("start-stop");
const forward = document.getElementById("forward");
const left = document.getElementById("left");
const right = document.getElementById("right");
const backward = document.getElementById("backward");
const image = document.getElementById("image");
const imageLink = link + "images/";
//caht bot
//const chatBot = document.getElementById("chat-bot");

// when submit form A (angles)
function submitFormA(){
    var motor1 = document.getElementById("m1").value;
    var motor2 = document.getElementById("m2").value;
    var motor3 = document.getElementById("m3").value;
    var motor4 = document.getElementById("m4").value;
    var motor5 = document.getElementById("m5").value;
    var motor6 = document.getElementById("m6").value;
    // stor in the database the angles
    $.post(link + "back-end/angles.php", {m1: motor1, m2: motor2, m3: motor3, m4: motor4, m5: motor5, m6: motor6}, function(data){
        return confirm( data);
    });
}

// when submit form B (on/off)
function submitFormB(){
    var runVal = runValue.value;

    if(runVal == 0){
        runAngles.innerHTML = "On";
        runValue.value = 1;
    } else {
        runAngles.innerHTML = "Off";
        runValue.value = 0;
    }
    // stor in the database the angles
    $.post(link + "back-end/runAngles.php", {run: runVal}, function(data){
            return confirm( data);
        });
}

// when submit move
function submitMove( move ){
    
    // check if the robot in start state then add the gif image
    if(run.title == "stop"){
        if(move == "forward"){
            image.src = imageLink + "forward.gif";
        } else if(move == "left"){
            image.src = imageLink + "left.gif";
        } else if(move == "right"){
            image.src = imageLink + "right.gif";
        } else {
            image.src = imageLink + "backward.gif";
        }
    }
    // stor in the database the move
    $.post(link + "back-end/moves.php", {moves: move}, function(data){
        return confirm( data);
    });
}

// when submit the start/stop
function submitRun(){
    var action = run.title;

    // replace the start/stop button
    if(action == "start"){
        image.src = imageLink + "start.png";
        run.title = "stop";
        run.innerHTML = "stop";
        run.style.border = "3px solid red";
    } else{
        image.src = imageLink + "stop.gif";
        run.title = "start";
        run.innerHTML = "start";
        run.style.border = "3px solid green";
    }

    // store in the database
    $.post(link + "back-end/runMoves.php", {run: action}, function(data){
        return confirm( data);
    });
}

//function to clean the text
reset.addEventListener("click", () => {

    output.forEach(o => {
        o.innerHTML = "90";
    });

    motors.forEach(motor => {
        motor.value = 90;
    });
});
        
//Add number next to the range silders
motors.forEach(motor => {
    motor.addEventListener("input", i => {
                
        const selectedMotor = i.target;
        const selectedNum = selectedMotor.dataset["motornum"];
        output[parseInt(selectedNum) -1].innerHTML = selectedMotor.value;
    })
})

//change language
arabic.addEventListener("click", arLanguage);
english.addEventListener("click", enLanguage);

//for arabic language
function arLanguage(){
    
    // container A
    container.dir ="rtl";

    document.getElementById("title-A").innerHTML = "المتحكم بالذراع";

    motorsName.forEach( mn => {
        mn.innerHTML = "محرك " + mn.dataset["motornum"];
    });
    document.getElementById("save").innerHTML = "حفظ";
    if(runValue.value == 1){
        runAngles.innerHTML = "تشغيل";
    } else{
        runAngles.innerHTML = "ايقاف";
    }
    reset.innerHTML = "إعادة تعيين";

    //change reset button positoin
    reset.style.left = null;
    reset.style.right = "50%";

    // container B
    document.getElementById("title-B").innerHTML = "المتحكم بالروبوت";

    forward.innerHTML = "الامام";
    left.innerHTML = "يسار";
    right.innerHTML = "يمين";
    backward.innerHTML = "الوراء";
  
    if(run.title == "start"){
        run.innerHTML = "تشغيل";
        run.style.border = "3px solid green";
    } else{
        run.innerHTML = "ايقاف";
        run.style.border = "3px solid red";
    }

    //hide the (Engilsh) on the top of the page
    arabic.classList.remove("hidden");
    english.classList.add('hidden');

    // change chat bot to arabic
    destroy();
    window.watsonAssistantChatOptions.integrationID = "ffa12f5d-16d9-4fda-9022-c8e8be0f9d70";
    setTimeout(function(){
      const t=document.createElement('script');
      t.src="https://web-chat.global.assistant.watson.appdomain.cloud/loadWatsonAssistantChat.js";
      document.head.appendChild(t);
    });
}

//for english language
function enLanguage(){

    // container A
    container.dir ="ltr";
    
    document.getElementById("title-A").innerHTML = "Arm Controller";

    motorsName.forEach( mn => {
        mn.innerHTML = "motor " + mn.dataset["motornum"];
    });
    document.getElementById("save").innerHTML = "Save";
    if(runValue.value == 1){
        runAngles.innerHTML = "On";
    } else{
        runAngles.innerHTML = "Off";
    }
    reset.innerHTML = "Reset";

    //change reset button positoin
    reset.style.left = "50%";
    reset.style.right = null;

    // container B
    document.getElementById("title-B").innerHTML = "Robot Controller";

    forward.innerHTML = "forward";
    left.innerHTML = "left";
    right.innerHTML = "right";
    backward.innerHTML = "backward";

    if(run.title == "start"){
        run.innerHTML = "start";
        run.style.border = "3px solid green";
    } else {
        run.innerHTML = "stop";
        run.style.border = "3px solid red";
    }

    //hide the(arabic word) on the top of the page
    english.classList.remove("hidden");
    arabic.classList.add("hidden");

    // change chat bot to english
    destroy();
    window.watsonAssistantChatOptions.integrationID = "e8017b35-887b-4937-8a38-d806cdb4c9b1";
    setTimeout(function(){
      const t=document.createElement('script');
      t.src="https://web-chat.global.assistant.watson.appdomain.cloud/loadWatsonAssistantChat.js";
      document.head.appendChild(t);
    });
}

//Check whether the arm has already moved or not
fetch(link + "back-end/runAnglesInfo.php").then(
    function(response){
        return response.json();
    }
).then(function (response){
    onOrOff = parseInt(response);
    if(onOrOff == 1){
        runValue.value = 0;
        run.innerHTML = "Off";
    } else{
        runValue.value = 1;
        run.innerHTML = "On";
    }
})
.catch(err => {
    console.error(err);
});

//Check if the robot is already turned on or not
fetch(link + "back-end/runMovesInfo.php").then(
    function(response){
        return response.json();
    }
).then(function (response){
    var runInfo = response;

    if(runInfo == "start"){
        image.src = imageLink + "start.png";
        run.title = "stop";
        run.innerHTML = "stop";
        run.style.border = "3px solid red";
    } else{
        image.src = imageLink + "stop.gif";
        run.title = "start";
        run.innerHTML = "start";
        run.style.border = "3px solid green";
    }
})
.catch(err => {
    console.error(err);
});

//Destroy
function destroy(){
    document.head.removeChild(document.head.lastChild);
    document.body.removeChild(document.body.lastChild);
}

// Chat bot
window.watsonAssistantChatOptions = {
    integrationID: "e8017b35-887b-4937-8a38-d806cdb4c9b1", // The ID of this integration.
    region: "eu-de", // The region your integration is hosted in.
    serviceInstanceID: "933848e9-b27d-4be4-801c-31c65bf6d016", // The ID of your service instance.
    onLoad: function(instance) { instance.render(); }
  };
setTimeout(function(){
  const t=document.createElement('script');
  t.src="https://web-chat.global.assistant.watson.appdomain.cloud/loadWatsonAssistantChat.js";
  document.head.appendChild(t);
});