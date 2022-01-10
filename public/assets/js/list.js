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


//获取地址栏中的分类id
var categoryId = getUrlParams('categoriesId')

//查询对应的分类文章
$.ajax({
    type: 'get',
    url: '/posts/category/' + categoryId,
    success: function(data){
        // console.log(data);
        var html = template('listTpl',{
            data: data
        })
        $('#listBox').html(html)
    }
})

//查询分类名
$.ajax({
    type: 'get',
    url: '/categories/'+categoryId,
    success: function(data){
        $('.panel h3').html(data.title)
    }
})

//点赞文章
$('#listBox').on('click','.like',function(){
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

