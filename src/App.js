/* eslint-disable default-case */
import { useState } from "react";
import "./App.css";
import Button from "./components/Button/Button";
import ButtonBox from "./components/ButtonBox/ButtonBox";
import TextInput from "./components/TextInput/TextInput";
import Wrapper from "./components/Wrapper/Wrapper";

const btnValues = [
  [
    { value: "AC", color: "gray" },
    { value: "+-", color: "gray" },
    { value: "%", color: "gray" },
    { value: "/", color: "orange" },
  ],
  [
    { value: 7, color: "#3c3c3c" },
    { value: 8, color: "#3c3c3c" },
    { value: 9, color: "#3c3c3c" },
    { value: "X", color: "orange" },
  ],
  [
    { value: 4, color: "#3c3c3c" },
    { value: 5, color: "#3c3c3c" },
    { value: 6, color: "#3c3c3c" },
    { value: "-", color: "orange" },
  ],
  [
    { value: 1, color: "#3c3c3c" },
    { value: 2, color: "#3c3c3c" },
    { value: 3, color: "#3c3c3c" },
    { value: "+", color: "orange" },
  ],
  [
    { value: 0, color: "#3c3c3c" },
    { value: ".", color: "#3c3c3c" },
    { value: "=", color: "orange" },
  ],
];

function App() {
  const [value, setValue] = useState("");
  const [number, setNumber] = useState(undefined);
  const [sign, setSign] = useState("");
  const [reset, setReset] = useState(false);

  const calulateResult = (input) => {
    if (!value) return;

    const convertToNum = parseFloat(value) || 0;

    let operator = input;
    let isEqual = false;

    if (operator === "=") {
      operator = sign;
      isEqual = true;
    } else if (operator !== "%" && operator !== sign && sign) {
      operator = sign;
      setSign(input);
    } else {
      setSign(operator);
    }

    let result;

    switch (operator) {
      case "+":
        result = number !== undefined ? number + convertToNum : convertToNum;
        break;
      case "-":
        result = number !== undefined ? number - convertToNum : convertToNum;
        break;
      case "X":
        result = number !== undefined ? number * convertToNum : convertToNum;
        break;
      case "/":
        if (convertToNum === 0) throw new Error("Devide to zero");
        result = number !== undefined ? number / convertToNum : convertToNum;
        break;
      case "%":
        result =
          number !== undefined
            ? number / Math.pow(100, 1)
            : convertToNum / Math.pow(100, 1);
        console.log(result);
        isEqual = true;
        break;
    }

    if (isEqual) {
      setValue(String(result));
      setNumber(undefined);
      setReset(true);
    } else {
      setNumber(result);
      setValue("");
    }
  };

  const ACHandler = () => {
    setValue("");
    setNumber(undefined);
    setSign("");
  };

  const dotHandler = () => {
    if (reset) {
      setValue("");
      return;
    }
    if (value.length === 0) return;
    setValue((state) => state + ".");
  };

  const signHandler = () => {
    if (value.charAt(0) === "-") {
      setValue((state) => state.substring(1));
    } else {
      setValue((state) => "-" + state);
    }
  };

  const valueChangeHandler = (inputValue) => {
    if (typeof inputValue === "number") {
      if (reset) {
        setValue(inputValue);
        setReset(false);
      } else {
        setValue((state) => state + inputValue);
      }
    } else {
      // eslint-disable-next-line default-case
      switch (inputValue) {
        case "AC":
          ACHandler();
          break;
        case ".":
          dotHandler();
          break;
        case "+-":
          signHandler();
          break;
        default:
          calulateResult(inputValue);
          break;
      }
    }
  };

  const buttons = btnValues.flat().map((btn, i) => {
    return (
      <Button
        key={i + "-" + btn.value}
        color={btn.color}
        value={btn.value}
        onClick={valueChangeHandler}
      />
    );
  });

  return (
    <Wrapper>
      <TextInput value={value} />
      <ButtonBox>{buttons}</ButtonBox>
    </Wrapper>
  );
}

export default App;
