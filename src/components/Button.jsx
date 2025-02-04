import React from "react";
import "./button.scss";

const Button = ({ onClick, text = "Купить", disabled = true, type = 'button'}) => {
  return (
    <button
      className="button"
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;