# Contributing to vTicker

Thank you for your interest in contributing to vTicker! We welcome contributions from the community.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Code Style](#code-style)
- [Security](#security)

## Code of Conduct

This project adheres to a Code of Conduct. By participating, you are expected to uphold this code. Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before contributing.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/vticker.git
   cd vticker
   ```

3. **Add the upstream repository**:
   ```bash
   git remote add upstream https://github.com/vdappdev2/vticker.git
   ```

## Development Setup

### Prerequisites

- Node.js 20.x or higher
- npm (comes with Node.js)
- Git

### Installation

**IMPORTANT:** Always use `npm ci` instead of `npm install` for security reasons.

```bash
# Install dependencies with exact versions from package-lock.json
npm ci
```

#### Why `npm ci`?

- ✅ Uses exact versions from `package-lock.json` (prevents supply chain attacks)
- ✅ Faster than `npm install` in CI/CD environments
- ✅ Ensures everyone has identical dependency versions
- ✅ Fails if `package.json` and `package-lock.json` are out of sync

**Never use `npm install` unless you're intentionally adding/updating dependencies.**

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your changes.

## Making Changes

### Creating a Branch

Always create a new branch for your changes:

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/issue-description
```

Branch naming conventions:
- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Adding or updating tests

### Development Workflow

1. Make your changes
2. Test your changes:
   ```bash
   npm run dev  # Test in browser
   npm run build  # Ensure production build works
   npm run lint  # Check for linting errors
   ```

3. Commit your changes:
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

### Commit Message Guidelines

Write clear, concise commit messages:

- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit first line to 72 characters
- Reference issues: "Fix #123: Description"

Examples:
```
Add converter analytics page
Fix infinite loop in price fetching
Update README with deployment instructions
Refactor API client to use TypeScript generics
```

## Submitting a Pull Request

1. **Sync with upstream**:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Open a Pull Request** on GitHub

4. **Fill out the PR template** with:
   - Description of changes
   - Related issue numbers
   - Testing performed
   - Screenshots (if UI changes)

5. **Wait for review**:
   - Address feedback from maintainers
   - CI checks must pass (linting, build, security audit)
   - At least one approval required

### PR Requirements

Before submitting a PR, ensure:

- ✅ Code follows style guidelines
- ✅ All tests pass (`npm run build`)
- ✅ No linting errors (`npm run lint`)
- ✅ Security audit passes (`npm audit`)
- ✅ Documentation updated (if needed)
- ✅ Commit messages are clear

## Code Style

### TypeScript

- Use TypeScript for all new files
- Define types explicitly (avoid `any`)
- Use interfaces for object shapes
- Export types from `types/` directory

### React/Next.js

- Use functional components with hooks
- Prefer server components (default in Next.js 15)
- Use client components (`'use client'`) only when needed
- Follow Next.js 15 App Router conventions

### File Organization

```
app/              # Next.js pages (App Router)
components/       # Reusable React components
lib/              # Utilities, API client, hooks
  ├── api.ts      # API client functions
  ├── hooks.ts    # Custom React hooks
  └── utils.ts    # Utility functions
types/            # TypeScript type definitions
```

### Naming Conventions

- **Components:** PascalCase (`TradingPairCard.tsx`)
- **Utilities:** camelCase (`formatCurrency.ts`)
- **Constants:** UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Hooks:** camelCase with `use` prefix (`useVerusPrice`)

### Code Formatting

We recommend using Prettier:

```bash
# Install Prettier (optional)
npm install --save-dev prettier

# Format code
npx prettier --write .
```

Configuration (.prettierrc):
```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}
```

## Security

### Dependency Management

**CRITICAL:** This project uses locked dependencies to prevent supply chain attacks.

#### Adding New Dependencies

1. Add the dependency:
   ```bash
   npm install package-name
   ```

2. **Review the changes**:
   - Check `package.json` for the new dependency
   - Review `package-lock.json` for transitive dependencies
   - Run `npm audit` to check for vulnerabilities

3. **Commit both files**:
   ```bash
   git add package.json package-lock.json
   git commit -m "Add package-name dependency"
   ```

#### Updating Dependencies

**Option 1: Via Dependabot (Recommended)**
- Wait for Dependabot to create a PR
- Review the changelog and security notes
- Test the update
- Merge if safe

**Option 2: Manual Update**
```bash
# Update specific package
npm update package-name

# Run security audit
npm audit

# Test everything still works
npm run build

# Commit the lock file
git add package-lock.json
git commit -m "Update package-name to vX.Y.Z"
```

### Security Checklist

Before submitting a PR:

- [ ] No secrets or credentials committed
- [ ] `npm audit` shows no high/critical vulnerabilities
- [ ] No new dependencies with suspicious names
- [ ] Dependencies are from trusted sources
- [ ] `package-lock.json` changes reviewed

### Reporting Security Issues

**Do NOT** open public issues for security vulnerabilities.

See [SECURITY.md](SECURITY.md) for responsible disclosure guidelines.

## Testing

Currently, this project does not have a formal test suite. We welcome contributions to add:

- Unit tests (Jest + React Testing Library)
- Integration tests
- E2E tests (Playwright)

## Documentation

When adding features, please update:

- README.md (if user-facing)
- Code comments (for complex logic)
- Type definitions (for API changes)

## Questions?

- Open a [Discussion](https://github.com/vdappdev2/vticker/discussions) for general questions
- Open an [Issue](https://github.com/vdappdev2/vticker/issues) for bugs or feature requests
- Tag maintainers in PRs if you need review

## Recognition

Contributors will be recognized in:
- GitHub contributors page
- Release notes (for significant contributions)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to vTicker!
