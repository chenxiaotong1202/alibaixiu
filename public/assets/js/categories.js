//添加分类
$('#categoriesFrom').on('submit',function(){
    var formData = $(this).serialize()
    $.ajax({
        type: 'post',
        url: '/categories',
        data: formData,
        success: function(data){
            location.reload()
        },
        error: function(err){
            //取服务器返回的值
            console.log(err.responseText);
            var content = err.responseText.split(":")[1].substr(1,err.responseText.split(":")[1].length - 3)
            $('#errContent').css('display' , 'block').html(content)
        }
    })
    return false;
})

//渲染分类列表
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(data){
        var html = template('categoriesTpl', {
            data: data
        })
        $('#selectBox').html(html)
    },
    error: function(err){
        console.log(err.responseText);
    }
})

//渲染编辑分类数据
$('#selectBox').on('click','.edit',function(){
    var id = $(this).attr('data-id')
    $.ajax({
        type: 'get',
        url: '/categories/' + id ,
        success: function(data){
            // console.log(data);
            var html = template('modifyCategoriesTpl', data)
            $('#modifyBox').html(html)
        }
    })
})

//点击修改分类信息
$('#modifyBox').on('submit','#categoriesFrom',function(){
    var id = $(this).attr('data-id')
    var formData = $(this).serialize()

    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: formData,
        success: function(){
            location.reload()
        },
        error: function(err){
            console.log(err.responseText)
        }
    })
    return false;
})

//删除分类
$('#selectBox').on('click','.del',function(){
    var id = $(this).siblings().attr('data-id')
    if(confirm('您确定要删除这个分类吗?')){
        $.ajax({
            type: 'delete',
            url: '/categories/' + id ,
            success: function(data){
                location.reload()
            }
        })
    }  
})

//批量删除
$('#delMany').on('click',function(){
    var ids = []
    $('#selectBox').find('input').filter(':checked').each(function(i,e){
        ids.push($(e).attr('data-id'))
    })
    ids = ids.join('-')
    if(confirm('您确定要批量删除这些分类吗?')){
        $.ajax({
            type: 'delete',
            url: '/categories/' + ids,
            success: function(){
                location.reload()
            },
            error: function(err){
                console.log(err.responseText)
            }
        })
    }
})