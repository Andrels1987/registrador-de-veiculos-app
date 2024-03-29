import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import  { Veiculo }  from '../../../src/modelos/Veiculo';
import { Registro } from '../../modelos/Registros';


// Define a service using a base URL and expected endpoints
export const veiculoApi = createApi({
  reducerPath: 'api',
  tagTypes: ['veiculos'],
  //baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8023/' }),
  baseQuery: fetchBaseQuery({ baseUrl: 'https://registrador-de-veiculos.onrender.com' }),
  endpoints: (builder) => ({
    getVeiculos: builder.query<Veiculo[], any>({
      query: () => ({
        url : '/todosveiculos',
        method: 'GET',
        headers:{
          "Cache-control": "no-cache",
          'Content-Type': 'text/html; charset=utf-8',
          'X-Content-Type-Options': 'nosniff'      
        }
      }),
      transformResponse: (response:Veiculo[]) => response,
      providesTags: ['veiculos']
    }),
    cadastrarVeiculo: builder.mutation<Veiculo, any>({
      query: ({veiculo}) =>({
        url: "/enviarveiculo",
        method: "POST",
        headers: {
          'X-Content-Type-Options': 'nosniff'
        },
        body: {
          modelo: veiculo.modelo, 
          cor: veiculo.cor, 
          marca: veiculo.marca,
          placa: veiculo.placa, 
          nomeProprietario: veiculo.motorista.nome, 
          foto: veiculo.foto, 
          vaga: veiculo.vaga,
          tipoDeAutorizacao: veiculo.tipoDeAutorizacao, 
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
        headers: {
          'X-Content-Type-Options': 'nosniff'
        },
      }),
      providesTags: ['veiculos']
    }),
    atualizarVeiculo: builder.mutation({
      query: ({veiculo}) => ({
        url: `/atualizarveiculo/${veiculo.id}`,
        method: 'PUT',
        headers: {
          'X-Content-Type-Options': 'nosniff'
        },
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
        headers: {
          'X-Content-Type-Options': 'nosniff'
        },
        body : "presente"    
      }),
      invalidatesTags: ['veiculos']
    }),
    buscarRegistroDeEntradasDeVeiculos: builder.query<Registro[], any>({
      query: () =>({
        url: '/buscarregistrosdevisitas',
        method: 'GET',
        headers:{
          "Cache-control": "no-cache",
          'Content-Type': 'text/x-typescript',
          'X-Content-Type-Options': 'nosniff'
        }
       }),
      transformResponse: (response:Registro[]) => response,
      providesTags:['veiculos']
    }),
    registrarSaidaDeVisitante: builder.mutation({
      query: ({id}) =>({
        url: `/registrarsaidadevisitantes/${id}`,
        method: "PUT",
        headers: {
          'X-Content-Type-Options': 'nosniff'
        },
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