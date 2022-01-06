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


//渲染所有文章列表数据
$.ajax({
    type: 'get',
    url: '/posts',
    success: function(data){
        // console.log(data);
        var html = template('postsTpl',{data: data})
        $('#postsBox').html(html)
        var html = template('pageTpl', data )
        $('#pageBox').html(html)
    }
})

//点击分页按钮
function changePage(page){
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: page
        },
        success: function(data){
            // console.log(data);
            var html = template('postsTpl',{data: data})
            $('#postsBox').html(html)
            var html = template('pageTpl', data )
            $('#pageBox').html(html)
        }
    })
}

//查询所有分类列表 -- 下拉筛选项
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(data){
        var html = template('categoriesTpl',{
            data: data
        })
        $('#categoriesBox').html(html)
    },
    error: function(err){
        alert('获取分类失败')
        console.log(err.responseText);
    }
})

//选择条件(分类 / 状态) 进行筛选
$('#filterFrom').on('submit',function(){
    var formData = $(this).serialize()
    $.ajax({
        type: 'get',
        url: '/posts',
        data: formData,
        success: function(data){
            var html = template('postsTpl',{data: data})
            $('#postsBox').html(html)
            var html = template('pageTpl', data )
            $('#pageBox').html(html)
        }
    })
    return false
})

//删除文章
$('#postsBox').on('click', '.del',function(){
    var id = $(this).attr('data-id')
    if(confirm('您确定要删除这篇文章吗?')){
        $.ajax({
            type: 'delete',
            url: '/posts/' + id,
            success: function(){
                location.reload()
            },
            error: function(err){
                console.log(err)
            }
        })
    }
})