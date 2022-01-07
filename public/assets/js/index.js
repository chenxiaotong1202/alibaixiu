//查询文章数量
$.ajax({
    type: 'get',
    url: '/posts/count',
    success: function(data){
        $('#postCount').html(data.postCount)
        $('#draftCount').html(data.draftCount)
    }
})

//查询分类数量
$.ajax({
    type: 'get',
    url: '/categories/count',
    success: function(data){
        $('#categoryCount').html(data.categoryCount)
    }
})

//查询评论数量
$.ajax({
    type: 'get',
    url: '/comments/count',
    success: function(data){
        $('#commentCount').html(data.commentCount)
    }
})

//查询未审核评论数量
$.ajax({
    type: 'get',
    url: '/comments',
    success: function(data){
       var statueAll = []
       for(var i = 0; i<data.records.length ;i ++){
            statueAll.push(data.records[i].state)  //返回 状态是0和1 到数组里面
       }
       //筛选状态是0 (未审核评论的数量)
       var statue = statueAll.filter((item,index)=>{
            return item == 0    
       })
       $('#statue').html(statue.length)
    }
})



