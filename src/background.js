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

    var blob = new Blob([bookmarksHTML], { type: 'text/html;charset=utf-8' });

    chrome.fileSystem.getWritableEntry(directory, function(directoryEntry) {
        directoryEntry.getFile(fileName, { create: true }, function(fileEntry) {
            fileEntry.createWriter(function(fileWriter) {
                fileWriter.write(blob);
                console.log('Bookmark backup saved in:', directory + '/' + fileName);
            });
        });
    });
}

function generateHTML() {
    var bookmarksHTML = '<!DOCTYPE NETSCAPE-Bookmark-file-1>\n' +
                        '<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">\n' +
                        '<TITLE>Bookmarks</TITLE>\n<DL><p>\n';

    chrome.bookmarks.getTree(function(bookmarkTreeNodes) {
        processNodes(bookmarkTreeNodes);
        bookmarksHTML += '</DL><p>\n';
    });

    return bookmarksHTML;
}

function processNodes(nodes) {
    nodes.forEach(function(node) {
        if (node.children) {
            bookmarksHTML += '<DT><H3>' + node.title + '</H3>\n<DL><p>\n';
            processNodes(node.children);
            bookmarksHTML += '</DL><p>\n';
        } else if (node.url) {
            bookmarksHTML += '<DT><A HREF="' + node.url + '">' + node.title + '</A>\n';
        }
    });
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
