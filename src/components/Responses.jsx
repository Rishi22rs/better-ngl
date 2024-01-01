import ShareIcon from "@mui/icons-material/Share";

const Responses = ({
  question,
  responseList,
  setSelectedPopup,
  setSelectedResponse,
}) => {
  return (
    <div>
      <h3>{question}</h3>
      <div
        className="mt-4"
        style={{
          maxHeight: window.innerHeight - 200,
          overflowY: "auto",
        }}
      >
        {responseList && responseList.length === 0 ? (
          <b>no responses</b>
        ) : (
          responseList.map((response, key) => (
            <div
              style={{ background: "rgb(229,229,229,0.5)", borderRadius: 50 }}
              className="mb-2 px-4 p-1 pb-3 d-flex align-items-center justify-content-between"
              key={key}
            >
              <span
                onClick={() => {
                  setSelectedResponse(response.response);
                  setSelectedPopup(6);
                }}
                className="d-flex justify-content-between align-items-center w-100"
              >
                {response.response}
                <ShareIcon />
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Responses;
