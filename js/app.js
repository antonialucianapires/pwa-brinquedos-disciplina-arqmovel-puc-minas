let ajax = new XMLHttpRequest();

ajax.open("GET", "dados.json", true);

ajax.send();

ajax.onreadystatechange = function () {
  let content = document.getElementById("content");

  if (this.readyState == 4 && this.status == 200) {
    let datajson = JSON.parse(ajax.responseText);

    if (datajson.lenght == 0) {
      content.innerHTML =
        '<div class="alert alert-warning" role="alert">Desculpe. ainda não temos brinquedos cadastrados.</div>';
    } else {
      let html_content = "";

      for (let i = 0; i < datajson.length; i++) {
        html_content +=
          '<section class="row"><div class="col-12"><h2><span> </span> ' +
          datajson[i].categoria +
          "</h2></div></section>";

        if (datajson[i].brinquedos.length == 0) {
          html_content +=
            '<div class="alert alert-warning" role="alert">Desculpe. ainda não temos brinquedos cadastrados.</div>';
        } else {
          html_content += '<div class="row">';
          for (let j = 0; j < datajson[i].brinquedos.length; j++) {
            html_content += card_brinquedo(
              datajson[i].brinquedos[j].nome,
              datajson[i].brinquedos[j].imagem,
              datajson[i].brinquedos[j].valor,
              datajson[i].brinquedos[j].whatsapp
            );
          }

          html_content += "</div>";
        }
      }

      content.innerHTML = html_content;
      cache_dinamico(datajson);
    }
  }
};

//template do card_brinquedo
var card_brinquedo = function (nome, imagem, valor, whatsapp) {
  return (
    '<div class="col-lg-6">' +
    '<div class="card">' +
    '<img src="' +
    imagem +
    '" class="card-img-top" alt="' +
    nome +
    '">' +
    '<div class="card-body">' +
    '<h5 class="card-title">' +
    nome +
    "</h5>" +
    '<p class="card-text"><strong>Valor:</strong> ' +
    valor +
    "</p>" +
    '<div class="d-grid gap-2">' +
    '<a href="https://api.whatsapp.com/send?phone=55' +
    whatsapp +
    "&text=Olá gostaria de informações sobre o brinquedo: " +
    nome +
    '" target="_blank" class="btn btn-info">Contato Proprietário</a>' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>"
  );
};

//cache dinamico
var cache_dinamico = function(data_json){

  if('caches' in window){

      console.log("Deletando cache dinâmico antigo");

      caches.delete("brinquedo-app-dinamico").then(function(){

          if(data_json.length > 0){

              var files = ['dados.json'];

              for(let i = 0; i<data_json.length; i++){
                  for(let j = 0; j<data_json[i].brinquedos.length; j++){ 
                      if(files.indexOf(data_json[i].brinquedos[j].imagem) == -1){
                          files.push(data_json[i].brinquedos[j].imagem);
                      }
                      
                  }
              }

          }

          caches.open("brinquedo-app-dinamico").then(function (cache) {

              cache.addAll(files).then(function (){

                  console.log("Novo cache dinâmico adicionado!");

              });

          });

      });

  }

}