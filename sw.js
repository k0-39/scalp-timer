// Always fetch the newest files when online; fall back to the saved copy offline.
const CACHE='scalp-timer';
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(e.request.method!=='GET'||u.origin!==location.origin)return;
  e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{
    const c=r.clone();caches.open(CACHE).then(x=>x.put(e.request,c));return r;
  }).catch(()=>caches.match(e.request,{ignoreSearch:true})));
});
