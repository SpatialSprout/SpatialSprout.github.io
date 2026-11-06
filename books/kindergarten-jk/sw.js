/* Offline mode for this book (Workbox). After a page is opened once, the book keeps working without internet:
   scripts and pictures load from the cache straight away and refresh in the background, voice clips and 3D models
   are kept after their first play. */
importScripts('wb/workbox-sw.js');
workbox.setConfig({modulePathPrefix:'wb/',debug:false});
const {registerRoute}=workbox.routing,{CacheFirst,StaleWhileRevalidate}=workbox.strategies,{ExpirationPlugin}=workbox.expiration;
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
registerRoute(({request,url})=>url.origin===self.location.origin&&(request.mode==='navigate'||/\.(js|css|json|html)$/.test(url.pathname)),new StaleWhileRevalidate({cacheName:'jk-pages'}));
registerRoute(({url})=>url.origin===self.location.origin&&/\/(voice|models)\//.test(url.pathname),new CacheFirst({cacheName:'jk-media',plugins:[new ExpirationPlugin({maxEntries:1200,purgeOnQuotaError:true})]}));
registerRoute(({url})=>/cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net|fonts\.(googleapis|gstatic)\.com/.test(url.host),new StaleWhileRevalidate({cacheName:'jk-libs'}));
