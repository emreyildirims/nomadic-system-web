// Designed by Mehmet Emre Yıldırım | instagram.com/emreyldms/
document.addEventListener("DOMContentLoaded", () => {
    
    document.body.classList.add('page-entered');

    const currentYearSpan = document.getElementById("current-year");
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    const navLinks = document.querySelectorAll('a[href]:not([href^="#"]):not([target="_blank"])');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if(link.classList.contains('modal-trigger')) return;
            
            e.preventDefault();
            const targetUrl = link.href;
            document.body.classList.remove('page-entered');
            
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 180);
        });
    });

    const scrollProgress = document.getElementById("scroll-progress");
    if(scrollProgress) {
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            scrollProgress.style.width = scrolled + "%";
        });
    }

    const iletisimFormu = document.querySelector("form");
    
    if (iletisimFormu) {
        iletisimFormu.addEventListener("submit", (e) => {
            e.preventDefault();
            alert("Mesajınız doğanın kalbine ulaştı! En kısa sürede sizinle iletişime geçeceğiz.");
            iletisimFormu.reset();
        });
    }

    const hamburger = document.querySelector(".hamburger");
    const nav = document.querySelector("nav");

    if (hamburger && nav) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            nav.classList.toggle("active");
        });

        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("active");
                nav.classList.remove("active");
            });
        });
    }

    const header = document.querySelector("header");
    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -6% 0px',
        threshold: 0.04
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    const langBtns = document.querySelectorAll('.lang-btn');
    const setLanguage = (lang) => {
        document.documentElement.setAttribute('lang', lang);
        localStorage.setItem('nomadic_lang', lang);
        langBtns.forEach(btn => {
            if (btn.dataset.lang === lang) btn.classList.add('active');
            else btn.classList.remove('active');
        });
    };

    const savedLang = localStorage.getItem('nomadic_lang') || 'tr';
    setLanguage(savedLang);

    langBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            setLanguage(btn.dataset.lang);
        });
    });

    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    if(tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                btn.classList.add('active');
                document.getElementById(btn.getAttribute('data-target')).classList.add('active');
            });
        });
    }
});
