
import { Link } from 'react-router-dom'

const Homepage = () => {
  return (
    <div className='menu'>        
        <Link to={'/veiculos'}>Veiculos</Link>
        <Link to={'/cadastrodeveiculos'}>Cadastrar Veiculo</Link>
        <Link to={'/areadevisitantes'}>Area de visitantes</Link>
    </div>
  )
}

export default Homepage