import React from "react"
import Bisection from "../tests/Bisection"
import sequenceRunner from "../utils/sequenceRunner"
import { testOnePhaseThree } from "../utils/quizGenerator"

const count = 56
const data = testOnePhaseThree(56)

const onTriggerEnd = ([index, setIndex], [phase, setPhase]) => () => {
  if (index < 56) {
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

export default function BisectionP2() {
  return (
    <Bisection
      endLink="/"
      title="بخش دوم آزمون دوبخشی"
      data={data}
      onTriggerEnd={onTriggerEnd}
      onAnswer={onAnswer}
    />
  )
}
