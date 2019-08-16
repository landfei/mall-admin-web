import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import Steps from './Steps';
import { actions } from './actions';
import PromotionInfo from './PromotionInfo';
import ProductRelation from './ProductRelation';
import ProductInfo from './ProductInfo';
import ProductAttr from './ProductAttr';

import './style.less';

const stepFormList = [ProductInfo, PromotionInfo, ProductAttr, ProductRelation];

class AddProduct extends React.PureComponent {
  constructor(props, ctx) {
    super(props, ctx);
    this.state = {
      current: 2,
      steps: 4,
      tmpDatas: [],
      currentFieldsData: {}
    }
  }

  onSubmit = (lastFormValues) => {
    const { tmpDatas } = this.state;
    const productInfo = Object.assign({}, tmpDatas.reduce((p, c, index, array) => {
      return Object.assign({}, p, c);
    }, {}), lastFormValues);
    console.log('onSubmit tmpDatas', productInfo, tmpDatas, lastFormValues);
  }

  prevStep = () => {
    const { current } = this.state;
    const to = current - 1;
    if (current > 0) {
      this.setState({
        current: to,
        currentFieldsData: this.getFormData(to)
      });
    }
  }

  getFormData = (current) => {
    const { tmpDatas } = this.state;
    // const currentStepComp = stepFormList[current];
    // const { fields = [] } = currentStepComp;
    const currentFieldsData = tmpDatas[current];
    console.log('currentFieldsData', currentFieldsData);
    return currentFieldsData;
  }

  nextStep = (values) => {
    console.log('addProduct nextStep values', values)
    const { current, tmpDatas } = this.state;
    // const currentStepComp = stepFormList[current];
    tmpDatas[current] = values;
    // 翻页
    if (current < 3) {
      this.setState({
        current: current + 1
      })
    }
  }

  onChange = (e) => {

  }

  render() {
    const { productInfo } = this.props;
    const { current, currentFieldsData } = this.state;
    const StepComp = stepFormList[current];
    const buttons = [];
    if (current === 0) {
      buttons.push(<Button type="primary" onClick={this.nextStep} key="btnNext">下一步</Button>);
    } else if (current >= 3) {
      buttons.push(<Button type="primary" onClick={this.prevStep} key="btnPrev">上一步</Button>)
      buttons.push(<Button type="primary" onClick={this.submitForm} key="btnSubmit">提交</Button>)
    } else {
      buttons.push(<Button type="primary" onClick={this.prevStep} key="btnPrev">上一步</Button>)
      buttons.push(<Button type="primary" onClick={this.nextStep} key="btnNext">下一步</Button>);
    }

    return (
      <div className="add-product">
        <Steps current={current} />
        <StepComp {...this.props}
          data={{ ...productInfo, ...currentFieldsData }}
          // actions={buttons}
          onSubmit={this.onSubmit}
          nextStep={this.nextStep} prevStep={this.prevStep} />
      </div>
    );
  }
}
const store = (state) => {
  return {
    ...state.pms
  }
}
const connAddProduct = connect(store, actions)(AddProduct);
export default connAddProduct;

