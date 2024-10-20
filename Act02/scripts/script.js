let index = 0;
let nickname;
let correctAnswers = [];
let incorrectAnswers = [];
let preguntasSeleccionadas = []; // Array para almacenar las preguntas seleccionadas

//------------------------------------------------------------------------------------------------------------------------------------------------
// NOMBRE DE USUARIO PARA INICIAR EL JUEGO
function startNickname() {
    nickname = document.getElementById('username').value;
    let result;

    if (nickname === '') {
        result = 'Por favor, introduce un nombre para iniciar el juego!';
    } else {
        localStorage.setItem('nickname', nickname);
        window.location.href = 'intro.html';
    }

    document.getElementById('resultado').innerHTML = result;
}

//------------------------------------------------------------------------------------------------------------------------------------------------
// Funciones para manejar el pop-up
function closePopup() { // Función para cerrar el pop-up
    const popup = document.getElementById('popup'); // Obtener el pop-up
    const openButton = document.getElementById('open-popup');
    popup.classList.add('hidden2'); // Oculta el pop-up
    openButton.classList.add('visible'); // Muestra el botón de volver a abrir
}

function minimizePopup() { // Función para minimizar el pop-up
    const popup = document.getElementById('popup');
    const openButton = document.getElementById('open-popup');
    popup.classList.add('hidden2'); // Oculta el pop-up como si lo minimizara
    openButton.classList.add('visible'); // Muestra el botón de volver a abrir
}

function showPopup() { // Función para mostrar el pop-up
    const popup = document.getElementById('popup');
    const openButton = document.getElementById('open-popup');
    popup.classList.remove('hidden2'); // Muestra el pop-up
    openButton.classList.remove('visible'); // Oculta el botón de volver a abrir
}

// Puedes hacer que el pop-up aparezca por defecto al cargar la página:
document.addEventListener("DOMContentLoaded", function() {
    showPopup(); // Muestra el pop-up al cargar la página
});

//------------------------------------------------------------------------------------------------------------------------------------------------
// Funciones para manejar los pop-ups de gatos
let catPopupCount = 6; // Número total de pop-ups de memes de gatos
let closedCatPopups = 0; // Contador para el número de pop-ups de gatos cerrados

function showMessage() {
    const messageElement = document.getElementById('hack-text'); // Elemento para mostrar el mensaje
    const message = `🐱Buenas, ${nickname} has sido hackeado por un gato. ¡Miau!🐱`; // Mensaje a mostrar
    let i = 0; // Índice para obtener el siguiente caracter del mensaje

    function typeMessage() { // Función para mostrar el mensaje letra por letra
        if (i < message.length) { // Verificar si no se ha mostrado todo el mensaje
            messageElement.textContent += message.charAt(i); // Mostrar el siguiente caracter
            i++; // Incrementar el índice para obtener el siguiente caracter
            setTimeout(typeMessage, 100); // Llamar a la función de nuevo después de 100ms
        } else { // Cuando se haya mostrado todo el mensaje
            showCatPopups(); // Mostrar los pop-ups de gatos
        }
    }
    typeMessage(); // Iniciar la función para mostrar el mensaje
}

function showCatPopups() {
    for (let i = 1; i <= catPopupCount; i++) { // Iterar sobre el número total de pop-ups
        setTimeout(() => { // Esperar un tiempo antes de mostrar cada pop-up
            const popup = document.getElementById(`cat-popup-${i}`); // Obtener el pop-up actual
            if (popup) { // Verificar si el pop-up existe
                popup.classList.remove('hidden');
                popup.style.display = 'flex'; // Mostrar los pop-ups
            }
        }, i * 500); // Mostrar cada pop-up con un retraso
    }
}

function closeCatPopup(popupNumber) { // Función para cerrar un pop-up de gato
    const popup = document.getElementById(`cat-popup-${popupNumber}`); // Obtener el pop-up actual
    if (popup) { // Verificar si el pop-up existe
        popup.classList.add('hidden'); // Ocultar el pop-up
        popup.style.display = 'none'; // Asegurarse de ocultar el pop-up
        closedCatPopups++; // Incrementar el contador de pop-ups cerrados
        checkAllCatPopupsClosed(); // Verificar si todos los pop-ups de gatos han sido cerrados
    }
}

function checkAllCatPopupsClosed() { // Función para verificar si todos los pop-ups de gatos han sido cerrados
    if (closedCatPopups === catPopupCount) { // Verificar si todos los pop-ups han sido cerrados
        window.location.href = "atraco.html"; // Redirigir a la siguiente página
    }
}

// Iniciar la animación del texto y pop-ups cuando cargue la página
document.addEventListener("DOMContentLoaded", function() {
    nickname = localStorage.getItem('nickname'); // Obtener el nombre de usuario desde el almacenamiento local
    showMessage(); // Mostrar el mensaje al cargar la página
});

//------------------------------------------------------------------------------------------------------------------------------------------------
// Función para cambiar el fondo animado
const colors = [
    ['#FFABAB', '#FFC3A0'],
    ['#FF677D', '#D0F9FF'],
    ['#D3E0EA', '#FF7B7B'],
    ['#FFB7B2', '#D9BF77'],
    ['#C2B5D8', '#F9FBCB']
];

function changeBackgroundColor() {
    // Cambia el fondo a un degradado
    document.body.style.background = `linear-gradient(to right, ${colors[index][0]}, ${colors[index][1]})`;
    index = (index + 1) % colors.length; // Cicla a través de los colores
}

setInterval(changeBackgroundColor, 1000); // Cambia cada 2 segundos
//------------------------------------------------------------------------------------------------------------------------------------------------
// Función para cargar las preguntas de cómo escapar de una cárcel
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
} 
//------------------------------------------------------------------------------------------------------------------------------------------------
// Función para cargar las preguntas de cómo escapar de una cárcel
function cargarPreguntas() {
    fetch('../data/carcel.json') // Obtener los datos del archivo JSON
        .then(response => response.json()) // Convertir los datos a JSON
        .then(data => { // Usar los datos obtenidos
            console.log(data); // Verificar los datos obtenidos
            let preguntas = data.questions; // Obtener las preguntas del JSON

            // Seleccionar dos preguntas aleatorias
            preguntasSeleccionadas = []; // Reiniciar el array de preguntas seleccionadas
            while (preguntasSeleccionadas.length < 2) { // Mientras no se hayan seleccionado dos preguntas
                let pregunta = preguntas[Math.floor(Math.random() * preguntas.length)]; // Seleccionar una pregunta aleatoria
                if (!preguntasSeleccionadas.includes(pregunta)) { // Verificar si la pregunta no ha sido seleccionada
                    preguntasSeleccionadas.push(pregunta); // Agregar la pregunta seleccionada al array
                }
            }

            // Mostrar las preguntas en el HTML
            let preguntasDiv = document.getElementById('preguntas'); // Obtener el div para las preguntas
            preguntasDiv.innerHTML = ''; // Limpiar el contenido actual
            preguntasSeleccionadas.forEach((pregunta, index) => { // Iterar sobre las preguntas seleccionadas
                let preguntaDiv = document.createElement('div'); // Crear un div para la pregunta
                preguntaDiv.className = 'pregunta'; // Agregar la clase 'pregunta' al div
                preguntaDiv.innerHTML = `<p>${pregunta.question}</p>`; // Modificado para usar la clave correcta

                let opcionesDiv = document.createElement('div'); // Crear un div para las opciones
                let opcionesMezcladas = shuffleArray([...pregunta.options]); // Mezclar las opciones
                opcionesMezcladas.forEach((opcion, opcionIndex) => { // Iterar sobre las opciones de la pregunta
                    let opcionLabel = document.createElement('label'); // Crear una etiqueta para la opción
                    let opcionInput = document.createElement('input'); // Crear un input para la opción
                    opcionInput.type = 'radio'; // Establecer el tipo de input como radio
                    opcionInput.name = `pregunta${index}`; // Establecer el nombre del input
                    opcionInput.value = opcion; // Establecer el valor del input
                    opcionLabel.appendChild(opcionInput); // Agregar el input a la etiqueta
                    opcionLabel.appendChild(document.createTextNode(opcion)); // Agregar el texto de la opción a la etiqueta
                    opcionesDiv.appendChild(opcionLabel); // Agregar la etiqueta al div de opciones
                });

                preguntaDiv.appendChild(opcionesDiv); // Agregar el div de opciones al div de la pregunta
                preguntasDiv.appendChild(preguntaDiv); // Agregar el div de la pregunta al div principal
            });
        })
        .catch(error => console.error('Error al cargar las preguntas:', error)); // Manejar errores
}

//------------------------------------------------------------------------------------------------------------------------------------------------
// Función para guardar las respuestas seleccionadas por el usuario
function guardarRespuestasCarcel() {
    let correctAnswers = [];
    let incorrectAnswers = [];
    let totalQuestions = preguntasSeleccionadas.length;

    preguntasSeleccionadas.forEach((pregunta, index) => {
        const selectedOption = document.querySelector(`input[name="pregunta${index}"]:checked`);
        if (selectedOption) {
            if (selectedOption.value === pregunta.correctAnswer) {
                correctAnswers.push(pregunta.question);
            } else {
                incorrectAnswers.push(pregunta.question);
            }
        } else {
            incorrectAnswers.push(pregunta.question);
        }

        // Deshabilitar todas las opciones de respuesta para esta pregunta
        const options = document.querySelectorAll(`input[name="pregunta${index}"]`);
        options.forEach(option => {
            option.disabled = true;
        });
    });

    localStorage.setItem('correctAnswers', JSON.stringify(correctAnswers));
    localStorage.setItem('incorrectAnswers', JSON.stringify(incorrectAnswers));

    if (correctAnswers.length === totalQuestions) {
        showWinPopupCarcel();
    } else {
        showLosePopupCarcel();
    }
}

function guardarRespuestasZelda() {
    let correctAnswers = JSON.parse(localStorage.getItem('correctAnswers')) || [];
    let incorrectAnswers = JSON.parse(localStorage.getItem('incorrectAnswers')) || [];
    let totalQuestions = preguntasSeleccionadas.length;

    preguntasSeleccionadas.forEach((pregunta, index) => {
        const selectedOption = document.querySelector(`input[name="pregunta${index}"]:checked`);
        if (selectedOption) {
            if (selectedOption.value === pregunta.correctAnswer) {
                correctAnswers.push(pregunta.question);
            } else {
                incorrectAnswers.push(pregunta.question);
            }
        } else {
            incorrectAnswers.push(pregunta.question);
        }

        // Deshabilitar todas las opciones de respuesta para esta pregunta
        const options = document.querySelectorAll(`input[name="pregunta${index}"]`);
        options.forEach(option => {
            option.disabled = true;
        });
    });

    localStorage.setItem('correctAnswers', JSON.stringify(correctAnswers));
    localStorage.setItem('incorrectAnswers', JSON.stringify(incorrectAnswers));

    if (correctAnswers.length === totalQuestions) {
        showWinPopupZelda();
    } else {
        showLosePopupZelda();
    }
}

function guardarRespuestasEldenRing() {
    let correctAnswers = JSON.parse(localStorage.getItem('correctAnswers')) || [];
    let incorrectAnswers = JSON.parse(localStorage.getItem('incorrectAnswers')) || [];
    let totalQuestions = preguntasSeleccionadas.length;

    preguntasSeleccionadas.forEach((pregunta, index) => {
        const selectedOption = document.querySelector(`input[name="pregunta${index}"]:checked`);
        if (selectedOption) {
            if (selectedOption.value === pregunta.correctAnswer) {
                correctAnswers.push(pregunta.question);
            } else {
                incorrectAnswers.push(pregunta.question);
            }
        } else {
            incorrectAnswers.push(pregunta.question);
        }

        // Deshabilitar todas las opciones de respuesta para esta pregunta
        const options = document.querySelectorAll(`input[name="pregunta${index}"]`);
        options.forEach(option => {
            option.disabled = true;
        });
    });

    localStorage.setItem('correctAnswers', JSON.stringify(correctAnswers));
    localStorage.setItem('incorrectAnswers', JSON.stringify(incorrectAnswers));

    if (correctAnswers.length === totalQuestions) {
        showWinPopupEldenRing();
    } else {
        showLosePopupEldenRing();
    }
}

//------------------------------------------------------------------------------------------------------------------------------------------------
// Funciones para mostrar los pop-ups de victoria y derrota
function showWinPopupCarcel() {
    const winPopup = document.getElementById('win-popup');
    winPopup.classList.remove('hidden');
    winPopup.style.display = 'flex';
}

function showLosePopupCarcel() {
    const losePopup = document.getElementById('lose-popup');
    losePopup.classList.remove('hidden');
    losePopup.style.display = 'flex';
}
function showWinPopupZelda() {
    const winPopup = document.getElementById('win-popup');
    winPopup.classList.remove('hidden');
    winPopup.style.display = 'flex';
}
function showLosePopupZelda() {
    const losePopup = document.getElementById('lose-popup');
    losePopup.classList.remove('hidden');
    losePopup.style.display = 'flex';
}
function showWinPopupEldenRing() {
    const winPopup = document.getElementById('win-popup');
    winPopup.classList.remove('hidden');
    winPopup.style.display = 'flex';
}
function showLosePopupEldenRing() {
    const losePopup = document.getElementById('lose-popup');
    losePopup.classList.remove('hidden');
    losePopup.style.display = 'flex';
}
//------------------------------------------------------------------------------------------------------------------------------------------------
function clearAnswers() {
    localStorage.removeItem('correctAnswers');
    localStorage.removeItem('incorrectAnswers');
}

function downloadResults() {
    const nickname = localStorage.getItem('nickname');
    const correctAnswers = JSON.parse(localStorage.getItem('correctAnswers')) || [];
    const incorrectAnswers = JSON.parse(localStorage.getItem('incorrectAnswers')) || [];

    const results = {
        nickname: nickname,
        correctAnswersCount: correctAnswers.length,
        incorrectAnswersCount: incorrectAnswers.length
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(results));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "resultados.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();

    clearAnswers(); // Limpiar las respuestas después de descargar el JSON
}
//------------------------------------------------------------------------------------------------------------------------------------------------
// Funciones para navegar entre niveles
function goToNextLevel() { // Función para ir al siguiente nivel
    window.location.href = 'lore2.html';
}

function goToIndex() { // Función para regresar al índice
    window.location.href = 'index.html';
}

//------------------------------------------------------------------------------------------------------------------------------------------------
// Función para iniciar la cuenta atrás
document.addEventListener('DOMContentLoaded', (event) => {
    const contadorElemento = document.getElementById('contador');
    const warningImage = document.getElementById('warning-image');
    let tiempoRestante = 60; // Tiempo en segundos

    function iniciarCuentaAtras() {
        const intervalo = setInterval(() => {
            if (tiempoRestante <= 0) {
                clearInterval(intervalo);
                showLosePopupCarcel(); // Mostrar el pop-up de derrota al finalizar el tiempo
            } else {
                contadorElemento.textContent = `Tiempo restante: ${tiempoRestante} segundos`;
                if (tiempoRestante === 20) {
                    warningImage.style.display = 'block'; // Mostrar la imagen de advertencia cuando queden 20 segundos
                }
                tiempoRestante--;
            }
        }, 1000); // Actualiza cada segundo
    }

    iniciarCuentaAtras();
});
//------------------------------------------------------------------------------------------------------------------------------------------------
function cargarPreguntas2() {
    clearAnswers();
    fetch('../data/zelda.json') // Obtener los datos del archivo JSON
        .then(response => response.json()) // Convertir los datos a JSON
        .then(data => { // Usar los datos obtenidos
            console.log(data); // Verificar los datos obtenidos
            let preguntas = data.questions; // Obtener las preguntas del JSON

            // Seleccionar dos preguntas aleatorias
            preguntasSeleccionadas = []; // Reiniciar el array de preguntas seleccionadas
            while (preguntasSeleccionadas.length < 2) { // Mientras no se hayan seleccionado dos preguntas
                let pregunta = preguntas[Math.floor(Math.random() * preguntas.length)]; // Seleccionar una pregunta aleatoria
                if (!preguntasSeleccionadas.includes(pregunta)) { // Verificar si la pregunta no ha sido seleccionada
                    preguntasSeleccionadas.push(pregunta); // Agregar la pregunta seleccionada al array
                }
            }

            // Mostrar las preguntas en el HTML
            let preguntasDiv = document.getElementById('preguntas'); // Obtener el div para las preguntas
            preguntasDiv.innerHTML = ''; // Limpiar el contenido actual
            preguntasSeleccionadas.forEach((pregunta, index) => { // Iterar sobre las preguntas seleccionadas
                let preguntaDiv = document.createElement('div'); // Crear un div para la pregunta
                preguntaDiv.className = 'pregunta'; // Agregar la clase 'pregunta' al div
                preguntaDiv.innerHTML = `<p>${pregunta.question}</p>`; // Modificado para usar la clave correcta

                let opcionesDiv = document.createElement('div'); // Crear un div para las opciones
                let opcionesMezcladas = shuffleArray([...pregunta.options]); // Mezclar las opciones
                opcionesMezcladas.forEach((opcion, opcionIndex) => { // Iterar sobre las opciones de la pregunta
                    let opcionLabel = document.createElement('label'); // Crear una etiqueta para la opción
                    let opcionInput = document.createElement('input'); // Crear un input para la opción
                    opcionInput.type = 'radio'; // Establecer el tipo de input como radio
                    opcionInput.name = `pregunta${index}`; // Establecer el nombre del input
                    opcionInput.value = opcion; // Establecer el valor del input
                    opcionLabel.appendChild(opcionInput); // Agregar el input a la etiqueta
                    opcionLabel.appendChild(document.createTextNode(opcion)); // Agregar el texto de la opción a la etiqueta
                    opcionesDiv.appendChild(opcionLabel); // Agregar la etiqueta al div de opciones
                    opcionesDiv.appendChild(document.createElement('br')); // Agregar un salto de línea entre las opciones
                });

                preguntaDiv.appendChild(opcionesDiv); // Agregar el div de opciones al div de la pregunta
                preguntasDiv.appendChild(preguntaDiv); // Agregar el div de la pregunta al div principal
            });
        })
        .catch(error => console.error('Error al cargar las preguntas:', error));
}
//------------------------------------------------------------------------------------------------------------------------------------------------
function cargarPreguntas3() {
    clearAnswers();
    fetch('../data/eldenring.json') // Obtener los datos del archivo JSON
        .then(response => response.json()) // Convertir los datos a JSON
        .then(data => { // Usar los datos obtenidos
            console.log(data); // Verificar los datos obtenidos
            let preguntas = data.questions; // Obtener las preguntas del JSON

            // Seleccionar dos preguntas aleatorias
            preguntasSeleccionadas = []; // Reiniciar el array de preguntas seleccionadas
            while (preguntasSeleccionadas.length < 2) { // Mientras no se hayan seleccionado dos preguntas
                let pregunta = preguntas[Math.floor(Math.random() * preguntas.length)]; // Seleccionar una pregunta aleatoria
                if (!preguntasSeleccionadas.includes(pregunta)) { // Verificar si la pregunta no ha sido seleccionada
                    preguntasSeleccionadas.push(pregunta); // Agregar la pregunta seleccionada al array
                }
            }

            // Mostrar las preguntas en el HTML
            let preguntasDiv = document.getElementById('preguntas'); // Obtener el div para las preguntas
            preguntasDiv.innerHTML = ''; // Limpiar el contenido actual
            preguntasSeleccionadas.forEach((pregunta, index) => { // Iterar sobre las preguntas seleccionadas
                let preguntaDiv = document.createElement('div'); // Crear un div para la pregunta
                preguntaDiv.className = 'pregunta'; // Agregar la clase 'pregunta' al div
                preguntaDiv.innerHTML = `<p>${pregunta.question}</p>`; // Modificado para usar la clave correcta

                let opcionesDiv = document.createElement('div'); // Crear un div para las opciones
                let opcionesMezcladas = shuffleArray([...pregunta.options]); // Mezclar las opciones
                opcionesMezcladas.forEach((opcion, opcionIndex) => { // Iterar sobre las opciones de la pregunta
                    let opcionLabel = document.createElement('label'); // Crear una etiqueta para la opción
                    let opcionInput = document.createElement('input'); // Crear un input para la opción
                    opcionInput.type = 'radio'; // Establecer el tipo de input como radio
                    opcionInput.name = `pregunta${index}`; // Establecer el nombre del input
                    opcionInput.value = opcion; // Establecer el valor del input
                    opcionLabel.appendChild(opcionInput); // Agregar el input a la etiqueta
                    opcionLabel.appendChild(document.createTextNode(opcion)); // Agregar el texto de la opción a la etiqueta
                    opcionesDiv.appendChild(opcionLabel); // Agregar la etiqueta al div de opciones
                    opcionesDiv.appendChild(document.createElement('br')); // Agregar un salto de línea entre las opciones
                });

                preguntaDiv.appendChild(opcionesDiv); // Agregar el div de opciones al div de la pregunta
                preguntasDiv.appendChild(preguntaDiv); // Agregar el div de la pregunta al div principal
            });
        })
        .catch(error => console.error('Error al cargar las preguntas:', error));
}

// Funciones para navegar entre niveles
function goToNextLevel2() { // Función para ir al siguiente nivel
    window.location.href = 'salvar_roberto.html';
}
 
function goToIndex2() { // Función para regresar al índice
    window.location.href = 'index.html';
}