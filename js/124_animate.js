function animate(obj, target, callback) {
    // console.log(callback); //callback=function(){}调用时callback()

    // 当不断的点击按钮，这个元素的速度会越来越快，因为开启了太多的定时器
    // 解决方案是，让元素只有一个定时器执行
    // 先清除以前的定时器，只保留当前的定时器
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        // Math.ceil向上取整，避免小数
        // var step = Math.ceil((target - obj.offsetLeft) / 10);
        var step = (target - obj.offsetLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            // 停止动画     
            clearInterval(obj.timer);
            // 回调函数写到定时器结束里面
            // 判断是否有callback参数传入
            if (callback) {

                callback();
            }
        }
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15)
}