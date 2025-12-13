async function loadSites(){
  try{
    const resp = await fetch('data/sites.json');
    const sites = await resp.json();
    return sites;
  }catch(e){
    console.error('sites yüklenemedi',e);
    return [];
  }
}

function createCard(site){
  const a = document.createElement('a');
  a.className='card';
  a.href = site.url;
  a.target = '_blank';

  const logo = document.createElement('div');
  logo.className='logo';
  if(site.logo){
    const img = document.createElement('img');
    img.src = site.logo;
    img.alt = site.name+' logo';
    img.style.width='100%';
    img.style.height='100%';
    img.style.objectFit='contain';
    logo.appendChild(img);
  }else{
    logo.textContent = site.name.split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase();
  }

  const meta = document.createElement('div');
  meta.className='meta';
  const h3 = document.createElement('h3');
  h3.textContent = site.name;
  const p = document.createElement('p');
  p.textContent = site.url.replace(/^https?:\/\//,'');
  meta.appendChild(h3);
  meta.appendChild(p);

  a.appendChild(logo);
  a.appendChild(meta);
  return a;
}

async function render(){
  const grid = document.getElementById('grid');
  const sites = await loadSites();
  const search = document.getElementById('search');

  function update(){
    const q = search.value.trim().toLowerCase();
    grid.innerHTML='';
    const filtered = sites.filter(s=> s.name.toLowerCase().includes(q) || s.url.toLowerCase().includes(q));
    if(filtered.length===0){
      const e = document.createElement('div'); e.style.color='var(--muted)'; e.textContent='Eşleşen yayıncı bulunamadı.'; grid.appendChild(e); return;
    }
    filtered.forEach(s=> grid.appendChild(createCard(s)));
  }

  search.addEventListener('input', update);
  update();
}

document.addEventListener('DOMContentLoaded', render);
