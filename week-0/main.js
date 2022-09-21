const sections = document.querySelectorAll(".Q-section");

sections.forEach(section => {
    const btn = section.querySelector(".button");
    const answer = btn.nextElementSibling;

    section.style.minHeight = btn.offsetHeight + 20 + 'px';
    answer.style.paddingTop = btn.offsetHeight - 10 + 'px';
    
    btn.addEventListener('click', (e) => {
        btn.classList.toggle("active");

        if (btn.classList.contains("active")) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
            section.style.minHeight = answer.scrollHeight + 30 + 'px';
        }
        else {
            answer.style.maxHeight = 0;
            section.style.minHeight = btn.offsetHeight + 20 + 'px';
        }
    });
});

window.addEventListener("keydown", function(e) {
    if (e.code == "Space" && e.target == document.body){
        e.preventDefault();
    }
});