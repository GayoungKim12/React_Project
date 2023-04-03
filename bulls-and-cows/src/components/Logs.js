import React from "react";

export default function Logs(props) {
  return (
    <>
      <h2>기록</h2>
      <ol>
        {props.logs.map((log, idx) => {
          return <li key={`record${idx + 1}`}>{log}</li>;
        })}
      </ol>
    </>
  );
}
