import axios from "axios"
import React from "react"
import Bisection from "../components/Bisection"
import sequenceRunner from "../utils/sequenceRunner"
import { testOnePhaseThree } from "../utils/quizGenerator"

const count = 10
const data = testOnePhaseThree(count)

const onTriggerEnd = ([index, setIndex], [phase, setPhase]) => () => {
  sequenceRunner([
    {
      func: () => setPhase("empty"),
      time: 500,
    },
    {
      func: () => {
        setPhase("answer")
      },
    },
  ])
}

const onAnswer = ([index, setIndex], [phase, setPhase]) => answer => {
  const id = localStorage.getItem("targetId")

  localStorage.setItem(
    `${id}.p2.${index}`,
    JSON.stringify({
      answer,
      duration: data[index],
      time: new Date().toString(),
    })
  )

  if (index < count - 1) {
    sequenceRunner([
      {
        func: () => setIndex(index + 1),
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
  } else {
    let csv = "id,index,time,duration,answer__NEWLINE__"

    for (let i = 0; i < count; i++) {
      const { answer, duration, time } = JSON.parse(
        localStorage.getItem(`${id}.p2.${i}`)
      )
      csv += `${id},${i},${time},${duration},${answer}__NEWLINE__`
    }
    localStorage.clear()
    localStorage.setItem("targetId", id)

    axios
      .post(`http://localhost:8002/p2/${id}/${csv}`, JSON.stringify({}), {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })

      .then(res => console.log(res))
    setPhase("done")
  }
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
