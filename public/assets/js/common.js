//退出登陆
$('#logout').on('click',function(){
    var isConfirm = confirm('您真的要退出吗?')
    if(isConfirm){
      $.ajax({
        type: 'post',
        url: '/logout',
        success: function(){
          location.href = 'login.html'
        },
        error: function(err){
          alert('退出失败'),
          alert(err)
        }
      })
    }
  })

//左侧边栏 显示与隐藏
var flag = true
$('#listBtn').on('click',function(){   
  if(flag){
    //内容区置左
    $('.main .navbar').css('left',0)
    $('.main').css('padding-left','0px')
    //左侧显示与隐藏
    $('.aside').animate({width:'toggle'},150)
    flag = false
  }else{
    $('.main .navbar').css('left','180px')
    $('.aside').animate({width:'toggle'},150)
    $('.main').css('padding-left','185px')
    flag = true
  }
})


//列表的全选与全不选按钮
$('#selectAll').on('change',function(){
  //全选按钮的状态
  var allStatus = $(this).prop('checked')
  //全选按钮 决定 子按钮的状态
  $('#selectBox').find('input').prop('checked',allStatus)
  //全选按钮决定 批量按钮显示/隐藏
  if(allStatus){
      $('#delMany').show()
  }else{
      $('#delMany').hide()
  }
})
//子按钮决定全选按钮的状态 -- 思路: 将所有按钮的数量 与 选中按钮的数量 进行比较
$('#selectBox').on('change','.selectUser',function(){
  if($('#selectBox').find('input').length == $('#selectBox').find('input').filter(':checked').length){
      //子选项全部选中了
      $('#selectAll').prop('checked',true)
  }else{
      //子选项有的没选中
      $('#selectAll').prop('checked',false)
  }
  //子选项按钮决定 批量按钮显示/隐藏
  if($('#selectBox').find('input').filter(':checked').length > 0){
      $('#delMany').show()
  }else{
      $('#delMany').hide()
  }
})


//处理时间的函数 
function formateDate(date){
  //将日期字符串 转为 日期对象
  date = new Date(date)     // console.log(date);  Wed Jan 05 2022 10:31:00 GMT+0800 (中国标准时间)
  var yyyy = date.getFullYear();//获取当前年份
  var MM = date.getMonth() + 1;//因为getMonth()方法获取的是索引值，获取的月份为0-11，所以要＋1
  var dd = date.getDate();//从 Date 对象返回一个月中的某一天 (1 ~ 31）
  var hh = date.getHours();//返回 Date 对象的小时 (0 ~ 23)
  var mm = date.getMinutes();//返回 Date 对象的分钟 (0 ~ 59)
  MM = checkTime(MM);//调用下面的checkTime函数，设置小于10的时间数字格式，例如5秒显示成05秒
  dd = checkTime(dd);
  hh = checkTime(hh);
  mm = checkTime(mm);
  function checkTime(i) {
      if (i < 10) {
          i = "0" + i;//这里如果是一位数则在前面添加一位0
      }
      return i;
   }
  return yyyy + '-' + MM + '-' + dd
}