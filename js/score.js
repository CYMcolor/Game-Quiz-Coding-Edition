var score = document.querySelector("#score");
var start = document.querySelector("#replay-button");
//the input of the user
var userName = document.querySelector("#userName");
var form = document.querySelector("#form")
//the ul where we display it on the html
var highScores = document.querySelector("#high-scores");
//storage of highscore
var highScoresList = [];

//get score from the current quiz results
currentScore = localStorage.getItem("score");
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
form.addEventListener("submit", function(event)
{
    event.preventDefault();
    var input =
     {
        name: userName.value,
        score: currentScore
     }

    if (input.name === "")
        return;
    highScoresList.push(input);
    userName.value="";
    console.log(highScoresList);
    displayScores();
    
});


function displayScores()
{
    //clear highschores
    highScores.innerHTML = "";
    
    //create new li elements for each score
    for( var i = 0; i<highScoresList.length; i++)
    {
        var data = highScoresList[i];

        var li = document.createElement("li");
        li.innerHTML = data.name + "\t\t" + data.score; 

        highScores.appendChild(li);

    } 
    console.log("display score function");
    

}

displayScores();
