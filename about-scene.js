/* ABOUT illustration drawn from the supplied third-page reference. */
window.BUREAU_SCENES.about = `
<main class="scene about" aria-label="About the Convenience Tax Bureau">
  <svg class="illustration" viewBox="0 0 600 338" aria-hidden="true">
    <defs><linearGradient id="about-paper" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffdf56"/><stop offset="1" stop-color="#f4f4f2"/></linearGradient></defs>
    <path fill="#f4f4f2" d="M0 0h600v338H0z"/>
    <path fill="#fff" d="M0 0h600v49H0z"/>
    <path fill="url(#about-paper)" d="M218 50h368v222H218z"/>
    <path fill="#b9a0c7" d="M11.5 27.7h164.2v310.3H11.5z"/>
    <path fill="#fff1a9" d="M17.6 37.3h69.4v33.4H17.6zm0 44.7h69.4v33.4H17.6zm0 44.7h69.4v33.4H17.6zm0 44.7h69.4v33.4H17.6z"/>
    <path fill="#fff8c5" d="M99.7 37.3h70v33.4H99.7zm0 44.7h70v33.4H99.7zm0 44.7h70v33.4H99.7zm0 44.7h70v33.4H99.7z"/>
    <path fill="#f7f4e8" d="M17.6 63.5H87v7.2H17.6zm82.1 0h70v7.2h-70zM17.6 108.2H87v7.2H17.6zm82.1 0h70v7.2h-70zM17.6 152.9H87v7.2H17.6zm82.1 0h70v7.2h-70zM17.6 197.6H87v7.2H17.6zm82.1 0h70v7.2h-70z"/>
    <path fill="#ffd42a" d="M2 106h77v232H2z"/>
    <path fill="#df86cc" d="M15.5 156h44.5v45.5H15.5zm0 86h44.5v48.5H15.5z"/>
    <path fill="#fff3ae" d="M15.5 201.5h44.5v24H15.5zm0 89h44.5v24.5H15.5z"/>
    <path fill="#5798e6" d="M79 245.5 265 218.5V338H79z"/>
    <path fill="#dc4b2e" d="M79 218.4 285 191.5 289.5 216 79 246.5z"/>
    <path fill="#f7f6ef" d="M100 255h37v60H100zm54.5 0h38v60h-38zm55.5 0h38v60h-38z"/>

    <path fill="#f7efb0" d="M446 239h154v99H446z"/>
    <path fill="#00a600" d="M393 239 461 190 600 181.5V239z"/>
    <path fill="#5896e5" d="M469 264h55v50h-55zm70 0h55v50h-55z"/>
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
    <svg class="about-cone-sprite" viewBox="0 0 600 338"><defs><clipPath id="about-roof-front"><path d="M0 0h600v181.5L461 190 393 239H0z"/></clipPath></defs><g clip-path="url(#about-roof-front)"><g class="about-cone-motion"><image href="assets/about/original/cone.svg?v=pdf-original-1" x="514" y="144" width="51" height="96"/></g></g></svg>
    <div class="about-item about-flour"><img src="assets/about/original/flour.svg?v=pdf-original-1" alt="" draggable="false"></div>
    <div class="about-item about-donuts"><img src="assets/about/original/donuts.svg?v=pdf-original-1" alt="" draggable="false"></div>
    <div class="about-item about-sundae"><img src="assets/about/original/sundae.svg?v=pdf-original-1" alt="" draggable="false"></div>
  </div>

  <article class="about-card" aria-live="polite">
    <h2>{{ABOUT_TITLE}}</h2>
    <p>{{ABOUT_COPY}}</p>
  </article>
</main>`;
