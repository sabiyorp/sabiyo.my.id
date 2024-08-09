document.addEventListener('DOMContentLoaded', function() {
    function calculateAge(birthDate) {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        
        return age;
    }

    const birthDate = '2010-11-25';
    const age = calculateAge(birthDate);
    
    const ageSpan = document.getElementById('age');
    if (ageSpan) {
        ageSpan.textContent = age;
    }
});
