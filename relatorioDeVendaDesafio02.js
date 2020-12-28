const arrInicial = [
  "001ç1234567891234çPedroç50000",
  "001ç3245678865434çPauloç40000.99",
  "002ç2345675434544345çJose da SilvaçRural",
  "002ç2345675433444345çEduardo PereiraçRural",
  "003ç10ç[1-10-100,2-30-2.50,3-40-3.10]çPedro",
  "003ç08ç[1-34-10,2-33-1.50,3-40-0.10]çPaulo",
];
const salesManArray = [];
const clientArray = [];
const arrDadosDeVenda = [];
//#########################################################################################
//Faz a verificação da ID e determina para qual array sera iserido
const arrangeArray = (array) => {
  array.map((item) => {
    let provisorio;
    switch (item[2]) {
      case "1":
        provisorio = { vendedor: item.split("ç") };
        let [typeSalesMan, cpf, salesMan, salary] = provisorio.vendedor;
        salesManArray.push({
          idIdentifier: typeSalesMan,
          cpf,
          salesMan,
          salary,
        });
        break;

      case "2":
        provisorio = { cliente: item.split("ç") };
        let [typeClient, cnpj, clientName, businessArea] = provisorio.cliente;
        clientArray.push({
          idIdentifier: typeClient,
          cnpj,
          clientName,
          businessArea,
        });
        break;

      case "3":
        provisorio = {
          dadosDaNota: item.replace(/[[\]!'@><|://\\;&*()_+=]/g, "").split("ç"),
        };
        let [
          typeSale,
          idSales,
          itensBuy,
          nameSalesMan,
        ] = provisorio.dadosDaNota;

        let itensBuyProvisorio = itensBuy.split(",");
        let itemArr = itensBuyProvisorio.map((item) => item.split("-"));

        let paraCalcul = itemArr.map((itens) => itens[1] * itens[2]);
        let total = paraCalcul.reduce((acc, valor) => acc + valor);

        arrDadosDeVenda.push({
          idIdentifierd: typeSale,
          idSales,
          TotalNota: total,
          salesMan: nameSalesMan,
        });
        break;
      default:
        console.log("Não foi encontrado codigo de referencia");
    }
  });
};
//#########################################################################################
//RETORNA O VALOR DA MAIOR OU MENOR VENDA

const maiorMenorVenda = (array, tipo) => {
  let comparador = 0;
  for (item of array) {
    item.TotalNota > comparador ? (comparador = item.TotalNota) : comparador;
  }
  switch (tipo) {
    case "maior":
      return comparador;
      break;

    case "menor":
      for (item of array) {
        item.TotalNota < comparador
          ? (comparador = item.TotalNota)
          : comparador;
      }
      return comparador;
  }
};
//#########################################################################################
//RETORNA O DADOS COM O ID DA MAIOR VENDA OU O NOME DO PIOR VENDEDOR
const indice = (array, tipo, callback) => {
  let i = callback(array, tipo);
  for (itens of array) {
    if (tipo === "maior") {
      while (itens.TotalNota === i) {
        return itens.idSales;
      }
    } else {
      while (itens.TotalNota === i) {
        return itens.salesMan;
      }
    }
  }
};
//#########################################################################################
//IMPRIME OS DADOS DO RELATORIO
let gerarRelatorio = (array) => {
  arrangeArray(array);
  console.log("RELATORIO DE VENDAS");
  console.log(`Total de clientes: ${clientArray.length}`);
  console.log(`Total de vendedores: ${salesManArray.length}`);
  console.log(`Maior Venda, idSales: ${indice(arrDadosDeVenda,"maior",maiorMenorVenda)}`);
  console.log(`Pior Vendedor: ${indice(arrDadosDeVenda, "menor", maiorMenorVenda)}`);
};
//#########################################################################################

gerarRelatorio(arrInicial);
