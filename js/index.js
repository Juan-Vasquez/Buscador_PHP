/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}

//inicializarSlider();
//playVideoOnScroll();

$(document).ready(function(){
  
  $('#mostrarTodos').click(darInformacion);
  
});

//Peticiones Ajax
function darInformacion(){
  var xhr;
  if(window.XMLHttpRequest){
    xhr = new XMLHttpRequest();
  }else{
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
  }
  xhr.open('GET', './buscador.php', true);
  xhr.onreadystatechange = function(){
    if(this.readyState == 4 && this.status == 200){
      var datos = JSON.parse(this.responseText);
      console.log(datos);     
        $.each(datos, function(index, obj){
          $(".informacion").append(
                                  '<div class="card horizontal">'+
                                    '<div class="card-image">'+
                                      '<img src="./img/home.jpg">'+
                                    '</div>'+
                                    '<div class="card-stacked">'+
                                      '<div class="card-content">'+
                                        '<p><b>Direccion:</b> '+obj.Direccion+'</p>'+
                                        '<p><b>Ciudad:</b> '+obj.Ciudad+'</p>'+
                                        '<p><b>Telefono:</b> '+obj.Telefono+'</p>'+
                                        '<p><b>Codigo Postal:</b> '+obj.Codigo_Postal+'</p>'+
                                        '<p><b>Tipo:</b> '+obj.Tipo+'</p>'+
                                        '<p><b>Precio:</b> <span class="orange-text lighten-1">'+obj.Precio+'</span></p>'+
                                      '</div>'+
                                      '<div class="card-action">'+
                                        '<a>Ver mas</a>'+
                                      '</div>'+
                                    '</div>'+
                                  '</div>'
          );
      });
    }
  }
  xhr.send();
}



