import React from 'react';
import '../App.css';
import Select from 'react-select';

function SelectionPage(props) {
  const optionsCateg = [
    { value: '10', label: 'Books' },
    { value: '12', label: 'Music' },
    { value: '15', label: 'Video Games' },
    { value: '14', label: 'Television' },
    { value: '11', label: 'Film' },
    { value: '17', label: 'Nature' },
    { value: '18', label: 'Computers' },
    { value: '19', label: 'Mathematics' },
    { value: '21', label: 'Sports' },
    { value: '23', label: 'History' },
    { value: '20', label: 'Mythology' },
    { value: '24', label: 'Politics' },
    { value: '25', label: 'Art' },
    { value: '26', label: 'Celebrities' },
    { value: '27', label: 'Animals' },
    { value: '22', label: 'Geography' },
  ];

  const optionsDif = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' },
  ];

  const optionsNum = [
    { value: '5', label: '5' },
    { value: '10', label: '10' },
    { value: '15', label: '15' },
    { value: '20', label: '20' },
    { value: '25', label: '25' },
    { value: '30', label: '30' },
  ];

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      width: state.selectProps.width,
      borderBottom: '1px dotted pink',
      color: state.selectProps.menuColor,
      padding: 20,
      fontSize: '18px',
      fontWeight: state.selectProps.fontWeight,
    }),

    control: (
      _,
      { selectProps: { width, color, fontSize, marginBottom } }
    ) => ({
      width: width,
      fontSize: '22px',
      marginBottom: '50px',
    }),

    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
      return { ...provided, opacity, transition };
    },

    placeholder: (customStyles) => {
      return {
        ...customStyles,
        color: '#293264',
        fontWeight: '400',
        fontSize: ' 22px',
      };
    },
  };

  return (
    <>
      <div className='App-header-two'>
        <h1 style={{ marginBottom: '100px' }}>Knowledge Quiz</h1>

        <Select
          className='selection'
          placeholder={<div>Select Category</div>}
          styles={customStyles}
          width='400px'
          options={optionsCateg}
          onChange={props.handle_category}
        />
        <Select
          placeholder={<div>Select Difficulty</div>}
          styles={customStyles}
          width='400px'
          options={optionsDif}
          onChange={props.handle_difficulty}
        />
        <Select
          placeholder={<div>Select Number of Questions</div>}
          styles={customStyles}
          width='400px'
          options={optionsNum}
          onChange={props.handle_number_of_questions}
        />
        <div className='btn-div'>
          <button
            onClick={() => {
              props.set_start(true);
            }}
          >
            Go to Quiz
          </button>
        </div>
      </div>
    </>
  );
}

export default SelectionPage;
