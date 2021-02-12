import "../../static/fonts/stylesheet.css"
import "../../static/global.css"

import styled from "styled-components"
import React, { useEffect } from "react"
import Center from "../components/Center"

const Input = styled.input`
  background-color: black;
  border: 1px solid white;
  direction: rtl;
  color: white;
  font-size: 1rem;
  padding: 1rem;
`

export default function Start() {
  useEffect(() => {
    const id = window.location.search.split("=")[1];
    localStorage.setItem("targetId", id);
    window.location = "/back_train_phone";
  }, []);


  return <Center />;
}
