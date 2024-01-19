import { useParams } from 'react-router-dom'
import { useGetVeiculoPeloIdQuery } from '../features/api/apiSlice';

import CadastrarVeiculo from './CadastrarVeiculo';


const AtualizarVeiculo = () : JSX.Element=> {
    let {id} = useParams();
    const {data: veiculoData} = useGetVeiculoPeloIdQuery({id})
    console.log(veiculoData);
    
    
  return (
    <div>
        <CadastrarVeiculo veiculoData={veiculoData}/>        
    </div>
  )
}

export default AtualizarVeiculo