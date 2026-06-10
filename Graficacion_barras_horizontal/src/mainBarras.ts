import { CanvasBarras } from './CanvasBarras.js';

const canvas = <HTMLCanvasElement>document.getElementById('canvas-barras');
const ctx = canvas.getContext('2d');
const inputDatos = <HTMLInputElement>document.getElementById('datos-input');
const btnGraficar = <HTMLButtonElement>document.getElementById('btn-graficar-barras');

if (ctx && canvas && inputDatos && btnGraficar) {
    const miGrafico = new CanvasBarras(ctx, canvas);

    const leerDatosDesdePantalla = (): number[] => {
        return inputDatos.value
            .split(',')
            .map(dato => Number(dato.trim()))
            .filter(dato => Number.isFinite(dato) && dato > 0);
    };

    const graficar = (): void => {
        const datos = leerDatosDesdePantalla();

        if (datos.length === 0) {
            alert('Ingresa números positivos separados por coma. Ejemplo: 10, 25, 40, 15');
            return;
        }

        miGrafico.graficarDatos(datos);
    };

    btnGraficar.addEventListener('click', graficar);
    inputDatos.addEventListener('keyup', (evento: KeyboardEvent) => {
        if (evento.key === 'Enter') graficar();
    });

    graficar();
} else {
    console.error('No se encontraron los elementos necesarios para graficar.');
}
