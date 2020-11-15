import "../../static/fonts/stylesheet.css"
import "../../static/global.css"

import _ from "lodash"
import axios from "axios"
import { Link } from "gatsby"
import React, { useState, useEffect } from "react"
import Center from "./Center"
import Number from "../components/Number"
import sequenceRunner from "../utils/sequenceRunner"

const QuestionTitle = ({ title, index }) => (
  <p style={{ textAlign: "center", direction: "rtl" }}>
    {title} - سوال {index + 1}
  </p>
)

export default function NBack({ n, title, data, endLink, trainMode }) {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState("آماده")

  const count = data.length

  const onTriggerEnd = ([index, setIndex], [phase, setPhase]) => () => {
    if (index < count - 1) {
      sequenceRunner([
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
      if (!trainMode) {
        let csv = `id,index,time,currentNumber,${_.join(
          _.map(_.range(n), k => `numberM${k + 1}`),
          ","
        )},answer__NEWLINE__`
        const id = localStorage.getItem("targetId")
        for (let i = n; i < count; i++) {
          let answer, time
          try {
            const parsed = JSON.parse(localStorage.getItem(`${id}.${n}b.${i}`))
            answer = parsed.answer
            time = parsed.time
          } catch (e) {
            answer = "no"
            time = "empty"
          }
          csv += `${id},${i},${time},${data[i]},${
            _.join(
              _.map(_.range(n), k => data[i - k - 1]),
              ","
            ) + ","
          },${answer}__NEWLINE__`
        }
        localStorage.clear()
        localStorage.setItem("targetId", id)

        axios
          .post(`${process.env.HOST}/${n}b/${id}/${csv}`, JSON.stringify({}), {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
          })
          .then(res => console.log(res))
      }
      setPhase("done")
    }
  }

  const handleUserKeyPress = event => {
    event.preventDefault()
    const { keyCode } = event

    if (keyCode === 32) {
      localStorage.setItem(
        `${localStorage.getItem("targetId")}.${n}b.${index}`,
        JSON.stringify({
          answer: "yes",
          time: new Date().toString(),
        })
      )
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setPhase("trigger")
    }, 2000)
  }, [])

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress)

    return () => {
      window.removeEventListener("keydown", handleUserKeyPress)
    }
  })

  if (phase === "empty") {
    return (
      <div>
        <QuestionTitle title={title} index={index} />
      </div>
    )
  }
  if (phase === "trigger") {
    return (
      <div>
        <QuestionTitle title={title} index={index} />
        <Number
          number={data[index]}
          time={Math.max(1000, 1000 * n)}
          onTimeEnd={onTriggerEnd([index, setIndex], [phase, setPhase])}
        />
      </div>
    )
  }
  if (phase === "done") {
    return (
      <Center>
        <Link style={{ color: "white" }} to={endLink}>
          ادامه
        </Link>
      </Center>
    )
  }
  return (
    <div>
      <QuestionTitle title={title} index={index} />
      <Center>{phase}</Center>
    </div>
  )
}
