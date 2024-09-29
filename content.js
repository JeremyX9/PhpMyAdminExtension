// Check if the extension is enabled before executing any content script
chrome.storage.sync.get(['extensionEnabled'], function (result) {
    if (result.extensionEnabled) {
        // Extension is enabled, proceed with the script
        if (document.getElementById('imgpmalogo')) {
            log("imgpmalogo exists");
            if (document.getElementById('imgpmalogo').alt == 'phpMyAdmin') {
                log("imgpmalogo alt is phpMyAdmin, so we are on the phpMyAdmin page");
                setTimeout(function () {
                    log("setTimeout with 300ms");
                    setWidthOfWidest();
                    addKeyDownEvent();
                }, 300);
            }
        }
    } else {
        log("Extension is disabled, content script will not run.");
    }
});

function setWidthOfWidest() {
    log("function executed ('setWidthOfWidest')");
    var elements = document.getElementsByClassName('hover_show_full');
    var width = 0;

    for (var i = 0; i < elements.length; i++) {
        var elementWidth = elements[i].offsetWidth;
        if (elementWidth > width) {
            width = elementWidth;
        }
    }
    width = width + 100;

    document.getElementById('pma_navigation').style.width = width + 'px';
    document.getElementById('pma_navigation_resizer').style.left = width + 'px';
    document.getElementsByTagName('body')[0].style.marginLeft = width + 'px';
}

function addKeyDownEvent() {
    log("function executed ('addKeyDownEvent')");
    var inputElement = document.querySelector('.searchClause');
    if (inputElement) {
        log("inputElement ('.searchClause') exists");
        inputElement.addEventListener('keydown', function (event) {
            log("event triggered ('keydown')");
            if (event.key === "Enter") {
                log("event key is Enter");
                event.preventDefault();
                setTimeout(function () {
                    log("setTimeout with 300ms");
                    setWidthOfWidest();
                    addKeyDownEvent();
                }, 300);
            } else {
                log("event key is not Enter");
            }
        });
        log("keydown event added to inputElement ('.searchClause')");
    } else {
        log("inputElement ('.searchClause') does not exist");
    }
}

// Log only if logging is enabled
function log(text) {
    chrome.storage.sync.get(['loggingEnabled'], function (result) {
        if (result.loggingEnabled) {
            console.info("[PhpMyAdmin Extension] " + text);
        }
    });
}
