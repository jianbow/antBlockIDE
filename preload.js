// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

//I HAVEN'T CHECKED, THIS MAY HAVE ALLOWED FOR EVENT LISTNER IN MYUPDATEFUNCTION() IN INDEX.HTML TO WORK
window.addEventListener('DOMContentLoaded', () => {
    for (const versionType of ['chrome', 'electron', 'node']) {
        document.getElementById(`${versionType}-version`).innerText = process.versions[versionType]
    }
})
