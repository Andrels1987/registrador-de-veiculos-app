import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import  { Veiculo }  from '../../../src/modelos/Veiculo';
import { Registro } from '../../modelos/Registros';


// Define a service using a base URL and expected endpoints
export const veiculoApi = createApi({
  reducerPath: 'api',
  tagTypes: ['veiculos'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://registrador-de-veiculos.onrender.com' }),
  endpoints: (builder) => ({
    getVeiculos: builder.query<Veiculo[], any>({
      query: () => ({
        url : '/todosveiculos',
        method: 'GET'
      }),
      transformResponse: (response:Veiculo[]) => response,
      providesTags: ['veiculos']
    }),
    cadastrarVeiculo: builder.mutation<Veiculo, any>({
      query: ({veiculo}) =>({
        url: "/enviarveiculo",
        method: "POST",
        body: {
          modelo: veiculo.modelo, 
          cor: veiculo.cor, 
          marca: veiculo.marca,
          placa: veiculo.placa, 
          nomeProprietario: veiculo.motorista.nome, 
          foto: veiculo.foto, 
          vaga: veiculo.vaga,
          estaAutorizado: veiculo.estaAutorizado, 
          statusDeAcesso: veiculo.status_de_acesso, 
          observacao: veiculo.observacao, 
          bloco: veiculo.motorista.bloco,
          apartamento: veiculo.motorista.apartamento, 
          documentoProprietario: veiculo.motorista.numeroDocumento
        }
      }),
      invalidatesTags: ['veiculos']
    }),
    getVeiculoPeloId: builder.query<Veiculo, any>({
      query: ({id}) => ({
        url: `/veiculo/id/${id}`,
        method: 'GET',
        headers : {
          
        }
      }),
      providesTags: ['veiculos']
    }),
    atualizarVeiculo: builder.mutation({
      query: ({veiculo}) => ({
        url: `/atualizarveiculo/${veiculo.id}`,
        method: 'PUT',
        body: {
          modelo: veiculo.modelo, 
          cor: veiculo.cor, 
          marca: veiculo.marca,
          placa: veiculo.placa, 
          nomeProprietario: veiculo.motorista.nome, 
          foto: veiculo.foto, 
          vaga: veiculo.vaga,
          estaAutorizado: veiculo.estaAutorizado, 
          statusDeAcesso: veiculo.status_de_acesso, 
          observacao: veiculo.observacao, 
          bloco: veiculo.motorista.bloco,
          apartamento: veiculo.motorista.apartamento, 
          documentoProprietario: veiculo.motorista.numeroDocumento
        }
      }),
      invalidatesTags: ['veiculos']
    }),
    registrarentradadevisitantes: builder.mutation({
      query: ({id}) =>({
        url: `/registrarentradadevisitantes/${id}`,
        method: "POST",
        body : "presente"    
      }),
      invalidatesTags: ['veiculos']
    }),
    buscarRegistroDeEntradasDeVeiculos: builder.query<Registro[], any>({
      query: () =>({
        url: '/buscarregistrosdevisitas',
        method: 'GET',
       }),
      transformResponse: (response:Registro[]) => response,
      providesTags:['veiculos']
    }),
    registrarSaidaDeVisitante: builder.mutation({
      query: ({id}) =>({
        url: `/registrarsaidadevisitantes/${id}`,
        method: "PUT"
      }),
      invalidatesTags:['veiculos']
    })
}),
})


export const {
    useGetVeiculosQuery,
    useGetVeiculoPeloIdQuery,
    useCadastrarVeiculoMutation,
    useAtualizarVeiculoMutation,
    useRegistrarentradadevisitantesMutation,
    useBuscarRegistroDeEntradasDeVeiculosQuery,
    useRegistrarSaidaDeVisitanteMutation
} = veiculoApi