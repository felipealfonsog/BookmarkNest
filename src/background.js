// Perform backup every minute
setInterval(function() {
    chrome.storage.local.get('selectedDirectory', function(data) {
        var selectedDirectory = data.selectedDirectory;
        if (selectedDirectory) {
            backupBookmarks(selectedDirectory);
        }
    });
}, 60000);

function backupBookmarks(directory) {
    var bookmarksHTML = generateHTML();
    var dateTime = getCurrentDateTime();
    var fileName = 'bookmarks-' + dateTime + '.html';

    chrome.downloads.download({
        url: 'data:text/html;charset=utf-8,' + encodeURIComponent(bookmarksHTML),
        filename: directory + '/' + fileName,
        saveAs: false,
        conflictAction: 'overwrite'
    }, function(downloadId) {
        console.log('Bookmark backup saved. Download ID:', downloadId);
    });
}

function generateHTML() {
    // Generate HTML content from Chrome bookmarks
    // Implementation of this function depends on how you want to format the bookmarks
    // You can use chrome.bookmarks API to retrieve bookmarks and format them as HTML
    // For simplicity, let's assume bookmarksHTML is a string containing HTML content
    var bookmarksHTML = '<!DOCTYPE html><html><head><title>Bookmarks</title></head><body><h1>Bookmarks</h1><ul><li>Bookmark 1</li><li>Bookmark 2</li></ul></body></html>';
    return bookmarksHTML;
}

function getCurrentDateTime() {
    // Generate current date and time string
    // Implementation depends on the desired format
    var now = new Date();
    var year = now.getFullYear();
    var month = String(now.getMonth() + 1).padStart(2, '0');
    var day = String(now.getDate()).padStart(2, '0');
    var hour = String(now.getHours()).padStart(2, '0');
    var minute = String(now.getMinutes()).padStart(2, '0');
    var second = String(now.getSeconds()).padStart(2, '0');
    return year + month + day + '_' + hour + minute + second;
}
