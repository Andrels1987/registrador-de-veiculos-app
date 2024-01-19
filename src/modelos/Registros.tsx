import { Veiculo } from "./Veiculo"

class Registro {
    "id": string;
    "statusVisita": string;
    "horaEntrada": Date;
    "horaSaida": Date;
   "veiculo": Veiculo;
}

export {Registro};