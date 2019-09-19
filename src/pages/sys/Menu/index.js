import React from 'react';
import { Icon, Input } from 'antd';
import { connect } from 'react-redux';
import TaticTable from '@/components/tatic-table';
import { actions } from './action';

import './style.less';

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1228518_mn80nxg2o7f.js',
});

class SysMenu extends React.PureComponent {

  // state = {
  //   fieldsValue: {}
  // }

  columns = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      width: 100
    },
    {
      title: '名称',
      dataIndex: 'title',
      key: 'title',
      width: 200,
      render: (text, record) => {
        return <Input defaultValue={text} onChange={(e) => { this.updateTableState({ ...record, title: e.target.value }) }} />
      }
    },
    {
      title: '路径',
      dataIndex: 'path',
      key: 'path',
      render: (text, record) => {
        return <Input defaultValue={text} onChange={(e) => { this.updateTableState({ ...record, path: e.target.value }) }} />
      }
    },
    {
      title: '图标',
      dataIndex: 'icon',
      key: 'icon',
      width: 60,
      render: (text) => {
        return (
          <div className="center">
            <IconFont type={text} />
          </div>
        );
      }
    },
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort',
      width: 100
    },
    {
      title: '',
      dataIndex: 'id',
      key: 'actions',
      width: 100,
      render: (id, record, index) => {
        console.log('actions record', record);
        // const { fieldsValue } = this.state;
        const activeClassName = (record.isModify === 1 || record.virtual === 1) ? 'active' : '';
        return (
          <div className="actions">
            <Icon type="plus" onClick={() => {
              this.plusHandler(record);
            }} />
            <Icon type="delete" onClick={() => {
              this.deleteMenu(record);
            }} />
            <Icon type="save" className={activeClassName} onClick={() => {
              if (activeClassName) {
                // 重置修改标志
                record.isModify = 0;
                if (record.virtual === 1) {
                  this.addMenu(record);
                } else {
                  this.saveMenu(record);
                }
              }
            }} />
          </div>
        )
      }
    },
  ]

  componentDidMount() {
    const { fetchAllMenu } = this.props;
    fetchAllMenu();
  }

  plusHandler = (record) => {
    const { plusMenu } = this.props;
    plusMenu(record);
  }

  /**
   * 保存菜单数据
   *
   * @param {object} sysMenu 菜单对象
   */
  saveMenu = async (sysMenu) => {
    const {
      icon,
      parentId,
      path,
      sort,
      title
    } = sysMenu;
    const { updateMenu } = this.props;
    await updateMenu(sysMenu.id, {
      icon,
      parentId,
      path,
      sort,
      title
    });
    // const fieldsValue = { ...this.state.fieldsValue };
    // delete fieldsValue[sysMenu.id];
    // this.setState({
    //   fieldsValue
    // })
  }

  /**
   * 增加菜单
   */
  addMenu = async (sysMenu) => {
    const {
      icon,
      parentId,
      path,
      sort,
      title,
      id
    } = sysMenu;
    const { addMenu } = this.props;
    await addMenu({
      vId: id,
      icon,
      parentId,
      path,
      sort,
      title
    });

    // const fieldsValue = { ...this.state.fieldsValue };
    // delete fieldsValue[sysMenu.id];
    // this.setState({
    //   fieldsValue
    // });
  }

  /**
   * 更新数据
   *
   */
  updateTableState = (record) => {
    const { modifyMenu } = this.props;
    record.isModify = 1;
    modifyMenu(record);
    // this.setState({
    //   fieldsValue: Object.assign({}, this.state.fieldsValue, { [record.id]: record })
    // });
  }

  /**
   * 删除菜单信息
   *
   * @param {integer} id 菜单id
   */
  deleteMenu = (menuInfo) => {
    const { deleteMenu, deleteVirtualMenu } = this.props;
    // 虚拟节点不需要调用接口
    if (menuInfo.virtual === 1) {
      deleteVirtualMenu(menuInfo);
    } else {
      deleteMenu(menuInfo);
    }
  }

  render() {
    const { menus: dataSource } = this.props;
    return (
      <div className="sys-menu-list">
        <TaticTable
          columns={this.columns}
          dataSource={dataSource}
          rowKey="id"
          onChange={this.updateTable}
        ></TaticTable>
      </div>
    );
  }
}
const store = (state) => {
  const { sys } = state;
  return sys;
}
export default connect(store, actions)(SysMenu);
