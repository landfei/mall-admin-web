import AbstractModel from "./AbstractModel";

class CmsModel extends AbstractModel {
  /**
   * 获取所有商品优选
   */
  async fetchAllPrefrenceArea() {
    const result = await super.get('/api/prefrenceArea');
    return result.data;
  };

  /**
   * 获取全部商品专题
   */
  async fetchAllSubject() {
    const result = await super.get('/api/subject');
    return result.data;
  };
}

export default CmsModel;
