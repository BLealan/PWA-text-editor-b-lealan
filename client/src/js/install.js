const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Event handler for `beforeinstallprompt` event to check if user is able to install
window.addEventListener('beforeinstallprompt', (event) => {
    window.deferredPrompt = event;
    butInstall.classList.toggle('hidden', false);
});

// Click event handler for `butInstall` element - if unable to install 'nothing to report'
// prints, otherwise toggles element to hidden
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        return console.log('Nothing to report');
    }
    promptEvent.prompt();
    window.deferredPrompt = null;
    butInstall.classList.toggle('hidden', true);
});

// Handler for the `appinstalled` event added
window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
});
