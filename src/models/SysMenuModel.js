import AbstractModel from "./AbstractModel";

class SysMenuModel extends AbstractModel {
  async fetchAllMenu() {
    const result = await super.get('/api/sys/menu');
    return result.data;
  }

  /**
   * 更新菜单信息
   *
   * @param {integer} id 菜单id
   * @param {object} sysMenu 菜单信息
   */
  async updateMenu(id, sysMenu) {
    const result = await super.put('/api/sys/menu', {
      ...sysMenu,
      id
    });
    return result.data;
  }

  /**
   * 更新菜单信息
   *
   * @param {object} sysMenu 菜单信息
   */
  async addMenu(sysMenu) {
    const result = await super.post('/api/sys/menu', {
      ...sysMenu
    });
    return result.data;
  }

  /**
   * 删除菜单信息
   *
   * @param {number} id 菜单信息
   */
  async deleteMenu(id) {
    const result = await super.delete('/api/sys/menu', id);
    return result.data;
  }
}

export default SysMenuModel;
