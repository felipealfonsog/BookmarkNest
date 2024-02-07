document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('selectDirectoryBtn').addEventListener('click', function() {
        chrome.fileSystem.chooseEntry({
            type: 'openDirectory'
        }, function(directoryEntry) {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
                return;
            }
            var directoryPath = directoryEntry.fullPath;
            chrome.storage.local.set({selectedDirectory: directoryPath}, function() {
                console.log('Directorio seleccionado:', directoryPath);
                alert('Directory selected: ' + directoryPath);
            });
        });
    });
});
