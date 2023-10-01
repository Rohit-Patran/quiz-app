let currentQuestionIndex = -1;
let wronganswer = 0;
const timerDuration = 15;
let timer;

const questionDisplay = document.querySelector("#question");
const options = document.querySelectorAll("label");
const previousButton = document.querySelector("#previous");
const nextButton = document.querySelector("#next");
const radio = document.querySelectorAll(".answer");

const quizData = [
    {
        question : "Q1. Which Industry does Indigg belong to?",
        options : ["Technology" , "E-commerce" , "Media" , "Gaming"],
        correctAnswer : "Gaming",
        selectedAnswer : "",
    } , 
    {
        question : "Q2. Where is the headquarters of Indigg?",
        options : ["Mumbai" , "Pune" , "Bengaluru" , "Delhi"],
        correctAnswer : "Bengaluru",
        selectedAnswer : "",
    } , 
    {
        question : "Q3. When was Indigg founded?",
        options : ["2023" , "2019" , "2021" , "2022"],
        correctAnswer : "2021",
        selectedAnswer : "",
    } , 
    {
        question : "Q4. Does Indigg cater to Web3?",
        options : ["Yes" , "No" , "Maybe" , "Can't say"],
        correctAnswer : "Yes",
        selectedAnswer : "",
    } , 
    {
        question : "Q4. What does DAO stands for?",
        options : ["decentralized autonomous office" , "decentralized autonomous organization" , "digital autonomous organization" , "decentralized automatic organization"],
        correctAnswer : "decentralized autonomous organization",
        selectedAnswer : "",
    }
];

function startQuiz()
{
    displayQuestion("Next");
    startTimer();
}

//dislay question with options

//reset validaton
function resetValidation()
{
    document.querySelectorAll("li").forEach(li => {
        li.style.backgroundColor = "white";
        li.style.color = "black";
    });
    radio.forEach(answerOption => answerOption.removeAttribute("disabled"));
}

function displayQuestion()
{
    resetValidation();

    currentQuestionIndex = currentQuestionIndex + 1;
    radio.forEach(item => item.checked = false); //to uncheck radio buttons
    questionDisplay.textContent = quizData[currentQuestionIndex].question; //question display
    //options display + set selected answer
    options.forEach((option , index) => {
    option.innerHTML = quizData[currentQuestionIndex].options[index];
    radio[index].addEventListener("click" , (e) => {
        e.target.setAttribute("value" , option.innerHTML); 
        quizData[currentQuestionIndex].selectedAnswer = e.target.value; 
        if(quizData[currentQuestionIndex].selectedAnswer === quizData[currentQuestionIndex].correctAnswer)
        {
            document.querySelectorAll("li")[quizData[currentQuestionIndex].options.indexOf(quizData[currentQuestionIndex].correctAnswer)].style.backgroundColor = "green";
            document.querySelectorAll("li")[quizData[currentQuestionIndex].options.indexOf(quizData[currentQuestionIndex].correctAnswer)].style.color = "white";
            clearInterval(timer);
        }
        else{
            document.querySelectorAll("li")[quizData[currentQuestionIndex].options.indexOf(quizData[currentQuestionIndex].selectedAnswer)].style.backgroundColor = "red";
            document.querySelectorAll("li")[quizData[currentQuestionIndex].options.indexOf(quizData[currentQuestionIndex].selectedAnswer)].style.color = "white";
            document.querySelectorAll("li")[quizData[currentQuestionIndex].options.indexOf(quizData[currentQuestionIndex].correctAnswer)].style.backgroundColor = "green";
            document.querySelectorAll("li")[quizData[currentQuestionIndex].options.indexOf(quizData[currentQuestionIndex].correctAnswer)].style.color = "white";
            clearInterval(timer);
        }
        radio.forEach(answerOption => answerOption.setAttribute("disabled" , true));
    });
    }
    );
    
}

function checkAnswer()
{
    //checking the scores

    if(quizData[currentQuestionIndex].selectedAnswer != quizData[currentQuestionIndex].correctAnswer)
    {
        wronganswer = wronganswer + 1;
    }

    //finalising result
    if (currentQuestionIndex + 1 > quizData.length - 1) 
    {
        document.querySelector("#quiz").innerHTML = `
        <div class="result">
        <h2>🏆 Your Score: ${(5 - wronganswer)}/${quizData.length} Correct Answers</h2>
        <p>Congratulations on completing the quiz! 🎉</p>
        <button class="reload-button" onclick="location.reload()">Retake Quiz 🔄</button>
        </div>
      `;
    }
    
}

function startTimer() {
    
    let timeLeft = timerDuration;
    const timerElement = document.getElementById("timer");
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextButton.click();
        } else {
            timerElement.textContent = (timeLeft >= 10) ? timeLeft + "s" : `0${timeLeft}s`;
            timeLeft--;
        }
    }, 1000);
}

nextButton.addEventListener("click" , () => {
    checkAnswer();
    if (currentQuestionIndex <= quizData.length - 1) 
    {
        displayQuestion();
        startTimer();
    }
});

window.onload = startQuiz();