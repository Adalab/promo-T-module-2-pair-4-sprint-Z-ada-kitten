'use strict';

//localStorage.setItem('variableDesdeJs', 'contenido de la vari');

/* Elementos que usamos en el HTML */
const newFormElement = document.querySelector('.js-new-form');
const listElement = document.querySelector('.js-list');
const searchButton = document.querySelector('.js-button-search');
const buttonAdd = document.querySelector('.js-btn-add');
const buttonCancelForm = document.querySelector('.js-btn-cancel');
const inputDesc = document.querySelector('.js-input-desc');
const inputPhoto = document.querySelector('.js-input-photo');
const inputName = document.querySelector('.js-input-name');
const inputRace = document.querySelector('.js-input-race');
const linkNewFormElememt = document.querySelector('.js-button-new-form');
const labelMessageError = document.querySelector('.js-label-error');
const input_search_desc = document.querySelector('.js_in_search_desc');
const GITHUB_USER = '<Jenn-jt>';
const SERVER_URL = `https://dev.adalab.es/api/kittens/${GITHUB_USER}`;
const kittenListStored = JSON.parse(localStorage.getItem('kittensList'));

/*//Objetos con cada gatito
const kittenData_1 = {
  image: 'https://dev.adalab.es/gato-siames.webp',
  name: 'Anastacio',
  desc: 'Porte elegante, su patrón de color tan característico y sus ojos de un azul intenso, pero su historia se remonta a Asía al menos hace 500 años, donde tuvo su origen muy posiblemente.',
  race: 'Siamés',
};
const kittenData_2 = {
  image: 'https://dev.adalab.es/sphynx-gato.webp',
  name: 'Fiona',
  desc: 'Produce fascinación y curiosidad. Exótico, raro, bello, extraño… hasta con pinta de alienígena han llegado a definir a esta raza gatuna que se caracteriza por la «ausencia» de pelo.',
  race: 'Sphynx',
};
const kittenData_3 = {
  image: 'https://dev.adalab.es/maine-coon-cat.webp',
  name: 'Cielo',
  desc: ' Tienen la cabeza cuadrada y los ojos simétricos, por lo que su bella mirada se ha convertido en una de sus señas de identidad. Sus ojos son grandes y las orejas resultan largas y en punta.',
  race: 'Maine Coon',
};*/

//LO CAMBIO POR LET
//const kittenDataList = [kittenData_1, kittenData_2, kittenData_3];

let kittenDataList = [];

if (kittenListStored) {
  kittenDataList = data.results;
  renderKittenList(kittenDataList);

  //si existe el listado de gatitos en el local storage
  // vuelve a pintar el listado de gatitos
  //...
  //completa el código...
} else {
  //sino existe el listado de gatitos en el local storage
  //haz la petición al servidor
  fetch(SERVER_URL)
    .then((response) => response.json())
    .then((data) => {
      kittenDataList = data.results;
      renderKittenList(kittenDataList);
      localStorage.setItem('kittenDataList', JSON.stringify(kittenDataList));
    })
    .catch((error) => {
      console.error(error);
    });
}

/*fetch(SERVER_URL)
  .then((response) => response.json())
  .then((data) => {
    kittenDataList = data.results;
    renderKittenList(kittenDataList);
  });*/

//Completa el código;

//Funciones
/*Para practicar esta última lección puedes cambiar el innerHTML de las funciones renderKitten() por sentencias de creación de elementos.*/
function renderKitten(kittenData) {
  const kitten = `<li class="card">
    <article>
      <img
        class="card_img"
        src=${kittenData.image}
        alt="gatito"
      />
       <h3 class="card_title">${kittenData.name}</h3>
      <h3 class="card_race">${kittenData.race}</h3>
      <p class="card_description">
      ${kittenData.desc}
      </p>
    </article>
    </li>`;
  const liElement = document.createElement('li');
  liElement.classList.add('card');

  const articleElement = document.createElement('article');
  liElement.appendChild(articleElement);

  const imgElement = document.createElement('img');
  imgElement.classList.add('card_img');
  imgElement.src = kittenData.url;
  articleElement.appendChild(imgElement);

  const h3Title = document.createElement('h3');
  h3Title.classList.add('card_title');
  articleElement.appendChild(h3Title);

  const textForTitle = document.createTextNode(kittenData.name);
  h3Title.appendChild(textForTitle);

  const h3Race = document.createElement('h3');
  h3Race.classList.add('card_race');
  articleElement.appendChild(h3Race);

  const textForRace = document.createTextNode(kittenData.race);
  h3Race.appendChild(textForRace);

  const pDesc = document.createElement('desc');
  pDesc.classList.add('card_description');
  articleElement.appendChild(pDesc);

  const textForDesc = document.createTextNode(kittenData.desc);
  pDesc.appendChild(textForDesc);

  return liElement;
}

function renderKittenList(kittenDataList) {
  listElement.innerHTML = '';
  for (const kittenItem of kittenDataList) {
    const newLiItem = renderKitten(kittenItem);
    listElement.appendChild(newLiItem);
  }
}

//Mostrar/ocultar el formulario
function showNewCatForm() {
  newFormElement.classList.remove('collapsed');
}
function hideNewCatForm() {
  newFormElement.classList.add('collapsed');
}

function handleClickNewCatForm(event) {
  event.preventDefault();
  if (newFormElement.classList.contains('collapsed')) {
    showNewCatForm();
  } else {
    hideNewCatForm();
  }
}

//kittenDataList.push(newKittenDataObject);

//Adicionar nuevo gatito
//BONUS: Crear un nuevo gatito en el servidor
function addNewKitten(event) {
  event.preventDefault();
  const newKittenDataObject = {
    image: inputPhoto.value,
    name: inputName.value,
    desc: inputDesc.value,
  };
  kittenDataList.push(newKittenDataObject);
  renderKittenList(kittenDataList);

  inputDesc.value = '';
  inputPhoto.value = '';
  inputName.value = '';

  if (
    newKittenDataObject.desc === '' ||
    newKittenDataObject.name === '' ||
    newKittenDataObject.image === ''
  ) {
    labelMessageError.innerHTML = '¡Uy! parece que has olvidado algo';
  } else if (
    newKittenDataObject.desc !== '' &&
    newKittenDataObject.name !== '' &&
    newKittenDataObject.image !== ''
  ) {
    labelMessageError.innerHTML = '"Mola! Un nuevo gatito en Adalab!"';
  }
}

//Cancelar la búsqueda de un gatito
function cancelNewKitten(event) {
  event.preventDefault();
  newFormElement.classList.add('collapsed');
  inputDesc.value = '';
  inputPhoto.value = '';
  inputName.value = '';
}

//Filtrar por descripción
function filterKitten(event) {
  event.preventDefault();
  const descrSearchText = input_search_desc.value;
  const filterFilters = kittenDataList.filter((kittenItem) =>
    kittenItem.desc.includes(descrSearchText)
  );
  renderKittenList(filterFilters);

  /*listElement.innerHTML = '';
  for (const kittenItem of kittenDataList) {
    if (kittenItem.desc.includes(descrSearchText)) {
      listElement.innerHTML += renderKitten(kittenItem);
    }
  }*/
}

//Mostrar el litado de gatitos en ell HTML
renderKittenList(kittenDataList);

//Eventos
linkNewFormElememt.addEventListener('click', handleClickNewCatForm);
searchButton.addEventListener('click', filterKitten);
buttonAdd.addEventListener('click', addNewKitten);
buttonCancelForm.addEventListener('click', cancelNewKitten);

// RECEBIR DATOS DEL SERVIDOR

/*fetch('DIRECCIÓN')
  .then((Response) => Response.json)
  .then((data) => {
    //el dódigo que usa data.
  });
/*el parametro es obligatorio, y se puede poner cualquer nombre.*/
//LOCAL STORAGE
//localStorage.setItem('titledeLaUser', value);
