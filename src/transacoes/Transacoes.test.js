import { render } from "@testing-library/react";
import React from "react";

import Transacoes from "./Transacoes";

describe("Transaction List", () => {
  it("list snapshot should keep the same", async () => {
    const listaDeTransacoes = [
        {id: 1, data:"08/09/2020", tipo:"deposito", valor:"20.00"},
        {id: 2, data:"09/09/2020", tipo:"deposito", valor:"20.00"},
        {id: 3, data:"10/09/2020", tipo:"saque", valor:"20.00"}
    ]
    const { container } = render(
      <Transacoes transacoes={listaDeTransacoes} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});