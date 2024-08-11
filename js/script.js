// Function to check screen width and show alert
function checkScreenWidth() {
    if (window.innerWidth <= 236) {
        alert("Halaman tidak dapat dimuat dengan benar karena layar Anda terlalu kecil.\n\nGunakan layar yang lebih besar untuk melihat halaman ini.");
    }
}

// Check screen width on page load
window.addEventListener('load', checkScreenWidth);

// Check screen width on window resize
window.addEventListener('resize', checkScreenWidth);
