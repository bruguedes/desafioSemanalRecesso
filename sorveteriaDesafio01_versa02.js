var data = new Date();
const dataHoje =
  data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear();
const cardapio = {
  picole: 3.25,
  casquinha: 5.75,
  cascao: 10.00,
  bananaSplit: 15.30,
  acai:20.00,
  agua: 2.00
};

const pedidosDoDia = [];

let iserirPedido = ( data, nome, ...itens) => pedidosDoDia.push({data, nome, pedidos:[...itens]})

const valorCadaPedido = [];
//###########################################################################################
//Faz a soma de cada item do objeto pedidos e insere o valor em um novo array valorCadaPedido.
var somarCadaPedido = (array) => {
  array.map((itens) => {
    let valorTotal = 0;
    for (itemP of itens.pedidos) {
      valorTotal += cardapio[itemP];
    }
    itens.valorTotal = valorTotal.toFixed(2);
    valorCadaPedido.push(valorTotal);
    
  });
  return valorCadaPedido;
};
//#########################################################################################
//recebe como atributo um array com a somatoria de cada item de cada pedido do dia
// e busca a posicao do objeto no array que contem o maior e menor valor do array pedidos do dia.
const procuraMaiorMenor = (arrayPedidoSomado, maiorOuMenor) => {
  let tipo = maiorOuMenor === "maior" ? Math.max : Math.min;
  let posicao = arrayPedidoSomado.indexOf(tipo(...arrayPedidoSomado));
  return pedidosDoDia[posicao];
};

//#########################################################################################
//Recebe array do valor total de cada pedido, soma todo seus valores e divide pelo numero de
//posições do mesmo.
const mediaTotaldoDia = (arrayPedidoSomado) => {
  return (
    arrayPedidoSomado.reduce((acc, pedido) => acc + pedido) /
    arrayPedidoSomado.length
  );
};
//#########################################################################################
//Chama todos os metodos necessario para montar os dados que serão convertidos para dado do
//tipo JSON, seu retorno sera um objeto.
preparaDadosParaJson = (array) => {
  let arraySomado = somarCadaPedido(array);
  return {
    maiorPedido: procuraMaiorMenor(arraySomado, "maior"),
    menorPedido: procuraMaiorMenor(arraySomado, "menor"),
    mediaTotalVendas: Number(mediaTotaldoDia(arraySomado).toFixed(2)),
    numeroDePedidosDia: arraySomado.length,
  };
};
//#########################################################################################
//envia como parametro array de pedidos do dia e a function preparaDadosJson e rotorna
//dado do tipo JSON
enviarJson = (array, callback) => JSON.stringify(callback(array));
//#########################################################################################
iserirPedido(dataHoje, 'Bruno','picole', 'bananaSplit', 'acai', 'bananaSplit', 'agua','picole')
iserirPedido(dataHoje, 'Maria', 'casquinha', 'cascao', 'picole',)
iserirPedido(dataHoje, 'José', 'picole', 'bananaSplit')
iserirPedido(dataHoje, 'Francisco', 'cascao',  'bananaSplit')
iserirPedido(dataHoje, 'Luizinho', 'casquinha', 'cascao', 'picole', 'bananaSplit')
iserirPedido(dataHoje, 'Chico', 'bananaSplit')
iserirPedido(dataHoje, 'Lobão', 'picole')
console.log(enviarJson(pedidosDoDia, preparaDadosParaJson));