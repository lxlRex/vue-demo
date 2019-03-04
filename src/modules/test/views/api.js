import axios from '@/public/axios'

export const HomepagePaginate = params => axios.get("/http/homeData", { params, needLogin: false });
export const HomeBanner = params => axios.get("/common/homeBanner", { params });