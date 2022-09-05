const sections = document.querySelectorAll(".Q-section");

sections.forEach(section => {
    const btn = section.querySelector(".button");
    
    btn.addEventListener('click', (e) => {
        btn.classList.toggle("active");

        const answer = btn.nextElementSibling;

        if (btn.classList.contains("active")) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
            section.style.minHeight = answer.scrollHeight + 30 + 'px';
        }
        else {
            answer.style.maxHeight = 0;
            section.style.minHeight = '100px';
        }
    });
});