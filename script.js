const colorPicker = document.getElementById("colorPicker");

const savedColor = localStorage.getItem("accentColor");
if (savedColor) {
    document.documentElement.style.setProperty("--accent",
        savedColor);
    colorPicker.value=savedColor;
}
colorPicker.addEventListener("input", () => {
    const color=colorPicker.value
    document.documentElement.style.setProperty("--accent",
        color);
    localStorage.setItem("accentColor",color );
});