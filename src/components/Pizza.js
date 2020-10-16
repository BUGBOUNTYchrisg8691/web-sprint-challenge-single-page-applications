import React, {Component} from 'react'
import {Link, useHistory, useRouteMatch} from "react-router-dom"

import ToggleSwitch from "./ToggleSwitch/ToggleSwitch"

export default function Pizza(props) {
  const {form, change, submit, disabled, errs} = props
  const {url} = useRouteMatch()
  const hist = useHistory()

  const onSubmit = e => {
    e.preventDefault()
    submit()
    hist.push(`${url}/orders`)
  }

  const onChange = e => {
    const {name, value, checked, type} = e.target
    const newValue = type === "checkbox" ? checked : value
    change(name, newValue)
  }

  return (
    <div>
      <h2>Build Your Own Pizza</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>
            Name for Order:
            <input
              type="text"
              name="orderName"
              onChange={onChange}
              value={form.orderName}
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Size:
            <select
              name="size"
              value={form.size}
              onChange={onChange}
            >
              <option value=''>---Select a Size---</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </label>
        </div>
        <div className="form-group">
          <label>
            Toppings
            <label>
              Sausage
              <input
                className="form-control"
                type="checkbox"
                name="sausage"
                checked={form.sausage}
                onChange={onChange}
              />
            </label>
            <label>
              Pepperoni
              <input
                className="form-control"
                type="checkbox"
                name="pepperoni"
                checked={form.pepperoni}
                onChange={onChange}
              />
            </label>
            <label>
              Onions
              <input
                className="form-control"
                type="checkbox"
                name="onions"
                checked={form.onions}
                onChange={onChange}
              />
            </label>
            <label>
              Pineapple
              <input
                className="form-control"
                type="checkbox"
                name="pineapple"
                checked={form.pineapple}
                onChange={onChange}
              />
            </label>
          </label>
        </div>
        <div className="form-group">
          <label>
            Gluten-Free Crust
            <ToggleSwitch onChange={onChange} form={form} Name="Gluten-Free Crust" />
          </label>
        </div>
        <div className="form-group">
          <label>
            Special Instructions
            <input
              className="form-control"
              type="text"
              name="specialInstructions"
              onChange={onChange}
            />
          </label>
        </div>
        <div className="form-group errors">
          <div>{form.orderName.length > 0 && errs.orderName}</div>
          <div>{errs.size}</div>
          <div>{form.specialInstructions.length > 0 && errs.specialInstructions}</div>
        </div>
        <button disabled={disabled}>Place Order</button>
      </form>
    </div>
  )
}
