//Script JS permettant l'ajout de fonctionnalités à la page de notre application d'Urbex

//I - Ajout de la carte Leaflet
var carte = L.map('carte', {
    center: [45.610492, 4.841639],
    zoom: 10.5,
    zoomSnap: 0.5
});


//II - Ajout des fonds de plan
//Ajout du fond sattelite
const couche_satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Sources : <a href="https://www.esri.com/en-us/home">Esri</a> 2026',
    opacity: 0.75
});
//Ajout du fond Open Street Map
const couche_osm = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
    attribution: 'Sources : <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> 2026',
    opacity: 0.75
});
//Ajout du fond sombre (Mode nuit)
const couche_sombre = L.tileLayer('https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}.png?access-token=dhpaqij93CBcz7glk5x9cngP7l3DzKBXl1WpNs4JnsHWkm4vLNdOdovP2jkQF9rK', {
    attribution: '<a href="https://www.jawg.io">Jawg.io</a> 2026',
    opacity: 0.75
});
//Création d'une vue sans fond de plan
const sans_fond = L.tileLayer('Faux liens', {
    attribution: '2026'});
//Ajout du fond de plan par défaut
couche_satellite.addTo(carte);
//Ajout des boutons de contrôle de fond de plan pour permettre à l'utilisateur de choisir un fond de plan
L.control.layers({
    'Fond satellite': couche_satellite,
    'Fond topographique': couche_osm,
    'Fond sombre': couche_sombre,
    'Sans fond de plan': sans_fond
}).addTo(carte);


//III - Edition d'une barre d'échelle
//Ajout d'une échelle dynamique en bas à droite 
L.control.scale({
    position: 'bottomright',
    imperial: false //Pas de dédoublement de l'échelle
}).addTo(carte);


//IV - Edition d'un bouton de recentrage sur la vue initiale
//Coordonnées de la vue cible
var targetCenter = [45.610492, 4.841639];
var targetZoom = 10.5;
//Bouton HTML pour aller à la position
var goToCoordinatesButton = document.getElementById('recentrage_coordonnes');
goToCoordinatesButton.addEventListener('click', function () {
    carte.setView(targetCenter, targetZoom); //Centre la carte
});




// Chargement des données GeoJSON
var pointsUrbex = L.geoJSON(localisation_urbex, {
    pointToLayer: function(feature, latlng) {
        // Personnalisation du marqueur
        return L.marker(latlng, {
            title: feature.properties.nom, // Affiche le nom au survol
            riseOnHover: true // Le marqueur se soulève au survol
        }).bindPopup(`
            <b>${feature.properties.nom}</b><br>
            Catégorie : ${feature.properties.categorie}<br>
            Adresse : ${feature.properties.adresse}<br>
            Coordonnées : ${feature.properties.coordonnes}
        `);
    }
}).addTo(carte);