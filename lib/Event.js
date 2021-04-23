/*
 * @Author: zhangyang
 * @Date: 2020-11-12 09:16:00
 * @LastEditTime: 2020-11-12 09:48:39
 * @Description: 事件处理基类(发布订阅)
 */
export default class Event {
  constructor() {
    /**
     * @type {Map} 用于存储事件回调函数
     */
    this.eventMap = new Map();
  }
  /**
   * 事件订阅
   * @param {string} key 事件名
   * @param {function} cbk 事件回调函数
   */
  on(key, cbk) {
    let handlers = this.eventMap.get(key);
    if (!handlers) {
      handlers = [];
    }
    const index = handlers.indexOf(cbk);
    if (index === -1) {
      handlers.push(cbk);
      this.eventMap.set(key, handlers);
    } else {
      console.warn('请勿重复订阅事件');
    }
    
  }
  /**
   * 取消订阅
   * @param {string} key 事件名
   * @param {function} cbk 事件回调函数，为 '*' 时取消事件名对应的所有事件
   */
  off(key, cbk) {
    if (cbk === '*') {
      // 取消该事件的所有订阅
      this.eventMap.delete(key);
    }
    const handlers = this.eventMap.get(key);
    if (!handlers) {
      return;
    }
    if (cbk) {
      const index = handlers.indexOf(cbk);
      index > -1 && handlers.splice(index, 1);
      this.eventMap.set(key, handlers);
    } else {
      this.eventMap.delete(key);
    }
  }
  /**
   * 单次订阅，触发之后立即销毁
   * @param {string} key 事件名
   * @param {function} cbk 回调函数
   */
  once(key, cbk) {
    const fn = (playload) => {
      cbk(playload);
      this.off(key, fn);
    }
    this.on(key, fn);
  }
  /**
   * 清除所有订阅
   */
  clear() {
    this.eventMap.clear();
  }
  /**
   * 触发特定的事件
   * @param {string} key 事件名
   * @param {any} playload 回调函数的参数
   */
  emit(key, playload) {
    const handlers = this.eventMap.get(key);
    if (Array.isArray(handlers)) {
      handlers.forEach((handler) => {
        handler(playload);
      });
    } else if (key !== '') {
      this.broadcast(playload);
    }
  }
  /**
   * 没有对应的事件，广播
   * @param {any} playload 回调函数的参数
   */
  broadcast(playload) {
    for (const key of this.eventMap.keys()) {
      this.emit(key, playload);
    }
  }
}