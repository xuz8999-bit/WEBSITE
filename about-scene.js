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
<g transform="translate(512 150) scale(.54)"><g class="about-cone-motion">
<path fill="#cf7224" d="m15 49 47 5-30 79q-5 5-11-2z"/>
<path d="m18 62 33 23m-31-8 26 18m-24-3 18 12m-16 0 11 10M53 58 20 94m28-22-25 33m18-15-16 25" stroke="#f1bd61" stroke-width="2" fill="none"/>
<path fill="#b591db" d="M9 52C4 42 11 32 17 31c-4-14 8-21 16-18 5-13 16-10 22-2 13-1 18 12 15 21 11 5 10 18 2 24z"/>
<g fill="#62428a"><ellipse cx="24" cy="22" rx="5" ry="9" transform="rotate(-17 24 22)"/><ellipse cx="41" cy="13" rx="5" ry="8"/><ellipse cx="57" cy="23" rx="5" ry="8" transform="rotate(-25 57 23)"/></g>
</g></g>
    <path fill="#f7efb0" d="M449 239h151v99H449z"/>
    <path fill="#00a600" d="m390 239 71-49 139-9v58z"/>
    <path fill="#5896e5" d="M471 263h49v49h-49zm59 0h48v49h-48z"/>
  </svg>
  <button class="about-heading" data-route="/home" aria-label="ABOUT — return to HOME" title="Return to HOME">ABOUT</button>
  <nav class="about-sections" aria-label="About sections">
    <button data-about="History" aria-pressed="true">History</button>
    <button data-about="Background" aria-pressed="false">Background</button>
    <button data-about="Regulation" aria-pressed="false">Regulation</button>
    <button data-about="Structure" aria-pressed="false">Structure</button>
  </nav>

  <div class="about-floating-items" aria-hidden="true">
    <div class="about-item about-flour"><svg viewBox="0 0 100 145"><g transform="rotate(-17 50 72)">
      <path fill="#aa681e" d="M12 9 88 4l2 13-78 5z"/><path fill="#63962e" d="M12 22 89 16l-1 108-72 8z"/>
      <path fill="#f2d03d" d="m20 54 59-4 1 65-57 6z"/><path fill="#135506" d="m16 113 72-5v22l-72 6z"/>
      <path fill="#214a08" d="m17 30 64-5 1 28-63 6z"/>
      <text x="50" y="47" text-anchor="middle" fill="#fff8c9" font-family="serif" font-size="18" font-weight="bold">FLOUR</text>
      <path fill="#fff2b6" d="m47 63 15-4 8 34-16 13-16-8z"/><path fill="#f8b91b" d="M45 72q-10 10-9 24l15 9 6-10z"/>
      <path fill="#537d17" d="M53 110C27 108 28 81 27 75c17 7 26 18 26 35m0 0c-2-22 10-37 24-41 1 21-8 37-24 41"/>
    </g></svg></div>
    <div class="about-item about-donuts"><svg viewBox="0 0 170 130"><g transform="rotate(15 85 65)">
      <rect x="8" y="13" width="153" height="106" rx="8" fill="#a8e9e4" stroke="#f5faf4" stroke-width="5"/>
      <rect x="15" y="20" width="139" height="91" rx="5" fill="#75b7bb"/>
      <defs><g id="about-donut"><ellipse rx="22" ry="18" fill="#c9857e" stroke="#f4d3c0" stroke-width="3"/><path d="M-21-2q2-14 13-13 8 6 16 0 12 1 14 13l-6 6-6-4-9 7-9-5-7 4z" fill="#de9cc0"/><ellipse rx="7" ry="6" fill="#7b717d"/><path d="m-15-7 4 2m19-5 2 3M-10 9l4-2m18 1 3-3" stroke="#fff2bd" stroke-width="2"/></g></defs>
      <use href="#about-donut" x="43" y="44"/><use href="#about-donut" x="91" y="43"/><use href="#about-donut" x="134" y="48"/>
      <use href="#about-donut" x="44" y="88"/><use href="#about-donut" x="94" y="87"/><use href="#about-donut" x="135" y="90"/>
      <path d="M14 29 155 110M19 18l133 75" stroke="#f9ffff" stroke-width="3" opacity=".3"/>
    </g></svg></div>
    <div class="about-item about-sundae"><svg viewBox="0 0 110 150">
      <path fill="#72c8dc" d="M16 73h79c0 29-18 40-32 42v19h15q10 0 10 10H24q0-10 10-10h15v-19C31 112 16 97 16 73"/>
      <path fill="#fff3d0" d="M15 69q1-20 20-22 9-20 24-7 21-12 28 8 17 3 14 20v24q-13 17-27 4-12 13-24 0-17 14-29-1z"/>
      <path fill="#ff8688" d="M16 66q13 14 26 0 13 14 27 0 14 13 32 0v17q-17 14-30 0-13 14-27 0-13 14-28 0z"/>
      <path d="M20 93q12 13 25 2 12 13 25 1 12 12 27-4" fill="none" stroke="#ff8588" stroke-width="6"/>
      <g fill="#f36066" stroke="#ffd4bc" stroke-width="2"><ellipse cx="26" cy="44" rx="9" ry="17" transform="rotate(-32 26 44)"/><ellipse cx="54" cy="29" rx="10" ry="19" transform="rotate(-12 54 29)"/><ellipse cx="81" cy="44" rx="9" ry="17" transform="rotate(28 81 44)"/></g>
      <g stroke="#ffefc9" stroke-width="2"><path d="m22 35 6 15m23-33 4 23m28-6-5 17"/></g>
    </svg></div>
  </div>

  <article class="about-card" aria-live="polite">
    <h2>{{ABOUT_TITLE}}</h2>
    <p>{{ABOUT_COPY}}</p>
  </article>
</main>`;
