// 1.tab栏切换
const nav = document.querySelector('.tab_nav')
const panel = document.querySelectorAll('.tab_panel')
nav.addEventListener('click', function(e) {
    // 事件委托 
    console.log(e);
    if (e.target.tagName === 'A') {
        // 取消上一个selected，当前添加
        nav.querySelector('.selected').classList.remove('selected')
        e.target.classList.add('selected')

        // 下方对应板块
        for (let i = 0; i < panel.length; i++) {
            panel[i].style.display = 'none'
        }
        panel[e.target.dataset.id].style.display = 'block'
    }
})

/* 2.点击登录可以跳转页面
先阻止默认行为
若没有勾选同意，则提示要勾选
required属性不能为空
假设登录成功：把用户名记录到本地存储中，同时跳转到首页：location.href
*/
const form = document.querySelector('.login_info')
const agree = document.querySelector('[name=agree]')
const username = document.querySelector('[name=username]')
form.addEventListener('submit', function(e) {
    e.preventDefault()
    if (!agree.checked) {
        return alert('请勾选同意协议！')
    }
    // 记录用户名到本地
    localStorage.setItem('uname', username.value)
        // 跳转首页
    location.href = './index.html'
})

/* 3.首页自动显示用户名
从登录页跳转过来之后，自动显示用户名
若点击退出，则不显示用户名
*/