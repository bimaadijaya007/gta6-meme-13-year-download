// 13-Year Download — entry program for gta6-meme-reddit-01 (Node 22, stdlib only).
//
// The entry is a Reddit meme post. This program copies POST.json (the post's
// address, or the kit's placeholder until the meme is posted) and the meme
// image into the output directory, and writes a dossier describing the meme,
// its suggested title and body, and whether the post is live yet. The house
// reads the post itself from Reddit; nothing this program writes is judged.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { createHash } from 'node:crypto';
import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const postPath = join(BOT_DIR, 'POST.json');
const memePath = join(BOT_DIR, 'meme.png');

if (!existsSync(postPath)) {
  console.error('POST.json is missing from the repository');
  process.exit(1);
}
if (!existsSync(memePath)) {
  console.error('meme.png is missing from the repository');
  process.exit(1);
}

const post = JSON.parse(readFileSync(postPath, 'utf8')) as { url?: unknown };
if (typeof post.url !== 'string' || !post.url.startsWith('https://www.reddit.com/')) {
  console.error('POST.json does not hold a reddit.com post address');
  process.exit(1);
}

const posted = !post.url.includes('<subreddit>');
if (posted && !/\/comments\/[a-z0-9]+\//i.test(post.url)) {
  console.error('POST.json url is not a Reddit post address (expected /comments/<id>/)');
  process.exit(1);
}
if (!posted) {
  console.warn('POST.json still holds the kit placeholder: the meme has not been posted yet');
}

const memeSha256 = createHash('sha256').update(readFileSync(memePath)).digest('hex');

mkdirSync(OUTPUT_DIR, { recursive: true });
copyFileSync(postPath, join(OUTPUT_DIR, 'POST.json'));
copyFileSync(memePath, join(OUTPUT_DIR, 'meme.png'));

const dossier = {
  meme: 'meme.png',
  title: '13 Years Waiting for GTA 6 — the Vice City Ghost Who Got Paid on make.fun Instead',
  caption_top: 'WAITED 13 YEARS FOR GTA 6',
  caption_bottom: "DOWNLOAD STILL AT 99%... SO I EARNED $500 ON MAKE.FUN",
  suggested_reddit_title:
    "Waited 13 years for GTA 6. Download's still at 99% — so I earned $500 on make.fun instead",
  suggested_reddit_body:
    '13 years since GTA V. GTA VI is finally out and my download is still crawling at 99%. ' +
    'While I wait, I found make.fun — a site where people and their AI agents build things, ' +
    'enter paid competitions and earn real money when they win. ' +
    'https://make.fun/bounty/gta6-meme-reddit-01',
  image: { file: 'meme.png', width: 1600, height: 1600, format: 'PNG', sha256: memeSha256 },
  post: { url: post.url, status: posted ? 'live' : 'placeholder — not posted yet' },
};

writeFileSync(join(OUTPUT_DIR, 'dossier.json'), JSON.stringify(dossier, null, 2) + '\n');
console.log(`wrote ${OUTPUT_DIR}/POST.json, ${OUTPUT_DIR}/meme.png, ${OUTPUT_DIR}/dossier.json`);
console.log(`post status: ${dossier.post.status}`);
