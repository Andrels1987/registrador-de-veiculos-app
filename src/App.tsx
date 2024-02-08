import { useEffect, useState } from 'react'
import './App.css'
import { useBuscarRegistroDeEntradasDeVeiculosQuery, useGetVeiculosQuery } from './features/api/apiSlice'
import { Veiculo } from './modelos/Veiculo';
///import ListaDeVeiculos from './componentes/ListaDeVeiculos';
import CadastrarVeiculo from './componentes/CadastrarVeiculo';
import { Route, Routes } from 'react-router-dom';
import ListaDeVeiculos from './componentes/ListaDeVeiculos';
import Homepage from './componentes/Homepage';
import AtualizarVeiculo from './componentes/AtualizarVeiculo';
import AreaDeVisitantes from './componentes/AreaDeVisitantes';

const arrayVeiculo: Array<Veiculo> = []

function App() {
  const { data: registros, isLoading, isSuccess,isFetching } = useBuscarRegistroDeEntradasDeVeiculosQuery(arrayVeiculo);
  const [collectionVeiculos, setCollectionVeiculos] = useState(arrayVeiculo);
  const [parentNode, setParentNone] = useState(null);
  const { data: veiculos } = useGetVeiculosQuery(collectionVeiculos);
  useEffect(() => {
    if (veiculos) {
      setCollectionVeiculos([...veiculos]);
    }
    return;
  }, [veiculos])
  
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
    <>
      <Routes>
        <Route path='/' element={<Homepage />}/>
        <Route path='veiculos' element={<ListaDeVeiculos collection={collectionVeiculos} mostrarInfo={mostrarInfoVeiculo} isLoading={isLoading} isSuccess={isSuccess} isFetching={isFetching}/>} />
        <Route path='cadastrodeveiculos' element={<CadastrarVeiculo veiculoData={undefined}/>} />
        <Route path='atualizar/:id' element={<AtualizarVeiculo/>} />
        <Route path='areadevisitantes' element={<AreaDeVisitantes registros={registros} mostrarInfo={mostrarInfoVeiculo}/>} />
      </Routes>
    </>
  )
}

export default App
