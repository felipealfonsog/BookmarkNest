document.addEventListener("DOMContentLoaded", function () {
    const intervalInput = document.getElementById("interval");
    const cloudSelect = document.getElementById("cloud");
    const saveButton = document.getElementById("save");
  
    saveButton.addEventListener("click", function () {
      const interval = parseInt(intervalInput.value);
      const cloud = cloudSelect.value;
      chrome.storage.sync.set({ interval, cloud }, function () {
        console.log("Settings saved:", { interval, cloud });
        alert("Settings saved successfully.");
      });
    });
  
    chrome.storage.sync.get(["interval", "cloud"], function (data) {
      intervalInput.value = data.interval || 30;
      cloudSelect.value = data.cloud || "none";
    });
  
    cloudSelect.addEventListener("change", function () {
      if (cloudSelect.value === "local") {
        intervalInput.disabled = true;
        intervalInput.value = ""; // Clear interval value when saving locally
      } else {
        intervalInput.disabled = false;
      }
    });
  });
  


  // En tu archivo options.js

document.getElementById('authorizeOneDriveBtn').addEventListener('click', function() {
    // URL de autorización de OneDrive
    var authorizeUrl = 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=TU_CLIENT_ID&response_type=token&redirect_uri=YOUR_REDIRECT_URI&scope=files.readwrite.all';
    
    // Abre una nueva ventana emergente con la página de autorización de OneDrive
    chrome.windows.create({
        url: authorizeUrl,
        type: 'popup',
        width: 600,
        height: 400,
        focused: true
    }, function(window) {
        // Manejar el resultado de la autorización
        chrome.windows.onRemoved.addListener(function(windowId) {
            if (windowId === window.id) {
                // Lógica para crear la carpeta en OneDrive después de la autorización
                createFolderInOneDrive();
            }
        });
    });
});

function createFolderInOneDrive() {
    // Lógica para crear la carpeta "bookmarknest-1.0" en OneDrive
}


// Dentro de la función createFolderInOneDrive en options.js

function createFolderInOneDrive() {
    var folderName = "bookmarknest-1.0";
    var url = "https://graph.microsoft.com/v1.0/me/drive/root/children";
    var requestBody = {
        "name": folderName,
        "folder": { }
    };

    // Lógica para obtener el token de acceso de Chrome Identity API
    chrome.identity.getAuthToken({ interactive: true }, function(accessToken) {
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
    });
}
