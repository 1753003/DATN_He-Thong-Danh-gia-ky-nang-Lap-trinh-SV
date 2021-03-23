import axios from 'axios';
import Cookies from 'js-cookie'

export function getPracticeListDetail(id) {
  return new Promise( (resolve, reject) => {
      axios.get(`http://localhost:5000/api/practice/${id}`, {headers:{'accessToken':Cookies.get('accessToken')}})
      .then((response) => {
          // handle success
          // console.log(response.data)
          resolve(response.data)
      })
      .catch((error) => {
          // handle error
          console.log(error)
      })
  })
}


