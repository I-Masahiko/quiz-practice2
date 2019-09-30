  const questionNum = document.getElementById(`questionNum`);
  const questionGenre = document.getElementById(`questionGenre`);
  const questionDifficulty = document.getElementById(`questionDifficulty`);
  const questionContent = document.getElementById(`questionContent`);
  const chooseBtn = document.getElementById(`chooseBtn`);
  const startBtn = document.getElementById(`startBtn`);


  class AnswerState {
    function() {
      this.quizzes = [];
      this.currentIndex = 0;
      this.numberOfCurrets = 0;
    }
  }

  const answerState = new AnswerState();

  //開始ボタンをクリックした時に、URLから問題を取得して最初の問題を表示する

  startBtn.addEventListener(`click`, () => {
    fetchQuizData();
  });

　//問題の取得からcorrectとincorrectの配列の配合をする

  const fetchQuizData = function() {
    questionNum.textContent = `取得中`;
    questionContent.textContent = `少々お待ちください`;
    startBtn.hidden = true;

    fetch(`https://opentdb.com/api.php?amount=10&type=multiple`)
      .then(response => {
        return response.json();
      })
      .then((data) => {
        answerState.quizzes = data.results;
        answerState.currentIndex = 0;
        answerState.numberOfCurrets = 0;

        console.log(answerState.quizzes);
        indexNum = answerState.currentIndex;

        nextQuiz();
      })
  };


  const nextQuiz = function() {
    console.log(indexNum + 1);
    questionNum.textContent = `問題${indexNum + 1}`;
    questionGenre.textContent = `[ジャンル] ${answerState.quizzes[indexNum].category}`;
    questionDifficulty.textContent = `[難易度] ${answerState.quizzes[indexNum].difficulty}`;
    questionContent.textContent = answerState.quizzes[indexNum].question;

    answerState.quizzes[indexNum].incorrect_answers.push(answerState.quizzes[indexNum].correct_answer);
    createBtn();
  }


  const createBtn = function() {

    const current = answerState.quizzes[indexNum].correct_answer;
    console.log(current);

    let  quizNum = answerState.quizzes[indexNum].incorrect_answers.length;
    const answers = [...answerState.quizzes[indexNum].incorrect_answers];

    quizShuffles(answers);

    for (let answersNum = quizNum - 1 ; answersNum >= 0 ; answersNum-- ){
      const answerBtn = document.createElement(`button`);
      const br = document.createElement(`br`);

      answerBtn.textContent = answers[answersNum];
      chooseBtn.appendChild(answerBtn);
      chooseBtn.appendChild(br);

      answerBtn.addEventListener(`click`, () =>{
        indexNum++;

        if(answerBtn.textContent === current){
          answerState.numberOfCurrets++;
        };

        if(indexNum === answerState.quizzes.length){
          questionNum.textContent = `あなたの正答数は${answerState.numberOfCurrets}です`;
          questionGenre.textContent = ``;
          questionDifficulty.textContent = ``;
          questionContent.textContent = '再度チャレンジしたい場合は以下をクリック！！';

          removeBtn();

          const homeBtn = document.createElement(`button`);
          homeBtn.textContent = `ホームに戻る`;
          chooseBtn.appendChild(homeBtn);

          homeBtn.addEventListener(`click`,()=>{
            homeBtn.hidden = true;

          fetchQuizData();

          });
        }else {

          removeBtn();

          nextQuiz();
        };


      });
    };
  };


    const removeBtn = function() {
      while (chooseBtn.firstChild) {
       chooseBtn.removeChild(chooseBtn.firstChild);
     };
   };

    const quizShuffles = function(ary) {
      for (var i = ary.length - 1 ; i >= 0 ; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [ary[i],ary[rand]] = [ary[rand],ary[i]]
      };
      return ary
    };
