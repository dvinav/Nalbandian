const static = 'nalbandian'
const assets = ['/index.html', '/bundle.js', '/images/nopic.png', '/fonts/material-icons-round.woff', '/fonts/material-icons-round.woff2']

self.addEventListener('install', (installEvent) => {
	installEvent.waitUntil(
		caches.open(static).then((cache) => {
			cache.addAll(assets)
		})
	)
})

self.addEventListener('fetch', (fetchEvent) => {
	fetchEvent.respondWith(
		caches.match(fetchEvent.request).then((res) => {
			return res || fetch(fetchEvent.request)
		})
	)
})
