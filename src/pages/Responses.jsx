import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllResponseByViewer } from "../service/api";

const Responses = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [responseList, setResponseList] = useState();

  useEffect(() => {
    if (location.state === null) {
      navigate("/");
      return;
    }
    getAllResponseByViewer({
      userId: location.state.userId,
      questionId: location.state.questionId,
    })
      .then((response) => setResponseList(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>Responses</h1>
      {location.state !== null && <h3>{location.state.question}</h3>}
      <ul>
        {responseList &&
          responseList.map((response, key) => <li>{response.response}</li>)}
      </ul>
    </div>
  );
};

export default Responses;
