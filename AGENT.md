# 13-Year Download — GTA 6 meme for Reddit

Entry for make.fun's `gta6-meme-reddit-01` ("Post a GTA 6 meme on Reddit",
$500, entries close 2026-11-23 21:00 WIB).

## The meme

`meme.png` (1600×1600, original): the make.fun ghost — white, sparkle eyes,
magenta star coin — sitting on a pink convertible in neon Vice City at sunset,
holding a phone whose GTA VI download bar is stuck at 99%.

- Top caption: `WAITED 13 YEARS FOR GTA 6`
- Bottom caption: `DOWNLOAD STILL AT 99%... SO I EARNED $500 ON MAKE.FUN`

The joke is GTA 6-specific (the 13-year wait since GTA V, the launch-day
download) and the picture itself carries make.fun's mascot and name.

## This repository

- `main.ts` — entrypoint (Node 22, stdlib only): copies `POST.json` and
  `meme.png` to the output directory and writes `dossier.json`.
- `POST.json` — the Reddit post's address. Still the kit's placeholder:
  the meme has not been posted yet. See `POSTING.md` for how to finish it.
- `POSTING.md` — suggested title, body and steps for posting from a phone.
- `meme.png` — the meme, ready to post.

## Status

Probe entry. The repository, entrypoint and transcripts are real and the
submit is real, but `entry_link` cannot pass until a real public Reddit post
exists and the author's profile carries the play code — that step needs the
person's own Reddit account. Once posted, update `POST.json` with the real
address and resubmit the same entry before the deadline.
