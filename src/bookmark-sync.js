// Función para guardar la configuración de la carpeta local
function saveLocalFolderConfig(folderPath) {
  chrome.storage.sync.set({localFolderPath: folderPath}, function() {
      console.log('Local folder configuration saved:', folderPath);
  });
}

// Función para guardar los bookmarks en la carpeta local especificada
function saveBookmarksToLocal(bookmarks, folderPath) {
  var dateTime = getCurrentDateTime();
  var fileName = 'bookmarkschrome-' + dateTime + '.html';
  var fileContent = '<!DOCTYPE NETSCAPE-Bookmark-file-1>\n' +
                    '<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">\n' +
                    '<TITLE>Bookmarks</TITLE>\n<DL><p>\n';
  
  bookmarks.forEach(function(bookmark) {
      fileContent += '<DT><A HREF="' + bookmark.url + '">' + bookmark.title + '</A>\n';
  });
  
  fileContent += '</DL><p>\n';
  
  chrome.fileSystem.chooseEntry({
      type: 'saveFile',
      suggestedName: fileName,
      accepts: [{extensions: ['html']}]
  }, function(fileEntry) {
      fileEntry.createWriter(function(fileWriter) {
          var blob = new Blob([fileContent], {type: 'text/html'});
          fileWriter.write(blob);
          console.log('Bookmarks saved to local file:', fileName);
      });
  });
}

// Manejar la configuración de la carpeta local cuando el usuario la cambia
document.getElementById('saveConfigBtn').addEventListener('click', function() {
  chrome.fileSystem.chooseEntry({
      type: 'openDirectory'
  }, function(folderEntry) {
      if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError.message);
          return;
      }
      var folderPath = folderEntry.fullPath;
      saveLocalFolderConfig(folderPath);
  });
});

// Obtener la configuración de la carpeta local
chrome.storage.sync.get('localFolderPath', function(data) {
  var folderPath = data.localFolderPath;
  console.log('Local folder configuration loaded:', folderPath);
});

// Guardar los bookmarks en la carpeta local especificada
chrome.storage.local.get('bookmarks', function(data) {
  var bookmarks = data.bookmarks || [];
  chrome.storage.sync.get('localFolderPath', function(data) {
      var folderPath = data.localFolderPath;
      saveBookmarksToLocal(bookmarks, folderPath);
  });
});
