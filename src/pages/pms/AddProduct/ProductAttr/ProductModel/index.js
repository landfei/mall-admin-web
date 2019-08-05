import React, { Fragment, useState } from 'react';
import { Form, Input, Checkbox, Button, Table, InputNumber } from 'antd';
import { uniq } from 'lodash';
import { isSame, createCartesian } from '@/commons/Utils';
import InputMoney from '@/components/input-money';
import ProductAttrDetailComp from '../../ProductAttrDetailComp';
import SkuTable from './SkuTable';
import ProductModelView from './ProductModelView';

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

class ProductModel extends React.PureComponent {

  componentDidMount() {
    console.log('ProductModel componentDidMount props', this.props);
  }

  createMatchModelTable(checkedList = []) {
    const { productAttributeModelList, list, value, onChange, data, ...rest } = this.props;
    let dataSource = createCartesian(checkedList.filter(
      item => item.length > 0 && !!item[0])).reduce(
        (p, c) => {
          return p.concat([
            c.reduce((p1, c1, index) => ({ ...p1, [`sp${index + 1}`]: c1 }), {})
          ])
        }, []);
    // .map((item, index) => ({
    //   key: item.id,
    //   id: index,
    //   ...item
    // }));
    dataSource = dataSource.map((dataItem, index) => {
      // 商品库存
      const found = data.skuStockList.find(skuStockItem =>
        (isSame(skuStockItem.sp1, dataItem.sp1)
          && isSame(skuStockItem.sp2, dataItem.sp2)
          && isSame(skuStockItem.sp3, dataItem.sp3))
      )
      return { key: index, ...dataItem, ...found };
    });
    console.log('createMatchModelTable cartesian', list, dataSource);
    const columns = productAttributeModelList.map((listItem, index) => ({
      title: listItem.name,
      dataIndex: `sp${index + 1}`,
    }));
    const { getFieldDecorator } = this.props.form;
    return getFieldDecorator('skuStockList', {
      initialValue: dataSource
    })(
      <SkuTable
        {...rest}
        extColumns={columns}
        onChange={onChange}
      />
    );
  }

  createProductModelView(checkedMap) {
    const { value = {}, onChange: propOnChange, ...rest } = this.props;
    const { getFieldDecorator } = this.props.form;
    const onChange = (val) => {
      console.log('createProductModelView onChange val', val, value);
      const retVal = value.productModel.map((productModelItem, index) => ({
        ...productModelItem,
        checkedList: val[`sp${(index + 1)}`]
      }));
      console.log('createProductModelView onChange retVal', retVal);
      // retVal[index].checkedList = val.checkedList;
      propOnChange && propOnChange({ ...value, productModel: retVal });
    }
    return (
      <div>
        {getFieldDecorator('productAttributeModelMap', {
          initialValue: []
        })(
          <ProductModelView {...rest} onChange={onChange} />
        )}
      </div>
    )
  }

  getSelectedList() {
    let checkedMap = {};
    // 获取已经选择的数值
    checkedMap = this.props.form.getFieldValue('productAttributeModelList');
    if (!checkedMap) {
      // 库存信息, 根据库存赋值
      const { skuStockList } = this.props.data;
      checkedMap = skuStockList.reduce((p, c) => {
        const { sp1, sp2, sp3 } = p;
        if (c.sp1) {
          p.sp1 = sp1.concat([c.sp1]);
        }
        if (c.sp2) {
          p.sp2 = sp2.concat([c.sp2]);
        }
        if (c.sp3) {
          p.sp3 = sp3.concat([c.sp3]);
        }
        return p;
      }, { sp1: [], sp2: [], sp3: [] });
      checkedMap.sp1 = uniq(checkedMap.sp1);
      checkedMap.sp2 = uniq(checkedMap.sp2);
      checkedMap.sp3 = uniq(checkedMap.sp3);
    }
    return checkedMap;
  }

  render() {
    console.log('ProductModel render props', this.props);
    const checkedMap = this.getSelectedList();
    return (
      <div>
        {this.createProductModelView(checkedMap)}
        {this.createMatchModelTable(Object.values(checkedMap))}
      </div>
    );
  }
}

export default ProductModel;
