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

function Trigger({ onAnswer }) {
  const [hovered, setHovered] = useState("none")

  const handleUserKeyPress = event => {
    const { key } = event

    if (key === "m") {
      setHovered("long")
      onAnswer("long")
    }
    if (key === "n") {
      setHovered("short")
      onAnswer("short")
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
      <Button
        onClick={e => {
          e.preventDefault()
          onAnswer("short")
        }}
        hovered={hovered === "short"}
      >
        کوتاه
      </Button>
      <Button
        onClick={e => {
          e.preventDefault()
          onAnswer("long")
        }}
        hovered={hovered === "long"}
      >
        بلند
      </Button>
    </Center>
  )
}

export default Trigger
