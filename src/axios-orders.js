import Axios from 'axios';

const  instance = Axios.create({
    baseURL: 'https://my-react-burger-13.firebaseio.com/'

});

export default instance;