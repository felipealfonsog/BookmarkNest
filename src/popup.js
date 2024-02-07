document.addEventListener('DOMContentLoaded', function() {
    var openDirectoryBtn = document.getElementById('openDirectoryBtn');
    var directoryPathDisplay = document.getElementById('directoryPathDisplay');

    openDirectoryBtn.addEventListener('click', function() {
        chrome.runtime.openOptionsPage();
    });

    // Retrieve and display the selected directory if stored
    chrome.storage.local.get('selectedDirectory', function(data) {
        var selectedDirectory = data.selectedDirectory;
        if (selectedDirectory) {
            directoryPathDisplay.textContent = selectedDirectory;
        }
    });
});
