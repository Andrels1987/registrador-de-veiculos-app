import { useBuscarRegistroDeEntradasDeVeiculosQuery, useRegistrarSaidaDeVisitanteMutation } from "../features/api/apiSlice"
import { Registro } from "../modelos/Registros";
import vite from "../../public/vite.svg"
import { useEffect, useState } from "react";

const arrayVeiculo: Array<Registro> = []
let registrosFiltrados: Array<any> = [] 

const AreaDeVisitantes = (): JSX.Element =>  {
    const [regs, setRegs] = useState(registrosFiltrados)
    const {data: registros} = useBuscarRegistroDeEntradasDeVeiculosQuery(arrayVeiculo);
    const [registrarSaidaDeVisitante] = useRegistrarSaidaDeVisitanteMutation()

    useEffect(() => {
      if(registros){
            registrosFiltrados = registros.filter(registro => registro.statusVisita === "presente")
        }
       setRegs([...registrosFiltrados])
    }, [registros])
    
    console.log(regs);
    

    const mostrarInfoVeiculo = (e: any) => {
        let exibidos = document.getElementsByClassName("veiculo-list-item-exibido");
        let parent = e.target.parentNode
        if (parent.className === "veiculo-list-item") {
            parent.className = "veiculo-list-item-exibido"
        } else if (parent.className === "veiculo-list-item-exibido") {
            parent.className = "veiculo-list-item"
        }
        for(let e of exibidos){
            if(e !== parent){
                e.className = "veiculo-list-item"
                e.scrollTop = 0;
            }
        }
        console.log(exibidos);
        
        parent.scrollTop = 0
        console.log(parent);        
    }
    
    const registrarSaida = (id: string, e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        registrarSaidaDeVisitante({id})
    }
  return (
    <div >
        {registrosFiltrados.length > 0 ? registrosFiltrados.map(collection => (            
            <div  onClick={(e) => mostrarInfoVeiculo(e)} className={`veiculo-list-item`} key={collection.id} >

            <p>Veiculo : {collection.veiculo.placa} | {collection.veiculo.marca} | {collection.veiculo.modelo} | <span style={{ 
                backgroundColor:`var(--${collection.veiculo.cor})`,
                border: `${collection.veiculo.cor === 'branco' ? 'black': '#deb887'} solid 2px`}} id="car-color"></span></p>
            <div className="veiculo-info">
                <img className={'imagem-veiculo'} src={collection.veiculo.foto || vite} alt="imagem do veiculo" />
                <section >
                    {collection.veiculo.motorista !== null ? (
                        <div>
                            <legend style={{ background: "#D5D4D2", display: 'inline', width: '100%' }}>Dados do Motorista</legend>
                            <p>Tipo de acesso: {collection.veiculo.status_de_acesso}</p>
                            <p>Nome: {collection.veiculo.motorista.nome || "sem nome"}</p>
                            <p>{collection.veiculo.motorista.apartamento} | {collection.veiculo.motorista.bloco}</p>
                            <p>Doc: {collection.veiculo.motorista.numeroDocumento || "sem documento cadastrado"}</p>
                        </div>
                    ) : "sem motorista cadastrado"
                    }

                </section>
            </div>
            <div className="info-acesso">
                <section>
                    <p >Vaga: {collection.veiculo.vaga}</p>
                    <p >Tipo de autorização: {collection.veiculo.tipoDeAutorizacao}</p>
                    <p >Observação: <code>{collection.veiculo.observacao}</code></p>
                    <button onClick={(e) => registrarSaida(collection.id, e)}>Registrar Saida</button>
                </section>
            </div>
        </div>
        )): (
            <p>Nenhum registro encontrado</p>
        )}
    </div>
  )
}

export default AreaDeVisitantes