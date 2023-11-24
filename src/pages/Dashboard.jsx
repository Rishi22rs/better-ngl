import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAllQuestionsByUser } from "../service/api";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [questionList, setQuestionList] = useState();

  useEffect(() => {
    if (location.state === null) {
      navigate("/");
      return;
    }
    getAllQuestionsByUser({
      userId: location.state.userId,
      pin: location.state.pin,
    })
      .then((response) => setQuestionList(response.data))
      .catch((error) => console.log(error));
  }, []);

  const handleQuestionClick = (questionId) => {
    navigate("/responses", {
      state: { questionId, userId: location.state.userId },
    });
  };

  return (
    <div>
      <h1>Your all questions</h1>
      {location.state !== null && <h4>Welcome {location.state.username}</h4>}
      <p>Questions</p>
      <ul>
        {questionList &&
          questionList.map((question, key) => (
            <li key={key}>
              <span onClick={() => handleQuestionClick(question.questionId)}>
                {question.question}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Dashboard;
