/* SUMMIT Lighting Systems -- shared site script.
   Every block checks that its elements exist, so one file serves all pages. */

/* ---------- nav ---------- */
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 24);
window.addEventListener('scroll', onScroll, {passive:true});
onScroll();

const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
menuBtn.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
}));

/* ---------- hero crossfade (home only) ---------- */
const slides = document.querySelectorAll('.hero-bg img');
if (slides.length > 1) {
  let slideIdx = 0;
  setInterval(() => {
    slides[slideIdx].classList.remove('active');
    slideIdx = (slideIdx + 1) % slides.length;
    slides[slideIdx].classList.add('active');
  }, 6000);
}

/* ---------- reveal on scroll ---------- */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, {threshold:.12});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ---------- reviews rail ---------- */
const rail = document.getElementById('reviewsRail');
if (rail) {
  const railWrap = document.getElementById('reviewsRailWrap');
  const prevBtn = railWrap.querySelector('.rail-nav.prev');
  const nextBtn = railWrap.querySelector('.rail-nav.next');

  /* Expand / collapse. The toggle only appears when the text is actually
     clamped, so short reviews render without a dangling "Read more". */
  rail.querySelectorAll('.review-card').forEach(card => {
    const btn = card.querySelector('.review-more');
    const text = card.querySelector('.review-text');
    if (!btn || !text) return;
    const isClamped = () => text.scrollHeight > text.clientHeight + 2;
    const sync = () => { if (!card.classList.contains('expanded')) btn.hidden = !isClamped(); };
    sync();
    window.addEventListener('resize', sync, {passive:true});
    /* Re-measure once webfonts land -- line counts shift with the fallback. */
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(sync);
    btn.addEventListener('click', () => {
      const open = card.classList.toggle('expanded');
      btn.setAttribute('aria-expanded', open);
      btn.querySelector('span').textContent = open ? 'Show less' : 'Read more';
      if (!open) { sync(); card.scrollIntoView({block:'nearest', inline:'nearest'}); }
      updateRail();
    });
  });

  /* Arrows and edge fades only show when there is somewhere to scroll. */
  const updateRail = () => {
    const max = rail.scrollWidth - rail.clientWidth;
    const canLeft = rail.scrollLeft > 8;
    const canRight = rail.scrollLeft < max - 8;
    railWrap.classList.toggle('can-left', canLeft);
    railWrap.classList.toggle('can-right', canRight);
    prevBtn.hidden = !canLeft;
    nextBtn.hidden = !canRight;
  };
  const step = () => {
    const card = rail.querySelector('.review-card');
    return card ? card.getBoundingClientRect().width + 18 : rail.clientWidth * .8;
  };
  prevBtn.addEventListener('click', () => rail.scrollBy({left:-step(), behavior:'smooth'}));
  nextBtn.addEventListener('click', () => rail.scrollBy({left:step(), behavior:'smooth'}));
  rail.addEventListener('scroll', updateRail, {passive:true});
  window.addEventListener('resize', updateRail, {passive:true});
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(updateRail);
  updateRail();
}

/* ---------- gallery tabs (gallery page) ---------- */
const igGrid = document.getElementById('igGrid');
if (igGrid) {
  const tabs = [...document.querySelectorAll('.ig-tab')];
  tabs.forEach(tab => tab.addEventListener('click', () => {
    tabs.forEach(t => {
      const on = t === tab;
      t.setAttribute('aria-selected', on);
      document.getElementById(t.getAttribute('aria-controls')).hidden = !on;
    });
  }));
}

/* ---------- install gallery lightbox ----------
   Steps through the photos currently visible. */
if (document.querySelector('.ig-item')) {
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lbImg');
  const lbCap = document.getElementById('lbCap');
  const lbCount = document.getElementById('lbCount');
  const lbClose = lb.querySelector('.lb-close');
  let list = [], idx = 0, lastFocus = null;

  const show = i => {
    idx = (i + list.length) % list.length;
    const el = list[idx];
    lbImg.src = el.dataset.full;
    lbImg.alt = el.querySelector('img').alt;
    lbCap.textContent = el.dataset.cap || '';
    lbCount.textContent = (idx + 1) + ' / ' + list.length;
    /* warm the neighbours so arrowing through feels instant */
    [idx + 1, idx - 1].forEach(n => {
      const nb = list[(n + list.length) % list.length];
      new Image().src = nb.dataset.full;
    });
  };

  const openLb = el => {
    list = [...document.querySelectorAll('.ig-item')].filter(x => !x.hidden);
    lastFocus = document.activeElement;
    show(list.indexOf(el));
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  };

  const closeLb = () => {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    lbImg.src = '';
    if (lastFocus) lastFocus.focus();
  };

  document.querySelectorAll('.ig-item').forEach(el => el.addEventListener('click', () => openLb(el)));
  lbClose.addEventListener('click', closeLb);
  lb.querySelector('.lb-prev').addEventListener('click', () => show(idx - 1));
  lb.querySelector('.lb-next').addEventListener('click', () => show(idx + 1));
  lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });

  document.addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLb();
    else if (e.key === 'ArrowLeft') show(idx - 1);
    else if (e.key === 'ArrowRight') show(idx + 1);
    else if (e.key === 'Tab') { e.preventDefault(); lbClose.focus(); }
  });

  let touchX = 0;
  lb.addEventListener('touchstart', e => { touchX = e.changedTouches[0].clientX; }, {passive:true});
  lb.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 55) show(dx < 0 ? idx + 1 : idx - 1);
  }, {passive:true});
}

/* Meta Pixel: fire only if the pixel actually loaded (ad blockers, noscript) */
const track = (event, params) => { if (window.fbq) fbq('track', event, params); };

/* ---------- quote form (quote page) ---------- */
/* Google Apps Script web app that adds each request to the "Leads" tab
   (source: apps-script/leads-to-sheet.gs). Empty = skip the sheet. */
const LEADS_SHEET_URL = 'https://script.google.com/macros/s/AKfycbxmkOOtbQKLTS_U4aE8Z0i6Zss-ouZPL72mJyjDqZlZzmqz7xfY3PRrU_8xc8QbucnEqQ/exec';
const quoteForm = document.getElementById('quote-form');
if (quoteForm) {
  /* Roofline sizer + internal estimate.
     Pricing model (from internal quote calculator):
     - Lights:  (ft × 1.1) / 25 pcs × $260  = $11.44/ft
     - Track:   (ft × 1.1) / 3 pcs × $11.50 = $4.22/ft
     - Cable:   ft × $1.15                  = $1.15/ft
     - Power supply: $575 per 300 ft run
     - Misc materials: $200
     - Lift (non-ladder access): $725
     Quote = 2 × material cost; shown as a −10% / +15% range.
     The price never appears on the page. It rides along with the submission
     so we can reply fast, and only when the visitor actually used the sizer. */
  const PER_FT = (1.1/25)*260 + (1.1/3)*11.5 + 1.15;
  const PSU = 575, MISC = 200, LIFT = 725;

  const estimateRange = (ft, ladderAccess) => {
    const materials = ft*PER_FT + MISC + Math.ceil(ft/300)*PSU + (ladderAccess ? 0 : LIFT);
    const quote = materials * 2;
    const round100 = v => Math.round(v/100)*100;
    return { low: round100(quote*0.9), high: round100(quote*1.15) };
  };

  const ftRange = document.getElementById('ftRange');
  const ftDisplay = document.getElementById('ftDisplay');
  const estimateField = document.getElementById('estimateField');
  const accessLadder = document.getElementById('accessLadder');
  const fmt = v => '$' + v.toLocaleString('en-CA');
  const accessText = () => accessLadder.checked ? 'ladder accessible' : 'lift required';

  const updateSizer = () => {
    const ft = +ftRange.value;
    ftDisplay.innerHTML = ft + '<small>linear ft</small>';
    const pct = ((ft - ftRange.min) / (ftRange.max - ftRange.min)) * 100;
    ftRange.style.setProperty('--fill', pct + '%');
  };

  /* Meta Pixel: first interaction with the sizer, once per page view */
  let sizerUsed = false;
  const onSizerInput = () => {
    updateSizer();
    if (sizerUsed) return;
    sizerUsed = true;
    if (window.fbq) fbq('trackCustom', 'EstimateUsed');
  };
  ftRange.addEventListener('input', onSizerInput);
  document.querySelectorAll('input[name=access]').forEach(r => r.addEventListener('change', onSizerInput));
  updateSizer();

  /* Referral links (/quote/#refer): open the optional details, focus the referrer field */
  const openReferral = () => {
    document.querySelector('.form-more').open = true;
    setTimeout(() => document.getElementById('referrer').focus({preventScroll:true}), 400);
  };
  if (location.hash === '#refer') openReferral();
  document.querySelectorAll('a[href="#refer"]').forEach(a => a.addEventListener('click', openReferral));

  const quoteResult = document.getElementById('quote-result');
  const submitBtn = quoteForm.querySelector('button[type=submit]');
  const submitLabel = submitBtn.textContent;

  quoteForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true; submitBtn.textContent = 'Sending…';
    /* capture the estimate before the form resets */
    const quoted = sizerUsed ? estimateRange(+ftRange.value, accessLadder.checked) : null;
    estimateField.value = quoted
      ? ftRange.value + ' ft, ' + accessText() + ', estimate ' + fmt(quoted.low) + '–' + fmt(quoted.high)
      : 'Sizer not used';
    try{
      const data = new FormData(quoteForm);
      data.delete('access'); /* already summarised in instant_estimate */
      /* Sheet copy runs alongside the email. Google's reply is opaque (no-cors),
         so the email result alone decides what the visitor sees. */
      if (LEADS_SHEET_URL) {
        fetch(LEADS_SHEET_URL, { method:'POST', mode:'no-cors', keepalive:true, body:new URLSearchParams(data) })
          .catch(() => {});
      }
      const res = await fetch('https://api.web3forms.com/submit', { method:'POST', body:data });
      quoteResult.style.display = 'block';
      if (res.ok){
        quoteResult.style.background = 'rgba(96,190,120,.12)';
        quoteResult.style.border = '1px solid rgba(96,190,120,.4)';
        quoteResult.textContent = "Thanks! Your request is in — we'll send your quote within one business day.";
        track('Lead', quoted
          ? { content_name: 'Quote request form', value: quoted.low, currency: 'CAD' }
          : { content_name: 'Quote request form' });
        quoteForm.reset(); sizerUsed = false; updateSizer();
      } else { throw new Error(); }
    }catch{
      quoteResult.style.display = 'block';
      quoteResult.style.background = 'rgba(226,101,79,.12)';
      quoteResult.style.border = '1px solid rgba(226,101,79,.4)';
      quoteResult.innerHTML = 'Something went wrong — please call or text <a href="tel:+17789096758" style="color:var(--amber-2)">(778) 909-6758</a> instead.';
    }finally{
      submitBtn.disabled = false; submitBtn.textContent = submitLabel;
    }
  });
}

/* ---------- Meta Pixel: call / text / email clicks ---------- */
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="tel:"], a[href^="mailto:"]');
  if (!link || !window.fbq) return;
  fbq('track', 'Contact', {
    content_name: link.getAttribute('href').startsWith('tel:') ? 'Call / Text' : 'Email'
  });
});
