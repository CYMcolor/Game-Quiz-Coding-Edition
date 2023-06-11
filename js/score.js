var score = document.querySelector("#score");
var start = document.querySelector("#replay-button");
//the input of the user
var userName = document.querySelector("#userName");
var form = document.querySelector("#form")
//the ul where we display it on the html
var highScores = document.querySelector("#high-scores");
//storage of highscore
var highScoresList = [];
//check if we swithed from quiz page
var switched = localStorage.getItem("fromSwitch");
//get score from the current quiz results
currentScore = localStorage.getItem("score");
score.innerHTML = localStorage.getItem("score");

//play again button
start.addEventListener("click", switchToQuiz);

//console.log("test switch: ", switched);
if(switched == "false")
{
    console.log("test switch: ", switched);
    form.remove();
}
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

    localStorage.setItem("fromSwitch",false);

    if (input.name === "")
        return;
    //list length max value of 10 replace min else just add it
    //will replace older score in favor of new 
    console.log(input);
    console.log(highScoresList.length);
    console.log(highScoresList);
    var min;
    if(highScoresList.length >= 0 && highScoresList.length < 10)
    {
        highScoresList.push(input);
    }        
    else if (highScoresList.length >=10) 
    {
        //if last reached to the tenth slot, check if the input is greater
        // replace input with the last one
        if(parseInt(highScoresList[highScoresList.length-1].score) <= parseInt(input.score))
            highScoresList[highScoresList.length-1] = input;
    }

    
    userName.value="";
    
    //sort by score highest to lowest
    highScoresList.sort(function(a,b)
    {
        return parseInt(b.score) - parseFloat(a.score);
    });

    storeScores();
    displayScores();
    //removes form so nobody submits more than once
    form.remove();
    
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

/*
// if(highScoresList.length == 0) //code freaks out if there is nothing in the array so start with pushing one
    // {
    //     highScoresList.push(input);
    //     storeScores();
    //     displayScores();
    //     //form.remove();
    //     return;
    // }
    // var min = parseInt(highScoresList[highScoresList.length-1].score);
    // if(highScoresList.length >= 10 &&  min <= parseInt(input.score))
    // {
    //     //if last reached to the tenth slot, check if the input is greater
    //     // replace input with the last one
    //     highScoresList[highScoresList.length-1] = input;
    // }
    // else if( highScoresList.length > 0 && first == false)  //for when the list has not reached ten
    //     highScoresList.push(input);
*/