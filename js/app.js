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
        }
      }

      content.innerHTML = html_content;
    }
  }
};
