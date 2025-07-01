// gallery.js - 画廊图片点击放大查看功能
document.addEventListener('DOMContentLoaded', function() {

    // 获取所有需要点击的图片元素
    const galleryImages = document.querySelectorAll('.gallery-item img');

    // 获取弹窗相关的元素
    const modal = document.querySelector('#image-modal');
    const modalImage = document.querySelector('#modal-image');
    const closeBtn = document.querySelector('.close-btn');

    // 只有在页面上存在弹窗时才执行
    if (modal) {
       
        // 为每一张画廊图片添加点击事件
        galleryImages.forEach(function(img) {
            img.addEventListener('click', function() {

                modal.style.display = "block"; // 显示弹窗
                modalImage.src = this.src;     // 将弹窗中的图片源设置为被点击图片的源
            });
        });

        // 关闭弹窗（点击“关闭”按钮时）
        function closeModal() {
            modal.style.display = "none";
        }
        closeBtn.addEventListener('click', closeModal);
        // 关闭弹窗（点击弹窗外部时）
        modal.addEventListener('click', function(event) {
            // event.target 是触发事件的元素
            // 如果点击的是弹窗本身（而不是弹窗内的图片或关闭按钮），则关闭弹窗
            if (event.target === modal) {
                closeModal();
            }
        });

    }
});