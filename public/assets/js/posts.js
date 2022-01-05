//处理时间的函数  --调用 rTime('2020-06-27T14:20:27.000000Z')
function formateDate(date){
    //将日期字符串 转为 日期对象
    date = new Date(date)
    // console.log(date);  Wed Jan 05 2022 10:31:00 GMT+0800 (中国标准时间)
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
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