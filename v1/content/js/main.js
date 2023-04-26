window.onload = () => {
  const apiKEY = ""; // ADD YOUR OWN API KEY
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
  const letters = alphabet.split("");
  var videoSource = "";
  async function rollTheDice() {
    let randomString = ""; // Reseting actual video
      try {
        for(var i=0; i<5; i++) {
          randomString += letters[Math.floor(Math.random() * alphabet.length)];
        }
        await fetch("https://www.googleapis.com/youtube/v3/search?part=id&maxResults=1&type=video&part=snippet&q=" + randomString + "&key=" + apiKEY)
          .then(response => {
            if (response.status === 400) {
              alert("Algo está errado com a API_KEY, por favor, recarregue a página!");
          }
          else if (response.status === 403) {
            alert("Limite de vídeos excedido, volte amanhã!");
          }
          else {
            return response.json();
            }
          })
        .then(data => {
          videoSource = "https://www.youtube.com/embed/" + data.items[0].id.videoId;
          document.querySelector(`.videos-container iframe`).src = videoSource;
        })
      }
      catch(err) {
        return new Error("Ops! Algo deu errado :c, Tente recarregar a página!");
      }
  }

  document.querySelector(".first-container-app a").addEventListener("click", ()=>{
    document.querySelector(".first-container-app").style.display = "none";
    document.querySelector(".second-container-app").style.display = "block";
    rollTheDice();
  })

  let actualVideo = 1;

  document.querySelector(".goBack a").addEventListener("click", () => {
    document.querySelector(`.videos-container iframe`).src = "";
    document.querySelector(`.recent-videos ul`).append(document.createElement("li"));

    createIframe = document.createElement("iframe");
    createIframe.frameBorder = "0";
    createIframe.setAttribute('allowFullScreen', '');

    document.querySelector(`.recent-videos ul li:nth-child(${actualVideo})`).append(createIframe);
    document.querySelector(`.recent-videos ul li:nth-child(${actualVideo}) iframe`).src = videoSource;
    actualVideo++;
    rollTheDice();
  })
}
