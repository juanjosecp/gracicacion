
import { CanvasLocal } from './canvasLocal.js';
const canvas=document.getElementById('circlechart');
const ctx=canvas.getContext('2d');
const app=new CanvasLocal(ctx,canvas);

app.paint();

document.getElementById('btnDibujar').onclick=()=>app.setFunction(document.getElementById('funcInput').value);
document.getElementById('btnZoomIn').onclick=()=>app.setZoom(0.7);
document.getElementById('btnZoomOut').onclick=()=>app.setZoom(1.4);
document.getElementById('btnReset').onclick=()=>app.resetZoom();

document.getElementById('colorGrafica').onchange=(e)=>{
 app.color=e.target.value;
 app.paint();
};

document.getElementById('btnDark').onclick=()=>document.body.classList.toggle('dark');

document.querySelectorAll('.preset').forEach(b=>{
 b.onclick=()=>{
   document.getElementById('funcInput').value=b.dataset.f;
   app.setFunction(b.dataset.f);
 };
});

canvas.addEventListener('mousemove',(e)=>{
 const r=canvas.getBoundingClientRect();
 const x=((e.clientX-r.left)-app.centerX)*app.pixelSize;
 const y=(app.centerY-(e.clientY-r.top))*app.pixelSize;
 document.getElementById('coords').textContent=`X:${x.toFixed(2)} Y:${y.toFixed(2)}`;
});
