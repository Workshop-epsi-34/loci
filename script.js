let content = document.getElementById("content");
let content2 = document.getElementById("content2");
let getSidebarContent = document.getElementById("sidebar-content");
let productorsData = [];
let productsData = [];
let displayProductorsListDone = false;
let stallDataFlo = [];

// fetch("https://loci.directus.app/items/Flo_?fields=*")
//   .then((response) => response.json())
//   .then((data) => {
//     stallDataFlo = data["data"];
//     for (let i = 0; i < data["data"].length; i++) {
//       // const p = document.createElement("p");
//       // p.innerHTML = data["data"][i].name;
//       // content.insertAdjacentHTML("afterbegin", p.outerHTML);
//       // console.log(data["data"]);
//       // console.log(data["data"][i].name);
//     }
//   });

// fetch("https://loci.directus.app/items/Product")
//   .then((response) => response.json())
//   .then((data) => {
//     productsData = data["data"];
//     for (let i = 0; i < data["data"].length; i++) {
//       // const p = document.createElement("p");
//       // p.innerHTML = data["data"][i].name;
//       // content.insertAdjacentHTML("afterbegin", p.outerHTML);
//       // console.log(data["data"]);
//       // console.log(data["data"][i].name);
//     }
//   });

fetch("https://loci.directus.app/items/Flo_Productor?fields=*.*.*")
  .then((response) => response.json())
  .then((data) => {
    productorsData = data["data"];
    console.log(productorsData);

    // Appel de la fonction pour générer la carte
    generateMap();
    // for (let i = 0; i < data["data"].length; i++) {
    //   const p = document.createElement("p");
    //   p.innerHTML = data["data"][i].Name;
    //   content2.insertAdjacentHTML("afterbegin", p.outerHTML);
    // }
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
      let id = 0;
      // Afficher le nouveau contenu à une opacité de 0
      for (let i = 0; i < productorsData.length; i++) {
        id = id + 1;
        const p = document.createElement("p");
        p.style.marginBottom = "0px";
        p.style.paddingTop = "16px";
        p.style.paddingBottom = "16px";
        p.innerHTML = productorsData[i].name;

        // Ajouter un id à chaque élément "p"
        p.id = "product-" + id;

        // Ajouter un événement click à chaque élément "p"
        // Ajouter un événement click à chaque élément "p"

        p.addEventListener("click", function () {
          document.querySelectorAll(".class-popup").forEach((e) => e.remove());
          let productorId = productorsData[i].id;
          let productorName = productorsData[i].Name;

          // console.log("productor name:" + productorsData[i].Name);
          // console.log("productor id:" + productorsData[i].id);
          // console.log("productData :" + productsData);

          let stall = [];
          for (let j = 0; j < productorsData[i].stalls.length; j++) {
            console.log(productorsData[i].stalls[j].product.name);
            const p = document.createElement("p");
            p.innerHTML = `<span style="float:right">${productorsData[i].stalls[j].price} €</span>${productorsData[i].stalls[j].product.name}`;
            stall.push(p);
            // console.log(
            //   "productorData.Productor: " + productsData[j].Productor
            // );
            // if (productorsData[i].id == productsData[j].Productor[0])
            //   console.log("youpi");
            // console.log(productsData[j].Name);
            // console.log(productsData[j].Name);
          }

          // Créer le contenu du popup
          const popupContent = `
            <button id="close-popup" style="position: absolute; right: 10px; top: 10px;">X</button>
            <h2>${productorsData[i].name}</h2>
            <h2>${stall.map((x) => x.outerHTML).join("")}</h2>


            
            <!-- Ajoutez ici d'autres informations sur le producteur -->
          `;

          // Créer le popup et l'ajouter au document
          const popup = document.createElement("div");
          popup.classList.add("class-popup");
          popup.innerHTML = popupContent;
          popup.style.position = "fixed";
          popup.style.top = "50%";
          popup.style.left = "50%";
          popup.style.transform = "translate(-50%, -50%)";
          popup.style.backgroundColor = "#fff";
          popup.style.padding = "20px";
          popup.style.borderRadius = "10px";
          popup.style.zIndex = "9999";
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

// Fonction pour générer la carte et placer des marqueurs
function generateMap() {
  // Création de la carte
  var map = L.map("map").setView([43.6555, 3.8591], 13); // Centre la carte sur Paris

  // Ajout d'une couche de tuiles (fond de carte)
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Tableau de données avec les coordonnées et les noms des marqueurs

  var markersData = [
    // { lat: 48.8566, lng: 2.3522, name: "Paris" },
    // { lat: 48.86, lng: 2.327, name: "Musée du Louvre" },
    // ... Ajoutez d'autres marqueurs ici
  ];
  for (let i = 0; i < productorsData.length; i++) {
    markersData.push({
      lat: productorsData[i].location.coordinates[1],
      lng: productorsData[i].location.coordinates[0],
      name: productorsData[i].name,
    });
  }

  var customIcon = L.icon({
    iconUrl: "images/logo-loci.png", // Remplacez par le chemin vers votre image
    iconSize: [32, 50], // Taille de l'icône
    iconAnchor: [16, 32], // Point d'ancrage de l'icône (centre bas de l'image)
    popupAnchor: [0, -32], // Point d'ancrage du popup (centre haut de l'image)
  });

  // Boucle pour créer et placer les marqueurs
  for (var i = 0; i < markersData.length; i++) {
    var marker = L.marker([markersData[i].lat, markersData[i].lng], {
      icon: customIcon,
    }).addTo(map);
    marker.bindTooltip(markersData[i].name, { permanent: false }); // Affiche le nom au survol
  }
}
