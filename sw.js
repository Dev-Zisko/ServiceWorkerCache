"use strict";

let version = "version 1";

self.addEventListener("install", e => {
	console.log("Instalando ServiceWorker");
	caches.open(version).then(cache => {
		cache.add("index.html").then(res => {
			console.log("Informacion guardada en cache");
		}).catch(e => {
			console.log(e);
		});
	});
});

self.addEventListener("activate", () => {
	caches.keys().then(key => {
		return Promise.all(
			key.map(cache => {
				if (cache !== version) {
					console.log("Cache antiguo, eliminado");
					return caches.delete(cache);
				}
			})
		);
	});
});

addEventListener('fetch', e => {
	e.respondWith(async function() {
	    const cachedResponse = await caches.match(e.request);
	    if (cachedResponse) return cachedResponse;
	    return fetch(event.request);
	}());
});

self.addEventListener("message", e => {
	console.log("Mensaje recibido del navegador: ", e.data);
	e.source.postMessage("Hola Navegador");
});

