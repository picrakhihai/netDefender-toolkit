document.addEventListener("DOMContentLoaded", () => {
    const passwordInput = document.getElementById("generated-password");
    const copyButton = document.getElementById("copy-button");
    const generateButton = document.getElementById("generate-button");
    const bulkGenerateButton = document.getElementById("bulk-generate-button");
    const bulkPasswords = document.getElementById("bulk-passwords");
    const lengthSlider = document.getElementById("length");
    const lengthValue = document.getElementById("length-value");

    // Update slider value display
    lengthSlider.addEventListener("input", () => {
        lengthValue.textContent = lengthSlider.value;
    });

    // Generate password
    function generatePassword() {
        const length = lengthSlider.value;
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
        let password = "";
        for (let i = 0; i < length; i++) {
            password += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return password;
    }

    // Set generated password
    generateButton.addEventListener("click", () => {
        passwordInput.value = generatePassword();
    });

    // Copy password
    copyButton.addEventListener("click", () => {
        passwordInput.select();
        document.execCommand("copy");
    });

    // Bulk generate passwords
    bulkGenerateButton.addEventListener("click", () => {
        const count = document.getElementById("bulk-count").value;
        bulkPasswords.innerHTML = "";
        for (let i = 0; i < count; i++) {
            const password = generatePassword();
            const p = document.createElement("p");
            p.textContent = password;
            bulkPasswords.appendChild(p);
        }
    });
});
