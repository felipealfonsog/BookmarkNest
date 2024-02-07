document.addEventListener('DOMContentLoaded', function() {
    var directoryInput = document.getElementById('directoryInput');
    directoryInput.addEventListener('change', function(event) {
        var directoryPath = event.target.files[0].path;
        chrome.storage.local.set({ 'selectedDirectory': directoryPath }, function() {
            console.log('Directorio seleccionado:', directoryPath);
            alert('Directorio seleccionado: ' + directoryPath);
        });
    });
});
