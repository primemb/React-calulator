import classes from "./TextInput.module.css";
const TextInput = ({ value }) => {
  return (
    <div className={classes.container}>
      <p>{value}</p>
    </div>
  );
};

export default TextInput;
