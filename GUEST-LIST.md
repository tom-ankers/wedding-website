# Master invitee list

The confirmed master list currently contains eight guests across two parties. Names and invitation codes are stored only in the private folder, outside the public site and Git.

The master file is `private/guest-list.json`. Keep each invited person in exactly one party, with a stable party ID and guest ID:

```json
{
  "parties": [
    {
      "id": "ankers-family",
      "name": "Ankers family",
      "guests": [
        { "id": "guest-001", "name": "Replace with an invited guest’s full name" }
      ]
    }
  ]
}
```

This is a format example, not a confirmed invitation. Add the actual names before generating invitations.

Run `node scripts/build-invitations.js` to generate a private invitation code for each party. The script updates the master JSON and writes an easy-to-read `private/master-invitees.md` with all parties, names and invitation codes. Back up the private folder securely; Git ignores it.

Only encrypted party files are published under `static/invitations`. Share each code privately with that party. Anyone with a party’s code can view its names and submit its RSVP. There are no email accounts or passwords to manage.

Each party submits one response containing attendance, meal choice and dietary requirements for each invited person. Responses go through the existing FormSubmit email delivery. The master file is an invitation roster, not an automatically updated response database. Guests cannot reload a previous response, and sending another response produces another email.

Regenerate and redeploy after changing the list. Keep party IDs and guest IDs stable. To replace a code, remove the party’s `code` from the private JSON and regenerate; the generated folder is rebuilt to remove retired invitation files.
