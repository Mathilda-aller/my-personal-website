document.addEventListener('DOMContentLoaded', function() {
    // 获取返回顶部按钮的元素
    const backToTopButton = document.querySelector('#back-to-top-btn');

    // 只有在页面上存在这个按钮时才执行
    if(backToTopButton) {
        // 监听整个窗口的滚动事件
        window.onscroll = function() {
            // 如果页面向下滚动的距离超过300像素，就显示按钮
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                backToTopButton.style.display = "block";
            } else {
                // 否则就隐藏按钮
                backToTopButton.style.display = "none";
            }
        };

        // 给按钮添加一个点击事件
        backToTopButton.addEventListener('click', function() {
            // 平滑地滚动回页面顶部
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
    }
});