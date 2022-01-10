//处理时间的函数 
function formateDate(date){
  //将日期字符串 转为 日期对象
  date = new Date(date)     // console.log(date);  Wed Jan 05 2022 10:31:00 GMT+0800 (中国标准时间)
  var yyyy = date.getFullYear();//获取当前年份
  var MM = date.getMonth() + 1;//因为getMonth()方法获取的是索引值，获取的月份为0-11，所以要＋1
  var dd = date.getDate();//从 Date 对象返回一个月中的某一天 (1 ~ 31）
  var hh = date.getHours();//返回 Date 对象的小时 (0 ~ 23)
  var mm = date.getMinutes();//返回 Date 对象的分钟 (0 ~ 59)
  MM = checkTime(MM);//调用下面的checkTime函数，设置小于10的时间数字格式，例如5秒显示成05秒
  dd = checkTime(dd);
  hh = checkTime(hh);
  mm = checkTime(mm);
  function checkTime(i) {
      if (i < 10) {
          i = "0" + i;//这里如果是一位数则在前面添加一位0
      }
      return i;
   }
  return yyyy + '-' + MM + '-' + dd
};

//获取热门推荐数据
$.ajax({
    type: 'get',
    url: '/posts/recommend',
    success: function(response){
        //因为热门推荐多个地方共用,所以此处用 `` 进行拼接,然后使用 .render方法渲染数据
        var recommendTpl = `
            {{each data}}
            <li>
            <a href="/detail.html?id={{$value._id}}">
                <img src="{{$value.thumbnail}}" alt="">
                <span>{{$value.title}}</span>
            </a>
            </li>
            {{/each}}
        `
        var html = template.render(recommendTpl,{
            data: response
        })
        $('#recommendBox').html(html)
    }
})


//获取分类数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function(data){
      // console.log(data);
      var categoriesTpl = `
        {{each data}}
        <li><a href="list.html?categoriesId={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
        {{/each}}
      `
      var html = template.render(categoriesTpl,{
        data: data
      })
      $('.categoriesBox').html(html)
    }
  })


//设置网站logo
$.ajax({
    type: 'get',
    url: '/settings',
    success: function(data){
      $('.logo img').attr('src' , data.logo)
    }
  })


//获取随机推荐
$.ajax({
  type: 'get',
  url: '/posts/random',
  success: function(data){
    var randomTpl = `
    {{each data}}
      <li>
      <a href="/detail.html?id={{$value._id}}">
        <p class="title">{{$value.title}}</p>
        <p class="reading">阅读({{$value.meta.views}})</p>
        <div class="pic">
          <img src="{{$value.thumbnail}}" alt="">
        </div>
      </a>
      </li>
      {{/each}}
    `
    var html = template.render(randomTpl,{
      data: data
    })
    $('#randomBox').html(html)
  }
})


//获取最新评论
$.ajax({
  type: 'get',
  url: '/comments/lasted',
  success: function(data){
      var discuzTpl = `
      {{each data}}
      <li>
        <a href="/detail.html?id={{$value._id}}">
          <div class="avatar">
            <img src="{{$value.author.avatar}}" alt="">
          </div>
          <div class="txt">
            <p>
              <span>{{$value.author.nickName}}</span>{{$imports.formateDate($value.createAt)}}说:
            </p>
            <p>{{$value.content}}</p>
          </div>
        </a>
      </li>
      {{/each}}
      `

      var html = template.render(discuzTpl,{
          data: data
      })
      $('#discuzBox').html(html)
  }
})

//点击了搜索按钮，将用户输入的数据传递到search页面啊
$('.search form').on('submit',function(){
  var formData = $(this).find('.keys').val()
  location.href = '/search.html?key=' + formData
  return false
})

