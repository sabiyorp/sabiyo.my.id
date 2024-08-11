// Function to extract and display the current URL path in the "path" span element
function displayPath() {
    // Retrieve the current URL path
    var path = window.location.pathname;
    
    // Locate the span element with id "path"
    var pathSpan = document.getElementById("path");
    
    // Update the span's text content with the current path if the element exists
    if (pathSpan) {
        pathSpan.textContent = path;
    }
}

// Execute the displayPath function when the window finishes loading
window.onload = displayPath;

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