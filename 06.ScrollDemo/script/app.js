function log(desc, value) {

  // console.log(desc + ':' + value);

}

var Slide = (function() {

  function Slide() {

    var scope = this;
    var current = 0;

    this.slide = $('.slide-item');

    this.hide = function(index) {
      log('hide', index)
      scope.slide.eq(index).animate({
        opacity: 0
      }, 'slow')
    }

    this.show = function(index) {
      log('show', index)
      scope.slide.eq(index).animate({
        opacity: 1
      }, 'slow')
    }

    this.play = function() {

      setInterval(function() {

        scope.show(current);
        scope.hide(current - 1 < 0 ? 3 : current - 1);
        current = current + 1;

        if (current === scope.slide.length) {
          current = 0;
        }

      }, 2000);
    };

    this.play();
  }

  return Slide;
})()

var ScrollManage = (function() {

  function ScrollManage() {

    var scope = this;
    var tiny = 0;
    var i = 0;
    var dis = 5;

    //获取滚轮
    this._getPageScroll = function() {

      var xScroll, yScroll;

      if (self.pageYOffset) {

        yScroll = self.pageYOffset;
        xScroll = self.pageXOffset;

      } else if (document.documentElement && document.documentElement.scrollTop) { // Explorer 6 Strict

        yScroll = document.documentElement.scrollTop;
        xScroll = document.documentElement.scrollLeft;

      } else if (document.body) { // all other Explorers

        yScroll = document.body.scrollTop;
        xScroll = document.body.scrollLeft;

      }

      var arrayPageScroll = new Array(xScroll, yScroll);

      return arrayPageScroll;
    };
    //视差动画
    this._moveSection = function() {
      var scrollTop = scope._getPageScroll()[1];
      var distceTop = $('.section2').css('top');

      $('.section1').css({
        top: scrollTop / 8
      })

      $('.section2').css({
        top: distceTop - scrollTop / 10
      })

      if (scrollTop - tiny > dis) {
        tiny = scrollTop;
        i = i++ == 20 ? 1 : i++;
        log('正着转', i)
        $('#earth').attr('src', 'https://d3lqgdpixgbyis.cloudfront.net/static/home_page/assets/earth-png/a' + i + '.png')
      }

      if (scrollTop - tiny < 0 - dis) {
        tiny = scrollTop;
        i = i-- == 1 ? 20 : i--;
        $('#earth').attr('src', 'https://d3lqgdpixgbyis.cloudfront.net/static/home_page/assets/earth-png/a' + i + '.png')
        log('反着转', i)
      }

    };
    //滚轮处理
    this._scrollFunc = function(event) {
      var direct = 0;

      event = event || window.event;
      if (event.wheelDelta >= 0) {

        log('向上滚动', scope._getPageScroll()[1] + 'px');

      } else {

        log('向下滚动', scope._getPageScroll()[1] + 'px');
      }
      scope._moveSection();
    };
    //事件绑定
    this._bindScrollEvent = function() {

      if (document.addEventListener) {
        document.addEventListener('DOMMouseScroll', scope._scrollFunc, false);
      } //W3C

      window.onmousewheel = document.onmousewheel = scope._scrollFunc; //IE/Opera/Chrome

    };

    this._bindScrollEvent();
  }

  return ScrollManage;
})()

function preLoadImg(){
  var html = '';
  for (var i = 1; i < 21; i++) {
    html += '<img id="earth" src="https://d3lqgdpixgbyis.cloudfront.net/static/home_page/assets/earth-png/a' + i + '.png" alt="">';
  }
  $('.sectionN').html(html).css({
    position: 'absolute',
    left: '-10000px'
  });
}

$(function() {

  var scrll = new ScrollManage();
  var slide = new Slide();

  preLoadImg();
})
