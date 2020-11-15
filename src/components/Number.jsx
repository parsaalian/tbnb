import React, { useEffect } from "react"
import Center from "./Center"

export default function Number({ number, time, onTimeEnd }) {
  useEffect(() => {
    setTimeout(onTimeEnd, time)
  })

  return (
    <Center>
      <div style={{ fontSize: "5rem", color: "white" }}>{number}</div>
    </Center>
  )
}
