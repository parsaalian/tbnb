import "../../static/fonts/stylesheet.css"
import "../../static/global.css"

import { Link } from "gatsby"
import React, { useState, useEffect } from "react"
import Trigger from "../components/Trigger"
import Answer from "./Answer"
import Center from "./Center"

const QuestionTitle = ({ title, index }) => (
  <p style={{ textAlign: "center" }}>
    {title} - سوال {index + 1}
  </p>
)

export default function Bisection({
  title,
  data,
  onTriggerEnd,
  onAnswer,
  endLink,
}) {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState("آماده")

  useEffect(() => {
    setTimeout(() => {
      setPhase("trigger")
    }, 2000)
  }, [])

  if (phase === "empty") {
    return (
      <div>
        <QuestionTitle title={title} index={index} />
      </div>
    )
  }
  if (phase === "answer") {
    return (
      <div>
        <QuestionTitle title={title} index={index} />
        <Answer
          answers={[
            {
              key: "short",
              text: "کوتاه",
            },
            {
              key: "long",
              text: "بلند",
            },
          ]}
          onAnswer={onAnswer([index, setIndex], [phase, setPhase])}
        />
      </div>
    )
  }
  if (phase === "trigger") {
    return (
      <div>
        <QuestionTitle title={title} index={index} />
        <Trigger
          time={data[index]}
          onTimeEnd={onTriggerEnd([index, setIndex], [phase, setPhase])}
        />
      </div>
    )
  }
  if (phase === "done") {
    return (
      <Center>
        <Link style={{ color: "white" }} to={endLink}>
          ادامه
        </Link>
      </Center>
    )
  }
  return (
    <div>
      <QuestionTitle title={title} index={index} />
      <Center>{phase}</Center>
    </div>
  )
}
