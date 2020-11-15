import React from "react"
import NBack from "../components/NBack"
import { randomNumberSequence } from "../utils/quizGenerator"

const count = 20
const data = randomNumberSequence(count)

export default function NBackTrain() {
  return (
    <NBack
      n={0}
      endLink="/one_back"
      title="یادگیری nback"
      data={data}
      trainMode={true}
    />
  )
}
