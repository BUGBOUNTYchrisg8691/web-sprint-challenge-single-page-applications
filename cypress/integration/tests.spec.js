describe("sprint test", () => {
  const name = () => cy.get('input[name="orderName"]')
  const sausage = () => cy.get('input[name="sausage"]')
  const pepperoni = () => cy.get('input[name="pepperoni"]')
  const submit = () => cy.get('button')
  const size = () => cy.get('select[name="size"]')
  beforeEach(() => {
    cy.visit('http://localhost:3000/pizza');
  })
  it("test that you can add text to the name input", () => {
    name()
      .should("have.value", '')
      .type("Christopher")
      .should("have.value", "Christopher")
  })

  it("test that you can select multiple toppings", () => {
    sausage().check()
    pepperoni().check()
  })

  it("test that you can submit the form", () => {
    submit().should("be.disabled")
    name().type("Christopher")
    size().select("small")
    sausage().check()
    submit().should("be.enabled")
  })
})