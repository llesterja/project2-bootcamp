import React from "react";

const RejectButton = ({ onClick, text }) => {
  return (
    <button onClick={onClick} className="reject-button">
      {text}
    </button>
  );
};

export default RejectButton;
