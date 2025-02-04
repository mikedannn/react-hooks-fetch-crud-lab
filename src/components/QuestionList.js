import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {

  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then((r) => r.json())
      .then(data => setQuestions(data))
  }, [])

  function handleDelete(id) {
    const idx = questions.findIndex(q => q.id === id)

    const newQuestions = [...questions]
    newQuestions.splice(idx, 1)

    setQuestions(newQuestions)

    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE'
    })
  }

  function handleUpdate(id, correct) {
    console.log(id)
    console.log(correct)

    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
       headers: {
         'Content-Type' : 'application/json'
       },
       body: JSON.stringify({
         'correctIndex': correct
       })})
       .then(resp => resp.json())
       .then(console.log)

       setQuestions(questions)
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map(q => <QuestionItem handleUpdate={handleUpdate} handleDelete={handleDelete} key={q.id} question={q}/>)}</ul>
    </section>
  );
}

export default QuestionList;
