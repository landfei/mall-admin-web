import React, { useEffect, useState } from 'react';
import { Button, Form, Transfer } from 'antd';
import FormLayout from '@/components/layout/form-layout';

import './index.less';

function ProductRelation(props) {
  console.log('ProductRelation props', props);
  const { cmsSubject, cmsPrefrenceArea, form } = props;
  const { getFieldDecorator } = form;
  // 关联专题
  const [cmsSubjectTargetKeys, setCmsSubjectTargetKeys] = useState([]);
  const [cmsPrefrenceAreaTargetKeys, setCmsPrefrenceAreaTargetKeys] = useState([]);
  console.log('cmsSubjectTargetKeys, cmsPrefrenceAreaTargetKeys', cmsSubjectTargetKeys, cmsPrefrenceAreaTargetKeys);

  useEffect(() => {
    const { fetchAllPrefrenceArea, fetchAllSubject } = props;
    fetchAllPrefrenceArea();
    fetchAllSubject();
    return () => {

    };
  }, []);

  const prevStep = () => {
    const { prevStep } = props;
    prevStep && prevStep();
  }

  const submitForm = (e) => {
    e.preventDefault();
    const { form, data, productInfo, onSubmit } = props;
    // const { current, tmpDatas } = this.state;
    // const currentStepComp = stepFormList[current];
    form.validateFieldsAndScroll((err, values) => {
      console.log('nextStep values', values, err)
      if (err) {
        return;
      }
      const subjectProductRelationList = cmsSubjectTargetKeys.map(id => ({ subjectId: id }));
      const prefrenceAreaProductRelationList = cmsPrefrenceAreaTargetKeys.map(id => ({ prefrenceAreaId: id }));

      onSubmit && onSubmit({
        ...values,
        subjectProductRelationList, prefrenceAreaProductRelationList
      });
    })
  }

  const actions = [
    <Button type="primary" onClick={prevStep} key="btnPrev">上一步</Button>,
    <Button type="primary" onClick={submitForm} key="btnNext">提交</Button>
  ];
  // 关联专题
  const cmsSubjectDataSource = cmsSubject.map(cmsSubjectItem => {
    const { id, title, description } = cmsSubjectItem;
    const retVal = {
      key: id,
      title,
      description,
      chosen: !!cmsSubjectTargetKeys[id]
    }
    return retVal;
  });
  // 关联优选
  const cmsPrefrenceAreaDataSource = cmsPrefrenceArea.map(cmsPrefrenceAreaItem => {
    const { id, name: title, subTitle: description } = cmsPrefrenceAreaItem;
    const retVal = {
      key: id,
      title,
      description,
      chosen: false
    }
    return retVal;
  });
  console.log('cmsSubjectDataSource, cmsPrefrenceAreaDataSource', cmsSubjectDataSource, cmsPrefrenceAreaDataSource)
  const fields = [
    {
      label: '关联专题',
      span: 18,
      render: () => (<Transfer
        dataSource={cmsSubjectDataSource}
        className="product-relation-transfer"
        showSearch
        render={item => item.title}
        targetKeys={cmsSubjectTargetKeys}
        onChange={(targetKeys) => {
          setCmsSubjectTargetKeys(targetKeys);
        }}
      />)
    },
    {
      label: '关联优选',
      span: 18,
      render: () => (<Transfer
        dataSource={cmsPrefrenceAreaDataSource}
        className="product-relation-transfer"
        showSearch
        render={item => item.title}
        targetKeys={cmsPrefrenceAreaTargetKeys}
        onChange={(targetKeys) => {
          setCmsPrefrenceAreaTargetKeys(targetKeys);
        }}
      />)
    },
  ];

  return (
    <FormLayout actions={actions} {...props} fields={fields} />
  )
}

const WrappedProductRelation = Form.create({ name: 'add.product.productRelation' })(ProductRelation)
export default WrappedProductRelation;

