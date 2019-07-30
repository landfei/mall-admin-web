import React, { Fragment } from 'react';
import { Form, Checkbox, Input, Button } from 'antd';
import { trim } from 'lodash';

const CheckboxGroup = Checkbox.Group;

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 10 },
};

/**
 * 动态显示单一商品参数/规格
 */
function ProductAttrDetailComp(props) {
  console.log('ProductAttrDetailComp props', props);
  const { defaultValue = [] } = props;
  const {
    id,
    // 0:普通 1:颜色
    filterType,
    handAddStatus,
    inputList,
    // 0: 输入 1: 选择
    inputType,
    name,
    productAttributeCategoryId, relatedStatus, searchType, selectType, sort, type,
  } = props.model;
  const elems = [];
  const onChange = (checkedList) => {
    console.log('val', checkedList);
    const { onChange } = props;
    onChange && onChange({
      ...props.model,
      checkedList
    });
  }
  if (inputType === 1) {
    // checkbox
    // elems.push(inputList.split(',').map((item, index) => {
    //   const defaultChecked = (defaultValue.findIndex(val => trim(item) === trim(val)) !== -1);
    //   return <Checkbox value={item} key={`${item}`} defaultChecked={defaultChecked}
    //     onChange={(e) => onChange(e.target.value)}
    //   >{item}</Checkbox>
    // }));
    elems.push(<CheckboxGroup key="checkbox"
      options={inputList.split(',').map(item => trim(item))}
      defaultValue={defaultValue.map(item => trim(item))} onChange={onChange} />);
  }
  if (handAddStatus === 1) {
    elems.push(
      <div key={'addBtn'}>
        <Input /> <Button size="small">增加</Button>
      </div>
    )
  }
  const retVal = (
    <Fragment>
      {elems}
    </Fragment>
  )
  return retVal;
}

export default ProductAttrDetailComp;
