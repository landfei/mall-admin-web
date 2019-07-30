import React, { Fragment } from 'react';
import { Form, Input } from 'antd';

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 10 },
};


function ProductAttrList(props, ref) {
  console.log('ProductAttrList props', props)
  const { productAttributeValueList = [] } = props;
  const { productAttributeValueList: productAttributeValueListData = [] } = props.data;

  const productAttrListData = productAttributeValueList.map((productAttributeValue) => {
    const retVal = { ...productAttributeValue };
    const foundValueItem = productAttributeValueListData.find(item => item.productAttributeId === retVal.id);
    if (foundValueItem) {
      retVal.value = foundValueItem.value;
    }
    return retVal;
  });


  const onChange = (index, e) => {
    const { onChange } = props;
    const retVal = productAttrListData.map(item => ({
      ...item,
      productAttributeId: item.id
    }));
    console.log('onChange retVal', index, e, retVal)
    retVal[index].value = e.currentTarget.value;
    onChange && onChange(retVal);
  }

  console.log('foundValueItem', productAttrListData, productAttributeValueListData)

  return (
    <Fragment>
      {productAttrListData.map((item, index) => {
        return (
          <Form.Item {...formItemLayout} label={item.name} key={`productAttribute_${item.id}`}>
            <Input onChange={onChange.bind(this, index)} defaultValue={item.value} />
          </Form.Item>
        );
      })}
    </Fragment>
  );
}

export default React.forwardRef(ProductAttrList);
