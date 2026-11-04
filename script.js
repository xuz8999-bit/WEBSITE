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
    const [aboutTab, setAboutTab] = useState('Background');
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
      schedule(() => setEntering(false), reduced() ? 0 : 2600);
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
      if (route !== '/' && route !== '/home' && route !== '/about') {
        setNotice(`${titles[route]} — coming soon`);
        schedule(() => setNotice(''), 2200);
      }
    }, [route]);
    const respondToIllustration = (target) => {
      if (reduced() || entering || route === '/') return;
      if (target.hasAttribute('data-fruit')) {
        if (target.classList.contains('fruit-falling')) return;
        target.classList.add('fruit-falling');
        schedule(() => target.classList.remove('fruit-falling'), 3600);
      } else if (target.hasAttribute('data-window')) {
        if (target.classList.contains('window-wiggle')) return;
        target.classList.add('window-wiggle');
        schedule(() => target.classList.remove('window-wiggle'), 480);
      }
    };
    const onPointerOver = (event) => {
      const section = event.target.closest('[data-about]');
      if (section && !section.contains(event.relatedTarget)) { setAboutTab(section.dataset.about); return; }
      const target = event.target.closest('[data-fruit], [data-window]');
      if (target && !target.contains(event.relatedTarget)) respondToIllustration(target);
    };
    const onKeyDown = (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      const target = event.target.closest('[data-fruit], [data-window]');
      if (target) { event.preventDefault(); respondToIllustration(target); }
    };
    const onClick = (event) => {
      const control = event.target.closest('[data-start], [data-nav], [data-action], [data-menu], [data-fruit], [data-window], [data-about], [data-route]');
      if (!control) return;
      event.preventDefault();
      if (locked.current) return;
      if (control.dataset.about) {
        setAboutTab(control.dataset.about);
      } else if (control.dataset.route) {
        setNotice(''); navigate(control.dataset.route);
      } else if (control.hasAttribute('data-fruit') || control.hasAttribute('data-window')) {
        respondToIllustration(control);
      } else if (control.hasAttribute('data-start')) {
        locked.current = true;
        if (reduced()) {
          navigate('/home'); locked.current = false;
          return;
        }
        setPhase('leaving');
        schedule(() => { navigate('/home'); enterHome(); }, 260);
        schedule(() => { setPhase('idle'); locked.current = false; }, 400);
      } else if (control.dataset.menu) {
        control.classList.remove('menu-pressed');
        void control.offsetWidth;
        control.classList.add('menu-pressed');
        schedule(() => control.classList.remove('menu-pressed'), reduced() ? 0 : 220);
        document.getElementById('feedback').textContent = `${control.dataset.menu} selected`;
      } else if (control.dataset.nav) {
        const next = { Home: '/', About: '/about', Consume: '/consumption', 'Tax System': '/tax-system' }[control.dataset.nav];
        setNotice(''); navigate(next);
      } else {
        control.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(2px)' }, { transform: 'translateY(0)' }], { duration: reduced() ? 0 : 180 });
      }
    };
    const page = route === '/' ? 'welcome' : route === '/about' ? 'about' : 'home';
    let markup = BUREAU_SCENES[page].replace(`scene ${page}`, `scene ${page}${phase === 'leaving' && page === 'welcome' ? ' start-playing' : ''}${entering && page === 'home' ? ' entering' : ''}`);
    const aboutCopy = {
      History: '随着科技与便利服务的发展，人们获得了更多个人时间，但消费背后的垃圾处理、资源消耗与公共劳动成本逐渐成为社会负担。为重新分配这些被隐藏的劳动成本，政府建立了“便利税”制度。',
      Background: '时序联邦是一个以“时间”为核心资源的未来国家。便利税将消费背后的公共劳动成本转化为时间债务，记入个人账户；公民通过劳动偿还，让时间在社会中循环。',
      Regulation: '政府建立“便利税”制度，将每一次便利消费转化为可计算的时间债务，并记录在公民的个人时间账户中。公民通过劳动偿还自己享受便利所产生的时间成本。',
      Structure: '便利消费产生的时间债务记录在公民的个人时间账户中，公民通过劳动偿还债务。个人时间、消费与公共劳动由此相互连接，形成一个依靠时间循环维持运转的社会系统。'
    };
    if (page === 'about') {
      markup = markup.replace('{{ABOUT_TITLE}}', aboutTab === 'Background' ? 'Temporal Federation' : aboutTab).replace('{{ABOUT_COPY}}', aboutCopy[aboutTab]);
      markup = markup.replace(/data-about="([^"]+)" aria-pressed="(?:true|false)"/g, (_, label) => `data-about="${label}" aria-pressed="${label === aboutTab}"`);
    }
    return h('div', { className: 'transition-stage', onClick, onPointerOver, onKeyDown, 'aria-busy': phase !== 'idle' },
      h('div', { className: 'scene-content', dangerouslySetInnerHTML: { __html: markup } }),
      phase !== 'idle' && h('div', { className: 'transition-mask', 'aria-hidden': true }),
      h('output', { className: notice ? 'route-notice' : 'sr-only', role: 'status', 'aria-live': 'polite' }, notice)
    );
  }
  ReactDOM.createRoot(document.getElementById('root')).render(h(App));
})();
