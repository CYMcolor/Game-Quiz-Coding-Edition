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

initScores();

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
    //list length max value of 10 replace min else just add it
    //will replace older score in favor of new   
    if(highScoresList.length == 10)
    {
        highScoresList[highScoresList.length-1] = input;
    }
    else
        highScoresList.push(input);
    userName.value="";
    
    //sort by score highest to lowest
    highScoresList.sort(function(a,b)
    {
        return parseInt(b.score) - parseFloat(a.score);
    });
    storeScores();
    displayScores();
    
});


function displayScores()
{
    //clear highschores
    highScores.innerHTML = "";
    //create new li elements for each score
    for( var i = 0; i < highScoresList.length; i++)
    {
        var data = highScoresList[i];

        var li = document.createElement("li");
        var spanName = document.createElement("span");
        var spanScore = document.createElement("span");
        spanName.setAttribute("id", "name");
        spanScore.setAttribute("id", "scoreList")
        li.innerHTML = i+1 + ")\t"; 
        spanName.innerHTML = data.name;
        spanScore.innerHTML =  data.score;

        highScores.appendChild(li);
        li.appendChild(spanName);
        li.appendChild(spanScore);

    } 
    
}

function storeScores()
{
    localStorage.setItem("scores", JSON.stringify(highScoresList));
}

function initScores()
{
    var storedScores = JSON.parse(localStorage.getItem("scores"));

    //if the scores aren't empty update
    if (storedScores !== null) 
    {
        highScoresList = storedScores;
    }
    
    //sort by score highest to lowest
    highScoresList.sort(function(a,b)
    {
        return parseInt(b.score) - parseFloat(a.score);
    });

    displayScores(highScoresList);
}