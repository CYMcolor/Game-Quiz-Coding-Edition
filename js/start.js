var start = document.querySelector("#start-button");
start.addEventListener("click", switchToQuiz);

function switchToQuiz()
{
    //goes to the quiz page
    window.location.href = "./html/quiz.html";
    console.log("switched");
   
}
