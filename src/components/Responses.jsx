const Responses = ({ question, responseList }) => {
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
              <span>{response.response}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Responses;
