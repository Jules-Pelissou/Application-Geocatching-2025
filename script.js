
// Hauteur / Largeur de l'img
const imageWidth = 945;
const imageHeight = 806;

// Création de la carte 
var map = L.map('map', {
    crs: L.CRS.Simple, // Coordonnées en pixel et pas lat et long
    minZoom: -5,
    scrollWheelZoom: false,
    dragging: false,
});

// Pour avoir une icone rouge
const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Ajout de l'image sur la carte
var bounds = [[0, 0], [imageHeight, imageWidth]];
L.imageOverlay('ressources/plan.png', bounds).addTo(map);
map.fitBounds(bounds);


// Gestion du DOM / ajout des fichiers dans la liste.
let listeFichiers = document.getElementById('fileList')

// Structure du truc
// let memoireFichierPoints = {"fichier": {nomFichier: null, points : [{x: null, y: null, nom: null}]}};
let memoireFichierPoints = {};
// Gestion du delete des points
document.getElementById('deletePoints').addEventListener('click', function () {
    listeMarqueurs.forEach(marker => {
        map.removeLayer(marker);
    });
    listeMarqueurs.length = 0;
    memoireFichierPoints = {};
    listeFichiers.innerHTML = '';
    console.log(memoireFichierPoints)
});



// Gestion de la mémoire des marqueurs ou non
let etat = false;
document.getElementById('keep').addEventListener('change', function (e) {
    etat = e.target.checked;
});

const listeMarqueurs = [];
// Gestion de l'upload du fichier JSON
document.getElementById('fileInput').addEventListener('change', function (e) {

    L.marker()

    const file = e.target.files[0];
    const nomFichier = file.name;
    const reader = new FileReader();

    reader.onload = function (event) {
        try {
            const data = JSON.parse(event.target.result);
            const listePoints = [];

            if (etat === false) {
                memoireFichierPoints = {};
                listeFichiers.innerHTML = '';
            }

            if (memoireFichierPoints[nomFichier]) {
                alert(`Le fichier ${nomFichier} est déjà chargé.`)
                return;
            }

            // Stocker dans la mémoire sous le nom du fichier
            data.forEach(p => {
                let x = parseFloat(p.x);
                x = (x * 945) / 70;
                let y = parseFloat(p.y);
                y = (y * 806) / 61;
                const nom = p.nom || nomFichier;

                if (!isNaN(x) && !isNaN(y)) {
                    listePoints.push({ x, y, nom });
                }
            });

            memoireFichierPoints[nomFichier] = {
                points: listePoints,
                marqueurs: []
            };

            // Nettoyer si nécessaire
            if (etat === false) {
                listeMarqueurs.forEach(marker => map.removeLayer(marker));
                listeMarqueurs.length = 0;
            }

            // Afficher depuis la mémoire (pas le fichier directement)
            memoireFichierPoints[nomFichier].points.forEach(p => {
                let marker = L.marker([p.y, p.x], { icon: redIcon })
                    .addTo(map)
                    .bindPopup(p.nom);
                listeMarqueurs.push(marker);
                memoireFichierPoints[nomFichier].marqueurs.push(marker); // Pour stocker les marqueurs et les retier avec les checkboxs après
            });

            // Création de la liste des fichiers dans le DOM + gestion avec les checkboxs
            let point = document.createElement('label');
            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = nomFichier;
            checkbox.checked = true;
            let suppression = document.createElement('button');
            suppression.textContent = 'Supprimer';
            suppression.className = 'deleteButton';
            suppression.addEventListener('click', function () {
                // Supprimer les marqueurs de la carte
                memoireFichierPoints[nomFichier].marqueurs.forEach(marker => {
                    map.removeLayer(marker);
                });
                delete memoireFichierPoints[nomFichier];
                // Supprimer l'élément du DOM
                listeFichiers.removeChild(point);
            });

            // Gestion avec les checkboxs de l'affichage des points
            checkbox.addEventListener('change', function () {
                if (this.checked) {
                    memoireFichierPoints[nomFichier].points.forEach(p => {
                        let marker = L.marker([p.y, p.x], { icon: redIcon })
                            .addTo(map)
                            .bindPopup(p.nom);
                        listeMarqueurs.push(marker);
                        memoireFichierPoints[nomFichier].marqueurs.push(marker);
                    });
                } else {
                    memoireFichierPoints[nomFichier].marqueurs.forEach(marker => {
                        map.removeLayer(marker);
                    });
                    memoireFichierPoints[nomFichier].marqueurs = [];
                }
            });

            point.appendChild(checkbox);
            point.appendChild(document.createTextNode(' ' + nomFichier));
            point.appendChild(suppression);

            // Ajout dans le DOM
            listeFichiers.appendChild(point);


            console.log('Contenu actuel de memoireFichierPoints :', memoireFichierPoints);
        } catch (err) {
            console.error('Erreur de parsing JSON :', err);
        }
    };

    reader.readAsText(file);
    e.target.value = '';
});



// Liste des points des cartes (NE PAS TOUCHER)
L.marker([330.32786885245901639344262295082, 486]).addTo(map).bindPopup('Carte 2');
L.marker([388.46557377049180327868852459016, 392.85]).addTo(map).bindPopup('Carte 3');
L.marker([437.35409836065573770491803278689, 325.35]).addTo(map).bindPopup('Carte 4');
L.marker([488.88524590163934426229508196721, 166.05]).addTo(map).bindPopup('Carte 5');
L.marker([332.97049180327868852459016393443, 567]).addTo(map).bindPopup('Carte 6');
L.marker([43.6, 715.5]).addTo(map).bindPopup('Carte 7');
L.marker([463.78032786885245901639344262295, 571.05]).addTo(map).bindPopup('Carte 8');
L.marker([610.01639344262295081967213114754, 685.5]).addTo(map).bindPopup('Carte 9');
L.marker([158.55737704918033, 499.5]).addTo(map).bindPopup('Carte 10');