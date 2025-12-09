# Contributing

## Getting started

1. Fork the repository and clone your fork:

   ```bash
   git clone git@github.com:Azhar-Sharif/olx-clone-ui.git
   cd olx-clone-ui
   npm install
   ```

2. Run the dev server:

   ```bash
   npm run dev
   ```

3. Build and test locally:

   ```bash
   npm run build
   npm test
   ```

## Branching

- We follow GitFlow branching model:
  - **production**: `production` or `production/stable` — the branch that reflects the live production state.
  - **development**: `development` — integration branch where features are merged and QA occurs.
  - **feature branches**: create from `development` with the prefix `feature/` (example: `feature/add-login`).

  Branch naming examples:
  - `feature/your-feature-name`
  - `fix/short-description`
  - `chore/update-deps`

  Rules:
  - Always branch off `development` when starting a new feature.
  - Open PRs against `development` for features and fixes.
  - When `development` is ready for release, create a release branch or merge into `production` following your release process.
  - Hotfixes for production may be branched from `production/stable` and then merged back into both `production/stable` and `development`.

## Coding style and linters

- This project uses TypeScript, ESLint and Prettier. Run the linters and formatter locally before creating a PR:

  ```bash
  npm run lint
  npm run lint-fix
  npm run format
  ```

- The repository is configured with Husky + lint-staged to run linters and formatters on staged files automatically at commit time. Make sure hooks are enabled (they are installed during `npm install`).

## Husky / lint-staged (pre-commit hooks)

- Pre-commit hooks run automatically and will block commits when lint or format checks fail.
- If a commit is blocked, fix the reported issues and try again. You can bypass hooks temporarily with `--no-verify` (use sparingly).

## Commits & Pull Requests

- Follow readable, descriptive commit messages. Use a short subject line and, if needed, a longer body.
- Open a Pull Request (PR) against the branch your team expects (e.g. `feature/project-setup` or `main`). In your PR description:
  - Explain the motivation and what the change does.
  - Link relevant issues, screenshots or steps to test.
  - Add a checklist for items like linting, tests and documentation updates.

## Reporting Issues

- Open an issue using the repository's issue tracker. Provide:
  - A clear title
  - Steps to reproduce
  - Expected vs actual behavior
  - Environment details (Node/npm versions)
