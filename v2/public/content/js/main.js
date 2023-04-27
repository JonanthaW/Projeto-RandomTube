var socket = io.connect();
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
const letters = alphabet.split("");

socket.on("get_key", (key, videosQuantity) => {
    document.querySelector(".first-container-app a").addEventListener("click", ()=>{
        document.querySelector(".first-container-app").style.display = "none";
        document.querySelector(".second-container-app").style.display = "flex";
        generateVideo(key);
    })

    document.querySelector("#generate").addEventListener("click", ()=>{
        generateVideo(key);
    })
});

async function generateVideo(key) {
    document.querySelector(".first-container-app a").style.backgroundColor = "#625757";
    document.querySelector(".first-container-app a").innerText = "Trying to get content...";
    document.querySelector(".first-container-app a").disabled = true;
    let randomString = ""; // reseting  video
        try {
            for(var i = 0; i < 5; i++) { //5 should be enought to generate good random videos
                randomString += letters[Math.floor(Math.random() * alphabet.length)];
            }
            await fetch(`https://www.googleapis.com/youtube/v3/search?part=id&type=video&part=snippet&q="${randomString}&key=${key}`)
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
                for(var item = 1; item <= data.items.length; item++) {
                    videoSource = `https://www.youtube.com/embed/${data.items[item - 1].id.videoId}`;
                    let iframe = document.createElement("iframe");
                    iframe.frameborder = "0";
                    iframe.setAttribute('allowFullScreen', '');
                    iframe.src = videoSource;
                    document.querySelector(`.second-container-app .container`).append(iframe);
                }
                document.querySelector(".first-container-app a").style.backgroundColor = "#F00";
                document.querySelector(".first-container-app a").innerText = "Generate more videos";
                document.querySelector(".first-container-app a").disabled = false;
                })
        }
            catch(err) {
                return new Error("Ops! Algo deu errado :c, Tente recarregar a página!");
            }
    }