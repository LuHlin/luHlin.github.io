window.onload = function () {
  //秒杀计时器
  searchEffect();
  timeBack();
  bannerEffect();
}
/*头部的js效果*/
function searchEffect() {
  //获取banner高度
  var jd_banner = document.querySelector(".jd_banner");
  var jd_bannerH = jd_banner.offsetHeight;
  // console.log(jd_bannerH);

  var jd_hearder = document.querySelector(".jd_hearder");
  // console.log(jd_hearder);
  //获取页面滚动出去的高度
  window.onscroll = function () {
    var offsetTop = document.documentElement.scrollTop + document.body.scrollTop;
    // console.log(offsetTop);
    //判断是否在轮播图内，如在则改变透明度
    var jd_rgba = 0;
    if (offsetTop < jd_bannerH) {
      jd_rgba = offsetTop / jd_bannerH;
      jd_hearder.style.backgroundColor = "rgba(223,35,34," + jd_rgba + ")";
    }
  }
}
/*倒计时效果*/
function timeBack() {
  //获取需要改变得span
  var span = document.querySelector(".tTime").querySelectorAll("span");
  // 定义要倒数的初始时间
  var tatolTime = 3666;
  //设置定时器
  var timer = setInterval(function () {
    tatolTime--;
    if (tatolTime < 0) {
      clearInterval(timer);
      return;
    }
    var hour = tatolTime / 3600;
    var minute = Math.floor(tatolTime % 3600 / 60);
    var second = Math.floor(tatolTime % 60);
    //为每个span赋值
    span[0].innerHTML = Math.floor(hour / 10);
    span[1].innerHTML = Math.floor(hour % 10);

    span[3].innerHTML = Math.floor(minute / 10);
    span[4].innerHTML = Math.floor(minute % 10);

    span[6].innerHTML = Math.floor(second / 10);
    span[7].innerHTML = Math.floor(second % 10);

  }, 1000);
}

  

//轮播图
function bannerEffect() {
  var banner = document.querySelector(".jd_banner");
  var imgBox = banner.querySelector("ul:first-of-type");
  // console.log(imgBox);
  //获取第一张图片
  var first = imgBox.querySelector("li:first-of-type");
  //获取第最后一张图片
  var last = imgBox.querySelector("li:last-of-type");
  // console.log(last);
  imgBox.appendChild(first.cloneNode(true));
  imgBox.insertBefore(last.cloneNode(true), imgBox.firstChild);
  //获取所有的li
  var lis = imgBox.querySelectorAll("li");
  //获取lis的长度
  var count = lis.length;
  //获取banner宽度
  var bannerWidth = banner.offsetWidth;
  //设置图片盒子的宽度
  imgBox.style.width = count * bannerWidth + "px";
  //设置每个li的宽度
  for (var i = 0; i < lis.length; i++) {
    lis[i].style.width = bannerWidth + "px";
  }
  /*定义图片索引:图片已经有一个宽度的默认偏移*/
  var index = 1;
  
  /*3.设置默认的偏移*/
  imgBox.style.left = -bannerWidth + "px";
  //当屏幕变化时根据设备宽度设置轮播图的宽
  window.onresize = function () {
    bannerWidth = banner.offsetWidth;
    imgBox.style.width = count * bannerWidth + "px";
    for (var i = 0; i < lis.length; i++) {
      lis[i].style.width = bannerWidth + "px";
    }
    //重新设定定位值
    imgBox.style.left = -index*bannerWidth + "px";
  }

  
  //自动轮播
  var timer;
  var starTimer = function () {
      timer = setInterval(function () {
      index++;
        imgBox.style.transition = "left 0.5s ease-in-out";
      imgBox.style.left = -index * bannerWidth + "px";
        setTimeout(function () {
        if(index == count - 1){
          index = 1 ;
          imgBox.style.transition = "none";
          imgBox.style.left = - index* bannerWidth + "px"; 
        }
      }, 1000);
    },2000)
  }
  starTimer();
   //设置标记
  var setIndicator = function (index) {
    var indicator = banner.querySelector("ul:last-of-type").querySelectorAll("li");
    for (var i = 0; i < indicator.length; i++) {
      indicator[i].classList.remove("active");
    }
    indicator[index - 1].classList.add("active");
  }
  //手动轮播
  var starX,moveX,distanceX;
  var flag = true;
  imgBox.addEventListener("touchstart",function (e) {
     clearInterval(timer);
     starX = e.targetTouches[0].clientX;
    //  console.log(starX);
  });
  imgBox.addEventListener("touchmove",function (e) {
    event.preventDefault();
    if(flag == true){
      var moveX = e.targetTouches[0].clientX;
      distanceX = moveX - starX;
      imgBox.style.transition = "none";
      imgBox.style.left = (- index * bannerWidth + distanceX) + "px";
    }
  });
  imgBox.addEventListener("touchend",function (e) {
    flag = false;
    starTimer();
      if (Math.abs(distanceX) > 100) {
        if (distanceX > 0) {
          index--;
        } else {
          index++;
        }
        imgBox.style.transition = "left 0.5s ease-in-out";
        imgBox.style.left = (- index * bannerWidth) + "px";
      }
      else if (Math.abs(distanceX) > 0) {
        imgBox.style.transition = "left 0.5s ease-in-out";
        imgBox.style.left = (- index * bannerWidth) + "px";
      }
    
    startX = 0;
    moveX= 0 ;
    distanceX = 0;
  })
   /*webkitTransitionEnd:可以监听当前元素的过渡效果执行完毕，当一个元素的过渡效果执行完毕的时候，会触发这个事件*/
  imgBox.addEventListener("webkitTransitionEnd",function () {
    // console.log(123);
    if(index == count - 1){
      index = 1;
      imgBox.style.transition = "none";
      imgBox.style.left = - index * bannerWidth + "px"; 
    }else if(index == 0){
      index = count-2;
      imgBox.style.transition = "none";
      imgBox.style.left = - index * bannerWidth + "px";
    }
    setIndicator(index);
    setTimeout(function () {
      flag = true;
    },100);
  })
 

  //当当前应用进入到后台会触发--停止时钟
  window.onblur = function () {
    clearInterval(timer);
  }
  //当应用回到前台--开启时钟
  window.onfocus = function () {
    starTimer();
  }

}

