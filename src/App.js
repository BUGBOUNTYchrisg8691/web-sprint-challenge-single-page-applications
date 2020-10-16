import React, {useState, useEffect} from "react";
import Axios from "axios"
import {Route, Link, Switch} from "react-router-dom"
import {v4 as uuid} from "uuid"

import WelcomePage from "./components/WelcomePage";
import Pizza from "./components/Pizza"
import Confirm from "./components/Confirm"

import * as yup from "yup"
import schema from "./schema"

const initialFormVals = {
  orderName: '',
  size: '',
  sausage: false,
  pepperoni: false,
  onions: false,
  pineapple: false,
  specialInstructions: ''
}

const initialErrVals = {
  orderName: '',
  size: '',
  specialInstructions: ''
}

const App = () => {
  const [orders, setOrders] = useState([])
  const [form, setForm] = useState(initialFormVals)
  const [errs, setErrs] = useState(initialErrVals)
  const [disabled, setDisabled] = useState(true)

  const change = (name, value) => {
    yup
      .reach(schema)
      .validate(value)
      .then(() => {
        setErrs({
          ...errs,
          [name]: ''
        })
      })
      .catch(err => {
        setErrs({
          ...errs,
          [name]: err.errors[0]
        })
      })
    setForm({
      ...form,
      [name]: value
    })
  }

  const submit = () => {
    const newOrder = {
      id: uuid(),
      orderName: form.orderName.trim(),
      size: form.size,
      toppings: [
        "sausage",
        "pepperoni",
        "onions",
        "pineapple"
      ].filter(topping => form[topping]),
      specialInstructions: form.specialInstructions
    }
    postNewOrder(newOrder)
  }

  const postNewOrder = newOrder => {
    Axios
      .post("https://reqres.in/api/users", newOrder)
      .then(resp => {
        setOrders([
          ...orders,
          resp.data
        ])
        console.log(resp.data)
        setForm(initialFormVals)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    schema
      .isValid(form)
      .then(valid => setDisabled(!valid))
      .catch(err => console.log(err))
  }, [form])

  return (
    <>
      <nav>
        <h1>Lambda Eats</h1>
        <Link to="/">
          Home
        </Link>
        <Link to="/pizza">
          Order
        </Link>
        <Switch>
          <Route path="/pizza/confirm">
            <Confirm />
          </Route>
          <Route path="/pizza">
            <Pizza form={form} change={change} submit={submit} disabled={disabled} errs={errs} />
          </Route>
          <Route path="/">
            <WelcomePage />
          </Route>
        </Switch>
      </nav>

    </>
  );
};
export default App;
