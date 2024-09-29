// On DOMContentLoaded, check if logging is enabled and update the checkbox
document.addEventListener('DOMContentLoaded', function () {
    var enableExtension = document.getElementById('enableExtension');

    // Get the saved state from chrome.storage and set default to true if not found
    chrome.storage.sync.get(['extensionEnabled'], function (result) {
        if (typeof result.extensionEnabled === 'undefined') {
            // If extensionEnabled is not set, default to true
            chrome.storage.sync.set({ extensionEnabled: true }, function () {
                enableExtension.checked = true;
            });
        } else {
            enableExtension.checked = result.extensionEnabled;
        }
    });

    // Add an event listener to save the checkbox state when changed
    enableExtension.addEventListener('change', function () {
        chrome.storage.sync.set({ extensionEnabled: enableExtension.checked }, function () {
            console.log('Extension status updated to ' + enableExtension.checked);
        });
    });

    var enableLogging = document.getElementById('enableLogging');

    // Get the saved state from chrome.storage
    chrome.storage.sync.get(['loggingEnabled'], function (result) {
        enableLogging.checked = result.loggingEnabled || false;
    });

    // Add an event listener to save the checkbox state when changed
    enableLogging.addEventListener('change', function () {
        chrome.storage.sync.set({ loggingEnabled: enableLogging.checked }, function () {
            console.log('Logging status updated to ' + enableLogging.checked);
        });
    });
});
