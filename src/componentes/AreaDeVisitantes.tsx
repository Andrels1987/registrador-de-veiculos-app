import {useRegistrarSaidaDeVisitanteMutation } from "../features/api/apiSlice"
import { useEffect } from "react";
import ItemDaLista from "./ItemDaLista";
import { Link } from "react-router-dom";

let registrosFiltrados: Array<any> = []
type Props = {
    registros : any,
    mostrarInfo: Function
}
const AreaDeVisitantes = ({registros, mostrarInfo}: Props): JSX.Element => {
    const [registrarSaidaDeVisitante] = useRegistrarSaidaDeVisitanteMutation()

    useEffect(() => {
        if (registros) {
            registrosFiltrados = registros.filter((registro:any) => registro.statusVisita === "presente")
        }
    }, [registros, registrosFiltrados])



    const registrarSaida = (id: string, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        registrarSaidaDeVisitante({ id })
    }

    
    
    return (      
           
         <div className="areadevisitantes">
            <h4>Veiculos sem autorização</h4>
                {registrosFiltrados.length > 0 ? registrosFiltrados.map(v => (
                    <div className="veiculo-list-item" key={v.id} onClick={(e) => mostrarInfo(e)}>
                        <ItemDaLista   v={v.veiculo} />
                        <button onClick={(e) => registrarSaida(v.id, e)}>Registrar Saida</button>
                    </div>
                )) : (
                    <p style={{pointerEvents: "auto"}}>Nenhum registro encontrado <Link to={"/veiculos"}>Voltar</Link></p>
                )}
        </div>
    )
}

export default AreaDeVisitantes