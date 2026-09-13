// FORCE SCROLL TO TOP ON PAGE REFRESH
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

gsap.registerPlugin(ScrollTrigger);

// RESPONSIVE NAVIGATION
const navToggle = document.getElementById('nav-toggle');
const siteNav = document.getElementById('site-nav');

function closeMobileNav() {
  if (!navToggle || !siteNav) return;
  navToggle.classList.remove('active');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open navigation');
  siteNav.classList.remove('open');
  document.getElementById('main-header')?.classList.remove('nav-open');
}

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    navToggle.classList.toggle('active', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    document.getElementById('main-header')?.classList.toggle('nav-open', isOpen);
  });

  siteNav.querySelectorAll('a, button').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeMobileNav();
  });

  document.addEventListener('click', (event) => {
    if (window.innerWidth <= 900 && siteNav.classList.contains('open') &&
        !siteNav.contains(event.target) && !navToggle.contains(event.target)) {
      closeMobileNav();
    }
  });
}

// 1. GALAXY STARS GENERATION
const galaxyStarsContainer = document.getElementById('galaxy-stars-container');

for (let i = 0; i < 60; i++) {
  const star = document.createElement('div');
  star.className = 'galaxy-star';
  star.style.left = Math.random() * 100 + '%';
  star.style.top = Math.random() * 100 + '%';
  const size = Math.random() * 2.5 + 1;
  star.style.width = size + 'px';
  star.style.height = size + 'px';
  star.style.animationDelay = (Math.random() * 3) + 's';
  galaxyStarsContainer.appendChild(star);
}

// 2. PROJECT DATA
const projects = [
  {
    title: "Responsive E-Commerce Website",
    tag: "Product & Frontend",
    desc: "A modern, responsive e-commerce storefront for a fashion boutique. Built with modular front-end architecture.",
    stack: ["HTML5", "CSS3", "Vanilla JavaScript"],
    link: "https://mk-dev911.github.io/E-commerce-Shopping-Website/"
  },
  {
    title: "School Website Ecosystem",
    tag: "Web Architecture",
    desc: "A modern, responsive, and fully interactive school website platform.",
    stack: ["HTML5", "CSS3", "JavaScript (ES6+)"],
    link: "https://mk-dev911.github.io/School-Website/"
  },
  {
    title: "Redesigned Namasha Website",
    tag: "HCI & Front-End",
    desc: "A conceptual redesign for standardizing the Iranian video-sharing platform with HCI principles.",
    stack: ["HTML5", "JavaScript", "CSS3", "HCI Principles"],
    link: "https://mk-dev911.github.io/Namasha-Redesign/"
  }
];

// 3. BUILD THE SCENE
const WORLD_WIDTH = 4800;
const vw = () => window.innerWidth;
const vh = () => window.innerHeight;

const layerSky = document.getElementById('layer-sky');
const layerBack = document.getElementById('layer-back');
const layerMid = document.getElementById('layer-mid');
const layerFront = document.getElementById('layer-front');
const character = document.getElementById('character');
const charOriginalParent = character.parentElement;
const spaceship = document.getElementById('spaceship-wrapper');
const parkedUfo = document.getElementById('parked-ufo-land');

for (let i = 0; i < 35; i++) {
  const s = document.createElement('div');
  s.className = 'star';
  s.style.left = Math.random() * 100 + '%';
  s.style.top = Math.random() * 55 + '%';
  s.style.animationDelay = (Math.random() * 3) + 's';
  layerSky.appendChild(s);
}

for (let i = 0; i < 18; i++) {
  const t = document.createElement('div');
  t.className = 'tree-back';
  t.style.left = (i * 180 + Math.random() * 60) + 'px';
  t.style.height = (50 + Math.random() * 20) + 'vh';
  layerBack.appendChild(t);
}

// MUSHROOM HOUSES
const housePositions = [1100, 2100, 3100];
const markerEls = [];

projects.forEach((proj, i) => {
  const x = housePositions[i];

  const house = document.createElement('div');
  house.className = 'mushroom-house';
  house.style.left = x + 'px';
  house.dataset.index = i;

  const hasRealLink = proj.link && proj.link !== '#';

  house.innerHTML = `
    <div class="sign">${proj.title}</div>

    <div class="mh-cap">
      <div class="mh-spots"></div>

      <a
        class="mh-click-hint"
        href="${hasRealLink ? proj.link : '#'}"
        ${hasRealLink ? 'target="_blank" rel="noopener noreferrer"' : ''}
        aria-label="${hasRealLink ? `Open ${proj.title}` : `View ${proj.title} details`}"
      >
        <i data-lucide="external-link"></i>
        <span>View Project</span>
      </a>
    </div>

    <div class="mh-stem">
      <div class="mh-window"></div>
      <div class="mh-door"></div>
    </div>

    <div class="mh-glow-ring"></div>
  `;

  const projectLink = house.querySelector('.mh-click-hint');

  if (projectLink && !hasRealLink) {
    projectLink.addEventListener('click', (event) => {
      event.preventDefault();
      openModal(i);
    });
  }

  layerMid.appendChild(house);

  markerEls.push({
    el: house,
    x,
    sign: house.querySelector('.sign'),
    shown: false
  });
});

// MIDGROUND TREES
for (let i = 0; i < 22; i++) {
  const treeX = 200 + i * 200 + Math.random() * 50;
  const isNearHouse = housePositions.some(hx => Math.abs(hx - treeX) < 180);
  if (isNearHouse) continue;

  const t = document.createElement('div');
  t.className = 'tree-mid';
  t.style.left = treeX + 'px';
  t.innerHTML = `<div class="canopy"></div><div class="trunk"></div>`;
  layerMid.appendChild(t);
}

// FERNS — spread across the full width of the forest path
// (matches the .layer / .path-strip width of 6200px, defined in style.css)
const FERN_TRACK_WIDTH = 6200;
const FERN_SPACING = 58;
const fernCount = Math.ceil(FERN_TRACK_WIDTH / FERN_SPACING) + 4;

for (let i = 0; i < fernCount; i++) {
  const f = document.createElement('div');
  f.className = 'fern';
  f.style.left = (i * FERN_SPACING) + 'px';
  f.style.bottom = '-0.19081vh';
  f.style.transform = 'none';
  layerFront.appendChild(f);
}

for (let i = 0; i < 22; i++) {
  const fl = document.createElement('div');
  fl.className = 'firefly';
  fl.style.left = (i * 150 + Math.random() * 100) + 'px';
  fl.style.bottom = (30 + Math.random() * 200) + 'px';
  fl.style.animationDelay = (Math.random() * 5) + 's';
  layerFront.appendChild(fl);
}

// 4. SPACESHIP BOUNDS SCROLL TRIGGER
let charScreenX = () => vw() * 0.26;

ScrollTrigger.create({
  trigger: "#home-space",
  start: "top top",
  end: "bottom top",
  scrub: true,
  onUpdate: (self) => {
    const p = Math.max(0, Math.min(1, self.progress));

    if (p <= 0.001) {
      gsap.set(spaceship, {
        top: '90px',
        right: '6%',
        left: 'auto',
        transform: 'none'
      });
      spaceship.classList.remove('ship-open');
      return;
    }

    const startX = Math.min(vw() * 0.88, vw() - 120);
    const startY = Math.max(90, vh() * 0.14);

    const targetY = gsap.utils.interpolate(startY, vh() * 0.76, p);
    const targetX = gsap.utils.interpolate(startX, charScreenX() - 30, p);
    
    gsap.set(spaceship, {
      top: `${targetY}px`,
      left: `${targetX}px`,
      right: 'auto',
      transform: `translate(-50%, -50%) scale(${1 - p * 0.12})`
    });

    if (p > 0.75) {
      spaceship.classList.add('ship-open');
    } else {
      spaceship.classList.remove('ship-open');
    }
  }
});

function layoutFrame(progress) {
  const travel = Math.max(WORLD_WIDTH - vw(), 400);

  gsap.set(layerBack, { x: -progress * travel * 0.35 });
  gsap.set(layerMid,  { x: -progress * travel * 1.0 });
  gsap.set(layerFront,{ x: -progress * travel * 1.15 });

  markerEls.forEach(m => {
    const screenX = m.x - progress * travel * 1.0;
    const distance = Math.abs(screenX - charScreenX());
    const isNear = distance < 180;

    // Lift the mushroom cap automatically when the character reaches it.
    m.el.classList.toggle('character-near', isNear);

    if (isNear && !m.shown) {
      m.shown = true;
      gsap.to(m.sign, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: .5,
        ease: "back.out(2)"
      });
    }

    if (!isNear) {
      m.el.classList.remove('character-near');
    }
  });
}

// 5. HORIZONTAL SCROLL & PRECISE FLOWER LANDING
ScrollTrigger.create({
  trigger: "#scroll-spacer",
  start: "top top",
  end: "bottom bottom",
  scrub: 0.6,
  onUpdate: (self) => {
    const p = self.progress;
    layoutFrame(p);
    
    if (p > 0.005) {
      spaceship.style.display = 'none';
      parkedUfo.style.display = 'block';
    } else {
      spaceship.style.display = 'block';
      parkedUfo.style.display = 'none';
    }

    const flowerTarget = document.getElementById('flower-target');

    // A. Landing from UFO
    if (p < 0.04) {
      if (character.parentElement !== charOriginalParent) {
        charOriginalParent.appendChild(character);
      }

      character.classList.remove('in-flower', 'jumping');
      
      const jumpP = p / 0.04;

      gsap.set(character, {
        position: 'absolute',
        top: 'auto',
        bottom: '8.5vh',
        left: '26%',
        x: 0,
        y: gsap.utils.interpolate(-45, 0, jumpP),
        opacity: gsap.utils.interpolate(0, 1, jumpP),
        scale: 1,
        rotation: 0,
        zIndex: 100,
        display: 'block'
      });
    }

    // B. Walking along forest path until end of path (p <= 0.88)
    else if (p <= 0.88) {
      if (character.parentElement !== charOriginalParent) {
        charOriginalParent.appendChild(character);
      }

      character.classList.remove('in-flower', 'jumping');

      gsap.set(character, {
        position: 'absolute',
        top: 'auto',
        bottom: '8.5vh',
        left: '26%',
        x: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        rotation: 0,
        zIndex: 100,
        display: 'block'
      });

      character.classList.add('walking');
      clearTimeout(character._stopTimer);
      character._stopTimer = setTimeout(
        () => character.classList.remove('walking'),
        160
      );
    }

    // C. Arc trajectory landing into the Tulip cup (0.88 < p <= 0.99)
    else if (p > 0.88 && p <= 0.99) {
      if (character.parentElement !== document.body) {
        document.body.appendChild(character);
      }

      const jumpP = (p - 0.88) / 0.11;

      const startX = vw() * 0.26;
      const startY = vh() * 0.78;

      let targetX = startX + 250;
      let targetY = vh() * 0.6;

      if (flowerTarget) {
        const rect = flowerTarget.getBoundingClientRect();
        targetX = rect.left + (rect.width * 0.5) - 45;
        targetY = rect.top - 72;
      }

      const currentX = gsap.utils.interpolate(startX, targetX, jumpP);
      const linearY = gsap.utils.interpolate(startY, targetY, jumpP);
      const arcY = linearY - (Math.sin(jumpP * Math.PI) * 200);

      character.classList.remove('walking');
      character.classList.add('jumping');

      if (jumpP > 0.6) {
        character.classList.add('in-flower');
      } else {
        character.classList.remove('in-flower');
      }

      gsap.set(character, {
        position: 'fixed',
        left: `${currentX}px`,
        top: `${arcY}px`,
        bottom: 'auto',
        x: 0,
        y: 0,
        opacity: 1,
        scale: gsap.utils.interpolate(1, 0.85, jumpP),
        rotation: Math.sin(jumpP * Math.PI) * -15,
        zIndex: 99999,
        display: 'block'
      });
    }

    // D. Landed Seated inside Tulip Cup (p > 0.99)
    else {
      if (flowerTarget && character.parentElement !== flowerTarget) {
        flowerTarget.appendChild(character);
      }

      character.classList.remove('walking', 'jumping');
      character.classList.add('in-flower');

      gsap.set(character, {
        position: 'absolute',
        top: '-72px',
        left: '50%',
        bottom: 'auto',
        x: 0,
        y: 0,
        xPercent: -50,
        yPercent: 0,
        opacity: 1,
        scale: 0.85,
        rotation: 0,
        zIndex: 5,
        display: 'block'
      });
    }
  }
});

layoutFrame(0);

window.addEventListener('resize', () => layoutFrame(0));

// 6. PROJECT MODAL
const overlay = document.getElementById('modal-overlay');
const modalTag = document.getElementById('modal-tag');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalStack = document.getElementById('modal-stack');
const modalLink = document.getElementById('modal-link');

function openModal(i) {
  const p = projects[i];
  modalTag.textContent = p.tag;
  modalTitle.textContent = p.title;
  modalDesc.textContent = p.desc;
  modalLink.href = p.link;
  modalStack.innerHTML = p.stack.map(s => `<span>${s}</span>`).join('');
  overlay.classList.add('open');
}

function closeModal() {
  overlay.classList.remove('open');
}

document.getElementById('modal-close').addEventListener('click', closeModal);

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) closeModal();
});

// 7. RESUME MODAL
const resumeModal = document.getElementById('resume-modal');
const openResumeBtn = document.getElementById('open-resume-btn');
const resumeCloseBtn = document.getElementById('resume-close');

function openResumeModal() {
  if (resumeModal) resumeModal.classList.add('open');
}

function closeResumeModal() {
  if (resumeModal) resumeModal.classList.remove('open');
}

if (openResumeBtn) {
  openResumeBtn.addEventListener('click', openResumeModal);
}

if (resumeCloseBtn) {
  resumeCloseBtn.addEventListener('click', closeResumeModal);
}

if (resumeModal) {
  resumeModal.addEventListener('click', (e) => {
    if (e.target === resumeModal) closeResumeModal();
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
    closeResumeModal();
  }
});

lucide.createIcons();