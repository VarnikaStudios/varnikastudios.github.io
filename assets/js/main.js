(() => {
  const languageButton = document.querySelector('#language');
  let language = 'en';
  try { language = localStorage.getItem('varnika-language') === 'hi' ? 'hi' : 'en'; } catch (_) {}
  function translate() {
    document.documentElement.lang = language;
    document.querySelectorAll("[data-label-en]").forEach(el => el.setAttribute("aria-label", el.dataset[language === "en" ? "labelEn" : "labelHi"]));
    document.querySelectorAll('[data-en][data-hi]').forEach(el => { el.innerHTML = el.dataset[language]; });
    languageButton.textContent = language === 'en' ? 'हिंदी' : 'English';
    languageButton.setAttribute('aria-label', language === 'en' ? 'Switch to Hindi' : 'Switch to English');
    document.querySelector('nav').setAttribute('aria-label', language === 'en' ? 'Main navigation' : 'मुख्य नेविगेशन');
    document.querySelector('#menu').setAttribute('aria-label', language === 'en' ? 'Toggle menu' : 'मेन्यू खोलें या बंद करें');
    const titles = {'index.html':['Thoughtful brands. Meaningful growth.','आपकी पहचान। सार्थक विकास।'],'services.html':['Services & packages','सेवाएँ और पैकेज'],'small-business.html':['For small & medium businesses','छोटे और मध्यम व्यवसायों के लिए'],'politicians.html':['For public leaders','जनप्रतिनिधियों के लिए'],'influencers.html':['For influencers & creators','इन्फ्लुएंसर्स और क्रिएटर्स के लिए'],'contact.html':['Let’s talk','आइए, बात करें']};
    const current = location.pathname.split('/').pop() || 'index.html';
    if (titles[current]) document.title = titles[current][language === 'en' ? 0 : 1] + ' — Varnika Studios';
  }
  languageButton.addEventListener('click', () => { language = language === 'en' ? 'hi' : 'en'; try { localStorage.setItem('varnika-language', language); } catch (_) {} translate(); });
  translate();
  const menu = document.querySelector('#menu');
  menu.addEventListener('click', () => { const open = document.querySelector('nav').classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') { document.querySelector('nav').classList.remove('open'); menu.setAttribute('aria-expanded','false'); } });
  document.querySelectorAll('nav a').forEach(a => { if (a.getAttribute('href') === location.pathname.split('/').pop()) a.setAttribute('aria-current','page'); a.addEventListener('click', () => { document.querySelector('nav').classList.remove('open'); menu.setAttribute('aria-expanded','false'); }); });
  const form = document.querySelector('#brief-form');
  if(form) form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const content = language === 'hi' ? `Varnika Studios — प्रोजेक्ट ब्रीफ़\n\nनाम: ${data.get('name')}\nज़रूरत: ${document.querySelector('#type').selectedOptions[0].textContent}\nलक्ष्य: ${data.get('message')}\n` : `Varnika Studios — Project brief\n\nName: ${data.get('name')}\nFor: ${data.get('type')}\nGoals: ${data.get('message')}\n`;
    const url = URL.createObjectURL(new Blob(['\uFEFF',content], {type:'text/plain;charset=utf-8'}));
    const anchor = document.createElement('a'); anchor.href = url; anchor.download = 'varnika-project-brief.txt'; anchor.click(); setTimeout(() => URL.revokeObjectURL(url),1000);
    document.querySelector('#form-status').textContent = language === 'hi' ? 'आपका ब्रीफ़ डाउनलोड हो गया। बातचीत शुरू करते समय इसे साझा करें।' : 'Your brief has been downloaded. Share it with us when you connect.';
  });
})();
