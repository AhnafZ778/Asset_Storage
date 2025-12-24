# 🗺️ Tour Guide: UI Asset Storage System

**Welcome, Agent!**
You have landed in the `Asset_Holder` workspace. This is a specialized environment for creating, refining, and archiving premium UI elements.

## 🏗️ Architecture Overview

The workspace is divided into three main zones:

1.  **`playground/` (The Workshop)**

    - **Purpose**: This is where active development happens.
    - **Rule**: It is ephemeral. Once a component is finalized, it moves to storage.
    - **Files**: Typically contains `index.html` and `style.css` (or a single file) while working.

2.  **`storage/` (The Vault)**

    - **Purpose**: Permanent archive of finalized UI assets.
    - **Structure**: Each asset gets its own folder: `storage/{Asset_Name}/`.
    - **Contents per Asset**:
      - `code.html`: The HTML/CSS/JS code.
      - `preview.png`: A visual snapshot of the component.
      - `meta.json`: Metadata (name, tags, date).
      - `prompt.md`: **Crucial.** Detailed instructions for _other_ LLMs on how to use this component (dependencies, copy-paste instructions).

3.  **`viewer/` (The Gallery)**
    - **Purpose**: A local web app for the user to browse their collection.
    - **Mechanic**: It reads `viewer/catalog.json` to generate the gallery grid.
    - **Magic**: It features a "Smart Copy" button that grabs both the code and the `prompt.md` content for seamless re-use.

## 🚀 Workflow Protocol

### Phase 1: Creation

1.  **Draft**: Create a new file in `playground/`. Design it with **premium aesthetics** (glassmorphism, advanced animations, modern typography).
2.  **Refine**: Iterate with the user until they are "wowed".

### Phase 2: Archival (The "Commit")

When the user says "Save this" or "Finalize this":

1.  **Create Folder**: `mkdir storage/{Descriptive_Name}`.
2.  **Migrate**: Move the code from `playground/` to `storage/{Descriptive_Name}/code.html`.
3.  **Document**:
    - Create `prompt.md`: Explain _how_ to use it.
    - Create `meta.json`: Record details.
4.  **Register**: Add an entry to `viewer/catalog.json`.
    - **Categorization Rule**: Always assign a `category` (e.g., "Cursors", "Navigation", "Cards"). Group similar items dynamically.
5.  **Clean**: Empty `playground/`.

## 🧠 Guiding Principles

- **Visual First**: The "Preview" is the hero. The viewer modal should be 90% visual demo, 10% text.
- **High Fidelity Extraction**: NEVER tone down animations or remove "cool" features during extraction. If an element relies on page scroll, provide a scrollable container. If it relies on particles, keep them all. Complexity is good if it looks premium.
- **Show, Don't Tell**: User knows how these work. Minimize descriptions. Prioritize the _demo_ and the _code_.
- **Premium Aesthetics**: We do not build "basic" UIs. We build "Dribbble-worthy" interfaces.
- **Context is King**: The `prompt.md` is important for the _Copy_ function, but the visual display should be clean.
- **Isolation**: Components should be self-contained as much as possible.

---

_For session cleanup instructions, refer to `Tour_Setter.md`._
