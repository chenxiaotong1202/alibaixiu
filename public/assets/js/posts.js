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