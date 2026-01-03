// Ouzoud Website Scripts

document.addEventListener('DOMContentLoaded', () => {
    
    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Sticky Header Effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const scrollElements = document.querySelectorAll('.fade-in-scroll');
    scrollElements.forEach(el => observer.observe(el));





    // Mobile Menu Logic
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const closeMenuBtn = document.querySelector('.close-menu');
    const menuOverlay = document.querySelector('.menu-overlay');

    function toggleMenu() {
        navLinks.classList.toggle('active');
        if (menuOverlay) menuOverlay.classList.toggle('active');
        
        // Toggle body scroll
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    }

    if (mobileBtn) {
        mobileBtn.addEventListener('click', toggleMenu);
    }

    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleMenu();
        });
    }

    if (menuOverlay) {
        menuOverlay.addEventListener('click', () => {
            // Close menu if overlay is clicked
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    }

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get Values
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service-type').options[document.getElementById('service-type').selectedIndex].text;
            const date = document.getElementById('booking-date').value;
            const time = document.getElementById('booking-time').value;
            const message = document.getElementById('message').value;

            // Format WhatsApp Message
            const waNumber = "212710282367"; // 0710282367 formatted for intl
            const waMessage = `Salam, bghit nrézervi.%0A%0A👤 *Smiya:* ${name}%0A📱 *Telephone:* ${phone}%0A🏷️ *Service:* ${service}%0A📅 *Tarikh:* ${date || 'Non spécifié'}%0A🕐 *Weqt:* ${time || 'Non spécifié'}%0A💬 *Message:* ${message}`;

            // Redirect
            window.open(`https://wa.me/${waNumber}?text=${waMessage}`, '_blank');
            
            // Optional: Show success feedback on site
            alert('Ghadi ndiwk l WhatsApp bach tkemmel reservation.');
            contactForm.reset();
        });
    }

    // Activity Details Modal Interface
    const modal = document.getElementById('activity-modal');
    const closeModal = document.querySelector('.close-modal');
    const closeModalBtn = document.querySelector('.close-modal-btn');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalTime = document.getElementById('modal-time');
    const modalPrice = document.getElementById('modal-price');

    // Data for activities
    const activityData = {
        'boat': {
            title: 'Tour b Lflouka',
            desc: 'Rkeb f flouka te9lidiya mzow9a b lwerd. L3ewama mahirine ghadi ydiwk htel 7da chalal fin ghadin t7essou b rdad d lma. Tjm3o m3a se7abkom o tmte3ou b manadir khayaliya mn west lma.',
            img: 'gallery2.png', // Reusing gallery image for demo
            time: '30-45 D9i9a',
            price: '20-30 DHs/Wa7ed'
        },
        'monkey': {
            title: 'Chouf L9rouda',
            desc: 'Had l9rouda (Barbary Macaques) home skan asliyin dyal had l mintaqa. Walfine b nass o kayjeiw yaklou l cacahuètes mn ydik. Tssawer m3ahom walakin 7diw 7wayjkom, rahom dkiyin!',
            img: 'gallery1.png',
            time: 'Ila bghiti',
            price: 'Fabor (khless ghir l cacahuètes)'
        },
        'hike': {
            title: 'Tsarya 3la Rjlik',
            desc: 'Hbet m3a triq l mdwra o stamt3 b manadir mokhtalifa dyal chalal mn zawayeya. Kayn droj, o kayn triq trabiya. Labas tkoune labes sbbat mzyan dyal l machi.',
            img: 'hero.png', // Reusing hero image for demo
            time: '1h - 2h',
            price: 'Fabor (Guide: ~100-150 DHs)'
        },
        'about-ouzoud': {
            title: 'Tarikh o Ma3loumat',
            desc: 'Chalalat Ouzoud hiya wa7d mn a3jab lmanadir f lmaghrib. Smyt "Ouzoud" jaya mn lmezighiya o kat3ni "Zzitoun", 7it l mintaqa 3amra b chjar d zzitoun.\n\n\nJoghrafia:\nLma kayti7 mn 3olw 110 mitrou 3la 3 dyal darjat.\n\n\nL7ayat lbariya:\nLmintaqa m3roufa b lqrouda d lmagot (Barbary Macaques) li homa naw3 mohaddad b inqirad, walakin hna 3aychin mzyan m3a nass.',
            img: 'hero.png',
            time: 'Nhar Kamel',
            price: 'Fabor'
        },
        'restaurants': {
            title: 'Qhawi o Restaurants',
            desc: 'Kayn bzaf d les cafes o restaurants 3la toul triq hbat lte7t. Kay9dmou Tajine, Couscous, o Machwiyat.\n\nAmakin M3roufa:\n- Café Restaurant Amal\n- Restaurant Ouzoud\n- Cafe des Cascades\n\nStamt3 b atay mch7er m3a manidar ra2i3.',
            img: 'restaurant_ouzoud.png',
            time: 'We9t Lghda',
            price: '50-100 DHs/Personne'
        },
        'hotels': {
            title: 'Hotels o Riads',
            desc: 'Kayn khayarat l jami3 l mizaniyat, mn hotels bsat l riads fakhra.\n\nAmakin M3roufa:\n- Riad Cascades d\'Ouzoud (Luxe)\n- Hotel Chellal Ouzoud\n- Dar Imazighen\n\nAghlabiya kayofrou ftour beldi.',
            img: 'gallery3.png', // Image generation limit reached, using placeholder
            time: 'Lila ola ktar',
            price: '200-800 DHs/Lila'
        },
        'camping': {
            title: 'Camping',
            desc: 'L 3ocha9 tabi3a, kayn makhayamat (Campings) mjezza b douche o toilette.\n\nAmakin M3roufa:\n- Zebra Camping (Mchhour bzaf)\n- Camping Ouzoud\n\nJib m3ak lkhima dyalek ola kricha tema.',
            img: 'camping_ouzoud.png',
            time: 'Lila',
            price: '50-100 DHs/Lila'
        }
    };

    // Open Modal
    document.querySelectorAll('[data-activity]').forEach(element => {
        element.addEventListener('click', () => {
            const activityId = element.getAttribute('data-activity');
            const data = activityData[activityId];

            if (data) {
                modalTitle.textContent = data.title;
                modalDesc.textContent = data.desc;
                modalImg.src = data.img;
                modalTime.textContent = data.time;
                modalPrice.textContent = data.price;
                
                modal.style.display = 'flex';
            }
        });
    });

    // Close Modal Logic
    const closeStart = () => {
        modal.style.display = 'none';
        modalImg.src = ''; // Clear image
    };

    if (closeModal) closeModal.addEventListener('click', closeStart);
    
    // Close when clicking "Réserver" (Navigate to contact)
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            closeStart();
            // Allow smooth scroll to kick in via css scroll-behavior or other logic
        });
    }

    // Close when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            closeStart();
        }
    });

    // Book Guide Logic
    document.querySelectorAll('.book-guide').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const guideName = btn.getAttribute('data-guide');
            const contactSection = document.querySelector('#contact');
            const messageInput = document.getElementById('message');
            const serviceSelect = document.getElementById('service-type');

            // Scroll to contact
            contactSection.scrollIntoView({ behavior: 'smooth' });

            // Pre-fill form
            setTimeout(() => {
                serviceSelect.value = 'guide';
                messageInput.value = `Salam, bghit nrézervi l'guide ${guideName} bach itlaqa biya Melli newsal Inchaallah.`;
                timelineContent.innerHTML = data.map((item, index) => `
                    <div class="timeline-item" style="animation-delay: ${index * 0.1}s">
                        <div class="time">${item.time}</div>
                        <div class="content">
                            <h3>${item.title}</h3>
                            <p>${item.desc}</p>
                        </div>
                    </div>
                `).join('');
                timelineContent.style.opacity = '1';
            }, 300);
        });
    });

    // Reserve from Modal (Universal Reserve)
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
             const contactSection = document.querySelector('#contact');
             const serviceSelect = document.getElementById('service-type');
             const messageInput = document.getElementById('message');
             const modalTitle = document.getElementById('modal-title').textContent;

             closeStart();
             
             contactSection.scrollIntoView({ behavior: 'smooth' });

             setTimeout(() => {
                // Heuristic selection
                if (modalTitle.includes('Hotel') || modalTitle.includes('Riad')) {
                    serviceSelect.value = 'hotel';
                } else if (modalTitle.includes('Guide')) {
                    serviceSelect.value = 'guide';
                } else {
                    serviceSelect.value = 'activity';
                }

                messageInput.value = `Salam, bghit nrézervi: ${modalTitle}.`;
                messageInput.focus();
            }, 800);
        });
    }

    // FAQ Accordion Logic
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            
            // Toggle active state
            header.classList.toggle('active');

            // specific animation for max-height
            if (header.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = 0;
            }
        });
    });

    // Hero Image Slider
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    const slideInterval = 3000; // 3 seconds

    if (slides.length > 0) {
        setInterval(() => {
            // Remove active class from current slide
            slides[currentSlide].classList.remove('active');
            
            // Move to next slide
            currentSlide = (currentSlide + 1) % slides.length;
            
            // Add active class to new slide
            slides[currentSlide].classList.add('active');
        }, slideInterval);
    }



    // Multi-language Support
    const translations = {
        dar: {
            "nav.about": "3la Lmakan",
            "nav.activities": "Ach Tdir",
            "nav.tips": "Nsa2i7",
            "nav.guides": "Mourchidin",
            "nav.gallery": "Tsawar",
            "nav.contact": "Twasel M3ana",
            "nav.visit": "Zourna",
            "nav.close": "Sdd Menu",
            "hero.title": "Ajamal Lawha",
            "hero.subtitle": "Tabi3iya",
            "hero.desc": "Ktachf sihr dyal Chalalat Ouzoud. Fin l'ard l7emra katla9a m3a lma d'l Atlas f manidar khayali.",
            "hero.cta_p": "Zourna Daba",
            "hero.cta_s": "Ktachf Ktar",
            "about.subtitle": "Jawharat l'Atlas",
            "about.title": "Mandhar Tabi3i Wa3r",
            "about.desc1": "B toul dyal 110 mitrou, Chalalat Ouzoud hia a3la o a7san chalalat f chamal ifri9ya. Jat f village sghir smito Tanaghmeilt f l'Atlas lkbir, had l blassa kat3tik ra7a d lbal b3id 3la sda3 d lmdina.",
            "about.desc2": "Zourna bach tchouf zzitoun ('Ouzoud' kat3ni zzitoun b l'Amazighiya), qaws 9ozah diama kayn, o l9rouda d lmagot (Macaques) li 3aychin tema.",
            "about.btn": "Qra Ktar 3la Ouzoud"
        },
        fr: {
            "nav.about": "À propos",
            "nav.activities": "Activités",
            "nav.tips": "Conseils",
            "nav.guides": "Guides",
            "nav.gallery": "Galerie",
            "nav.contact": "Contact",
            "nav.visit": "Visiter",
            "nav.close": "Fermer",
            "hero.title": "Un Chef-d'œuvre",
            "hero.subtitle": "Naturel",
            "hero.desc": "Découvrez la magie des cascades d'Ouzoud. Là où la terre rouge rencontre les eaux de l'Atlas dans un paysage féerique.",
            "hero.cta_p": "Visitez Maintenant",
            "hero.cta_s": "En Savoir Plus",
            "about.subtitle": "Le Joyau de l'Atlas",
            "about.title": "Un Paysage Époustouflant",
            "about.desc1": "Avec une hauteur de 110 mètres, les cascades d'Ouzoud sont les plus hautes d'Afrique du Nord. Situé dans le petit village de Tanaghmeilt, c'est l'endroit idéal pour échapper au bruit de la ville.",
            "about.desc2": "Venez voir les oliviers ('Ouzoud' signifie olive en berbère), les arcs-en-ciel permanents et les macaques de Barbarie qui y vivent.",
            "about.btn": "En Savoir Plus"
        },
        en: {
            "nav.about": "About",
            "nav.activities": "Activities",
            "nav.tips": "Tips",
            "nav.guides": "Guides",
            "nav.gallery": "Gallery",
            "nav.contact": "Contact",
            "nav.visit": "Visit",
            "nav.close": "Close Menu",
            "hero.title": "Nature's",
            "hero.subtitle": "Masterpiece",
            "hero.desc": "Discover the magic of Ouzoud Waterfalls. Where the red earth meets the waters of the Atlas in a fairytale landscape.",
            "hero.cta_p": "Visit Now",
            "hero.cta_s": "Learn More",
            "about.subtitle": "Jewel of the Atlas",
            "about.title": "Breathtaking Landscape",
            "about.desc1": "At 110 meters high, Ouzoud Falls are the highest and most beautiful in North Africa. Located in the small village of Tanaghmeilt, this place offers peace of mind away from city noise.",
            "about.desc2": "Come see the olive trees ('Ouzoud' means olive in Berber), the permanent rainbows, and the Barbary macaques living there.",
            "about.btn": "Read More"
        }
    };

    const langSwitches = document.querySelectorAll('.lang-switch span');
    
    function setLanguage(lang) {
        console.log('Switching language to:', lang); // Debug Log
        
        // Update active class
        langSwitches.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });

        // Update text
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                el.textContent = translations[lang][key];
            } else {
                console.warn('Missing translation for key:', key);
            }
        });

        // Save preference
        localStorage.setItem('ouzoud-lang', lang);
    }

    // Event Listeners
    langSwitches.forEach(btn => {
        btn.addEventListener('click', () => {
            setLanguage(btn.getAttribute('data-lang'));
        });
    });

    // Check saved preference
    const savedLang = localStorage.getItem('ouzoud-lang') || 'dar';
    setLanguage(savedLang);

});

// ==========================================
// Admin Dashboard & Mock Database Logic
// ==========================================

const MockDB = {
    key: 'ouzoud_reservations',
    authKey: 'ouzoud_u',
    
    // Auth
    register: (username, password) => {
        const users = JSON.parse(localStorage.getItem(MockDB.authKey) || '[]');
        if (users.find(u => u.username === username)) return false; // Exists
        users.push({ username, password });
        localStorage.setItem(MockDB.authKey, JSON.stringify(users));
        return true;
    },

    login: (username, password) => {
        // Default Admin
        if (username === 'admin' && password === 'admin') return true;
        
        const users = JSON.parse(localStorage.getItem(MockDB.authKey) || '[]');
        return !!users.find(u => u.username === username && u.password === password);
    },

    // Reservations
    saveReservation: (data) => {
        const res = JSON.parse(localStorage.getItem(MockDB.key) || '[]');
        data.id = Date.now();
        data.status = 'Pending';
        data.timestamp = new Date().toLocaleString();
        res.unshift(data);
        localStorage.setItem(MockDB.key, JSON.stringify(res));
        return true;
    },

    getAll: () => {
        return JSON.parse(localStorage.getItem(MockDB.key) || '[]');
    },

    updateStatus: (id, status) => {
        const res = JSON.parse(localStorage.getItem(MockDB.key) || '[]');
        const idx = res.findIndex(r => r.id === id);
        if (idx !== -1) {
            res[idx].status = status;
            localStorage.setItem(MockDB.key, JSON.stringify(res));
            return true;
        }
        return false;
    }
};

// Check if we are on Admin Page
if (window.location.pathname.includes('admin.html')) {
    // Check Auth
    if (!sessionStorage.getItem('ouzoud_logged_in')) {
        window.location.href = 'login.html';
    }

    // Render Dashboard
    window.addEventListener('DOMContentLoaded', () => {
        const resList = document.getElementById('res-list');
        const emptyState = document.getElementById('empty-state');
        const totalEl = document.getElementById('total-res');
        const pendingEl = document.getElementById('pending-res');

        function render() {
            const reservations = MockDB.getAll();
            
            // Stats
            if(totalEl) totalEl.textContent = reservations.length;
            if(pendingEl) pendingEl.textContent = reservations.filter(r => r.status === 'Pending').length;

            // List
            if (reservations.length === 0) {
                if(emptyState) emptyState.style.display = 'block';
                if(resList) resList.innerHTML = '';
                return;
            }

            if(emptyState) emptyState.style.display = 'none';
            if(resList) {
                resList.innerHTML = reservations.map(r => `
                    <tr>
                        <td>
                            <strong>${r.name}</strong><br>
                            <small style="opacity: 0.7">${r.phone}</small>
                        </td>
                        <td>${r.service}</td>
                        <td>${r.date || 'N/A'}<br><small>${r.time || ''}</small></td>
                        <td>
                            <span class="status-badge status-${r.status.toLowerCase()}">${r.status}</span>
                        </td>
                        <td>
                            ${r.status === 'Pending' ? `
                            <button class="action-btn btn-accept" onclick="updateRes(${r.id}, 'Accepted')" title="Accept">✅</button>
                            <button class="action-btn btn-refuse" onclick="updateRes(${r.id}, 'Refused')" title="Refuse">❌</button>
                            ` : ''}
                        </td>
                    </tr>
                `).join('');
            }
        }

        render();

        // Expose update function global
        window.updateRes = (id, status) => {
            if(confirm('Wach mti9en?')) {
                MockDB.updateStatus(id, status);
                render();
            }
        };
        
        // Logout
        window.logout = () => {
             sessionStorage.removeItem('ouzoud_logged_in');
             window.location.href = 'login.html';
        }
    });
}

// Check if we are on Login Page
if (window.location.pathname.includes('login.html')) {
    const authForm = document.getElementById('auth-form');
    if (authForm) {
        authForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const u = document.getElementById('auth-user').value;
            const p = document.getElementById('auth-pass').value;
            const isRegistering = document.querySelector('h2').textContent.includes('Inscris-toi');

            if (isRegistering) {
                const pConfirm = document.getElementById('auth-pass-confirm').value;
                if (p !== pConfirm) {
                    alert('Les mots de passe ma mtbqinch.');
                    return;
                }
                
                if (MockDB.register(u, p)) {
                    alert('Mrehba! Daba tqdar tconnecta.');
                    location.reload();
                } else {
                    alert('Had smiya dejà kayna.');
                }
            } else {
                if (MockDB.login(u, p)) {
                    sessionStorage.setItem('ouzoud_logged_in', 'true');
                    window.location.href = 'admin.html';
                } else {
                    alert('Ma3loumat ghalta.');
                }
            }
        });
    }

    const toggleBtn = document.getElementById('toggle-auth');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const h2 = document.querySelector('h2');
            const btn = document.querySelector('button');
            const link = document.getElementById('toggle-auth');
            const confirmGroup = document.getElementById('confirm-pass-group');
            const confirmInput = document.getElementById('auth-pass-confirm');
            
            if (h2.textContent.includes('Marhba')) {
                h2.textContent = 'Inscris-toi 📝';
                btn.textContent = 'Sjel (Register)';
                link.textContent = '3ndek compt? Dkhol hna';
                confirmGroup.style.display = 'block';
                confirmInput.required = true;
            } else {
                h2.textContent = 'Marhba b Admin 👨‍💻';
                btn.textContent = 'Dkhol (Login)';
                link.textContent = 'Inscris-toi hna';
                confirmGroup.style.display = 'none';
                confirmInput.required = false;
            }
        });
    }
}

// Hook into Contact Form on Index to Save Data
const mainContactForm = document.getElementById('contact-form');
if (mainContactForm) {
    // We add a listener to capture the data before the redirect happens (or in parallel)
    mainContactForm.addEventListener('submit', () => {
         const data = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            service: document.getElementById('service-type').options[document.getElementById('service-type').selectedIndex].text,
            date: document.getElementById('booking-date').value,
            time: document.getElementById('booking-time').value,
            message: document.getElementById('message').value
         };
         MockDB.saveReservation(data);
    });
}
