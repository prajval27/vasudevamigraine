// Production-Ready Script - Safe Animations + No Blocking
// Loader always hides, animations are optional/non-blocking

document.addEventListener('DOMContentLoaded', function() {
    // PRIORITY 1: Always hide loader with fallback
    const loader = document.querySelector('.loader');
    const hideLoader = () => {
        if (loader) loader.classList.add('hidden');
    };
    
    // Hide after DOM + 1.5s max
    setTimeout(hideLoader, 1500);
    // Also hide on window load
    window.addEventListener('load', hideLoader);

    // Mobile menu - safe
    document.querySelector('.mobile-menu').addEventListener('click', function(e){
      e.stopPropagation();
      document.querySelector('.nav-links').classList.toggle('show');
    });

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Scroll progress
    window.addEventListener('scroll', () => {
        const progress = document.getElementById('progress');
        if (progress) {
            const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progress.style.width = scrolled + '%';
        }
    });

    // Counters - safe execution
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target') || 0);
            let current = 0;
            const increment = target / 100;
            const update = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current) + (counter.getAttribute('data-suffix') || '');
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target + (counter.getAttribute('data-suffix') || '');
                }
            };
            update();
        });
    }

    // Intersection Observer for counters (non-blocking)
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.matches('.hero-stats, .stats-grid, [class*="animate-counter"]')) {
                    animateCounters();
                }
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.hero-stats, .stats-grid, [class*="animate-counter"]').forEach(el => observer.observe(el));

    // FAQ - safe
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('i');
            if (answer) answer.classList.toggle('active');
            if (icon) {
                icon.style.transform = answer && answer.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
            }
        });
    });

    // Forms - safe
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', e => {
            e.preventDefault();
            // Simple success feedback
            const btn = form.querySelector('button[type="submit"]');
            if (btn) {
                btn.textContent = 'Sent!';
                setTimeout(() => {
                    form.reset();
                    btn.textContent = btn.dataset.originalText || 'Send Message';
                }, 2000);
            }
        });
    });

    // Contact links - safe
    document.querySelectorAll('.contact-item').forEach(item => {
        const icon = item.querySelector('i');
        if (icon) {
            if (icon.classList.contains('fa-phone')) {
                item.style.cursor = 'pointer';
                item.addEventListener('click', () => location.href = 'tel:+919738014024');
            } else if (icon.classList.contains('fa-envelope')) {
                item.style.cursor = 'pointer';
                item.addEventListener('click', () => location.href = 'mailto:prajjumahi777@gmail.com');
            }
        }
    });

    // Premium CSS-only micro animations (no JS dependency)
    // Hover effects already in CSS, enhanced automatically

    // AOS safe init (optional)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out-cubic',
            once: true,
            offset: 50
        });
    }

    console.log('Premium animations loaded safely');
});



