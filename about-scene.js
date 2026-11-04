/* ABOUT illustration drawn from the supplied third-page reference. */
window.BUREAU_SCENES.about = `
<main class="scene about" aria-label="About the Convenience Tax Bureau">
  <svg class="illustration" viewBox="0 0 600 338" aria-hidden="true">
    <defs><linearGradient id="about-paper" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffdf56"/><stop offset="1" stop-color="#f4f4f2"/></linearGradient></defs>
    <path fill="#f4f4f2" d="M0 0h600v338H0z"/>
    <path fill="#fff" d="M0 0h600v49H0z"/>
    <path fill="url(#about-paper)" d="M218 50h368v222H218z"/>
    <path fill="#d3bfd9" d="M8 24h164v314H8z"/>
    <path fill="#fff1a9" d="M14 32h68v35H14zm0 45h68v38H14zm0 49h68v35H14zm0 47h68v36H14z"/>
    <path fill="#fff8c5" d="M94 32h68v32H94zm0 44h68v32H94zm0 44h68v32H94zm0 44h68v32H94z"/>
    <path fill="#ffd42a" d="M0 104h76v234H0z"/>
    <path fill="#df86cc" d="M12 152h44v46H12zm0 86h44v46H12z"/>
    <path fill="#fff3ae" d="M12 200h44v34H12zm0 86h44v40H12z"/>
    <path fill="#5798e6" d="M76 242h172v96H76z"/>
    <path fill="#dc4b2e" d="m76 218 204-30 6 26-210 30z"/>
    <path fill="#f7f6ef" d="M96 252h38v62H96zm55 0h37v62h-37zm54 0h38v62h-38z"/>

    <path fill="#f7efb0" d="M442 236h158v102H442z"/>
    <path fill="#00a600" d="m386 236 72-48 142-8v56z"/>
    <path fill="#5896e5" d="M464 260h49v50h-49zm59 0h48v50h-48z"/>
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
    <svg class="about-cone-sprite" viewBox="0 0 600 338"><defs><clipPath id="about-roof-front"><path d="M0 0h600v180l-142 8-72 48H0z"/></clipPath></defs><g clip-path="url(#about-roof-front)"><g class="about-cone-motion"><image href="assets/about/original/cone.svg?v=pdf-original-1" x="514" y="144" width="51" height="96"/></g></g></svg>
    <div class="about-item about-flour"><img src="assets/about/original/flour.svg?v=pdf-original-1" alt="" draggable="false"></div>
    <div class="about-item about-donuts"><img src="assets/about/original/donuts.svg?v=pdf-original-1" alt="" draggable="false"></div>
    <div class="about-item about-sundae"><img src="assets/about/original/sundae.svg?v=pdf-original-1" alt="" draggable="false"></div>
  </div>

  <article class="about-card" aria-live="polite">
    <h2>{{ABOUT_TITLE}}</h2>
    <p>{{ABOUT_COPY}}</p>
  </article>
</main>`;
