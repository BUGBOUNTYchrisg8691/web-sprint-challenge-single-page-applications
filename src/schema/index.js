import * as yup from "yup"

export default yup.object().shape({
  orderName: yup.string()
    .min(2, "Name must contain at least 2 characters")
    .required("Name for order is required"),
  size: yup.string()
    // .oneOf(["small", "medium", "large"])
    .required("Please choose a size"),
  sausage: yup.boolean().oneOf([true]),
  pepperoni: yup.boolean().oneOf([true]),
  onions: yup.boolean().oneOf([true]),
  pineapple: yup.boolean().oneOf([true]),
  "Gluten-Free Crust": yup.boolean().oneOf([true]),
  specialInstruction: yup.string()
    .max(60, "Maximum of 60 characters")
})