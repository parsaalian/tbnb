import React from "react"
import NBack from "../components/NBack"
import { randomNumberSequence } from "../utils/quizGenerator"

const count = 24 + 3
const data = randomNumberSequence(count)

export default function OneBack() {
  return <NBack n={3} endLink="/choose" title="آزمون three-back" data={data} />
}
