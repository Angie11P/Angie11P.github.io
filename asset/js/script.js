document.addEventListener('DOMContentLoaded', () => {

    // 1. Animación de carga inicial y Navbar Sticky
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Menú Hamburguesa
    const menuIcon = document.getElementById('menu-icon');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (menuIcon) {
        menuIcon.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuIcon.classList.toggle('toggle');
        });
    }

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (menuIcon) menuIcon.classList.remove('toggle');
        });
    });

    // 3. Efecto Typing Dinámico
    const text = "Soy desarrolladora creativa especializada en transformar desafíos en proyectos tecnológicos eficientes y bien estructurados.";
    const typingElement = document.getElementById('typing-text');
    let i = 0;

    function typeWriter() {
        if (!typingElement) return;
        if (i < text.length) {
            typingElement.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    // Retrasar inicio para dar tiempo al render
    setTimeout(typeWriter, 500);


    // 4. Animaciones on-scroll usando Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Si es la sección de habilidades, animar barras
                if (entry.target.id === 'skills') {
                    const progressFills = entry.target.querySelectorAll('.progress-fill');
                    progressFills.forEach(bar => {
                        const width = bar.getAttribute('data-width');
                        bar.style.width = width;
                    });
                }

                // Animaciones específicas para elementos internos
                const slideLeft = entry.target.querySelector('.slide-in-left');
                const slideRight = entry.target.querySelector('.slide-in-right');
                if (slideLeft) slideLeft.classList.add('show');
                if (slideRight) slideRight.classList.add('show');

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.hidden-element').forEach(section => {
        observer.observe(section);
    });

    // 5. Efecto parallax ligero en Hero y seguimiento de pupilas
    const heroBg = document.querySelector('.hero-bg-elements');
    const pupils = document.querySelectorAll('.hero-figure .pupil');
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        const clientX = e.clientX;
        const clientY = e.clientY;
        
        if (heroBg) {
            heroBg.style.transform = `translate(-${x * 20}px, -${y * 20}px)`;
        }

        if (pupils && pupils.length) {
            pupils.forEach(pupil => {
                const eye = pupil.closest('.eye');
                if (!eye) return;
                const rect = eye.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                const dx = clientX - cx;
                const dy = clientY - cy;
                const angle = Math.atan2(dy, dx);
                const max = 8;
                const dist = Math.min(max, Math.hypot(dx, dy));
                const px = Math.cos(angle) * dist;
                const py = Math.sin(angle) * dist;
                pupil.style.transform = `translate(${px}px, ${py}px)`;
            });
        }
    });

    // 6. Botón "Volver arriba"
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 7. Modales de Proyectos
    const modalBtns = document.querySelectorAll('.open-modal');
    const closeBtns = document.querySelectorAll('.close-modal');
    const modals = document.querySelectorAll('.modal');

    modalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('show');
                document.body.style.overflow = 'hidden'; // Prevenir scroll
            }
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modals.forEach(modal => {
                modal.classList.remove('show');
            });
            document.body.style.overflow = 'auto'; // Restaurar scroll
        });
    });

    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', (e) => {
        if (e.target.classList && e.target.classList.contains('modal')) {
            e.target.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
});
