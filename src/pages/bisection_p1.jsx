import "../../static/fonts/stylesheet.css"
import "./global.css"
import React, { useState, useEffect } from "react"
import Trigger from "../components/Trigger"
import Answer from "../components/Answer"
import Center from "../components/Center"
import sequenceRunner from "../utils/sequenceRunner"
import { testOnePhaseTwo } from "../utils/quizGenerator"

const testData = testOnePhaseTwo()

export default function BisectionP1() {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState("آماده")

  useEffect(() => {
    setTimeout(() => {
      setPhase("trigger")
    }, 2000)
  }, [])

  const onTriggerEnd = () => {
    if (index < 19) {
      sequenceRunner([
        {
          func: () => setPhase("empty"),
          time: 500,
        },
        {
          func: () => {
            setIndex(index + 1)
            setPhase("answer")
          },
        },
      ])
    } else {
      setPhase("done")
    }
  }

  const onAnswer = answer => {
    sequenceRunner([
      {
        func: () => {},
        time: 500,
      },
      {
        func: () => setPhase("empty"),
        time: 500,
      },
      {
        func: () => setPhase("آماده"),
        time: 2000,
      },
      {
        func: () => setPhase("trigger"),
      },
    ])
  }

  if (phase === "empty") {
    return <div></div>
  }
  if (phase === "answer") {
    return <Answer onAnswer={onAnswer} />
  }
  if (phase === "trigger") {
    return (
      <div>
        <Trigger time={testData[index]} onTimeEnd={onTriggerEnd} />
      </div>
    )
  }
  return <Center>{phase}</Center>
}
