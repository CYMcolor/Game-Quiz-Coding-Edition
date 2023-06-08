var score = document.querySelector("#score");
var start = document.querySelector("#replay-button");
var userName =document.querySelector("#userName");
var highScores = [];
//get score from the current quiz results
score.innerHTML = localStorage.getItem("score");

//play again button
start.addEventListener("click", switchToQuiz);

function switchToQuiz()
{
    //goes to the quiz page
    window.location.href = "../html/quiz.html";
    console.log("switched");
   
}

//save high scores score
userName.addEventListener("submit", addScore);

function addScore()
{
  

}