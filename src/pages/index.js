import React, { useState, useEffect } from "react"
import Trigger from "../components/Trigger"
import sequenceRunner from "../utils/sequenceRunner"
import { testOnePhaseOne } from "../utils/quizGenerator"

export default function Home() {
  const testData = testOnePhaseOne()
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState("ready")

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
          func: () => setPhase(index % 2 === 0 ? "short" : "long"),
          time: 2000,
        },
        {
          func: () => setPhase("empty"),
          time: 500,
        },
        {
          func: () => {
            setIndex(index + 1)
            setPhase("trigger")
          },
        },
      ])
    } else {
      setPhase("done")
    }
  }

  if (phase === "empty") {
    return <div></div>
  }
  if (phase === "trigger") {
    return (
      <div>
        <Trigger time={testData[index]} onTimeEnd={onTriggerEnd} />
      </div>
    )
  }
  return <div>{phase}</div>
}
