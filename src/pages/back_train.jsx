import React from "react"
import NBack from "../components/NBack"
import { randomNumberSequence } from "../utils/quizGenerator"

export default function NBackTrain() {
  const count = 20
  const data = randomNumberSequence(count)

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
