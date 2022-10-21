$(document).ready(function () {
  GetData();
});

function GetData() {
  var url =
    "https://api.thingspeak.com/channels/1245212/feeds.json?key=NQ9RQWFSB5V2GSWQ&results=1";
  $.ajax({
    url: url,
    type: "GET",
    contentType: "application/json",

    success: function (data, textStatus, xhr) {
      $.each(data, function (i, item) {
        if (i == "feeds") {
          var ubound = item.length;
          $("#txtField1").val(item[ubound - 1].field1);
          $("#txtField2").val(item[ubound - 1].field2);
        }
      });
    },
    error: function (xhr, textStatus, errorThrown) {
      alert(errorThrown);
    },
  });

  setTimeout(GetData, 10000);
}

// setInterval(myTimer, 1000);
// function myTimer() {
//   const input = document.querySelector("#FechaActual");
//   input.value = new Date().toDateString();

//   input.addEventListener("input", () => {
//     console.log(input.value);
//   });

//   const input1 = document.querySelector("#TimeActual");
//   input1.value = new Date().toLocaleTimeString();

//   input.addEventListener("input1", () => {
//     console.log(input1.value);
//   });
// }

let mostrarFecha = document.getElementById('fecha');
let mostrarReloj = document.getElementById('reloj');

let fecha = new Date();

let diaSemana = ['Domingo','Lunes', 'Martes','Miércoles','Jueves','Viernes','Sábado'];

let mesAnyo = ['Enero','Febrero', 'Marzo','abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

mostrarFecha.innerHTML = `${diaSemana[fecha.getDay()]}, ${fecha.getDate()} de ${mesAnyo[fecha.getMonth()]} de ${fecha.getFullYear()}`;

setInterval(()=>{
  let hora = new Date();
  mostrarReloj.innerHTML = hora.toLocaleTimeString(('en-US'));
},1000);
