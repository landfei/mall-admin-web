import React from 'react';
import { Input, Table, InputNumber } from 'antd';
import InputMoney from '@/components/input-money';

function SkuTable(props, ref) {
  const { extColumns = [], onChange: propOnChange = ()=>{}, value } = props;
  console.log('SkuTable props', props);
  const onChange = (type, index, val) => {
    console.log('createMatchModelTable cartesian onChange', type, index, val, value);
    value[index][type] = val;
    // value.skuStockList = dataSource;
    propOnChange && propOnChange(value);
  }
  const columns = extColumns.concat([
    {
      title: '销售价格',
      dataIndex: 'price',
      render(text, record, index) {
        return <InputMoney defaultValue={text} key={record.id} onChange={onChange.bind(this, 'price', index)} />
      }
    },
    {
      title: '商品库存',
      dataIndex: 'stock',
      render(text, record, index) {
        return <InputNumber min={0} precision={0} defaultValue={text} key={record.id} onChange={onChange.bind(this, 'stock', index)} />
      }
    },
    {
      title: '库存预警',
      dataIndex: 'lowStock',
      render(text, record, index) {
        return <InputNumber min={0} precision={0} defaultValue={text} key={record.id} onChange={onChange.bind(this, 'lowStock', index)} />
      }
    },
    {
      title: 'SKU编号',
      dataIndex: 'skuCode',
      render(text, record, index) {
        return <Input defaultValue={text} key={record.id} onChange={onChange.bind(this, 'skuCode', index)} />
      }
    },
    {
      title: '操作',
      dataIndex: 'id',
    },
  ])
  return (
    <Table
      columns={columns}
      dataSource={value}
      pagination={false}
    />
  )
}

export default React.forwardRef(SkuTable);
