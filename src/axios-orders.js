import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-d6219.firebaseio.com/'
});

export default instance;