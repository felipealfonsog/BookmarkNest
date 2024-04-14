document.addEventListener('DOMContentLoaded', function() {
    // Dark Theme option
    const darkThemeCheckbox = document.getElementById('darkThemeCheckbox');
    darkThemeCheckbox.addEventListener('change', function() {
        // Update theme based on checkbox state
        if (darkThemeCheckbox.checked) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
    });

    // Automatic Backup Interval option
    const backupIntervalSelect = document.getElementById('backupIntervalSelect');
    backupIntervalSelect.addEventListener('change', function() {
        // Save selected interval in storage
        const interval = parseInt(backupIntervalSelect.value);
        chrome.storage.local.set({ backupInterval: interval });
    });

    // Load saved backup interval
    chrome.storage.local.get('backupInterval', function(data) {
        const interval = data.backupInterval || 0; // Default to manual backup only
        backupIntervalSelect.value = interval.toString();
    });

    // Other options logic goes here
});
