const btns = document.querySelectorAll(".button");

btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        btn.classList.toggle("active");
    });
});