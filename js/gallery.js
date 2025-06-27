console.log("gallery.js 文件已成功加载！"); // 探针1：检查文件是否加载

document.addEventListener('DOMContentLoaded', function() {

    console.log("DOM 内容已加载完毕，开始执行脚本。"); // 探针2：检查DOMContentLoaded是否触发

    // 获取所有需要点击的图片元素
    const galleryImages = document.querySelectorAll('.gallery-item img');

    console.log("找到的画廊图片数量:", galleryImages.length); // 探针3：检查我们找到了多少张图片
    console.log(galleryImages); // 打印出所有找到的图片元素

    // 获取弹窗相关的元素
    const modal = document.querySelector('#image-modal');
    const modalImage = document.querySelector('#modal-image');
    const closeBtn = document.querySelector('.close-btn');

    // 只有在页面上存在弹窗时才执行
    if (modal) {
        console.log("弹窗元素已找到，准备绑定事件。"); // 探针4：检查是否找到了弹窗

        // 为每一张画廊图片添加点击事件
        galleryImages.forEach(function(img) {
            img.addEventListener('click', function() {

                console.log("图片被点击了！这张图片的地址是:", this.src); // 探针5：检查点击事件是否触发

                modal.style.display = "block"; // 显示弹窗
                modalImage.src = this.src;     // 将弹窗中的图片源设置为被点击图片的源
            });
        });

        // ... 后续关闭弹窗的代码不变 ...
        function closeModal() {
            modal.style.display = "none";
        }
        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeModal();
            }
        });

    } else {
        console.error("错误：未能找到 #image-modal 弹窗元素！"); // 探针6：如果没找到弹窗就报错
    }
});