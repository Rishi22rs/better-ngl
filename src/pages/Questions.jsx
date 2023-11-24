import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { API, createUserQuestion } from "../service/api";

const Questions = () => {
  const [question, setQuestion] = useState("");
  const [questionResponseURL, setQuestionResponseURL] = useState();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    location.state.userId === null && navigate("/");
  }, []);

  const handleUserInput = (event) => {
    setQuestion(event.target.value);
  };

  const onSubmitQuestion = (event) => {
    event.preventDefault();
    question !== "" &&
      createUserQuestion({ question, userId: location.state.userId })
        .then((response) => {
          setQuestionResponseURL(
            createAskQuestionURL(response.data.questionId)
          );
        })
        .catch((error) => console.log(error));
  };

  const createAskQuestionURL = (questionId) => {
    return `http://localhost:3000/${location.state.userId}/${questionId}`;
  };

  return (
    <div>
      <h1>Ask Questions</h1>
      <form onSubmit={onSubmitQuestion}>
        <label htmlFor="question">Question</label>
        <textarea onChange={handleUserInput} id="question" />
        <button type="submit">Submit</button>
      </form>
      {questionResponseURL && <h2>{questionResponseURL}</h2>}
    </div>
  );
};

export default Questions;
