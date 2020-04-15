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
    var barra=document.querySelector('#barra-busqueda');
    barra.addEventListener('input', (e)=>{
        const busqueda = (e.target.value).toLowerCase();
        //const busqueda2= busqueda.toLowerCase();
        grid.filter((item)=> item.getElement().dataset.etiquetas.includes(busqueda));

    });
    barra.addEventListener('focus', ()=>{
        if(grid._layout.items.length != 0){
         barra.style.border="2px solid blue";
        }
    });
    barra.addEventListener('keyup',function(event){
        barra.style.border="2px solid blue";
        if(grid._layout.items.length == 0){
            barra.style.border="2px solid red";
        }
    });
    barra.addEventListener('blur', ()=>{
        if(grid._layout.items.length != 0){
         barra.style.border="2px solid #DFE0E0";
        }
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

