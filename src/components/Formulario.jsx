import { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import useSelectMonedas from '../hooks/useSelectMonedas'
import { monedas } from '../data/monedas'
import Error from './Error'

const InputSubmit = styled.input`
	background-color: #9497FF;
	border: none;
	width: 100%;
	padding: 10px;
	color: #fff;
	font-weight: 700;
	text-transform: uppercase;
	font-size: 20px;
	border-radius: 5px;
	transition: background-color .3s ease;
	margin-top: 30px;

	&:hover {
		background-color: #7A7DFE;
		cursor: pointer;
	}
`

const Formulario = ({ setMonedas }) => {

	const [criptos, setCriptos] = useState([])
	const [error, setError] = useState(false)

	const [moneda, SelectMonedas] = useSelectMonedas("Elije tu moneda", monedas)
	const [criptomoneda, SelectCriptomonedas] = useSelectMonedas("Elije tu criptomoneda", criptos)


	useEffect(() => {
		const consultarAPI = async () => {
			const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";

			const respuesta = await fetch(url);
			const resultado = await respuesta.json()
			//console.log(resultado.Data);

			const arrayCriptos = resultado.Data.map(cripto => {

				const objeto = {
					id: cripto.CoinInfo.Name,
					nombre: cripto.CoinInfo.FullName
				}
				//console.log(objeto);
				return objeto;
			})

			setCriptos(arrayCriptos)
			//console.log(arrayCriptos);
		}
		consultarAPI();
	}, [])

	const handleSubmit = e => {
		e.preventDefault()
		//console.log("Enviando formulario");
		//console.log("Moneda: ",moneda);
		//console.log("Criptomoneda: ",criptomoneda);

		if ([monedas, criptomoneda].includes('')) {
			console.log("ERROR");
			setError(true)
			return
		}
		setMonedas({ moneda, criptomoneda })
		setError(false)
	}

	return (

		<>
			{error && <Error>Todos los campos son obligatorios</Error>}

			<form
				onSubmit={handleSubmit}
			>
				<SelectMonedas />
				<SelectCriptomonedas />
				<InputSubmit type="submit" value="Cotizar" />
			</form>
		</>
	)
}

export default Formulario