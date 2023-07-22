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