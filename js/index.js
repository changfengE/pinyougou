/*
 * @Author: 3517134128@qq.com 
 * @Email: 3517134128@qq.com
 * @Date: 2023-07-03 19:38:08 
 * @Last Modified by: 3517134128@qq.com
 * @Last Modified time: 2023-07-04 14:41:55
 * @Description: 新增电梯导航
 */
window.addEventListener('load', function() {
    // 1.显示隐藏左右箭头
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    focus.addEventListener('mouseenter', function() {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })
    focus.addEventListener('mouseleave', function() {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function() {
            arrow_r.click();
        }, 5000)
    })

    // 2.动态生成小圆圈，有几张图片，就生成几个小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    for (var i = 0; i < ul.children.length; i++) {
        // 创建一个li
        var li = document.createElement('li');
        // 通过自定义属性记录当前小圆圈的索引号
        li.setAttribute('index', i);

        // 把li插入到ol里面
        ol.appendChild(li);
        // 3.小圆圈的排他思想，直接在生成小圆圈的同时绑定点击事件
        li.addEventListener('click', function() {
            // 清除其它
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            // 留下自己
            this.className = 'current';
            // 4.点击小圆圈，移动图片li
            // ul移动的距离：小圆圈的索引号乘以图片宽度，是负值
            // 点击了某个li，就拿到当前li的索引号index
            var index = this.getAttribute('index');

            // 点击了某个li就要把这个li的索引给num和circle
            num = index;
            circle = index;

            var target = -(index * focusWidth);
            animate(ul, target);
        })
    }
    // 把ol里面第一个li设置类名current
    ol.children[0].className = 'current';

    // 5.克隆第一张图片，放到最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    // 6.点击右侧按钮，图片滚动一张
    var num = 0;
    // circle控制小圆圈的播放
    var circle = 0;

    // 节流阀flag
    var flag = true;

    arrow_r.addEventListener('click', function() {
        if (flag) {
            // 关闭节流阀
            flag = false;
            // 若走到最后一张复制的图片，ul要快速复原，left改为0
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function() {
                // 打开节流阀
                flag = true;
            });
            // 7.点击右侧按钮，小圆圈跟随变化
            circle++;
            // 若circle==4说明走到最后一张图了

            // if (circle == ol.children.length) {
            //     circle = 0;
            // }
            circle = circle == ol.children.length ? 0 : circle;
            circleChange();
        }
    })

    // 8.左侧按钮
    arrow_l.addEventListener('click', function() {
        if (flag) {
            flag = false;
            // 若走到最后一张复制的图片，ul要快速复原，left改为0
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true;
            });
            // 7.点击右侧按钮，小圆圈跟随变化
            circle--;
            // 若circle<0说明第一张图片，小圆圈要改为第4个小圆圈（3）
            circle = circle < 0 ? ol.children.length - 1 : circle;
            circleChange();
        }
    })

    function circleChange() {
        // 先清除其余小圆圈current类名，后留下当前
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }

    // 9.自动播放轮播图
    var timer = setInterval(function() {
        arrow_r.click();
    }, 5000)
});

$(function() {
    // 当点击了电梯导航li，不需要执行页面滚动事件里面的li的北京选择添加current
    // 节流阀（互斥锁）
    var liftflag = true;

    // 1.显示隐藏电梯导航
    var liftTop = $('.recom').offset().top;

    function toggleTool() {
        if ($(document).scrollTop() >= liftTop) {
            $('.lift_nav').fadeIn();
        } else {
            $('.lift_nav').fadeOut();
        }
    }

    function liftBg() {
        $('.floor .w').each(function(index, element) {
            if ($(document).scrollTop() >= $(element).offset().top) {
                $('.lift_nav li').eq(index).addClass('current').siblings().removeClass();
            }
        });
    }
    toggleTool();
    liftBg();
    $(window).scroll(function() {
        toggleTool();
        // 3.页面滚动到某个内容区域，左侧电梯导航li相应添加移除current
        if (liftflag) {
            liftBg();
        }
    });
    // 2.点击电梯导航页面就可以滚动到相应区域
    $('.lift_nav li').click(function() {
        liftflag = false;
        // 每次点击li就需要计算出页面要去往的位置
        // 选出对应索引号的内容区的盒子，计算其offset().top
        var current = $('.floor .w').eq($(this).index()).offset().top;
        // 页面滚动效果
        $('body,html').stop().animate({
            scrollTop: current
        }, function() {
            liftflag = true;
        });
        // 点击之后，让当前的li添加current类名，其他的移除
        $(this).addClass('current').siblings().removeClass();
    });
})