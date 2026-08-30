
export { handleThemeToggle };

function handleThemeToggle() {

    const themeToggleBtn = document.querySelector(".nav-toggle-class");

    const themeToggleText = document.querySelector(".nav-toggle-text h3");

    if (!themeToggleBtn || !themeToggleText) {
        return;
    }

    themeToggleBtn.addEventListener("click", () => {

        document.body.classList.toggle("light-theme");

        if (
            document.body.classList.contains("light-theme")
        ) {
            themeToggleText.textContent = "Light Mode";
        } else {
            themeToggleText.textContent = "Dark Mode";
        }
    });
}
