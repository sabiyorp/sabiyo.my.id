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
