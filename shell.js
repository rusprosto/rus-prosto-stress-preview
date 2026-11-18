/* Общая обвязка интерактивов: данные урока, подпись школы, перемешивание, звук. */
const DATA = JSON.parse(document.getElementById('data').textContent);
const BRAND = JSON.parse(document.getElementById('brand').textContent);
/* Обращение школы: «ты» или «вы» из фирстиля. Все подсказки шаблонов проходят через t(). */
const VY = BRAND.address === 'вы';
const VY_MAP = [['Нажми','Нажмите'],['нажми','нажмите'],['Повтори','Повторите'],['исправь','исправьте'],['проверь','проверьте'],
  ['послушай','послушайте'],['спой','спойте'],['Пой,','Пойте,'],['слышишь','слышите'],['Разреши','Разрешите'],['обнови','обновите'],['Пройди','Пройдите']];
function t(s){ if (!VY || typeof s !== 'string') return s; for (const [a, b] of VY_MAP) s = s.split(a).join(b); return s; }
(function vyStatic(){ if (!VY) return; const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n; while ((n = w.nextNode())) n.nodeValue = t(n.nodeValue); })();
document.title = (DATA.title || 'Урок') + ' · ' + (BRAND.school || '');
document.querySelectorAll('[data-title]').forEach(e => e.textContent = DATA.title || '');
document.querySelectorAll('[data-sub]').forEach(e => { e.textContent = DATA.subtitle || ''; if (!DATA.subtitle) e.remove(); });
(function footer(){
  const f = document.querySelector('footer'); if (!f) return;
  const c = BRAND.contacts || {}; const link = c.telegram || c.whatsapp || c.site || '';
  f.innerHTML = '';
  const s = document.createElement('span'); s.textContent = BRAND.school ? 'Школа «' + BRAND.school + '»' : ''; f.appendChild(s);
  if (link) { f.appendChild(document.createTextNode(' · ')); const a = document.createElement('a'); a.href = link; a.target = '_blank'; a.rel = 'noopener'; a.textContent = 'Записаться'; f.appendChild(a); }
})();
function shuffle(a){ a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function el(tag, cls, text){ const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
let _ac = null;
function audio(){ if (!_ac) _ac = new (window.AudioContext || window.webkitAudioContext)(); if (_ac.state === 'suspended') _ac.resume(); return _ac; }
function beep(ok){ try { const ac = audio(), o = ac.createOscillator(), g = ac.createGain(); o.frequency.value = ok ? 880 : 220; g.gain.setValueAtTime(.08, ac.currentTime); g.gain.exponentialRampToValueAtTime(.0001, ac.currentTime + .25); o.connect(g).connect(ac.destination); o.start(); o.stop(ac.currentTime + .26); } catch (e) {} }
