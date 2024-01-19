import { useEffect, useState } from 'react'
import './App.css'
import { useGetVeiculosQuery } from './features/api/apiSlice'
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

  const [collectionVeiculos, setCollectionVeiculos] = useState(arrayVeiculo);

  const { data: veiculos } = useGetVeiculosQuery(collectionVeiculos);
  useEffect(() => {
    if (veiculos) {
      setCollectionVeiculos([...veiculos]);
    }
    return;
  }, [veiculos])

  return (
    <>
      <Routes>
        <Route path='homepage' index element={<Homepage />}/>
        <Route path='veiculos' element={<ListaDeVeiculos collection={collectionVeiculos}/>} />
        <Route path='cadastrodeveiculos' element={<CadastrarVeiculo veiculoData={undefined}/>} />
        <Route path='atualizar/:id' element={<AtualizarVeiculo/>} />
        <Route path='areadevisitantes' element={<AreaDeVisitantes/>} />
      </Routes>
    </>
  )
}

export default App
