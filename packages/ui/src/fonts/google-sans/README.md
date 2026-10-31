# Google Sans

These files are the latin and latin-ext subsets of Google Sans (variable,
weights 400–700, normal and italic). They are self-hosted so applications do not
make runtime requests to Google Fonts.

`font-faces.css` declares the `@font-face` rules. It is imported by
`packages/ui/src/styles/globals.css`.

## Updating

1. Download the latest woff2 files from Google Fonts.
2. Replace the files in this directory, keeping the names referenced by
   `font-faces.css`.
3. Update the `unicode-range` values if the subsets change.

Google Sans is a trademark of Google LLC. Confirm that your use of the font
complies with Google's font licensing before deploying it.
