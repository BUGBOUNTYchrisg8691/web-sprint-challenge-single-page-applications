import React from 'react'
import pizza from "../Pizza.jpg"

export default function Confirm() {
  return (
    <div>
      <h2>Your Order is on the way</h2>
      <img src={pizza} alt="dog eating pizza" />
    </div>
  )
}
