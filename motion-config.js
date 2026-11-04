/* One timing/route registry for all ten pages. Durations are milliseconds. */
window.BUREAU_MOTION = Object.freeze({
  transition: 760, homeEntrance: 2600, laborEntrance: 4000, pageEntrance: 900, hover: 240,
  float: 6000, cloud: 20000, person: 3000,
  routes: {
    '/': { page: 'welcome', title: 'Welcome' }, '/home': { page: 'home', title: 'Home' },
    '/about': { page: 'about', title: 'About' }, '/tax-system': { page: 'tax', title: 'Tax System' },
    '/consumption': { page: 'consumption', title: 'Consumption' }, '/products': { page: 'products', title: 'Products' },
    '/record': { page: 'record', title: 'Record' }, '/account': { page: 'account', title: 'Account' },
    '/labor': { page: 'labor', title: 'Labor' }, '/receipt': { page: 'receipt', title: 'Receipt' }
  },
  transitions: {
    '/>/home': 'clock', '/home>/about': 'book', '/about>/tax-system': 'flow',
    '/tax-system>/consumption': 'shelves', '/consumption>/products': 'product',
    '/products>/record': 'file', '/record>/account': 'debt', '/account>/labor': 'task',
    '/labor>/receipt': 'print', '/receipt>/home': 'return', '/about>/home': 'book-back'
  }
});
