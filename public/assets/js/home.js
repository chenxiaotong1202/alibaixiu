//请求轮播图数据
$.ajax({
    type: 'get',
    url:'/slides',
    success: function(data){
        var html = template('slideTpl',{
            data
        })
        console.log(data);
        $('#slideBox').html(html)

        //控制轮播右下角的点
        for(var i =0;i< data.length;i++){
            $("<span></span>").appendTo($('.cursor'))
        }
        //首次加载选中第一个圆点
        $(".cursor span:first").addClass("active");
       

        //控制轮播的js
        var swiper = Swipe(document.querySelector('.swipe'), {
            auto: 3000,
            transitionEnd: function (index) {
              // index++;
              console.log(index);
              $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
            }
          });
      
          // 上/下一张
          $('.swipe .arrow').on('click', function () {
            var _this = $(this);
      
            if(_this.is('.prev')) {
              swiper.prev();
            } else if(_this.is('.next')) {
              swiper.next();
            }
          })
    }
})