//新增用户信息
$('#userForm').on('submit',function(){
    //获取用户输入的值
    var formData = $(this).serialize()
    // 发请求
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function(data){
            // console.log(data);
            location.href = 'users.html'
        },
        error: function(err){
            var obj = err.responseText
            //拿到返回值的后面部分 obj.split(':')[1]  服务器返回: "用户名不符合验证规则"}
            var obj1 = obj.split(':')[1]
            //截取字符串  .substr(start,length)
            var obj2 = obj1.substr(1,obj1.length - 3)
            $('#errorText').show()
            $('#errorText').html(obj2)
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
        $('#selectBox').html(html)
    }
})

//渲染被点击的修改用户数据
$('#selectBox').on('click','.edit',function(){
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

//删除用户信息
$('#selectBox').on('click','.del',function(){
    var id = $(this).siblings().attr('data-id')
    var isDel = confirm('您确定要删除吗?')
    if(isDel){
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function(){
                location.reload()
            },
            error: function(err){
                alert('删除失败!')
            }
        })
    }
})

// ------以下这部分代码已经挪到commongo.js中复用了------
// //全选与全不选按钮
// $('#selectAll').on('change',function(){
//     //全选按钮的状态
//     var allStatus = $(this).prop('checked')
//     //全选按钮 决定 子按钮的状态
//     $('#selectBox').find('input').prop('checked',allStatus)
//     //全选按钮决定 批量按钮显示/隐藏
//     if(allStatus){
//         $('#delMany').show()
//     }else{
//         $('#delMany').hide()
//     }
// })
// //子按钮决定全选按钮的状态 -- 思路: 将所有按钮的数量 与 选中按钮的数量 进行比较
// $('#selectBox').on('change','.selectUser',function(){
//     if($('#selectBox').find('input').length == $('#selectBox').find('input').filter(':checked').length){
//         //子选项全部选中了
//         $('#selectAll').prop('checked',true)
//     }else{
//         //子选项有的没选中
//         $('#selectAll').prop('checked',false)
//     }
//     //子选项按钮决定 批量按钮显示/隐藏
//     if($('#selectBox').find('input').filter(':checked').length > 0){
//         $('#delMany').show()
//     }else{
//         $('#delMany').hide()
//     }
// })

//批量删除
$('#delMany').on('click',function(){
    var ids = []
    $('#selectBox').find('input').filter(':checked').each(function(i,ele){
        //把当前的遍历项转为jq对象 $(ele)
        ids.push($(ele).attr('data-id'))
    })
    //发请求
    if(confirm("您确定要删除选中的这些用户信息吗？")){
        $.ajax({
            type: 'delete',
            url: '/users/' + ids.join('-'),
            success: function(){
                location.reload()
            },
            error:function(){
                alert('批量删除失败！')
            }
        })
    }
})


