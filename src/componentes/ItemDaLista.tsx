
import { Veiculo } from '../modelos/Veiculo'
import vite from "../../public/vite.svg"
import { useState } from 'react'

type Props = {
    v: Veiculo | any,
}
const ItemDaLista = ({ v }: Props,) => {
    const [isActive, setIsActive] = useState(false)


    const expandirImagem = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
        e.preventDefault();
        setIsActive(!isActive)
    }

    

    return (
        <>
            <section> <p>{v.placa} | </p> <img alt="imagem do veiculo" className="logos" src={`/logos/${v?.marca.trim() + '.png' || vite}`} />  <p>| {v.modelo} | </p>  <span style={{
                backgroundColor: `var(--${v.cor})`,
                border: `${v.cor === 'branco' ? 'black' : '#deb887'} solid 2px`
            }} id="car-color"></span></section>

            <div className={`veiculo-info`}>
                <div className={isActive ? "bg-image" : ""}></div>
                <img alt="imagem do veiculo" onClick={e => expandirImagem(e)} className={!isActive ? 'imagem-veiculo' : 'imagem-veiculo-expanded'} src={v.foto || vite} />
                <section >
                    {v.motorista !== null ? (
                        <div>
                            <legend style={{ background: "#151f14", color:"white", display: 'inline', width: '100%', textAlign:"center" }}>Dados do Motorista</legend>
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
                    <p>Vaga: {v.vaga}</p>
                    <p >Tipo de autorização: {v.tipoDeAutorizacao}</p>
                    <p >Observação: <code>{v.observacao}</code></p>
                </section>
            </div>
        </>
    )
}

export default ItemDaLista