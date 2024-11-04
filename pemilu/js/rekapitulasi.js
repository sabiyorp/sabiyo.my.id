const { jsPDF } = window.jspdf; // Import jsPDF

// Check screen size and toggle warning message
function checkScreenSize() {
    const warningMessage = document.getElementById("warning-message");
    const mainContent = document.getElementById("main-content");

    if (window.innerWidth < 607) {
        mainContent.style.display = "none";
        warningMessage.style.display = "block";
    } else {
        mainContent.style.display = "block";
        warningMessage.style.display = "none";
    }
}

checkScreenSize();
window.addEventListener("resize", checkScreenSize);

// Initialize votes and hint box
let candidates = [0, 0];
let abstainVotes = 0;
const hintBox = document.getElementById("hint-box");

document.addEventListener("DOMContentLoaded", () => {
    // Show hint box with fade-in effect when the page loads
    hintBox.style.display = "block"; // Ensure it is visible
    hintBox.style.opacity = 0; // Start with it invisible
    setTimeout(() => {
        hintBox.style.opacity = 1; // Fade in
    }, 10); // Delay to allow display property to take effect
});

// Keyboard event listener
document.addEventListener("keydown", (event) => {
    const key = event.key;

    // Toggle error overlay with "\"
    if (key === "\\") {
        toggleErrorOverlay();
        return; // Exit after handling the toggle
    }

    // Handle votes
    if (key === "1") {
        candidates[0] += 1; // Increment vote for candidate 1
        document.getElementById("votes-1").textContent = candidates[0];
    } else if (key === "2") {
        candidates[1] += 1; // Increment vote for candidate 2
        document.getElementById("votes-2").textContent = candidates[1];
    } else if (key === "a") {
        abstainVotes += 1; // Increment abstain votes
        document.getElementById("abstain-votes").textContent = abstainVotes;
    } else if (key === "h") {
        toggleHintBox(); // Use the new function to toggle hint box
    } else if (key === "/") {
        // Reset votes without confirmation
        candidates = [0, 0];
        abstainVotes = 0;
        document.getElementById("votes-1").textContent = 0;
        document.getElementById("votes-2").textContent = 0;
        document.getElementById("abstain-votes").textContent = 0;
    }

    // Decrement votes
    if (key === "!") {
        candidates[0] = Math.max(candidates[0] - 1, 0); // Decrement vote for candidate 1
        document.getElementById("votes-1").textContent = candidates[0];
    } else if (key === "@") {
        candidates[1] = Math.max(candidates[1] - 1, 0); // Decrement vote for candidate 2
        document.getElementById("votes-2").textContent = candidates[1];
    } else if (key === "A") {
        abstainVotes = Math.max(abstainVotes - 1, 0); // Decrement abstain votes
        document.getElementById("abstain-votes").textContent = abstainVotes;
    }

    // Print to PDF when "p" is pressed
    if (key === "p") {
        printToPDF();
    }
});

// Function to toggle hint box with fade effect
function toggleHintBox() {
    if (hintBox.style.display === "none" || !hintBox.style.display) {
        hintBox.style.display = "block"; // Show hint box
        setTimeout(() => {
            hintBox.style.opacity = 1; // Fade in
        }, 10); // Delay to allow the display property to take effect
    } else {
        hintBox.style.opacity = 0; // Fade out
        setTimeout(() => {
            hintBox.style.display = "none"; // Hide after fade out
        }, 500); // Match the duration of the fade transition
    }
}

// Toggle error overlay function
function toggleErrorOverlay() {
    const errorOverlay = document.getElementById("error-overlay");
    if (errorOverlay.style.display === "none" || !errorOverlay.style.display) {
        errorOverlay.style.display = "flex"; // Show overlay
    } else {
        errorOverlay.style.display = "none"; // Hide overlay
    }
}

// Print results to PDF
function printToPDF() {
    const doc = new jsPDF();

    // Set monospace font
    doc.setFont("courier"); // Use a monospace font

    // Add centered title
    const title = "Hasil Suara Pemilu OSIS 2024";
    const titleWidth = doc.getTextWidth(title);
    const x = (doc.internal.pageSize.width - titleWidth) / 2; // Center the title
    doc.text(title, x, 20);

    // Add table header
    doc.text("Paslon / Keterangan", 20, 40);
    doc.text("Jumlah Suara", 120, 40);

    // Add results in table format
    doc.text("Paslon 1 (Abby-Naazneen)", 20, 50);
    doc.text(candidates[0].toString(), 120, 50); // Ensure it's a string
    doc.text("Paslon 2 (Airin-Dzakwan)", 20, 60);
    doc.text(candidates[1].toString(), 120, 60); // Ensure it's a string
    doc.text("Suara Abstain/Tidak Sah", 20, 70);
    doc.text(abstainVotes.toString(), 120, 70); // Ensure it's a string

    // Save the PDF
    doc.save("Hasil_Suara_Pemilu_OSIS_2024.pdf");
}
