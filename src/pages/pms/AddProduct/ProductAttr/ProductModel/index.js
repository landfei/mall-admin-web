import React, { Fragment, useState } from 'react';
import { Form, Input, Checkbox, Button, Table, InputNumber } from 'antd';
import { isSame, createCartesian } from '@/commons/Utils';
import InputMoney from '@/components/input-money';
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

class ProductModel extends React.PureComponent {

  componentDidMount() {
    console.log('ProductModel componentDidMount props', this.props);
  }

  createMatchModelTable() {
    const { list = [], value = [], onChange: propOnChange, data } = this.props;
    // 商品库存
    const { skuStockList } = data;
    let dataSource = createCartesian(value.map(item => item.checkedList).filter(
      item => item.length > 0 && !!item[0])).reduce(
        (p, c) => {
          return p.concat([
            c.reduce((p1, c1, index) => ({ ...p1, [`sp${index + 1}`]: c1 }), {})
          ])
        }, []).map((item, index) => ({
          key: index,
          id: index,
          ...item
        }));
    dataSource = dataSource.map(data => {
      const found = skuStockList.find(skuStockItem =>
        (isSame(skuStockItem.sp1, data.sp1)
          && isSame(skuStockItem.sp2, data.sp2)
          && isSame(skuStockItem.sp3, data.sp3))
      )
      return { ...data, ...found };
    });
    console.log('createMatchModelTable cartesian', list, dataSource);
    const columns = list.map((listItem, index) => ({
      title: listItem.name,
      dataIndex: `sp${index + 1}`,
    })).concat([
      {
        title: '销售价格',
        dataIndex: 'price',
        render(text, record) {
          return <InputMoney defaultValue={text} key={record.id}/>
        }
      },
      {
        title: '商品库存',
        dataIndex: 'stock',
        render(text, record) {
          return <InputNumber min={0} precision={0} defaultValue={text} key={record.id}/>
        }
      },
      {
        title: '库存预警',
        dataIndex: 'lowStock',
        render(text, record) {
          return <InputNumber min={0} precision={0} defaultValue={text} key={record.id}/>
        }
      },
      {
        title: 'SKU编号',
        dataIndex: 'skuCode',
        render(text, record) {
          return <Input defaultValue={text} key={record.id}/>
        }
      },
      {
        title: '操作',
        dataIndex: 'id',
      },
    ])
    // [
    //   {
    //     title: '姓名',
    //     dataIndex: 'name',
    //     key: 'name',
    //   },
    // ];
    return (
      <div>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={false}
        />
      </div>
    )
  }

  render() {
    console.log('ProductModel render props', this.props);
    const { list = [], value = [], onChange: propOnChange } = this.props;

    // 规格
    const productModelElems = value.map((item, index) => {
      const onChange = (val) => {
        const retVal = Array.from(value);
        retVal[index].checkedList = val.checkedList;
        console.log('onChange val', val, index, value);
        propOnChange && propOnChange(retVal);
      }
      return (
        <div key={`productAttribute_${item.id}`}>
          <Form.Item {...formItemLayout} label={item.name} key={`productAttribute_${item.id}`}>
            {createProductModelDetail(item, { onChange, defaultValue: item.checkedList })}
          </Form.Item>
        </div>
      );
    });
    return (
      <div>
        {productModelElems}
        {this.createMatchModelTable()}
      </div>
    );
  }
}

export default ProductModel;
