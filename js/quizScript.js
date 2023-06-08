//attaching ids to variables
var questionDisplay = document.querySelector("#question");
var answer1 = document.querySelector("#answer-1");
var answer2 = document.querySelector("#answer-2");
var answer3 = document.querySelector("#answer-3");
var answer4 = document.querySelector("#answer-4");
var checker = document.querySelector("#checker");
var timer = document.querySelector("#timer");

//button evnet listeners (they share the same function)
answer1.addEventListener("click",userAnswer);
answer2.addEventListener("click",userAnswer);
answer3.addEventListener("click",userAnswer);
answer4.addEventListener("click",userAnswer);

//init
var index = 0;
var score = 0;
var timeLeft = 100;
//init questions and answers

//this establish object format
var question = function()
{
    this.quest = "";
    this.answr1 = "";
    this.answr2= "";
    this.answr3= "";
    this.answr4= "";
    this.correct= 0
}

//this creates array of the question object
var questionList = [];

//assgin values------------------------------------------------------
//Question 1
var curr = 0;
questionList.push(new question());
questionList[curr].quest = "What is 1 + 1?";
questionList[curr].answr1 = "1";
questionList[curr].answr2 = "2";
questionList[curr].answr3 = "3";
questionList[curr].answr4 = "4";
questionList[curr].correct = 2;
//Question 2
curr ++;
questionList.push(new question());
questionList[curr].quest = "What is 2 x 2?";
questionList[curr].answr1 = "2";
questionList[curr].answr2 = "6";
questionList[curr].answr3 = "4";
questionList[curr].answr4 = "8";
questionList[curr].correct = 3;
//Question 3
curr ++;
questionList.push(new question());
questionList[curr].quest = "What is a mamamal?";
questionList[curr].answr1 = "Owl";
questionList[curr].answr2 = "Spider";
questionList[curr].answr3 = "Turtle";
questionList[curr].answr4 = "Bear";
questionList[curr].correct = 4;
//Question 4
curr ++;
questionList.push(new question());
questionList[curr].quest = "How many legs do spiders have?";
questionList[curr].answr1 = "6";
questionList[curr].answr2 = "8";
questionList[curr].answr3 = "2";
questionList[curr].answr4 = "4";
questionList[curr].correct = 2;
//Question 5
curr ++;
questionList.push(new question());
questionList[curr].quest = "What is a fruit";
questionList[curr].answr1 = "apple";
questionList[curr].answr2 = "chicken";
questionList[curr].answr3 = "lettuce";
questionList[curr].answr4 = "cookie";
questionList[curr].correct = 1;


//end of assigning questions-----------------------------------------
var numberOfQuestions = questionList.length;

//quiz();
countdown();

//The user answeres
var timePoint = 0;
function userAnswer(event)
{
    var buttonPressed = event.target.id;
    //var mod = scoreModifier();
    console.log("index: " + index);
    console.log(buttonPressed);
    
    calcMod = mod - timePoint;
    if (calcMod==0) //if user answers quicker than a second
        calcMod=1;
    //checks if correct answer was pressed
    //takes last char of element id and compares to the correct value
    if(buttonPressed.slice(-1) == questionList[index].correct)
    {
        console.log("score modifier " + calcMod);
        score += Math.floor(100 + (50/ calcMod));
        checker.innerHTML = "Correct!";
    }
    else
    {
        checker.innerHTML = "Wrong!";
        timeLeft -= 5;
        //instantly shows the timer going down
        timer.innerHTML = timeLeft + " second(s) remaing";
    }
    console.log (score);
    
    timePoint = mod;
    index++;
    //goes to score screen if there are no more questions
    if(index >= numberOfQuestions)
    {
        checker.innerHTML = "test last question";
        
        localStorage.setItem("score", score);
        switchScore();
    }
    // goes to next question    
    quiz();

}

//displays thw current quiz and answers depending on the index
function quiz()
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
    //how many seconds left
    timeLeft = 20;
    //the modifier adjusts score depending on how long they took to answer
    mod = 1;
    timer.innerHTML = timeLeft + " second(s) remaing";
    quiz();
    //the actual timer:
    var timeInterval = setInterval(function()
    {
        //display counter
        timer.innerHTML = timeLeft + " second(s) remaing";
        //decrements time by 1 second
        timeLeft--;
        mod ++;
        //resets timer when goes to 0 and goes to score page
        if(timeLeft == 0)
        {
            
            //saves the user score regardless of where they are
            localStorage.setItem("score", score);
            //goes to score page
            switchScore();
        }
            
    },1000 );

}

// function wait()
// {
//     var wait = 0;
//     var timeInterval = setTimeout(function()
//     {
//         wait++;
//         if (wait == 20)
//         {
//             clearTimeout(timeInterval);
//         }
     
//     },1000 );

//     wait = timeInterval;
    
//     return wait;
// }