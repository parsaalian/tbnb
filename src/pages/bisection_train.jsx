import React from "react"
import Bisection from "../components/Bisection"
import sequenceRunner from "../utils/sequenceRunner"
import { testOnePhaseOne } from "../utils/quizGenerator"

const count = 20
const data = testOnePhaseOne(count)

const onTriggerEnd = ([index, setIndex], [phase, setPhase]) => () => {
  if (index < count) {
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
  return (
    <Bisection
      endLink="/bisection_p1"
      title="تمرین آزمون دوبخشی"
      data={data}
      onTriggerEnd={onTriggerEnd}
    />
  )
}
