// 지역을 고르면 data/places.json 에서 그 지역의 장소를 카드로 보여 준다.
const regionsEl = document.getElementById('regions');
const cardsEl = document.getElementById('cards');
let places = [];
let indoorOnly = false;

function show(region) {
  for (const b of regionsEl.querySelectorAll('button')) b.setAttribute('aria-pressed', String(b.dataset.region === region));
  const list = places.filter(p => p.region === region && (!indoorOnly || p.indoor));
  cardsEl.innerHTML = list.map(p => `<li><img src="images/${p.kind}.svg" alt="">${p.indoor ? '<em class="indoor">☂ 실내</em>' : ''}<b>${p.name}</b><span>${p.desc}</span></li>`).join('');
}

fetch('data/places.json')
  .then(r => r.json())
  .then(data => {
    places = data.places;
    regionsEl.innerHTML = data.regions.map(r => `<button type="button" data-region="${r}">${r}</button>`).join('');
    regionsEl.addEventListener('click', e => { const b = e.target.closest('button'); if (b) show(b.dataset.region); });
    const toggle = document.getElementById('indoor');
    toggle.addEventListener('click', () => { indoorOnly = !indoorOnly; toggle.setAttribute('aria-pressed', String(indoorOnly)); show(document.querySelector('#regions [aria-pressed="true"]').dataset.region); });
    show(data.regions[0]);
  });
