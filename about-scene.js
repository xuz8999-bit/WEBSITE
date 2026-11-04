/* ABOUT illustration drawn from the supplied third-page reference. */
window.BUREAU_SCENES.about = `
<main class="scene about" aria-label="About the Convenience Tax Bureau">
  <svg class="illustration" viewBox="0 0 600 338" aria-hidden="true">
    <defs><linearGradient id="about-paper" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffdf56"/><stop offset="1" stop-color="#f4f4f2"/></linearGradient></defs>
    <path fill="#f4f4f2" d="M0 0h600v338H0z"/>
    <path fill="#fff" d="M0 0h600v49H0z"/>
    <path fill="url(#about-paper)" d="M218 50h368v222H218z"/>
    <path fill="#d3bfd9" d="M9 26h167v312H9z"/>
    <path fill="#fff1a9" d="M15 34h72v35H15zm0 45h72v38H15zm0 49h72v35H15zm0 47h72v36H15z"/>
    <path fill="#fff8c5" d="M97 35h72v32H97zm0 44h72v32H97zm0 44h72v32H97zm0 44h72v32H97z"/>
    <path fill="#ffd42a" d="M0 106h75v232H0z"/>
    <path fill="#df86cc" d="M10 155h46v47H10zm0 71h46v47H10z"/>
    <path fill="#fff3ae" d="M10 203h46v21H10zm0 71h46v24H10z"/>
    <path fill="#5798e6" d="M75 244h174v94H75z"/>
    <path fill="#dc4b2e" d="m75 220 205-30 5 26-210 32z"/>
    <path fill="#f7f6ef" d="M96 254h39v60H96zm55 0h37v60h-37zm54 0h38v60h-38z"/>
<g class="about-cone-motion"><image href="assets/about/cone.svg" x="514" y="144" width="51" height="84"/></g>
    <path fill="#f7efb0" d="M449 239h151v99H449z"/>
    <path fill="#00a600" d="m390 239 71-49 139-9v58z"/>
    <path fill="#5896e5" d="M471 263h49v49h-49zm59 0h48v49h-48z"/>
  </svg>
  <button class="about-back" data-route="/home">Back</button>
  <button class="about-heading" data-route="/home" aria-label="ABOUT — return to HOME" title="Return to HOME">ABOUT</button>
  <nav class="about-sections" aria-label="About sections">
    <button data-about="History" aria-pressed="true">History</button>
    <button data-about="Background" aria-pressed="false">Background</button>
    <button data-about="Regulation" aria-pressed="false">Regulation</button>
    <button data-about="Structure" aria-pressed="false">Structure</button>
  </nav>

  <div class="about-floating-items" aria-hidden="true">
    <div class="about-item about-flour"><img src="assets/about/flour.svg" alt="" draggable="false"></div>
    <div class="about-item about-donuts"><img src="assets/about/donuts.svg" alt="" draggable="false"></div>
    <div class="about-item about-sundae"><img src="assets/about/sundae.svg" alt="" draggable="false"></div>
  </div>

  <article class="about-card" aria-live="polite">
    <h2>{{ABOUT_TITLE}}</h2>
    <p>{{ABOUT_COPY}}</p>
  </article>
</main>`;
