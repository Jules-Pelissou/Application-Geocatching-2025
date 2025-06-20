====================================================================================================================

                                Application pour le projet Géocatching de l'Oncopole (2025)

Petite application web simple en JS qui permet de charger des fichiers en JSON pour les faire afficher sur la carte.
Le format des donnnées attendues en JSON :

{
  "x": Int/Float,
  "y": Int/Float,
  "nom": String (optionnel, peut être null)
}

Si le nom est null le nom du point sera le nom du fichier.

!! LE FORMAT DES DONNÉES EST STANDARDISÉ !!. Pas besoin de convertir les coordonnées en pixel, c'est fait par l'appli.
Les coordonnées attendues sont par exemple {"x":30, "y":30, "nom" : null}

Il est possible d'ajouter plusieurs fichiers et de garder en mémoire les points précédents. 
L'inverse est également possible, charger plusieurs fichiers mais écraser les données précédentes.

Il y a un système de gestion d'affichage des fichiers (checkbox sur le côté).
Il est possible d'ajouter et effacer de la cartes les points par fichier.
C'est également possible de supprimer un fichier en particulier via cette interface.

Enfin, y a la possibilité de supprimer l'entièreté des fichiers chargés.

La gestion d'erreur est présente, on ne peut pas upload 2 fois le même fichier normalement.
Si c'est le cas supprimez le dans le gestionnaire des fichiers à droite ou supprimer l'entièreté des fichiers.

Le style.css a été généré (il n'est pas très compréhensible).

L'appli a été montée en 1h30 max, soyez indulgeants.

====================================================================================================================

Application faite par ©Jules_PELISSOU.
