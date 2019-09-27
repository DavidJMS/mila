(function(){
    var imagenes = ['../static/img/ilus/1.jpg',
    '../static/img/ilus/14.jpg',
    '../static/img/ilus/3.jpg']
    var cont= 0;

    function slider(contenedor){
        contenedor.addEventListener('click', (e)=>{
            let atras = contenedor.querySelector('.btn-previous'),
                adelante = contenedor.querySelector('.btn-next'),
                img = contenedor.querySelector('img'),
                tgt = e.target;

            if(tgt == atras){
                clearTimeout(timer);
                if(cont>0){
                    img.src=imagenes[cont-1];
                    cont--;
                }else{
                    img.src=imagenes[imagenes.length -1];
                    cont= imagenes.length -1;
                }
            }else if(tgt==adelante){
                clearTimeout(timer);
                if(cont<imagenes.length -1){
                    img.src=imagenes[cont+1];
                    cont++;
                }else{
                    img.src=imagenes[0];
                    cont= 0;
                }
            }
        });
    }
    let timer;
document.addEventListener('DOMContentLoaded', ()=>{
    let contenedor = document.getElementById('slider');
    timer= setInterval(() => {
        let img = contenedor.querySelector('img');
        if(cont<imagenes.length -1){
            img.src=imagenes[cont+1];
            cont++;
        }else{
            img.src=imagenes[0];
            cont= 0;
        }
    }, 4000);
    slider(contenedor);
})
}());