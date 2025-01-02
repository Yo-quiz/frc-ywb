// Lista completa de Yo-kai con sus nombres e imágenes
const yoKaiList = [
   { "name": "Rudy", "img": "Pelirrojo.png" },
  { "name": "Blizzie", "img": "Grazi.png" },
  { "name": "Usapyon", "img": "Usapyon.png" },
  { "name": "Usapyon", "img": "Usapyon_F.png" },
  { "name": "Usapyon", "img": "Usapyon_S.png" },
  { "name": "Usapyon", "img": "Usapyon_M.png" },
  { "name": "Usapyon", "img": "Usapyon_P.png" },
  { "name": "Whisper", "img": "Whisper.png" },
  { "name": "Whispocrates", aliases: ["Whispocrates", "Private Whispocrates"], "img": "Whispocrates.png" },
  { "name": "Jibanyan B", "img": "Jibanyan_B.png" },
  { "name": "Komasan B", "img": "Komasan_B.png" },
  { "name": "Sir Nyansalot", "img": "Sir_Nyancelot.png" },
  { "name": "Maginyan", "img": "Maginyan.png" },
  { "name": "Momonyan", "img": "Momonyan.png" },
  { "name": "Puppynyan", "img": "Perronyan.png" },
  { "name": "Chimpanyan", "img": "Simionyan.png" },
  { "name": "Pheasanyan", "img": "Faisanyan.png" },
  { "name": "Demuncher", "img": "Devoramonios_B.png" },
  { "name": "Devourer", "img": "Devoralmas_B.png" },
  { "name": "Tattleterror", "img": "Cotiterror.png" },
  { "name": "Mass Mutterer", "img": "Murmullamasa.png" },
  { "name": "Whisped Cream", aliases: ["Whisped Cream", "Whismellowman"], "img": "Cremaligno.png" },
  { "name": "Robonyan 28", "img": "Robonyan_28.png" },
  { "name": "Red Paws", "img": "Zarparroja.png" },
  { "name": "Swirlious Omai", "img": "Vueltomai.png" },
  { "name": "Bison Burly", "img": "Coman-cachas.png" },
  { "name": "Arachnevil", "img": "Aracnefico.png" },
  { "name": "Toadal Demon", "img": "Belcefibio.png" },
  { "name": "Fuu 2", "img": "Normalino.png" },
  { "name": "Kintaronyan", "img": "Kintaronyan.png" },
  { "name": "Kabuking", "img": "Kabukio_A.png" },
  { "name": "Rubeus J", "img": "Rubeo_J_A.png" },
  { "name": "Hardy Hound", "img": "Gran_Sabueso_A.png" },
  { "name": "Seaweed Sns.", aliases: ["Seaweed Sns.", "Seaweed Sensei"],  "img": "Alga_Sensei.png" },
  { "name": "Odysseynyan", "img": "Odisenyan.png" },
  { "name": "Gutsy Bones", "img": "Tripasqueleto_A.png" },
  { "name": "Usapyon B", "img": "Usapyon_B.png" },
  { "name": "Drenchetta", "img": "Tristeresa.png" },
  { "name": "Starry Noko", "img": "Estrenoko.png" },
  { "name": "Lord Enma", "img": "Gran_Enma.png" },
  { "name": "Captain Thunder", "img": "Capitan_Rayo.png" },
  { "name": "Captain Thunder", "img": "Capitan_Rayo_S.png" },
  { "name": "Robonyan 3000", "img": "Robonyan_3000.png" },
  { "name": "Duke Drooly", "img": "Duque_Lametodo.png" },
  { "name": "Alicktokat", "img": "Chupatricio.png" },
  { "name": "Zazel", "img": "Zazel.png" },
  { "name": "Zazelmare", "img": "Zazerilio.png" },
  { "name": "Golden Claws", "img": "Zarpadorada.png" },
  { "name": "Swirlious Gold", "img": "Vueltodorado.png" },
  { "name": "Hinozall Awoken", "img": "Intelecto_Iluminado.png" },
  { "name": "Shogun King", "img": "Shogun_Real.png" },
  { "name": "Pink Emperor", "img": "Emperador_Rosa.png" },
      
]

let score = 0; 
let gameEnded = false; // Evita cambios una vez terminado el juego
const unlockedYoKai = new Set(); // Registro de Yo-kai desbloqueados por índice

// Normalizar la entrada del usuario (sin tildes y en minúsculas)
function normalizeString(str) {
    return str.normalize("NFD").replace(/[̀-\u036f]/g, "").toLowerCase();
}

// Crear el objeto de audio una sola vez
let getSound = new Audio("get.mp3");

// Reproducir sonido cuando se desbloquea un Yo-kai (sin solapamiento)
function playGetSound() {
    if (!getSound.paused) {
        getSound.pause(); // Detener el sonido actual si ya está reproduciéndose
        getSound.currentTime = 0; // Reiniciar el sonido al principio
    }
    getSound.play(); // Reproducir el sonido
}

// Actualizar la puntuación en formato (adivinados / totales)
function updateScoreDisplay() {
    const scoreDisplay = document.getElementById("score");
    scoreDisplay.textContent = `${score}/${yoKaiList.length}`;
}

// Verificar la respuesta del usuario
function checkAnswer() {
    if (gameEnded) return; // Si el juego ha terminado, no hacer nada

    const userAnswer = normalizeString(document.getElementById("answer-input").value.trim());

    let correctGuess = false; // Bandera para reproducir el sonido solo si hay aciertos

    yoKaiList.forEach((yoKai, index) => {
        // Normaliza todos los nombres asociados al Yo-kai
        const normalizedNames = [yoKai.name, ...(yoKai.aliases || [])].map(name => normalizeString(name));

        // Si la respuesta coincide con alguno de los nombres y no ha sido desbloqueado
        if (normalizedNames.includes(userAnswer) && !unlockedYoKai.has(index)) {
            const yoKaiImg = document.getElementById(`yo-kai${index + 1}`);
            if (yoKaiImg && yoKaiImg.src.includes("no-kai.png")) {
                yoKaiImg.src = yoKai.img; // Actualiza la imagen

                // Añadir clase para animación
                yoKaiImg.classList.add("yokai-unlocked");
                yoKaiImg.addEventListener("animationend", () => {
                    yoKaiImg.classList.remove("yokai-unlocked"); // Quitar clase tras animación
                });

                unlockedYoKai.add(index); // Marcar el Yo-kai como desbloqueado
                score++;
                correctGuess = true; // Se encontró un acierto
            }
        }
    });

    if (correctGuess) {
        playGetSound(); // Reproducir sonido solo si hubo un acierto
        updateScoreDisplay(); // Actualizar puntuación
        document.getElementById("answer-input").value = ""; // Borra la respuesta después de un acierto
    }

    checkGameEnd(); // Verifica si el juego ha terminado
}

// Verificar si el juego ha terminado (cuando se han adivinado todos los Yo-kai)
function checkGameEnd() {
    if (score === yoKaiList.length) {
        gameEnded = true;
        stopTimer(); // Detener el temporizador
        showCongratsImage(); // Mostrar imagen de "¡Felicidades!"
    }
}

// Mostrar la imagen de "¡Felicidades!" al finalizar el juego
function showCongratsImage() {
    const congratsImg = document.createElement("img");
    congratsImg.src = "congrats.png";
    congratsImg.id = "congrats-image";
    congratsImg.style.position = "fixed";
    congratsImg.style.bottom = "0";
    congratsImg.style.left = "50%";
    congratsImg.style.transform = "translateX(-50%)";
    congratsImg.style.width = "100vw";
    congratsImg.style.zIndex = "1000";
    congratsImg.style.cursor = "pointer";

    // Ocultar la imagen al hacer clic
    congratsImg.addEventListener("click", () => {
        congratsImg.remove();
    });

    document.body.appendChild(congratsImg);
}

// Temporizador
let startTime;
let timerInterval;

function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;

    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

    const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    document.getElementById("time").textContent = formattedTime;
}

function stopTimer() {
    clearInterval(timerInterval);
}

// Manejador de evento: validación automática con "input"
document.getElementById("answer-input").addEventListener("input", checkAnswer);

// Inicializar el marcador y temporizador al cargar la página
updateScoreDisplay(); // Inicializa la puntuación en 0/total
startTimer();

window.addEventListener("beforeunload", (event) => {
    if (score > 0) { // Mostrar advertencia solo si hay progreso
        event.preventDefault();
        event.returnValue = "¿Estás seguro de que quieres salir? Se perderá todo el progreso.";
    }
});
