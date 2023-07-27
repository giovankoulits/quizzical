import { nanoid } from 'nanoid';
import { useState } from 'react';

const Answers = (props) => {
  let index = props.answerIndex;
  const [selectedAnswer, setSelectedAnswer] = useState('');

  function handleClick(e) {
    setSelectedAnswer((prevSelected) => e.target.innerText);
    props.selected_answers[index] = e.target.innerText;
  }

  return (
    <div>
      {props.shuffled_answers.map((answer) => (
        <button
          key={nanoid()}
          style={{
            backgroundColor:
              selectedAnswer === answer && !props.end_game
                ? '#c3caed'
                : props.correct_answer === answer && props.end_game
                ? '#B3FFE5'
                : props.end_game &&
                  answer === props.final_selected[index] &&
                  answer !== props.correct_answer
                ? '#FBCFBB'
                : 'white',
          }}
          onClick={handleClick}
          className={props.end_game ? 'btn no-hover' : 'btn'}
        >
          {answer}
        </button>
      ))}
    </div>
  );
};

export default Answers;
