import axios from "axios";

/**
 * Link da API
 */
const API_URL = "http://localhost:3001";

async function getPeriodos(token, email, tipoLogin) {
  const res = await axios.get(
    `${API_URL}/api/transaction/periodos`
  );
  //console.log(res.data);

  return res.data;
}

async function getLancamento(periodo) {
  const res = await axios.get(
    `${API_URL}/api/transaction/?period=${periodo}`
  );
  return res.data;
}

async function getRestore() {
  const res = await axios.get(
    `${API_URL}/api/transaction/restore`
  );
  return res.data;
}


async function putLancamento(dadosBdLancamento) {
    
    let categoriaLanca = document.querySelector('#categoria').value ? document.querySelector('#categoria').value : dadosBdLancamento.categoriaModal;
    let descricaoLanca = document.querySelector('#descricao').value ? document.querySelector('#descricao').value : dadosBdLancamento.corpoModal;
    let valorLanca = document.querySelector('#valor').value ? document.querySelector('#valor').value : dadosBdLancamento.valorModal;
    let dataLanca = document.querySelector('#dataLancamento').value ? document.querySelector('#dataLancamento').value : dadosBdLancamento.dataModal;
    
    let tipoLanca = dadosBdLancamento.tipoModal;
    let dataLancaSplit = dataLanca.split("-");
    let dadosLancamento = {
        description: descricaoLanca,
        value: valorLanca,
        category: categoriaLanca,
        year: dataLancaSplit[0],
        month: dataLancaSplit[1],
        day: dataLancaSplit[2],
        yearMonth: `${dataLancaSplit[0]}-${dataLancaSplit[1]}`,
        yearMonthDay: dataLanca,
        type: tipoLanca,

    }
  const response = await axios.put(
      `${API_URL}/api/transaction/${dadosBdLancamento.idModal}`, dadosLancamento
      );
  //const response = { data: { resposta: true } };
  return response.data;
}

async function postLancamento(tipoModal) {
    
  let categoriaLanca = document.querySelector('#categoria').value;
  let descricaoLanca = document.querySelector('#descricao').value;
  let valorLanca = document.querySelector('#valor').value;
  let dataLanca = document.querySelector('#dataLancamento').value;
  let tipoLanca = tipoModal ? "+" : "-";
  

  if(
      !categoriaLanca || 
      !descricaoLanca || 
      !valorLanca || 
      !dataLanca  
    ){
      console.log("erro");
      return {erro: "Todos os campos deve ser preenchidos"};
  }
  
  let dataLancaSplit = dataLanca.split("-");
  let dadosLancamento = {
      description: descricaoLanca,
      value: valorLanca,
      category: categoriaLanca,
      year: dataLancaSplit[0],
      month: dataLancaSplit[1],
      day: dataLancaSplit[2],
      yearMonth: `${dataLancaSplit[0]}-${dataLancaSplit[1]}`,
      yearMonthDay: dataLanca,
      type: tipoLanca,
  }
const response = await axios.post(
    `${API_URL}/api/transaction/`, dadosLancamento
    );
//const response = { data: { resposta: true } };
return response.data;
}

async function deleteLancamento(id) {
    
  
const response = await axios.delete(
    `${API_URL}/api/transaction/${id}`);
//const response = { data: { resposta: true } };
return response.data;
}

// async function getToken(token) {
//   const res = await axios.get(`${API_URL}?token=${token}&login=1`);
//   // console.log("token abaixo");
//   // console.log(res.data);

//   return res.data;
// }

// async function getTorneio(torneio, parceiro, token = "", email = "") {
//   const res = await axios.get(
//     `${API_URL}?id_campeonatos_rodada_atual=${torneio}&token=${token}&email=${email}&inicio=1`
//   );
//   console.log(res.data);

//   return res.data;
// }

// async function getUsuario(torneio, nickAtual) {
//   const res = await axios.get(
//     `${API_URL}?id_campeonatos_rodada_atual=${torneio}&nickAtual=${nickAtual}`
//   );
//   //console.log(res.data);

//   return res.data.resposta;
// }



export {
    getPeriodos,
    getLancamento,
    putLancamento,
    postLancamento,
    deleteLancamento,
    getRestore,
};
