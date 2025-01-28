document.addEventListener('DOMContentLoaded', () => {
    const readMoreButtons = document.querySelectorAll('.read-more');
    
    readMoreButtons.forEach(button => {
        button.addEventListener('click', () => {
            const content = button.previousElementSibling;
            const isHidden = content.classList.contains('hidden');
            
            content.classList.toggle('hidden');
            button.textContent = isHidden ? 'Read less' : 'Read more';
        });
    });
});