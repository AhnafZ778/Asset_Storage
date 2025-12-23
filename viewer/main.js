document.addEventListener("DOMContentLoaded", () => {
  const galleryGrid = document.getElementById("gallery-grid");
  const searchInput = document.getElementById("search-input");
  const modalOverlay = document.getElementById("modal-overlay");
  const closeModalBtn = document.getElementById("close-modal");

  // Modal Elements
  const modalImage = document.getElementById("modal-image");
  const modalTitle = document.getElementById("modal-title");
  const modalDesc = document.getElementById("modal-desc");
  const modalTags = document.getElementById("modal-tags");
  const copyBtn = document.getElementById("copy-btn");
  const viewCodeLink = document.getElementById("view-code-link");
  const copyFeedback = document.getElementById("copy-feedback");

  let assets = [];
  let currentAsset = null;

  // Fetch Catalog
  fetch("catalog.json")
    .then((response) => response.json())
    .then((data) => {
      assets = data;
      renderGallery(assets);
    })
    .catch((err) => console.error("Error loading catalog:", err));

  // Render Gallery
  function renderGallery(items) {
    galleryGrid.innerHTML = "";
    if (items.length === 0) {
      galleryGrid.innerHTML =
        '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No assets found.</p>';
      return;
    }

    items.forEach((asset) => {
      const card = document.createElement("div");
      card.className = "asset-card";
      card.onclick = () => openModal(asset);

      card.innerHTML = `
                <div class="card-preview">
                    <img src="${asset.preview}" alt="${
        asset.name
      }" onerror="this.src='https://placehold.co/400x300/1a1a20/FFF?text=No+Preview'">
                </div>
                <div class="card-info">
                    <div class="card-title">${asset.name}</div>
                    <div class="card-date">${asset.dateCreated}</div>
                    <div class="card-tags">
                        ${asset.tags
                          .map((tag) => `<span class="tag">${tag}</span>`)
                          .join("")}
                    </div>
                </div>
            `;
      galleryGrid.appendChild(card);
    });
  }

  // Modal Logic
  function openModal(asset) {
    currentAsset = asset;
    modalImage.src = asset.preview;
    modalImage.onerror = () => {
      modalImage.src =
        "https://placehold.co/600x400/1a1a20/FFF?text=No+Preview";
    };
    modalTitle.textContent = asset.name;
    modalDesc.textContent = asset.description || "No description provided.";
    modalTags.innerHTML = asset.tags
      .map((tag) => `<span class="tag">${tag}</span>`)
      .join("");
    viewCodeLink.href = asset.path;

    copyFeedback.classList.add("hidden");
    modalOverlay.classList.remove("hidden");
  }

  closeModalBtn.onclick = () => {
    modalOverlay.classList.add("hidden");
    currentAsset = null;
  };

  modalOverlay.onclick = (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.add("hidden");
      currentAsset = null;
    }
  };

  // Search Logic
  searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = assets.filter(
      (asset) =>
        asset.name.toLowerCase().includes(query) ||
        asset.tags.some((tag) => tag.toLowerCase().includes(query))
    );
    renderGallery(filtered);
  });

  // Smart Copy Logic
  copyBtn.addEventListener("click", async () => {
    if (!currentAsset) return;

    try {
      // 1. Fetch the Code
      const codeResponse = await fetch(currentAsset.path);
      const codeText = await codeResponse.text();

      // 2. Fetch the Prompt (Instruction)
      let promptText = "No usage prompt available.";
      if (currentAsset.promptPath) {
        try {
          const promptResponse = await fetch(currentAsset.promptPath);
          if (promptResponse.ok) {
            promptText = await promptResponse.text();
          }
        } catch (e) {
          console.warn("Could not fetch prompt:", e);
        }
      }

      // 3. Construct Payload
      const payload = `*** UI ASSET: ${currentAsset.name} ***\n${promptText}\n\n*** CODE ***\n${codeText}`;

      // 4. Copy to Clipboard
      await navigator.clipboard.writeText(payload);

      // 5. Show Feedback
      copyFeedback.classList.remove("hidden");
      setTimeout(() => {
        copyFeedback.classList.add("hidden");
      }, 2000);
    } catch (err) {
      console.error("Smart Copy failed:", err);
      copyFeedback.textContent = "Error copying files (Check console)";
      copyFeedback.style.color = "#ef4444";
      copyFeedback.classList.remove("hidden");
    }
  });
});
