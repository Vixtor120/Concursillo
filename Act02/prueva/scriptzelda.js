let preguntasSeleccionadas = []; // Array para almacenar las preguntas seleccionadas

function cargarPreguntas() { // Función para cargar las preguntas de cómo escapar de una cárcel
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
                pregunta.options.forEach((opcion, opcionIndex) => { // Iterar sobre las opciones de la pregunta
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
                preguntasDiv.appendChild(preguntaDiv); // Agregar el div de la pregunta al div de preguntas
            });
        })
        .catch(error => console.error('Error al cargar las preguntas:', error)); // Manejar errores en la carga de las preguntas
}

document.addEventListener('DOMContentLoaded', (event) => { // Cargar las preguntas al cargar la página
    cargarPreguntas(); // Llamar a la función para cargar las preguntas
});

function guardarRespuestas() {  // Función para guardar las respuestas seleccionadas por el usuario
    let correctAnswers = 0; // Contador para las respuestas correctas
    let totalQuestions = preguntasSeleccionadas.length; // Número total de preguntas

    preguntasSeleccionadas.forEach((pregunta, index) => { // Iterar sobre las preguntas seleccionadas
        let selectedOption = document.querySelector(`input[name="pregunta${index}"]:checked`); // Obtener la opción seleccionada
        if (selectedOption && selectedOption.value === pregunta.correctAnswer) { // Cambiado a 'correctAnswer'
            correctAnswers++; // Incrementar el contador de respuestas correctas
        }
    });

    console.log(`Correct Answers: ${correctAnswers}, Total Questions: ${totalQuestions}`); // Verificar el conteo de respuestas correctas

    if (correctAnswers === totalQuestions) { // Verificar si todas las respuestas son correctas
        showWinPopup();
    } else { // Si hay respuestas incorrectas
        showLosePopup();
    }
}

function showWinPopup() { // Función para mostrar el pop-up de victoria
    const winPopup = document.getElementById('win-popup');
    winPopup.classList.remove('hidden');
    winPopup.style.display = 'flex';
}

function showLosePopup() { // Función para mostrar el pop-up de derrota
    const losePopup = document.getElementById('lose-popup');
    losePopup.classList.remove('hidden');
    losePopup.style.display = 'flex';
}

function goToNextLevel() { // Función para ir al siguiente nivel
    window.location.href = 'salvar_roberto.html'; // Reemplaza con la URL real
}

function goToIndex() { // Función para regresar al índice
    window.location.href = 'index.html';
}