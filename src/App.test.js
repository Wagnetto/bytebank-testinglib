import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import App, { calcularNovoSaldo } from "./App";

describe("<App />", () => {
  describe("should render at start", () => {
    it("the bank name", () => {
      render(<App />);
      expect(screen.getByText("ByteBank")).toBeInTheDocument();
    });
    it("account balance", () => {
      render(<App />);
      expect(screen.getByText("Saldo:")).toBeInTheDocument();
    });
    it("transaction button", () => {
      render(<App />);
      expect(
        screen.getByRole("button", { name: /realizar operação/i })
      ).toBeInTheDocument();
    });
  });

  describe("when a transaction is made", () => {
    it("should subtract the withdraw from balance", () => {
      const valores = {
        transacao: "saque",
        valor: 50,
      };
      const newBalance = calcularNovoSaldo(valores, 150);
      expect(newBalance).toBe(100);
    });
    it("should add the deposit to the balance", () => {
      const valores = {
        transacao: "deposito",
        valor: 50,
      };
      const newBalance = calcularNovoSaldo(valores, 150);
      expect(newBalance).toBe(200);
    });
    it("should realize a withdraw transaction properly", () => {
      render(<App />);

      const balance = screen.getByText("R$ 1000");
      const transaction = screen.getByLabelText("Saque");
      const value = screen.getByTestId("valor");
      const transactionButton = screen.getByRole("button", {
        name: /realizar operação/i,
      });

      expect(balance.textContent).toBe("R$ 1000");

      userEvent.click(transaction, { target: { value: "saque" } });
      userEvent.type(value, "10");
      userEvent.click(transactionButton);

      expect(balance.textContent).toBe("R$ 990");
      
    });
  });
});
