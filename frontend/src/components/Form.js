import { useState } from "react";
import axios from "axios";
import config from "../config";
import Select from "./Select";
import "./Form.css";

const Form = (props) => {
  const [name, setName] = useState("");
  const [event, setEvent] = useState({ key: "", value: "" });
  const [city, setCity] = useState({ key: "", value: "" });
  const [errors, setErrors] = useState([]);

  const choicesEvents = [
    ["", "---"],
    ["front-end-react", "Front End - ReactJS"],
    ["back-end-node", "Back End - NodeJS"],
    ["full-stack-mern", "Full Stack - MERN"],
    ["tester-manual", "Tester Manualny"],
  ];

  const choicesCities = [
    ["", "---"],
    ["online", "Online"],
    ["warsaw", "Warszawa"],
    ["cracow", "Kraków"],
  ];

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeEvent = (e) => {
    setEvent({
      key: e.target.value,
      val: e.target.options[e.target.selectedIndex].innerText,
    });
  };

  const handleChangeCity = (e) => {
    setCity({
      key: e.target.value,
      val: e.target.options[e.target.selectedIndex].innerText,
    });
  };

  const saveEvent = (eventObj) => {
    axios
      .post(config.api.url + "/events/add", eventObj, { mode: "cors" })
      .then((res) => {
        props.getEvents();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const resetForm = () => {
    setName("");
    setEvent({ key: "", value: "" });
    setCity({ key: "", value: "" });
    setErrors([]);
  };

  const validateForm = (e) => {
    e.preventDefault();

    let errorsValidate = [];

    if (name.trim() === "") {
      errorsValidate.push("Wpisz imię i nazwisko");
    }

    if (event.key.trim() === "") {
      errorsValidate.push("Wybierz szkolenie");
    }

    if (city.key.trim() === "") {
      errorsValidate.push("Wybierz miasto");
    }

    if (errorsValidate.length > 0) {
      setErrors(
        errorsValidate.map((errorTxt, index) => {
          return <li key={index}>{errorTxt}</li>;
        })
      );
      return false;
    }

    const newEvent = {
      name: name,
      event: event,
      city: city,
    };

    saveEvent(newEvent);

    resetForm();
  };

  return (
    <>
      <form action="#" onSubmit={validateForm}>
        <div className="wrapper">
          <label htmlFor="name">Imię i nazwisko</label>
          <input type="text" id="name" value={name} onChange={handleChangeName} />
        </div>
        <div className="wrapper">
          <label htmlFor="event">Wydarzenie</label>
          <Select values={choicesEvents} selectedValue={event.key} onValueChange={handleChangeEvent} id="event" />
        </div>
        <div className="wrapper">
          <label htmlFor="city">Miasto</label>
          <Select values={choicesCities} selectedValue={city.key} onValueChange={handleChangeCity} id="city" />
        </div>
        <div className="wrapper">
          <button type="submit">Zapisz na szkolenie</button>
        </div>
      </form>
      <div className="errorsWrapper">
        <ul className="errors">{errors}</ul>
      </div>
    </>
  );
};

export default Form;
