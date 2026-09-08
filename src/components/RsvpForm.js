import React, { useEffect, useState } from "react";
export default function RsvpForm() {
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    setSubmitted(
      new URLSearchParams(window.location.search).get("submitted") === "true"
    );
  }, []);
  return (
    <>
      {submitted && (
        <p role="status" className="has-text-centered mb-5">
          Thank you for sending your RSVP. You can use the form below for
          another guest.
        </p>
      )}
      <form
        className="box rsvp-simple-form"
        action="https://formsubmit.co/thomasjamesankers@gmail.com"
        method="POST"
      >
        <input
          type="hidden"
          name="_subject"
          value="New Tom & Emma wedding RSVP"
        />
        <input type="hidden" name="_captcha" value="false" />
        <input
          type="hidden"
          name="_next"
          value="https://tom-ankers.github.io/wedding-website/en/?submitted=true#rsvp"
        />
        <input
          type="text"
          name="_honey"
          style={{ display: "none" }}
          tabIndex="-1"
          autoComplete="off"
        />

        <div className="field">
          <label className="label" htmlFor="guest-name">
            Name
          </label>
          <div className="control">
            <input
              className="input"
              id="guest-name"
              name="Name"
              type="text"
              placeholder="Your full name"
              required
            />
          </div>
        </div>

        <fieldset className="field">
          <legend className="label">Meal choice</legend>
          <div className="control rsvp-meal-options">
            <label className="radio mr-5">
              <input type="radio" name="Meal choice" value="Meat" required />{" "}
              Meat
            </label>
            <label className="radio">
              <input
                type="radio"
                name="Meal choice"
                value="Vegetarian"
                required
              />{" "}
              Vegetarian
            </label>
          </div>
        </fieldset>

        <div className="field">
          <label className="label" htmlFor="dietary-requirements">
            Dietary requirements
          </label>
          <div className="control">
            <textarea
              className="textarea"
              id="dietary-requirements"
              name="Dietary requirements"
              placeholder="Please tell us about allergies, intolerances or other dietary requirements. Write ‘None’ if there are none."
              rows="5"
              required
            />
          </div>
        </div>

        <div className="field mt-5 has-text-centered">
          <button className="button is-primary is-medium" type="submit">
            Send RSVP
          </button>
        </div>
      </form>
    </>
  );
}
