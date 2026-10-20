/**
 * ROYAL RAJASTHANI WEDDING INVITATION - APPLICATION JAVASCRIPT
 * Couples: Monika & Harshitji • Nikita & Shivamji
 * Date: 01 December 2026 | THE GRAND BAHUBALI RESORT, BALOTRA
 * Enhanced for all Android (Samsung, Oppo, Vivo, OnePlus, Nothing) & iPhone models
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const envelopeStage = document.getElementById('envelope-stage');
  const waxSeal = document.getElementById('wax-seal');
  const tapInstruction = document.getElementById('tap-instruction');
  const enterBtn = document.getElementById('btn-enter-wedding');
  const weddingMainSite = document.getElementById('wedding-main-site');
  const reopenBtn = document.getElementById('btn-reopen-envelope');
  const toastMsg = document.getElementById('toast-msg');

  // State
  let isEnvelopeOpen = false;

  /* ==========================================================================
     1. ENVELOPE INTERACTION (Wax Seal & 3D Opening with Touch Optimization)
     ========================================================================== */
  function openEnvelope() {
    if (isEnvelopeOpen) return;
    isEnvelopeOpen = true;

    envelopeStage.classList.add('is-open');
    document.querySelector('.envelope-screen').classList.add('opened');

    showToast('✨ Envelope Opened! Welcome to our celebration ✨');
  }

  function closeEnvelope() {
    isEnvelopeOpen = false;
    envelopeStage.classList.remove('is-open');
    document.querySelector('.envelope-screen').classList.remove('opened');
    weddingMainSite.classList.remove('is-revealed');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Envelope closed');
  }

  // Support both click and instant touch for mobile
  if (waxSeal) {
    waxSeal.addEventListener('click', (e) => {
      e.stopPropagation();
      openEnvelope();
    });
    waxSeal.addEventListener('touchstart', (e) => {
      e.stopPropagation();
      openEnvelope();
    }, { passive: true });
  }

  if (envelopeStage) {
    envelopeStage.addEventListener('click', () => {
      if (!isEnvelopeOpen) {
        openEnvelope();
      }
    });
  }

  if (tapInstruction) {
    tapInstruction.addEventListener('click', openEnvelope);
    tapInstruction.addEventListener('touchstart', openEnvelope, { passive: true });
  }

  if (enterBtn) {
    enterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      weddingMainSite.classList.add('is-revealed');
      
      const target = document.getElementById('hero-section');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  if (reopenBtn) {
    reopenBtn.addEventListener('click', () => {
      closeEnvelope();
    });
  }

  /* ==========================================================================
     2. GENTLE, SUBTLE FLOATING PETALS CANVAS (Retina & High-DPI Optimized)
     ========================================================================== */
  const canvas = document.getElementById('petals-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let petals = [];
    const petalCount = 10; // Toned down: subtle & gentle

    function resizeCanvas() {
      // Scale for Retina & AMOLED displays for maximum crispness
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);
    }

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('orientationchange', resizeCanvas);
    resizeCanvas();

    class Petal {
      constructor() {
        this.reset();
        this.y = Math.random() * window.innerHeight;
      }

      reset() {
        this.x = Math.random() * window.innerWidth;
        this.y = -20;
        this.size = Math.random() * 8 + 6;
        this.speedY = Math.random() * 0.7 + 0.35;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.angle = Math.random() * 360;
        this.rotationSpeed = (Math.random() - 0.5) * 1.2;
        this.flipSpeed = Math.random() * 0.02 + 0.008;
        this.flip = 0;
        this.opacity = Math.random() * 0.25 + 0.35;

        const type = Math.random();
        if (type < 0.6) {
          // Delicate rose petal
          this.color1 = '#a3203c';
          this.color2 = '#5c0c1e';
        } else {
          // Warm marigold / golden petal
          this.color1 = '#f5b041';
          this.color2 = '#c68a1a';
        }
      }

      update() {
        this.y += this.speedY;
        this.x += Math.sin(this.y * 0.012) * 0.5 + this.speedX;
        this.angle += this.rotationSpeed;
        this.flip += this.flipSpeed;

        if (this.y > window.innerHeight + 20 || this.x < -30 || this.x > window.innerWidth + 30) {
          this.reset();
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.angle * Math.PI) / 180);
        ctx.scale(1, Math.cos(this.flip));
        ctx.globalAlpha = this.opacity;

        const grad = ctx.createLinearGradient(-this.size / 2, -this.size / 2, this.size / 2, this.size / 2);
        grad.addColorStop(0, this.color1);
        grad.addColorStop(1, this.color2);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(0, -this.size);
        ctx.bezierCurveTo(this.size * 0.7, -this.size * 0.7, this.size * 0.8, this.size * 0.3, 0, this.size);
        ctx.bezierCurveTo(-this.size * 0.8, this.size * 0.3, -this.size * 0.7, -this.size * 0.7, 0, -this.size);
        ctx.fill();

        ctx.restore();
      }
    }

    for (let i = 0; i < petalCount; i++) {
      petals.push(new Petal());
    }

    function animatePetals() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (let p of petals) {
        p.update();
        p.draw();
      }
      requestAnimationFrame(animatePetals);
    }
    animatePetals();
  }

  /* ==========================================================================
     3. LIVE ROYAL COUNTDOWN CLOCK (Target: 01 Dec 2026, 09:00 AM IST)
     ========================================================================== */
  const weddingDate = new Date('2026-12-01T09:00:00+05:30').getTime();

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance > 0) {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
      if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    } else {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minutesEl) minutesEl.textContent = '00';
      if (secondsEl) secondsEl.textContent = '00';
    }
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  /* ==========================================================================
     4. CALENDAR INTEGRATION
     ========================================================================== */
  const btnGoogleCal = document.getElementById('btn-google-calendar');
  const btnIcal = document.getElementById('btn-ical-download');

  const calDetails = {
    title: 'Wedding of Monika & Harshitji, Nikita & Shivamji',
    start: '20261130T123000Z',
    end: '20261202T163000Z',
    location: 'THE GRAND BAHUBALI RESORT, BALOTRA, Rajasthan 344022',
    description: 'Together with our families, we cordially invite you to celebrate the auspicious wedding of our beloved daughters Monika & Harshitji and Nikita & Shivamji at THE GREAT BAHUBALI RESORT, BALOTRA.'
  };

  if (btnGoogleCal) {
    btnGoogleCal.addEventListener('click', () => {
      const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(calDetails.title)}&dates=${calDetails.start}/${calDetails.end}&details=${encodeURIComponent(calDetails.description)}&location=${encodeURIComponent(calDetails.location)}`;
      window.open(gcalUrl, '_blank');
    });
  }

  if (btnIcal) {
    btnIcal.addEventListener('click', () => {
      const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Royal Wedding Invitation//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        `SUMMARY:${calDetails.title}`,
        `DESCRIPTION:${calDetails.description}`,
        `LOCATION:${calDetails.location}`,
        `DTSTART:${calDetails.start}`,
        `DTEND:${calDetails.end}`,
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', 'Monika_Harshit_Nikita_Shivam_Wedding.ics');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast('📅 Calendar invite downloaded');
    });
  }

  /* ==========================================================================
     5. STORY TABS SWITCHER
     ========================================================================== */
  const tabBtns = document.querySelectorAll('.story-tab-btn');
  const tabContents = document.querySelectorAll('.story-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetId = btn.getAttribute('data-tab');
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  /* ==========================================================================
     6. MOBILE BOTTOM DOCK INTERSECTION OBSERVER (Active item highlight)
     ========================================================================== */
  const dockItems = document.querySelectorAll('.dock-item');
  const sectionsToObserve = ['hero-section', 'countdown-section', 'story-section', 'karyakram-section', 'venue-section', 'share-section'];

  if ('IntersectionObserver' in window && dockItems.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          dockItems.forEach(item => {
            if (item.getAttribute('href') === `#${id}`) {
              item.classList.add('active');
            } else {
              item.classList.remove('active');
            }
          });
        }
      });
    }, { threshold: 0.35 });

    sectionsToObserve.forEach(secId => {
      const el = document.getElementById(secId);
      if (el) observer.observe(el);
    });
  }

  /* ==========================================================================
     7. SHARING & UTILITIES
     ========================================================================== */
  const btnShareWhatsapp = document.getElementById('btn-share-whatsapp');
  const btnCopyLink = document.getElementById('btn-copy-link');

  const shareText = `🕊️ *Shubh Vivah Nimantran* 🕊️\n\n` +
    `Together with our families, we cordially invite you to celebrate the auspicious wedding of our beloved daughters:\n\n` +
    `✨ *Monika & Harshitji*\n` +
    `✨ *Nikita & Shivamji*\n\n` +
    `📅 *Wedding Date:* 02 December 2026\n` +
    `📍 *Venue:* THE GRAND BAHUBALI RESORT, BALOTRA\n\n` +
    `Tap here to view the complete digital invitation & मांगलिक कार्यक्रम:\n` +
    window.location.href;

  if (btnShareWhatsapp) {
    btnShareWhatsapp.addEventListener('click', () => {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
    });
  }

  if (btnCopyLink) {
    btnCopyLink.addEventListener('click', () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href).then(() => {
          showToast('🔗 Invitation link copied to clipboard!');
        }).catch(() => {
          fallbackCopyText(window.location.href);
        });
      } else {
        fallbackCopyText(window.location.href);
      }
    });
  }

  function fallbackCopyText(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast('🔗 Invitation link copied to clipboard!');
  }

  function showToast(msg) {
    if (!toastMsg) return;
    toastMsg.textContent = msg;
    toastMsg.classList.add('show');
    setTimeout(() => {
      toastMsg.classList.remove('show');
    }, 3800);
  }
});
