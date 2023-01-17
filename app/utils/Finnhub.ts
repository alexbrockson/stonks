import Stock from "./Stock";

const baseURL = "https://finnhub.io/api/v1";

const GetAllSymbols = async () => {
    const url = `${baseURL}/stock/symbol?exchange=US&token=${process.env.NEXT_PUBLIC_FINNHUB_KEY}`;
    const response = await fetch(url);

    if (!response.ok) {
        // console.log(response.ok);
    }
    return await response.json();
}

const GetQuote = async (symbol: string) => {
    const url = `${baseURL}/quote?symbol=${symbol}&token=${process.env.NEXT_PUBLIC_FINNHUB_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
        console.log(response);
    }
    return await response.json();
}



export { GetAllSymbols, GetQuote }