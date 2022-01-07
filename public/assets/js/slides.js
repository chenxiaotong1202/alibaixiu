//获取轮播列表
$.ajax({
    type: 'get',
    url: '/slides',
    success: function(data){
        var html = template('slidesTpl',{
            data: data
        })
        $('#slidesBox').html(html)
    }
})

//删除轮播图
$('#slidesBox').on('click','.del',function(){
    var id = $(this).attr('data-id')
    if(confirm('您确定要删除这个轮播图吗?')){
        $.ajax({
            type: 'delete',
            url: '/slides/'+id,
            success: function(){
                location.reload()
            },
            error: function(err){
                console.log(err.responseText);
            }
        })
    }
})

//图片上传
$('#slidesFile').on('change',function(){
    //创建表单对象
    var formData = new FormData()
    formData.append('slideImg' , this.files[0])

    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        //不要解析请求参数
        processData: false,
        //不要设置请求参数类型
        contentType: false,
        success: function(data){
            //设置上传预览
            $('#slidesPreview').attr('src',data[0].slideImg).show()
            //将图片地址存于 input隐藏域
            $('#slideHidden').val(data[0].slideImg)
        }
    })
})

//添加轮播图
$('#slidesForm').on('submit',function(){
    var formData = $(this).serialize()

    $.ajax({
        type: 'post',
        url: '/slides',
        data: formData,
        success: function(){
            location.reload()
        },
        error: function(err){
            alert('添加失败,请联系管理员!')
        }
    })
    return false
})

