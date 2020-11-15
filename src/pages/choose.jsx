import "../../static/fonts/stylesheet.css"
import "../../static/global.css"

import { Link } from "gatsby"
import React from "react"
import Center from "../components/Center"

export default function Start() {
  return (
    <Center>
      <Link style={{ color: "white", direction: "rtl" }} to="/bisection_train">
        آزمون دوبخشی
      </Link>
      <br />
      <br />
      <Link style={{ color: "white", direction: "rtl" }} to="/one_back">
        آزمون NBack
      </Link>
    </Center>
  )
}
