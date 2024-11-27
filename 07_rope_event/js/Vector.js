export default class Vector {
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  static add(v1, v2) {
    return new Vector(v1.x + v2.x, v1.y + v2.y);
  }
  static sub(v1, v2) {
    return new Vector(v1.x - v2.x, v1.y - v2.y);
  }

  add(x, y) {
    // 넘겨받는 인자가 1개만있을 수 있기때문에, 변수 차단을 위해 인자 1개 받을때와 2개받을때 분기처리
    // 인자를 1개만 받을때,
    if (arguments.length === 1) {
      this.x += x.x;
      this.y += x.y;
    }
    // 인자를 2개 받을때,
    else if (arguments.length === 2) {
      this.x += x;
      this.y += y;
    }
    return this;
  }

  sub(x, y) {
    // 넘겨받는 인자가 1개만있을 수 있기때문에, 변수 차단을 위해 인자 1개 받을때와 2개받을때 분기처리
    // 인자를 1개만 받을때,
    if (arguments.length === 1) {
      this.x -= x.x;
      this.y -= x.y;
    }
    // 인자를 2개 받을때,
    else if (arguments.length === 2) {
      this.x -= x;
      this.y -= y;
    }
    return this;
  }
}
