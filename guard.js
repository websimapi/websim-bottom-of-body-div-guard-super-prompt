/* ...existing code... */
(() => {
  const ALLOWED = new Set(['editor-container', 'grid-container']);
  const hide = d => { try {
    if (d.dataset.remove === 'true') { d.remove(); return; }
    d.style.setProperty('display','none','important');
    d.style.setProperty('visibility','hidden','important');
    d.style.setProperty('pointer-events','none','important');
  } catch {} };
  const sweep = () => { try {
    const b = document.body, l = b && b.lastElementChild;
    if (l && l.tagName === 'DIV' && !ALLOWED.has(l.id || '')) hide(l);
  } catch {} };
  const start = () => {
    sweep();
    const mo = new MutationObserver(sweep);
    try { mo.observe(document.body, { childList: true }); } catch {}
    const iv = setInterval(sweep, 1000);
    const stop = () => { try { mo.disconnect(); } catch {} clearInterval(iv); };
    addEventListener('pagehide', stop, { once: true });
    addEventListener('beforeunload', stop, { once: true });
  };
  document.body ? start() : addEventListener('DOMContentLoaded', start, { once: true });
})();

