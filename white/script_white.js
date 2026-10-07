// Dropdowns already work with CSS hover,
// but this JS enables click-to-open for mobile.

document.querySelectorAll('.dropdown').forEach(drop => {
    drop.addEventListener('click', () => {
        drop.classList.toggle('open');
    });
});

// Example placeholder for your glowing-spot minigame
let found = 0;
function foundSpot() {
    found++;
    document.getElementById("found-count").innerText = `${found} of 4 found`;
}
