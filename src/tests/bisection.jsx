import "../../static/fonts/stylesheet.css"
import "../../static/global.css"

import React, { useState, useEffect } from "react"
import Trigger from "../components/Trigger"
import Answer from "../components/Answer"
import Center from "../components/Center"

export default function Bisection({ data, onTriggerEnd, onAnswer }) {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState("آماده")

  useEffect(() => {
    setTimeout(() => {
      setPhase("trigger")
    }, 2000)
  }, [])

  if (phase === "empty") {
    return <div></div>
  }
  if (phase === "answer") {
    return <Answer onAnswer={onAnswer([index, setIndex], [phase, setPhase])} />
  }
  if (phase === "trigger") {
    return (
      <div>
        <Trigger
          time={data[index]}
          onTimeEnd={onTriggerEnd([index, setIndex], [phase, setPhase])}
        />
      </div>
    )
  }
  return <Center>{phase}</Center>
}
