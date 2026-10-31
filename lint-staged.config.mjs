/** @type {import("lint-staged").Configuration} */
export default {
  "*.{js,jsx,ts,tsx}": [
    "prettier --write",
    "node scripts/lint-staged-eslint.mjs",
  ],
  "*.{json,md,css,mjs,yml,yaml}": ["prettier --write"],
}
