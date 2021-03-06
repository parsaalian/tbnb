import React from "react"
import NBack from "../components/NBack"
import { randomNumberSequence } from "../utils/quizGenerator"

export default function OneBack() {
  const count = 24 + 1
  const data = randomNumberSequence(count, 1)
  
  return <NBack n={1} endLink="/two_back" title="آزمون one-back" data={data} />
}
