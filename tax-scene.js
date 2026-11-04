/* Fourth page: four illustrated steps, measured from the supplied reference. */
window.BUREAU_SCENES.tax = `
<main class="scene world tax" aria-label="Tax System">
  <svg class="illustration tax-illustration" viewBox="0 0 600 338" aria-hidden="true">
    <defs>
      <radialGradient id="tax-reference-sky" cx="44%" cy="46%" r="58%"><stop stop-color="#fa5818"/><stop offset=".4" stop-color="#ff844c"/><stop offset=".78" stop-color="#fff5e9"/><stop offset="1" stop-color="#ffffff"/></radialGradient>
      <filter id="tax-reference-grain" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="1.65" numOctaves="1" seed="18" stitchTiles="stitch"/><feComponentTransfer result="color-grain"><feFuncR type="linear" slope="2.4" intercept="-.7"/><feFuncG type="linear" slope="2.4" intercept="-.7"/><feFuncB type="linear" slope="2.4" intercept="-.7"/></feComponentTransfer><feComposite in="SourceGraphic" in2="color-grain" operator="arithmetic" k1="0" k2="1" k3=".72" k4="-.28"/></filter>
    </defs>
    <path fill="url(#tax-reference-sky)" filter="url(#tax-reference-grain)" d="M0 0h600v338H0z"/>
    <g class="tax-color-bars">
      <path fill="#ffd329" d="M172 178h17v104h-17zM302.5 125h18v104h-18z"/>
      <path fill="#5896e5" d="M219.5 156h18v70.5h-18zM368.5 160.5H386V310h-17.5z"/>
      <path fill="#00a600" d="M260.5 177h17v118h-17zM436.5 86.5h17v161.5h-17z"/>
    </g>
    <g fill="#faf7ee">
      <rect class="tax-card-shape" style="--step:0" x="40.5" y="228.5" width="88.5" height="62" rx="14"/>
      <rect class="tax-card-shape" style="--step:1" x="182" y="95" width="88.5" height="61.5" rx="14"/>
      <rect class="tax-card-shape" style="--step:2" x="337.5" y="217" width="88.5" height="61.5" rx="14"/>
      <rect class="tax-card-shape" style="--step:3" x="479.5" y="103.5" width="88.5" height="61.5" rx="14"/>
    </g>
    <g class="flow-lines tax-reference-lines" fill="none" stroke="#fffdf7" stroke-width="3.5">
      <path pathLength="1" style="--link:0" d="M128 241 187 141"/>
      <path pathLength="1" style="--link:1" d="m260 153 89 67"/>
      <path pathLength="1" style="--link:2" d="m414 221 71-79"/>
    </g>
    <g class="tax-card-art" style="--step:0">
      <path fill="#00a600" d="M48 290c-2-15 0-25 14-31l7 8c-8 6-10 14-5 23z"/>
      <g class="tax-phone-breathe"><g transform="rotate(-7 77 260)">
        <rect x="60" y="237" width="33" height="46" rx="6" fill="#ffd329"/>
        <path d="M66 244h22m-22 5h22" stroke="#fffbed" stroke-width="1.7"/>
        <path fill="#dc86cf" d="M67 257h5v8h-5z"/><path fill="#5896e5" d="M80 257h8v8h-8zm0 11h8v8h-8z"/>
        <path fill="#de4b2c" d="m67 269-2 3 2 2-1 3q4 4 8 0l-1-3 1-2-2-3-2 1z"/>
        <path d="M67 256q3-3 5 0v2" stroke="#fffbed" stroke-width="1" fill="none"/>
      </g></g>
      <path fill="#00a600" d="M90 256q19-11 31 1h8v25q-9-12-17-12-12 0-18-7l4-1q7 3 5-2l-11-3z"/>
    </g>
    <g class="tax-card-art" style="--step:1">
      <g class="tax-hourglass-sand"><path fill="#5896e5" d="M193 107h13q0 8-6.5 8t-6.5-8z"/><path fill="#ffd329" d="M193 123q0-8 6.5-8t6.5 8z"/></g>
      <path fill="#de4b2c" d="M191 104h17v3h-17z"/><path fill="#00a600" d="M190.5 123.5h18v3h-18z"/>
      <g class="tax-product-motif tax-plastic-bag"><path fill="#e74d2e" d="M223 122c-2-2-4 0-4 3-2 4 0 8 2 10-5 3-2 10 3 11 4 1 7-2 12 0h4l-1-11-3-12q-1-3-3-1l2 6q-6 5-11 0l1-4q1-3-2-2z"/></g>
      <g class="tax-product-motif tax-open-box"><path fill="#5896e5" d="M236.5 135h23v12h-23z"/><path fill="#db87cf" d="m259.5 135 3-5v11l-3 6z"/><path fill="#00a600" d="m237 130 10-4h15l-5 4z"/><path fill="#f4edb0" d="m234.5 136 2.5-6h23l-2.5 6z"/><path fill="#ffd329" d="m260 130 2-4 3 4-2.5 5.5z"/></g>
    </g>
    <g class="tax-card-art" style="--step:2">
      <rect x="347.5" y="226.5" width="34" height="46.5" rx="8.5" fill="#d882cd"/>
      <rect x="351" y="231" width="25.5" height="10" rx="5" fill="#ffd329"/>
      <path d="M354 231q-5 5 0 10" stroke="#fffbed" stroke-width="2.5" fill="none"/>
      <g fill="#fffbed"><rect x="350.5" y="242.5" width="8.5" height="8" rx="3"/><rect x="360" y="242.5" width="8.5" height="8" rx="3"/><rect x="369.5" y="242.5" width="8.5" height="8" rx="3"/><rect x="350.5" y="251.5" width="8.5" height="8" rx="3"/><rect x="360" y="251.5" width="8.5" height="8" rx="3"/><rect x="369.5" y="251.5" width="8.5" height="8" rx="3"/><rect x="350.5" y="260.5" width="8.5" height="8" rx="3"/><rect x="360" y="260.5" width="8.5" height="8" rx="3"/><rect x="369.5" y="260.5" width="8.5" height="8" rx="3"/></g>
      <g fill="#5896e5"><rect x="352" y="242.5" width="7" height="8" rx="2.5"/><rect x="361.5" y="242.5" width="7" height="8" rx="2.5"/><rect x="371" y="242.5" width="7" height="8" rx="2.5"/><rect x="352" y="251.5" width="7" height="8" rx="2.5"/><rect x="361.5" y="251.5" width="7" height="8" rx="2.5"/><rect x="371" y="251.5" width="7" height="8" rx="2.5"/><rect x="352" y="260.5" width="7" height="8" rx="2.5"/><rect x="361.5" y="260.5" width="7" height="8" rx="2.5"/><rect x="371" y="260.5" width="7" height="8" rx="2.5"/></g>
      <g stroke="#df4b2e" stroke-width="1.8" fill="none"><path d="M389 240h9m-4.5-4.5v9m12-4.5h8M391 253l6 6m-6 0 6-6m9 3h8"/></g><g fill="#df4b2e"><circle cx="410" cy="252" r="1.3"/><circle cx="410" cy="260" r="1.3"/></g>
    </g>
    <g class="tax-card-art" style="--step:3">
      <path fill="#5896e5" d="M512 134q-6 6-6 22 17 8 34 0-1-15-8-22z"/>
      <g class="tax-avatar-head"><circle cx="523" cy="126" r="12" fill="#f7edab"/><path fill="#5896e5" d="M510.5 130q-4-18 10.5-15.5 12-2 14 15.5-7-3-9-10-1-3-3 2-3 7-12.5 8z"/></g>
      <g fill="#ffd329"><circle cx="522.7" cy="143" r="1.8"/><circle cx="523" cy="152.5" r="1.8"/></g>
    </g>
  </svg>
  <h1 class="world-heading tax-title"><button data-route="/about" aria-label="TAX SYSTEM — return to ABOUT">TAX SYSTEM</button></h1>
  <h2 class="tax-subheading">How It Operates</h2>
  <button class="tax-card-hotspot tax-shop-hotspot" data-route="/consumption" aria-label="Open the convenience shop"></button>
  <button class="tax-card-hotspot tax-product-hotspot" data-route="/consumption" aria-label="Choose convenience products"></button>
</main>`;
