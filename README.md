# Development

## Running the website

```
# Install the dependencies.
pnpm install

# Start the development server (NOTE: needs to refresh in order to reload).
pnpm dev
```

## Linting the Codebase

```
# Check Formatting
pnpm fmt # prettier

# Apply Formatting Auto-fix
pnpm fmt:fix # prettier --write

# Check Linting Rules
pnpm lint:html   # linthtml
pnpm lint:css    # stylelint
pnpm lint:js     # eslint

# Check All Lints
pnpm lint
```
