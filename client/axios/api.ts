import axios from 'axios'


const API_URL = 'http://localhost:8081'

export const login = async (name: string, password: string) => {
    await axios
      .get(`${API_URL}/login`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
       console.log(response.data);
      })
      .catch((error)=>{
        console.log(error)
      });
}