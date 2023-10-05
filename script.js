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
    let supermarket = [];
    for (let i = 0; i < productorsData.length; i++) {
      if (productorsData[i].supermarket) {
        supermarket.push(productorsData[i]);
      }
    }

    let advisedProductor = [];
    for (let i = 0; i < productorsData.length; i++) {
      if (productorsData[i].id == "1") {
        advisedProductor.push(productorsData[i]);
      }
    }

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

        let note = "";
        for (var j = 0; j < productorsData[i].note; j++) {
          note +=
            "<img src='images/feuilles-loci.png' alt='description' style='height:16px' />";
        }

        const p = document.createElement("p");
        p.style.marginBottom = "0px";
        p.style.paddingTop = "16px";
        p.style.paddingBottom = "16px";
        p.innerHTML =
          productorsData[i].name +
          "<span style='padding-right:10px'></span> " +
          note;

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
          let stallGege = [];

          for (let j = 0; j < productorsData[i].stalls.length; j++) {
            const p = document.createElement("p");
            p.innerHTML = `<span style="float:right">${productorsData[i].stalls[j].price} €</span>${productorsData[i].stalls[j].product.name}`;
            stall.push(p);
            // if (productorsData[i].id == "1") {
            //   const pGege = document.createElement("p");
            //   pGege.innerHTML = `<span style="float:right">${productorsData[i].stalls[j].price} €</span>${productorsData[i].stalls[j].product.name}`;
            //   stallGege.push(pGege);
            // }

            // console.log(
            //   "productorData.Productor: " + productsData[j].Productor
            // );
            // if (productorsData[i].id == productsData[j].Productor[0])
            //   console.log("youpi");
            // console.log(productsData[j].Name);
            // console.log(productsData[j].Name);
          }

          let stallAdvisedProductor = [];
          console.log(advisedProductor[0]);
          for (let j = 0; j < advisedProductor[0].stalls.length; j++) {
            let p3 = document.createElement("p");
            p3.innerHTML = `<span style="float:right">${advisedProductor[0].stalls[j].price} €</span>${advisedProductor[0].stalls[j].product.name}`;
            stallAdvisedProductor.push(p3);
          }
          console.log(stallAdvisedProductor);

          let stallSupermarket = [];
          for (let j = 0; j < supermarket[0].stalls.length; j++) {
            const p2 = document.createElement("p");
            p2.innerHTML = `<p><span style="float:right">${supermarket[0].stalls[j].price} €</span>${supermarket[0].stalls[j].product.name}</p>`;
            stallSupermarket.push(p2);
          }

          let notePopup = "";
          for (var j = 0; j < productorsData[i].note; j++) {
            notePopup +=
              "<img src='images/feuilles-loci.png' alt='description' style='height:16px' />";
          }

          let popupContent = "";

          // Créer le contenu du popup
          if (productorsData[i].id == "2") {
            popupContent = `
            <button id="close-popup" style="position: absolute; right: 10px; top: 10px;">X</button>
            <span>${notePopup}</span>
            <h2>${productorsData[i].name}</h2>
            <p>${stall.map((x) => x.outerHTML).join("")}</p>
            <hr style="border:1px solid grey">
            <img src='images/feuilles-loci.png' alt='description' style='height:16px' /><img src='images/feuilles-loci.png' alt='description' style='height:16px' />
            <span style="color:green; float:right">Conseillé</span>
            <h2>${advisedProductor[0].name}</h2>
            <p>${stallAdvisedProductor.map((x) => x.outerHTML).join("")}</p>
            

          `;
          } else {
            popupContent = `
            <button id="close-popup" style="position: absolute; right: 10px; top: 10px;">X</button>
            <span>${notePopup}</span>
            <h2>${productorsData[i].name}</h2>
            <p>${stall.map((x) => x.outerHTML).join("")}</p>
            <hr style="border:1px solid grey">
            <img src='images/feuilles-loci.png' alt='description' style='height:16px' />
            <h2>${supermarket[0].name}</h2>
            <p>${stallSupermarket.map((x) => x.outerHTML).join("")}</p>
          `;
          }

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
          popup.style.boxShadow =
            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px";
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
        if (i < productorsData.length - 1) {
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
  var map = L.map("map").setView([43.6555, 3.8591], 12); // Centre la carte sur Paris

  // Ajout d'une couche de tuiles (fond de carte)
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Tableau de données avec les coordonnées et les noms des marqueurs
  var markersData = [];
  for (let i = 0; i < productorsData.length; i++) {
    markersData.push({
      lat: productorsData[i].location.coordinates[1],
      lng: productorsData[i].location.coordinates[0],
      name: productorsData[i].name,
      note: productorsData[i].note,
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

    // Créer le contenu du tooltip
    var tooltipContent = "";

    // Ajouter l'image au contenu du tooltip le nombre de fois souhaité
    for (var j = 0; j < productorsData[i].note; j++) {
      tooltipContent +=
        "<img src='images/feuilles-loci.png' alt='description' style='height:16px' />";
    }

    tooltipContent += "</br>" + markersData[i].name;

    marker.bindTooltip(tooltipContent, {
      permanent: false,
      direction: "top",
      offset: [0, -20],
    }); // Affiche le nom au survol
  }
}
