/* ...existing code... */
const promptText = `# Super Prompt: Bottom-of-Body Div Removal/Hide

Goal: Minimal JS that continuously hides/removes any DIV auto-appended as lastElementChild of <body>, unless allowed. No UI/logs, safe anywhere.

Requirements
- Target only bottom DIVs (lastElementChild).
- On load: check + hide unexpected DIV.
- Continuous: MutationObserver + interval sweep.
- Hide by default (display:none!important; visibility:hidden!important; pointer-events:none!important).
- If data-remove="true", remove instead.
- Allowed IDs: editor-container, grid-container (editable list).
- Wait for DOMContentLoaded if body not ready.
- Fail silently, disconnect on unload/pagehide.
- Must survive re-appends & iframed use.
- Plain JS only.

Acceptance: Any external bottom DIV → hidden/removed instantly; allowed IDs untouched.

<script>
(() => {
  const ALLOWED = new Set(['editor-container','grid-container']);
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
</script>
`;

const ta = document.getElementById('super-prompt');
const btn = document.getElementById('copy-btn');
const status = document.getElementById('copy-status');

ta.value = promptText;

btn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(ta.value);
    status.textContent = 'Copied to clipboard.';
    setTimeout(() => (status.textContent = ''), 2000);
  } catch {
    ta.select();
    document.execCommand('copy');
    status.textContent = 'Copied.';
    setTimeout(() => (status.textContent = ''), 2000);
  }
});
/* ...existing code... */

