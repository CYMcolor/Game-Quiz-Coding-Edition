//attaching ids to variables
var questionDisplay = document.querySelector("#question");
var answer1 = document.querySelector("#answer-1");
var answer2 = document.querySelector("#answer-2");
var answer3 = document.querySelector("#answer-3");
var answer4 = document.querySelector("#answer-4");
var checker = document.querySelector("#checker");
var timer = document.querySelector("#timer");
var checker = document.querySelector("#checker");

//button evnet listeners (they share the same function)
answer1.addEventListener("click",userAnswer);
answer2.addEventListener("click",userAnswer);
answer3.addEventListener("click",userAnswer);
answer4.addEventListener("click",userAnswer);

//init
var index = 0;
var score = 0;
var timeLeft = 100;
var rand = [];
//test to see if scores was from quiz page
localStorage.setItem("fromSwitch",true);

//init questions and answers

//this establish object format
var question = function(quest, answr1,answr2,answr3,answr4,correct)
{
    this.quest = quest;
    this.answr1 = answr1;
    this.answr2 = answr2;
    this.answr3 = answr3;
    this.answr4 = answr4;
    this.correct = correct
}

//this creates array of the question object
var questionList = [];

//assgin values------------------------------------------------------
//Question 1
questionList.push(new question
(
    "Commonly used data types do NOT include",
    "strings",
    "booleans",
    "alerts",
    "numbers",
    3
));
//Question 2
questionList.push(new question
(
    "The condition in an if/else statement is enclosed with _______.",
    "quotes" ,
    "curly brackets",
    "parenthesis",
    "square brackets",
    3
));

//Question 3
questionList.push(new question
(
    "A very useful tool used during development and debugging for printing content to the debugger is:",
    "JavaScript" ,
    "terminal/bash",
    "for loops",
    "console.log",
    4
));

// Question 4
questionList.push(new question
(
    "Arrays in JavaScript can be used to store __________.",
    "numbers and strings" ,
    "other arrays",
    "booleans",
    "all of the above",
    4
));

//Question 5
questionList.push(new question
(
    "String values must be enclosed within ________ when being assigned to variables.",
    "commas",
    "curly brackets",
    "quotes",
    "parenthesis",
    3
));

//end of assigning questions-----------------------------------------

var numberOfQuestions = questionList.length;

//quiz();
questionList = randomQuestions();
countdown();

//The user answeres
var timePoint = 0;
function userAnswer(event)
{
    //goes to score if there ar no more questions
    if(index > numberOfQuestions-1)
    {
        switchScore();
    }
    var buttonPressed = event.target.id;
    //var mod = scoreModifier();
    console.log("index: " + index);
    console.log(buttonPressed);
    /*
    howLong indicates how long the user took to answer the question
    bonus calculates the remaning time compared to the howLong
    the shorter the time the longer the bonus
    */
    howLong = counter - timePoint;
    bonus = (timerLength - howLong)*scoreMult;
    console.log("how long " + howLong);
    /*checks if correct answer was pressed
    takes last char of element id and compares to the correct value */
    if(buttonPressed.slice(-1) == questionList[index].correct)
    {
        console.log("bonus points " + bonus);
        score += Math.floor(200 + bonus);
        checker.setAttribute("style","color: darkgreen");
        checker.innerHTML = "Correct!";
    }
    else
    {
        checker.setAttribute("style","color: darkred");
        checker.innerHTML = "Wrong!";
        timeLeft -= Math.floor(timerLength/10);
        //instantly shows the timer going down
        timer.innerHTML = "time: "+ timeLeft;
    }
    console.log (score);
    //marks when the button was pressed
    timePoint = counter;
    
    if(index == numberOfQuestions -1)
    {
        //check last question
        if(buttonPressed.slice(-1) == questionList[index].correct)
        {
            localStorage.setItem("last", "Last question was correct!");
        }
        else
        {
            localStorage.setItem("last", "Last question was wrong!");
        }
            
        localStorage.setItem("score", score);
        //goes to index of next question
        index++;
        //waits 2 seconds b4 switching pages to see if last question was correct or not
        switchScore();
        
    }
    else
    {
        //goes to index of next question
        index++;
        // goes to next question 
        nextQ();   
    }

}

//displays thw current quiz and answers depending on the index
function nextQ()
{
    questionDisplay.innerHTML= questionList[index].quest;
    answer1.innerHTML = questionList[index].answr1;
    answer2.innerHTML = questionList[index].answr2;
    answer3.innerHTML = questionList[index].answr3;
    answer4.innerHTML = questionList[index].answr4;
}

//go to score page
function switchScore()
{
    //goes to the quiz page
    window.location.href = "../html/score.html";
    console.log("switched");
   
}

//countdown timer
function countdown()
{
    timerLength = 10 * questionList.length;
    //how many seconds left
    timeLeft = timerLength;
    //score multiplier
    scoreMult = 50 / timerLength;
    //time taken counter
    counter = 0;
    timer.innerHTML = "time: "+ timeLeft;
    //displays 1st question in the quiz
    nextQ();
    //the actual timer:
    var timeInterval = setInterval(function()
    {
        //display counter
        timer.innerHTML = "time: "+ timeLeft;
        //decrements time by 1 second
        timeLeft--;
        counter ++;
        //resets timer when goes to 0 and goes to score page
        if(timeLeft <= 0)
        {
            clearInterval(timeInterval);
            //saves the user score regardless of where they are
            localStorage.setItem("score", score);
            //goes to score page
            switchScore();
        }
            
    },1000 );

}

function wait()
{
    var timeInterval = setTimeout(function()
    {
       switchScore();
    },1500 );
}


//make random index
function randomIndex()
{
  var newArray = Array();
  var curr;
  for (let i = 0; i < numberOfQuestions; i++)
  {
    //makes random index
    curr = Math.floor(Math.random()* numberOfQuestions);

    if(!newArray.includes(curr)) //if there are no repeats add new number
    {
      newArray[i] = curr;
    }
    else //if there are repeats
    {
      while(newArray.includes(curr)) //loops until number is no longer a repeat
      {
        curr = Math.floor(Math.random()* numberOfQuestions);
      }
      newArray[i] = curr;
    }
  }

  return newArray;

}

//randomize the questions
function randomQuestions()
{
    var randIndex = randomIndex(); 
    for (let i = 0; i < numberOfQuestions; i++)
    {
        rand.push(questionList[randIndex[i]]);
    }
    return rand;
}