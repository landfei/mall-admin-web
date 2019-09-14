import { uniqueId } from 'lodash';
import { ACTION_TYPES as MENU_ACTION_TYPES } from './Menu/action';

const defaultPageable = { total: 0, current: 1, pageSize: 10, list: [] };

export const INIT_STATE = {
  // 菜单列表
  menus: [],
  loading: true
}

function findAndUpdateMenu(menus, payload) {
  const { id, parentId } = payload;
  const retVal = [...menus];
  let foundIndex = findRoot(menus, { id, parentId });
  if (parentId === 0) {
    if (foundIndex !== -1) {
      retVal[foundIndex] = payload;
    }
  } else {
    retVal[foundIndex]
  }
  return retVal;
}

function findRoot(menus, { id, parentId }) {
  let foundIndex = -1;
  let keyId = id;
  if (parentId !== 0) {
    keyId = parentId;
  }
  menus.find((item, index) => {
    if (item.id === keyId) {
      foundIndex = index;
      return true;
    }
    return false;
  })
  return foundIndex;
}

function plusMenu(menus, payload) {
  const { id, parentId } = payload;
  let foundIndex = -1;
  let retVal = [];
  if (parentId === 0) {
    menus.find((menu, index) => {
      if (menu.id === id) {
        foundIndex = index;
        return true;
      }
      return false;
    });
    retVal = menus.slice(0, foundIndex + 1).concat([{
      id: uniqueId('v_'),
      virtual: 1,
      sort: 1,
      icon: 'web-icon-goods',
      parentId
    }]).concat(menus.slice(foundIndex + 1));
  } else {
    retVal = [...menus];
  }
  return retVal;
}

function modifyMenu(menus, payload) {
  const { id, parentId } = payload;
  const retVal = [...menus];
  let foundIndex = findRoot(menus, { id, parentId });
  if (parentId === 0) {
    if (foundIndex !== -1) {
      retVal[foundIndex] = payload;
    }
  } else {
    retVal[foundIndex]
  }
  return retVal;
}

function updateMenu(menus, payload) {
  const { id, parentId } = payload;
  const retVal = [...menus];
  let foundIndex = -1;
  if (parentId === 0) {
    retVal.find((item, index) => {
      if (item.id === id) {
        foundIndex = index;
        return true;
      }
      return false;
    })
    retVal[foundIndex] = payload;
  }
  return retVal;
}

function reducer(state = INIT_STATE, action) {
  const { type, payload } = action;
  const result = { ...state };
  switch (type) {
    case 'SYS_CLEAR':
      result[payload.name] = payload.value;
      break;
    case 'LOADING':
      result.loading = payload;
      break;
    case MENU_ACTION_TYPES.FETCH_ALL_MENU:
      result.menus = Object.values(payload.reduce((p, c, index, array) => {
        if (c.parentId === 0) {
          p[c.id] = c;
          p[c.id].children = [];
        } else if (p[c.parentId]) {
          p[c.parentId].children.push(c);
        }
        return p;
      }, {}));
      result.menus.sort((c, n) => {
        if (c.sort > n.sort) {
          return 1
        }
        return -1;
      });
      break;
    case MENU_ACTION_TYPES.UPDATE_MENU:
      result.menus = updateMenu(result.menus, payload);
      break;
    case MENU_ACTION_TYPES.PLUS_MENU:
      result.menus = plusMenu(result.menus, payload);
      break;
    case MENU_ACTION_TYPES.MODIFY_MENU:
      result.menus = modifyMenu(result.menus, payload);
      break;
    default:
  }
  return result;
}

export default reducer;
