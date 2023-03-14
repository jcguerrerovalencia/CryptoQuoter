import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Error from "./Error";
import useSelectCurrency from "../hooks/useSelectCurrency";
import { currencies } from "../data/currencies";

const InputSubmit = styled.input`
  background-color: #9497ff;
  border: none;
  width: 100%;
  padding: 10px;
  color: #fff;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 20px;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  margin-top: 30px;

  &:hover {
    background-color: #7a7dfe;
    cursor: pointer;
  }
`;

const Form = ({ setCurrencies }) => {
  const [cryptos, setCryptos] = useState([]);
  const [error, setError] = useState(false);

  const [currency, SelectCurrency] = useSelectCurrency(
    "Choose your Currency",
    currencies
  );
  const [cryptoCurrency, SelectCryptoCurrency] = useSelectCurrency(
    "Choose your CryptoCurrency",
    cryptos
  );

  useEffect(() => {
    const consultAPI = async () => {
      const url =
        "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD";
      const response = await fetch(url);

      const result = await response.json();

      const arrayCryptos = result.Data.map((crypto) => {
        const object = {
          id: crypto.CoinInfo.Name,
          name: crypto.CoinInfo.FullName,
        };

        return object;
      });
      setCryptos(arrayCryptos);
    };
    consultAPI();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([currency, cryptoCurrency].includes("")) {
      setError(true);
      return;
    }
    setError(false);
    setCurrencies({
      currency,
      cryptoCurrency,
    });
  };

  return (
    <>
      {error && <Error>Todos los campos son obligatorios</Error>}

      <form onSubmit={handleSubmit}>
        <SelectCurrency />
        <SelectCryptoCurrency />

        <InputSubmit type="submit" value="Quote"></InputSubmit>
      </form>
    </>
  );
};

export default Form;
