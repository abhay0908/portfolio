/* =========================================================
   Kunwar Abhay Singh — Portfolio
   Editorial UI · scripts (v2)
   ========================================================= */

   (() => {
    'use strict';

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine   = window.matchMedia('(pointer: fine)').matches;

    /* ---------- Loader ---------- */
    window.addEventListener('load', () => {
        const loader = document.getElementById('loader');
        if (!loader) return;
        setTimeout(() => loader.classList.add('done'), 1700);
        setTimeout(() => loader.remove(), 2400);
    });

    /* ---------- Theme toggle ---------- */
    const themeToggle = document.getElementById('themeToggle');
    const root = document.documentElement;
    const storedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.setAttribute('data-theme', storedTheme || (systemDark ? 'dark' : 'light'));
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);
        });
    }

    /* ---------- Custom cursor + label ---------- */
    const cursor = document.getElementById('cursor');
    const cursorDot = document.getElementById('cursorDot');
    const cursorLabel = document.getElementById('cursorLabel');
    let mx = -100, my = -100, cx = -100, cy = -100;

    if (cursor && cursorDot && fine && !reduce) {
        document.addEventListener('mousemove', (e) => {
            mx = e.clientX;
            my = e.clientY;
            cursorDot.style.transform = `translate3d(${mx - 3}px, ${my - 3}px, 0)`;
        });

        const tick = () => {
            cx += (mx - cx) * 0.18;
            cy += (my - cy) * 0.18;
            cursor.style.transform = `translate3d(${cx - 18}px, ${cy - 18}px, 0)`;
            requestAnimationFrame(tick);
        };
        tick();

        const hoverables = 'a, button, .bento-card, .exp-item, .tag-cloud span, input, textarea, label';
        document.querySelectorAll(hoverables).forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                const label = el.getAttribute('data-hover');
                if (label && cursorLabel) {
                    cursorLabel.textContent = label;
                    cursor.classList.add('has-label');
                }
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                cursor.classList.remove('has-label');
                if (cursorLabel) cursorLabel.textContent = '';
            });
        });
    }

    /* ---------- Sticky nav + scroll progress + marquee dir ---------- */
    const nav = document.querySelector('.nav');
    const progress = document.getElementById('scrollProgress');
    const marquees = document.querySelectorAll('.marquee-track');
    let lastY = window.scrollY;

    const onScroll = () => {
        const y = window.scrollY;
        if (nav) nav.classList.toggle('sticky', y > 20);
        if (progress) {
            const h = document.documentElement.scrollHeight - window.innerHeight;
            progress.style.width = `${(y / h) * 100}%`;
        }
        // Marquee direction reflects scroll dir
        const dir = y > lastY ? 'normal' : 'reverse';
        marquees.forEach(m => m.style.animationDirection = dir);
        lastY = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* ---------- Mobile menu ---------- */
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            mobileMenu.classList.toggle('open');
            document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
        });
        mobileMenu.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                mobileMenu.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    /* ---------- Smooth scroll for in-page links ---------- */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const id = link.getAttribute('href');
            if (id.length <= 1) return;
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            const top = target.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });

    /* ---------- Reveal on scroll ---------- */
    const reveals = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
        entries.forEach(en => {
            if (en.isIntersecting) {
                en.target.classList.add('in');
                io.unobserve(en.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));

    /* ---------- Split-text reveal for section titles ---------- */
    document.querySelectorAll('.section-title').forEach(title => {
        if (title.dataset.split === 'done') return;
        title.dataset.split = 'done';
        // Split visible text into word spans while preserving inner spans (like .italic)
        const wrap = (node) => {
            const out = document.createDocumentFragment();
            node.childNodes.forEach(child => {
                if (child.nodeType === Node.TEXT_NODE) {
                    child.textContent.split(/(\s+)/).forEach(w => {
                        if (!w) return;
                        if (/^\s+$/.test(w)) {
                            out.appendChild(document.createTextNode(w));
                        } else {
                            const span = document.createElement('span');
                            span.className = 'split-word';
                            span.innerHTML = `<span class="split-inner">${w}</span>`;
                            out.appendChild(span);
                        }
                    });
                } else if (child.nodeType === Node.ELEMENT_NODE) {
                    const clone = child.cloneNode(false);
                    clone.appendChild(wrap(child));
                    clone.classList.add('split-keep');
                    out.appendChild(clone);
                }
            });
            return out;
        };
        const frag = wrap(title);
        title.innerHTML = '';
        title.appendChild(frag);
    });

    const titleObs = new IntersectionObserver((entries) => {
        entries.forEach(en => {
            if (en.isIntersecting) {
                en.target.classList.add('split-in');
                titleObs.unobserve(en.target);
            }
        });
    }, { threshold: 0.2 });
    document.querySelectorAll('.section-title').forEach(t => titleObs.observe(t));

    /* ---------- Animated counters ---------- */
    const counters = document.querySelectorAll('.counter');
    const counterObs = new IntersectionObserver((entries) => {
        entries.forEach(en => {
            if (!en.isIntersecting) return;
            const el = en.target;
            const target = parseInt(el.dataset.target, 10) || 0;
            const duration = 1400;
            const t0 = performance.now();
            const step = (now) => {
                const p = Math.min((now - t0) / duration, 1);
                const eased = 1 - Math.pow(1 - p, 3);
                el.textContent = Math.round(eased * target);
                if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
            counterObs.unobserve(el);
        });
    }, { threshold: 0.4 });
    counters.forEach(c => counterObs.observe(c));

    /* ---------- Live time ---------- */
    const liveTime = document.getElementById('liveTime');
    if (liveTime) {
        const tick = () => {
            try {
                const t = new Date().toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false,
                    timeZone: 'Asia/Kolkata'
                });
                liveTime.textContent = `Lucknow · ${t} IST`;
            } catch (e) {
                liveTime.textContent = 'Lucknow, IN';
            }
        };
        tick();
        setInterval(tick, 1000);
    }

    /* ---------- Project filtering ---------- */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.bento-card');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const f = btn.dataset.filter;
            cards.forEach(card => {
                const match = f === 'all' || card.dataset.category === f;
                card.classList.toggle('hide', !match);
            });
        });
    });

    /* ---------- Bento: spotlight + 3D tilt ---------- */
    cards.forEach(card => {
        const tilt = card.classList.contains('tilt') && fine && !reduce;
        card.addEventListener('mousemove', (e) => {
            const r = card.getBoundingClientRect();
            const px = e.clientX - r.left;
            const py = e.clientY - r.top;
            card.style.setProperty('--mx', `${px}px`);
            card.style.setProperty('--my', `${py}px`);
            if (tilt) {
                const rx = ((py / r.height) - 0.5) * -8;
                const ry = ((px / r.width)  - 0.5) *  8;
                card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
            }
        });
        card.addEventListener('mouseleave', () => {
            if (tilt) card.style.transform = '';
        });
    });

    /* ---------- Magnetic buttons (skip if tilt-card child) ---------- */
    const magnetic = document.querySelectorAll('.btn, .contact-email, .back-top, .theme-toggle');
    magnetic.forEach(el => {
        if (!fine || reduce) return;
        el.addEventListener('mousemove', (e) => {
            const r = el.getBoundingClientRect();
            const x = e.clientX - r.left - r.width / 2;
            const y = e.clientY - r.top - r.height / 2;
            el.style.transform = `translate(${x * 0.18}px, ${y * 0.25}px)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
        });
    });

    /* ---------- Contact form ---------- */
    const form = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const original = btn.innerHTML;
            btn.disabled = true;
            btn.innerHTML = '<span>Sending…</span>';
            formMessage.textContent = '';
            formMessage.className = 'form-message';

            try {
                const res = await fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: { 'Accept': 'application/json' }
                });
                if (!res.ok) throw new Error('failed');
                formMessage.textContent = 'Message sent. I’ll get back to you soon.';
                formMessage.classList.add('success');
                form.reset();
            } catch (err) {
                formMessage.textContent = 'Couldn’t send. Try again or email me directly.';
                formMessage.classList.add('error');
            } finally {
                btn.disabled = false;
                btn.innerHTML = original;
                setTimeout(() => {
                    formMessage.textContent = '';
                    formMessage.className = 'form-message';
                }, 6000);
            }
        });
    }
})();
