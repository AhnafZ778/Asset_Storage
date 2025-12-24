document.addEventListener('DOMContentLoaded', () => {
    // 1. DOM Elements
    const categoryGrid = document.getElementById('category-list-container');
    const galleryView = document.getElementById('gallery-view-container');
    const galleryGrid = document.getElementById('gallery-grid');
    const backBtn = document.getElementById('back-btn');
    const searchInput = document.getElementById('search-input');
    
    // Modal Elements
    const modalOverlay = document.getElementById('modal-overlay');
    const closeModalBtn = document.getElementById('close-modal');
    const iframeContainer = document.getElementById('iframe-container');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalTags = document.getElementById('modal-tags');
    const variantSelector = document.getElementById('variant-selector');
    const variantOptions = document.getElementById('variant-options');
    const copyBtn = document.getElementById('copy-btn');
    const viewCodeLink = document.getElementById('view-code-link');
    const copyFeedback = document.getElementById('copy-feedback');

    // State
    let assets = [];
    let currentCategory = null;
    let currentAsset = null;
    let currentVariant = null;

    // 2. Fetch Catalog
    fetch('catalog.json')
        .then(response => response.json())
        .then(data => {
            assets = data;
            renderCategoryList(assets);
        })
        .catch(err => console.error('Error loading catalog:', err));

    // 3. Navigation View Logic
    function renderCategoryList(items) {
        galleryView.classList.add('hidden');
        backBtn.classList.add('hidden');
        categoryGrid.classList.remove('hidden');
        categoryGrid.innerHTML = '';

        // Extract Categories
        const categories = {};
        items.forEach(asset => {
            const cat = asset.category || 'Uncategorized';
            if (!categories[cat]) categories[cat] = 0;
            categories[cat]++;
        });

        // Render Cards
        Object.keys(categories).sort().forEach(catName => {
            const card = document.createElement('div');
            card.className = 'category-card';
            card.onclick = () => showCategory(catName);

            card.innerHTML = `
                <div class="category-name">${catName}</div>
                <div class="category-count">${categories[catName]} items</div>
            `;
            categoryGrid.appendChild(card);
        });
    }

    function showCategory(catName) {
        currentCategory = catName;
        categoryGrid.classList.add('hidden');
        galleryView.classList.remove('hidden');
        backBtn.classList.remove('hidden');
        
        const filtered = assets.filter(a => (a.category || 'Uncategorized') === catName);
        renderGallery(filtered);
    }

    backBtn.onclick = () => {
        currentCategory = null;
        searchInput.value = ''; // Reset search
        renderCategoryList(assets);
    };

    // 4. Gallery Logic (Modified)
    function renderGallery(items) {
        galleryGrid.innerHTML = '';
        if (items.length === 0) {
            galleryGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No assets found.</p>';
            return;
        }

        items.forEach(asset => {
            const card = document.createElement('div');
            card.className = 'asset-card';
            // Animation stagger
            card.style.animation = `fadeIn 0.3s ease forwards`; 
            
            card.onclick = () => openModal(asset);

            card.innerHTML = `
                <div class="card-preview">
                    <img src="${asset.preview}" alt="${asset.name}" onerror="this.src='https://placehold.co/400x300/1a1a20/FFF?text=No+Preview'">
                </div>
                <div class="card-info">
                    <div class="card-title">${asset.name}</div>
                    <div class="card-date">${asset.dateCreated}</div>
                    <div class="card-tags">
                        ${asset.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            `;
            galleryGrid.appendChild(card);
        });
    }

    // Search Logic (Global)
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        
        if (query.length > 0) {
            // If searching, switch to simple filtered grid view
            categoryGrid.classList.add('hidden');
            galleryView.classList.remove('hidden');
            backBtn.classList.remove('hidden');

            const filtered = assets.filter(asset => 
                asset.name.toLowerCase().includes(query) || 
                asset.tags.some(tag => tag.toLowerCase().includes(query))
            );
            renderGallery(filtered);
        } else {
            // Restore previous view state
            if (currentCategory) {
               showCategory(currentCategory);
            } else {
               renderCategoryList(assets);
            }
        }
    });

    // 5. Modal Logic (Unchanged but included for scope)
    async function openModal(asset) {
        currentAsset = asset;
        modalTitle.textContent = asset.name;
        modalDesc.textContent = asset.description || "No description provided.";
        modalTags.innerHTML = asset.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
        viewCodeLink.href = asset.path;
        
        handleVariants(asset);
        const defaultVariant = asset.variants ? asset.variants[0] : null;
        loadIframe(asset.path, defaultVariant);

        copyFeedback.classList.add('hidden');
        modalOverlay.classList.remove('hidden');
    }

    function handleVariants(asset) {
        variantOptions.innerHTML = '';
        if (asset.variants && asset.variants.length > 0) {
            variantSelector.classList.remove('hidden');
            currentVariant = asset.variants[0]; 

            asset.variants.forEach((variant, index) => {
                const btn = document.createElement('button');
                btn.className = `variant-btn ${index === 0 ? 'active' : ''}`;
                btn.textContent = variant.name;
                btn.onclick = () => switchVariant(variant, btn);
                variantOptions.appendChild(btn);
            });
        } else {
            variantSelector.classList.add('hidden');
            currentVariant = null;
        }
    }

    function switchVariant(variant, btn) {
        document.querySelectorAll('.variant-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentVariant = variant;

        const iframe = iframeContainer.querySelector('iframe');
        if (iframe && iframe.contentDocument) {
             const body = iframe.contentDocument.body;
             body.className = ''; 
             if (variant.class) {
                body.classList.add(variant.class);
             }
        }
    }

    async function loadIframe(path, initialVariant) {
        iframeContainer.innerHTML = '';
        const iframe = document.createElement('iframe');
        
        try {
            const response = await fetch(path);
            const htmlContent = await response.text();
            
            iframe.srcdoc = htmlContent;
            iframe.onload = () => {
                if (initialVariant && initialVariant.class) {
                    iframe.contentDocument.body.classList.add(initialVariant.class);
                }
            };
            
            iframeContainer.appendChild(iframe);
        } catch (e) {
            iframeContainer.innerHTML = '<div style="color:red; text-align:center; padding:2rem;">Error loading preview. Please ensure local server is running.</div>';
            console.error(e);
        }
    }

    closeModalBtn.onclick = () => {
        modalOverlay.classList.add('hidden');
        currentAsset = null;
        currentVariant = null;
        iframeContainer.innerHTML = ''; 
    };

    modalOverlay.onclick = (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.add('hidden');
            currentAsset = null;
            currentVariant = null;
            iframeContainer.innerHTML = '';
        }
    };

    // Smart Copy Logic
    copyBtn.addEventListener('click', async () => {
        if (!currentAsset) return;

        try {
            const codeFileToCheck = currentAsset.codePath ? currentAsset.codePath : currentAsset.path;
            const response = await fetch(codeFileToCheck);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            let code = await response.text();

            let promptText = "No usage prompt available.";
            let promptPath = currentAsset.promptPath; 

            if (currentVariant && currentVariant.promptPath) {
                promptPath = currentVariant.promptPath;
            }

            if (promptPath) {
                try {
                    const promptResponse = await fetch(promptPath);
                    if (promptResponse.ok) {
                        promptText = await promptResponse.text();
                    }
                } catch (e) {
                    console.warn("Could not fetch prompt:", e);
                }
            }

            const layoutName = currentVariant ? `${currentAsset.name} (${currentVariant.name})` : currentAsset.name;
            const payload = `*** UI ASSET: ${layoutName} ***\n${promptText}\n\n*** CODE ***\n${code}`;

            await navigator.clipboard.writeText(payload);

            copyFeedback.classList.remove('hidden');
            setTimeout(() => {
                copyFeedback.classList.add('hidden');
            }, 2000);

        } catch (err) {
            console.error("Smart Copy failed:", err);
            copyFeedback.textContent = "Error copying files (Check console)";
            copyFeedback.style.color = "#ef4444";
            copyFeedback.classList.remove('hidden');
        }
    });

});
