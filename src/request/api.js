import request from "@/request/request";

export const getHomeLists = () => request.get('/index/index')
export const getSearchData = () => request.get('/search/index')
export const getSearchTipsData = (params) => request.get('search/helper', {params})
export const getProductItem = (params) => request.get('goods/list', {params})
export const getProductDetail = (params) => request.get('/goods/detail', {params})
export const getGoodsRelatedData = params => request.get("/goods/related", {params})
export const getCartNumbers = () => request.get("cart/goodscount")
export const getCartInfo = () => request.get("cart/index")

export const clearHistory = () => request.post('/search/clearhistory')
export const loginPost = params => request.post('/auth/loginByWeb', params)
export const addToCart = params => request.post('/cart/add', params)
export const changeChecked = params => request.post('/cart/checked', params)

// get 需要 {} 而 post 不需要