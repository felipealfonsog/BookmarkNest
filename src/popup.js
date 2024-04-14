document.addEventListener('DOMContentLoaded', function() {
    var backupIntervalInput = document.getElementById('backupInterval');
    var backupDirectoryInput = document.getElementById('backupDirectory');
    var saveSettingsBtn = document.getElementById('saveSettingsBtn');
    var selectedDirectoryMsg = document.getElementById('selectedDirectory');

    // Cargar configuraciones guardadas al cargar la página
    chrome.storage.local.get(['backupInterval', 'backupDirectory'], function(data) {
        if (data.backupInterval) {
            backupIntervalInput.value = data.backupInterval;
        }
        if (data.backupDirectory) {
            backupDirectoryInput.value = data.backupDirectory;
            selectedDirectoryMsg.textContent = 'Backup directory: ' + data.backupDirectory;
        }
    });

    // Botón para seleccionar directorio
    backupDirectoryInput.addEventListener('change', function() {
        if (backupDirectoryInput.files && backupDirectoryInput.files.length > 0) {
            selectedDirectoryMsg.textContent = 'Backup directory: ' + backupDirectoryInput.files[0].path;
        } else {
            selectedDirectoryMsg.textContent = 'No directory selected';
        }
    });

    // Botón para guardar configuraciones
    saveSettingsBtn.addEventListener('click', function() {
        // Obtener valores de entrada
        var backupInterval = parseInt(backupIntervalInput.value);
        var backupDirectory = '';

        // Validar intervalo de backup
        if (isNaN(backupInterval) || backupInterval < 1) {
            alert('Please enter a valid backup interval (minutes).');
            return;
        }

        // Validar directorio de backup
        if (backupDirectoryInput.files && backupDirectoryInput.files.length > 0) {
            backupDirectory = backupDirectoryInput.files[0].path;
        } else {
            alert('Please select a backup directory.');
            return;
        }

        // Guardar configuraciones
        saveBackupSettings(backupInterval, backupDirectory);
    });

    // Función para guardar configuraciones
    function saveBackupSettings(interval, directory) {
        chrome.storage.local.set({
            'backupInterval': interval,
            'backupDirectory': directory
        }, function() {
            // Mostrar mensaje de éxito
            showMessage('Settings saved successfully.');
            // Actualizar el mensaje del directorio seleccionado en la interfaz
            selectedDirectoryMsg.textContent = 'Backup directory: ' + directory;
        });
    }

    // Función para mostrar mensajes
    function showMessage(message) {
        alert(message);
    }
});
