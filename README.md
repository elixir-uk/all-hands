# ELIXIR-UK All Hands

One site for every year's All Hands. Each year is one data file plus four tiny pages.

| URL | What it is | Indexed |
|---|---|---|
| `/` | Redirects to the current year | – |
| `/2026/` | Intro, programme, registration – later the archive with slides | Yes |
| `/2026/speakers/` | Every speaker, with links to their sessions | Yes |
| `/2026/posters/` | Poster abstracts, filterable by topic | Yes |
| `/2026/logistics/` | Venue, travel, hotels, reimbursement, food, accessibility | Yes |
| `/2026/live/` | Day-of companion: now and next, interactive links, help | No (`noindex`) |

Everything comes from `_data/2026.yml`. Edit it on GitHub and commit; Pages rebuilds in about a minute.

**The repo is public.** `noindex` keeps `/live/` out of search, but anyone can read the data file on GitHub.
No passwords, personal numbers, attendee names or contact lists.

## Registration

Set `registration.url` and `registration.deadline` (UK time, `"2026-11-18T17:00"`).

- The Register button shows in the header, the hero and the logistics page until the deadline.
- At the deadline it disappears in visitors' browsers and the closed message shows – no push needed.
- Any build after the deadline leaves the button out of the HTML altogether.
- Test the closed state at any time with `?now=2026-11-18T17:00` on any page.

## Banners

`stats:` in the data file – rounded figures, updated by hand. Add, remove or reorder entries freely.

## Speakers

Each person is listed once under `speakers:` (first-name order) and referred to by `id` in sessions,
so the programme and the speakers page never disagree. Add `photo:` (square image in `assets/img/speakers/`)
and `bio:` when you have them; initials show until then.
Groups and TBC speakers can stay inline in a session: `{ name: "", org: "", topic: "" }`.

## Posters

Generated from the ClickUp "All Hands Posters" export:

    python scripts/posters_from_clickup.py ~/Downloads/export.csv 2026

Only posters with the authors' authorisation ticked and an abstract are published, and only number, title,
presenter, topic, authors and abstract are read – never emails or the equality-monitoring fields.
Small fixes can go straight into `_data/posters/2026.yml`. Never commit the CSV (`.gitignore` blocks `*.csv`).

## During the event

- Interactive buttons (`interactive:`) only appear on `/live/`, and only when `url` is filled in.
- Preview the now-and-next bar with `/2026/live/?now=2026-11-25T10:30`.
- Add `slides:` links after the event to turn `/2026/` into the archive.

## Each year

1. Copy `_data/2026.yml` to `_data/2027.yml` and update it.
2. Copy the `2026/` folder to `2027/` and change `event: "2026"` and the permalinks.
3. Change `redirect_to` in `index.md` to `/2027/`.

## Set-up

1. Push to GitHub, then Settings → Pages → Deploy from branch → `main` / root.
2. Optional custom domain: add `allhands.elixiruknode.org` in Pages settings and a CNAME record pointing to `<account>.github.io`.
3. Brand: Lato and the elixiruknode.org theme palette, set as CSS variables at the top of `assets/css/style.css`.
4. The isometric illustrations and BBSRC logo load from elixiruknode.org (see `illustrations:` in the data file).
   Copy them into `assets/img/` and update the paths before the WordPress site is retired.
