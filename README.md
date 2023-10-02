# Modules de mosaïque et filtres

## Création et mise à jour des données

Le dossier contenant les données des mosaïques est nom-mosaique du dossier integration. A l'intérieur se trouve le fichier mosaique_template.xlsm. Il possède les colonnes généralement utilisées pour la création des mosaiques. Vous pouvez ajouter ou supprimer des colonnes mais la modification sera à répercuter sur les templates du frontend. Une fois le tableau complété, aller sur l'onglet "automatisation" et cliquer sur le bouton "Mettre à jour les données". Après avoir validé l'emplacement du fichier (il pointe initialement sur le dossier data utilisé par le script), cela générera un fichier output.csv qui sera utilisé par le script.

Une entrée peut avoir plusieur catégories, elles doivent être séparées par des virgules (,).

Le fichier est à dupliqué pour chaque mosaïque.

## Encart HTML mosaique

- Les mosaïques sont appelées par les encarts ci-dessous. Chaque encart correspondt à un type de mosaïque différent.
- La source de données est chargée dans l'input ```data_url``` au format csv.
- La sélection des champs à filter et leurs label sont définis par l'attribut ```data-name```. Cet attribut créé un filtre de tri dans la mosaïque à partir des données de la colonne utilisée par le csv. Le label étant la valeur de l'attribut.

### Mosaique Survol

```html
<div class="mozaik-wrap mozaik-infoSurvol container" id="idMozaic"></div>
<template id="mozaik-template">
<li class="mozaik-item">
    <a title="#" id="mos-link" href="#">
        <div class="texte">
            <h3 class="titre" data-name="Titre" id="mos-titre"></h3>
            <p class="sous-titre" id="mos-sous_titre"></p>
            <p class="categorie" data-name="Catégorie" id="mos-cat"></p>
            <p class="sous-categorie" data-name="Sous_Catégorie" id="mos-sous_cat" hidden=""></p>
            <div class="survol">
                <p class="date" data-name="Date" id="mos-date"></p>
                <p class="lieu" data-name="Lieu" id="mos-lieu"></p>
                <p class="description" id="mos-description"></p>
                <p class="btn btn-default" id="mos-button">Consulter</p>
            </div>
        </div>
        <figure><img id="mos-img" alt="" data-src="" class="lazy loaded" data-was-processed="true" /></figure>
    </a>
</li>
</template>
<input type="hidden" id="data_url" name="data_url" value="/ui/skins/MEDIA/refonte-pad/mosaiques/compositeurs/data/output.csv" />

```

### Mosaique Taille fixe

```html
<div class="mozaik-wrap container" id="idMozaic"></div>
<template id="mozaik-template">
<li class="mozaik-item">
    <a title="#" id="mos-link" href="#">
        <div class="texte">
            <h3 class="titre" data-name="Titre" id="mos-titre"></h3>
            <p class="sous-titre" id="mos-sous_titre"></p>
            <p class="categorie" data-name="Catégorie" id="mos-cat"></p>
            <p class="sous-categorie" data-name="Sous_Catégorie" id="mos-sous_cat" hidden=""></p>
            <p class="date" data-name="Date" id="mos-date"></p>
            <p class="lieu" data-name="Lieu" id="mos-lieu"></p>
            <p class="description" id="mos-description"></p>
            <p class="btn btn-default" id="mos-button">Consulter</p>
        </div>
        <figure><img id="mos-img" alt="" data-src="" class="lazy loaded" data-was-processed="true" /></figure>
    </a>
</li>
</template>
<input type="hidden" id="data_url" name="data_url" value="/ui/skins/MEDIA/refonte-pad/mosaiques/compositeurs/data/output.csv" />

```

### Mosaique Taille variable

```html
<div class="mozaik-wrap mozaik-infoSurvol container" id="idMozaic"></div>
<template id="mozaik-template">
<li class="mozaik-item">
    <a title="#" id="mos-link" href="#">
        <div class="texte">
            <h3 class="titre" data-name="Titre" id="mos-titre"></h3>
            <p class="sous-titre" id="mos-sous_titre"></p>
            <p class="categorie" data-name="Catégorie" id="mos-cat"></p>
            <p class="sous-categorie" data-name="Sous_Catégorie" id="mos-sous_cat" hidden=""></p>
            <div class="survol">
                <p class="date" data-name="Date" id="mos-date"></p>
                <p class="lieu" data-name="Lieu" id="mos-lieu"></p>
                <p class="description" id="mos-description"></p>
                <p class="btn btn-default" id="mos-button">Consulter</p>
            </div>
        </div>
        <figure><img id="mos-img" alt="" data-src="" class="lazy loaded" data-was-processed="true" /></figure>
    </a>
</li>
</template>
<input type="hidden" id="data_url" name="data_url" value="/ui/skins/MEDIA/refonte-pad/mosaiques/compositeurs/data/output.csv" />

```

## Encart des filtres

L'encart des filtres doit être placé avant l'encart de la mosaïque. Il est peuplé par le code javascript en fonction des attributs ```data-name```

```html
<nav id="filterContainer" class="Slider-wrapper scrollable" aria-label="Sommaire de la page">
    <div class="Slider-controls d-flex">
        <button class="scroll-slider-button scroll-left-slider-button hiddden mr-auto" style="display: none;"> 
            <img class="icon lazy" alt="Précédent" data-src="/ui/skins/CIMU/images/icon-left.svg" src="/ui/skins/CIMU/images/icon-left.svg" /> 
        </button>
        <button class="scroll-slider-button scroll-right-slider-button hiddden ml-auto" style="display: none;"> 
            <img class="icon lazy" alt="Suivant" data-src="/ui/skins/CIMU/images/icon-left.svg" src="/ui/skins/CIMU/images/icon-left.svg" /> 
        </button>
    </div>
</nav>

```

## Descriptions des Fonctions 

### onLibrariesLoaded

**Paramètres :** attempt_count (int), max_attempt (int)

Description :

Fonction s'assurant du chargement des bibliothèques javascript nécessaires au fonctionnement des scripts.

### isLibrariesLoaded

**Paramètres :** 

Description :

Contient les objets des bibliothèques devant être utilisées par le code. Renvois un booléen (true si toutes les blibliothèques sont chargées).

### wait_for_data

**Paramètres :** promises

Description :

Fonction récursive s'assurant du chargement des données.

### get_data

**Paramètres :** promises

Description :

Fonction se chargeant du chargement des fichiers de données.

### displayMos

**Paramètres :** data (array), idMozaic (string)

Description :

Fonction principale de la création des mosaïques. idMozaic est l'id de la balise devant afficher la mosaïque. A partir des données de data et du template fournis dans l'encart, les éléments du DOM pour l'affichage de la mosaïque sont créés et ajoutés idMozaic. 

### createFilter

**Paramètres :** idMozaic

Description :

Créer le DOM de chaque filtre en séparant les filtres date et titre pour les tris par ordre chronologique et alphabétiques.

### createSelectFilter

**Paramètres :** createOptionsValues, dataListName, arrayFilter = null, dataOptionName = null

Description :

Création des options de chaque filtres.

### createOption

**Paramètres :** textContent, value, selectBox

Description :

Création du DOM de chaque élément option

### optionTri

**Paramètres :** dataListName = null, selectBox

Description :

Création des options de chronologies et d'ordre alphabétique.

### optionValue

**Paramètres :** dataListName, selectBox

Description :

Création des options en fonction des entrées des données. 

### setDataAttributes

**Paramètres :** dataListName, name = null

Description :

Mise en place des attributs dans .mozaic-item pour les filtres

### filterValue

**Paramètres :** idMozaic, target, arrayFilters

Description :

Filtre les élémebnts .mozaic-item par valeur

### allItemHidden

**Paramètres :** idMozaic

Description :

Comportement lorsque le filtrage ne possède aucun résultat

### filterAlphaDate

**Paramètres :** target

Description :

Code du filtrage des dates et ordre alphabétique


### convertDate

**Paramètres :** dateString

Description :

Conversion d'une date en string vers timestamp

### createResetButton

**Paramètres :** container

Description :

Création du boutonde réinitialisation

### resetFilter

**Paramètres :** 

Description :

fonction de réinitialisation des filtres.

