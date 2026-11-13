/* ============================================================
   रसिका Stitch Works — Website Style (theme & font)
   The owner picks the style in the Admin Panel → "🎨 Website Style".
   The choice is saved in Firestore (siteSettings/style) so EVERY
   visitor sees it. Visitors no longer get a style button.

   Loaded from index.html:  <script src="theme-switcher.js"></script>
   ============================================================ */
(function () {
    'use strict';

    // ── 1. THEMES ──────────────────────────────────────────────
    const THEMES = {
        classic: { label: 'Classic Saffron', note: 'The original warm look', vars: {} },
        maroon: {
            label: 'Royal Maroon', note: 'Heritage bridal, maroon & gold',
            vars: { '--cream':'#FAF5EC','--cream-dark':'#F1E6D2','--crimson':'#7A1E2C','--crimson-dk':'#5C1420',
                    '--teal':'#1F4D3A','--teal-dk':'#163829','--dark':'#2A1A14','--text':'#4A3328',
                    '--muted':'#776A5C','--border':'#E6D6BC','--gold':'#C9A24B','--wine':'#9E3A4C' }
        },
        peacock: {
            label: 'Peacock', note: 'Festive teal, indigo & marigold',
            vars: { '--cream':'#F7F4EE','--cream-dark':'#ECE6DA','--crimson':'#0F5257','--crimson-dk':'#0A3D41',
                    '--teal':'#2E3A6B','--teal-dk':'#222C52','--dark':'#1E2328','--text':'#3A4048',
                    '--muted':'#5E6670','--border':'#DCD6CA','--gold':'#E8A33D','--wine':'#8B2E4A' }
        },
        blush: {
            label: 'Blush & Sage', note: 'Soft, modern boutique',
            vars: { '--cream':'#FBF8F5','--cream-dark':'#F2ECE6','--crimson':'#A8555C','--crimson-dk':'#8A4248',
                    '--teal':'#6F806A','--teal-dk':'#56664F','--dark':'#2F2A28','--text':'#4E4643',
                    '--muted':'#6F6660','--border':'#E8DFD8','--gold':'#B89A6A','--wine':'#8A4248' }
        }
    };
    const CLASSIC_SWATCH = { '--crimson':'#BA4D00','--teal':'#2B6B4F','--gold':'#B8962E','--cream':'#FBF1E1' };

    // ── 2. FONT PAIRS ──────────────────────────────────────────
    const FONTS = {
        classic:  { label:'Classic',  head:"'Playfair Display', serif",  body:"'Inter', sans-serif",       url:null },
        couture:  { label:'Couture',  head:"'Cormorant Garamond', serif", body:"'Jost', sans-serif",
                    url:'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Jost:wght@300;400;500;600&display=swap' },
        heritage: { label:'Heritage', head:"'Marcellus', serif",          body:"'Nunito Sans', sans-serif",
                    url:'https://fonts.googleapis.com/css2?family=Marcellus&family=Nunito+Sans:wght@300;400;600;700&display=swap' },
        modern:   { label:'Modern',   head:"'Fraunces', serif",           body:"'DM Sans', sans-serif",
                    url:'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=DM+Sans:wght@300;400;500;600&display=swap' }
    };

    const CACHE_KEY = 'rsw_site_style';            // local copy of the site style, avoids a colour flash
    const FS_COLLECTION = 'siteSettings', FS_DOC = 'style';

    const store = {
        get(k){ try { return localStorage.getItem(k); } catch(e){ return null; } },
        set(k,v){ try { localStorage.setItem(k,v); } catch(e){} },
        del(k){ try { localStorage.removeItem(k); } catch(e){} }
    };
    // Old per-visitor choices from the previous version are no longer used
    store.del('rsw_theme'); store.del('rsw_font');

    // ── 3. STYLES ──────────────────────────────────────────────
    let css = '';
    Object.entries(THEMES).forEach(([id,t])=>{
        const decl = Object.entries(t.vars).map(([k,v])=>`${k}:${v};`).join('');
        if(decl) css += `html[data-theme="${id}"]{${decl}}\n`;
    });
    css += `
    html[data-font] :where(body, body *:not(svg, path)){ font-family:var(--font-body) !important; }
    html[data-font] h1, html[data-font] h2, html[data-font] h3, html[data-font] h4,
    html[data-font] .logo-name, html[data-font] .hero-subtitle, html[data-font] .stat-num,
    html[data-font] .price, html[data-font] .modal-price, html[data-font] .cart-total-num,
    html[data-font] .foot-brand-name{ font-family:var(--font-head) !important; }
    html[data-font] .afeat h3, html[data-font] .afeat h4, html[data-font] .citem-text h4, html[data-font] .foot-col h4{ font-family:var(--font-body) !important; }
    html[data-font] .rsw-opt .rsw-aa{ font-family:var(--aa-font) !important; }

    .saffron-bar{ background:var(--crimson) !important; }
    .slide-btn{ background:var(--crimson) !important; opacity:.85; }
    .slide-btn:hover{ opacity:1; }
    .slide-dot.active::before{ background-color:var(--crimson) !important; }
    .logo-icon, #logoFallback{ background:linear-gradient(135deg,var(--crimson),var(--wine)) !important; }
    .cico.phone, .cico.email, .cico.loc, .cico.hours{ background:var(--cream-dark) !important; }
    .hero-slideshow{ background:var(--cream-dark) !important; }
    body, #navbar, section, footer, .btn-primary, .btn-coll, .btn-sm, .ftab{ transition:background-color .35s, color .35s, border-color .35s; }

    /* Admin panel style picker */
    .rsw-lbl{ font-size:.74rem; font-weight:600; letter-spacing:.08em; text-transform:uppercase; color:var(--muted); margin:.4rem 0 .7rem; }
    .rsw-grid{ display:grid; grid-template-columns:repeat(4,1fr); gap:.7rem; margin-bottom:1.3rem; }
    @media(max-width:760px){ .rsw-grid{ grid-template-columns:1fr 1fr; } }
    .rsw-opt{ border:2px solid var(--border); border-radius:12px; padding:.75rem; background:#fff; cursor:pointer;
        text-align:left; transition:border-color .2s, transform .15s; position:relative; }
    .rsw-opt:hover{ transform:translateY(-2px); }
    .rsw-opt.active{ border-color:var(--crimson); }
    .rsw-opt.active::after{ content:'✓'; position:absolute; top:6px; right:8px; width:20px; height:20px; border-radius:50%;
        background:var(--crimson); color:#fff; font-size:.7rem; display:flex; align-items:center; justify-content:center; }
    .rsw-sw{ display:flex; gap:4px; margin-bottom:.5rem; }
    .rsw-sw span{ width:22px; height:22px; border-radius:50%; border:1px solid rgba(0,0,0,.08); }
    .rsw-name{ font-size:.86rem; font-weight:600; color:var(--dark); line-height:1.25; }
    .rsw-note{ font-size:.72rem; color:var(--muted); line-height:1.35; margin-top:.15rem; }
    .rsw-aa{ font-size:1.7rem; line-height:1.1; color:var(--dark); margin-bottom:.15rem; font-family:var(--aa-font); }
    .rsw-actions{ display:flex; gap:.7rem; flex-wrap:wrap; align-items:center; }
    .rsw-status{ font-size:.82rem; margin-top:.7rem; min-height:1.1rem; }
    .rsw-status.ok{ color:#1f8a4c; } .rsw-status.err{ color:#c0392b; } .rsw-status.info{ color:var(--muted); }
    `;
    const styleEl = document.createElement('style');
    styleEl.id = 'rsw-theme-css';
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    // ── 4. APPLY ───────────────────────────────────────────────
    const loadedFonts = {};
    function loadFont(id){
        const f = FONTS[id];
        if(!f || !f.url || loadedFonts[id]) return;
        const l = document.createElement('link');
        l.rel = 'stylesheet'; l.href = f.url;
        document.head.appendChild(l);
        loadedFonts[id] = true;
    }
    let applied = { theme:'classic', font:'classic' };
    let previewing = false, draft = null;   // admin preview state
    function apply(theme, font){
        if(!THEMES[theme]) theme = 'classic';
        if(!FONTS[font]) font = 'classic';
        const root = document.documentElement, f = FONTS[font];
        if(theme === 'classic') root.removeAttribute('data-theme'); else root.setAttribute('data-theme', theme);
        loadFont(font);
        root.style.setProperty('--font-head', f.head);
        root.style.setProperty('--font-body', f.body);
        if(font === 'classic') root.removeAttribute('data-font'); else root.setAttribute('data-font', font);
        applied = { theme, font };
        markActive();
    }
    function readCache(){
        try { const c = JSON.parse(store.get(CACHE_KEY) || '{}'); return { theme: c.theme || 'classic', font: c.font || 'classic' }; }
        catch(e){ return { theme:'classic', font:'classic' }; }
    }
    function writeCache(st){ store.set(CACHE_KEY, JSON.stringify({ theme: st.theme, font: st.font })); }

    let siteStyle = readCache();          // what visitors see
    apply(siteStyle.theme, siteStyle.font);

    function getDb(){
        try { if(window.firebase && firebase.apps && firebase.apps.length) return firebase.firestore(); } catch(e){}
        return null;
    }
    function loadSiteStyle(){
        const db = getDb();
        if(!db) return;
        db.collection(FS_COLLECTION).doc(FS_DOC).get().then(doc=>{
            if(!doc.exists) return;
            const d = doc.data() || {};
            siteStyle = { theme: THEMES[d.theme] ? d.theme : 'classic', font: FONTS[d.font] ? d.font : 'classic' };
            writeCache(siteStyle);
            if(!previewing) apply(siteStyle.theme, siteStyle.font);
        }).catch(e=>console.warn('Site style load failed:', e));
    }

    // ── 5. ADMIN PICKER ────────────────────────────────────────
    function swatchHTML(id){
        const v = id === 'classic' ? CLASSIC_SWATCH : THEMES[id].vars;
        return ['--crimson','--teal','--gold','--cream'].map(k=>`<span style="background:${v[k]}"></span>`).join('');
    }
    function setStatus(msg, kind){
        const el = document.getElementById('rswStatus');
        if(el){ el.textContent = msg; el.className = 'rsw-status ' + (kind || 'info'); }
    }
    function markActive(){
        const cur = draft || applied;
        document.querySelectorAll('[data-rsw-theme]').forEach(b=>b.classList.toggle('active', b.dataset.rswTheme===cur.theme));
        document.querySelectorAll('[data-rsw-font]').forEach(b=>b.classList.toggle('active', b.dataset.rswFont===cur.font));
    }
    function renderAdmin(containerId){
        const box = document.getElementById(containerId);
        if(!box) return;
        Object.keys(FONTS).forEach(loadFont);
        draft = { ...siteStyle }; previewing = false;
        box.innerHTML = `
            <div class="rsw-lbl">Colour theme</div>
            <div class="rsw-grid">
                ${Object.entries(THEMES).map(([id,t])=>`
                    <button type="button" class="rsw-opt" data-rsw-theme="${id}">
                        <div class="rsw-sw">${swatchHTML(id)}</div>
                        <div class="rsw-name">${t.label}</div>
                        <div class="rsw-note">${t.note}</div>
                    </button>`).join('')}
            </div>
            <div class="rsw-lbl">Font style</div>
            <div class="rsw-grid">
                ${Object.entries(FONTS).map(([id,f])=>`
                    <button type="button" class="rsw-opt" data-rsw-font="${id}">
                        <div class="rsw-aa" style="--aa-font:${f.head}">Aa</div>
                        <div class="rsw-name">${f.label}</div>
                        <div class="rsw-note">${f.head.split(',')[0].replace(/'/g,'')} + ${f.body.split(',')[0].replace(/'/g,'')}</div>
                    </button>`).join('')}
            </div>
            <div class="rsw-actions">
                <button type="button" class="btn-primary" data-rsw-save style="font-size:.88rem;">💾 Save as Website Style</button>
                <button type="button" class="btn-outline" data-rsw-undo style="font-size:.88rem;">↺ Undo Preview</button>
            </div>
            <div class="rsw-status info" id="rswStatus">Click a theme or font to preview it. Visitors only see it after you save.</div>`;
        box.onclick = e=>{
            const t = e.target.closest('[data-rsw-theme]');
            const f = e.target.closest('[data-rsw-font]');
            if(t || f){
                if(t) draft.theme = t.dataset.rswTheme;
                if(f) draft.font = f.dataset.rswFont;
                previewing = true;
                apply(draft.theme, draft.font);
                setStatus('Previewing — not saved yet.', 'info');
            }
            if(e.target.closest('[data-rsw-undo]')){
                draft = { ...siteStyle }; previewing = false;
                apply(siteStyle.theme, siteStyle.font);
                setStatus('Back to the saved website style.', 'info');
            }
            if(e.target.closest('[data-rsw-save]')) save();
        };
        markActive();
    }
    function save(){
        const db = getDb();
        if(!db){ setStatus('Could not reach the database. Check your internet connection.', 'err'); return; }
        const user = firebase.auth && firebase.auth().currentUser;
        if(!user){ setStatus('Please sign in with the owner account first (👤 Sign In), then save again.', 'err'); return; }
        const st = { theme: draft.theme, font: draft.font };
        setStatus('Saving…', 'info');
        db.collection(FS_COLLECTION).doc(FS_DOC).set({
            theme: st.theme, font: st.font,
            updatedBy: user.email || user.phoneNumber || user.uid,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }).then(()=>{
            siteStyle = st; previewing = false; writeCache(st);
            setStatus(`✓ Saved. All visitors now see ${THEMES[st.theme].label} with ${FONTS[st.font].label} fonts.`, 'ok');
        }).catch(err=>{
            console.warn('Site style save failed:', err);
            setStatus(err && err.code === 'permission-denied'
                ? 'Not allowed: your Firestore rules don’t let this account change site settings yet.'
                : 'Save failed: ' + (err && err.message || 'unknown error'), 'err');
        });
    }
    // When the admin panel closes without saving, go back to the saved style
    function revertIfPreviewing(){
        if(previewing){ previewing = false; draft = { ...siteStyle }; apply(siteStyle.theme, siteStyle.font); }
    }

    // Razorpay popup follows the current theme colour
    function patchRazorpay(){
        const R = window.Razorpay;
        if(typeof R !== 'function' || R.__rswPatched) return;
        function Patched(opts){
            try {
                const col = getComputedStyle(document.documentElement).getPropertyValue('--crimson').trim();
                if(col) opts = Object.assign({}, opts, { theme: Object.assign({}, opts && opts.theme, { color: col }) });
            } catch(e){}
            return new R(opts);
        }
        Object.setPrototypeOf(Patched, R);
        Patched.prototype = R.prototype;
        Patched.__rswPatched = true;
        window.Razorpay = Patched;
    }

    function init(){
        loadSiteStyle();
        patchRazorpay();
        window.addEventListener('load', patchRazorpay);
    }
    if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();

    window.rswStyle = { renderAdmin, revertIfPreviewing, THEMES, FONTS };
})();
