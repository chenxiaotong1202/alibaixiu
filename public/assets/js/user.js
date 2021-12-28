//新增用户信息
$('#userForm').on('submit',function(){
    //获取用户输入的值
    var formData = $(this).serialize()
    //发请求
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function(){
            location.href = 'users.html'
        },
        error: function(){
            alert('添加失败')
        }
    })

    //阻止表单默认行为
    return false;

})