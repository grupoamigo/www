/*!
 * Grupo Amigo — GDPR Cookie Consent
 * Google Consent Mode v2 + multi-language banner & preferences modal.
 * Self-contained: injects its own CSS, no jQuery dependency.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'ga_consent_v1';
  var PRIVACY_URL = '/aviso_privacidad.html';
  /* Per-language cookies-policy page (Spanish is the base file) */
  var POLICY_URLS = {
    es: '/legal/cookies.html',
    en: '/legal/cookies-en.html',
    nl: '/legal/cookies-nl.html',
    ja: '/legal/cookies-ja.html',
    ko: '/legal/cookies-ko.html',
    zh: '/legal/cookies-zh.html'
  };
  function policyUrl() { return POLICY_URLS[lang()] || POLICY_URLS.es; }

  // ----- i18n ----------------------------------------------------------------
  var I18N = {
    es: {
      title: 'Privacidad y cookies',
      body:  'Usamos cookies necesarias para que el sitio funcione y, con tu consentimiento, cookies de análisis y publicidad (Google Ads, Google Analytics) para medir campañas y mejorar la experiencia. Puedes aceptar, rechazar o personalizar tu elección.',
      accept: 'Aceptar todo',
      reject: 'Rechazar',
      customize: 'Personalizar',
      save: 'Guardar preferencias',
      policy: 'Política de cookies',
      privacy: 'Aviso de privacidad',
      manageTitle: 'Preferencias de cookies',
      manageBody: 'Controla qué cookies se cargan en tu navegador. Las cookies necesarias no se pueden desactivar.',
      cats: {
        necessary: { name: 'Necesarias', desc: 'Imprescindibles para la navegación, seguridad y formularios. Siempre activas.' },
        analytics: { name: 'Analítica',  desc: 'Nos ayudan a entender cómo se usa el sitio (Google Analytics).' },
        marketing: { name: 'Marketing',  desc: 'Permiten medir y personalizar campañas publicitarias (Google Ads).' }
      },
      always: 'Siempre activas',
      manageLink: 'Gestionar cookies',
      close: 'Cerrar',
      embedTitle: 'Mapa de Google',
      embedBody:  'Para mostrar este mapa, Google recibirá tu dirección IP. Carga el mapa sólo si lo aceptas.',
      embedLoad:  'Cargar el mapa',
      embedAlways:'Aceptar siempre los mapas'
    },
    en: {
      title: 'Privacy & cookies',
      body:  'We use necessary cookies to make the site work and, with your consent, analytics and advertising cookies (Google Ads, Google Analytics) to measure campaigns and improve your experience. You can accept, reject or customize your choice.',
      accept: 'Accept all',
      reject: 'Reject',
      customize: 'Customize',
      save: 'Save preferences',
      policy: 'Cookie policy',
      privacy: 'Privacy notice',
      manageTitle: 'Cookie preferences',
      manageBody: 'Control which cookies are set in your browser. Necessary cookies cannot be turned off.',
      cats: {
        necessary: { name: 'Necessary', desc: 'Essential for navigation, security and forms. Always on.' },
        analytics: { name: 'Analytics', desc: 'Help us understand how the site is used (Google Analytics).' },
        marketing: { name: 'Marketing', desc: 'Let us measure and personalize advertising campaigns (Google Ads).' }
      },
      always: 'Always on',
      manageLink: 'Manage cookies',
      close: 'Close',
      embedTitle: 'Google Maps',
      embedBody:  'To show this map, Google will receive your IP address. Load the map only if you accept.',
      embedLoad:  'Load the map',
      embedAlways:'Always accept maps'
    },
    nl: {
      title: 'Privacy & cookies',
      body:  'We gebruiken noodzakelijke cookies om de site te laten werken en, met jouw toestemming, analytische en marketingcookies (Google Ads, Google Analytics) om campagnes te meten en de ervaring te verbeteren. Je kunt accepteren, weigeren of zelf instellen.',
      accept: 'Alles accepteren',
      reject: 'Weigeren',
      customize: 'Aanpassen',
      save: 'Voorkeuren opslaan',
      policy: 'Cookiebeleid',
      privacy: 'Privacyverklaring',
      manageTitle: 'Cookievoorkeuren',
      manageBody: 'Bepaal welke cookies in je browser worden geplaatst. Noodzakelijke cookies kunnen niet worden uitgeschakeld.',
      cats: {
        necessary: { name: 'Noodzakelijk', desc: 'Essentieel voor navigatie, beveiliging en formulieren. Altijd actief.' },
        analytics: { name: 'Analytisch',   desc: 'Helpen ons begrijpen hoe de site wordt gebruikt (Google Analytics).' },
        marketing: { name: 'Marketing',    desc: 'Voor het meten en personaliseren van advertentiecampagnes (Google Ads).' }
      },
      always: 'Altijd actief',
      manageLink: 'Cookies beheren',
      close: 'Sluiten',
      embedTitle: 'Google Maps',
      embedBody:  'Om deze kaart te tonen, ontvangt Google je IP-adres. Laad de kaart alleen als je dit accepteert.',
      embedLoad:  'Kaart laden',
      embedAlways:'Kaarten altijd accepteren'
    },
    ja: {
      title: 'プライバシーとクッキー',
      body:  '本サイトの動作に必要なクッキーに加え、お客様の同意のもとで分析・広告クッキー（Google 広告、Google アナリティクス）を使用し、キャンペーンの測定と体験向上に役立てます。同意・拒否・カスタマイズを選択できます。',
      accept: 'すべて同意',
      reject: '拒否',
      customize: 'カスタマイズ',
      save: '設定を保存',
      policy: 'クッキーポリシー',
      privacy: 'プライバシー通知',
      manageTitle: 'クッキー設定',
      manageBody: 'ブラウザに保存するクッキーを管理できます。必要なクッキーはオフにできません。',
      cats: {
        necessary: { name: '必須',  desc: 'ナビゲーション、セキュリティ、フォームに必須です。常時オン。' },
        analytics: { name: '分析',  desc: 'サイトの利用状況の把握に役立ちます（Google アナリティクス）。' },
        marketing: { name: 'マーケティング', desc: '広告キャンペーンの測定と最適化に使用します（Google 広告）。' }
      },
      always: '常時オン',
      manageLink: 'クッキー設定',
      close: '閉じる',
      embedTitle: 'Google マップ',
      embedBody:  'この地図を表示するには、お客様の IP アドレスが Google に送信されます。同意される場合のみ地図を読み込んでください。',
      embedLoad:  '地図を読み込む',
      embedAlways:'常にマップを許可'
    },
    ko: {
      title: '개인정보 및 쿠키',
      body:  '사이트 작동에 필요한 쿠키와, 귀하의 동의 하에 분석 및 광고 쿠키(Google Ads, Google Analytics)를 사용하여 캠페인 측정과 경험 개선에 활용합니다. 동의·거부·맞춤설정 중 선택할 수 있습니다.',
      accept: '모두 동의',
      reject: '거부',
      customize: '맞춤설정',
      save: '환경설정 저장',
      policy: '쿠키 정책',
      privacy: '개인정보 안내',
      manageTitle: '쿠키 환경설정',
      manageBody: '브라우저에 설정되는 쿠키를 관리합니다. 필수 쿠키는 해제할 수 없습니다.',
      cats: {
        necessary: { name: '필수',    desc: '탐색·보안·양식에 필수입니다. 항상 켜져 있습니다.' },
        analytics: { name: '분석',    desc: '사이트 사용 패턴 분석에 사용합니다(Google Analytics).' },
        marketing: { name: '마케팅',  desc: '광고 캠페인의 측정 및 개인화에 사용합니다(Google Ads).' }
      },
      always: '항상 켜짐',
      manageLink: '쿠키 관리',
      close: '닫기',
      embedTitle: 'Google 지도',
      embedBody:  '이 지도를 표시하려면 사용자의 IP 주소가 Google에 전송됩니다. 동의하시는 경우에만 지도를 로드하세요.',
      embedLoad:  '지도 불러오기',
      embedAlways:'지도 항상 허용'
    },
    zh: {
      title: '隐私与 Cookie',
      body:  '我们使用必要 Cookie 以保证网站正常运行；在您同意的前提下，使用分析与广告 Cookie（Google Ads、Google Analytics）以衡量营销效果并改善您的体验。您可选择接受、拒绝或自定义。',
      accept: '全部接受',
      reject: '拒绝',
      customize: '自定义',
      save: '保存偏好',
      policy: 'Cookie 政策',
      privacy: '隐私声明',
      manageTitle: 'Cookie 偏好',
      manageBody: '管理浏览器中存放的 Cookie。必要 Cookie 无法关闭。',
      cats: {
        necessary: { name: '必要',  desc: '用于导航、安全与表单，始终启用。' },
        analytics: { name: '分析',  desc: '帮助我们了解网站使用情况（Google Analytics）。' },
        marketing: { name: '营销',  desc: '用于衡量与个性化广告投放（Google Ads）。' }
      },
      always: '始终启用',
      manageLink: '管理 Cookie',
      close: '关闭',
      embedTitle: 'Google 地图',
      embedBody:  '加载该地图需要将您的 IP 地址发送至 Google。仅在您同意时加载地图。',
      embedLoad:  '加载地图',
      embedAlways:'始终允许地图'
    }
  };

  function lang() {
    var l = (document.documentElement.lang || 'es').toLowerCase().slice(0, 2);
    return I18N[l] ? l : 'es';
  }
  function t() { return I18N[lang()]; }

  // ----- Storage -------------------------------------------------------------
  function loadConsent() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var v = JSON.parse(raw);
      if (!v || typeof v !== 'object' || !v.choice) return null;
      return v;
    } catch (e) { return null; }
  }
  function saveConsent(choice, cats) {
    var payload = {
      v: 1,
      choice: choice,                 // 'accept' | 'reject' | 'custom'
      analytics: !!cats.analytics,
      marketing: !!cats.marketing,
      ts: new Date().toISOString()
    };
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(payload)); } catch (e) {}
    return payload;
  }

  // ----- Google Consent Mode v2 ---------------------------------------------
  // Defaults are set BEFORE gtag.js loads via the inline snippet in each page.
  // Here we only push updates.
  function applyConsent(payload) {
    window.dataLayer = window.dataLayer || [];
    function gtag(){ window.dataLayer.push(arguments); }
    gtag('consent', 'update', {
      ad_storage:            payload.marketing ? 'granted' : 'denied',
      ad_user_data:          payload.marketing ? 'granted' : 'denied',
      ad_personalization:    payload.marketing ? 'granted' : 'denied',
      analytics_storage:     payload.analytics ? 'granted' : 'denied',
      functionality_storage: 'granted',
      security_storage:      'granted'
    });
  }

  // ----- Styles --------------------------------------------------------------
  var CSS = [
    '.ga-cc, .ga-cc * { box-sizing: border-box; }',
    '.ga-cc { position: fixed; left: 16px; right: 16px; bottom: 16px; z-index: 100000; font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #F4EFE6; }',
    '.ga-cc-bar { max-width: 1080px; margin: 0 auto; background: rgba(26,24,19,0.96); -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px); border: 1px solid rgba(244,239,230,0.10); border-radius: 14px; padding: 20px 22px; box-shadow: 0 18px 60px rgba(0,0,0,0.45); display: grid; grid-template-columns: 1fr auto; gap: 20px; align-items: center; }',
    '@media (max-width: 760px) { .ga-cc-bar { grid-template-columns: 1fr; padding: 18px; } }',
    '.ga-cc-copy h3 { margin: 0 0 6px; font-size: 14px; font-weight: 600; letter-spacing: 0.02em; color: #F9B400; }',
    '.ga-cc-copy p { margin: 0; font-size: 13px; line-height: 1.55; color: #C9C2B4; }',
    '.ga-cc-copy a { color: #F4EFE6; text-decoration: underline; text-underline-offset: 2px; }',
    '.ga-cc-actions { display: flex; gap: 8px; flex-wrap: wrap; justify-content: flex-end; }',
    '@media (max-width: 760px) { .ga-cc-actions { justify-content: stretch; } .ga-cc-actions .ga-btn { flex: 1 1 calc(50% - 4px); } }',
    '.ga-btn { appearance: none; -webkit-appearance: none; border: 1px solid transparent; font-family: inherit; font-size: 13px; font-weight: 600; letter-spacing: 0.02em; padding: 11px 18px; border-radius: 9px; cursor: pointer; transition: background .18s ease, border-color .18s ease, color .18s ease, transform .18s ease; }',
    '.ga-btn:focus-visible { outline: 2px solid #F9B400; outline-offset: 2px; }',
    /* Reject + Accept share equal visual weight (CNIL/EDPB compliance) */
    '.ga-btn-primary  { background: #F9B400; color: #1A1813; }',
    '.ga-btn-primary:hover { background: #FFC633; }',
    '.ga-btn-equal { background: #F4EFE6; color: #1A1813; }',
    '.ga-btn-equal:hover { background: #FFFFFF; }',
    '.ga-btn-outline { background: transparent; color: #F4EFE6; border-color: rgba(244,239,230,0.28); }',
    '.ga-btn-outline:hover { border-color: rgba(244,239,230,0.6); }',
    '.ga-cc-overlay { position: fixed; inset: 0; background: rgba(10,9,7,0.62); -webkit-backdrop-filter: blur(4px); backdrop-filter: blur(4px); z-index: 100001; display: flex; align-items: center; justify-content: center; padding: 16px; }',
    '.ga-cc-modal { background: #1A1813; color: #F4EFE6; border: 1px solid rgba(244,239,230,0.10); border-radius: 16px; max-width: 560px; width: 100%; max-height: 90vh; overflow: auto; box-shadow: 0 30px 80px rgba(0,0,0,0.6); }',
    '.ga-cc-modal-head { padding: 22px 56px 8px 24px; position: relative; }',
    '.ga-cc-modal-head h3 { margin: 0 0 6px; font-size: 16px; font-weight: 600; color: #F9B400; }',
    '.ga-cc-modal-head p { margin: 0; font-size: 13px; line-height: 1.55; color: #C9C2B4; }',
    '.ga-cc-close { position: absolute; top: 16px; right: 16px; width: 32px; height: 32px; border: 0; background: transparent; color: #C9C2B4; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background .15s ease, color .15s ease; }',
    '.ga-cc-close:hover { background: rgba(244,239,230,0.08); color: #F4EFE6; }',
    '.ga-cc-close:focus-visible { outline: 2px solid #F9B400; outline-offset: 2px; }',
    '.ga-cc-close svg { width: 16px; height: 16px; }',
    '.ga-cc-modal-body { padding: 14px 24px; display: grid; gap: 12px; }',
    '.ga-cc-cat { border: 1px solid rgba(244,239,230,0.10); border-radius: 11px; padding: 14px 16px; display: grid; grid-template-columns: 1fr auto; gap: 12px; align-items: start; }',
    '.ga-cc-cat-name { font-size: 13px; font-weight: 600; color: #F4EFE6; margin: 0 0 4px; letter-spacing: 0.01em; }',
    '.ga-cc-cat-desc { font-size: 12.5px; color: #A29B8E; line-height: 1.5; margin: 0; }',
    '.ga-switch { position: relative; width: 40px; height: 22px; flex: none; }',
    '.ga-switch input { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0; margin: 0; cursor: pointer; }',
    '.ga-switch .ga-track { position: absolute; inset: 0; background: rgba(244,239,230,0.18); border-radius: 999px; transition: background .18s ease; }',
    '.ga-switch .ga-thumb { position: absolute; top: 2px; left: 2px; width: 18px; height: 18px; background: #F4EFE6; border-radius: 50%; transition: transform .18s ease; }',
    '.ga-switch input:checked + .ga-track { background: #F9B400; }',
    '.ga-switch input:checked + .ga-track + .ga-thumb { transform: translateX(18px); }',
    '.ga-switch.is-locked .ga-track { background: rgba(249,180,0,0.55); }',
    '.ga-switch.is-locked input { cursor: not-allowed; }',
    '.ga-cc-locked-label { font-size: 11px; color: #F9B400; letter-spacing: 0.08em; text-transform: uppercase; align-self: center; }',
    '.ga-cc-modal-foot { padding: 14px 24px 22px; display: flex; gap: 8px; justify-content: flex-end; flex-wrap: wrap; }',
    '@media (max-width: 480px) { .ga-cc-modal-foot { justify-content: stretch; } .ga-cc-modal-foot .ga-btn { flex: 1 1 calc(50% - 4px); } }',
    '.ga-cc-links { margin-top: 10px; font-size: 12px; color: #A29B8E; }',
    '.ga-cc-links a { color: #C9C2B4; text-decoration: underline; text-underline-offset: 2px; margin-right: 12px; }',
    '.ga-cc-links a:hover { color: #F4EFE6; }',
    '.ga-cc-manage-link { color: inherit; text-decoration: underline; text-underline-offset: 2px; cursor: pointer; background: none; border: 0; padding: 0; font: inherit; }',
    /* Third-party embed placeholder (Google Maps, etc.) */
    '.ga-cc-embed { position: relative; width: 100%; height: 100%; min-height: 240px; background: linear-gradient(135deg, #1A1813 0%, #2B2820 100%); color: #F4EFE6; display: flex; align-items: center; justify-content: center; border-radius: inherit; overflow: hidden; }',
    '.ga-cc-embed-inner { max-width: 420px; padding: 28px 24px; text-align: center; font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }',
    '.ga-cc-embed-inner h4 { margin: 0 0 8px; font-size: 14px; font-weight: 600; color: #F9B400; letter-spacing: 0.02em; }',
    '.ga-cc-embed-inner p { margin: 0 0 18px; font-size: 13px; line-height: 1.55; color: #C9C2B4; }',
    '.ga-cc-embed-inner .ga-btn + .ga-btn { margin-left: 8px; }',
    '.ga-cc-embed iframe { width: 100%; height: 100%; border: 0; display: block; }'
  ].join('\n');

  function injectStyles() {
    if (document.getElementById('ga-cc-styles')) return;
    var s = document.createElement('style');
    s.id = 'ga-cc-styles';
    s.appendChild(document.createTextNode(CSS));
    document.head.appendChild(s);
  }

  // ----- DOM -----------------------------------------------------------------
  function el(tag, attrs, kids) {
    var n = document.createElement(tag);
    if (attrs) for (var k in attrs) {
      if (k === 'class') n.className = attrs[k];
      else if (k === 'html') n.innerHTML = attrs[k];
      else if (k.indexOf('on') === 0) n.addEventListener(k.slice(2), attrs[k]);
      else n.setAttribute(k, attrs[k]);
    }
    (kids || []).forEach(function (c) { if (c) n.appendChild(c); });
    return n;
  }

  function buildBanner() {
    var L = t();
    var existing = document.getElementById('ga-cc-banner');
    if (existing) existing.remove();

    var copy = el('div', { class: 'ga-cc-copy' }, [
      el('h3', { html: L.title }),
      el('p',  { html: L.body + ' <a href="' + policyUrl() + '">' + L.policy + '</a> · <a href="' + PRIVACY_URL + '">' + L.privacy + '</a>' })
    ]);

    var actions = el('div', { class: 'ga-cc-actions' }, [
      el('button', { class: 'ga-btn ga-btn-outline', type: 'button', onclick: openModal }, [document.createTextNode(L.customize)]),
      el('button', { class: 'ga-btn ga-btn-equal',   type: 'button', onclick: function(){ choose('reject'); } }, [document.createTextNode(L.reject)]),
      el('button', { class: 'ga-btn ga-btn-primary', type: 'button', onclick: function(){ choose('accept'); } }, [document.createTextNode(L.accept)])
    ]);

    var bar = el('div', { class: 'ga-cc-bar', role: 'region', 'aria-label': L.title }, [copy, actions]);
    var root = el('div', { class: 'ga-cc', id: 'ga-cc-banner' }, [bar]);
    document.body.appendChild(root);
  }

  function destroyBanner() {
    var b = document.getElementById('ga-cc-banner');
    if (b) b.remove();
  }

  function buildModal(initial) {
    var L = t();
    var existing = document.getElementById('ga-cc-modal');
    if (existing) existing.remove();

    var state = {
      analytics: initial ? !!initial.analytics : false,
      marketing: initial ? !!initial.marketing : false
    };

    function cat(key, locked) {
      var c = L.cats[key];
      var sw;
      if (locked) {
        sw = el('div', { class: 'ga-cc-locked-label' }, [document.createTextNode(L.always)]);
      } else {
        var input = el('input', { type: 'checkbox', 'aria-label': c.name });
        input.checked = !!state[key];
        input.addEventListener('change', function () { state[key] = input.checked; });
        sw = el('label', { class: 'ga-switch' }, [
          input,
          el('span', { class: 'ga-track' }),
          el('span', { class: 'ga-thumb' })
        ]);
      }
      return el('div', { class: 'ga-cc-cat' }, [
        el('div', null, [
          el('p', { class: 'ga-cc-cat-name', html: c.name }),
          el('p', { class: 'ga-cc-cat-desc', html: c.desc })
        ]),
        sw
      ]);
    }

    var body = el('div', { class: 'ga-cc-modal-body' }, [
      cat('necessary', true),
      cat('analytics', false),
      cat('marketing', false)
    ]);

    var foot = el('div', { class: 'ga-cc-modal-foot' }, [
      el('button', { class: 'ga-btn ga-btn-equal',   type: 'button', onclick: function(){ choose('reject'); } }, [document.createTextNode(L.reject)]),
      el('button', { class: 'ga-btn ga-btn-primary', type: 'button', onclick: function(){ choose('custom', state); } }, [document.createTextNode(L.save)])
    ]);

    var closeBtn = el('button', {
      class: 'ga-cc-close', type: 'button', 'aria-label': L.close, onclick: closeModal,
      html: '<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 3L13 13M13 3L3 13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>'
    });

    var head = el('div', { class: 'ga-cc-modal-head' }, [
      el('h3', { html: L.manageTitle }),
      el('p',  { html: L.manageBody + ' <a href="' + policyUrl() + '">' + L.policy + '</a>' }),
      closeBtn
    ]);

    var modal   = el('div', { class: 'ga-cc-modal', role: 'dialog', 'aria-modal': 'true', 'aria-label': L.manageTitle }, [head, body, foot]);
    var overlay = el('div', { class: 'ga-cc-overlay', id: 'ga-cc-modal', onclick: function(e){ if (e.target === overlay) closeModal(); } }, [modal]);

    /* Remember what had focus, so we can restore it on close (WCAG 2.4.3) */
    modalReturnFocus = document.activeElement;
    document.body.appendChild(overlay);
    document.addEventListener('keydown', modalKeyHandler);

    /* Move focus into the dialog (first interactive element after the close button) */
    var firstInteractive = modal.querySelector('input, button, [tabindex]:not([tabindex="-1"])');
    if (firstInteractive) firstInteractive.focus();
  }

  var modalReturnFocus = null;
  function modalKeyHandler(e) {
    if (e.key === 'Escape') { closeModal(); return; }
    if (e.key !== 'Tab') return;
    /* Focus trap */
    var modal = document.querySelector('#ga-cc-modal .ga-cc-modal');
    if (!modal) return;
    var focusables = modal.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    if (!focusables.length) return;
    var first = focusables[0], last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
    else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
  }
  function closeModal() {
    var m = document.getElementById('ga-cc-modal');
    if (m) m.remove();
    document.removeEventListener('keydown', modalKeyHandler);
    /* Restore focus to whatever triggered the modal */
    if (modalReturnFocus && typeof modalReturnFocus.focus === 'function') {
      try { modalReturnFocus.focus(); } catch (e) {}
    }
    modalReturnFocus = null;
  }
  function openModal() {
    buildModal(loadConsent());
  }

  function choose(choice, customCats) {
    var cats;
    if (choice === 'accept')      cats = { analytics: true,  marketing: true  };
    else if (choice === 'reject') cats = { analytics: false, marketing: false };
    else                          cats = { analytics: !!(customCats && customCats.analytics),
                                            marketing: !!(customCats && customCats.marketing) };
    var payload = saveConsent(choice, cats);
    applyConsent(payload);
    closeModal();
    destroyBanner();
    initEmbeds(); // auto-load embeds if user just granted marketing consent
  }

  // ----- Third-party embed gating -------------------------------------------
  // <div data-embed="map" data-embed-src="..." data-embed-title="..."></div>
  function loadEmbed(host) {
    var src = host.getAttribute('data-embed-src');
    if (!src) return;
    var iframe = document.createElement('iframe');
    iframe.setAttribute('loading', 'lazy');
    iframe.setAttribute('src', src);
    iframe.setAttribute('title', host.getAttribute('data-embed-title') || '');
    iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
    host.innerHTML = '';
    host.appendChild(iframe);
    host.setAttribute('data-embed-loaded', '1');
  }

  function renderEmbedPlaceholder(host) {
    var L = t();
    host.innerHTML = '';
    var inner = el('div', { class: 'ga-cc-embed-inner' }, [
      el('h4', { html: L.embedTitle }),
      el('p',  { html: L.embedBody }),
      el('div', null, [
        el('button', { class: 'ga-btn ga-btn-equal',   type: 'button', onclick: function () { loadEmbed(host); } }, [document.createTextNode(L.embedLoad)]),
        el('button', { class: 'ga-btn ga-btn-primary', type: 'button', onclick: function () {
          var prev = loadConsent() || { analytics: false, marketing: false };
          var payload = saveConsent('custom', { analytics: prev.analytics, marketing: true });
          applyConsent(payload);
          destroyBanner();
          initEmbeds();
        } }, [document.createTextNode(L.embedAlways)])
      ])
    ]);
    var wrap = el('div', { class: 'ga-cc-embed' }, [inner]);
    host.appendChild(wrap);
  }

  function initEmbeds() {
    var consent = loadConsent();
    var auto = !!(consent && consent.marketing);
    var hosts = document.querySelectorAll('[data-embed]');
    for (var i = 0; i < hosts.length; i++) {
      var h = hosts[i];
      if (h.getAttribute('data-embed-loaded') === '1') continue;
      if (auto) loadEmbed(h); else renderEmbedPlaceholder(h);
    }
  }

  // ----- Public API ----------------------------------------------------------
  window.GACookies = {
    open: openModal,
    reset: function () {
      try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
      destroyBanner();
      closeModal();
      init();
    }
  };

  // ----- Init ----------------------------------------------------------------
  function bindManageLinks() {
    var links = document.querySelectorAll('[data-cookie-manage], a[href="#manage-cookies"]');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', function (e) { e.preventDefault(); openModal(); });
    }
  }

  function init() {
    injectStyles();
    bindManageLinks();
    initEmbeds();
    var saved = loadConsent();
    if (saved) {
      applyConsent(saved); // re-assert on every page load
      return;
    }
    buildBanner();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
