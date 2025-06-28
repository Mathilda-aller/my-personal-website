// 等待整个网页的HTML内容都加载完毕后，再执行代码
document.addEventListener('DOMContentLoaded', function() {

    // 1. 获取需要操作的HTML元素
    const contactForm = document.querySelector('.contact-form');
    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const messageInput = document.querySelector('#message');

    // 2. 只有在联系表单页面才执行后续代码，避免在其他页面报错
    if (contactForm) {
        
        // 3. 给表单添加一个“提交(submit)”事件的监听器
        contactForm.addEventListener('submit', function(event) {
            
            // 4. 阻止表单的默认提交行为（比如刷新页面）
            event.preventDefault();

            // 5. 获取输入框里的值，并用 .trim() 去掉前后的空格
            const nameValue = nameInput.value.trim();
            const emailValue = emailInput.value.trim();
            const messageValue = messageInput.value.trim();

            // 6. 进行判断
            if (nameValue === '') {
                // 如果名字为空
                alert('你好呀，请问怎么称呼你呢？');
                nameInput.focus(); // 自动聚焦到名字输入框，方便用户输入
                return; // 停止执行后续代码
            }

            if (emailValue === '') {
                //如果邮箱为空
                alert('我回通过邮箱回复你，所以请留下邮箱吧！');
                emailInput.focus();
                return;
            }

            if (messageValue === '') {
                // 如果留言内容为空
                alert('好像还没有写留言内容哦~');
                messageInput.focus(); 
                return; 
            }

            // 7. 如果所有检查都通过了
            alert('感谢你的留言，' + nameValue + '！我会尽快回复的！');
            
            // 提交成功后清空表单
            contactForm.reset();
        });
    }
});