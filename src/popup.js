document.addEventListener('DOMContentLoaded', function() {
    var authorizeOneDriveBtn = document.getElementById('authorizeOneDriveBtn');
    var authorizeDropboxBtn = document.getElementById('authorizeDropboxBtn');
    var authorizeLocalBtn = document.getElementById('authorizeLocalBtn');
    
    if (authorizeOneDriveBtn) {
        authorizeOneDriveBtn.addEventListener('click', function() {
            // Lógica para solicitar autorización en OneDrive
            requestAuthorization('onedrive');
        });
    }

    if (authorizeDropboxBtn) {
        authorizeDropboxBtn.addEventListener('click', function() {
            // Lógica para solicitar autorización en Dropbox
            requestAuthorization('dropbox');
        });
    }

    if (authorizeLocalBtn) {
        authorizeLocalBtn.addEventListener('click', function() {
            // Lógica para solicitar autorización local
            requestAuthorization('local');
        });
    }
});

function requestAuthorization(provider) {
    switch (provider) {
        case 'onedrive':
            // Lógica para solicitar autorización en OneDrive
            break;
        case 'dropbox':
            // Lógica para solicitar autorización en Dropbox
            break;
        case 'local':
            // Lógica para solicitar autorización local
            break;
        default:
            console.error('Proveedor de autorización no válido.');
            break;
    }
}



// En tu archivo popup.js

document.getElementById('authorizeOneDriveBtn').addEventListener('click', function() {
    // Redirige al usuario a la página de autorización de OneDrive
    chrome.identity.launchWebAuthFlow({
        url: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=TU_CLIENT_ID&response_type=token&redirect_uri=YOUR_REDIRECT_URI&scope=files.readwrite.all',
        interactive: true
    }, function(redirectUrl) {
        // Extrae el token de acceso del redirectUrl
        var accessToken = extractAccessToken(redirectUrl);
        
        // Lógica para crear la carpeta en OneDrive
        createFolderInOneDrive(accessToken);
    });
});

function extractAccessToken(url) {
    // Lógica para extraer el token de acceso del redirectUrl
}

function createFolderInOneDrive(accessToken) {
    // Lógica para crear la carpeta "bookmarknest-1.0" en OneDrive
}


// Dentro de las funciones extractAccessToken y createFolderInOneDrive en popup.js

function extractAccessToken(url) {
    var hashIndex = url.indexOf('#');
    if (hashIndex !== -1) {
        var hashParams = url.substring(hashIndex + 1);
        var params = new URLSearchParams(hashParams);
        return params.get('access_token');
    }
    return null;
}

function createFolderInOneDrive(accessToken) {
    var folderName = "bookmarknest-1.0";
    var url = "https://graph.microsoft.com/v1.0/me/drive/root/children";
    var requestBody = {
        "name": folderName,
        "folder": { }
    };

    fetch(url, {
        method: "POST",
        headers: {
            "Authorization": "Bearer " + accessToken,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => {
        if (response.ok) {
            console.log("Folder created successfully in OneDrive.");
            alert("Folder created successfully in OneDrive.");
        } else {
            console.error("Failed to create folder in OneDrive.");
            alert("Failed to create folder in OneDrive.");
        }
    })
    .catch(error => {
        console.error("Error creating folder in OneDrive:", error);
        alert("Error creating folder in OneDrive:", error);
    });
}
