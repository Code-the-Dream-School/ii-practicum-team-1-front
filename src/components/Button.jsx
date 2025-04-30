import React from "react";
import PropTypes from "prop-types";

function Button({ children, type = "button", onClick, className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-dark text-white rounded-[14px] px-[30px] py-[15px] font-montserrat text-base hover:bg-secondary hover:text-dark transition-colors ${className}`}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Button;
