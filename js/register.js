/*
 * @Author: 3517134128@qq.com 
 * @Email: 3517134128@qq.com
 * @Date: 2023-07-22 15:17:06 
 * @Last Modified by: 3517134128@qq.com
 * @Last Modified time: 2023-07-22 20:56:10
 * @Description: 注册页表单验证
 */
// 1.发送验证码
/* 开始显示：发送验证码
用户点击之后，显示05秒后重新获取
时间到了，自动改为：重新获取
*/
const code = document.querySelector('.code')
let flag = true // 通过一个变量来控制点击是否执行功能 类似节流阀
code.addEventListener('click', function(e) {
    if (flag) {
        flag = false
        let i = 5
        let timerId = setInterval(function() {
            code.innerHTML = `0${i}秒后重新获取`
            code.style.color = '#ccc'
            if (i === 0) {
                clearInterval(timerId)
                code.innerHTML = '重新获取'
                code.style.color = ''
                flag = true
            }
            i--
        }, 1000)
    }
})

/* 2.用户名验证 
注意封装函数verifyxxx，失去焦点触发函数
用户名正则：/^[a-zA-Z0-9-_]{6,10}$/
若不符合要求，则提示信息，并return false中断程序
否则返回true
侦听使用change事件，当鼠标离开了表单，并且表单值发生了变化时触发
*/
const uname = document.querySelector('[name=username]')
const namespan = uname.nextElementSibling
const unamereg = /^[a-zA-Z0-9-_]{6,10}$/
uname.addEventListener('change', verifyName)

// 封装verify函数
function verifyName(e) {
    if (!unamereg.test(uname.value)) {
        namespan.className = 'error'
        namespan.innerHTML = `<i class="error_icon"></i>用户名由6~10位数字字母下划线及-组成`
        return false
    }
    namespan.className = 'sucess'
    namespan.innerHTML = `<i class="success_icon"></i>可使用`
    return true
}
/* 3.手机号验证
正则：/^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
其余同上
*/
const phone = document.querySelector('[name=phone]')
const phonespan = phone.nextElementSibling
const phonereg = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/
phone.addEventListener('change', verifyPhone)

// 封装verify函数
function verifyPhone(e) {
    if (!phonereg.test(phone.value)) {
        phonespan.className = 'error'
        phonespan.innerHTML = `<i class="error_icon"></i>请输入正确的11位手机号`
        return false
    }
    phonespan.className = 'sucess'
    phonespan.innerHTML = `<i class="success_icon"></i>可使用`
    return true
}

/* 4.验证码验证
正则：/^\d{6}$/
其余同上
*/
const codeIpt = document.querySelector('[name=code]')
const codespan = code.nextElementSibling
const codereg = /^\d{6}$/
codeIpt.addEventListener('change', verifyCode)

// 封装verify函数
function verifyCode(e) {
    if (!codereg.test(codeIpt.value)) {
        codespan.className = 'error'
        codespan.innerHTML = `<i class="error_icon"></i>请输入6位数字`
        return false
    }
    codespan.className = 'sucess'
    codespan.innerHTML = `<i class="success_icon"></i>可用`
    return true
}

/* 5.密码验证
正则：/^[a-zA-Z0-9-_]{6,20}$/
其余同上
*/
const password = document.querySelector('[name=password]')
const passwordspan = password.nextElementSibling
const passwordreg = /^[a-zA-Z0-9-_]{6,20}$/
password.addEventListener('change', verifyPwd)

// 封装verify函数
function verifyPwd(e) {
    if (!passwordreg.test(password.value)) {
        passwordspan.className = 'error'
        passwordspan.innerHTML = `<i class="error_icon"></i>密码为6~20位字母数字下划线及-组成`
        return false
    }
    passwordspan.className = 'sucess'
    passwordspan.innerHTML = `<i class="success_icon"></i>可使用`
    return true
}

/* 6.再次密码验证
若本次密码不等于与上面输入的密则返回错误信息
*/
const confirm = document.querySelector('[name=confirm]')
const confirmspan = confirm.nextElementSibling
confirm.addEventListener('change', verifyConfirm)

// 封装verify函数
function verifyConfirm(e) {
    if (confirm.value !== password.value) {
        confirmspan.className = 'error'
        confirmspan.innerHTML = `<i class="error_icon"></i>两次密码输入不一致`
        return false
    }
    confirmspan.className = 'sucess'
    confirmspan.innerHTML = `<i class="success_icon"></i>可使用`
    return true
}

/* 7.同意协议模块
字体图标，点击切换类
*/
const check = document.querySelector('.icon-queren')
check.addEventListener('click', function() {
    this.classList.toggle('icon-queren2')
})

/* 8.表单提交模块 
使用submit提交事件
若未勾选同意协议，则提示：需要勾选
classList.contains()查看是否包含某个类，若有则返回true，否则false
若上面input表单 只要有模块，返回的是false则阻止提交
*/
const form = document.querySelector('form')
form.addEventListener('submit', function(e) {
    // 判断是否勾选同意协议
    if (!check.classList.contains('icon-queren2')) {
        alert('请勾选同意协议！')
            // 阻止提交
        e.preventDefault()
    }
    // 依次判断以上功能模块是否通过，只要有一个未通过就阻止提交
    if (!verifyName() || !verifyPhone() || !verifyPwd() || !verifyConfirm() || !verifyCode()) {
        e.preventDefault()
    }
})