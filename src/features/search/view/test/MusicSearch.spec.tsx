import React from "react";
import { render, fireEvent, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";

import { MusicSearch } from "../MusicSearch";
import { server, record } from "./server";

import { PageSetup } from "../../../../test/utils/pageSetup";

jest.mock('react-virtualized-auto-sizer', () => {
  const width = 1024;
  const height = 10068;
  return ({ children }: any) =>
    <div>{children({ width, height })}</div>;
});

describe("music search feature", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("loads and displays the search page correctly", () => {
    render(
      <PageSetup>
        <MusicSearch />
      </PageSetup>
    );

    expect(screen.queryByRole("textbox")).not.toBeNull();
    expect(screen.queryByRole("combobox")).not.toBeNull();
  });

  it("should not render results on screen on load", () => {
    render(
      <PageSetup>
        <MusicSearch />
      </PageSetup>
    );

    expect(screen.getByText("Oops, No Record found")).not.toBeNull();
  });

  it("should be able to search and render records", async () => {
    render(
      <PageSetup>
        <MusicSearch />
      </PageSetup>
    );

    expect(screen.queryByRole("textbox")).not.toBeNull();
    expect(screen.queryByRole("combobox")).not.toBeNull();

    fireEvent.change(screen.getByRole("textbox"), {target: {
      value: record
    }})

    fireEvent.click(screen.getByLabelText("search"))

    await screen.findByRole("progressbar")
    await screen.findByRole("main")
    const main = screen.getByRole("main")

   expect( within(main).getAllByRole('img').length).toBe(10)
  });

  it("should render 'Oops, No Record found' when record is not found", async () => {
    render(
      <PageSetup>
        <MusicSearch />
      </PageSetup>
    );

    fireEvent.change(screen.getByRole("textbox"), {target: {
      value: "not found"
    }})

    fireEvent.click(screen.getByLabelText("search"))
    await screen.findByText("Oops, No Record found")

    expect(screen.getByText("Oops, No Record found")).not.toBeNull();
  });
});
