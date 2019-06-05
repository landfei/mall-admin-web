import React, { useState, useEffect } from 'react';
import { Menu, Icon } from 'antd';
const { SubMenu } = Menu;

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1228518_mn80nxg2o7f.js',
});

function createMenu(key, title, icon, subMenuList = []) {
  if (subMenuList && subMenuList.length > 0) {
    console.log(subMenuList)
    return (
      <SubMenu
        key={key}
        title={
          <span>
            <IconFont type={icon} />
            <span>{title}</span>
          </span>
        }
      >
        {subMenuList.map((subMenuItem) => {
          const { key, title, icon } = subMenuItem;
          return createMenu(key, title, icon)

        })}
      </SubMenu>
    );
  }
  return (
    <Menu.Item key={key}>
      <IconFont type={icon} />
      <span>{title}</span>
    </Menu.Item>
  );
}

function MenuComp({ defaultSelectedKeys = [], onSelect }) {
  const defaultOpenKeys = defaultSelectedKeys;
  const [selectedKeys, setSelectedKeys] = useState(defaultSelectedKeys);
  // const [openKeys, setOpenKeys] = useState(defaultOpenKeys);
  useEffect(() => {
    setSelectedKeys(defaultSelectedKeys);
    // setOpenKeys(defaultOpenKeys);
  }, [defaultSelectedKeys])
  const menus = [];
  menus.push(createMenu('home', '首页', 'web-icon-home'));
  const goodsMenuList = [
    { key: 'pms/addGoods', title: '增加商品', icon: 'web-icon-goods-add' },
    { key: 'pms/goods', title: '商品列表', icon: 'web-icon-goods-list' },
  ];
  menus.push(createMenu('pms', '商品', 'web-icon-goods', goodsMenuList));
  const orderMenuList = [
    { key: 'oms/order', title: '订单列表', icon: 'web-icon-goods-list' },
    { key: 'oms/orderSetting', title: '订单设置', icon: 'web-icon-order-setting' },
    { key: 'oms/returnApply', title: '退货申请处理', icon: 'web-icon-order-return' },
    { key: 'oms/returnReason', title: '退货原因设置', icon: 'web-icon-order-return-reason' },
  ];
  menus.push(createMenu('oms', '订单', 'web-icon-order', orderMenuList));
  menus.push(createMenu('sms', '营销', 'web-icon-sms'));
  menus.push(
    <SubMenu
      key="management"
      title={
        <span>
          <Icon type="setting" />
          <span>系统管理</span>
        </span>
      }
    >
      <Menu.Item key="management/m-menu">
        <Icon type="menu" />
        <span>菜单管理</span>
      </Menu.Item>
      <Menu.Item key="management/m-user">
        <Icon type="user" />
        <span>用户管理</span>
      </Menu.Item>
    </SubMenu>
  );

  return (
    <Menu theme="dark" mode="inline"
      defaultSelectedKeys={defaultSelectedKeys}
      selectedKeys={selectedKeys}
      defaultOpenKeys={defaultOpenKeys}
      // openKeys={openKeys}
      onSelect={({ item, key, keyPath, selectedKeys, domEvent }) => {
        onSelect && onSelect({ item, key, keyPath, selectedKeys, domEvent });
      }}>
      {menus}
    </Menu>
  )
}

export default MenuComp;