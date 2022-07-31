import classes from "./ButtonBox.module.css";
const ButtonBox = ({ children }) => {
  return <div className={classes.box}>{children}</div>;
};

export default ButtonBox;
