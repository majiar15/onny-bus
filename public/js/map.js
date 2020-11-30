

mapboxgl.accessToken = 'pk.eyJ1IjoibWFqaWFyIiwiYSI6ImNrYWZybXh5ZTAxeDYyeHB4eWIyZWFlZTQifQ.tpO4S2b6RQvsgRCB08joCQ';
let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-74.796387, 10.910769],
    zoom: 13
});
// let markerArray = []
let marker = new mapboxgl.Marker();
setInterval(() => {
    
    fetch('http://localhost:3000/api/rutas/asignar/getall',{
        method:'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.data.length; i++) {
            const element = data.data[i];
            
            marker 
                .setLngLat([element.conductor.longitud,element.conductor.latitud])
                .addTo(map);
       
        }
        // console.log(markerArray)
    });
}, 1000);

// var marker = new mapboxgl.Marker()
//     .setLngLat([-74.781685, 10.936199])
//     .addTo(map);
// marker = new mapboxgl.Marker()
//     .setLngLat([-74.787467, 10.927491])
//     .addTo(map);
// marker = new mapboxgl.Marker()
//     .setLngLat([-74.799795, 10.924823])
//     .addTo(map);
// marker = new mapboxgl.Marker()
//     .setLngLat([-74.796387, 10.910769])
//     .addTo(map);
// marker = new mapboxgl.Marker()
//     .setLngLat([-74.784827, 10.946970])
//     .addTo(map);
// marker = new mapboxgl.Marker()
//     .setLngLat([-74.795706, 10.946159])
//     .addTo(map);
map.on('load', function () {
    map.addSource('route', {
        'type': 'geojson',
        'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
                'type': 'LineString',
                'coordinates': [
                    [-74.796387, 10.910769],
                    [-74.799189, 10.911188],
                    [-74.799215, 10.936849],
                    [-74.799377, 10.940628],
                    [-74.799632, 10.946109],
                    [-74.795706, 10.946159],
                    [-74.794343, 10.945843],
                    [-74.784827, 10.946970],
                    [-74.781685, 10.936199],
                    [-74.781106, 10.933502],
                    [-74.782630, 10.932044],
                    [-74.782989, 10.931957],
                    [-74.783351, 10.932060],
                    [-74.783662, 10.931962],
                    [-74.783853, 10.931657],
                    [-74.783781, 10.931244],
                    [-74.783831, 10.930879],
                    [-74.787467, 10.927491],
                    [-74.790035, 10.925623],
                    [-74.792821, 10.924373],
                    [-74.799623, 10.923562],
                    [-74.800104, 10.924009],
                    [-74.800146, 10.924363],
                    [-74.800047, 10.924621],
                    [-74.799795, 10.924823],
                    [-74.799283, 10.924604],
                    [-74.799251, 10.917064],
                    [-74.793288, 10.917141],
                    [-74.792978, 10.916319],
                    [-74.792527, 10.915834],
                    [-74.792061, 10.912329],
                    [-74.792016, 10.910217],
                    [-74.799163, 10.911193],
                ]
            }
        }
    });
    map.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'line-color': '#888',
            'line-width': 8
        }
    });
});