import React from 'react';
import { InputNumber } from 'antd';
import './style.less';

const InputNumberPlus = React.forwardRef((props, ref) => {
  return (
    <InputNumber ref={ref} precision={2} formatter={value => `¥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} min={0} className="input-money" {...props}/>
    )
})

export default InputNumberPlus;
