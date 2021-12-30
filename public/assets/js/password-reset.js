//修改用户密码
$('#pwdReset').on('submit',function(){
    var formData = $(this).serialize()
    $.ajax({
        type: 'put',
        url: '/users/password',
        data: formData,
        success: function(data){
            $('#errText').html(data.message).show()
            setTimeout(function(){
                location.href = 'login.html' 
            },3000)
        },
        error: function(err){
            //取服务器返回的值
            console.log(err.responseText);
            // console.log(err.responseText.split(":")[1].substr(1,err.responseText.split(":")[1].length - 3))
            var content = err.responseText.split(":")[1].substr(1,err.responseText.split(":")[1].length - 3)
            $('#errText').html(content).show()
        }
    })
    return false
})