import axios from "axios";

const CrypGetApiDetail = async (coinUuid) => {
    try {
        const response = await axios.get(`https://api.coinranking.com/v2/coin/${coinUuid}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export default CrypGetApiDetail;