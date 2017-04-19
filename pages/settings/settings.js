// pages/settings/settings.js
//获取应用实例
var app = getApp()
Page({
  data:{
    userInfo: {},
    employeeId: '',
    inputStatus: false,
    languages: ["简体中文", "English", "日本語"], // "繁体中文", "日本語" may be supported in the future
    index: 0,                                    // current default selected item
    UI: [ 
      {title: "设置", language: "选择语言", currentLan: "当前选择", employeeIdTitle: "雇员编号", currentId: "如有疑问请联系人事部门", employeeId: 'EMP10086RD', save: "保存"},
      {title: "Settings", language: "Change Language", currentLan: "Current", employeeIdTitle: "Employee ID", currentId: "Contact HR Dept.", employeeId: 'EMP10086RD', save: "Save Changes"},
      {title: "設定", language: "言語変更", currentLan: "選択項目", employeeIdTitle: "社員番号", currentId: "人事部に連絡してください.", employeeId: 'EMP10086RD', save: "保存"}
      ]
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
    
    //储存用户对语言的选择
    try {
      wx.setStorageSync('selectedLanguage', e.detail.value);
      app.globalData.settings.language = e.detail.value; //setting global value for app language
    } catch (e) {    
      console.log('储存用户语言选择失败！');
    }
  },
  onLoad:function(options){
    // 设置app语言的全局变量
    var selectedLanguage = app.globalData.settings.language;
    var employeeId = app.globalData.settings.employeeId;
    if(employeeId !== null){
      status = true 
    }
    this.setData({      
      index: selectedLanguage,
      employeeId: employeeId,
      inputStatus: status    
    })
  },
  onShow:function(){
    // 页面显示
    var that = this
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {        
        that.setData({
          userInfo: res.data
        })
      }


    })
  },
  bindKeyInput: function (e) {
    this.setData({
      employeeId: e.detail.value
    })
  },
  save:function(){
    var selectedLanguage = app.globalData.settings.language;
    var title = ["已保存", "Saved", "保存完了"][selectedLanguage];
    wx.setStorageSync('employeeId', this.data.employeeId);
    app.globalData.settings.employeeId = this.data.employeeId;
    wx.showToast({      
      title: title,
      icon: "success",
      duration: 1500
    })
    // 更新视图
    this.setData({
      inputStatus: true,
      employeeId: this.data.employeeId
    })
  },
  onUnload:function(){
    // 页面关闭
  }
})