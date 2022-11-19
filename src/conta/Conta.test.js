import React from "react";
import { render, screen } from "@testing-library/react";
import Conta from "./Conta";
import userEvent from "@testing-library/user-event";

describe("Account component", () => {
  it("Should display formatted account balance", () => {
    render(<Conta saldo={1000} />);

    const saldo = screen.getByTestId("saldo-conta");

    expect(saldo.textContent).toBe("R$ 1000");
  });
  it("Should call realizarTransacao when button is clicked", async () => {
    const mockRealizarTransacao = jest.fn();
    render(<Conta saldo={1000} realizarTransacao={mockRealizarTransacao} />);
    const value = screen.getByTestId("valor");

    userEvent.type(value, "10");

    userEvent.click(await screen.findByText(/realizar operação/i));

    expect(mockRealizarTransacao).toBeCalled();
  });

  it("Should disable button if no value is inputted", async () => {
    render(<Conta />);
    const value = screen.getByTestId("valor");
    const button = screen.getByRole("button", { name: /realizar operação/i });

    userEvent.type(value, "0");

    expect(button).toBeDisabled();
  });
});
