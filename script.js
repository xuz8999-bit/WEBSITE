/* React owns route and transition state; scene templates retain the original artwork. */
(() => {
  const { createElement: h, useState, useEffect, useRef } = React;
  const titles = { '/': 'Welcome', '/home': 'Home', '/about': 'About', '/consumption': 'Consumption', '/tax-system': 'Tax System' };
  const readRoute = () => {
    const hash = location.hash.replace(/^#/, '');
    return titles[hash] ? hash : (location.pathname.endsWith('/home.html') ? '/home' : '/');
  };
  function App() {
    const [route, setRoute] = useState(readRoute);
    const [phase, setPhase] = useState('idle');
    const [entering, setEntering] = useState(false);
    const [notice, setNotice] = useState('');
    const locked = useRef(false);
    const timers = useRef(new Set());
    const schedule = (fn, ms) => {
      const id = setTimeout(() => { timers.current.delete(id); fn(); }, ms);
      timers.current.add(id);
    };
    const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current.clear(); };
    const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
    const enterHome = () => {
      setEntering(true);
      schedule(() => setEntering(false), reduced() ? 0 : 600);
    };
    const navigate = (next) => {
      if (readRoute() !== next) history.pushState({}, '', '#' + next);
      setRoute(next);
    };
    useEffect(() => {
      const back = () => {
        clearTimers(); locked.current = false; setPhase('idle'); setEntering(false); setNotice('');
        setRoute(readRoute());
      };
      window.addEventListener('popstate', back);
      window.addEventListener('hashchange', back);
      return () => { clearTimers(); window.removeEventListener('popstate', back); window.removeEventListener('hashchange', back); };
    }, []);
    useEffect(() => {
      document.title = `${titles[route]} — Convenience Tax Bureau`;
      if (route !== '/' && route !== '/home') {
        setNotice(`${titles[route]} — coming soon`);
        schedule(() => setNotice(''), 2200);
      }
    }, [route]);
    const onClick = (event) => {
      const control = event.target.closest('[data-start], [data-nav], [data-action]');
      if (!control) return;
      event.preventDefault();
      if (locked.current) return;
      if (control.hasAttribute('data-start')) {
        locked.current = true;
        if (reduced()) {
          navigate('/home'); locked.current = false;
          return;
        }
        setPhase('leaving');
        schedule(() => { navigate('/home'); enterHome(); }, 260);
        schedule(() => { setPhase('idle'); locked.current = false; }, 400);
      } else if (control.dataset.nav) {
        const next = { Home: '/', About: '/about', Consume: '/consumption', 'Tax System': '/tax-system' }[control.dataset.nav];
        setNotice(''); navigate(next);
      } else {
        control.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(2px)' }, { transform: 'translateY(0)' }], { duration: reduced() ? 0 : 180 });
      }
    };
    const page = route === '/' ? 'welcome' : 'home';
    const markup = BUREAU_SCENES[page].replace(`scene ${page}`, `scene ${page}${phase === 'leaving' && page === 'welcome' ? ' start-playing' : ''}${entering && page === 'home' ? ' entering' : ''}`);
    return h('div', { className: 'transition-stage', onClick, 'aria-busy': phase !== 'idle' },
      h('div', { className: 'scene-content', dangerouslySetInnerHTML: { __html: markup } }),
      phase !== 'idle' && h('div', { className: 'transition-mask', 'aria-hidden': true }),
      h('output', { className: notice ? 'route-notice' : 'sr-only', role: 'status', 'aria-live': 'polite' }, notice)
    );
  }
  ReactDOM.createRoot(document.getElementById('root')).render(h(App));
})();
