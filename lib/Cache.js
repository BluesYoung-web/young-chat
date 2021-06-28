/*
 * @Author: zhangyang
 * @Date: 2020-11-11 13:43:44
 * @LastEditTime: 2020-11-13 16:15:19
 * @Description: uni-app 基础缓存类
 */
import { isJsonStr } from '@/util/valid';
export default class Cache {
  /**
   * 存储类（暂存于缓存）
   * @param {string} name 命名空间
   * @param {string} prefix 存储前缀
   */
  constructor(name, prefix) {
    this.prefix = `${name}.${prefix}`;
    this.data = new Map();
  }
  /**
   * 获取
   * @param {string} key 键名
   */
  async get(key) {
    let data = this.data.get(`${this.prefix}.${key}`) || false;
    return new Promise((resolve, reject) => {
      if (data === false) {
        uni.getStorage({
          key: `${this.prefix}.${key}`,
          success: (res) => {
            if (isJsonStr(res.data)) {
              data = JSON.parse(res.data);
              this.data.set(`${this.prefix}.${key}`, data);
              resolve(data);
            } else {
              reject(false);
            }
          },
          fail: () => reject(false)
        })
      } else {
        resolve(data);
      }
    }).catch(() => (null));
  }
  /**
   * 设置
   * @param {string} key 键名
   * @param {object} data 兼职
   */
  async set(key, data) {
    return new Promise((resolve, reject) => {
      uni.setStorage({
        key: `${this.prefix}.${key}`,
        data: JSON.stringify(data),
        success: () => {
          this.data.set(`${this.prefix}.${key}`, data);
          resolve(true);
        },
        fail: () => reject(false)
      })
    });
  }
  /**
   * 删除特定的键
   * @param {string} key 键名
   */
  del(key) {
    return new Promise((resolve, reject) => {
      uni.removeStorage({
        key: `${this.prefix}.${key}`,
        success: () => {
          this.data.delete(`${this.prefix}.${key}`);
          resolve(true);
        },
        fail: () => reject(false)
      })
    })
  }
  /**
   * 清空存储
   */
  async clear() {
    for await (const key of this.data.keys()) {
      this.del(key);
    }
    this.data.clear();
  }
}