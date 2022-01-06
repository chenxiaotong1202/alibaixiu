//获取评论列表数据
$.ajax({
    type: 'get',
    url: '/comments',
    success: function(data){
        console.log(data);
        //渲染评论列表数据
        var html = template('commentsTpl',{
            data: data
        })
        $('#commentsBox').html(html)
        //渲染分页数据
        var page = template('pageTpl',data)
        $('#pageBox').html(page)
    }
})

//点击了分页按钮
function changePage(page){
    $.ajax({
        type: 'get',
        url: '/comments',
        data: {
            page: page
        },
        success: function(data){
            //渲染评论列表数据
            var html = template('commentsTpl',{
                data: data
            })
            $('#commentsBox').html(html)
            //渲染分页数据
            var page = template('pageTpl',data)
            $('#pageBox').html(page)
        }
    })
}