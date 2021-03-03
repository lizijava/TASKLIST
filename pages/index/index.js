// index.js
// 获取应用实例
Page({
  data:{
    input:'',  //输入的
    todos:[],  //展示的数组
    allCompleted:false,  //控制全选
    leftCount:0,  //控制没完成数目
    logs:[]   //
  },
  save:function() {   //存储
    wx.setStorageSync('todo_list', this.data.todos)
    wx.setStorageSync('todo_logs', this.data.logs)
  },
  load:function(){
    var todos = wx.getStorageSync('todo_list')//拿出来
    if(todos){
      var leftCount = todos.filter(function(item){
        return !item.completed
      }).length
      this.setData({todos:todos, leftCount:leftCount})
    }
    var logs = wx.getStorageSync('todo_logs')
    if(logs) {
      this.setData({ logs:logs})
    }
  },
  onLoad:function(){  //load之后执行
    this.load()
  },
  inputChangeHandle:function(e){
    this.setData({input:e.detail.value})
  },
  addTodoHandle:function(e) {
  if (!this.data.input || !this.data.input.trim()) return   //空时不增加
    var todos = this.data.todos
    todos.push({
      name:this.data.input
    })
    var logs = this.data.logs  //更新记录
    logs.push({timestamp: new Date(), action: '添加', name:this.data.input})
    this.setData({
      input:'',
      todos:todos,
      leftCount:this.data.leftCount + 1,
      logs:logs
  })
  this.save()
  } ,
  toggleTodoHandle:function (e) {
    var index = e.currentTarget.dataset.index  //拿到自定义属性值
    var item = this.data.todos[index]
    item.completed = !item.completed
    var logs = this.data.logs
    logs.push({
      timestamp:new Date(),
      action:item.completed ? '完成' : '重开',
      name:item.name
    })
    this.setData({
      todos:this.data.todos,
      leftCount:this.data.leftCount + (item.completed?-1:1),
      logs:logs
    })
    this.save()
  },
  removeTodoHandle:function(e) {
    var index = e.currentTarget.dataset.index
    var todos = this.data.todos
    var remove = todos.splice(index, 1)[0]
    var logs = this.data.logs
    logs.push({
      timestamp:new Date(),
      action:'删除',
      name:remove.name
    })
    this.setData({
      todos:todos,
      leftCount:this.data.leftCount - (remove.completed?0:1),
      logs:logs
    })
    this.save()
  },
  toggleAllHandle: function (e) {
    this.data.allCompleted = !this.data.allCompleted
    var toggle = this.data.allCompleted
    var todos = this.data.todos
    for (var i = todos.length - 1; i >= 0; i--) {
      todos[i].completed = this.data.allCompleted
    }
    var logs = this.data.logs
    logs.push({
      timestamp:new Date(),
      action:this.data.allCompleted ? '完成' : '重开',
      name:'全部'
    })
    this.setData({
      todos:todos,
      toggle:toggle,
      leftCount:this.data.allCompleted ? 0 : todos.length,
      logs:logs
    })
    this.save()
  },
  clearCompletedHandle:function (e){
    var todos = this.data.todos
    var remains = []
    for (var i=0; i<todos.length; i++){
      todos[i].completed || remains.push(todos[i]) //  真返回第一个值  假返回第二个
    }
    var logs = this.data.logs
    logs.push({
      timestamp:new Date(),
      action:'清空完成',
      name:'完成的任务'
    })
    this.setData({todos:remains})
    this.save()
  }
  
})
