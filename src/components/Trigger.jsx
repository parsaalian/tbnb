import React, { useEffect } from "react"
import styled from "styled-components"

const Square = styled.div`
  background-color: black;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`

function Trigger({ time, onTimeEnd }) {
  useEffect(() => {
    setTimeout(onTimeEnd, time)
  })

  return <Square size="500" />
}

export default Trigger
