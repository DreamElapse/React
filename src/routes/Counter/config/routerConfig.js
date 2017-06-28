/**
 * demo功能路由
 * */
export default {
  counter:{
    key: "counter",
    name: "示例",
    path: "/counter",
    prePath: '',
    child: false
  },
  counterB:{
    key: "counterB",
    name: "示例",
    path: "/counterB",
    prePath: '/counter',
    child: true
  },
  counterC: {
    key: "counterC",
    name: "跳转路径C",
    path: "/counterC",
    prePath: 'counterB',
    child: true
  }
}
