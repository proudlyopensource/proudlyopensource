# `@proudlyopensource/eslint-config`

Shared ESLint flat configs for the Proudly Open Source monorepo.

## Usage

```js
// apps/frontend/eslint.config.js
import { nextJsConfig } from "@proudlyopensource/eslint-config/next-js"

export default nextJsConfig
```

```js
// packages/ui/eslint.config.js
import { config } from "@proudlyopensource/eslint-config/react-internal"

export default config
```
