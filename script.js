//attaching buttons ids to variables
var answer1 = document.querySelector("#answer-1");
var answer2 = document.querySelector("#answer-2");
var answer3 = document.querySelector("#answer-3");
var answer4 = document.querySelector("#answer-4");
var start = document.querySelector("#start-button");

//button evnet listeners (they share the same function)
answer1.addEventListener("click",userAnswer);
answer2.addEventListener("click",userAnswer);
answer3.addEventListener("click",userAnswer);
answer4.addEventListener("click",userAnswer);
start.addEventListener("click", switchToQuiz);

//The user answeres
function userAnswer(event)
{
    buttonPressed = event.target.id;
    console.log(buttonPressed);
}

function switchToQuiz()
{
    window.location.href = "./html/quiz.html";
}