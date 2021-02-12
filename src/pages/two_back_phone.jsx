import React from "react"
import NBack from "../components/NBackPhone"
import { randomNumberSequence } from "../utils/quizGenerator"

export default function OneBack() {
  const count = 24 + 2
  const data = randomNumberSequence(count, 2)

  return (
    <NBack n={2} endLink="/three_back" title="آزمون two-back" data={data} />
  )
}
