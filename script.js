let content = document.getElementById("content");
let content2 = document.getElementById("content2");

fetch("https://loci.directus.app/items/productor")
  .then((response) => response.json())
  .then((data) => {
    for (let i = 0; i < data["data"].length; i++) {
      const p = document.createElement("p");
      p.innerHTML = data["data"][i].name;
      content.insertAdjacentHTML("afterbegin", p.outerHTML);

      console.log(data["data"]);

      console.log(data["data"][i].productor);
    }
  });

fetch("https://loci.directus.app/items/product")
  .then((response) => response.json())
  .then((data) => {
    for (let i = 0; i < data["data"].length; i++) {
      const p = document.createElement("p");
      p.innerHTML = data["data"][i].name;
      content2.insertAdjacentHTML("afterbegin", p.outerHTML);
    }
  });

function background(newImageUrl) {
  var mainSection = document.getElementById("main");
  mainSection.style.backgroundImage = 'url("' + newImageUrl + '")';
}

// Effect slide to left

// function reduceButton() {
//   var sidebar = document.getElementById("sidebar");
//   sidebar.style.width = "0%";
// }
