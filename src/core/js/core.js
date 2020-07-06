const novaRequisicao = (metodo, url, responsetype, parametros) => {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();

    req.responseType = responsetype;
    req.open(metodo, url, true);

    req.onreadystatechange = (event) => {
      if (req.readyState === XMLHttpRequest.DONE) {
        if (req.status === 200) {
          resolve(req.response);
        }
        else {
          reject(req.response);
        }
      }
    }

    req.onerror = () => {
      reject(req.response);
    }

    parametros ? req.send(parametros) : req.send()
  })
}



const carregarFormulario = (urlHtml, urlCSS) => {

  novaRequisicao('GET', urlHtml, 'document', null).then((valorHtml) => {

    const body = document.body;

    const mainHtml = document.createElement('div');
    mainHtml.id = 'mainHtml';
    mainHtml.className = 'container';
    mainHtml.appendChild(valorHtml.body);
    body.appendChild(mainHtml);

    if (urlCSS) {
      novaRequisicao('GET', urlCSS, 'text', null).then((valorcss) => {
        const estiloPrincipal = document.createElement('style');
        estiloPrincipal.id = 'estiloPrincipal';
        estiloPrincipal.innerHTML = valorcss;
        body.appendChild(estiloPrincipal);
      })
    }

  })

}