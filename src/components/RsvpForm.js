import React, { useEffect, useState } from "react";
import { withPrefix } from "gatsby";
import { openInvitation } from "../utils/invitations";

export default function RsvpForm() {
  const [code, setCode] = useState("");
  const [party, setParty] = useState(null);
  const [attendance, setAttendance] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => {
    setSubmitted(
      new URLSearchParams(window.location.search).get("submitted") === "true"
    );
  }, []);
  const unlock = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const invitation = await openInvitation(
        code,
        withPrefix("/invitations/")
      );
      setParty(invitation);
      setCode("");
      setAttendance({});
    } catch (failure) {
      setError(
        failure.message.startsWith("We ") ||
          failure.message.startsWith("Check ")
          ? failure.message
          : "We couldn’t open your invitation. Check your code and connection, then try again."
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {submitted && (
        <p role="status" className="has-text-centered mb-5">
          Thank you for sending your party’s RSVP.
        </p>
      )}
      {!party ? (
        <form className="box rsvp-simple-form" onSubmit={unlock}>
          <h3 className="title is-size-4">Find your party</h3>
          <p className="mb-4">
            Enter the private code from your invitation to respond for everyone
            in your party.
          </p>
          <label className="label" htmlFor="invitation-code">
            Invitation code
          </label>
          <input
            className="input"
            id="invitation-code"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            required
            autoCapitalize="none"
            spellCheck={false}
            autoComplete="off"
            aria-describedby={error ? "invitation-error" : "invitation-help"}
          />
          <p id="invitation-help" className="help">
            Can’t find your code? Please contact Tom and Emma.
          </p>
          {error && (
            <p
              id="invitation-error"
              role="alert"
              className="has-text-danger mt-3"
            >
              {error}
            </p>
          )}
          <button
            className={`button is-primary mt-4 ${loading ? "is-loading" : ""}`}
            disabled={loading}
            type="submit"
          >
            Open my party’s RSVP
          </button>
        </form>
      ) : (
        <form
          className="box rsvp-simple-form"
          action="https://formsubmit.co/thomasjamesankers@gmail.com"
          method="POST"
        >
          <input
            type="hidden"
            name="_subject"
            value={`Wedding RSVP — ${party.name}`}
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
          <input type="hidden" name="Party ID" value={party.id} />
          <input type="hidden" name="Party" value={party.name} />
          <h3 className="title is-size-4">{party.name}</h3>
          <p className="mb-4">
            Please respond for all {party.guests.length} invited guests below,
            including anyone who cannot attend.
          </p>
          {party.guests.map((guest, index) => {
            const prefix = `Guest ${index + 1}`;
            const attending = attendance[guest.id];
            return (
              <fieldset className="party-guest" key={guest.id}>
                <legend className="title is-size-5">{guest.name}</legend>
                <input type="hidden" name={`${prefix} ID`} value={guest.id} />
                <input
                  type="hidden"
                  name={`${prefix} name`}
                  value={guest.name}
                />
                <div className="field">
                  <label className="label" htmlFor={`${guest.id}-attendance`}>
                    Will {guest.name} attend?
                  </label>
                  <select
                    className="input"
                    id={`${guest.id}-attendance`}
                    name={`${prefix} attendance`}
                    value={attending || ""}
                    onChange={(event) =>
                      setAttendance({
                        ...attendance,
                        [guest.id]: event.target.value,
                      })
                    }
                    required
                  >
                    <option value="" disabled>
                      Please choose
                    </option>
                    <option value="Yes">Yes, happily accepts</option>
                    <option value="No">No, sadly declines</option>
                  </select>
                </div>
                {attending === "Yes" && (
                  <>
                    <div className="field">
                      <label className="label" htmlFor={`${guest.id}-meal`}>
                        Meal choice for {guest.name}
                      </label>
                      <select
                        className="input"
                        id={`${guest.id}-meal`}
                        name={`${prefix} meal`}
                        required
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Please choose
                        </option>
                        <option value="Meat">Meat</option>
                        <option value="Vegetarian">Vegetarian</option>
                      </select>
                    </div>
                    <div className="field">
                      <label className="label" htmlFor={`${guest.id}-dietary`}>
                        Dietary requirements for {guest.name}
                      </label>
                      <textarea
                        className="textarea"
                        id={`${guest.id}-dietary`}
                        name={`${prefix} dietary requirements`}
                        rows="2"
                        required
                        placeholder="Allergies or dietary requirements, or ‘None’."
                      />
                    </div>
                  </>
                )}
              </fieldset>
            );
          })}
          <div className="field">
            <label className="label" htmlFor="party-message">
              Message to Tom and Emma (optional)
            </label>
            <textarea
              className="textarea"
              id="party-message"
              name="Message"
              rows="3"
              maxLength="2000"
            />
          </div>
          <div className="party-actions">
            <button className="button is-primary" type="submit">
              Send RSVP for the whole party
            </button>
            <button
              className="button is-light"
              type="button"
              onClick={() => {
                setParty(null);
                setAttendance({});
              }}
            >
              Close party
            </button>
          </div>
        </form>
      )}
    </>
  );
}
