const Question = (props) => {
  console.log()

  return (
    <div>
      <h2>
        { + props.question_index +". " + " "}
        {props.question
          .replaceAll('&quot;', '')
          .replaceAll('&#039;', "'")
          .replaceAll('&amp;', '&')}
      </h2>
    </div>
  );
};

export default Question;
