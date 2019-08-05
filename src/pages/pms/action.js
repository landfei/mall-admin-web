import ProductAttributeModel from '@/models/ProductAttributeModel';
import BrandModel from '@/models/Brand';
import CmsModel from '@/models/CmsModel';

export const ACTION_TYPES = {
  FETCH_ALL_PRODUCT_ATTRIBUTE_CATEGORY_LIST: 'FETCH_ALL_PRODUCT_ATTRIBUTE_CATEGORY_LIST',
  LOADING: 'LOADING',
  PMS_CLEAR: 'PMS_CLEAR',
  CMS_FETCH_ALL_PREFRENCE_AREA: 'CMS_FETCH_ALL_PREFRENCE_AREA',
  CMS_FETCH_ALL_SUBJECT: 'CMS_FETCH_ALL_SUBJECT',
  FETCH_BRAND_LIST: 'FETCH_BRAND_LIST',
  FETCH_PRODUCT_ATTRIBUTE_LIST: 'FETCH_PRODUCT_ATTRIBUTE_LIST',
  FETCH_PRODUCT_ATTRIBUTE_MODEL_LIST: 'FETCH_PRODUCT_ATTRIBUTE_MODEL_LIST',
}

export async function wrapLoading(func) {
  await func.apply(this, arguments);

}

export async function fetchAttributeListByCategoryId(id, type, pageNum, pageSize) {
  const payload = await new ProductAttributeModel().fetchAttributeById(id, type, pageNum, pageSize);
  return {
    type: ACTION_TYPES.FETCH_PRODUCT_ATTRIBUTE_LIST,
    payload: payload
  }
}

export async function fetchAttributeModelListByCategoryId(id) {
  const payload = await new ProductAttributeModel().fetchAttributeById(id, 0, 1, 100);
  const { list, ...rest } = payload;
  return {
    type: ACTION_TYPES.FETCH_PRODUCT_ATTRIBUTE_MODEL_LIST,
    payload: {
      id,
      list,
      ...rest
    }
  }
}

export async function fetchAllAttributeCategory() {
  const payload = await new ProductAttributeModel().fetchAttributeCategory();
  return {
    type: ACTION_TYPES.FETCH_ALL_PRODUCT_ATTRIBUTE_CATEGORY_LIST,
    payload
  }
}

/**
 * 获取品牌列表
 *
 */
export async function fetchBrandList(pageNum = 1, pageSize = 10) {
  const payload = await new BrandModel().fetchBrand(pageNum, pageSize);
  return {
    type: ACTION_TYPES.FETCH_BRAND_LIST,
    payload: payload
  }
}

/**
 * 获取所有商品优选
 *
 */
export async function fetchAllPrefrenceArea() {
  const payload = await new CmsModel().fetchAllPrefrenceArea();
  return {
    type: ACTION_TYPES.CMS_FETCH_ALL_PREFRENCE_AREA,
    payload: payload
  }
}

/**
 * 获取全部商品专题
 *
 */
export async function fetchAllSubject() {
  const payload = await new CmsModel().fetchAllSubject();
  return {
    type: ACTION_TYPES.CMS_FETCH_ALL_SUBJECT,
    payload: payload
  }
}

export const actions = (dispatch, ownProps) => {
  return {
    changeLoading: (isLoading) => {
      dispatch({
        type: ACTION_TYPES.LOADING,
        payload: isLoading
      })
    },
    clearState: (name, value) => {
      dispatch({
        type: ACTION_TYPES.PMS_CLEAR,
        payload: { name, value }
      })
    },
    fetchAllAttributeCategory: async () => {
      const action = await fetchAllAttributeCategory();
      dispatch(action);
    },
    fetchBrandList: async (...args) => {
      const action = await fetchBrandList(...args);
      dispatch(action);
    },
    fetchAttributeListByCategoryId: async (...args) => {
      const action = await fetchAttributeListByCategoryId(...args);
      dispatch(action);
    },
    fetchAttributeModelListByCategoryId: async (...args) => {
      const action = await fetchAttributeModelListByCategoryId(...args);
      dispatch(action);
    },
    fetchAttributeModelListWithChildByCategoryId: async (...args) => {
      const action = await fetchAttributeModelListByCategoryId(...args);
      dispatch(action);
    },
    fetchAllPrefrenceArea: async (...args) => {
      const action = await fetchAllPrefrenceArea(...args);
      dispatch(action);
    },
    fetchAllSubject: async (...args) => {
      const action = await fetchAllSubject(...args);
      dispatch(action);
    },
  }
};

export default {
  ACTION_TYPES,
  actions
};
