import axios from "axios";

const CrypGetApi = async () => {
    try {
        const response = await axios.get('https://api.coinranking.com/v2/coins')
        return response.data
    } catch (error) {
        console.log(error)
    }
}

export default CrypGetApi;