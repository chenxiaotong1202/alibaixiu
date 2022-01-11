//封装函数--用于解析地址栏中传递过来的参数
function getUrlParams(name){
    var paramsAry = location.search.substr(1).split('&')  //输出 ['id=61d5031dbc944a08e59161bf', 'age=20']
    //循环之后,再与传入的参数进行对比
    for(var i = 0; i < paramsAry.length; i++){
        var tmp = paramsAry[i].split('=')   //输出 ['id', '61d5031dbc944a08e59161bf']  ['age', '20']
        if(tmp[0] == name) {
            return tmp[1]
        }
    }
    //传入的参数与地址栏不一致 返回-1
    return -1
}


//获取地址栏中用户输入的key
var key = getUrlParams('key')
//查询文章
$.ajax({
    type: 'get',
    url: '/posts/search/' + key,
    success: function(data){
    //   console.log(data)
      var html = template('searchTpl',{
          data: data
      })
      $('#searchBox').html(html)
    }
  })
  
//点赞文章
$('#searchBox').on('click','.like',function(){
    var id = $(this).attr('data-id')
    $.ajax({
      type: 'post',
      url: '/posts/fabulous/' + id ,
      success: function(data){
        alert('点赞成功!')
        location.reload()
      }
    })
})