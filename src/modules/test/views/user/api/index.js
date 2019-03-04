import axios from '@/public/axios';

export const Login = param => axios.post('/users/login', param, {needLogin: false});
export const Register = param => axios.post('/users/register', param, {needLogin: false});