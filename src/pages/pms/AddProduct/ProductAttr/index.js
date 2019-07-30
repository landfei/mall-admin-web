import React, { useEffect } from 'react';
import { Form, Button, Select } from 'antd';
import { uniq } from 'lodash';
import FormLayout from '@/components/layout/form-layout';
import DetailHtml from './DetailHtml';
import ProductAlbumPics from './ProductAlbumPics';
import ProductAttrList from './ProductAttrList';
import ProductModel from './ProductModel';


const { Option } = Select;

const formTailLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 8, offset: 4 },
};


function ProductAttr(props) {
  console.log('ProductAttr props', props);
  const { data, productAttributeCategoryList = [], fetchAllAttributeCategory } = props;

  /**
   * 属性类型变更
   */
  const changeProductAttributeCategoryId = (value) => {
    console.log('changeProductAttributeCategoryId', value);
    const { fetchAttributeListByCategoryId, fetchAttributeModelListByCategoryId } = props;
    fetchAttributeListByCategoryId(value, 1, 1, 100);
    fetchAttributeModelListByCategoryId(value);
  }

  useEffect(() => {
    fetchAllAttributeCategory();
    if (data.productAttributeCategoryId) {
      changeProductAttributeCategoryId(data.productAttributeCategoryId);
    }
  }, []);

  const prevStep = () => {
    const { prevStep } = props;
    prevStep && prevStep();
  }

  const submitForm = (e) => {
    e.preventDefault();
    const { form, data, productInfo, nextStep } = props;
    // const { current, tmpDatas } = this.state;
    // const currentStepComp = stepFormList[current];
    form.validateFieldsAndScroll((err, values) => {
      console.log('nextStep values', values)
      if (err) {
        return;
      }
      const { detailHtmlEditor, detailMobileHtmlEditor, productAlbumPicsDefaultFileList, ...rest } = values;
      const detailHtml = detailHtmlEditor.toRAW();
      const detailMobileHtml = detailMobileHtmlEditor.toRAW();
      // const { memberPriceList } = Object.assign({}, productInfo, data);
      // console.log('nextStep memberPriceList', productInfo)
      // const result = {
      //   ...values,
      //   memberPriceList: [...memberPriceList],
      // };
      // // 去除会员价格多于部分
      // Object.keys(values).filter(key => /^memberPrice_/.test(key)).forEach((key, index) => {
      //   result.memberPriceList[index].memberPrice = (values[key]);
      //   delete result[key];
      // });
      let { pic, albumPics } = rest;
      if (productAlbumPicsDefaultFileList.length > 0) {
        const fileList = uniq(productAlbumPicsDefaultFileList.map(picItem => picItem.url));
        pic = fileList.shift();
        albumPics = fileList.join(',');
      }
      nextStep && nextStep({ ...rest, pic, albumPics, detailHtml, detailMobileHtml });
    })

  }
  const actions = [
    <Button type="primary" onClick={prevStep} key="btnPrev">上一步</Button>,
    <Button type="primary" onClick={submitForm} key="btnNext">下一步</Button>
  ];

  // 商品规格数据
  const productModelData = props.productAttributeModel[props.form.getFieldValue('productAttributeCategoryId')];

  const fields = [
    {
      name: 'productAttributeCategoryId',
      label: '属性类型',
      render: (text) => {
        return (
          <Select placeholder="请选择" onChange={changeProductAttributeCategoryId}>
            {productAttributeCategoryList.map(
              productAttributeCategoryItem => <Option value={productAttributeCategoryItem.id} key={productAttributeCategoryItem.id}>{productAttributeCategoryItem.name}</Option>)}
          </Select>
        );
      }
    },
    {
      label: '商品规格',
      span: 20,
      render: () => {
        const { productAttributeModelList, form, data } = props;
        const { getFieldDecorator } = form;
        const { skuStockList, productModel } = data;
        const getStockAttrList = () => {
          if (productModel) {
            return productModel;
          }
          // 汇总库存规格
          const stockAttrs = productAttributeModelList.map((productAttribute, index) => {
            return {
              ...productAttribute,
              checkedList: uniq(skuStockList.map(skuStockItem => skuStockItem[`sp${index + 1}`]))
            }
          });
          return stockAttrs;
        }
        return getFieldDecorator('productModel', {
          initialValue: getStockAttrList()
        })(
          <ProductModel {...props} list={productModelData} />
        );
      }
    },
    {
      name: 'attrPic',
      label: '属性图片',
    },
    {
      name: 'productAttributeValueList',
      label: '商品参数',
      span: 18,
      // valuePropName: 'valueList',
      render: (text) => <ProductAttrList {...props} />
    },
    {
      label: '商品相册',
      span: 18,
      render: (text) => <ProductAlbumPics {...props} />
    },
    {
      label: '详情参数',
      span: 18,
      render: (text) => <DetailHtml {...props} />
    },
  ];

  return (
    <FormLayout actions={actions} defaultValues={props.data} {...formTailLayout} {...props} fields={fields} onSubmit={submitForm} />
  )
}


const WrappedProductAttr = Form.create({ name: 'add.product.productAttr' })(ProductAttr)
export default WrappedProductAttr;
