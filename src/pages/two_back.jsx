import axios from "axios"
import React from "react"
import NBack from "../components/NBack"
import sequenceRunner from "../utils/sequenceRunner"
import { randomNumberSequence } from "../utils/quizGenerator"

const count = 10
const data = randomNumberSequence(count)

const onTriggerEnd = ([index, setIndex], [phase, setPhase]) => () => {
  if (index < 2) {
    sequenceRunner([
      {
        func: () => setPhase("empty"),
        time: 500,
      },
      {
        func: () => setPhase("آماده"),
        time: 2000,
      },
      {
        func: () => {
          setIndex(index + 1)
          setPhase("trigger")
        },
      },
    ])
  } else {
    sequenceRunner([
      {
        func: () => setPhase("empty"),
        time: 500,
      },
      {
        func: () => setPhase("answer"),
      },
    ])
  }
}

const onAnswer = ([index, setIndex], [phase, setPhase]) => answer => {
  localStorage.setItem(
    `${localStorage.getItem("targetId")}.2b.${index}`,
    JSON.stringify({
      answer,
      time: new Date().toString(),
      currentNumber: data[index],
      lastNumber: data[index - 1],
      twoLastNumber: data[index - 2],
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
    let csv =
      "id,index,time,currentNumber,lastNumber,twoLastNumber,answer__NEWLINE__"
    const id = localStorage.getItem("targetId")
    for (let i = 2; i < count; i++) {
      const {
        answer,
        currentNumber,
        lastNumber,
        twoLastNumber,
        time,
      } = JSON.parse(localStorage.getItem(`${id}.2b.${i}`))
      csv += `${id},${i},${time},${currentNumber},${lastNumber},${twoLastNumber},${answer}__NEWLINE__`
    }
    localStorage.clear()
    localStorage.setItem("targetId", id)

    axios
      .post(`http://localhost:8002/2b/${id}/${csv}`, JSON.stringify({}), {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })

      .then(res => console.log(res))
    setPhase("done")
  }
}

export default function TwoBack() {
  return (
    <NBack
      n="دو"
      endLink="/three_back"
      title="آزمون two-back"
      data={data}
      onTriggerEnd={onTriggerEnd}
      onAnswer={onAnswer}
    />
  )
}
