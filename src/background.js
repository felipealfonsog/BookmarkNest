chrome.runtime.onInstalled.addListener(function() {
    // Set default backup interval to 60 minutes
    chrome.storage.local.set({
        'backupInterval': 60
    });
});

// Schedule periodic backup
chrome.alarms.onAlarm.addListener(function(alarm) {
    if (alarm.name === 'backup') {
        chrome.bookmarks.getTree(function(bookmarkTreeNodes) {
            var bookmarks = JSON.stringify(bookmarkTreeNodes);

            chrome.storage.local.get('backupDirectory', function(data) {
                var backupDirectory = data.backupDirectory;
                if (backupDirectory) {
                    chrome.downloads.download({
                        url: 'data:text/plain;charset=utf-8,' + encodeURIComponent(bookmarks),
                        filename: backupDirectory + '/bookmarks_backup_' + Date.now() + '.json',
                        saveAs: false
                    }, function(downloadId) {
                        console.log('Backup saved:', downloadId);
                    });
                }
            });
        });
    }
});

// Listen for changes in backup interval
chrome.storage.onChanged.addListener(function(changes, namespace) {
    if (changes.backupInterval && namespace === 'local') {
        var newInterval = changes.backupInterval.newValue;
        scheduleBackup(newInterval);
    }
});

// Function to schedule periodic backup
function scheduleBackup(intervalInMinutes) {
    chrome.alarms.clear('backup');
    chrome.alarms.create('backup', { periodInMinutes: parseInt(intervalInMinutes) });
}

// Initial setup to schedule backup
chrome.storage.local.get('backupInterval', function(data) {
    var interval = data.backupInterval || 60; // Default to 60 minutes
    scheduleBackup(interval);
});
