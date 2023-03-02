import React from "react";
import axios from "axios";
import Application from "components/Application";
import { render, waitForElement, getByText, fireEvent, getAllByTestId, getByPlaceholderText, getByAltText, queryByText, queryByAltText, cleanup, waitForElementToBeRemoved } from "@testing-library/react";

describe("Application", () => {
  afterEach(() => {
    cleanup()
  });

  it("changes the schedule when a new day is selected", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Monday"));

    fireEvent.click(getByText(container, "Tuesday"));

    expect(getByText(container, "Leopold Silvers")).toBeInTheDocument();
  });


  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, "name here"), {
      target: { value: "Lydia Miller-Jones" },
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "SAVING")).toBeInTheDocument();
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find((day) => {
      return queryByText(day, "Monday");
    });
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();

  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[1];

    fireEvent.click(getByAltText(appointment, "Delete"));

    expect(getByText(appointment, "ARE YOU SURE?")).toBeInTheDocument();

    fireEvent.click(getByText(appointment, "Cancel"));

    expect(queryByText(appointment, "ARE YOU SURE?")).not.toBeInTheDocument();

    fireEvent.click(getByAltText(appointment, "Delete"));

    fireEvent.click(getByText(appointment, "Confirm"));

    expect(getByText(appointment, "DELETING")).toBeInTheDocument();

    expect(queryByText(appointment, "Archie Cohen")).not.toBeInTheDocument();

    await waitForElement(() => getByAltText(appointment, "Add"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();

  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container } = render(<><Application /></>);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Edit"));

    fireEvent.change(getByPlaceholderText(appointment, "name here"), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(queryByText(appointment, "Save"));

    await waitForElement(() => getByText(container, "Lydia Miller-Jones"));

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();


  });


  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getAllByTestId(appointment, "addButton")[0]);

    await waitForElement(() => getByPlaceholderText(appointment, "name here"));

    fireEvent.change(getByPlaceholderText(appointment, "name here"), {
      target: { value: "Archie Cohen" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    await waitForElementToBeRemoved(() => queryByText(appointment, 'SAVING'))

    expect(getByText(appointment, "Appointment could not be booked")).toBeInTheDocument();

    fireEvent.click(getByAltText(appointment, "Close"));

    expect(getByText(appointment, "Save")).toBeInTheDocument();

  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    const { container } = render(<Application />);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));

    fireEvent.click(queryByText(appointment, "Confirm"));

    await waitForElementToBeRemoved(() => queryByText(appointment, 'DELETING'))

    expect(getByText(appointment, "Appointment could not be cancelled")).toBeInTheDocument();

    fireEvent.click(getByAltText(appointment, "Close"));

    expect(getByText(appointment, "Archie Cohen")).toBeInTheDocument();

  });

});