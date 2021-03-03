// logs.js
Page({
  data:{
    logs:[]
  },
  onShow: function(){  //页面show完后执行
    var logs = wx.getStorageSync('todo_logs') //拿出来
    if (logs) {
      this.setData({logs:logs.reverse() }) //展示   
    }
  }
})