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



//获取地址栏中的文章id
var id = getUrlParams('id')

$.ajax({
    type: 'get',
    url: '/posts/' + id,
    success: function(data){
        // console.log(data);
        var html = template('detailTpl',data)
        $('#detailBox').html(html)
    }
})

//点赞文章
$('#detailBox').on('click','.like',function(){
    $.ajax({
      type: 'post',
      url: '/posts/fabulous/' + id ,
      success: function(data){
        alert('点赞成功!')
        location.reload()
      }
    })
})

//评论文章功能
//获取评论是否需要人工审核的状态(未赋值)
var review;
//获取网站的配置信息
$.ajax({
    type: 'get',
    url: '/settings',
    success: function(data){
        //获取网站是否开启了评论功能
        if(data.comment){
            //渲染评论输入框
            var html = template('commentTpl')
            $('#commentBox').html(html)
            //获取后台评论是否开启的状态
            review = data.review
        }
    }
})

//创建评论
$('#commentBox').on('submit','.comment',function(){
    var state;
    //获取评论内容
    var textData = $(this).find('textarea').val()
    // 评论是否需要人工审核
    if(review){
        //已开启评论审核
        state = 0
    }else{
        //未开启评论审核(无需审核)
        state = 1
    }

    if(textData){
        $.ajax({
            type: 'post',
            url: '/comments',
            data: {
                content: textData,
                post: id,
                state: state
            },
            success: function(data){
                location.reload()
            }
        })    
    }else{
        alert('请输入评论内容!')
    }

    return false;
})


