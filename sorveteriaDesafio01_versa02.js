var data = new Date();
const dataHoje =
  data.getDate() + "/" + data.getMonth() + "/" + data.getFullYear();
const cardapio = {
  picole: 3.25,
  casquinha: 5.75,
  cascao: 10.0,
  bananaSplit: 15.3,
};

const pedidosDoDia = [
  {
    data: dataHoje,
    nome: "Tanjirō Kamado",
    pedidos: { item1: "cascao" },
  },
  {
    data: dataHoje,
    nome: "Seiya de Pégaso",
    pedidos: {
      item1: "bananaSplit",
      item2: "casquinha",
      item3: "cascao",
    },
  },
  {
    data: dataHoje,
    nome: "Ichigo Kurosaki",
    pedidos: { item: "bananaSplit" },
  },
  {
    data: dataHoje,
    nome: "Natsu Dragneel",
    pedidos: { item1: "picole" },
  },
  {
    data: dataHoje,
    nome: "Escanor",
    pedidos: { item1: "casquinha" },
  },
];
const valorCadaPedido = [];
//###########################################################################################
//Faz a soma de cada item do objeto pedidos e insere o valor em um novo array valorCadaPedido.
var somarCadaPedido = (array) => {
  array.map((array) => {
    let valorTotal = 0;
    for (itemP in array.pedidos) {
      valorTotal += cardapio[array.pedidos[itemP]];
    }
    array.valorTotal = valorTotal;
    valorCadaPedido.push(valorTotal);
  });
  return valorCadaPedido;
};
//#########################################################################################
//recebe como atributo um array com a somatoria de cada item de cada pedido do dia
// e busca a posicao do objeto no array que contem o maior e menor valor do array pedidos do dia.
const procuraMaiorPedido = (arrayPedidoSomado) => {
  let posicao = arrayPedidoSomado.indexOf(Math.max(...arrayPedidoSomado));
  return pedidosDoDia[posicao];
};
const procuraMenorPedido = (arrayPedidoSomado) => {
  let posicao = arrayPedidoSomado.indexOf(Math.min(...arrayPedidoSomado));
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
    maiorPedido: procuraMaiorPedido(arraySomado),
    menorPedido: procuraMenorPedido(arraySomado),
    mediaTotalVendas: Number(mediaTotaldoDia(arraySomado).toFixed(2)),
    numeroDePedidosDia: arraySomado.length,
  };
};
//#########################################################################################
//envia como parametro array de pedidos do dia e a function preparaDadosJson e rotorna
//dado do tipo JSON
enviarJson = (array, callback) => JSON.stringify(callback(array));
//#########################################################################################
console.log(enviarJson(pedidosDoDia, preparaDadosParaJson));