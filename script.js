class Quiz {
  constructor(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
  }

  getQuestionIndex() {
    return this.questions[this.questionIndex];
  }

  guess(answer) {
    if (this.getQuestionIndex().isCorrectAnswer(answer)) {
      this.score++;
    }
    this.questionIndex++;
  }

  isEnded() {
    return this.questionIndex === this.questions.length;
  }
}

class Questions {
  constructor(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }
  isCorrectAnswer(choice) {
    return this.answer === choice;
  }
}

function displayQuestions() {
  if (quiz.isEnded()) {
    showScores();
  } else {
    let quizElement = document.getElementById('question');
    quizElement.innerHTML = quiz.getQuestionIndex().text;

    let choices = quiz.getQuestionIndex().choices;

    for (let q = 0; q < choices.length; q++) {
      let choiceElement = document.getElementById('option' + q);
      choiceElement.innerHTML = choices[q];
      guess('btn' + q, choices[q]);
    }

    showProgress();
  }
}

function showProgress() {
  let currentQuestionNumber = quiz.questionIndex + 1;
  let progresselement = document.getElementById('progress');
  progresselement.innerHTML = `Question ${currentQuestionNumber} of ${quiz.questions.length}`;
}

function guess(id, guessAnswer) {
  let button = document.getElementById(id);
  button.onclick = function () {
    quiz.guess(guessAnswer);
    displayQuestions();
  };
}

function showScores() {
  let endQuiz = `
    <h1>Quiz Completed</h1>
    <h2 id='score'>Your Score : ${quiz.score} of ${quiz.questions.length}</h2>
    <div class="try-again">
       <a href="index.html">Take Quiz Again</a>
    </div>
    `;

  let quizElement = document.getElementById('quiz');
  quizElement.innerHTML = endQuiz;
}

let questionsArray = [
  new Questions(
    'When did India won the first World cup ?',
    ['1992', '1982', '1983', '1993'],
    '1983'
  ),
  new Questions(
    'Who was the captain when India won the first World cup ?',
    ['Sunil Gavaskar', 'Krishnamachari Sreekanth', 'Ravi Shastri' , 'Kapil Dev'],
    'Kapil Dev'
  ),
  new Questions(
    'Which team won the inaugural T20 world cup ?',
    ['Australia', 'India', 'Pakistan',  'England'],
    'India'
  ),
  new Questions(
    'Who is known as captain cool?',
    ['Virat Kohli', 'Sourav Ganguly', 'MS Dhoni', 'Sachin Tendulkar'],
    'MS Dhoni'
  ),
  new Questions(
    'Which team has won most number of World cup?',
    ['Australia', 'Pakistan', 'India', 'England'],
    'Australia'
  ),
  new Questions(
    'Which is known as best T20 league around the world?',
    ['IPL', 'PSL', 'BBL', 'CPL'],
    'IPL'
  ),
  new Questions(
    'In 2011 World cup finals how much did MS Dhoni score ?',
    ['97', '94', '93', '91'],
    '91'
  ),
];

let quiz = new Quiz(questionsArray);

displayQuestions();

  let time = 1;
  let quizTimeInMinutes = time * 60 * 60;
  let quizTime = quizTimeInMinutes / 60;

  let count = document.getElementById('count-down');

  function startCountDown() {
      let quizTimer = setInterval(function () {
          if (quizTime <= 0 ){
              classInterval(quizTimer);
              showScores();
          }else {
              quizTime--;
              let sec = Math.floor(quizTime % 60);
              let min = Math.floor(quizTime / 60) % 60;
              count.innerHTML  = `Time: ${min}:${sec}`;
          }
      },1000);
  }

  startCountDown();
