//POSTMAN: ALLOWS YOU TO QUICKLY TEST APIS- just plug the url in to check
//You always have to follow the rules of the api owner, check thier query parameter, always refer to thier documentation on how thier api should be used.

document.querySelector("button").addEventListener("click", getFetch);

function getFetch() {
  const choice = document.querySelector("input").value.toLowerCase();
  console.log(choice);
  //returned date, we will still need to check thier documentation for how they expect date to be sent. we can now plug it in, apikey is already a query parameter and we add more with the & and plug in others.

  const url = `https://api.nasa.gov/planetary/apod?api_key=fsoYDw9VhNewGpguK1ahQVmK8AfYGTEw5yJoLsFQ&date=${choice}`; //You need nasa api key

  fetch(url)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data);
      //Sometimes, you dont get only photos, it might be videos and we should make provision for it in our html and do a conditional
      if (data.media_type === "image") {
        //Clear video
        document.querySelector(".iframe").style.display = "none";

        document.querySelector(".img").src = data.hdurl;
        document.querySelector("h2").textContent = `Title: ${data.title}`;

        document.querySelector(".img").style.display = "block";
        document.querySelector("h3").style.display = "block";
        document.querySelector("h2").style.display = "block";
      } else if (data.media_type === "video") {
        //clear previous image
        document.querySelector(".img").style.display = "none";
        //check why text gets duplicated here
        document.querySelector(".iframe").style.marginTop = "5rem";
        document.querySelector(".iframe").src = data.url;
        document.querySelector(".iframe").style.display = "block";
        document.querySelector("h3").style.display = "block";
        document.querySelector("h2").style.display = "none";
      }
      document.querySelector("h3").innerText = data.explanation;
    })

    .catch((err) => {
      console.log(`error ${err}`);
    });
}

//TEMPLATE: Example fetch using pokemonapi.co
// document.querySelector("button").addEventListener("click", getFetch);

// function getFetch() {
//   const choice = document.querySelector("input").value.toLowerCase();
//   const url = "https://pokeapi.co/api/v2/pokemon/" + choice;

//   fetch(url)
//     .then((res) => res.json()) // parse response as JSON
//     .then((data) => {
//       console.log(data);
//     })
//     .catch((err) => {
//       console.log(`error ${err}`);
//     });
// }
