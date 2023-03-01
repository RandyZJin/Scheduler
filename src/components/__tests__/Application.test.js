import React from "react";
import axios from "axios";
import { render, cleanup, fireEvent, prettyDOM, getByText, getAllByTestId, getByPlaceholderText, queryByText, getByAltText, queryByAltText } from "@testing-library/react";
import Application from "components/Application";
import { waitForElement } from "@testing-library/react";
import { within } from '@testing-library/dom'


afterEach(cleanup);

xit("renders without crashing", () => {
  render(<Application />);
});

// it("defaults to Monday and changes the schedule when a new day is selected", () => {
//   const { getByText } = render(<Application />);

//   return waitForElement(() => getByText("Monday")).then(() => {
//     fireEvent.click(getByText("Tuesday"));
//     expect(getByText("Leopold Silvers")).toBeInTheDocument();
//   });
// });
// non async/await version


describe("Application", () => {
  xit("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  xit("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { getByTestId, getAllByTestId, getByText, getByPlaceholderText, getByAltText, container } = render(<Application />);

    await waitForElement(() => getByText("Archie Cohen"));

    // console.log(prettyDOM(container));

    const appointments = getAllByTestId("appointment");
    console.log(prettyDOM(appointments));


    // await waitForElement(() => getByText("Monday"));


    // expect(getByText("Archie Cohen")).toBeInTheDocument();

    // fireEvent.click(getAllByTestId("addButton")[0]);

    // await waitForElement(() => getByPlaceholderText("name here"));

    // expect(getByAltText("Sylvia Palmer")).toBeInTheDocument();

    // fireEvent.change(getByPlaceholderText("name here"), {
    //   target: { value: "Lydia Miller-Jones" }
    // });

    // fireEvent.click(getByAltText("Sylvia Palmer"));


    // fireEvent.click(getByText("Save"));



  });
  xit("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { queryByText, getAllByTestId, getByText, getByPlaceholderText, getByAltText, container, debug } = render(<Application />);

    await waitForElement(() => getByText("Archie Cohen"));

    // console.log(prettyDOM(container));

    const appointments = getAllByTestId("appointment");
    const appointment = appointments[0];

    // console.log(prettyDOM(appointment));

    fireEvent.click(getAllByTestId("addButton")[0]);

    await waitForElement(() => getByPlaceholderText("name here"));

    expect(getByAltText("Sylvia Palmer")).toBeInTheDocument();

    fireEvent.change(getByPlaceholderText("name here"), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText("Sylvia Palmer"));

    fireEvent.click(getByText("Save"));

    expect(getByText("SAVING")).toBeInTheDocument();

    // console.log(prettyDOM(appointment));

    await waitForElement(() => queryByText("Lydia Miller-Jones"));

    // debug()

    const day = getAllByTestId("day").find(day =>
      queryByText("Monday")
    );

    // console.log(prettyDOM(day));

    const spots = within(day).getByText('no spots remaining');

  });

  xit("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug, } = render(<Application />);
    // console.log(getByText)
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];

    fireEvent.click(getAllByTestId(appointment, "addButton")[0]);

    await waitForElement(() => getByPlaceholderText(appointment, "name here"));

    fireEvent.change(getByPlaceholderText(appointment, "name here"), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "SAVING")).toBeInTheDocument();

    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    console.log(prettyDOM(day));

    expect(getByText(day, "no spots remaining")).toBeInTheDocument();





  });

  xit("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed.
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


    console.log(prettyDOM(appointment));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    console.log(prettyDOM(day));

    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();


  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    const { container } = render(<Application />);



    await waitForElement(() => getByText(container, "Archie Cohen"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );

    
    
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
      );
      

    
    fireEvent.click(queryByAltText(appointment, "Edit"));

    fireEvent.change(getByPlaceholderText(appointment, "name here"), {
      target: { value: "Bob Buttons" }
    });



    fireEvent.click(queryByText(appointment, "Save"));

    


    await waitForElement(() => getByText(container, "Bob Buttons"));

    // console.log(prettyDOM(appointment));



    // console.log(prettyDOM(day));

    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();


    // expect(getByValue(appointment, "Archie Cohen")).toBeInTheDocument();

    // expect(getByText(appointment, "Tori Malcolm")).toBeInTheDocument();

  });



});