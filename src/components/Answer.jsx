import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Center from "./Center"

const Button = styled.button`
  padding: 1rem 2rem;
  margin-left: 1rem;
  margin-right: 1rem;
  background-color: ${({ hovered }) => (hovered ? "white" : "black")};
  border: 1px solid white;
  text-align: center;
  color: ${({ hovered }) => (hovered ? "black" : "white")};
  cursor: ${({ hovered }) => (hovered ? "pointer" : "auto")};

  &:hover {
    background-color: white;
    color: black;
    cursor: pointer;
  }
`

export default function Answer({ prompt, answers, onAnswer }) {
  const [hovered, setHovered] = useState("none")

  const handleUserKeyPress = event => {
    const { key } = event

    if (key === "n") {
      setHovered(answers[0].key)
      onAnswer(answers[0].key)
    }
    if (key === "m") {
      setHovered(answers[1].key)
      onAnswer(answers[1].key)
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress)

    return () => {
      window.removeEventListener("keydown", handleUserKeyPress)
    }
  })

  return (
    <Center>
      {!!prompt && <p>{prompt}</p>}
      <br />
      {answers.map(answer => {
        return (
          <Button
            key={answer.key}
            onClick={e => {
              e.preventDefault()
              onAnswer(answer.key)
            }}
            hovered={hovered === answer.key}
          >
            {answer.text}
          </Button>
        )
      })}
    </Center>
  )
}
