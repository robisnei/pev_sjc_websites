var map;
var infoWindow;
var markersData = [
   {
        lat: -23.2674827,
        lng: -45.8901812,
        nome: "PEV Campo dos Alemães",
        morada1:"Avenida dos Evangélicos, 601",
        morada2: "Campo dos Alemães",
        codPostal: "12239-060"
    },
    {
        lat: -23.1767901,
        lng: -45.8871557,
        nome: "PEV D.Pedro II",
        morada1:"R. Dom Pedro II, 37",
        morada2: "Vila Maria",
        codPostal: "12209-460"
    },
    {
        lat: -23.2683086,
        lng: -45.9021721,
        nome: "PEV Residencial Gazzo",
        morada1:"Rua Arcilio Moreira da Silva (ao lado do cemitério Colonia Paraíso)",
        morada2: "Parque Res. Uniao",
        codPostal: "12236-500"
    },
    {
        lat: -23.246931,
        lng: -45.913544,
        nome: "De PEV 31 de Março",
        morada1:"Rua Guidoval, 100",
        morada2: "Res. Trinta e Um de Marco,",
        codPostal: "12237-550"
    },
    {
        lat: -23.2359314,
        lng: -45.8927894,
        nome: "PEV Jardim Satélite",
        morada1:"Rua Estrela Dalva, 135",
        morada2: "Jardim Satelite",
        codPostal: "12230-480"
    },
    {
        lat: -23.2735909,
        lng: -45.8695561,
        nome: "PEV Interlagos",
        morada1:"Rua Ubirajara Raimundo de Souza, 21",
        morada2: "Parque Interlagos",
        codPostal: "12209-531"
    },
    {
        lat: -23.1420832,
        lng: -45.7770027,
        nome: "PEV Galo Branco",
        morada1:"Avenida Benedito Luiz de Medeiros, 811",
        morada2: "Galo Branco",
        codPostal: "12247-580"
    },
    {
        lat: -23.1974869,
        lng: -45.7818828,
        nome: "PEV Novo Horizonte",
        morada1:"Rua dos Topógrafos (esquina com a Avenida Tancredo Neves)",
        morada2: "Parque Novo Horizonte",
        codPostal: "12225-751"
    },
    {
        lat: -23.173771,
        lng: -45.8483822,
        nome: "PEV Copacabana",
        morada1:"Rua Charles Diamond (em frente à Praça Joaquim Figueira de Andrade)",
        morada2: "Vila Tesouro",
        codPostal: "12221-150"
    },
    {
        lat: -23.1653911,
        lng: -45.9273503,
        nome: "PEV Altos de Santana",
        morada1:"Avenida Alto do Rio Doce, 1075 (ao lado da EMEF Profª Vera Babo de Oliveira)",
        morada2: "Jardim Altos de Santana",
        codPostal: "12214-010"
    },
    {
        lat: -23.1607187,
        lng: -45.8914831,
        nome: "PEV Vila Jaci",
        morada1:"Esquina com a Rua Xavantes e João Batista Lopes",
        morada2: "Vila Cristina",
        codPostal: "12211-310"
    },
    {
        lat: -23.187408,
        lng: -45.869479,
        nome:"PEV Martins Pereira (Vila Progresso)",
        morada1:"Rua Ana Gonçalves da Cunha (ao lado do Estádio)",
        morada2: "Monte Castelo",
        codPostal: "12215-390"
    }
];



function initialize(position) {
   var loc = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
   var mapOptions = {
      center: loc,
      mapTypeControl: false,
      navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
      mapTypeId: google.maps.MapTypeId.ROADMAP
   };

   map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
   
   // cria a nova Info Window com referência à variável infowindow
   // o conteúdo da Info Window será atribuído mais tarde
   infoWindow = new google.maps.InfoWindow();

   // evento que fecha a infoWindow com click no mapa
   google.maps.event.addListener(map, 'click', function() {
      infoWindow.close();
   });

   // Chamada para a função que vai percorrer a informação
   // contida na variável markersData e criar os marcadores a mostrar no mapa
   displayMarkers(position);
}
google.maps.event.addDomListener(window, 'load', initialize);

// Esta função vai percorrer a informação contida na variável markersData
// e cria os marcadores através da função createMarker
function displayMarkers(position){
    var loc = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
   // esta variável vai definir a área de mapa a abranger e o nível do zoom
   // de acordo com as posições dos marcadores
   var bounds = new google.maps.LatLngBounds();
   
   // Loop que vai estruturar a informação contida em markersData
   // para que a função createMarker possa criar os marcadores 
   for (var i = 0; i < markersData.length; i++){

      var latlng = new google.maps.LatLng(markersData[i].lat, markersData[i].lng);
      var nome = markersData[i].nome;
      var morada1 = markersData[i].morada1;
      var morada2 = markersData[i].morada2;
      var codPostal = markersData[i].codPostal;

      createMarker(latlng, nome, morada1, morada2, codPostal);

      // Os valores de latitude e longitude do marcador são adicionados à
      // variável bounds
      bounds.extend(latlng);  
   }
   var marker = new google.maps.Marker({
        position: loc,
        map: map,
        title:"Você está aqui!",
    });
   map.fitBounds(bounds);
}

// Função que cria os marcadores e define o conteúdo de cada Info Window.
function createMarker(latlng, nome, morada1, morada2, codPostal, posicao){
  var marker = new google.maps.Marker({
      position: latlng,
      map: map,
      title: nome,
      icon: 'imgs/marcador.png'
   });

  

   // Evento que dá instrução à API para estar alerta ao click no marcador.
   // Define o conteúdo e abre a Info Window.
   google.maps.event.addListener(marker, 'click', function() {
      
      // Variável que define a estrutura do HTML a inserir na Info Window.
      var iwContent = '<div id="iw_container">' +
            '<div class="iw_title">' + nome + '</div>' +
         '<div class="iw_content">' + morada1 + '<br />' +
         morada2 + '<br />' +
         codPostal + '</div></div>';
      
      // O conteúdo da variável iwContent é inserido na Info Window.
      infoWindow.setContent(iwContent);

      // A Info Window é aberta.
      infoWindow.open(map, marker);
   });
}

//#######################################################################################
  function success(position) {
    var s = document.querySelector('#status');

    if (s.className == 'success') {
        return;
    }

    s.innerHTML = "Você foi localizado!";
    s.className = 'success';

    var mapcanvas = document.createElement('div');
        mapcanvas.id = 'mapcanvas';
        mapcanvas.style.height = '400px';
        mapcanvas.style.width = '560px';

    document.querySelector('article').appendChild(mapcanvas);

    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var myOptions = {
        zoom: 15,
        center: latlng,
        mapTypeControl: false,
        navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("mapcanvas"), myOptions);
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        title:"Você está aqui!"
    });

}

function error(msg) {
    var s = document.querySelector('#status');
        s.innerHTML = typeof msg == 'string' ? msg : "falhou";
        s.className = 'fail';
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(initialize, error);
} else {
    error('Seu navegador não suporta <b style="color:black;background-color:#ffff66">Geolocalização</b>!');
}
