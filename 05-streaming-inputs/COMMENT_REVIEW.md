<!--
Author: Vipin Singh
Date: 2026-10-24
File Description: Review of function comments in main.ts, with fixes and suggestions.
-->

# Comment Review: `main.ts`

## Summary

| Item | Location | Has a comment? | Status |
|------|----------|----------------|--------|
| File header (Author / Date / Description) | top of file | No | ❌ Missing (CLAUDE.md requires it) |
| `generateMessage()` | line 3 | No | ❌ Missing |
| `main()` | line 25 | No | ❌ Missing |
| Inline: 3-second delay | line 13 | No | ⚠️ Should explain why |
| Inline: result filter | line 33 | No | ⚠️ Should explain what's filtered out |
| Top-level `main()` call | line 39 | No | ⚠️ No error handling, no comment |

`main.ts` has **no comments at all**. Neither function is documented, and the file header that `CLAUDE.md` requires is missing.

---

## 1. File header (missing)

**Issue:** `CLAUDE.md` says every file needs an author, a date and a file description at the top.

**Fix:**

```ts
// Author: Vipin Singh
// Date: 2026-10-24
// File Description: Shows streaming input mode in the Claude Agent SDK.
//   An async generator sends several user messages to query() over time,
//   and the script prints the final successful result.
```

---

## 2. `generateMessage()` (line 3)

**Issue:** No JSDoc. A reader can't tell why this is a generator, what it yields, or why it pauses between messages.

**Suggested fix:**

```ts
/**
 * Sends user messages to the agent one at a time (streaming input mode).
 *
 * Yields the first prompt right away, waits 3 seconds, then yields a
 * follow-up prompt. This shows that new messages can reach the agent
 * while an earlier turn is still running.
 *
 * @returns {AsyncGenerator<SDKUserMessage>} The user messages to pass to query().
 */
async function* generateMessage(): AsyncGenerator<SDKUserMessage> {
```

**Inline comment for line 13:**

```ts
  // Wait before sending the follow-up, so it arrives while the agent is still working.
  await new Promise(resolve => setTimeout(resolve, 3000));
```

**Optional:** The name `generateMessage` is singular, but the function yields several messages. `generateMessages` would be clearer.

---

## 3. `main()` (line 25)

**Issue:** No JSDoc. The options (`maxTurns`, `allowedTools`) and the result filter aren't explained.

**Suggested fix:**

```ts
/**
 * Entry point. Runs an agent query with streaming input and prints the result.
 *
 * - maxTurns: 10 limits how many turns the agent can take.
 * - allowedTools limits the agent to reading, searching, writing and editing files.
 *
 * @returns {Promise<void>} Resolves when the agent's message stream ends.
 */
async function main(): Promise<void> {
```

**Inline comment for line 33:**

```ts
    // Skip intermediate messages (assistant, tool, system); print only the final successful result.
    if (result.type === 'result' && result.subtype === 'success') {
```

**Suggestion:** Results that are not `success` (for example `error_max_turns`) are dropped without any output. Add a comment or an `else` branch that logs them so failures are visible.

---

## 4. Top-level `main()` call (line 39)

**Issue:** The promise isn't handled. If `main()` throws, the error is an unhandled rejection and has no context.

**Fix:**

```ts
// Run the script, log any error and exit with a non-zero code.
main().catch(err => {
  console.error('Agent query failed:', err);
  process.exit(1);
});
```

---

## 5. Related style note (not about comments)

`CLAUDE.md` asks for **2-space indentation**, but `main.ts` uses 4 spaces. Re-indent the file when you add the comments above.

---

## Checklist

- [ ] Add the file header (Author, Date, File Description)
- [ ] Add JSDoc to `generateMessage()`
- [ ] Add JSDoc to `main()`
- [ ] Explain the 3-second delay
- [ ] Explain the result filter, and log results that are not `success`
- [ ] Add `.catch()` to the top-level `main()` call
- [ ] Re-indent to 2 spaces
- [ ] (Optional) Rename `generateMessage` → `generateMessages`
