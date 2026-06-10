// Vinculación de elementos del DOM
const canvas = document.getElementById("canvasPoligonos");
const ctx = canvas.getContext("2d");

const inputLados = document.getElementById("inputLados");
const lblLados = document.getElementById("lblLados");
const btnGraficar = document.getElementById("btnGraficar");

// Radio fijo
const RADIO = 150;

function dibujarPoligonoPro() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const lados = Number(inputLados.value);
    lblLados.innerText = lados.toString();

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.strokeStyle = "#f1f5f9";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(centerX, centerY, RADIO, 0, 2 * Math.PI);
    ctx.stroke();

    const vertices = [];
    for (let i = 0; i < lados; i++) {
        const angulo = (2 * Math.PI * i) / lados;
        const x = centerX + RADIO * Math.cos(angulo);
        const y = centerY + RADIO * Math.sin(angulo);
        vertices.push({ x, y });
    }

    const gradientRelleno = ctx.createLinearGradient(centerX - RADIO, centerY - RADIO, centerX + RADIO, centerY + RADIO);
    gradientRelleno.addColorStop(0, "#9b1c31");
    gradientRelleno.addColorStop(1, "#5c0a17");

    ctx.beginPath();
    ctx.moveTo(vertices[0].x, vertices[0].y);
    for (let i = 1; i < lados; i++) {
        ctx.lineTo(vertices[i].x, vertices[i].y);
    }
    ctx.closePath();

    ctx.shadowColor = "rgba(91, 10, 23, 0.35)";
    ctx.shadowBlur = 25;
    ctx.shadowOffsetY = 10;

    ctx.fillStyle = gradientRelleno;
    ctx.fill();

    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.strokeStyle = "#7a1020";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
    ctx.lineWidth = 1;
    for (let i = 0; i < lados; i++) {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(vertices[i].x, vertices[i].y);
        ctx.stroke();
    }

    for (let i = 0; i < lados; i++) {
        ctx.beginPath();
        ctx.arc(vertices[i].x, vertices[i].y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.strokeStyle = "#5c0a17";
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(centerX, centerY, 4, 0, 2 * Math.PI);
    ctx.fillStyle = "#c0233e";
    ctx.fill();
}

inputLados.addEventListener("input", dibujarPoligonoPro);
btnGraficar.addEventListener("click", dibujarPoligonoPro);

dibujarPoligonoPro();
