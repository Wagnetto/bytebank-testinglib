import { render } from "@testing-library/react";
import React from "react";
import Transacao from "./Transacao";

describe("Transaction Component", () => {
  it("transaction napshot should keep the same", async () => {
    const { container } = render(
      <Transacao data="08/09/2020" tipo="saque" valor="20.00" />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
