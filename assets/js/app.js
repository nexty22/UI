/* ---------- background particles (lightweight) ---------- */
const c = document.getElementById("bg");
const ctx = c.getContext("2d");

c.width = innerWidth;
c.height = innerHeight;

let particles = [...Array(50)].map(() => ({
  x: Math.random() * c.width,
  y: Math.random() * c.height,
  vx: (Math.random() - .5) / 2,
  vy: (Math.random() - .5) / 2
}));

(function animate(){
  ctx.clearRect(0,0,c.width,c.height);
  particles.forEach(p=>{
    p.x += p.vx;
    p.y += p.vy;
    if(p.x<0||p.x>c.width) p.vx *= -1;
    if(p.y<0||p.y>c.height) p.vy *= -1;
    ctx.fillStyle="#22c55e";
    ctx.fillRect(p.x,p.y,2,2);
  });
  requestAnimationFrame(animate);
})();

/* ---------- downloader ---------- */
function start(){
  const url = document.getElementById("url").value.trim();
  const status = document.getElementById("status");

  if(!url){
    alert("Paste YouTube link");
    return;
  }

  status.innerHTML = `
    <p>Analyzing link...</p>
    <div class="progress"><span></span></div>
  `;

  fetch("https://fam-official.serv00.net/api/ytapi.php?url="+encodeURIComponent(url))
  .then(res=>res.json())
  .then(data=>{
    const f = data.formats.find(v=>v.quality==="360p");
    status.innerHTML = `
      <div class="check"></div>
      <p>Download Started</p>
    `;
    setTimeout(()=>location.href=f.url,900);
  })
  .catch(()=>{
    status.innerHTML="<p>Failed, try again</p>";
  });
}
