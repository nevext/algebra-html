document.addEventListener('DOMContentLoaded', () => {
    // --- Cronograma Button Handler ---
    const btnCronograma = document.getElementById('btnCronograma');
    const cronogramaModal = document.getElementById('cronogramaModal');
    const closeCronogramaModal = document.getElementById('closeCronogramaModal');
    let cronogramaStep = 1;

    if (btnCronograma && cronogramaModal && closeCronogramaModal) {
        btnCronograma.addEventListener('click', (e) => {
            e.preventDefault();
            cronogramaModal.classList.add('active');
            document.body.classList.add('modal-open');
            initCronogramaSlides();
        });

        closeCronogramaModal.addEventListener('click', () => {
            cronogramaModal.classList.remove('active');
            document.body.classList.remove('modal-open');
        });

        cronogramaModal.addEventListener('click', (e) => {
            if (e.target === cronogramaModal) {
                cronogramaModal.classList.remove('active');
                document.body.classList.remove('modal-open');
            }
        });
    }

    function initCronogramaSlides() {
        const container = cronogramaModal.querySelector('.cronograma-container');
        if (!container) return;

        const dotsContainer = container.querySelector('.progress-dots');
        const slides = container.querySelectorAll('.slide');
        const slideCount = slides.length;

        // Initialize dots
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            for (let i = 0; i < slideCount; i++) {
                const dot = document.createElement('div');
                dot.className = 'dot ' + (i === 0 ? 'active' : '');
                dotsContainer.appendChild(dot);
            }
        }

        // Setup navigation
        const prevBtn = container.querySelector('#prevCronograma');
        const nextBtn = container.querySelector('#nextCronograma');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                updateCronogramaSlide(-1);
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                updateCronogramaSlide(1);
            });
        }

        cronogramaStep = 1;
    }

    function updateCronogramaSlide(direction) {
        const container = cronogramaModal.querySelector('.cronograma-container');
        if (!container) return;

        const slides = container.querySelectorAll('.slide');
        const slideCount = slides.length;
        
        cronogramaStep += direction;
        
        if (cronogramaStep < 1) cronogramaStep = 1;
        if (cronogramaStep > slideCount) cronogramaStep = slideCount;

        // Update slides
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            if (index + 1 === cronogramaStep) {
                slide.classList.add('active');
            }
        });

        // Update dots
        const dots = container.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.remove('active');
            if (index + 1 === cronogramaStep) {
                dot.classList.add('active');
            }
        });
    }

    const grid = document.getElementById('iconGrid');
    const icons = [
        'activity', 'airplay', 'alarm-check', 'anchor', 'aperture', 'archive', 'arrow-up-right', 'award',
        'bar-chart', 'battery-charging', 'bell', 'bluetooth', 'book', 'bookmark', 'box', 'briefcase',
        'calendar', 'camera', 'cast', 'check-circle', 'chevron-down', 'chrome', 'clipboard', 'clock',
        'cloud-rain', 'code', 'command', 'compass', 'cpu', 'credit-card', 'database', 'delete',
        'disc', 'download', 'droplet', 'edit', 'external-link', 'eye', 'facebook', 'fast-forward',
        'feather', 'figma', 'file', 'filter', 'flag', 'folder', 'framer', 'gift', 'git-branch',
        'github', 'gitlab', 'globe', 'grid', 'hard-drive', 'hash', 'headphones', 'heart', 'help-circle',
        'home', 'image', 'inbox', 'info', 'instagram', 'italic', 'key', 'layers', 'layout', 'life-buoy',
        'link', 'linkedin', 'list', 'loader', 'lock', 'log-in', 'mail', 'map', 'maximize', 'menu',
        'mic', 'minimize', 'monitor', 'moon', 'mouse-pointer', 'music', 'navigation', 'octagon',
        'package', 'paperclip', 'pause', 'pen-tool', 'percent', 'phone', 'pie-chart', 'play',
        'plus', 'pocket', 'power', 'printer', 'radio', 'refresh-cw', 'repeat', 'rewind', 'rss',
        'save', 'scissors', 'search', 'send', 'settings', 'share', 'shield', 'shopping-bag',
        'shuffle', 'sidebar', 'skip-back', 'skip-forward', 'slack', 'slash', 'sliders', 'smartphone',
        'smile', 'speaker', 'square', 'star', 'stop-circle', 'sun', 'sunrise', 'sunset', 'tablet',
        'tag', 'target', 'terminal', 'thermometer', 'thumbs-down', 'thumbs-up', 'toggle-left',
        'toggle-right', 'tool', 'trash', 'trello', 'trending-down', 'trending-up', 'triangle',
        'truck', 'tv', 'twitch', 'twitter', 'type', 'umbrella', 'underline', 'unlock', 'upload',
        'user', 'video', 'voicemail', 'volume', 'watch', 'wifi', 'wind', 'zap', 'zoom-in'
    ];

    // Duplicate icons to fill the grid (15x10 = 150 icons approx)
    const totalIcons = 150;
    const gridIcons = [];

    for (let i = 0; i < totalIcons; i++) {
        const iconName = icons[Math.floor(Math.random() * icons.length)];
        const iconElement = document.createElement('div');

        // Randomly add the 'active' highlight to one (like the image)
        if (i === 67) { // Arbitrary index for the highlight
            iconElement.classList.add('icon-active');
            iconElement.innerHTML = `<i data-lucide="alert-triangle"></i>`;
        } else {
            iconElement.innerHTML = `<i data-lucide="${iconName}"></i>`;
        }

        grid.appendChild(iconElement);
    }

    // Initialize Lucide again for dynamic icons
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // --- Last Visited Card Tracker ---
    let lastVisitedCard = localStorage.getItem('lastVisitedCard') || null;
    const navButtons = document.querySelectorAll('.etapas-nav li');

    function markLastVisited(cardId) {
        // Remove highlight from previous card
        navButtons.forEach(btn => btn.classList.remove('last-visited'));
        
        // Add highlight to current card
        const currentBtn = document.getElementById(cardId);
        if (currentBtn) {
            currentBtn.classList.add('last-visited');
            localStorage.setItem('lastVisitedCard', cardId);
            lastVisitedCard = cardId;
        }
    }

    // Restore last visited card on page load
    if (lastVisitedCard) {
        const btn = document.getElementById(lastVisitedCard);
        if (btn) {
            btn.classList.add('last-visited');
        }
    }

    // --- Slide Storyteller Logic ---
    let currentStory = null;
    let currentStep = 1;

    function startStory(storyId) {
        const modal = document.querySelector('.modal-overlay.active');
        if (!modal) return;

        modal.querySelectorAll('.contexto-state').forEach(s => s.classList.add('hidden'));

        currentStory = document.getElementById(storyId);
        if (currentStory) {
            currentStory.classList.remove('hidden');
            currentStep = 1;
            initDots(currentStory);
            updateSlides();
        }
    }

    function initDots(story) {
        const dotsContainer = story.querySelector('.progress-dots');
        const slideCount = story.querySelectorAll('.slide').length;
        if (dotsContainer) {
            dotsContainer.innerHTML = '';
            for (let i = 0; i < slideCount; i++) {
                const dot = document.createElement('div');
                dot.className = 'dot';
                if (i === 0) dot.classList.add('active');
                dotsContainer.appendChild(dot);
            }
        }
    }

    function updateSlides() {
        if (!currentStory) return;

        const slides = currentStory.querySelectorAll('.slide');
        const dots = currentStory.querySelectorAll('.dot');
        const btnBack = currentStory.querySelector('.back');
        const btnNext = currentStory.querySelector('.next');
        const btnFinish = currentStory.querySelector('.finish');

        slides.forEach((s, idx) => {
            s.classList.toggle('active', (idx + 1) === currentStep);
        });

        dots.forEach((d, idx) => {
            d.classList.toggle('active', (idx + 1) === currentStep);
        });

        if (btnBack) btnBack.classList.toggle('hidden', currentStep === 1);

        if (btnFinish && btnNext) {
            if (currentStep === slides.length) {
                btnNext.classList.add('hidden');
                btnFinish.classList.remove('hidden');
            } else {
                btnNext.classList.remove('hidden');
                btnFinish.classList.add('hidden');
            }
        }

        if (window.lucide) window.lucide.createIcons();
    }

    document.querySelectorAll('.storyteller').forEach(story => {
        const nextBtn = story.querySelector('.next');
        const backBtn = story.querySelector('.back');
        const finishBtn = story.querySelector('.finish');

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                const slides = currentStory.querySelectorAll('.slide');
                if (currentStep < slides.length) {
                    currentStep++;
                    updateSlides();
                }
            });
        }

        if (backBtn) {
            backBtn.addEventListener('click', () => {
                if (currentStep > 1) {
                    currentStep--;
                    updateSlides();
                }
            });
        }

        if (finishBtn) {
            finishBtn.addEventListener('click', () => {
                const modal = story.closest('.modal-overlay');
                if (modal.id === 'especificosModal') {
                    modal.classList.remove('active');
                    document.body.classList.remove('modal-open');
                } else {
                    showMainMenu();
                }
            });
        }
    });

    function showMainMenu() {
        const modal = document.querySelector('.modal-overlay.active');
        if (!modal) return;
        modal.querySelectorAll('.contexto-state').forEach(s => s.classList.add('hidden'));
        // Find the selection menu for this modal and show it
        const selectMenu = modal.querySelector('[id$="Select"]');
        if (selectMenu) selectMenu.classList.remove('hidden');
    }

    // --- Team Modal Logic ---
    const teamModal = document.getElementById('teamModal');
    const btnEquipe = document.getElementById('btnEquipe');
    const closeTeamModal = document.getElementById('closeTeamModal');

    if (btnEquipe && teamModal && closeTeamModal) {
        btnEquipe.addEventListener('click', () => {
            markLastVisited('btnEquipe');
            teamModal.classList.add('active');
            document.body.classList.add('modal-open');
        });

        closeTeamModal.addEventListener('click', () => {
            teamModal.classList.remove('active');
            document.body.classList.remove('modal-open');
        });

        // Close on outside click
        teamModal.addEventListener('click', (e) => {
            if (e.target === teamModal) {
                teamModal.classList.remove('active');
                document.body.classList.remove('modal-open');
            }
        });
    }

    // --- Study Modal Logic ---
    const studyModal = document.getElementById('studyModal');
    const btnEstudo = document.getElementById('btnEstudo');
    const closeStudyModal = document.getElementById('closeStudyModal');

    if (btnEstudo && studyModal && closeStudyModal) {
        btnEstudo.addEventListener('click', () => {
            markLastVisited('btnEstudo');
            studyModal.classList.add('active');
            document.body.classList.add('modal-open');
        });

        closeStudyModal.addEventListener('click', () => {
            studyModal.classList.remove('active');
            document.body.classList.remove('modal-open');
        });

        studyModal.addEventListener('click', (e) => {
            if (e.target === studyModal) {
                studyModal.classList.remove('active');
                document.body.classList.remove('modal-open');
                clearHighlights();
            }
        });

        // --- Interactive Highlighting ---
        const sections = document.querySelectorAll('.panel-section');

        sections.forEach(section => {
            section.addEventListener('click', () => {
                const targetId = section.getAttribute('data-cite');
                if (!targetId) return;

                const targetElement = document.getElementById('cite-' + targetId.replace('concept-', ''));

                clearHighlights();

                if (targetElement) {
                    targetElement.classList.add('highlighted');
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        });

        function clearHighlights() {
            document.querySelectorAll('.highlighted').forEach(el => {
                el.classList.remove('highlighted');
            });
        }
    }

    // --- Contextualization Modal Logic ---
    const contextoModal = document.getElementById('contextoModal');
    const btnContexto = document.getElementById('btnContexto');
    const closeContextoModal = document.getElementById('closeContextoModal');
    const contextoSelect = document.getElementById('contextoSelect');
    const contextoAcademico = document.getElementById('contextoAcademico');
    const contextoCotidiano = document.getElementById('contextoCotidiano');
    const selectionCards = document.querySelectorAll('.selection-card');

    if (btnContexto) {
        btnContexto.addEventListener('click', () => {
            markLastVisited('btnContexto');
            contextoModal.classList.add('active');
            document.body.classList.add('modal-open');
            showMainMenu();
        });
    }

    if (closeContextoModal) {
        closeContextoModal.addEventListener('click', () => {
            contextoModal.classList.remove('active');
            document.body.classList.remove('modal-open');
        });
    }

    selectionCards.forEach(card => {
        card.addEventListener('click', () => {
            const target = card.getAttribute('data-target');
            if (target === 'academico' || target === 'cotidiano') {
                startStory(target === 'academico' ? 'contextoAcademico' : 'contextoCotidiano');
            } else if (target === 'academico-analise' || target === 'visual-analise') {
                startStory(target === 'academico-analise' ? 'analiseAcademica' : 'analiseVisual');
            } else if (target === 'calculo-manual' || target === 'figjam-analise') {
                // show manual svg or figjam link
                startStory(target === 'calculo-manual' ? 'analiseManual' : 'analiseFigjam');
            }
        });
    });
    const closeGeralModal = document.getElementById('closeGeralModal');

    const especificosModal = document.getElementById('especificosModal');
    const btnEspecificos = document.getElementById('btnEspecificos');
    const closeEspecificosModal = document.getElementById('closeEspecificosModal');

    const propostaModal = document.getElementById('propostaModal');
    const btnProposta = document.getElementById('btnProposta');
    const closePropostaModal = document.getElementById('closePropostaModal');

    const conclusaoModal = document.getElementById('conclusaoModal');
    const btnConclusao = document.getElementById('btnConclusao');
    const closeConclusaoModal = document.getElementById('closeConclusaoModal');

    const sobreModal = document.getElementById('sobreModal');
    const btnSobre = document.getElementById('btnSobre');
    const closeSobreModal = document.getElementById('closeSobreModal');

    const analiseModal = document.getElementById('analiseModal');
    const btnAnalise = document.getElementById('btnAnalise');
    const closeAnaliseModal = document.getElementById('closeAnaliseModal');

    if (btnAnalise && analiseModal && closeAnaliseModal) {
        btnAnalise.addEventListener('click', () => {
            markLastVisited('btnAnalise');
            analiseModal.classList.add('active');
            document.body.classList.add('modal-open');
            // Reset to selection menu
            analiseModal.querySelectorAll('.contexto-state').forEach(s => s.classList.add('hidden'));
            const selectMenu = document.getElementById('analiseSelect');
            if (selectMenu) selectMenu.classList.remove('hidden');
        });
        closeAnaliseModal.addEventListener('click', () => {
            analiseModal.classList.remove('active');
            document.body.classList.remove('modal-open');
        });
        analiseModal.addEventListener('click', (e) => {
            if (e.target === analiseModal) {
                analiseModal.classList.remove('active');
                document.body.classList.remove('modal-open');
            }
        });
    }

    const codeModal = document.getElementById('codeModal');
    const btnCodigo = document.getElementById('btnCodigo');
    const closeCodeModal = document.getElementById('closeCodeModal');
    const pythonSource = document.getElementById('pythonSource');
    const pyStatus = document.getElementById('pyStatus');

    let pyodide = null;

    async function initPythonEnvironment() {
        if (pyodide) return;

        try {
            pyStatus.textContent = 'Inicializando Pyodide...';
            pyodide = await loadPyodide();

            pyStatus.textContent = 'Carregando NumPy...';
            await pyodide.loadPackage('numpy');

            pyStatus.textContent = 'Pronto';
            pyStatus.classList.add('ready');
            loadSourceCode();
        } catch (err) {
            console.error('Erro ao carregar Pyodide:', err);
            pyStatus.textContent = 'Erro ao carregar';
            pyStatus.style.background = '#fee2e2';
            pyStatus.style.color = '#991b1b';
        }
    }

    async function loadSourceCode() {
        try {
            const response = await fetch('assets/caso7.py');
            const code = await response.text();
            pythonSource.textContent = code;
            if (window.Prism) {
                window.Prism.highlightElement(pythonSource);
            }
        } catch (err) {
            pythonSource.textContent = '# Erro ao carregar arquivo assets/caso7.py';
        }
    }


    function setupSimpleModal(btn, modal, close, btnId) {
        if (btn && modal && close) {
            btn.addEventListener('click', () => {
                if (btnId) markLastVisited(btnId);
                modal.classList.add('active');
                document.body.classList.add('modal-open');

                if (modal.id === 'especificosModal') {
                    currentStory = modal;
                    currentStep = 1;
                    initDots(modal);
                    updateSlides();
                }

                if (modal.id === 'codeModal') {
                    initPythonEnvironment();
                }
            });
            close.addEventListener('click', () => {
                modal.classList.remove('active');
                document.body.classList.remove('modal-open');
            });
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    document.body.classList.remove('modal-open');
                }
            });
        }
    }

    setupSimpleModal(btnGeral, geralModal, closeGeralModal, 'btnGeral');
    setupSimpleModal(btnEspecificos, especificosModal, closeEspecificosModal, 'btnEspecificos');
    setupSimpleModal(btnProposta, propostaModal, closePropostaModal, 'btnProposta');
    setupSimpleModal(btnConclusao, conclusaoModal, closeConclusaoModal, 'btnConclusao');
    setupSimpleModal(btnSobre, sobreModal, closeSobreModal, 'btnSobre');
    setupSimpleModal(btnCodigo, codeModal, closeCodeModal, 'btnCodigo');

    // --- Cálculo à Mão Modal Handler ---
    const calculoManualModal = document.getElementById('calculoManualModal');
    const btnCalculoManual = document.getElementById('btnCalculoManual');
    const closeCalculoManualModal = document.getElementById('closeCalculoManualModal');

    if (btnCalculoManual && calculoManualModal && closeCalculoManualModal) {
        btnCalculoManual.addEventListener('click', () => {
            markLastVisited('btnCalculoManual');
            calculoManualModal.classList.add('active');
            document.body.classList.add('modal-open');
            initSVGZoom();
        });

        closeCalculoManualModal.addEventListener('click', () => {
            calculoManualModal.classList.remove('active');
            document.body.classList.remove('modal-open');
        });

        calculoManualModal.addEventListener('click', (e) => {
            if (e.target === calculoManualModal) {
                calculoManualModal.classList.remove('active');
                document.body.classList.remove('modal-open');
            }
        });
    }

    // SVG Zoom functionality
    function initSVGZoom() {
        const svgContainers = document.querySelectorAll('.svg-wrapper');
        
        svgContainers.forEach(container => {
            const svg = container.querySelector('svg');
            if (!svg) return;

            let scale = 1;
            let panning = false;
            let pointX = 0;
            let pointY = 0;
            let start = { x: 0, y: 0 };

            // Load SVG content from file
            const svgId = svg.id;
            if (svgId === 'page1' || svgId === 'page2') {
                loadSVGContent(svgId, svg);
            }

            // Wheel zoom
            container.addEventListener('wheel', (e) => {
                e.preventDefault();
                
                const wheelDelta = e.deltaY > 0 ? -0.1 : 0.1;
                scale = Math.max(0.5, Math.min(5, scale + wheelDelta));
                
                svg.style.transform = `scale(${scale})`;
            });

            // Double-click to reset
            container.addEventListener('dblclick', () => {
                scale = 1;
                svg.style.transform = 'scale(1)';
            });

            // Pan on drag
            container.addEventListener('mousedown', (e) => {
                panning = true;
                start.x = e.clientX - pointX;
                start.y = e.clientY - pointY;
                container.classList.add('zoomed');
            });

            document.addEventListener('mousemove', (e) => {
                if (!panning || scale <= 1) return;
                pointX = e.clientX - start.x;
                pointY = e.clientY - start.y;
                svg.style.transformOrigin = 'center';
                svg.style.cursor = 'grabbing';
            });

            document.addEventListener('mouseup', () => {
                panning = false;
                container.classList.remove('zoomed');
            });

            // Touch support for mobile
            let touchScale = 1;
            container.addEventListener('touchstart', (e) => {
                if (e.touches.length === 2) {
                    touchScale = scale;
                }
            });

            container.addEventListener('touchmove', (e) => {
                if (e.touches.length === 2) {
                    e.preventDefault();
                    const touch1 = e.touches[0];
                    const touch2 = e.touches[1];
                    const distance = Math.hypot(
                        touch2.clientX - touch1.clientX,
                        touch2.clientY - touch1.clientY
                    );
                    
                    const initialDistance = 150; // Approximate initial distance
                    const scaleFactor = distance / initialDistance;
                    scale = Math.max(0.5, Math.min(5, touchScale * scaleFactor));
                    
                    svg.style.transform = `scale(${scale})`;
                }
            });
        });
    }

    // Load SVG content from file
    function loadSVGContent(pageId, svgElement) {
        const fileName = pageId === 'page1' ? 'pagina1.svg' : 'pagina2.svg';
        const filePath = 'assets/img/' + fileName;

        fetch(filePath)
            .then(response => response.text())
            .then(svgContent => {
                // Parse the SVG content
                const parser = new DOMParser();
                const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
                
                if (svgDoc.documentElement.tagName === 'svg') {
                    // Copy the content from fetched SVG to the element
                    const children = Array.from(svgDoc.documentElement.childNodes);
                    children.forEach(child => {
                        if (child.nodeType === 1) { // Element node
                            svgElement.appendChild(child.cloneNode(true));
                        }
                    });
                    
                    // Preserve viewBox
                    const viewBox = svgDoc.documentElement.getAttribute('viewBox');
                    if (viewBox) {
                        svgElement.setAttribute('viewBox', viewBox);
                    }
                }
            })
            .catch(err => {
                console.warn(`Não foi possível carregar ${fileName}:`, err);
                // Add placeholder text
                const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                text.setAttribute('x', '400');
                text.setAttribute('y', '500');
                text.setAttribute('text-anchor', 'middle');
                text.setAttribute('font-size', '24');
                text.setAttribute('fill', '#999');
                text.textContent = `Carregando ${fileName}...`;
                svgElement.appendChild(text);
            });
    }
});
