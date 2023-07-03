/*
 * @Author: 3517134128@qq.com 
 * @Email: 3517134128@qq.com
 * @Date: 2023-05-26 00:00:39 
 * @Last Modified by: 3517134128@qq.com
 * @Last Modified time: 2023-07-03 11:41:03
 * @Description: 购物车模块（jQuery）
 */
$(function() {
    // 1.全选，反选功能模块
    // 全选：把全选按钮（checkall）的状态赋值给三个小按钮（j-checkbox）即可
    // 事件使用change
    $(".checkall").change(function() {
        $('.j-checkbox,.checkall').prop('checked', $(this).prop('checked'));
    });

    // 2.若小复选框被选中个数等于3（全部商品数）就应该把全选按钮选上，否则全选按钮不勾选
    $('.j-checkbox').change(function() {
        if ($('.j-checkbox:checked').length === 3) {
            $('.checkall').prop('checked', true);
        } else {
            $('.checkall').prop('checked', false);
        }
    });

    // 3.增减商品数量模块，首先声明一个变量，当点击 `+`号（`increment`），就让这个值自增一（`++`），然后赋值给文本框。
    $('.increment').click(function() {
        var n = $(this).siblings('.itxt').val();
        n++;
        $(this).siblings('.itxt').val(n);

        // 4.计算商品小计，根据文本框的值乘以当前商品的单价即商品小计
        var p = $(this).parent().parent().siblings('.p-price').html();
        p = p.substr(1);
        // 保留两位小数
        var price = (p * n).toFixed(2);
        // parents()返回所有父级元素
        $(this).parents('.p-num').siblings('.p-sum').html('￥' + price);
        getSum();
    });
    $('.decrement').click(function() {
        var n = $(this).siblings('.itxt').val();
        if (n == 1) {
            return false;
        }
        n--;
        $(this).siblings('.itxt').val(n);

        // var p = $(this).parent().parent().siblings('.p-price').html();
        var p = $(this).parents('.p-num').siblings('.p-price').html();
        p = p.substr(1);
        $(this).parents('.p-num').siblings('.p-sum').html('￥' + (p * n).toFixed(2));
        getSum();
    });
    // 4.用户修改文本框里的值，计算小计模块
    $('.itxt').change(function() {
        // 先得到文本框的值*当前商品单价
        var n = $(this).val();
        // 单价
        var p = $(this).parents('.p-num').siblings('.p-price').html();
        p = p.substr(1);
        $(this).parents('.p-num').siblings('.p-sum').html('￥' + (p * n).toFixed(2));
        getSum();
    });

    // 5.计算总计和总额模块
    // 页面打开先调用一次
    getSum();

    function getSum() {
        var count = 0;
        var money = 0;
        $('.itxt').each(function(i, ele) {
            count += parseInt($(ele).val());
        });
        $('.amount-sum em').text(count);
        $('.p-sum').each(function(i, ele) {
            money += parseFloat($(ele).text().substr(1))
        });
        $('.price-sum em').text('￥' + money.toFixed(2));
    }
})