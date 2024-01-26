
import { Veiculo } from '../modelos/Veiculo'
import { Link } from 'react-router-dom'
import vite from "../../public/vite.svg"
import { useState } from 'react'

type Props = {
    v : Veiculo | any,
}
const Lista = ({v}: Props,  ) => {
    const [isActive, setIsActive] = useState(false)
    const [parentNode, setParentNone] = useState(null);

    const expandirImagem = (e:React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        e.preventDefault();
        setIsActive(!isActive)       
    }

    const mostrarInfoVeiculo = (e: any) => {
        let exibidos = document.getElementsByClassName("veiculo-list-item-exibido");
        let parent = e.target.parentNode
        
        if (parent.className === "veiculo-list-item") {
            console.log(parentNode);            
            parent.className = "veiculo-list-item-exibido"
        } else if (parent.className === "veiculo-list-item-exibido") {
            console.log(parentNode);            
            parent.className = "veiculo-list-item"
        }else if(parent.className === "veiculo-info"){
            console.log(parentNode); 
            return           
        }
        for(let e of exibidos){
            if(e !== parent){
                e.className = "veiculo-list-item"
                e.scrollTop = 0;
            }
        }
        
        
        parent.scrollTop = 0
        setParentNone(parent);
    }
  return (
    <div onClick={(e) => mostrarInfoVeiculo(e)} className="veiculo-list-item" >
                    
                        <p>{v.placa} | <img className="logos" src={`/logos/${v.marca.trim()+'.png' || vite}`}/> | {v.modelo} | <span style={{ 
                            backgroundColor:`var(--${v.cor})`,
                            border: `${v.cor === 'branco' ? 'black': '#deb887'} solid 2px`}} id="car-color"></span></p>
                    
                    <div className={`veiculo-info`}>
                            <div className={isActive ?"bg-image": ""}></div>                       
                            <img onClick={e => expandirImagem(e)} className={!isActive ? 'imagem-veiculo' : 'imagem-veiculo-expanded'} src={v.foto || vite} alt="imagem do veiculo" />                       
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
                        </section>
                    </div>
                </div>
  )
}

export default Lista