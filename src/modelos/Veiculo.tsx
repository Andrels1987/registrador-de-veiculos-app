class Condutor {
    "nome":string = "";
    "numeroDocumento":string = "";
    "bloco": string = "";
    "apartamento":string = "";    
  }
 
class Veiculo {
       "id": string = "";
      "modelo": string = "";
      "cor": string = "";
       "marca": string = "";
       "placa": string = "";
       "foto": string = "";
       "vaga": string = "";
      "tipoDeAutorizacao": string = "temporario";
       "status_de_acesso": string = "morador";
      "motorista": Condutor;
       "observacao": string = "";
}


//export default Veiculo;
export {Veiculo, Condutor};