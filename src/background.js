chrome.alarms.create("autoBookmark", { periodInMinutes: 30 });

chrome.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === "autoBookmark") {
    chrome.bookmarks.getTree(bookmarkTree => {
      const bookmarks = JSON.stringify(bookmarkTree);
      // Here you can save 'bookmarks' to the cloud or local disk
      console.log("Bookmarks saved automatically:", bookmarks);
    });
  }
});
