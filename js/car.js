/*
 * @Author: 3517134128@qq.com 
 * @Email: 3517134128@qq.com
 * @Date: 2023-05-26 00:00:39 
 * @Last Modified by: 3517134128@qq.com
 * @Last Modified time: 2023-07-03 17:06:43
 * @Description: 购物车模块（jQuery）
 */
$(function() {
    // 1.全选，反选功能模块
    // 全选：把全选按钮（checkall）的状态赋值给三个小按钮（j-checkbox）即可
    // 事件使用change
    $(".checkall").change(function() {
        $('.j-checkbox,.checkall').prop('checked', $(this).prop('checked'));
        // 7.背景色
        if ($(this).prop('checked')) {
            // 让所有商品添加check-cart-item类名
            $('.cart-item').addClass('check-cart-item');
        } else {
            $('.cart-item').removeClass('check-cart-item');
        }
    });

    function checkItem(ele) {
        if (ele.prop('checked')) {
            // 让当前商品添加check-cart-item类名
            ele.parents('.cart-item').addClass('check-cart-item');
        } else {
            ele.parents('.cart-item').removeClass('check-cart-item');
        }
    }
    // 2.若小复选框被选中个数等于3（全部商品数）就应该把全选按钮选上，否则全选按钮不勾选
    $('.j-checkbox').each(function(index, element) {
        checkItem($(this));
    });
    var jlength;

    function updateGoodsNum() {
        jlength = $('.j-checkbox').length;
    }

    function ifCheckAll() {
        if ($('.j-checkbox:checked').length === jlength) {
            $('.checkall').prop('checked', true);
        } else {
            $('.checkall').prop('checked', false);
        }
    }
    $('.j-checkbox').change(function() {
        updateGoodsNum();
        ifCheckAll();
        checkItem($(this));
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

    // 6.删除商品模块
    // 1)商品后面的删除按钮
    $('.p-action a').click(function() {
        $(this).parents('.cart-item').remove();
        getSum();
        updateGoodsNum();
        ifCheckAll();
    });
    // 2)删除选中的商品
    $('.remove-batch').click(function() {
        $('.j-checkbox:checked').parents('.cart-item').remove();
        getSum();
        updateGoodsNum();
    });

    // 3)清空购物车，删除全部商品
    $('.clear-all').click(function() {
        $('.cart-item').remove();
        getSum();
        updateGoodsNum();
        $('.checkall').prop('checked', false);
    });

})