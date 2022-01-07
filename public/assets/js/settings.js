//上传网站logo
$('#logoFile').on('change',function(){
    var formData = new FormData()
    formData.append('logoImg',this.files[0])

    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        //不要解析请求参数
        processData: false,
        //不要设置请求参数类型
        contentType: false,
        success: function(data){
            console.log(data);
            $('#logo').attr('src' , data[0].logoImg)
            $('#logoHidden').val(data[0].logoImg)
        }
    })
})

//设置网站配置
$('#settingsForm').on('submit',function(){
    var formData = $(this).serialize()
    console.log(formData);
    $.ajax({
        type: 'post',
        url: '/settings',
        data: formData,
        success: function(){
            location.reload()
        },
        error: function(){
            alert('设置失败,请联系管理员!')
        }
    })
    return false
})


//获取网站设置
$.ajax({
    type: 'get',
    url: '/settings',
    success: function(data){
        if(data){
            //将logo地址存在隐藏域中,如果没有修改原有logo时,此处图片就不会丢失
            $('#logoHidden').val(data.logo)
            //设置其他参数展示
            $('#logo').attr('src',data.logo)
            $('#title').val(data.title)
            $('#commentCheckBox').attr('checked',data.comment)
            $('#reviewCheckBox').attr('checked',data.review)
        }
    }
})

