import { useEffect, useState } from "react"
import { Veiculo } from "../modelos/Veiculo"
import vite from "../../public/vite.svg"
import { Link } from "react-router-dom"
import { useRegistrarentradadevisitantesMutation } from "../features/api/apiSlice"

type Props = {
    collection: Array<any>
}

const ListaDeVeiculos = ({ collection }: Props): JSX.Element => {
    const [pesquisaVeiculo, setPesquisaVeiculo] = useState(collection);
    const [registrarEntradaDeVisitante] = useRegistrarentradadevisitantesMutation();
    const [placa, setPlaca] = useState("");

    useEffect(() => {
        handlePesquisaVeiculo();

        return;
    }, [placa, collection])



    const handlePesquisaVeiculo = () => {
        let newCollection: Array<Veiculo> = collection.filter(c => {
            if (c.placa?.toUpperCase().includes(placa.toUpperCase()) && c?.placa !== null) {
                return c;
            }
        })
        setPesquisaVeiculo([...newCollection]);
    }


    const mostrarInfoVeiculo = (e: any) => {
        let exibidos = document.getElementsByClassName("veiculo-list-item-exibido");
        let parent = e.target.parentNode
        console.log(parent);
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
        
        parent.scrollTop = 0
    }
       

    const registrarEntrada = (id: string, e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        registrarEntradaDeVisitante({id})
    }
    return (
        <div>
            <form action="" id="form-pesquisar-veiculo">
                <fieldset>
                    <legend>Pesquisar veiculo</legend>
                    <div>
                        <label htmlFor="placa">Placa</label>
                        <input type="text" onChange={(e) => setPlaca(e.target.value)} name="placa" id="placa" placeholder="pesquisar veiculo pela placa" />
                    </div>
                </fieldset>

            </form>
            {pesquisaVeiculo.length > 0 ?
                (pesquisaVeiculo.map(v =>
                <div onClick={(e) => mostrarInfoVeiculo(e)} className="veiculo-list-item" key={v.id} >
                    
                        <p>Veiculo : {v.placa} | <img className="logos" src={`/logos/${v.marca.trim()+'.png' || vite}`}/> | {v.modelo} | <span style={{ 
                            backgroundColor:`var(--${v.cor})`,
                            border: `${v.cor === 'branco' ? 'black': '#deb887'} solid 2px`}} id="car-color"></span></p>
                    
                    <div className="veiculo-info">
                        <img className={'imagem-veiculo'} src={v.foto || vite} alt="imagem do veiculo" />
                        <section >
                            {v.motorista !== null ? (
                                <div>
                                    <legend style={{ background: "#D5D4D2", display: 'inline', width: '100%' }}>Dados do Motorista</legend>
                                    <p>Tipo de acesso: {v.status_de_acesso}</p>
                                    <p>{v.motorista.nome || "sem nome"}</p>
                                    <p>{v.motorista.apartamento} | {v.motorista.bloco}</p>
                                    <p>{v.motorista.numeroDocumento || "sem documento cadastrado"}</p>
                                </div>
                            ) : "sem motorista cadastrado"
                            }

                        </section>
                    </div>
                    <div className="info-acesso">
                        <section>
                            <p >Vaga: {v.vaga}</p>
                            <p >Tipo de autorização: {v.tipoDeAutorizacao}</p>
                            <p >Observação: <code>{v.observacao}</code></p>
                            <Link to={`/atualizar/${v.id}`}>Atualizar</Link>
                            <button onClick={(e) => registrarEntrada(v.id, e)}>Registrar Entrada</button>
                        </section>
                    </div>
                </div>)):(  
                    <div>
                    {placa !== '' && pesquisaVeiculo.length === 0 ?
                        (<div>
                            <h5>Nenhum veiculo encontrado com essa placa</h5>
                            <Link to={{pathname:'/cadastrodeveiculos'}}>Cadastrar</Link>
                        </div>) :(<p>Sem veiculos cadastrados</p>) }                
                    </div>                      
                )}
        </div>
    )
}

export default ListaDeVeiculos;