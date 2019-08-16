import moment from 'moment';

const defaultPageable = { total: 0, current: 1, pageSize: 10, list: [] };

export const INIT_STATE = {
  productInfo: {
    brandId: 49,
    name: '123',
    subTitle: '2',
    type: 2,
    // productAttributeCategoryId: 3,
    // promotionType: '1',
    // productLadderList: [
    //   {
    //     id: 69,
    //     productId: 26,
    //     count: 0,
    //     discount: 0.00,
    //     price: 0.00
    //   }
    // ],
    // productFullReductionList: [
    //   {
    //     id: 64,
    //     productId: 26,
    //     fullPrice: 0.00,
    //     reducePrice: 0.00
    //   }
    // ],
    // promotionStartTime: moment(),
    // promotionEndTime: moment(),
    // promotionPrice: 100,
    // memberPriceList: [
    //   {
    //     "id": 204,
    //     "productId": 26,
    //     "memberLevelId": 1,
    //     "memberPrice": 111.00,
    //     "memberLevelName": "黄金会员"
    //   },
    //   {
    //     "id": 205,
    //     "productId": 26,
    //     "memberLevelId": 2,
    //     "memberPrice": 222.00,
    //     "memberLevelName": "白金会员"
    //   },
    //   {
    //     "id": 206,
    //     "productId": 26,
    //     "memberLevelId": 3,
    //     "memberPrice": 333.00,
    //     "memberLevelName": "钻石会员"
    //   }
    // ],
    // "skuStockList": [
    //   {
    //     "id": 114,
    //     "productId": 26,
    //     "skuCode": "201806070026001",
    //     "price": 3788.00,
    //     "stock": 499,
    //     "lowStock": null,
    //     "sp1": "金色",
    //     "sp2": "16G",
    //     "sp3": null,
    //     "pic": null,
    //     "sale": null,
    //     "promotionPrice": null,
    //     "lockStock": null
    //   },
    //   {
    //     "id": 115,
    //     "productId": 26,
    //     "skuCode": "201806070026002",
    //     "price": 3999.00,
    //     "stock": 500,
    //     "lowStock": null,
    //     "sp1": "金色",
    //     "sp2": "32G",
    //     "sp3": null,
    //     "pic": null,
    //     "sale": null,
    //     "promotionPrice": null,
    //     "lockStock": null
    //   },
    //   {
    //     "id": 116,
    //     "productId": 26,
    //     "skuCode": "201806070026003",
    //     "price": 3788.00,
    //     "stock": 500,
    //     "lowStock": null,
    //     "sp1": "银色",
    //     "sp2": "16G",
    //     "sp3": null,
    //     "pic": null,
    //     "sale": null,
    //     "promotionPrice": null,
    //     "lockStock": null
    //   },
    //   {
    //     "id": 117,
    //     "productId": 26,
    //     "skuCode": "201806070026004",
    //     "price": 3999.00,
    //     "stock": 500,
    //     "lowStock": null,
    //     "sp1": "银色",
    //     "sp2": "32G",
    //     "sp3": null,
    //     "pic": null,
    //     "sale": null,
    //     "promotionPrice": null,
    //     "lockStock": null
    //   }
    // ],
    // "productAttributeValueList": [
    //   {
    //     "id": 233,
    //     "productId": 26,
    //     "productAttributeId": 43,
    //     "value": "金色,银色"
    //   },
    //   {
    //     "id": 234,
    //     "productId": 26,
    //     "productAttributeId": 45,
    //     "value": "5.0"
    //   },
    //   {
    //     "id": 235,
    //     "productId": 26,
    //     "productAttributeId": 46,
    //     "value": "4G"
    //   },
    //   {
    //     "id": 236,
    //     "productId": 26,
    //     "productAttributeId": 47,
    //     "value": "Android"
    //   },
    //   {
    //     "id": 237,
    //     "productId": 26,
    //     "productAttributeId": 48,
    //     "value": "3000"
    //   }
    // ],
    // pic: 'http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180607/5ac1bf58Ndefaac16.jpg',
    // albumPics: "http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180607/5ab46a3cN616bdc41.jpg,http://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180607/5ac1bf5fN2522b9dc.jpg",
  },
  cmsSubject: [],
  cmsPrefrenceArea: [],
  productListInfo: {},
  productAttrInfo: {},
  // 商品分类
  productCategorySelectList: [],
  productAttrList: {
    ...defaultPageable
  },
  brandList: { ...defaultPageable },
  brandInfo: {},
  productAttributeCategoryList: [],
  productCateList: {
    ...defaultPageable
  },
  productCateInfo: {
    productAttributeIdList: [],
  },
  // 筛选属性
  productAttributeList: [],
  // 商品参数列表
  productAttributeValueList: [],
  // 商品规格列表
  productAttributeModelList: [],
  // 商品多规格列表
  productAttributeModel: {},
  loading: true
}

function reducer(state = INIT_STATE, action) {
  const { type, payload } = action;
  const result = { ...state };
  switch (type) {
    case 'FETCH_GOODS_BY_CONDITION':
      result.productListInfo = payload;
      break;
    case 'FETCH_PRODUCT_ATTRIBUTE_CATEGORY':
      result.productAttrList = payload;
      break;
    case 'FETCH_PRODUCT_ATTRIBUTE_LIST_BY_ID':
      result.productAttrList = payload;
      break;
    case 'FETCH_PRODUCT_ATTRIBUTE':
      result.productAttrInfo = payload;
      break;
    case 'UPDATE_PRODUCT_ATTRIBUTE_CATEGORY':
      result.productAttrList.list = result.productAttrList.list.map(attr => {
        if (attr.id === payload.id) {
          attr.name = payload.name;
        }
        return attr;
      });
      break;
    case 'FETCH_ALL_PRODUCT_ATTRIBUTE_CATEGORY_LIST':
      result.productAttributeCategoryList = payload.list;
      break;
    case 'PMS_CLEAR':
      result[payload.name] = payload.value;
      break;
    case 'LOADING':
      result.loading = payload;
      break;
    case 'FETCH_BRAND':
    case 'FETCH_BRAND_LIST':
      result.brandList = payload;
      break;
    case 'UPDATE_FACTORY_STATUS':
    case 'UPDATE_SHOW_STATUS':
      result.brandList.list = state.brandList.list.map(brandInfo => {
        let { factoryStatus, showStatus } = brandInfo;
        const {
          ids = [],
          factoryStatus: inFactoryStatus = factoryStatus,
          showStatus: inShowStatus = showStatus
        } = payload;
        const foundBrandInfo = ids.find(id => id === brandInfo.id);
        if (foundBrandInfo) {
          factoryStatus = inFactoryStatus;
          showStatus = inShowStatus;
        }
        return {
          ...brandInfo,
          factoryStatus,
          showStatus
        };
      });
      break;
    case 'FETCH_BRAND_BY_ID':
      result.brandInfo = payload;
      break;
    case 'FETCH_PRODUCT_CATE_BY_PARENT_ID':
      result.productCateList = payload;
      break;
    case 'UPDATE_PRODUCT_CATE_FOR_LIST':
      if (result.productCateList) {
        result.productCateList.list = result.productCateList.list.map(productCateInfo => {
          if (productCateInfo.id === payload.id) {
            return payload;
          }
          return productCateInfo;
        });
      }
      break;
    case 'FETCH_PRODUCT_CATE_BY_ID':
      result.productCateInfo = payload;
      break;
    case 'FETCH_CATEGORY_LIST_WITH_ATTR':
      result.productAttributeList = payload;
      break;
    case 'FETCH_PRODUCT_CATEGORY_WITH_CHILDREN':
      result.productCategorySelectList = payload;
      break;
    case 'FETCH_PRODUCT_ATTRIBUTE_LIST':
      result.productAttributeValueList = payload.list;
      break;
    case 'FETCH_PRODUCT_ATTRIBUTE_MODEL_LIST':
      console.log('FETCH_PRODUCT_ATTRIBUTE_MODEL_LIST payload', payload)
      result.productAttributeModelList = payload.list;
      result.productAttributeModel[payload.id] = payload.list;
      break;
    case 'CMS_FETCH_ALL_PREFRENCE_AREA':
      result.cmsPrefrenceArea = payload;
      break;
    case 'CMS_FETCH_ALL_SUBJECT':
      result.cmsSubject = payload;
      break;
    default:
  }
  return result;
}

export default reducer;
