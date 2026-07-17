// ============ HEADER SCROLL ============
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ============ MOBILE MENU TOGGLE ============
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('nav');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    
    if (navMenu.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });

  // Close mobile menu when a link is clicked
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  });
}

// ============ TAB SWITCHING ============
function switchTab(e, tabId) {
  const parent = e.target.parentElement;
  const grandparent = parent.parentElement;
  
  parent.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  grandparent.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
  
  e.target.classList.add('active');
  document.getElementById(tabId).classList.add('active');
}

function switchWineTab(e, tabId) {
  const parent = e.target.parentElement;
  const grandparent = parent.parentElement;
  
  parent.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  grandparent.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
  
  e.target.classList.add('active');
  document.getElementById(tabId).classList.add('active');
}

// ============ ROTATING TAGLINE ============
const taglines = ["Specialty Coffee", "Natural Wines", "Artisan Pastries"];
let taglineIndex = 0;
const rotatorEl = document.getElementById('rotator-text');

setInterval(() => {
  taglineIndex = (taglineIndex + 1) % taglines.length;
  
  rotatorEl.style.opacity = '0';
  rotatorEl.style.transform = 'translateY(-10px)';
  
  setTimeout(() => {
    rotatorEl.textContent = taglines[taglineIndex];
    rotatorEl.style.opacity = '1';
    rotatorEl.style.transform = 'translateY(0)';
  }, 400);
  
}, 3000);

// ============ INTERSECTION OBSERVER FOR REVEALS ============
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));

// ============ ANIMATED COUNTERS ============
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      let current = 0;
      const increment = target / 50;
      const duration = 30;
      
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          el.textContent = Math.ceil(current);
          setTimeout(updateCounter, duration);
        } else {
          el.textContent = target.toLocaleString();
        }
      };
      
      updateCounter();
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => counterObserver.observe(c));

// ============ SMOOTH SCROLL OFFSET ============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Set min date for reservation form to today
const dateInput = document.getElementById('res-date');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
}
