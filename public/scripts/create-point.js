// JSON online
// Site retirado https://servicodados.ibge.gov.br/api/docs
// Estados https://servicodados.ibge.gov.br/api/v1/localidades/estados
// Municipios https://servicodados.ibge.gov.br/api/v1/localidades/estados/{UF}/municipios

// Dados da entidade
//
//
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados" || "./json/estados.json")
        .then(res => res.json())
        .then(states => {
            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValeu = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValeu}/municipios`

    citySelect.innerHTML = `<option value="">Selecione a Cidade</option>`
    citySelect.disabled = true

    fetch(url)
        .then(res => res.json())
        .then(cities => {
            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }
            citySelect.disabled = false
        })
}

document.querySelector("select[name=uf]")
    .addEventListener("change", getCities)

populateUFs()

//Itens de coleta
//
//
let selectedItems = []

const itemsToCollect = document.querySelectorAll(".items-grid li")
const colletedItems = document.querySelector("input[name=items]")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

function handleSelectedItem(event) {
    const itemLi = event.target
    // const itemId = itemLi.dataset.id
    const itemId = itemLi.firstElementChild.alt

    // console.log(itemId)

    itemLi.classList.toggle('selected')

    const alreadySelected = selectedItems.findIndex(item => item == itemId)

    if (alreadySelected == -1) {
        selectedItems.push(itemId)
    } else {
        selectedItems = selectedItems.filter(item => item != itemId)
    }
    colletedItems.value = selectedItems
}