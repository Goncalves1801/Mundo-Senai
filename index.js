
const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)


function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)
  
  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Excelente :)"
      break
    case (performance >= 70):
      message = "Muito bom :)"
      break
    case (performance >= 50):
      message = "Bom"
      break
    default:
      message = "Pode melhorar :("
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
}


const questions = [
    {
      question: "Quantos ossos possui o corpo humano ?",
      answers: [
        { text: "300", correct: false },
        { text: "254", correct: false },
        { text: "206", correct: true },
        { text: "200", correct: false }
      ]
    },
    {
      question: "Quantos dentes os seres humanos tem ?",
      answers: [
        { text: "32", correct: true },
        { text: "40", correct: false },
        { text: "29", correct: false },
        { text: "37", correct: false }
      ]
    },
    {
      question: 'Qual é o maior orgão do corpo humano ?"',
      answers: [
        { text: 'pele', correct: true },
        { text: 'coração', correct: false },
        { text: 'pulmão', correct: false },
        { text: "intestino delgado", correct: false }
      ]
    },
    {
      question: 'Qual é a unidade básica da vida ?',
      answers: [
        { text: "vírus", correct: false },
        { text: "célula", correct: true },
        { text: "átomo", correct: false },
        { text: "proteína", correct: false }
      ]
    },
    {
      question: 'Qual é o reino constituído apenas por células procariontes ?',
      answers: [
        { text: 'animalia', correct: false },
        { text: 'monera', correct: true },
        { text: 'fungi', correct: false },
        { text: 'plantae', correct: false }
      ]
    },
    {
      question: 'A célula, é inicialmente dividida em:',
      answers: [
        { text: 'rádio, ulna e tíbia', correct: false },
        { text: 'Membrana plasmática, núcleo e citoplasma', correct: true },
        { text: 'Membrana plasmática, citoplasma e ulna', correct: false },
        { text: 'Nenhuma dessas alternativas estão corretas', correct: false }
      ]
    },
    {
      question: 'Qual a parte do DNA define as características humanas ?',
      answers: [
        { text: 'citoplasma', correct: false },
        { text: 'núcleo', correct: false },
        { text: 'arcada dentária', correct: false },
        { text: 'genes', correct: true },
      ]
    },
  ]
