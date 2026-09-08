# Attached documents

Files students download from the checklist and the destinations map. Anything
in this folder is served at the path Drupal reports through
`drupalSettings.uabErasmus.documentsBase`, and at `documents/` in the static
preview — so the same filename works in both.

## Adding or replacing a document

1. Drop the file here. Keep the name lowercase with hyphens, and put the year
   in it if the document is reissued each round
   (`partners-study-2025.pdf`). A year in the name means nobody has to guess
   whether the file on the page is the current one.
2. Point an entry at it in `src/data/checklist.json`:

   ```json
   {
     "id": "previous",
     "title": "Declare previous Erasmus periods",
     "resources": [
       {
         "kind": "form",
         "label": "Declaration of previous Erasmus periods",
         "file": "declaratie-perioade-anterioare-2026.docx",
         "note": "From the International Relations office"
       }
     ]
   }
   ```

3. `npm run build`, then `npm run deploy` for Drupal.

That is the whole change — no code edit. `kind` picks the badge: `form` for a
Word document, `pdf`, `guide` for a walkthrough, `link` for an official page.
Use `href` instead of `file` when the document lives on someone else's site,
so a reissue on their end does not silently leave us serving a stale copy.

## Resources with no file yet

An entry with neither `file` nor `href` still renders — as a dashed card
rather than a download. That is deliberate for documents the office only hands
out on request: the student still learns exactly what to ask for, and the card
turns into a real download the moment a file is added. `previous` is in this
state today; the declaration form was not published anywhere we could find it,
and linking a guessed-at form for a step that gets files rejected would be
worse than linking nothing.

## Current contents

| File | Used by | Reissued |
| --- | --- | --- |
| `partners-study-2025.pdf` | Destinations map, study places | Each academic year |
| `partners-internship-2025.pdf` | Destinations map, traineeship places | Each academic year |
