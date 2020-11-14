import React from "react"
import Bisection from "../tests/Bisection"
import sequenceRunner from "../utils/sequenceRunner"
import { testOnePhaseOne } from "../utils/quizGenerator"

const data = testOnePhaseOne()

const onTriggerEnd = ([index, setIndex], [phase, setPhase]) => () => {
  if (index < 20) {
    sequenceRunner([
      {
        func: () => setPhase("empty"),
        time: 500,
      },
      {
        func: () => setPhase(index % 2 === 0 ? "کوتاه" : "بلند"),
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

export default function BisectionTrain() {
  return <Bisection data={data} onTriggerEnd={onTriggerEnd} />
}
