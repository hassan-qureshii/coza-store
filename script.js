document.addEventListener('DOMContentLoaded', () => {

    // ===== ELEMENT SELECTIONS & SETUP =====
    const sidebar = document.querySelector('.sidebar');
    const menuBtn = document.querySelector('.menu-btn');
    const closeSidebarBtn = document.querySelector('.close-sidebar');
    const themeIcons = document.querySelectorAll('.theme-toggle'); // both header and sidebar
    const backToTopBtn = createBackToTopButton(); // Create and append the button

    // Helper to get all elements that need to change in dark mode
    function getAllThemedElements() {
        return {
            header: document.querySelector('header'),
            // >>> NEW: Select the icon inside the menu button
            menuIcon: document.querySelector('.menu-btn i'), 
            // >>> NEW: Select all icons inside the .icons container (excluding the theme toggle, which is handled separately)
            headerIcons: document.querySelectorAll('.icons i:not(.theme-toggle)'), 
            heroTextContainers: document.querySelectorAll('.relative h4'), // Target h4's in the hero
            heroButton: document.querySelector('#home button'), // Target the Shop Now button
            overlayHeadings: document.querySelectorAll('section .overlay h2, section .overlay p'),
            productCards: document.querySelectorAll('.product-card'),
            filterLinks: document.querySelectorAll('.navbar-product a'),
            footer: document.querySelector('footer'),
            footerChildren: document.querySelectorAll('.footer-child'),
            lastDiv: document.querySelector('.last'),
            linksAndText: document.querySelectorAll('a:not(.theme-toggle), p, h1, h2, h3'),
        };
    }

    // ===== DARK/LIGHT MODE LOGIC 🌙/☀️ =====
    const LIGHT_BG = '#fff';
    const DARK_BG = '#2c2c2c'; // Lighter black
    const DARK_HEADER_FOOTER = '#333333';
    const LIGHT_HEADER_BG = '#EAE8E7';

    function saveThemePreference(isDark) {
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    function applyDarkModeStyles(isDark) {
        const elements = getAllThemedElements();
        const headerEl = elements.header;
        const mainElements = document.querySelectorAll('main, body');

        // Body and main background
        document.body.style.backgroundColor = isDark ? DARK_BG : LIGHT_BG;
        mainElements.forEach(el => el.style.backgroundColor = isDark ? DARK_BG : LIGHT_BG);
        document.body.style.color = isDark ? '#f0f0f0' : '#333';

        // Header and Footer background
        if (headerEl) headerEl.style.backgroundColor = isDark ? DARK_HEADER_FOOTER : LIGHT_HEADER_BG;
        if (elements.footer) elements.footer.style.backgroundColor = isDark ? DARK_HEADER_FOOTER : '#f8f8f8';
        if (elements.lastDiv) elements.lastDiv.style.backgroundColor = isDark ? '#444' : '#e5e5e5';

        // Text/Link Color
        elements.linksAndText.forEach(el => {
            el.style.color = isDark ? '#f0f0f0' : '#333';
        });
        
        // --- START OF NEW/UPDATED LOGIC ---

        // NEW: Change Mobile Menu Button Icon Color
        if (elements.menuIcon) {
            elements.menuIcon.style.color = isDark ? '#f0f0f0' : '#000';
        }

        // Change Header Icons Color
        elements.headerIcons.forEach(icon => {
            // Check if the icon is a filled heart (product card hearts are styled elsewhere)
            if (icon.classList.contains('fa-heart') && icon.classList.contains('fa-solid')) {
                return; 
            }
            icon.style.color = isDark ? '#f0f0f0' : '#000';
        });

        // --- END OF NEW/UPDATED LOGIC ---

        // Specific overrides for HERO BANNER TEXT 
        elements.heroTextContainers.forEach(h4 => {
            if (isDark) {
                h4.classList.remove('text-black');
                h4.style.color = '#f0f0f0';
            } else {
                h4.classList.add('text-black');
                h4.style.color = ''; // Clear inline style
            }
        });
        
        // Ensure the button text stays black for contrast
        if(elements.heroButton) {
             elements.heroButton.style.color = '#000';
        }

        elements.overlayHeadings.forEach(el => el.style.color = isDark ? '#f0f0f0' : '#111');
        
        // Theme icon update
        themeIcons.forEach(icon => {
            icon.className = isDark ? 'fa-solid fa-sun theme-toggle' : 'fa-solid fa-moon theme-toggle';
            icon.style.color = isDark ? 'yellow' : 'black';
        });

        // Back to top button style
        backToTopBtn.style.backgroundColor = isDark ? DARK_HEADER_FOOTER : '#f0f0f0';
        backToTopBtn.style.color = isDark ? '#fff' : '#000';
    }

    // Load theme on startup
    const savedTheme = localStorage.getItem('theme');
    const isDarkMode = savedTheme === 'dark'; 
    
    // Set initial state to Light Mode if no preference is saved (first time visit)
    if (savedTheme === null) {
        applyDarkModeStyles(false); 
    } else {
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        }
        applyDarkModeStyles(isDarkMode);
    }


    // Event listener for theme toggle
    themeIcons.forEach(icon => {
        icon.addEventListener('click', () => {
            const isCurrentlyDark = document.body.classList.contains('dark-mode');
            const newIsDark = !isCurrentlyDark;
            document.body.classList.toggle('dark-mode', newIsDark);
            saveThemePreference(newIsDark);
            applyDarkModeStyles(newIsDark);
        });
    });

    // ===== MOBILE SIDEBAR FIX ☰/✖️ (Existing) =====
    if (menuBtn && sidebar) {
        menuBtn.addEventListener('click', () => {
            sidebar.classList.add('open');
            sidebar.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden'; 
        });
    }

    if (closeSidebarBtn && sidebar) {
        closeSidebarBtn.addEventListener('click', () => {
            sidebar.classList.remove('open');
            sidebar.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        });
    }

    // Close sidebar when clicking outside (on the overlay)
    sidebar.addEventListener('click', (e) => {
        if (e.target === sidebar) {
            sidebar.classList.remove('open');
            sidebar.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    });

    // ===== HERO BUTTON SCROLL (Existing) =====
    const heroBtn = document.querySelector('#home button');
    if (heroBtn) {
        heroBtn.addEventListener('click', () => {
            const shopSection = document.getElementById('shop');
            if (shopSection) {
                shopSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // ===== NAVBAR SMOOTH SCROLL (Existing) =====
    function enableSmoothScroll() {
        const links = document.querySelectorAll('.scroll-link');
        links.forEach(link => {
            link.addEventListener('click', e => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                        if (sidebar.classList.contains('open')) {
                            sidebar.classList.remove('open');
                            sidebar.setAttribute('aria-hidden', 'true');
                            document.body.style.overflow = '';
                        }
                    }
                }
            });
        });
    }

    const bannerCards = document.querySelectorAll('section .card');
    bannerCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            alert(`You clicked Banner Card ${index + 1}`);
        });
    });

    function activateProductIcons(root = document) {
        const productIcons = root.querySelectorAll('.product-card i.fa-regular.fa-heart');
        productIcons.forEach(icon => {
            icon.addEventListener('click', (e) => {
                e.stopPropagation();
                icon.classList.toggle('fa-solid'); 
                icon.classList.toggle('fa-regular');
                icon.style.color = icon.classList.contains('fa-solid') ? 'red' : '#999';
            });
        });
    }
    activateProductIcons();

    const loadMoreBtn = document.querySelector('.button button');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            const main = document.querySelector('main');
            if (main) {
                for (let i = 0; i < 2; i++) {
                    const card = document.createElement('div');
                    card.className = 'product-card';
                    card.innerHTML = `
                        <img src="https://via.placeholder.com/270x360" alt="New Product">
                        <h3>New Product ${i + 1}<span><i class="fa-regular fa-heart"></i></span></h3>
                        <p>$99</p>
                    `;
                    main.appendChild(card);
                }
                activateProductIcons(main);
                addHoverZoom(main);
                updateRevealElements();
            }
        });
    }

    const newsletterBtn = document.querySelector('.footer-child button');
    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', () => {
            const emailInput = document.querySelector('.footer-child input');
            if (emailInput && emailInput.value.trim() !== '') {
                alert(`Thanks for subscribing with: ${emailInput.value}`);
                emailInput.value = '';
            } else {
                alert('Please enter your email!');
            }
        });
    }

    let revealElements = [];
    function updateRevealElements() {
        revealElements = Array.from(document.querySelectorAll('.product-card, section .card'));
    }
    updateRevealElements();

    window.addEventListener('scroll', () => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                el.style.opacity = 1;
                el.style.transform = 'translateY(0)';
                el.style.transition = 'all 0.6s ease';
            }
        });
    });

    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = '0 0px 0px rgba(0,0,0,0.1)';
        }
    });

    function createBackToTopButton() {
        const btn = document.createElement('button');
        btn.className = 'back-to-top';
        btn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';
        
        btn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: none;
            cursor: pointer;
            font-size: 1.5rem;
            display: none;
            background-color: #f0f0f0;
            color: #000;
            z-index: 10000;
            transition: opacity 0.3s;
        `;
        document.body.appendChild(btn);

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        window.addEventListener('scroll', () => {
            btn.style.display = window.scrollY > 500 ? 'block' : 'none';
        });
        return btn;
    }


  const filterLinks = document.querySelectorAll('.filter-link');
    filterLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const category = link.textContent.toLowerCase();
            const products = document.querySelectorAll('.product-card');

            filterLinks.forEach(l => l.style.fontWeight = 'normal');
            link.style.fontWeight = 'bold';


            products.forEach(product => {
                const title = product.querySelector('h3').textContent.toLowerCase();
                let shouldShow = false;

                if (category === 'all products') {
                    shouldShow = true;
                } else if (category === 'women' && (title.includes('shirt') || title.includes('jumper') || title.includes('t-shirt') || title.includes('pretty little thing') || title.includes('ruffle shirt'))) {
                    shouldShow = true;
                } else if (category === 'men' && (title.includes('trench coat') || title.includes('converse plimsolls'))) {
                    shouldShow = true;
                } else if (category === 'watches' && title.includes('watch')) {
                    shouldShow = true;
                } else {
                    if (title.includes(category.substring(0, category.length - 1)) || title.includes(category)) {
                         shouldShow = true;
                    }
                }

                product.style.display = shouldShow ? 'block' : 'none';
            });
            window.dispatchEvent(new Event('scroll'));
        });
    });
    function addHoverZoom(root = document) {
        const productCards = root.querySelectorAll('.product-card');
        productCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'scale(1.05)';
                card.style.transition = 'all 0.3s ease';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'scale(1)';
            });
        });
    }
    addHoverZoom();
    enableSmoothScroll();
});

