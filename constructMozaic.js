/* Génération des filtres des mosaïques Christophe 20/05/2022 */

/* ----------------------------------------------------------------
1. Mise en place 

a) Ciblage de la mosaïque : 
Dans le code html renseigner une id sur div.mozaik-wrap pour spécifier sur quelle mosaïque les filtres seront générés.

b) Paramétrage des filtres :
Ajouter l'attribut data-name="[nom du champ]" afin de créer la catégorie de filtre. Deux types de filtres sont programmés, les filtres de tri (date et ordre alphabétique) et les filtres d'affichage. L'attribut pour le titre et la date sont fixes : data-name="Titre" data-name="Date" Les filtres d'affichage sont générés dynamiquement. Il suffit d'entrer le nom du filtre tel que désiré affiché dans le label avec les accents (sans espace)

c) dans l'encart devant contenir les filtres :
<script>$(document).ready(function() { createFilter("[idMozaic]") })</script>
<div id="filterContainer"></div>
---------------------------------------------------------------- */

/* ----------------------------------------------------------------
2. Description du fonctionnement

a) La fonction createFilter(id) récupère les données des attributs data-name, créé le container pour les filtres et execute les fonctions de création des filtres

b) La fonction createSelectFilter(createOptionsValues, dataListName) créé le DOM de la balise select générale.

c) Les fonction option[name] peuplent les balises options avec les données pertinentes des différents filtres

d) Les fonctions filter[name] régissent les comportements des filtres 
---------------------------------------------------------------- */
/* TODO : Affichage conditionnel des balises options en fonction des choix possibles */
/* TODO : Date, augmenter souplesse du format YYYY | MM/YYYY | Xie siècle | 12 juin 1515 */
/* $(document).ready(function() {

    createFilter("idMozaic")

}) */

/* $(document).ready(function() {
    var promises = []
    promises.push(d3.csv(document.getElementById("data_url").value))

    Promise.all(promises).then(data => {
        displayMos(data, "idMozaic")
    })
}) */


var promises = []
function onLibrariesLoaded(attempt_count, max_attempt) {
    if (isLibrariesLoaded()) {
        wait_for_data(promises)
    } else {

        // Rechargement de la page après 4 tentatives avec message d'erreur
        if (attempt_count >= max_attempt) { 
            let message = document.createElement("p")
            message.setAttribute("class", "reload-error")
            message.textContent = "Nous rencontrons un problème, la page va être rechargée."
            document.getElementById("idMozaic").appendChild(message)
            setTimeout(function () {
                location.reload() 
            }, 1500); 
        }

        setTimeout(function () {
            console.log('Tentative de rechargement...');
            onLibrariesLoaded(attempt_count + 1);
        }, 1000);
    }
} 

// Vérification que tous les modules sont chargés
function isLibrariesLoaded() {
    return typeof $ !== 'undefined' 
        && typeof d3 !== 'undefined'
}

function wait_for_data(promises) {
    get_data(promises)
    typeof window["data"] !== "undefined" ? displayMos(data, "idMozaic") : setTimeout(wait_for_data, 250);   
}

function get_data(promises) {
    const controller = new AbortController();
    try {
        if (promises == undefined) { var promises = [] }
        
        // Source des données
        promises.push(d3.csv(document.getElementById("data_url").value))
        setTimeout(() => controller.abort(), 3000);
        Promise.all(promises, { signal: controller.signal })
        .then(data => {
            window["data"] = data;
        })
        .catch(error => {
            console.error('Erreur lors du chargement des fichiers :', error);
        });
    } catch (err) {
        console.log(err);
    }
}

$(document).ready(function() {
    var attempt_count = 0
    var max_attempt = 4
    onLibrariesLoaded(attempt_count, max_attempt);
})


/* ********** Create and populate thumbnails ********** */
function displayMos(data, idMozaic) {
    // On vérifie si le navigateur prend en charge la fonctionnalité
    if ("content" in document.createElement("template")) {

        var container = $(`#${idMozaic}`);


        var ul = document.createElement('ul')
        ul.setAttribute("class", "mozaik-liste")
        ul.setAttribute("id", "mozaikContainer")

        container.append(ul)

        $("")

        var template = document.querySelector(`#mozaik-template`);


        data[0].forEach(e => {
            if (e.Year != "") {
                var clone = document.importNode(template.content, true);
                let tagRegex = /<i>|<\/i>|<em>|<\/em>/gm
                let regexHref = /<a.+href='|'.+|<a.+href="|".+/gm

                let titre = clone.querySelector("#mos-titre")
                let sous_titre = clone.querySelector("#mos-sous_titre")
                let description = clone.querySelector("#mos-description")
                let cat = clone.querySelector("#mos-cat")
                let sous_cat = clone.querySelector("#mos-sous_cat")
                let link = clone.querySelector("#mos-link")
                let img = clone.querySelector("#mos-img")
                let lieu = clone.querySelector("#mos-lieu")
                let date = clone.querySelector("#mos-date")
                let button = clone.querySelector("#mos-button")

                if (e.date.length && (date != null)) {
                    date.textContent = e.date
                    date.removeAttribute('id')
                }
                if (e.lieu && (lieu != null)) {
                    lieu.textContent = e.lieu
                    lieu.removeAttribute('id')
                }
                if (e.titre && (titre != null)) {
                    titre.textContent = e.titre.replace(/&nbsp;/gm, " ").replace(tagRegex, "")
                    titre.removeAttribute('id')
                }
                if (e.sous_titre && (sous_titre != null)) {
                    sous_titre.textContent = e.sous_titre
                    sous_titre.removeAttribute('id')
                }
                if (e.description && (description != null)) {
                    description.textContent = e.description
                    description.removeAttribute('id')
                }
                if (e.cat && (cat != null)) {
                    cat.textContent = e.cat
                    cat.removeAttribute('id')
                }
                if (e.sous_cat && (sous_cat != null)) {
                    sous_cat.textContent = e.sous_cat
                    sous_cat.removeAttribute('id')
                }
                if (e.img && (img != null)) {
                    img.setAttribute("src", e.img)
                    img.setAttribute("data-src", e.img)
                    img.setAttribute("alt", e.img_alt)
                    img.removeAttribute('id')
                }
                if (e.link && (link != null)) {
                    link.setAttribute("href", e.link.replace(regexHref, ''))
                    link.setAttribute("title", e.link_title)
                    link.removeAttribute('id')

                }

                ul.appendChild(clone);
            }
        })
    }
    createFilter("idMozaic")
    var processedDataNames = $(`#${idMozaic} *[data-name]`)
    Array.from(processedDataNames).forEach(value => {
        $(value).attr("data-name", $(value).attr("data-name").replace(/\s+/gm, "").replace(/[!^\W_]/gm, ""))
    })
}

/* const optionsFilter = (param = null) => {
    if ((param == null) || (param == undefined)) {
        return
    }
    const paramList = param.trim().split(/\s+/)
    paramList.forEach(p => {
        if (p == "noTri") {
            $(`.Slider-item label:not([for="Filtrerparanne"])`).parent().hide()
        }
        if (p.replace(/[0-9]+/, "") == "start") {
            Array.from($(`#filterContainer select`)).forEach(e => {
                $(e).val(p.replace("start", "")).change()
            })
            Array.from($(`#filterContainer .select-selected`)).forEach(e => {
                $(e).val(p.replace("start", ""))
                $(e).text(p.replace("start", ""))
            })
        }

    })

} */


const createFilter = (idMozaic) => {

    // Get all data-name values
    var arrayFilters = []
    var arrayBaseFilters = []

    const dataNameValues = Array.from($(`#${idMozaic} *[data-name]`))
    dataNameValues.forEach(filterType => {

        arrayBaseFilters.push({ "full_name": $(filterType).attr('data-name'), "processed_name": $(filterType).attr('data-name').replace(/\s+/gm, "").replace(/[!^\W_]/gm, "") })
        arrayFilters.push($(filterType).attr('data-name').replace(/\s+/gm, "").replace(/[!^\W_]/gm, ""))
    })

    // Remove duplicate
    arrayFilters = [...new Set(arrayFilters)]

    arrayBaseFilters = arrayBaseFilters.filter((value, index, self) =>
        index === self.findIndex((t) => (
            t.full_name === value.full_name && t.processed_name === value.processed_name
        ))
    )

    // Remove Titre et Date (tri par date et alphabétique)
    arrayFilters = arrayFilters.filter(item => { return item !== "Titre" }).filter(item => { return item !== "Date" })
    arrayBaseFilters = arrayBaseFilters.filter(item => { return item.full_name !== "Titre" }).filter(item => { return item.full_name !== "Date" })

    const titres = $(`#${idMozaic} *[data-name='Titre']`)
    const dates = $(`#${idMozaic} *[data-name='Date']`)

    /* Create filter container */

    const filterContainer = document.createElement('ul')
    filterContainer.setAttribute("class", "filterContainer Slider fixed-elt-scroll only-scrollup")
    filterContainer.style.justifyContent = "flex-start"


    const sectionName = document.createElement("h3")
    sectionName.setAttribute("class", "Slider-item")

    sectionName.textContent = "Filtres"
    filterContainer.appendChild(sectionName)

    // Création des select à l'aide de variables dynamiques
    for (var i = 0; i < arrayBaseFilters.length; i++) {

        filterContainer.appendChild(createSelectFilter(optionValue, $(`#${idMozaic} *[data-name="${arrayBaseFilters[i].full_name}"`), arrayBaseFilters[i], null))
        setDataAttributes($(`#${idMozaic} *[data-name="${arrayBaseFilters[i].full_name}"`))
    }
    if ((titres.length) || (dates.length)) {
        filterContainer.appendChild(createSelectFilter(optionTri, titres, null, dates))
    }
    if (titres.length) {
        setDataAttributes(titres, "alpha")
    }
    if (dates.length) {
        setDataAttributes(dates, "date")
    }

    createResetButton(filterContainer)

    $("#filterContainer").prepend(filterContainer)


    // Initiate filters
    const target = $(`#${idMozaic} .mozaik-item`)

    filterValue(idMozaic, target, arrayFilters)

    filterAlphaDate(target)


    resetFilter()

    // Create false select box for css
    customSelect()

}

const createSelectFilter = (createOptionsValues, dataListName, arrayFilter = null, dataOptionName = null) => {

    var value = {}
    if (dataOptionName != null || arrayFilter == null || arrayFilter == undefined) {
        value.full_name = "Tri"
        value.processed_name = "Tri"
    } else {
        value.full_name = arrayFilter.full_name
        value.processed_name = arrayFilter.processed_name
    }



    // Create select container
    let selectContainer = document.createElement("li")
    selectContainer.setAttribute("class", "Slider-item custom-select")

    // Create Label
    let selectLabel = document.createElement("label")
    selectLabel.setAttribute("for", value.processed_name)
    selectLabel.textContent = `${value.full_name} : `

    // Create select box
    var selectBox = document.createElement("select")
    selectBox.setAttribute("name", value.processed_name)
    selectBox.setAttribute("id", value.processed_name)

    // Create default option box
    createOption("Aucun filtre", "none", selectBox)

    createOptionsValues(dataListName, selectBox)

    selectContainer.appendChild(selectLabel)
    selectContainer.appendChild(selectBox)

    return selectContainer

}

const createOption = (textContent, value, selectBox) => {
    // Create option box
    let option = document.createElement("option")
    option.textContent = textContent
    option.value = value.replace(/\s+/gm, "").replace(/[!^\W_]/gm, "")
    selectBox.appendChild(option)
}

const optionTri = (dataListName = null, selectBox) => {

    // Create option box
    createOption("A à Z", "alpha", selectBox)
    createOption("Z à A", "inverse", selectBox)
    createOption("Les plus récents", "newer", selectBox)
    createOption("Les plus ancients", "older", selectBox)

}

const optionValue = (dataListName, selectBox) => {

    arrayDataList = Array.from(dataListName)

    // Remove duplicate
    arrayDataList = arrayDataList.filter((value, index, self) =>
        index === self.findIndex((t) => (
            $(t).text() === $(value).text()
        ))
    )

    arrayDataList.forEach(dataName => {

        // Create option box
        let textValue = $(dataName).text()
        let value = $(dataName).text().replace(/\s/g, "")
        createOption(textValue, value, selectBox)

    })
}


const setDataAttributes = (dataListName, name = null) => {

    // Set Attribute in .mozaik-item for filter
    Array.from(dataListName).forEach(dataName => {
        switch (name) {
            case "date":
                value = convertDate($(dataName).text())
                break
            case "alpha":
                value = $(dataName).text().toLowerCase().replace(/\s+/gm, "")
                break
            default:
                value = $(dataName).text().replace(/\s+/gm, "").replace(/[!^\W_]/gm, "")
                break
        }

        let optionName = `data-${$(dataName).attr("data-name").replace(/\s+/gm, "").replace(/[!^\W_]/gm, "")}`
        $(dataName).parents(".mozaik-item").attr(optionName, value)

    })
}

// Filter .mozaik-item by value
const filterValue = (idMozaic, target, arrayFilters) => {

    var arrayIsVisible = Array(target.length)
    for (var i = 0; i < arrayIsVisible.length; i++) {
        arrayIsVisible[i] = {}
        arrayFilters.forEach(filter => {
            arrayIsVisible[i][filter] = true
        })
    }
    arrayIsVisible.forEach((array, i) => {

        Object.keys(array).forEach((valueType) => {

            $(`select[name="${valueType}"]`).change(function() {

                var value = $(this).val()
                let optionValueSelect = $(target[i]).attr(`data-${valueType}`)

                if ((value == "none") || (optionValueSelect == value)) {
                    array[valueType] = true
                } else {
                    array[valueType] = false
                }

                Array.from(target).forEach((item, i) => {

                    if (Object.values(arrayIsVisible[i]).every(value => value === true)) {
                        item.removeAttribute('hidden')
                        isAllVisible = true
                    } else {
                        item.setAttribute('hidden', true)
                        isAllVisible = false
                    }
                })
                allItemHidden(idMozaic)
            })
        })
    })
}
const allItemHidden = (idMozaic) => {
    var isAllHidden = $(`#${idMozaic} .mozaik-item[hidden="true"]`)
    var allItem = $(`#${idMozaic} .mozaik-item`)
    var isAlert = $(`#${idMozaic} .alertMessage`).length

    if ((isAllHidden.length == allItem.length) && (isAlert == 0)) {
        let alertContainer = document.createElement('div')
        alertContainer.setAttribute("class", "alertMessage")

        let alertMessage = document.createElement('p')
        alertMessage.textContent = "Votre sélection de filtre n'a donné aucun résultat"
        alertContainer.appendChild(alertMessage)

        createResetButton(alertContainer)

        $(`#${idMozaic} .mozaik-liste`).prepend(alertContainer)
        resetFilter(idMozaic)

    } else if ((isAllHidden.length != allItem.length) && (isAlert != 0)) {
        $(`#${idMozaic} .mozaik-liste .alertMessage`).remove()
    }
}

// Filter .mozaik-item by date asc, desc
const filterAlphaDate = (target) => {

    var arrayTarget = Array.from(target)

    $(`select[name="Tri"]`).change(function() {

        var value = $(this).val()
        if ((value == "older") || (value == "newer")) {
            // Tri les items en fonction de la valeurs du timestamp
            arrayTarget = arrayTarget.sort(function compare(a, b) {

                return $(a).attr(`data-date`) - $(b).attr(`data-date`)
            })

        } else {
            // Tri les items en fonction de la valeurs du timestamp
            arrayTarget = arrayTarget.sort(function(a, b) {
                return $(a).attr('data-titre').localeCompare($(b).attr('data-titre'))
            })
        }

        arrayTarget.forEach((e, i) => {

            switch (value) {
                case "older":
                case "alpha":
                    e.style.order = i.toString()
                    break
                case "newer":
                case "inverse":
                    let reverseOrder = arrayTarget.length - i
                    e.style.order = reverseOrder.toString()
                    break
                default:
                    e.style.order = "unset"
                    break
            }

        })

    })
}

// Convert string date into time stamp
const convertDate = (dateString) => {
    const month = ["janvier", "fevrier", "mars", "avril", "mai", "juin", "juillet", "aout", "septembre", "octobre", "novembre", "decembre"]
    var sanitizeDate = dateString.toLowerCase().replace(/é|è|ê/gm, "e").replace(/û/gm, "u").replace(/\s+/gm, "/")

    month.forEach((m, i) => {
        sanitizeDate = sanitizeDate.replace(m, i)
    })
    var partDate = sanitizeDate.split("/");
    let dateEvent = new Date(parseInt(partDate[2], 10), parseInt(partDate[1], 10), parseInt(partDate[0], 10))
    return Date.parse(dateEvent)

}

// Create DOM reset button
const createResetButton = (container) => {
    let resetButtonContainer = document.createElement("div")
    resetButtonContainer.setAttribute("class", "Slider-item")

    let resetButton = document.createElement("button")
    resetButton.setAttribute("class", "btn btn-default resetFilter")
    resetButton.textContent = "Réinitialiser les filtres"
    resetButtonContainer.appendChild(resetButton)

    container.appendChild(resetButtonContainer)
}

// Reset filter Button
const resetFilter = () => {
    var button = $(`.resetFilter`)
    button.click(() => {
        Array.from($(`#filterContainer select`)).forEach(e => {
            $(e).val("none").change()
        })
        Array.from($(`#filterContainer .select-selected`)).forEach(e => {
            $(e).val("none")
            $(e).text("Aucun filtre")
        })
    })
}