import axios from "axios"
import React from "react"
import NBack from "../components/NBack"
import sequenceRunner from "../utils/sequenceRunner"
import { randomNumberSequence } from "../utils/quizGenerator"

const count = 56 + 1
const data = randomNumberSequence(count)

const onTriggerEnd = ([index, setIndex], [phase, setPhase]) => () => {
  if (index < 1) {
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
  const id = localStorage.getItem("targetId")

  localStorage.setItem(
    `${id}.1b.${index}`,
    JSON.stringify({
      answer,
      time: new Date().toString(),
      currentNumber: data[index],
      lastNumber: data[index - 1],
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
    let csv = "id,index,time,currentNumber,lastNumber,answer__NEWLINE__"
    const id = localStorage.getItem("targetId")
    for (let i = 1; i < count; i++) {
      const { answer, currentNumber, lastNumber, time } = JSON.parse(
        localStorage.getItem(`${id}.1b.${i}`)
      )
      csv += `${id},${i},${time},${currentNumber},${lastNumber},${answer}__NEWLINE__`
    }
    localStorage.clear()
    localStorage.setItem("targetId", id)

    axios
      .post(`http://localhost:8002/1b/${id}/${csv}`, JSON.stringify({}), {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })

      .then(res => console.log(res))
    setPhase("done")
  }
}

export default function OneBack() {
  return (
    <NBack
      n="یک"
      endLink="/two_back"
      title="آزمون one-back"
      data={data}
      onTriggerEnd={onTriggerEnd}
      onAnswer={onAnswer}
    />
  )
}
