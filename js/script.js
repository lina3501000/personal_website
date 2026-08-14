const colorPicker = document.getElementById("colorPicker");
const savedColor = localStorage.getItem("accentColor");
let lastColor="#00ff00";

function contrastWithBlack(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const rgb = [r, g, b].map(c =>
        c <= 0.03928
            ? c / 12.92
            : Math.pow((c + 0.055) / 1.055, 2.4)
    );

    const luminance =
        0.2126 * rgb[0] +
        0.7152 * rgb[1] +
        0.0722 * rgb[2];

    return (luminance + 0.05) / 0.05;
}

if (savedColor) {
    document.documentElement.style.setProperty("--accent", savedColor);
    colorPicker.value = savedColor;
}

colorPicker.addEventListener("input", () => {
    const color = colorPicker.value;

    if (contrastWithBlack(color) >= 3) {
        lastColor = color;
    } else {
        colorPicker.value = lastColor;
    }

    document.documentElement.style.setProperty("--accent", lastColor);
    localStorage.setItem("accentColor", lastColor);
});