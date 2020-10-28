import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-b32cf.firebaseio.com/'
});

export default instance;
