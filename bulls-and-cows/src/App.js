import { useState, useEffect } from "react";
import { generateRandomNumber } from "./modules/random";
import Logs from "./components/Logs";
import "./App.css";

function App() {
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
  const [answer, setAnswer] = useState("");
  const [logs, setLogs] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    console.log(randomNumber);
  }, [randomNumber]);

  const handleAnswerChange = (e) => {
    setAnswer(e.target.value);
  };

  const calculateAnswer = (inputNumber) => {
    return randomNumber.reduce(
      (prev, curr, idx) => {
        if (curr === inputNumber[idx]) {
          return { ...prev, strike: prev.strike + 1 };
        } else if (inputNumber.includes(curr)) {
          return { ...prev, ball: prev.ball + 1 };
        }
        return prev;
      },
      {
        strike: 0,
        ball: 0,
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const answers = answer.split("").map((num) => Number(num));
    setAnswer("");

    if (answers.some((number) => Number.isNaN(number))) {
      return alert("숫자만 입력해주세요.");
    } else if (answer.length !== 4) {
      return alert("4자리 숫자를 입력해주세요.");
    } else if (
      answers.some((number) => {
        return answers.indexOf(number) !== answer.lastIndexOf(number);
      })
    ) {
      return alert("입력 값에 중복이 있습니다.");
    }

    const { strike, ball } = calculateAnswer(answers);

    if (strike === 4) {
      alert("정답입니다!");
      setLogs([...logs, `${answer} 정답입니다!`]);
      return setIsSuccess(true);
    }

    setLogs([...logs, `${answer} (strike: ${strike}, ball: ${ball})`]);
  };

  const handleRetry = () => {
    setRandomNumber(generateRandomNumber());
    setLogs([]);
    setIsSuccess(false);
  };

  return (
    <div className="App">
      <h1>숫자 야구 게임</h1>
      <header className="header">
        {isSuccess ? `정답: ${randomNumber.join("")}` : "----"}
      </header>
      <section>
        <input
          type="text"
          value={answer}
          onChange={handleAnswerChange}
          disabled={isSuccess}
        />
        {isSuccess ? (
          <button onClick={handleRetry}>다시하기</button>
        ) : (
          <button onClick={handleSubmit}>도전하기</button>
        )}
      </section>
      <Logs logs={logs} />
    </div>
  );
}

export default App;
