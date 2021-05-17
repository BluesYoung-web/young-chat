/*
 * @Author: zhangyang
 * @Date: 2020-11-11 16:11:33
 * @LastEditTime: 2020-11-11 18:03:00
 * @Description: uni-app websocket 基类
 */
export default class Socket {
  /**
	 * 构造函数
	 * @param {object} args 
	 * @param {string} args.url websocket服务器地址
	 * @param {object} args.params 预留参数
	 * @param {function} args.onOpen websocket连接正常打开的回调函数
	 * @param {function} args.onMessage 收到消息的回调函数
	 * @param {function} args.onClose websocket连接关闭的回调函数
	 * @param {function} args.onError websocket连接出错的回调函数
	 * @param {function} args.onDisconnect websocket连接失败的回调函数
	 */
  constructor(args) {
    const {
      url,
      params,
      onOpen,
      onMessage,
      onClose,
      onError,
      onDisconnect
    } = args;
    /**
		 * @type {number} 最大重连次数
		 */
		this.maxReConnectNum = params && params.num || 5;
		/**
		 * @type {string} websocket连接的url
		 */
		this.url = url;
		/**
		 * @type {boolean} 连接正常打开的标志
		 */
		this.is_open_socket = false;
		/**
		 * @type {function} 连接正常打开的回调函数
		 */
		this.onOpen = onOpen;
		/**
		 * @type {function} 收到消息的回调函数
		 */
		this.onMessage = onMessage;
		/**
		 * @type {function} 连接关闭的回调函数
		 */
		this.onClose = onClose;
		/**
		 * @type {function} 连接出错的回调函数
		 */
		this.onError = onError;
		/**
		 * @type {function} 连接失败的回调函数
		 */
		this.onDisconnect = onDisconnect;
		/**
		 * @type {boolean} 主动断开标志
		 */ 
    this.do_close = false;
    /**
     * @type {WebSocket} websocket 实例对象
     */
    this.socketTask = null;
    /**
     * @type {array} 待发送的消息队列
     */
    this.msgList = new Set();
  }
  /**
   * 初始化
   * @param {function} suc 初始化完成的回调函数，非必传参数
   */
  init(suc) {
    const self = this;
    const url = this.url;

    this.socketTask = uni.connectSocket({
			url,
			success: () => { }
    });
    /**
     * 事件监听
     */
    this.socketTask.onOpen(() => {
			// 连接正常，改变socket连接标志
      self.is_open_socket = true;
			// 恢复自动重连的次数
		  this.maxReConnectNum = 5;
      // 此时才能正常收发消息
      console.log("websocket连接正常打开中......");
      // 将待发送的消息发出
      self.sendToBeSend();
			if(self.onOpen){
				// 连接建立成功的回调函数
				suc && suc();
				self.onOpen && self.onOpen();
			}
    });

    this.socketTask.onMessage((res) => {
			// 收到消息
			const data = JSON.parse(res.data);
			self.onMessage && self.onMessage(data);
    });

    this.socketTask.onClose((code) => {
			// 连接断开，改变socket连接标志
			self.is_open_socket = false;
			// 如果没有监听关闭事件则自动重连
			if(!self.onClose){
				self.reConnect();
			}else{
        self.onClose && self.onClose(code);
      }
    });
    
    this.socketTask.onError((code) => {
			// 连接错误，改变socket连接标志
      self.is_open_socket = false;
      // 如果没有监听错误事件则自动重连
			if(!self.onError){
				self.reConnect();
			}else{
        self.onError && self.onError(code);
      }
		});
  }
  /**
   * 通过socket连接发送消息
	 * @param {object} msg 消息内容
	 * @param {function} success 发送成功的回调函数
	 * @param {function} fail 发送失败的回调函数
   */
  async send({ msg, success, fail }) {
    const data = JSON.stringify(msg);
    return new Promise((resolve, reject) => {
      if (this.is_open_socket) {
        // 正常连接，可以发消息
        this.socketTask.send({
          data,
          success: (res) => {
            success && success(res);
            resolve(res);
          },
          fail: (err) => {
            this.msgList.add(msg);
            reject(err);
          }
        })
      } else {
        // 未连接，压入消息队列
        this.msgList.add(msg);
      }
    }).catch((err) => {
      fail && fail(err);
    });
  }
	/**
	 * 上传文件
	 */
	async upload({ msg, blob, success, fail}) {
		await this.send({
			msg
		})
		return new Promise((resolve, reject) => {
			if (this.is_open_socket) {
				this.socketTask.send({
					data: blob,
					success: (res) => {
					  success && success(res);
					  resolve(res);
					},
					fail: (err) => {
					  this.msgList.add(msg);
					  reject(err);
					}
				})
			} else{
				console.log('网络错误');
			}
		});
	}
  /**
   * 发送消息队列中未发出的消息
   */
  async sendToBeSend() {
    for await (const msg of this.msgList) {
      this.send({msg});
    }
    this.msgList.clear();
  }
  /**
   * 主动关闭连接
   */
  close() {
    const params = {
      code: 1000,
      reason: 'I want to close socket',
      success: () => {
        console.log("I want to close socket");
      }
    };

    this.socketTask && this.socketTask.close(params);
    this.do_close = true;
  }
  /**
   * 断线重连
   */
  async reConnect() {
		// n s后自动重连
		await this.wait(5);
    // 超过最大重连次数 || 连接正常打开 || 主动断开连接 停止重连
    if (this.maxReConnectNum && !this.is_open_socket && !this.do_close) {
			console.log("断线重连", this.maxReConnectNum);
			this.init();
			this.maxReConnectNum--;
    } else if(!this.is_open_socket && !this.do_close) {
      // 超过最大重连次数
			this.onDisconnect();
    } else {
			null
		}
  }
	/**
	 * 延时
	 */
	async wait(n) {
		return new Promise((resolve) => setTimeout(resolve, n * 1000));
	}
}
