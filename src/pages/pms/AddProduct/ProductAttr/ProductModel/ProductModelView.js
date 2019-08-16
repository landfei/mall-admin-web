import React from 'react';
import { Form, Button, Row, Col } from 'antd';
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
  /**
   * value: {sp1: [], sp2: [], sp3: []}
   */
  const { value, productAttributeModelList, onChange: propsOnChange } = props;
  const modelList = productAttributeModelList.map(item => item);
  const productModelElem = productAttributeModelList.map((modelItem, index) => {
    const onChange = (val) => {
      console.log('ProductModelView onChange val', val, index, value);
      // if (value && value.length > index) {
      //   value[`sp${(index + 1)}`].checkedList = val.checkedList;
      // }
      const retVal = {
        ...value,
        [`sp${(index + 1)}`]: val.checkedList
      };
      console.log('ProductModelView onChange retVal', retVal)
      propsOnChange && propsOnChange(retVal);
    };
    // 默认值
    const defaultValue = [];
    // if (value && value.length >= productAttributeModelList.length) {
    //   value[`sp${(index + 1)}`];
    // }
    return (
      <div key={`productAttribute_${modelItem.id}`}>
        <Form.Item {...formItemLayout} label={modelItem.name}
          key={`productAttribute_${modelItem.id}`}>
          {createProductModelDetail(modelItem, { onChange, defaultValue })}
        </Form.Item>
      </div>
    );
  });

  /**
   * 按照规格生成对应表格
   */
  const reBuild = () => {
    console.log('reBuild value', value);
  }

  const btnElem = (productModelElem.length > 0) && (
    <Row>
      <Col span={20} offset={4}>
        <Button type="primary" onClick={reBuild}>重新生成</Button>
      </Col>
    </Row>
  );
  return (
    <div>
      {productModelElem}
      {btnElem}
    </div>
  )
}

export default React.forwardRef(ProductModelView);
