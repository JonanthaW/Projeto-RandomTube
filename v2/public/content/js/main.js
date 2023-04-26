var socket = io.connect();

socket.on("get_key", (key, videosQuantity) => {
    document.querySelector(".first-container-app a").addEventListener("click", ()=>{
        document.querySelector(".first-container-app").style.display = "none";
        document.querySelector(".second-container-app").style.display = "flex";
        generateVideo(key, 10);
    })
});

async function generateVideo(key, videosQuantity) {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
    const letters = alphabet.split("");
    let randomString = ""; // reseting  video
        try {
            for(var i=0; i<5; i++) {
                randomString += letters[Math.floor(Math.random() * alphabet.length)];
            }
            await fetch(`https://www.googleapis.com/youtube/v3/search?part=id&maxResults=${videosQuantity}&type=video&part=snippet&q="${randomString}&key=${key}`)
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
                    document.querySelector(`.second-container-app .container`).append(document.createElement("li"))
                    document.querySelector(`.second-container-app .container li:nth-child(${item})`).append(document.createElement("iframe"));
                    document.querySelector(`.second-container-app .container li:nth-child(${item}) iframe`).frameborder = "0";
                    document.querySelector(`.second-container-app .container li:nth-child(${item}) iframe`).setAttribute('allowFullScreen', '');
                    document.querySelector(`.second-container-app .container li:nth-child(${item}) iframe`).src = videoSource;
                }
                })
        }
            catch(err) {
                return new Error("Ops! Algo deu errado :c, Tente recarregar a página!");
            }
    }