//查询分类列表
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(data){
        var html = template('categoriesTpl',{
            data: data
        })
        $('#category').html(html)
    },
    error: function(err){
        alert('获取分类失败')
        console.log(err.responseText);
    }
})

//设置上传的文章封面
$('#feature').on('change',function(){
    //获取到用户选中的文件
    var formData = new FormData()
    formData.append('cover',this.files[0]) //第一个参数(cover) 是自定义的名称
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,        
        //告诉服务器不要解析请求参数
        processData: false,
        //告诉$.ajax 不要设置请求参数的类型
        contentType: false,
        success: function(data){
            console.log(data);
        }
    })


})


//新增文章
$('#addArticle').on('submit',function(){
    console.log($(this).serialize());

    return false
})