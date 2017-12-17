window.onload = function () {
  //获取元素
  var leftBox = document.querySelector(".jd_left");
  var ulBox = document.querySelector("ul");
  var allLi = document.querySelectorAll("li");
  //获取元素的宽高
  var leftBoxH = leftBox.offsetHeight;
  var ulBoxH = ulBox.offsetHeight;
  //设置两种状态下的移动区间
  //静止状态
  var maxY = 0;
  var minY = leftBoxH - ulBoxH;
  //弹簧状态
  var Bounce = 100;
  var maxBounceY = maxY + Bounce;
  var minBounceY = minY - Bounce;
  //实现滑动
  var starY = 0;
  var endY = 0;
  var distanceY = 0;
  //定义个变量存储当前滑动完的位置
  var currentY = 0;
  //给allLi数组中每个元素添加index
  for (var i = 0; i < allLi.length; i++)     {
    allLi[i].index = i;
  }
  ulBox.addEventListener("touchstart", function (e) {
    starY = e.targetTouches[0].clientY;
    // console.log(starY);
  })
  ulBox.addEventListener("touchmove", function (e) {
    event.preventDefault();
    endY = e.targetTouches[0].clientY;
    distanceY = endY - starY;
    if (currentY + distanceY > maxBounceY || currentY + distanceY < minBounceY) {
      // console.log("超出范围");
      return;
    }
    ulBox.style.transition = "none";
    ulBox.style.top = currentY + distanceY + "px";
    // console.log(distanceY);
  })
  ulBox.addEventListener("touchend", function (e) {
    if (currentY + distanceY > maxY) {
      ulBox.style.transition = "top 0.5s";
      ulBox.style.top = maxY + "px";
      currentY = maxY;
    } else if (currentY + distanceY < minY) {
      ulBox.style.transition = "top 0.5s";
      ulBox.style.top = minY + "px";
      currentY = minY;
    } else {
      currentY += distanceY;
    }
    starY = 0;
    endY = 0;
    distanceY = 0;
  })
  ulBox.addEventListener("click", function (e) {
    //  console.log("123");
    //  console.log(allLi[1].classList);
    //清除全部的active样式
    for (i = 0; i < allLi.length; i++) {
      allLi[i].classList.remove("active");
    }
    var currentLi = e.target.parentNode;
    // console.log(currentLi);
    currentLi.classList.add("active");
    //实现滑动
    //获取每个li元素的高度
    var liH = currentLi.offsetHeight;
    ulBox.style.transition = "top 0.5s";
    if (-(liH * currentLi.index) < minY) {
      ulBox.style.top = minY + "px";
      currentY = minY;
    } else {
      ulBox.style.top = -(liH * currentLi.index) + "px";
      currentY = - (liH * currentLi.index);
    }
  })
}