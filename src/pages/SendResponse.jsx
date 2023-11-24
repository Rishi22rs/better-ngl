import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  createUserQuestion,
  getQuestionByQuestionId,
  saveViewerResponse,
} from "../service/api";

const SendResponse = () => {
  const [userResponse, setUserResponse] = useState("");
  const [question, setQuestion] = useState();

  const { userId, questionId } = useParams();

  useEffect(() => {
    getQuestionByQuestionId({ questionId })
      .then((response) => setQuestion(response.data.question))
      .catch((error) => console.log(error));
  }, []);

  const handleUserInput = (event) => {
    setUserResponse(event.target.value);
  };

  const onSubmitResponse = (event) => {
    event.preventDefault();
    userResponse !== "" &&
      saveViewerResponse({ userId, questionId, response: userResponse })
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
  };

  return (
    <div>
      <h1>Send Response</h1>
      {question && <h3>{question}</h3>}
      <form onSubmit={onSubmitResponse}>
        <label htmlFor="reponse">Response</label>
        <textarea onChange={handleUserInput} id="reponse" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SendResponse;
