export class CanvasBarras {
    private ctx: CanvasRenderingContext2D;
    private canvasWidth: number;
    private canvasHeight: number;

    public constructor(g: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        this.ctx = g;
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
    }

    public limpiar(): void {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    public graficarDatos(datos: number[]): void {
        this.limpiar();

        const datosValidos = datos.filter(valor => valor > 0);
        if (datosValidos.length === 0) return;

        const maxValor = Math.max(...datosValidos);
        const margenIzquierdo = 75;
        const margenSuperior = 45;
        const margenDerecho = 85;
        const espacioEntreBarras = 18;
        const profundidad = 12;
        const anchoMaximoDisponible = this.canvasWidth - margenIzquierdo - margenDerecho;
        const altoBarra = Math.max(
            18,
            Math.min(34, (this.canvasHeight - margenSuperior - 45) / datosValidos.length - espacioEntreBarras)
        );

        const colores = [
            { f: '#e74c3c', s: '#ff7979', l: '#c0392b' },
            { f: '#f1c40f', s: '#f9e79f', l: '#f39c12' },
            { f: '#2ecc71', s: '#82e0aa', l: '#27ae60' },
            { f: '#3498db', s: '#85c1e9', l: '#2980b9' },
            { f: '#9b59b6', s: '#d7bde2', l: '#8e44ad' }
        ];

        this.dibujarTitulo();
        this.dibujarEjeHorizontal(margenIzquierdo, margenSuperior, anchoMaximoDisponible, datosValidos.length, altoBarra, espacioEntreBarras);

        for (let i = 0; i < datosValidos.length; i++) {
            const valor = datosValidos[i];
            const anchoBarra = (valor * anchoMaximoDisponible) / maxValor;
            const posicionY = margenSuperior + i * (altoBarra + espacioEntreBarras);
            const colorSet = colores[i % colores.length];

            this.ctx.fillStyle = '#333';
            this.ctx.font = 'bold 13px Arial';
            this.ctx.textAlign = 'right';
            this.ctx.fillText(`Dato ${i + 1}`, margenIzquierdo - 10, posicionY + altoBarra / 2 + 5);

            this.dibujarBarra3D(
                margenIzquierdo,
                posicionY,
                anchoBarra,
                altoBarra,
                colorSet.f,
                colorSet.s,
                colorSet.l,
                profundidad
            );

            this.ctx.fillStyle = '#333';
            this.ctx.font = 'bold 13px Arial';
            this.ctx.textAlign = 'left';
            this.ctx.fillText(valor.toString(), margenIzquierdo + anchoBarra + profundidad + 8, posicionY + altoBarra / 2 + 5);
        }
    }

    private dibujarTitulo(): void {
        this.ctx.fillStyle = '#222';
        this.ctx.font = 'bold 18px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Gráfico de barras horizontal', this.canvasWidth / 2, 24);
    }

    private dibujarEjeHorizontal(x: number, y: number, ancho: number, cantidadDatos: number, altoBarra: number, espacio: number): void {
        const altoTotal = cantidadDatos * (altoBarra + espacio) - espacio;

        this.ctx.strokeStyle = '#666';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y - 5);
        this.ctx.lineTo(x, y + altoTotal + 8);
        this.ctx.lineTo(x + ancho + 20, y + altoTotal + 8);
        this.ctx.stroke();
    }

    private dibujarBarra3D(
        x: number,
        y: number,
        ancho: number,
        alto: number,
        colorFrente: string,
        colorSuperior: string,
        colorLateral: string,
        profundidad: number
    ): void {
        this.ctx.fillStyle = colorSuperior;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(x + profundidad, y - profundidad);
        this.ctx.lineTo(x + ancho + profundidad, y - profundidad);
        this.ctx.lineTo(x + ancho, y);
        this.ctx.closePath();
        this.ctx.fill();

        this.ctx.fillStyle = colorLateral;
        this.ctx.beginPath();
        this.ctx.moveTo(x + ancho, y);
        this.ctx.lineTo(x + ancho + profundidad, y - profundidad);
        this.ctx.lineTo(x + ancho + profundidad, y + alto - profundidad);
        this.ctx.lineTo(x + ancho, y + alto);
        this.ctx.closePath();
        this.ctx.fill();

        this.ctx.fillStyle = colorFrente;
        this.ctx.fillRect(x, y, ancho, alto);
    }
}
