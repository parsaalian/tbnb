import React from "react"
import Bisection from "../tests/Bisection"
import sequenceRunner from "../utils/sequenceRunner"
import { testOnePhaseTwo } from "../utils/quizGenerator"

const count = 56
const data = testOnePhaseTwo(count)

const onTriggerEnd = ([index, setIndex], [phase, setPhase]) => () => {
  if (index < count) {
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
    <Bisection
      endLink="/bisection_p2"
      title="بخش اول آزمون دوبخشی"
      data={data}
      onTriggerEnd={onTriggerEnd}
      onAnswer={onAnswer}
    />
  )
}
