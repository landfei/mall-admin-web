import SysMenuModel from '@/models/SysMenuModel';
import RootActions from '../action';
import { message } from 'antd';


export const ACTION_TYPES = {
  ...RootActions.ACTION_TYPES,
  FETCH_ALL_MENU: 'FETCH_ALL_MENU',
  UPDATE_MENU: 'UPDATE_MENU',
  ADD_MENU: 'ADD_MENU',
  PLUS_MENU: 'PLUS_MENU',
  MODIFY_MENU: 'MODIFY_MENU',
  DELETE_MENU: 'DELETE_MENU'
};

/**
 * 获取全部菜单项目
 *
 */
export async function fetchAllMenu() {
  const model = new SysMenuModel();
  const payload = await model.fetchAllMenu();
  return {
    type: ACTION_TYPES.FETCH_ALL_MENU,
    payload
  }
}

/**
 * 更新菜单信息
 *
 * @param {integer} id 菜单id
 * @param {object} sysMenu 菜单信息
 */
export async function updateMenu(id, sysMenu) {
  const payload = await new SysMenuModel().updateMenu(id, sysMenu);
  return {
    type: ACTION_TYPES.UPDATE_MENU,
    payload
  }
}

/**
 * 删除菜单信息
 *
 * @param {object} menuInfo 菜单信息
 */
export async function deleteMenu(menuInfo) {
  await new SysMenuModel().deleteMenu(menuInfo.id);
  return {
    type: ACTION_TYPES.DELETE_MENU,
    payload: menuInfo
  }
}


/**
 * 删除virtual菜单信息
 *
 * @param {object} menuInfo 菜单信息
 */
export async function deleteVirtualMenu(menuInfo) {
  return {
    type: ACTION_TYPES.DELETE_MENU,
    payload: menuInfo
  }
}

/**
 * 增加菜单信息
 *
 * @param {object} sysMenu 菜单信息
 */
export async function addMenu(sysMenu) {
  const payload = await new SysMenuModel().addMenu(sysMenu);
  message.success('已成功添加菜单');
  return {
    type: ACTION_TYPES.ADD_MENU,
    payload: {
      vId: sysMenu.vId,
      ...payload,
      virtual: 0
    }
  }
}

/**
 * 增加空菜单行
 *
 */
export async function plusMenu(curRecord) {
  return {
    type: ACTION_TYPES.PLUS_MENU,
    payload: {
      ...curRecord
    }
  }
}

/**
 * 临时修改菜单行信息
 *
 */
export async function modifyMenu(curRecord) {
  return {
    type: ACTION_TYPES.MODIFY_MENU,
    payload: {
      ...curRecord
    }
  }
}

export function actions(dispatch, ownProps) {
  const rootActions = RootActions.actions(dispatch, ownProps);

  return {
    ...rootActions,
    fetchAllMenu: async (...args) => {
      dispatch(await fetchAllMenu(...args));
      rootActions.changeLoading(false);
    },
    updateMenu: async (...args) => {
      dispatch(await updateMenu(...args));
      rootActions.changeLoading(false);
    },
    addMenu: async (...args) => {
      dispatch(await addMenu(...args));
      rootActions.changeLoading(false);
    },
    plusMenu: async (...args) => {
      dispatch(await plusMenu(...args));
    },
    modifyMenu: async (...args) => {
      dispatch(await modifyMenu(...args));
    },
    deleteMenu: async (...args) => {
      dispatch(await deleteMenu(...args));
    },
    deleteVirtualMenu: async (...args) => {
      dispatch(await deleteMenu(...args));
    }
  }
}

export default {
  ACTION_TYPES,
}

