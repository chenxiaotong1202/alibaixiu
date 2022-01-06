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
$('#modifyArticleBox').on('change','#feature',function(){
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
            var picPath = data[0].cover
            $('#thumbnail img').attr('src' , picPath).show()
            $('#hiddenPic').val(picPath)
        }
    })
})


//新增文章
$('#addArticle').on('submit',function(){
    var formData = $(this).serialize()
    $.ajax({
        type: 'post',
        url: '/posts',
        data: formData,
        success: function(data){
            location.href = '/admin/posts.html'
        },
        error: function(err){
            console.log(err);
        }
    })
    return false
})


//渲染修改文章数据
//获取地址栏中传递过来的参数
var articleId = getUrlParams('id')
if(articleId != -1){
    //管理员当前进行文章修改操作

    //渲染要修改的数据
    $.ajax({
        type: 'get',
        url: '/posts/' + articleId,
        success: function(data){
            //查询分类列表
            $.ajax({
                type: 'get',
                url: '/categories',
                success: function(categories){
                    //将分类数据追加到data对象中
                    data.categories = categories
                    //查询完分类后再渲染页面数据
                    var html = template('modifyArticleTpl' , data)
                    $('#modifyArticleBox').html(html)
                },
                error: function(err){
                    alert('获取分类失败')
                    console.log(err.responseText);
                }
            })

        }
    })
    //提交修改文章操作
    $('#modifyArticleBox').on('submit','#addArticle',function(){
        var formData = $(this).serialize()
        $.ajax({
            type: 'put',
            url: '/posts/' + articleId,
            data: formData,
            success: function(data){
                location.href = '/admin/posts.html'
            }
        })

        return false;
    })


}



