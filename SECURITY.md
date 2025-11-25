# Security Policy

## Reporting a Vulnerability

We take security seriously at vTicker. If you discover a security vulnerability, please follow responsible disclosure practices.

### How to Report

**Do NOT** open a public GitHub issue for security vulnerabilities.

Instead, please report security issues by:

1. **Email:** Send details to the repository maintainers via GitHub
2. **GitHub Security Advisory:** Use the [GitHub Security Advisory](https://github.com/vdappdev2/vticker/security/advisories/new) feature (preferred)

### What to Include

When reporting a vulnerability, please include:

- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact assessment
- Suggested fix (if available)
- Your contact information for follow-up

### Response Timeline

- **Acknowledgment:** Within 48 hours
- **Initial Assessment:** Within 7 days
- **Status Updates:** Every 14 days until resolved
- **Fix Timeline:** Varies by severity (critical issues prioritized)

## Security Best Practices

### For Contributors

When contributing to vTicker:

1. **Use `npm ci`** instead of `npm install`
   - Ensures exact dependency versions from `package-lock.json`
   - Prevents supply chain attacks from unexpected updates

2. **Review Dependabot PRs**
   - Check changelogs before approving dependency updates
   - Verify security patches are legitimate

3. **Never commit secrets**
   - No API keys, tokens, or credentials
   - Use environment variables for sensitive data
   - Check commits before pushing

4. **Run security audits**
   ```bash
   npm audit
   ```

### For Users/Deployers

1. **Keep dependencies updated**
   - Enable Dependabot alerts
   - Review and apply security patches promptly

2. **Use environment variables**
   - Never hardcode configuration
   - Use `.env.local` for local development (gitignored)

3. **Run in production mode**
   ```bash
   npm run build
   npm start
   ```

4. **Monitor for security advisories**
   - Watch this repository for security updates
   - Subscribe to GitHub security notifications

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 0.1.x   | :white_check_mark: |

## Security Measures

This project implements:

- ✅ Automated dependency scanning (Dependabot)
- ✅ npm audit in CI/CD pipeline
- ✅ Locked dependency versions via `package-lock.json`
- ✅ Type safety with TypeScript
- ✅ ESLint for code quality
- ✅ Regular security updates

## Known Issues

No known security issues at this time.

## Supply Chain Security

To protect against npm supply chain attacks:

1. **Always use `npm ci`** - Uses exact versions from lock file
2. **Verify `package-lock.json` integrity** - Check for unexpected changes
3. **Review CI/CD logs** - Look for suspicious install scripts
4. **Monitor Dependabot alerts** - Act on security updates promptly

### Indicators of Compromise

Watch for:
- Unexpected `postinstall` scripts in dependencies
- New dependencies you didn't add
- Changes to `package-lock.json` without corresponding PR
- Unusual network activity during `npm install`

## Security Champions

We follow security best practices inspired by:
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [npm Security Best Practices](https://docs.npmjs.com/packages-and-modules/securing-your-code)
- [GitHub Security Best Practices](https://docs.github.com/en/code-security)

## Disclosure Policy

- **Coordinated Disclosure:** We follow a 90-day disclosure timeline
- **Public Disclosure:** Security advisories published after fix is available
- **Credit:** Security researchers will be credited (unless they prefer anonymity)

## Contact

For non-security issues, please use [GitHub Issues](https://github.com/vdappdev2/vticker/issues).

---

Thank you for helping keep vTicker secure!
