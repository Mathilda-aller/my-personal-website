document.addEventListener('DOMContentLoaded', function(){
    // 获取当前页面的url
    const currentUrl = window.location.href;
    // 获取所有导航链接
    const allLinks = document.querySelectorAll('nav a');

    // 遍历所有链接
    allLinks.forEach(function(link){
        // 获取遍历链接的href属性
        const linkHref = link.href;

        // 如果链接的href与当前页面的url相同
        if (linkHref === currentUrl) {
            // 给这个链接添加一个类名，表示它是当前页面的链接
            link.classList.add('active');
        }
    })
})