export default class Pubsub {
  constructor() {
    this.events = {};
  }

  //   이벤트 등록
  subscribe(event, callback) {
    const self = this;

    if (!self.events.hasOwnProperty(event)) {
      self.events[event] = [];
    }

    self.events[event].push(callback);
  }

  //   이벤트 실행
  publish(event, data = {}) {
    const self = this;

    if (!self.events.hasOwnProperty(event)) {
      return [];
    }

    return self.events[event].map(callback => callback(data));
  }
}
