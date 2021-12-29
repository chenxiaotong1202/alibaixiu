//新增用户信息
$('#userForm').on('submit',function(){
    //获取用户输入的值
    var formData = $(this).serialize()
    //发请求
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function(data){
            console.log(data);
            location.href = 'users.html'
        },
        error: function(err){
            alert('添加失败')
            console.log(err);
        }
    })
    //阻止表单默认行为
    return false;
})

//上传头像(触发机制都是使用了‘事件委托’,因为涉及到二次编辑操作)
$('#modifyBox').on('change','#avatar',function(){
    //用户选中的文件 console.log(this.files[0]);
    //创建二进制对象实现文件上传
    var formData = new FormData()
    formData.append('avatar',this.files[0]) //此处append('自定义属性名称',用户选择的文件);

    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        //告诉服务器不要解析请求参数
        processData: false,
        //告诉$.ajax 不要设置请求参数的类型
        contentType: false,
        success: function(data){
            //图片预览
            $('#preview').attr('src',data[0].avatar)
            //将图片地址存至隐藏域,以便于提交到服务器
            $('#hiddenAvatar').val(data[0].avatar)
        },
        error: function(err){
            alert('上传失败')
           console.log(err);
        }
    })
})

//用户列表数据
$.ajax({
    type: 'get',
    url:'/users',
    success: function(data){
        //数据拼接
        var html = template('userTpl',{
            data: data
        })
        // 渲染页面
        $('#userBox').html(html)
    }
})

//渲染被点击的修改用户数据
$('#userBox').on('click','.edit',function(){
    //获取用户点击了编辑的那个的id
    var id = $(this).attr('data-id')
    $.ajax({
        type: 'get',
        url: '/users/' + id, // 接口/users/:id
        success: function(data){
            // console.log(data);
            var html = template('modifyTpl' , data)
            $('#modifyBox').html(html)
        }
    })
})

//提交修改用户信息
$('#modifyBox').on('submit', '#modifyForm' ,function(){
    var formData = $(this).serialize()
    var id = $(this).attr('data-id')

    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formData,
        success: function(data){
            // console.log(data);
            location.reload()
        },
        error: function(err){
            console.log(err);
            alert('修改失败')
        }
    })

    //阻止表单默认提交行为
    return false;
})