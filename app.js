// 지역을 고르면 data/places.json 에서 그 지역의 장소를 카드로 보여 준다.
const regionsEl = document.getElementById('regions');
const cardsEl = document.getElementById('cards');
let places = [];

function show(region) {
  for (const b of regionsEl.querySelectorAll('button')) b.setAttribute('aria-pressed', String(b.dataset.region === region));
  const list = places.filter(p => p.region === region);
  cardsEl.innerHTML = list.map(p => `<li><b>${p.name}</b><span>${p.desc}</span></li>`).join('');
}

fetch('data/places.json')
  .then(r => r.json())
  .then(data => {
    places = data.places;
    regionsEl.innerHTML = data.regions.map(r => `<button type="button" data-region="${r}">${r}</button>`).join('');
    regionsEl.addEventListener('click', e => { const b = e.target.closest('button'); if (b) show(b.dataset.region); });
    show(data.regions[0]);
  });
