document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.fade-in');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate-fadeIn');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load

    // Product filtering functionality
    if (document.querySelector('.product-filter')) {
        document.querySelectorAll('.product-filter').forEach(filter => {
            filter.addEventListener('click', function() {
                const category = this.dataset.category;
                document.querySelectorAll('.product-item').forEach(item => {
                    if (category === 'all' || item.dataset.category === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });

                // Update active filter
                document.querySelectorAll('.product-filter').forEach(f => f.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    // Mobile menu toggle
    if (document.querySelector('.mobile-menu-button')) {
        document.querySelector('.mobile-menu-button').addEventListener('click', function() {
            document.querySelector('.mobile-menu').classList.toggle('hidden');
        });
    }
    // Icon replacement
    if (window.feather && typeof feather.replace === 'function') {
        feather.replace();
    }

    // Home hero globe effect (if present)
    if (document.getElementById('hero') && window.VANTA && typeof VANTA.GLOBE === 'function') {
        VANTA.GLOBE({
            el: '#hero',
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: '#2E86DE',
            backgroundColor: '#FF7F50'
        });
    }

    // Shop page customization modal + cart
    if (document.getElementById('customize-modal')) {
        const modal = document.getElementById('customize-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalProductImg = document.getElementById('modal-product');
        const overlayImg = document.getElementById('modal-overlay');
        const modalScale = document.getElementById('modal-scale');
        const modalScaleValue = document.getElementById('modal-scale-value');
        const BASE_OVERLAY_SIZE = 160;

        const previewContainer = document.getElementById('modal-preview');
        const dropZone = document.getElementById('modal-drop');
        const fileInput = document.getElementById('modal-file');
        const notesInput = document.getElementById('modal-notes');
        const qtySelect = document.getElementById('modal-qty');
        const addBtn = document.getElementById('modal-add');
        const closeBtn = document.getElementById('modal-close');
        const colorPicker = document.getElementById('modal-color');
        let selectedColor = '#FF7F50';

        // Helper to apply selected color to shape and overlay border
        const applySelectedColor = () => {
            // Overlay border color
            if (overlayImg) overlayImg.style.borderColor = selectedColor;
            // Update any strokes inside the injected SVG shape
            const shapeEl = document.getElementById('modal-shape');
            if (shapeEl) {
                shapeEl.querySelectorAll('svg [stroke]').forEach(el => el.setAttribute('stroke', selectedColor));
            }
        };

        // Base product demo images (fallback)
        const productImages = {
            magnet: '/magnets.JPG',
            tote: '/tote.JPG',
            bookmark: '/book.JPG',
            'glow-bottle': '/glow.JPG',
            earrings: '/ear.JPG',
            mitt: '/oven.JPG',
            mirror: '/mirror.JPG'
        };
        const prices = {
            magnet: 8.99,
            tote: 14.99,
            bookmark: 5.99,
            'glow-bottle': 12.99,
            earrings: 9.99,
            mitt: 15.99,
            mirror: 6.99
        };
        // Inline SVG shapes for preview (matches customize.html guides)
        const productShapes = {
            magnet: '<svg viewBox="0 0 200 160" class="w-[260px] h-[200px]"><rect x="20" y="20" width="160" height="120" rx="20" ry="20" fill="none" stroke="#2E86DE" stroke-width="4"/></svg>',
            tote: '<svg viewBox="0 0 200 160" class="w-[260px] h-[200px]"><path d="M60 70 C60 40, 140 40, 140 70" fill="none" stroke="#FF7F50" stroke-width="4"/><rect x="40" y="70" width="120" height="70" fill="none" stroke="#FF7F50" stroke-width="4"/></svg>',
            bookmark: '<svg viewBox="0 0 200 160" class="w-[260px] h-[200px]"><rect x="80" y="20" width="40" height="120" rx="8" ry="8" fill="none" stroke="#2E86DE" stroke-width="4"/><circle cx="100" cy="32" r="5" fill="none" stroke="#2E86DE" stroke-width="3"/></svg>',
            'glow-bottle': '<svg viewBox="0 0 200 160" class="w-[260px] h-[200px]"><rect x="80" y="20" width="40" height="20" rx="4" fill="none" stroke="#FF7F50" stroke-width="4"/><path d="M70 40 L130 40 L130 120 C130 130, 70 130, 70 120 Z" fill="none" stroke="#FF7F50" stroke-width="4"/></svg>',
            earrings: '<svg viewBox="0 0 200 160" class="w-[260px] h-[200px]"><path d="M70 40 C70 30, 90 30, 90 40" fill="none" stroke="#2E86DE" stroke-width="4"/><circle cx="90" cy="70" r="18" fill="none" stroke="#2E86DE" stroke-width="4"/><path d="M110 40 C110 30, 130 30, 130 40" fill="none" stroke="#2E86DE" stroke-width="4"/><circle cx="130" cy="70" r="18" fill="none" stroke="#2E86DE" stroke-width="4"/></svg>',
            mitt: '<svg viewBox="0 0 200 160" class="w-[260px] h-[200px]"><path d="M80 50 C80 30, 120 30, 120 50 C140 50, 150 70, 145 90 C140 110, 120 120, 100 120 C80 120, 60 110, 55 90 C50 70, 60 50, 80 50 Z" fill="none" stroke="#FF7F50" stroke-width="4"/></svg>',
            mirror: '<svg viewBox="0 0 200 160" class="w-[260px] h-[200px]"><circle cx="100" cy="90" r="55" fill="none" stroke="#2E86DE" stroke-width="4"/><rect x="92" y="25" width="16" height="18" rx="4" fill="none" stroke="#2E86DE" stroke-width="4"/></svg>'
        };
        let currentProduct = 'magnet';

        // Ensure a holder for the SVG inside preview (before overlay image)
        const shapeHolder = document.createElement('div');
        shapeHolder.id = 'modal-shape';
        shapeHolder.style.position = 'relative';
        shapeHolder.style.display = 'flex';
        shapeHolder.style.alignItems = 'center';
        shapeHolder.style.justifyContent = 'center';
        shapeHolder.style.width = '100%';
        shapeHolder.style.height = '100%';
        if (!document.getElementById('modal-shape')) {
            previewContainer.insertBefore(shapeHolder, overlayImg);
        }

        // Open modal for selected product
        document.querySelectorAll('.customize-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const product = btn.dataset.product;
                currentProduct = product;
                modalTitle.textContent = `Customize ${btn.parentElement.querySelector('h3').textContent}`;

                // Use SVG shape when available; otherwise show demo image
                const shapeEl = document.getElementById('modal-shape') || shapeHolder;
                if (productShapes[product]) {
                    shapeEl.innerHTML = productShapes[product];
                    modalProductImg.classList.add('hidden');
                    // Move overlay inside shape so centering uses the shape box
                    if (overlayImg.parentElement !== shapeEl) shapeEl.appendChild(overlayImg);
                } else {
                    shapeEl.innerHTML = '';
                    modalProductImg.src = productImages[product] || productImages['magnet'];
                    modalProductImg.classList.remove('hidden');
                    // Move overlay back to the main preview when no shape
                    if (overlayImg.parentElement !== previewContainer) previewContainer.appendChild(overlayImg);
                }

                overlayImg.src = '';
                overlayImg.classList.add('hidden');
                notesInput.value = '';
                qtySelect.value = '1';
                modal.classList.remove('hidden');
                modal.classList.add('flex');
                applySelectedColor();
            });
        });

        // Color picker interactions
        if (colorPicker) {
            // Mark default as selected visually
            const setActive = (btn) => {
                colorPicker.querySelectorAll('button').forEach(b => {
                    b.classList.remove('ring-[#2E86DE]');
                    b.classList.remove('ring-2');
                    b.classList.add('ring-transparent');
                });
                btn.classList.remove('ring-transparent');
                btn.classList.add('ring-2');
                btn.classList.add('ring-[#2E86DE]');
            };
            const defaultBtn = colorPicker.querySelector('button[data-color="#FF7F50"]') || colorPicker.querySelector('button');
            if (defaultBtn) setActive(defaultBtn);

            colorPicker.addEventListener('click', (e) => {
                const btn = e.target.closest('button[data-color]');
                if (!btn) return;
                selectedColor = btn.getAttribute('data-color');
                setActive(btn);
                applySelectedColor();
            });
        }


        // Close modal
        const closeModal = () => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        };
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        // Drag & drop upload
        dropZone.addEventListener('click', () => fileInput.click());
        ;['dragenter','dragover','dragleave','drop'].forEach(name => {
            dropZone.addEventListener(name, (e) => { e.preventDefault(); e.stopPropagation(); });
        });
        ;['dragenter','dragover'].forEach(name => dropZone.addEventListener(name, () => dropZone.classList.add('border-[#FF7F50]')));
        ;['dragleave','drop'].forEach(name => dropZone.addEventListener(name, () => dropZone.classList.remove('border-[#FF7F50]')));
        dropZone.addEventListener('drop', (e) => {
            const files = e.dataTransfer.files;
            if (files && files.length) handleFiles(files[0]);
        });
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) handleFiles(file);
        });
        function handleFiles(file) {
            if (!file.type.match('image.*')) { alert('Please upload an image file'); return; }
            const reader = new FileReader();
            reader.onload = function(ev) {
                overlayImg.src = ev.target.result;
                overlayImg.classList.remove('hidden');
                overlayImg.draggable = true;
                overlayImg.style.position = 'absolute';
                overlayImg.style.width = BASE_OVERLAY_SIZE + 'px';
                overlayImg.style.left = '50%';
                overlayImg.style.top = '50%';
                overlayImg.style.transform = 'translate(-50%, -50%)';
                if (modalScale) {
                    modalScale.value = 100;
                    if (modalScaleValue) modalScaleValue.textContent = '100%';
                }
            };
            reader.readAsDataURL(file);
        }

        // Scale slider & wheel
        if (modalScale) {
            const updateScale = () => {
                const scale = parseInt(modalScale.value, 10);
                if (modalScaleValue) modalScaleValue.textContent = scale + '%';
                if (overlayImg && overlayImg.src) {
                    overlayImg.style.width = (BASE_OVERLAY_SIZE * scale / 100) + 'px';
                }
            };
            modalScale.addEventListener('input', updateScale);
            // Allow mouse wheel scaling over the overlay image
            const clamp = (val, min, max) => Math.min(max, Math.max(min, val));
            overlayImg.addEventListener('wheel', (e) => {
                e.preventDefault();
                const step = 5; // match slider step
                const min = parseInt(modalScale.min || '20', 10);
                const max = parseInt(modalScale.max || '200', 10);
                const current = parseInt(modalScale.value, 10);
                const next = clamp(current + (e.deltaY < 0 ? step : -step), min, max);
                if (next !== current) {
                    modalScale.value = next;
                    updateScale();
                }
            });
        }

        // Drag positioning inside preview
        overlayImg.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', 'overlay');
        });
        previewContainer.addEventListener('dragover', (e) => { e.preventDefault(); });
        previewContainer.addEventListener('drop', (e) => {
            e.preventDefault();
            const rect = (overlayImg.parentElement || previewContainer).getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            overlayImg.style.left = (x - overlayImg.width/2) + 'px';
            overlayImg.style.top  = (y - overlayImg.height/2) + 'px';
            overlayImg.style.transform = '';
        });

        // Cart handling
        const cartBtn = document.getElementById('cart-toggle');
        const cartPanel = document.getElementById('cart-summary');
        const cartItemsEl = document.getElementById('cart-items');
        const cartTotalEl = document.getElementById('cart-total');
        const cartClose = document.getElementById('cart-close');
        const continueShop = document.getElementById('continue-shopping');
        let cart = [];
        try {
            const saved = localStorage.getItem('cart');
            if (saved) {
                cart = JSON.parse(saved);
            }
        } catch (e) {
            console.warn('Failed to read saved cart', e);
        }

        const updateCartUI = () => {
            cartItemsEl.innerHTML = '';
            let total = 0;
            cart.forEach((item, idx) => {
                total += item.price * item.qty;
                const row = document.createElement('div');
                row.className = 'flex items-center gap-3';
                row.innerHTML = `
                  <img src="${item.productImg}" class="w-12 h-12 object-contain" />
                  <div class="flex-1">
                    <div class="font-medium text-sm">${item.name}</div>
                    <div class="text-xs text-gray-500">Qty: ${item.qty}</div>
                  </div>
                  <div class="text-sm font-semibold">$${(item.price * item.qty).toFixed(2)}</div>
                `;
                cartItemsEl.appendChild(row);
            });
            cartTotalEl.textContent = `$${total.toFixed(2)}`;
        };

        // Render initial cart if loaded from storage
        try {
            if (cart && Array.isArray(cart)) {
                updateCartUI();
            }
        } catch (e) {}


        addBtn.addEventListener('click', () => {
            const item = {
                name: modalTitle.textContent.replace('Customize ','') || currentProduct,
                product: currentProduct,
                productImg: productImages[currentProduct],
                overlay: overlayImg.src || '',
                notes: notesInput.value || '',
                qty: parseInt(qtySelect.value, 10) || 1,
                price: prices[currentProduct] || 0,
                color: selectedColor
            };
            cart.push(item);
            updateCartUI();
            localStorage.setItem('cart', JSON.stringify(cart));
            cartPanel.classList.remove('hidden');
            // Close the customization modal after adding to cart
            closeModal();
        });

        // Cart toggles
        cartBtn && cartBtn.addEventListener('click', () => {
            cartPanel.classList.toggle('hidden');
        });
        cartClose && cartClose.addEventListener('click', () => cartPanel.classList.add('hidden'));
        continueShop && continueShop.addEventListener('click', () => cartPanel.classList.add('hidden'));

        const cartCheckout = document.getElementById('cart-checkout');
        cartCheckout && cartCheckout.addEventListener('click', () => {
            try { localStorage.setItem('cart', JSON.stringify(cart)); } catch (e) {}
            window.location.href = 'checkout.html';
        });
    }
});