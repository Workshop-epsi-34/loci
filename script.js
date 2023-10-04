let content = document.getElementById("content");
let content2 = document.getElementById("content2");
let getSidebarContent = document.getElementById("sidebar-content");
let productorsData = [];
let productsData = [];
let displayProductorsListDone = false;

fetch("https://loci.directus.app/items/Productor")
  .then((response) => response.json())
  .then((data) => {
    productorsData = data["data"];
    for (let i = 0; i < data["data"].length; i++) {
      const p = document.createElement("p");
      p.innerHTML = data["data"][i].name;
      content.insertAdjacentHTML("afterbegin", p.outerHTML);

      console.log(data["data"]);

      console.log(data["data"][i].name);
    }
  });

fetch("https://loci.directus.app/items/Productor")
  .then((response) => response.json())
  .then((data) => {
    productsData = data["data"];
    for (let i = 0; i < data["data"].length; i++) {
      const p = document.createElement("p");
      p.innerHTML = data["data"][i].Name;
      content2.insertAdjacentHTML("afterbegin", p.outerHTML);
    }
  });

function background(newImageUrl) {
  var mainSection = document.getElementById("main");
  mainSection.style.backgroundImage = 'url("' + newImageUrl + '")';
}

function displayProductorsList() {
  if (displayProductorsListDone == false) {
    // Faire tomber l'opacité du texte à 0 en 0.5 seconde
    getSidebarContent.style.transition = "opacity 0.5s";
    getSidebarContent.style.opacity = "0";

    // Utiliser setTimeout pour attendre que la transition soit terminée avant de supprimer le contenu
    setTimeout(() => {
      getSidebarContent.innerHTML = "";

      // Afficher le nouveau contenu à une opacité de 0
      for (let i = 0; i < productsData.length; i++) {
        const p = document.createElement("p");
        p.style.marginBottom = "0px";
        p.style.paddingTop = "16px";
        p.style.paddingBottom = "16px";
        p.innerHTML = productsData[i].Name;
        getSidebarContent.insertAdjacentHTML("afterbegin", p.outerHTML);

        // Ajouter un séparateur gris après chaque producteur
        if (i < productsData.length - 1) {
          // Ne pas ajouter de séparateur après le dernier producteur
          const hr = document.createElement("hr");
          hr.style.borderTop = "1px solid gray"; // Définir la couleur du séparateur en gris
          hr.style.marginBottom = "0px";
          getSidebarContent.insertAdjacentHTML("afterbegin", hr.outerHTML);
        }
      }

      // Augmenter l'opacité à 1 en 0.5 seconde
      getSidebarContent.style.opacity = "1";
    }, 500); // Attendre 500 ms (0.5 seconde) avant d'exécuter cette fonction
    displayProductorsListDone = true;
  }
}

var tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl);
});

// Effect slide to left

// function reduceButton() {
//   var sidebar = document.getElementById("sidebar");
//   sidebar.style.width = "0%";
// }
