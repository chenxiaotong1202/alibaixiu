//获取评论列表数据
$.ajax({
    type: 'get',
    url: '/comments',
    success: function(data){
        // console.log(data);
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

//评论审核状态
$('#commentsBox').on('click','.status',function(){
    var id = $(this).attr('data-id')
    //获取该评论的当前状态
    var statue = $(this).attr('data-status')
    $.ajax({
        type: 'put',
        url: '/comments/' + id,
        data: {
            state: statue == 0 ? 1 : 0 
        },
        success: function(){
            location.reload()
        },
        error: function(err){
            alert('审核失败,请联系管理员!')
            console.log(err.responseText);
        }
    })
})

//删除评论
$('#commentsBox').on('click','.del',function(){
    var id = $(this).siblings().attr('data-id')
   if(confirm('您确定要删除这条评论吗?')){
    $.ajax({
        type: 'delete',
        url: '/comments/' + id,
        success: function(){
            location.reload()
        },
        error: function(err){
            alert('删除失败,请联系管理员!')
            console.log(err.responseText);
        }
    })
   }
})