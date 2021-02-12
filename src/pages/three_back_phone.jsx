import React from "react"
import NBack from "../components/NBackPhone"
import { randomNumberSequence } from "../utils/quizGenerator"

export default function OneBack() {
  const count = 24 + 3
  const data = randomNumberSequence(count, 3)

  return <NBack n={3} endLink="/choose" title="آزمون three-back" data={data} />
}
