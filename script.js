"use strict";

if(!navigator.serviceWorker) {
	console.log("Tu navegador no soporta ServiceWorker");
} else {
	navigator.serviceWorker.register("sw.js");
}

navigator.serviceWorker.ready.then(res => {
	res.active.postMessage("Hola ServiceWorker");
});

navigator.serviceWorker.addEventListener("message", e => {
	console.log("Mensaje recibido del ServiceWorker: ", e.data);
})