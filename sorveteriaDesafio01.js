var minhaData = new Date();
const dataHoje = minhaData.getDate() + "/" +minhaData.getMonth() +"/" +minhaData.getFullYear();
const cardapio = {
  picole: 3.25,
  casquinha: 5.07,
  cascao: 10.5,
  bananaSplit: 15.31,
 
};

const pedidosDoDia = [
  {
    nome: "Bruno",
    pedidos: { item1: "cascao", item2: "bananaSplit", item3: "casquinha" },
    valorPedido: null,
    data: dataHoje
  },
  {
    nome: "José",
    pedidos: { item1: "casquinha", item2: "picole" },
    valorPedido: null,
    data: dataHoje
  },
  {
    nome: "Jadeh",
    pedidos: {
      item1: "picole",
      item2: "bananaSplit",
      item3: "casquinha",
      item4: "cascao",
    },
    valorPedido: null,
    data: dataHoje
  },
  {
    nome: "Chico",
    pedidos: { item: "bananaSplit" },
    valorPedido: null,
    data: dataHoje
  },
  {
    nome: "Francico",
    pedidos: { item1: "picole", item2: "picole" },
    valorPedido: null,
    data: dataHoje
  },
];

var maiorMenorPedido = (array) => {
  var arrayTotal = [];
  array.map((array) => {
    let valorTotal = 0;
    for (itemP in array.pedidos) {
      valorTotal += cardapio[array.pedidos[itemP]]; // cardapio[item.pedidos[itemP] por que esta acessando a propriedade do objeto.
    }
    array.valorPedido = valorTotal;
    arrayTotal.push(array.valorPedido);
  });
  let media = arrayTotal.reduce((acc, valor) => acc + valor) / array.length;
  return [arrayTotal.indexOf(Math.max(...arrayTotal)),arrayTotal.indexOf(Math.min(...arrayTotal)), media,
  ];
};

var enviarJson = (_pedidosDoDia, callback) => {
  let posicaoArray = callback(_pedidosDoDia);
  let maiorPedido = _pedidosDoDia[posicaoArray[0]];
  let menorPedido = _pedidosDoDia[posicaoArray[1]];
  let {
    nome: clienteMaiorPedido,
    pedidos: itemsPedidosMaior,
    valorPedido: valorMaiorPedido,
  } = maiorPedido;
  let {
    nome: clienteMenorPedido,
    pedidos: itemsPedidosMenor,
    valorPedido: ValorMenorPedido,
  } = menorPedido;
  let objParaJson = {
    data: dataHoje,
    maiorPedido: {
      nome: clienteMaiorPedido,
      valorTotal: Number(valorMaiorPedido.toFixed(2)),
      pedidoFeito: itemsPedidosMaior,
    },
    menorPedido: {
      nome: clienteMenorPedido,
      valorTotal: Number(ValorMenorPedido.toFixed(2)),
      pedidoFeito: itemsPedidosMenor,
    },
    totalDePedidos: _pedidosDoDia.length,
    mediaTotaldoDia: Number(posicaoArray[2].toFixed(2)),
  };
 return JSON.stringify(objParaJson);
  
};
console.log(enviarJson(pedidosDoDia, maiorMenorPedido))

