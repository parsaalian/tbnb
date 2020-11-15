import "../../static/fonts/stylesheet.css"
import "../../static/global.css"

import { Link } from "gatsby"
import styled from "styled-components"
import React from "react"
import Center from "../components/Center"

const Input = styled.input`
  background-color: black;
  border: 1px solid white;
  direction: rtl;
  color: white;
  font-size: 1rem;
  padding: 1rem;
`

export default function BisectionStart() {
  const onChange = e => {
    e.preventDefault()
    localStorage.setItem("targetId", e.target.value)
  }

  return (
    <Center>
      <Input placeholder="شناسه" onChange={onChange} />
      <br />
      <br />
      <br />
      <Link style={{ color: "white" }} to="/bisection_train">
        شروع آزمون
      </Link>
    </Center>
  )
}
