import React from "react"
import Bisection from "../tests/Bisection"
import sequenceRunner from "../utils/sequenceRunner"
import { testOnePhaseTwo } from "../utils/quizGenerator"

const data = testOnePhaseTwo()

const onTriggerEnd = ([index, setIndex], [phase, setPhase]) => () => {
  if (index < 20) {
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

const onAnswer = ([index, setIndex], [phase, setPhase]) => answer => {
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

export default function BisectionP1() {
  return (
    <Bisection data={data} onTriggerEnd={onTriggerEnd} onAnswer={onAnswer} />
  )
}
