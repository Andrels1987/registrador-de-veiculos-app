
import { Veiculo } from '../modelos/Veiculo'
import { useAtualizarVeiculoMutation, useCadastrarVeiculoMutation } from '../features/api/apiSlice';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Profile from './Profile';

type PropsData = {
    veiculoData: Veiculo | undefined
}
let veiculoModel: Veiculo = new Veiculo()
const CadastrarVeiculo = ({veiculoData}:PropsData ): JSX.Element => {

    const [veiculo, setVeiculo] = useState<Veiculo>(veiculoModel);
    const [cadastrarVeiculo] = useCadastrarVeiculoMutation()    
    const [atualizarVeiculo] = useAtualizarVeiculoMutation()    
    useEffect(() => {
      if(veiculoData !== undefined){
        setVeiculo(veiculoData)       
      }
    }, [veiculoData])
    

    const cadastrar = (e:any) =>{
        e.preventDefault();
        cadastrarVeiculo({veiculo})
        cancelar(e);
        
    }
    const atualizar = (e:any) =>{
        e.preventDefault();
        atualizarVeiculo({veiculo})
        
    }

    const cancelar = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        e.preventDefault()
        setVeiculo(new Veiculo());
    }
    

    

    return (
        <div className='minhadiv'>
            <h3>Cadastrar Veiculo</h3>
            <Profile setData={setVeiculo} data={veiculo}/>
            <form action="">
                <div  className="placa">
                    <label htmlFor="placa">Placa</label>
                    <input type="text" placeholder='placa do veiculo' value={veiculo?.placa || ""} name='placa' id='placa' onChange={(e) => setVeiculo({...veiculo, placa: e.target.value})} required />
                    <small></small>
                </div>
                <div className="modelo">
                    <label htmlFor="modelo">Modelo</label>
                    <input type="text" value={veiculo?.modelo || ""} placeholder='modelo do veiculo' name='modelo' id='modelo'  onChange={(e) => setVeiculo({...veiculo, modelo: e.target.value})} required />
                    <small></small>
                </div>
                <div className="marca">
                    <label htmlFor="marca">Marca</label>
                    <input type="text" value={veiculo?.marca || ""}  placeholder='marca do veiculo' name='marca' id='marca'  onChange={(e) => setVeiculo({...veiculo, marca: e.target.value})} required />
                    <small></small>
                </div>
                <div className="cor">
                    <label htmlFor="cor">Cor</label>
                    <input type="text" value={veiculo?.cor || ""} placeholder='cor do veiculo' name='cor' id='cor'  onChange={(e) => setVeiculo({...veiculo, cor: e.target.value})} required />
                    <small></small>
                </div>
                <div className="vaga">
                    <label htmlFor="vaga">Vaga de estacionamento</label>
                    <input type="text" value={veiculo?.vaga || ""} placeholder='vaga do veiculo' name='vaga' id='vaga'  onChange={(e) => setVeiculo({...veiculo, vaga: e.target.value})} required />
                    <small></small>
                </div>
                <div className="autorizacao">
                    <label htmlFor="autorizacao">Autorização</label>
                    <select name="autorizacao" id="autorizacao" value={veiculo?.tipoDeAutorizacao || ""} onChange={(event) => setVeiculo({ ...veiculo, tipoDeAutorizacao: event.target.value })}>
                        <option value="">Tem autorização?</option>
                        <option value="permanente">Permanente</option>
                        <option value="temporario">Temporario</option>
                        <option value="passageiro">Passageiro</option>
                    </select>
                    <small></small>
                </div>
                <div className='acesso'>
                    <label htmlFor="acesso">Acesso</label>
                    <select name="acesso" id="acesso" value={veiculo.status_de_acesso || ""} onChange={(event) => setVeiculo({ ...veiculo, status_de_acesso: event.target.value })}>
                        <option value="">Tipo de acesso</option>
                        <option value="morador">Morador</option>
                        <option value="visitante">Visitante</option>
                    </select>
                    <small></small>
                </div>
                <div className="">
                    <h4>{veiculo.status_de_acesso === 'morador' ? 'Morador' : 'Visitante'}</h4>                    
                        <div className='morador'>
                            <div className='nome-morador'>
                                <label htmlFor="nome-morador">Nome</label>
                                <input type="text" value={veiculo?.motorista?.nome || ""} placeholder={`nome do ${veiculo.status_de_acesso}`} name='nome-morador' id='nome-morador' onChange={(e) => setVeiculo({...veiculo, motorista:{...veiculo.motorista, nome: e.target.value}})} required />
                                <small></small>
                            </div>
                            <div className='apartamento'>
                                <label htmlFor="apartamento">Apartamento</label>
                                <input type="text" value={veiculo?.motorista?.apartamento || ""} placeholder={veiculo.status_de_acesso === "morador" ? "apartamento" : "apartamento do visitado"} onChange={(e) => setVeiculo({...veiculo, motorista:{...veiculo.motorista, apartamento: e.target.value}})}name='apartamento' id='apartamento' required />
                                <small></small>
                            </div>
                            <div className='bloco'>
                                <label htmlFor="bloco">Bloco</label>
                                <input type="text" value={veiculo?.motorista?.bloco || ""} placeholder='bloco' name='bloco' id='bloco' required onChange={(e) => setVeiculo({...veiculo, motorista:{...veiculo.motorista, bloco: e.target.value}})}/>
                                <small></small>
                            </div>
                            <div className='doc'>
                                <label htmlFor="documento">Documento</label>
                                <input type="text" value={veiculo?.motorista?.numeroDocumento || ""} placeholder='documento' name='documento' id='documento' required onChange={(e) => setVeiculo({...veiculo, motorista:{...veiculo.motorista, numeroDocumento: e.target.value}})}/>
                                <small></small>
                            </div>
                        </div>
                    
                    <div>
                        <h4>Observação</h4>
                        <textarea value={veiculo?.observacao || ""}name="" id="" cols={30} rows={10} onChange={(e) => setVeiculo({...veiculo, observacao: e.target.value})}></textarea>
                    </div>

                </div>
                <div style={{display: "flex", flexDirection: "row"}}>
                    {veiculo.id !== undefined ? (
                    <button onClick={(e) => atualizar(e)}>Atualizar</button>
                    ): (
                        <button onClick={(e) => cadastrar(e)}>Cadastrar</button>
                        )}
                    
                    <button onClick={(e) => cancelar(e)}>Limpar</button>
                    <Link to={"/"}>Cancelar</Link>
                </div>
            </form>
        </div>
    )
}

export default CadastrarVeiculo