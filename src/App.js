import React, { useState, useEffect } from 'react';
import SelectionPage from './components/SelectionPage';
import Question from './components/Question';
import Answers from './components/Answers';
import { nanoid } from 'nanoid';
import './App.css';

function App() {
  let correctAnswers = {};
  let selectedAnswers = {};
  const [data, setData] = useState(false);
  const [start, setStart] = useState(false);
  const [corranswers, setCorrAnswers] = useState({});
  const [selected, setSelected] = useState({});
  const [endGame, setEndgame] = useState(false);
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  /* Selection Component State */
  const [category, setCategory] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [numberOfQuestions, setNumberOfQuestions] = useState('');

  useEffect(
    function () {
      fetch(
        `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`
      )
        .then((res) => res.json())
        .then((allData) => {
          setData((prevData) => allData.results);
          allData.results.map((datum, index) => {
            correctAnswers[index] = datum.correct_answer;
          });
          setCorrAnswers(correctAnswers);
          return allData.results;
        })
        .then((data) => {
          setShuffledAnswers((prevShuffled) => {
            const shufledData = data.map((datum) => {
              const shuffledArray = shuffleAnswers([
                ...datum.incorrect_answers,
                datum.correct_answer,
              ]);
              return shuffledArray;
            });
            return shufledData;
          });
        });
    },
    [start]
  );

  function handleCategory(e) {
    setCategory(e.value);
    setCategoryName(e.label);
  }

  function handleDifficulty(e) {
    setDifficulty(e.value);
    setTimeout(() => console.log(difficulty), 1000);
  }

  function handleNumberOfQuestions(e) {
    setNumberOfQuestions(e.value);
    setTimeout(() => console.log(numberOfQuestions), 1000);
  }

  function handleStart() {
    if (category && difficulty && numberOfQuestions) setStart(true);
    else alert('Please fill in all fields');
  }

  function checkResults() {
    let matches = 0;
    let len = 0;
    for (const property in selectedAnswers) {
      len++;
      if (selectedAnswers[property] === corranswers[property]) matches++;
    }
    if (len < data.length) {
      alert('please fill in all answers');
      return;
    }
    setSelected((prevSelected) => selectedAnswers);
    document.getElementById(
      'results'
    ).innerHTML = `Your score is ${matches}/${data.length}`;
    setEndgame(true);
  }

  function shuffleAnswers(array) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  return !start ? (
    <SelectionPage
      handle_category={handleCategory}
      handle_difficulty={handleDifficulty}
      handle_number_of_questions={handleNumberOfQuestions}
      set_start={handleStart}
    />
  ) : start && data.length ? (
    <div className='App'>
      <main className='App-header'>
        <h1 style={{ marginBottom: '50px' }}>
          Test Your {categoryName} Knowledge!
        </h1>
        {data.map((obj, index) => {
          return (
            <div key={nanoid()}>
              <Question
                question_index={(index + 1).toString()}
                question={obj.question}
              />
              <Answers
                shuffled_answers={shuffledAnswers[index]}
                end_game={endGame}
                final_selected={selected}
                selected_answers={selectedAnswers}
                answerIndex={index}
                incorrect_answers={obj.incorrect_answers}
                correct_answer={obj.correct_answer}
              />
            </div>
          );
        })}

        <div className='btn-div'>
          <h1 id='results'></h1>
          {start && data.length && !endGame ? (
            <button onClick={checkResults}> Get Results</button>
          ) : (
            <button
              onClick={() => {
                setCorrAnswers({});
                setStart(false);
                setEndgame(false);
              }}
            >
              Back to Selection
            </button>
          )}
        </div>
      </main>
    </div>
  ) : (
    ''
  );
}

export default App;
