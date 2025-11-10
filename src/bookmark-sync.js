function saveBookmarksToFileSystem(bookmarks) {
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
    conflictAction: 'overwrite',
    saveAs: false
  }, function(downloadId) {
    console.log('Bookmarks saved to local file:', fileName);
  });
}
