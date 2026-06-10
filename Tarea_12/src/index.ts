// Vinculación de elementos del DOM
const canvas = document.getElementById("canvasPoligonos") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const inputLados = document.getElementById("inputLados") as HTMLInputElement;
const lblLados = document.getElementById("lblLados") as HTMLSpanElement;
const btnGraficar = document.getElementById("btnGraficar") as HTMLButtonElement;

// Radio fijo
const RADIO = 150;

function dibujarPoligonoPro() {
    // 1. Limpieza total del Lienzo
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. Obtener valores de los controles numéricos
    const lados = Number(inputLados.value);

    // Actualizar etiqueta dinámica
    lblLados.innerText = lados.toString();

    // 3. Definir centro geométrico del lienzo
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // 4. DIBUJAR LÍNEAS GUÍA DE FONDO (Aspecto de plano técnico)
    ctx.strokeStyle = "#f1f5f9";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(centerX, centerY, RADIO, 0, 2 * Math.PI);
    ctx.stroke();

    // 5. CALCULAR VÉRTICES Y DIBUJAR LA FIGURA
    const vertices: { x: number; y: number }[] = [];

    for (let i = 0; i < lados; i++) {
        const angulo = (2 * Math.PI * i) / lados;
        const x = centerX + RADIO * Math.cos(angulo);
        const y = centerY + RADIO * Math.sin(angulo);
        vertices.push({ x, y });
    }

    // Degradado de relleno color vino
    const gradientRelleno = ctx.createLinearGradient(centerX - RADIO, centerY - RADIO, centerX + RADIO, centerY + RADIO);
    gradientRelleno.addColorStop(0, "#9b1c31");
    gradientRelleno.addColorStop(1, "#5c0a17");

    // Trazar la ruta del polígono
    ctx.beginPath();
    ctx.moveTo(vertices[0].x, vertices[0].y);
    for (let i = 1; i < lados; i++) {
        ctx.lineTo(vertices[i].x, vertices[i].y);
    }
    ctx.closePath();

    // Sombra
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

    // Líneas internas desde el centro
    ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
    ctx.lineWidth = 1;
    for (let i = 0; i < lados; i++) {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(vertices[i].x, vertices[i].y);
        ctx.stroke();
    }

    // Nodos en vértices
    for (let i = 0; i < lados; i++) {
        ctx.beginPath();
        ctx.arc(vertices[i].x, vertices[i].y, 5, 0, 2 * Math.PI);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.strokeStyle = "#5c0a17";
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    // Nodo central
    ctx.beginPath();
    ctx.arc(centerX, centerY, 4, 0, 2 * Math.PI);
    ctx.fillStyle = "#c0233e";
    ctx.fill();
}

inputLados.addEventListener("input", dibujarPoligonoPro);
btnGraficar.addEventListener("click", dibujarPoligonoPro);

dibujarPoligonoPro();
