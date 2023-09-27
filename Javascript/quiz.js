let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

const questions = [
    {
        question: "Which is largest animal in the world?",
        answers: [
            { text: "Shark", correct: false},
            { text: "Blue Whale", correct: true},
            { text: "Elephant", correct: false},
            { text: "Giraffe", correct: false},
        ]
    },
    {
        question: "Which is smallest continent in the world?",
        answers: [
            { text: "Asia", correct: false},
            { text: "Australia", correct: true},
            { text: "Arctic", correct: false},
            { text: "Africa", correct: false},
        ]
    },
    {
        question: "Which is smallest country in the world",
        answers: [
            { text: "Monaco", correct: false},
            { text: "Haiti", correct: false},
            { text: "Montenegro", correct: false},
            { text: "Vatican City", correct: true},
        ]
    },
    {
        question: "What disease commonly spread on pirate ships?",
        answers: [
            { text: "Scurvy", correct: true},
            { text: "Spanish Flu", correct: false},
            { text: "Ebola", correct: false},
            { text: "Malaria", correct: false},
        ]
    },
    {
        question: "What determines the colour of our skin?",
        answers: [
            { text: "Calcitonin", correct: false},
            { text: "Collagen", correct: false},
            { text: "Melanin", correct: true},
            { text: "Keratin", correct: false},
        ]
    },
    {
        question: "Which US state does not border Mexico?",
        answers: [
            { text: "Colorado", correct: true},
            { text: "Texas", correct: false},
            { text: "New Mexico", correct: false},
            { text: "Arizona", correct: false},
        ]
    },
    {
        question: "In what unit is pressure measured?",
        answers: [
            { text: "Watt", correct: false},
            { text: "Ohm", correct: false},
            { text: "Newtons", correct: false},
            { text: "Pascal", correct: true},
        ]
    },
    {
        question: "Which of these words is NOT part of the NATO phonetic alphabet?",
        answers: [
            { text: "Rhombus", correct: true},
            { text: "Oscar", correct: false},
            { text: "Whiskey", correct: false},
            { text: "Echo", correct: false},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score= 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz()
    }
})

startQuiz();