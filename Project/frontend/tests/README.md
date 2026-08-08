# Frontend tests

The sprint plan recommends an integration test layer such as Playwright.

Suggested first end-to-end scenarios:

1. Open `/requests/new`.
2. Submit a valid request.
3. Assert navigation to `/requests/[id]`.
4. Assert Approval Brief is visible.
5. Click Approve.
6. Assert the decision confirmation is visible.
7. Open `/audit`.
8. Assert the request appears in the audit history.

Install Playwright when the team is ready:

```bash
npm install -D @playwright/test
npx playwright install
```
