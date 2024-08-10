// Function to get the path from the URL and write it to the span with id "path"
function displayPath() {
    // Get the current URL path
    var path = window.location.pathname;
    
    // Get the span element
    var pathSpan = document.getElementById("path");
    
    // Set the text content of the span to the path with www.sabiyo.my.id
    if (pathSpan) {
        pathSpan.textContent = "www.sabiyo.my.id" + path;
    }
}

// Call the function when the window loads
window.onload = displayPath;
