const grid = new Muuri('.grid',{
    layout: {
        rounding: false
      }
    });

window.addEventListener('load', ()=>{
    grid.refreshItems().layout();
    document.getElementById('grid').classList.add('imagenes-cargadas');

    const enlaces = document.querySelectorAll('#categorias a');
    enlaces.forEach( (elemento)=>{
        elemento.addEventListener('click', (e)=>{
            e.preventDefault();
            enlaces.forEach((enlace)=> enlace.classList.remove('activo'));
            e.target.classList.add('activo');

            const categoria = e.target.innerHTML.toLowerCase();
            categoria ==='todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`);
        });
    });

    //BARRA DE BUSQUEDA
    document.querySelector('#barra-busqueda').addEventListener('input', (e)=>{
        const busqueda = e.target.value;
        grid.filter((item)=> item.getElement().dataset.etiquetas.includes(busqueda));
    });

    //LISTENER EN IMAGENES
    const overlay = document.getElementById('overlay');
    document.querySelectorAll('.grid .item img').forEach((elemento)=>{
        elemento.addEventListener('click', ()=>{
            const ruta= elemento.getAttribute('src');
            const descripcion= elemento.parentNode.parentNode.dataset.descripcion;
            overlay.classList.add('activo');
            document.querySelector('#overlay img').src = ruta;
            document.querySelector('#overlay p').innerHTML = descripcion;
            
        });
    });

    //BOTON CERRAR
    document.querySelector('#btn-cerrar-popud').addEventListener('click', ()=>{
        overlay.classList.remove('activo');
    });
    //CERRAR CON CLICK AFUERA
    overlay.addEventListener('click', (e)=> {
        e.target.id ==='overlay'? overlay.classList.remove('activo') :'';
    });
});

