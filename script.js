let content = document.getElementById("content");
let content2 = document.getElementById("content2");
let getSidebarContent = document.getElementById("sidebar-content");
let productorsData = [];
let productsData = [];
let displayProductorsListDone = false;

fetch("https://loci.directus.app/items/Product")
  .then((response) => response.json())
  .then((data) => {
    productsData = data["data"];
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
    productorsData = data["data"];
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
    console.log(productorsData);
    // Faire tomber l'opacité du texte à 0 en 0.5 seconde
    getSidebarContent.style.transition = "opacity 0.5s";
    getSidebarContent.style.opacity = "0";

    // Utiliser setTimeout pour attendre que la transition soit terminée avant de supprimer le contenu
    setTimeout(() => {
      getSidebarContent.innerHTML = "";
      let id = 0;
      // Afficher le nouveau contenu à une opacité de 0
      for (let i = 0; i < productorsData.length; i++) {
        id = id + 1;
        const p = document.createElement("p");
        p.style.marginBottom = "0px";
        p.style.paddingTop = "16px";
        p.style.paddingBottom = "16px";
        p.innerHTML = productorsData[i].Name;

        // Ajouter un id à chaque élément "p"
        p.id = "product-" + id;

        // Ajouter un événement click à chaque élément "p"
        // Ajouter un événement click à chaque élément "p"

        p.addEventListener("click", function () {
          console.log(productsData);
          for (let i = 0; i < productsData.length; i++) {
            console.log(productsData[i].Productor[0]);
          }

          // Trouver le producteur correspondant dans productsData
          const producteur = productorsData.find(
            (product) => "product-" + product.Id === this.id
          );

          // Créer le contenu du popup
          const popupContent = `
            <button id="close-popup" style="position: absolute; right: 10px; top: 10px;">X</button>
            <h2>${productorsData[i].Name}</h2>
            <!-- Ajoutez ici d'autres informations sur le producteur -->
          `;

          // Créer le popup et l'ajouter au document
          const popup = document.createElement("div");
          popup.innerHTML = popupContent;
          popup.style.position = "fixed";
          popup.style.top = "50%";
          popup.style.left = "50%";
          popup.style.transform = "translate(-50%, -50%)";
          popup.style.backgroundColor = "#fff";
          popup.style.padding = "20px";
          popup.style.borderRadius = "10px";
          document.body.appendChild(popup);

          // Ajouter un écouteur d'événements pour fermer le popup lorsque le bouton est cliqué
          document
            .getElementById("close-popup")
            .addEventListener("click", function () {
              document.body.removeChild(popup);
            });
        });

        getSidebarContent.appendChild(p); // Utiliser appendChild au lieu de insertAdjacentHTML

        // Ajouter un séparateur gris après chaque producteur
        if (i < productsData.length - 1) {
          const hr = document.createElement("hr");
          hr.style.borderTop = "1px solid gray";
          hr.style.marginBottom = "0px";
          getSidebarContent.appendChild(hr); // Utiliser appendChild au lieu de insertAdjacentHTML
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
