import React from 'react';
import { Table } from 'antd';

function TaticTable({ columns = [], ...rest }) {
  const newColumns = columns.map(({ title, ...others }) => {
    return {
      title: <div className="center">{title}</div>,
      ...others
    }
  });
  return <Table columns={newColumns} {...rest} />
}

export default TaticTable;
