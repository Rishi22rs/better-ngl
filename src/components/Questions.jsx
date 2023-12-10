import { useState } from "react";
import { APP_BASE_URL, createUserQuestion } from "../service/api";
import { IconButton, TextField } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";

const Questions = ({ userId, handleGetAllQuestionsByUser }) => {
  const [question, setQuestion] = useState("");
  const [open, setOpen] = useState(false);
  const [questionResponseURL, setQuestionResponseURL] = useState();

  const handleUserInput = (event) => {
    setQuestion(event.target.value);
  };

  const onSubmitQuestion = (event) => {
    event.preventDefault();
    question !== "" &&
      createUserQuestion({ question, userId })
        .then((response) => {
          setQuestionResponseURL(
            createAskQuestionURL(response.data.questionId)
          );
          handleGetAllQuestionsByUser();
          setOpen(true);
        })
        .catch((error) => console.log(error));
  };

  const createAskQuestionURL = (questionId) => {
    return `${APP_BASE_URL}${userId}/${questionId}`;
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => setOpen(false)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <div>
      <h1>ask questions</h1>
      <div className="w-100">
        <form onSubmit={onSubmitQuestion} className="d-flex flex-column mt-5">
          <TextField
            id="question"
            label="question"
            multiline
            maxRows={4}
            onChange={handleUserInput}
            required
            inputProps={{ maxLength: 40 }}
          />
          <button className="btni p-2 mt-3" type="submit">
            Submit
          </button>
        </form>
        <div className="mt-4">
          {questionResponseURL && (
            <div>
              <b>
                share with link in insta story or any other platform and start
                getting anonymous responses...
              </b>
              <p>{questionResponseURL}</p>
            </div>
          )}
        </div>
      </div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message="question created..."
        action={action}
      />
    </div>
  );
};

export default Questions;
