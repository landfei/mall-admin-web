const INIT_STATE = {
  productListInfo: {},
}



function reducer(state = INIT_STATE, action) {
  const { type, payload } = action;
  const result = { ...state };
  switch (type) {
    case 'FETCH_GOODS_BY_CONDITION':
      result.productListInfo = payload;
      break;
    case 'UPDATE_PRODUCT_ATTRIBUTE_CATEGORY':
      // result.productListInfo
      break;
    default:
  }
  return result;
}

export default reducer;
