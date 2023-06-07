//attaching buttons ids to variables
var questionDisplay = document.querySelector("#question");
var answer1 = document.querySelector("#answer-1");
var answer2 = document.querySelector("#answer-2");
var answer3 = document.querySelector("#answer-3");
var answer4 = document.querySelector("#answer-4");


//button evnet listeners (they share the same function)
answer1.addEventListener("click",userAnswer);
answer2.addEventListener("click",userAnswer);
answer3.addEventListener("click",userAnswer);
answer4.addEventListener("click",userAnswer);

//init
var index = 0;
var score = 0;

//init questions and answers
var numberOfQuestions = 2;

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
for (var i = 0; i < numberOfQuestions; i++)
{
    questionList.push(new question())
}

//assgin values
//Question 1
questionList[0].quest = "What is 1 + 1?";
questionList[0].answr1 = "1";
questionList[0].answr2 = "2";
questionList[0].answr3 = "3";
questionList[0].answr4 = "4";
questionList[0].correct = 2;

questionList[1].quest = "What is 2 x 2?";
questionList[1].answr1 = "2";
questionList[1].answr2 = "6";
questionList[1].answr3 = "4";
questionList[1].answr4 = "8";
questionList[1].correct = 3;





quiz();

//The user answeres
function userAnswer(event)
{
    var buttonPressed = event.target.id;
    
    console.log(index);
    console.log(buttonPressed);
    console.log(buttonPressed.slice(-1));

    if(buttonPressed.slice(-1) == questionList[index].correct)
    {
        score += 200;
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
    answer1.innerHTML= questionList[index].answr1;
    answer2.innerHTML= questionList[index].answr2;
    answer3.innerHTML= questionList[index].answr3;
    answer4.innerHTML= questionList[index].answr4;
}

//go to score
function switchScore()
{
    //goes to the quiz page
    window.location.href = "../html/score.html";
    console.log("switched");
   
}

