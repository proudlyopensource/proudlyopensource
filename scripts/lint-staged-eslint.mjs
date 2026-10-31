#!/usr/bin/env node
// Runs ESLint for staged files using the eslint.config.* of the workspace that
// owns each file. ESLint resolves configuration relative to the current working
// directory, so running it from the monorepo root fails to find the per-app
// config (and makes Next.js rules look for pages/ in the wrong place).
// lint-staged invokes this script with paths relative to the repository root.

import { existsSync } from "node:fs"
import { createRequire } from "node:module"
import path from "node:path"
import process from "node:process"

const require = createRequire(import.meta.url)
const { ESLint } = require("eslint")

const repoRoot = process.cwd()
const CONFIG_FILES = [
  "eslint.config.js",
  "eslint.config.mjs",
  "eslint.config.cjs",
]

function findConfigDirectory(file) {
  let directory = path.dirname(path.resolve(repoRoot, file))

  while (true) {
    if (CONFIG_FILES.some((name) => existsSync(path.join(directory, name)))) {
      return directory
    }

    if (directory === repoRoot) return null

    const parent = path.dirname(directory)
    if (parent === directory) return null
    directory = parent
  }
}

const filesByConfig = new Map()

for (const file of process.argv.slice(2)) {
  const directory = findConfigDirectory(file)
  if (!directory) continue

  if (!filesByConfig.has(directory)) filesByConfig.set(directory, [])
  filesByConfig.get(directory).push(path.resolve(repoRoot, file))
}

let errorCount = 0

for (const [directory, files] of filesByConfig) {
  const eslint = new ESLint({ cwd: directory, fix: true })
  const results = await eslint.lintFiles(files)

  await ESLint.outputFixes(results)

  const formatter = await eslint.loadFormatter("stylish")
  const output = formatter.format(results)
  if (output) process.stdout.write(output)

  errorCount += results.reduce((total, result) => total + result.errorCount, 0)
}

process.exitCode = errorCount > 0 ? 1 : 0
