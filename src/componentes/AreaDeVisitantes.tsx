import { useBuscarRegistroDeEntradasDeVeiculosQuery, useRegistrarSaidaDeVisitanteMutation } from "../features/api/apiSlice"
import { Registro } from "../modelos/Registros";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Lista from "./Lista";

const arrayVeiculo: Array<Registro> = []
let registrosFiltrados: Array<any> = []

const AreaDeVisitantes = (): JSX.Element => {
    const [regs, setRegs] = useState(registrosFiltrados)
    const { data: registros } = useBuscarRegistroDeEntradasDeVeiculosQuery(arrayVeiculo);
    const [registrarSaidaDeVisitante] = useRegistrarSaidaDeVisitanteMutation()

    useEffect(() => {
        if (registros) {
            registrosFiltrados = registros.filter(registro => registro.statusVisita === "presente")
        }
        setRegs([...registrosFiltrados])
    }, [registros])

    console.log(regs);


    const registrarSaida = (id: string, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        registrarSaidaDeVisitante({ id })
    }
    return (      
           
         <div >
                {registrosFiltrados.length > 0 ? registrosFiltrados.map(v => (
                    <div key={v.id} style={{display: 'flex'}} >
                        <Lista   v={v.veiculo} />
                        <button onClick={(e) => registrarSaida(v.id, e)}>Registrar Saida</button>
                    </div>
                )) : (
                    <p>Nenhum registro encontrado <Link to={"/"}>Voltar</Link></p>
                )}
        </div>
    )
}

export default AreaDeVisitantes