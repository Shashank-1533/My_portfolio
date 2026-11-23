/* ============================================
   SHASHANK PORTFOLIO — Scripts
   Typing · Scroll Reveal · Nav · Form
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ------------------------------------------
       1. NAVBAR — scroll shrink + glass effect
       ------------------------------------------ */
    const nav = document.querySelector('.site-nav');
    const navAnchors = document.querySelectorAll('.nav-links li a:not(.nav-resume-btn)');
    const sections = document.querySelectorAll('section[id]');

    const onScroll = () => {
        /* glass effect */
        nav.classList.toggle('scrolled', window.scrollY > 60);

        /* active link */
        let currentId = '';
        sections.forEach(sec => {
            if (window.scrollY >= sec.offsetTop - 120) currentId = sec.id;
        });
        navAnchors.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === `#${currentId}`);
        });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();                       // run once on load

    /* ------------------------------------------
       2. MOBILE MENU
       ------------------------------------------ */
    const hamburger = document.querySelector('.hamburger');
    const navMenu   = document.querySelector('.nav-links');

    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('open');
    });

    document.querySelectorAll('.nav-links li a').forEach(link =>
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('open');
        })
    );

    /* ------------------------------------------
       3. CODE EDITOR COMPARE SLIDER
       ------------------------------------------ */
    const segments = [
        { t: '// about_me.js\n', c: 'syn-cmt' },
        { t: 'const ', c: 'syn-kw' },
        { t: 'developer', c: 'syn-var' },
        { t: ' = {\n', c: 'syn-pun' },
        { t: '  name',     c: 'syn-prop' },
        { t: ': ',         c: 'syn-pun' },
        { t: '"Shashank"', c: 'syn-str' },
        { t: ',\n',        c: 'syn-pun' },
        { t: '  role',     c: 'syn-prop' },
        { t: ': ',         c: 'syn-pun' },
        { t: '"Full Stack Developer"', c: 'syn-str' },
        { t: ',\n',        c: 'syn-pun' },
        { t: '  location', c: 'syn-prop' },
        { t: ': ',         c: 'syn-pun' },
        { t: '"Bangalore, India"', c: 'syn-str' },
        { t: ',\n',        c: 'syn-pun' },
        { t: '  skills',   c: 'syn-prop' },
        { t: ': [',        c: 'syn-pun' },
        { t: '"Java"',     c: 'syn-str' },
        { t: ', ',         c: 'syn-pun' },
        { t: '"Spring Boot"', c: 'syn-str' },
        { t: ', ',         c: 'syn-pun' },
        { t: '"MySQL"',    c: 'syn-str' },
        { t: '],\n',       c: 'syn-pun' },
        { t: '  passion',  c: 'syn-prop' },
        { t: ': ',         c: 'syn-pun' },
        { t: '"Building seamless experiences"', c: 'syn-str' },
        { t: ',\n',        c: 'syn-pun' },
        { t: '  hireable', c: 'syn-prop' },
        { t: ': ',         c: 'syn-pun' },
        { t: 'true',       c: 'syn-bool' },
        { t: ',\n',        c: 'syn-pun' },
        { t: '  projects', c: 'syn-prop' },
        { t: ': ',         c: 'syn-pun' },
        { t: '3',          c: 'syn-num' },
        { t: '\n',         c: 'syn-pun' },
        { t: '};',         c: 'syn-pun' },
    ];

    const codeHighlighted = document.getElementById('typing-code-highlighted');
    const codePlain = document.getElementById('typing-code-plain');
    
    if (codeHighlighted && codePlain) {
        let segIdx = 0, charIdx = 0;
        let activeSpanH = null, activeSpanP = null;

        function typeChar() {
            if (segIdx >= segments.length) {
                const curH = document.createElement('span');
                curH.className = 'cursor-blink';
                codeHighlighted.appendChild(curH);
                
                const curP = document.createElement('span');
                curP.className = 'cursor-blink';
                codePlain.appendChild(curP);
                return;
            }

            const seg = segments[segIdx];

            if (charIdx === 0) {
                activeSpanH = document.createElement('span');
                activeSpanH.className = seg.c;
                codeHighlighted.appendChild(activeSpanH);
                
                activeSpanP = document.createElement('span');
                activeSpanP.className = seg.c;
                codePlain.appendChild(activeSpanP);
            }

            activeSpanH.textContent += seg.t[charIdx];
            activeSpanP.textContent += seg.t[charIdx];
            charIdx++;

            if (charIdx >= seg.t.length) {
                segIdx++;
                charIdx = 0;
                setTimeout(typeChar, 28);
            } else {
                const ch = seg.t[charIdx - 1];
                const delay = ch === '\n' ? 110 : (Math.random() * 35 + 22);
                setTimeout(typeChar, delay);
            }
        }

        const heroObs = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setTimeout(typeChar, 700);
                heroObs.disconnect();
            }
        }, { threshold: 0.3 });

        const heroSection = document.getElementById('hero');
        if (heroSection) heroObs.observe(heroSection);
    }

    /* ------------------------------------------
       Compare Slider Logic
       ------------------------------------------ */
    const compareContainer = document.getElementById('hero-compare');
    const compareOverlay = document.getElementById('compare-overlay');
    const compareHandle = document.getElementById('compare-handle');

    if (compareContainer && compareOverlay && compareHandle) {
        let sliderPercentage = 50;
        let isDragging = false;
        let autoplayFrame;
        let startTime = Date.now();
        const duration = 5000;
        let isAutoplaying = true;

        const updateSlider = (percent) => {
            sliderPercentage = Math.max(0, Math.min(100, percent));
            compareOverlay.style.clipPath = `inset(0 ${100 - sliderPercentage}% 0 0)`;
            compareHandle.style.left = `${sliderPercentage}%`;
        };

        const animateAutoplay = () => {
            if (!isAutoplaying) return;
            const elapsed = Date.now() - startTime;
            const progress = (elapsed % (duration * 2)) / duration;
            const percentage = progress <= 1 ? progress * 100 : (2 - progress) * 100;
            
            updateSlider(percentage);
            autoplayFrame = requestAnimationFrame(animateAutoplay);
        };

        autoplayFrame = requestAnimationFrame(animateAutoplay);

        const stopAutoplay = () => {
            isAutoplaying = false;
            cancelAnimationFrame(autoplayFrame);
        };

        const resumeAutoplay = () => {
            isAutoplaying = true;
            startTime = Date.now() - (duration * (sliderPercentage / 100));
            animateAutoplay();
        };

        const handleMove = (clientX) => {
            const rect = compareContainer.getBoundingClientRect();
            const x = clientX - rect.left;
            const percent = (x / rect.width) * 100;
            requestAnimationFrame(() => updateSlider(percent));
        };

        compareContainer.addEventListener('mouseenter', () => {
            stopAutoplay();
        });

        compareContainer.addEventListener('mousemove', (e) => {
            if (!isDragging) {
                handleMove(e.clientX);
            }
        });

        compareContainer.addEventListener('mouseleave', () => {
            sliderPercentage = 50;
            updateSlider(50);
            resumeAutoplay();
        });

        compareContainer.addEventListener('touchstart', (e) => {
            stopAutoplay();
            isDragging = true;
            handleMove(e.touches[0].clientX);
        });

        compareContainer.addEventListener('touchmove', (e) => {
            if (isDragging) {
                handleMove(e.touches[0].clientX);
            }
        });

        compareContainer.addEventListener('touchend', () => {
            isDragging = false;
            sliderPercentage = 50;
            updateSlider(50);
            resumeAutoplay();
        });
    }

    /* ------------------------------------------
       4. SCROLL REVEAL
       ------------------------------------------ */
    const revealEls = document.querySelectorAll('.reveal');

    const revealObs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealEls.forEach(el => revealObs.observe(el));

    /* ------------------------------------------
       5. SMOOTH SCROLL (for anchor links)
       ------------------------------------------ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    /* ------------------------------------------
       6. CONTACT FORM (client-side feedback)
       ------------------------------------------ */
    const form  = document.getElementById('contact-form');
    const toast = document.getElementById('form-toast');

    form?.addEventListener('submit', e => {
        e.preventDefault();

        /* show toast */
        toast.classList.add('show');
        toast.textContent = '✓ Message sent successfully!';

        /* reset */
        setTimeout(() => {
            toast.classList.remove('show');
            form.reset();
        }, 3500);
    });

    /* ------------------------------------------
       7. SKILL ITEM — tilt micro-interaction
       ------------------------------------------ */
    document.querySelectorAll('.skill-item').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 8;
            const y = ((e.clientY - rect.top)  / rect.height - 0.5) * -8;
            card.style.transform = `translateY(-6px) perspective(500px) rotateX(${y}deg) rotateY(${x}deg)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });

    /* ------------------------------------------
       8. PROJECT CARDS — True 3D Floating Effect
          (Aceternity UI precise math + translateZ)
       ------------------------------------------ */
    document.querySelectorAll('.project-card').forEach(card => {
        const image = card.querySelector('.project-image');
        const body = card.querySelector('.project-body');
        const title = card.querySelector('h3');
        const tags = card.querySelector('.project-tags');
        const badge = card.querySelector('.project-badge');
        const datePill = card.querySelector('.project-date-pill');
        const highlights = card.querySelector('.project-highlights');
        const footer = card.querySelector('.project-footer');

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'transform 0.1s ease';
            
            // Pop out elements in 3D space with layered depth
            if (image) image.style.transform = 'translateZ(50px)';
            if (body) body.style.transform = 'translateZ(35px)';
            if (title) title.style.transform = 'translateZ(55px)';
            if (badge) badge.style.transform = 'translateZ(70px)';
            if (datePill) datePill.style.transform = 'translateZ(70px)';
            if (highlights) highlights.style.transform = 'translateZ(35px)';
            if (tags) tags.style.transform = 'translateZ(40px)';
            if (footer) footer.style.transform = 'translateZ(45px)';
        });

        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            // Aceternity logic: distance from center divided by 22
            const x = (e.clientX - rect.left - rect.width / 2) / 22;
            const y = (e.clientY - rect.top - rect.height / 2) / 22;

            card.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
            
            // Spotlight
            card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
            card.style.setProperty('--my', `${e.clientY - rect.top}px`);
        });

        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.5s ease';
            card.style.transform = 'rotateY(0deg) rotateX(0deg)';
            
            // Reset elements
            if (image) image.style.transform = 'translateZ(0px)';
            if (body) body.style.transform = 'translateZ(0px)';
            if (title) title.style.transform = 'translateZ(0px)';
            if (badge) badge.style.transform = 'translateZ(0px)';
            if (datePill) datePill.style.transform = 'translateZ(0px)';
            if (highlights) highlights.style.transform = 'translateZ(0px)';
            if (tags) tags.style.transform = 'translateZ(0px)';
            if (footer) footer.style.transform = 'translateZ(0px)';
        });

        // Click glow effect
        card.addEventListener('mousedown', () => {
            card.classList.add('clicking');
        });
        card.addEventListener('mouseup', () => {
            setTimeout(() => card.classList.remove('clicking'), 200);
        });
        card.addEventListener('mouseleave', () => {
            card.classList.remove('clicking');
        });
    });
});
