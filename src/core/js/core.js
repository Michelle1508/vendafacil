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

const carregarFormulario = (urlHtml, urlCSS, urlJS) => {

  novaRequisicao('GET', urlHtml, 'document', null).then((valorHtml) => {

    const body = document.body;
    const mainHtml = document.getElementById("mainHtml");

    if (mainHtml) {
      body.removeChild(mainHtml);
    }

    const divHtml = document.createElement('div');
    divHtml.id = 'mainHtml';
    divHtml.className = 'container';
    divHtml.appendChild(valorHtml.body);
    body.appendChild(divHtml);

    if (urlCSS) {
      novaRequisicao('GET', urlCSS, 'text', null).then((valorcss) => {
        const estiloPrincipal = document.createElement('style');
        estiloPrincipal.id = 'estiloPrincipal';
        estiloPrincipal.innerHTML = valorcss;
        body.appendChild(estiloPrincipal);
      })
    }

    if (urlJS) {
      const scriptPrincipal = document.createElement('script');
      scriptPrincipal.id = "scriptPrincipal";
      scriptPrincipal.src = urlJS;
      body.appendChild(scriptPrincipal);  
    }

  })

}

const listarRegistros = (dados, totalcolunas,corpo, acaoEditar, acaoRemover) =>{

  while (corpo.firstChild){
    corpo.removeChild(corpo.lastChild);
  }

  for (let index = 0; index < dados.length; index++) {
    const elemento = dados[index];
    const linha = document.createElement("tr");

    let indice_coluna = 0;

    for (const nomepropriedade in elemento) {

      if (indice_coluna === totalcolunas){
        break;
      }

      const propriedade = elemento[nomepropriedade];
      const coluna = document.createElement("td");

      coluna.innerText = propriedade;
      linha.appendChild(coluna);

      indice_coluna++;
    }
    
    if ((acaoEditar) || (acaoRemover)){
      
      const colunaBotoes = document.createElement("td");

      if (acaoEditar){
        const botaoEditar = document.createElement("button");
        botaoEditar.innerHTML = 'Editar';
        botaoEditar.className = 'btn btn-outline-primary';
        botaoEditar.onclick = () => acaoEditar(elemento);
        colunaBotoes.appendChild(botaoEditar);

        if(acaoRemover){
          botaoEditar.style.marginRight = '10px';
        }
      }

      if (acaoRemover){
        const botaoRemover = document.createElement("button");
        botaoRemover.innerHTML = 'Remover';
        botaoRemover.className = 'btn btn-outline-danger';
        botaoRemover.onclick = () => acaoRemover(elemento);
        colunaBotoes.appendChild(botaoRemover);
      }

      linha.appendChild(colunaBotoes);
    }

    corpo.appendChild(linha);
    
  }

}