const quizData = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "HighText Machine Language", "Hyper Tabular Markup Language", "None"],
    correct: 0
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    correct: 2
  },
  {
    question: "Which is not a JavaScript Framework?",
    options: ["React", "Angular", "Vue", "Django"],
    correct: 3
  },
  {
    question: "Which is used to connect Database in PHP?",
    options: ["mysql_connect()", "mysqli_connect()", "connect_db()", "db_connect()"],
    correct: 1
  }
];

let currentQuestion = 0;
let userAnswers = [];
let timeLeft = 60;
let timerInterval;

const homeScreen = document.getElementById("home");
const quizScreen = document.getElementById("quiz");
const resultScreen = document.getElementById("result");
const questionBox = document.getElementById("questionBox");
const optionsList = document.getElementById("options");
const progressText = document.getElementById("progress");
const timerDisplay = document.getElementById("timer");
const scoreText = document.getElementById("scoreText");
const answersReview = document.getElementById("answersReview");

document.getElementById("startBtn").addEventListener("click", startQuiz);
document.getElementById("nextBtn").addEventListener("click", nextQuestion);
document.getElementById("prevBtn").addEventListener("click", prevQuestion);
document.getElementById("submitBtn").addEventListener("click", submitQuiz);

function startQuiz() {
  homeScreen.classList.remove("active");
  quizScreen.classList.add("active");
  showQuestion();
  startTimer();
}

function showQuestion() {
  const q = quizData[currentQuestion];
  questionBox.innerText = q.question;
  optionsList.innerHTML = "";

  q.options.forEach((option, index) => {
    const li = document.createElement("li");
    li.innerText = option;
    li.onclick = () => selectAnswer(index);
    if (userAnswers[currentQuestion] === index) {
      li.style.background = "#cfe2ff";
    }
    optionsList.appendChild(li);
  });

  progressText.innerText = `Q ${currentQuestion + 1} of ${quizData.length}`;
}

function selectAnswer(index) {
  userAnswers[currentQuestion] = index;
  showQuestion();
}

function nextQuestion() {
  if (currentQuestion < quizData.length - 1) {
    currentQuestion++;
    showQuestion();
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.innerText = `Time Left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      submitQuiz();
    }
  }, 1000);
}

function submitQuiz() {
  clearInterval(timerInterval);
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  let score = 0;
  answersReview.innerHTML = "";
  
  quizData.forEach((q, index) => {
    const userAns = userAnswers[index];
    const correctAns = q.correct;

    const div = document.createElement("div");
    div.innerHTML = `<p><strong>Q${index + 1}:</strong> ${q.question}<br>
    Your Answer: ${userAns !== undefined ? q.options[userAns] : "Not Attempted"} <br>
    Correct Answer: ${q.options[correctAns]}</p><hr>`;

    if (userAns === correctAns) score++;
    answersReview.appendChild(div);
  });

  scoreText.innerText = `Your Score: ${score} / ${quizData.length}`;
}
