;
//asignar un nombre y versión al cache
const CACHE_NAME = 'v1_cache',
    urlsToCache = [
        './',
        'https://fonts.googleapis.com/css?family=Nunito+Sans:200,300,400,700,900',
        'fonts/icomoon/style.css',
        'css/magnific-popup.css',
        'css/jquery-ui.css',
        'css/owl.carousel.min.css',
        './script.js',
        './images/daico.png',
        './images/favicon.png',
        'css/owl.theme.default.min.css',
        'css/bootstrap-datepicker.css',
        'fonts/flaticon/font/flaticon.css',
        'css/aos.css',
        'css/style.css',
        'js/jquery-3.3.1.min.js',
        'js/jquery-migrate-3.0.1.min.js',
        'js/jquery-ui.js',
        'js/popper.min.js',
        'js/bootstrap.min.js',
        'js/owl.carousel.min.js',
        'js/jquery.stellar.min.js',
        'js/jquery.countdown.min.js',
        'js/jquery.magnific-popup.min.js',
        'js/bootstrap-datepicker.min.js',
        'js/aos.js',
        'js/main.js',
        'images/icon_32',
        'images/icon_64',
        'images/icon_96',
        'images/icon_128',
        'images/icon_192',
        'images/icon_256',
        'images/icon_384',
        'images/icon_512',
        'images/icon_1024',
    ]

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache)
                .then(() => self.skipWaiting())
        })
        .catch(err => console.log('Falló registro de cache', err))
    )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME]

    e.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    //Eliminamos lo que ya no se necesita en cache
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName)
                    }
                })
            )
        })
        // Le indica al SW activar el cache actual
        .then(() => self.clients.claim())
    )
})

//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
    //Responder ya sea con el objeto en caché o continuar y buscar la url real
    e.respondWith(
        caches.match(e.request)
        .then(res => {
            if (res) {
                //recuperar del cache
                return res
            }
            //recuperar de la petición a la url
            return fetch(e.request)
        })
    )
})