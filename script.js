// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function() {
    // Function to calculate age based on birthdate
    function calculateAge(birthDate) {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        // Adjust age if birthday hasn't occurred this year yet
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        
        return age;
    }

    // Set the birthdate
    const birthDate = '2010-11-25';
    // Calculate the current age
    const age = calculateAge(birthDate);
    
    // Find the element with id 'age' in the DOM
    const ageSpan = document.getElementById('age');
    // If the element exists, update its text content with the calculated age
    if (ageSpan) {
        ageSpan.textContent = age;
    }
});
