import React from 'react';
import { Form, Input, Table, InputNumber } from 'antd';
import { uniq } from 'lodash';
import ProductAttrDetailComp from '../../ProductAttrDetailComp';

const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 16 },
};

/**
 * 生成一个商品规格
 */
const createProductModelDetail = (productModelData = {}, { defaultValue, onChange }) => {
  const { id } = productModelData;
  let retVal = <ProductAttrDetailComp model={productModelData} key={id}
    defaultValue={defaultValue} onChange={onChange} />;
  return retVal;
}

function ProductModelView(props, ref) {
  console.log('ProductModelView props', props)
  const { value, productAttributeModelList, onChange: propsOnChange } = props;
  const modelList = productAttributeModelList.map(item => item);
  const productModelElem = productAttributeModelList.map((modelItem, index) => {
    const onChange = (val) => {
      console.log('ProductModelView onChange val', val, index, value);
      value[`sp${(index + 1)}`].checkedList = val.checkedList;
      propsOnChange && propsOnChange(value)
    };
    // 默认值
    const defaultValue = value[`sp${(index + 1)}`].checkedList;
    return (
      <div key={`productAttribute_${modelItem.id}`}>
        <Form.Item {...formItemLayout} label={modelItem.name} key={`productAttribute_${modelItem.id}`}>
          {createProductModelDetail(modelItem, { onChange, defaultValue })}
        </Form.Item>
      </div>
    );
  })
  return (
    <div>
      {productModelElem}
    </div>
  )
}

export default React.forwardRef(ProductModelView);
