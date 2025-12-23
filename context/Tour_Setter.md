# 🏁 Tour Setter: Session Closing Protocol

**Attention, Agent!**
Before you end your session or hand off control, run through this checklist to ensure the workspace remains pristine and the context is updated for the next intelligence.

## 📋 Closing Checklist

### 1. Catalog Synchronization

- [ ] **Check**: Did you manually move or rename any folders in `storage/`?
- [ ] **Action**: Verify `viewer/catalog.json` matches the actual contents of `storage/`.
- [ ] **Fix**: If there are discrepancies, update `catalog.json`.

### 2. Playground Cleanup

- [ ] **Check**: Is `playground/` empty?
- [ ] **Action**: If there are unfinished files, ask the user if they want to save them as "Drafts" or discard them. **Do not delete without confirmation.**
- [ ] **Fix**: If confirmed "done", move to `storage/` or delete.

### 3. Prompt Audit

- [ ] **Check**: Do the new assets in `storage/` have a high-quality `prompt.md`?
- [ ] **Action**: Read the `prompt.md` of any asset created this session.
- [ ] **Fix**: If it's just "Here is the code", **rewrite it**. It needs to be a "Detailed Usage Guide" for an LLM (see `Tour_Guide.md`).

### 4. Context Update

- [ ] **Action**: Update `context/architecture.md` if you introduced any new system-wide patterns (e.g., a new shared CSS library).

## 📝 Handover Note

When running `task_boundary` or `notify_user` to end your shift, briefly summarize:

- "Assets created: [List]"
- "Playground status: [Empty/Occupied]"
- "Pending tasks: [List]"

_Keep the legacy alive._
