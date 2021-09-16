import request from "@/request/request";

export const getHomeLists = () => request.get('/index/index')
export const getSearchData = () => request.get('/search/index')
export const getSearchTipsData = (params) => request.get('search/helper', {params})
export const getProductItem = (params) => request.get('goods/list', {params})

