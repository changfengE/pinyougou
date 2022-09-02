// 仿京东放大镜效果
// 1.整个案例分为三个功能模块
// 2.鼠标经过小图片盒子，黄色的遮罩层mask和大图片盒子big显示，离开隐藏2个盒子
/*  3.黄色的遮挡层跟随鼠标功能
    分析：  
        1.把鼠标坐标给遮罩层不合适，因为遮罩层坐标以父盒子为准
        2.首先是获得鼠标在盒子内的坐标
        3.之后把数值给遮挡层作为left和top值
        4.此时用到鼠标移动事件，但是还是在小图片盒子内移动
        5.遮罩层需要1减去盒子自身高度和宽度的一半
        6.遮罩层不能超出小图片盒子范围
        7.若小于0，就把坐标设置为0
        8.若大于遮罩层最大的移动距离，就把坐标设置为最大的移动距离
        9.遮罩层的最大移动距离：小图片盒子宽度减去遮罩层盒子宽度

*/
// 4.移动黄色遮挡层，大图片跟随移动功能

// 页面加载从上至下，先html+css，后js
window.addEventListener('load', function() {
    // 获取事件源
    var preview_img = document.querySelector('.preview_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    // 1.鼠标经过preview_img就显示和隐藏mask和big
    preview_img.addEventListener('mouseover', function() {
        mask.style.display = 'block';
        big.style.display = 'block';
    })
    preview_img.addEventListener('mouseout', function() {
        mask.style.display = 'none';
        big.style.display = 'none';
    })

    // 2.黄色的遮挡层跟随鼠标功能
    preview_img.addEventListener('mousemove', function(e) {
        // 1.计算出鼠标在盒子内的坐标
        var x = e.pageX - this.offsetLeft;
        var y = e.pageY - this.offsetTop;
        // console.log(x, y);
        // 2.盒子高度的一半是150，减去高宽的一半就到了遮罩层中间
        // 3.mask移动的距离
        var maskX = x - mask.offsetWidth / 2;
        var maskY = y - mask.offsetHeight / 2;
        // 4.若x坐标小于0，就让它停在0的位置
        var maxX = preview_img.offsetWidth - mask.offsetWidth;
        var maxY = preview_img.offsetHeight - mask.offsetHeight;

        if (maskX <= 0) {
            maskX = 0;
        } else if (maskX >= maxX) {
            maskX = maxX;
        }
        if (maskY <= 0) {
            maskY = 0;
        } else if (maskY >= maxY) {
            maskY = maxY;
        }
        mask.style.left = maskX + 'px';
        mask.style.top = maskY + 'px';

        // 3.移动黄色遮罩层，大图片跟随移动功能
        // 遮罩层移动距离(maskX、maskY)/遮罩层最大移动距离(100)=大图片移动距离(?)/大图片最大移动距离(大图片-大盒子)
        var bigImg = document.querySelector('.bigImg');
        var bigMax = bigImg.offsetWidth - big.offsetWidth;
        // 大图片的移动距离
        var bigX = maskX * bigMax / maxX;
        var bigY = maskY * bigMax / maxY;
        bigImg.style.left = -bigX + 'px';
        bigImg.style.top = -bigY + 'px';
    })


})