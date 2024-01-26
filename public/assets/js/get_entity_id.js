// common.js

function getEntityIdFromUrl() {
    var url = window.location.href;
    var parts = url.split('/');
    var id = parts[parts.length - 1];

    if (!isNaN(id)) {
        return parseInt(id, 10);
    }

    return null;
}
