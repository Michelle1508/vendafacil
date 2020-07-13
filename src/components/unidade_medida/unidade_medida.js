
const removerRegistro = (item) => {
  novaRequisicao('DELETE',"http://tiago-hp:3000/unidade_medida/"+ item.ID, "json", null).then((retorno) =>{
    alert(retorno.message);
    onShow();
  })
}

const onShow = () =>{
  novaRequisicao('GET', "http://tiago-hp:3000/unidade_medida", "json", null).then((dados) =>{
  
  const corpo = document.getElementById("unidades_medidas");
  const totalcolunas = 2;

  const NovosDados = dados.map((item) =>{
      return{
        SIGLA:item.SIGLA,
        NOME:item.NOME + ' (' + item.SIGLA + ')',
        ID:item.ID
      }
  });
  
  listarRegistros(NovosDados, totalcolunas,corpo, (valor) => {console.log('editando',valor)}, (valor) => removerRegistro(valor));

  })
}

onShow();