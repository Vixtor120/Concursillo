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