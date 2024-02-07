// popup.js

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('openDirectoryBtn').addEventListener('click', function() {
        chrome.storage.local.get('bookmarks', function(data) {
            var bookmarks = data.bookmarks || [];
            saveBookmarksToFile(bookmarks);
        });
    });
});

// Función para obtener la fecha y hora actuales en formato legible
function getCurrentDateTime() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    return year + '-' + month + '-' + day + '_' + hour + '-' + minute + '-' + second;
}

// Función para guardar los marcadores en un archivo y descargarlo
function saveBookmarksToFile(bookmarks) {
    var dateTime = getCurrentDateTime();
    var fileName = 'bookmarkschrome-' + dateTime + '.html';
    var fileContent = '<!DOCTYPE NETSCAPE-Bookmark-file-1>\n' +
                    '<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">\n' +
                    '<TITLE>Bookmarks</TITLE>\n<DL><p>\n';
    
    bookmarks.forEach(function(bookmark) {
        fileContent += '<DT><A HREF="' + bookmark.url + '">' + bookmark.title + '</A>\n';
    });
    
    fileContent += '</DL><p>\n';
    
    chrome.downloads.download({
        url: 'data:text/html;charset=utf-8,' + encodeURIComponent(fileContent),
        filename: fileName,
        saveAs: true
    }, function(downloadId) {
        if (chrome.runtime.lastError) {
            console.error('Failed to save bookmarks to file:', chrome.runtime.lastError.message);
        } else {
            console.log('Bookmarks saved to file:', fileName);
        }
    });
}
