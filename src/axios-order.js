import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burgerbuilder-2e398.firebaseio.com/'
});

export default instance;
