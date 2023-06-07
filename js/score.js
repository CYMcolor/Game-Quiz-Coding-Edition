var score = document.querySelector("#score");

score.innerHTML = localStorage.getItem("score");


//play again button
var start = document.querySelector("#replay-button");
start.addEventListener("click", switchToQuiz);

function switchToQuiz()
{
    //goes to the quiz page
    window.location.href = "../html/quiz.html";
    console.log("switched");
   
}
