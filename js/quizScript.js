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
curr = 1;
questionList.push(new question());
questionList[curr].quest = "What is 2 x 2?";
questionList[curr].answr1 = "2";
questionList[curr].answr2 = "6";
questionList[curr].answr3 = "4";
questionList[curr].answr4 = "8";
questionList[curr].correct = 3;
//Question 3
curr = 2;
questionList.push(new question());
questionList[curr].quest = "What is a mamamal?";
questionList[curr].answr1 = "Owl";
questionList[curr].answr2 = "Spider";
questionList[curr].answr3 = "Turtle";
questionList[curr].answr4 = "Bear";
questionList[curr].correct = 4;

//end of assining questions-----------------------------------------
var numberOfQuestions = questionList.length;

//quiz();
countdown();
//The user answeres
function userAnswer(event)
{
    var buttonPressed = event.target.id;
    
    console.log("index: " + index);
    console.log(buttonPressed);

    //checks if correct answer was pressed
    if(buttonPressed.slice(-1) == questionList[index].correct)
    {
        score += 200;
        checker.innerHTML = "Correct!";
    }
    else
    {
        checker.innerHTML = "Wrong!";
        timeLeft -= 10;
        //instantly shows the timer going down
        timer.innerHTML = timeLeft + " second(s) remaing";
    }
    console.log (score);
    
    index++;
    //goes to score screen if there are no more questions
    if(index >= numberOfQuestions)
    {
        localStorage.setItem("score", score);
        switchScore();
    }
        
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
    timeLeft = 100;
    timer.innerHTML = timeLeft + " second(s) remaing";
    quiz();
    //the actual timer:
    var timeInterval = setInterval(function()
    {
        //display counter
        timer.innerHTML = timeLeft + " second(s) remaing";
        //decrements time by 1 second
        timeLeft--;
        //resets timer when goes to 0 and goes to score page
        if(timeLeft == 0)
        {
            timer.innerHTML = "";
            //clearInterval stops the timer
            clearInterval(timeInterval);
            //saves the user score regardless of where they are
            localStorage.setItem("score", score);
            //goes to score page
            switchScore();
        }
            
    },1000 );

}

