import classes from "./Button.module.css";

const Button = ({ onClick, value, color }) => {
  return (
    <button
      className={`${classes.button} ${
        value === 0 ? classes.zero : classes.button
      }`}
      style={{ backgroundColor: color }}
      onClick={() => onClick(value)}
    >
      {value}
    </button>
  );
};

export default Button;
