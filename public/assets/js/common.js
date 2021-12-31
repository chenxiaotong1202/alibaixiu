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