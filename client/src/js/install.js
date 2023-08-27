const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault(); // Prevent the default installation prompt
    const installButton = document.getElementById('buttonInstall');
    installButton.style.display = 'block'; // Show your custom install butto
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async (event) => {
    installButton.style.display = 'none'; // Hide the custom install button
    event.prompt(); // Show the native installation prompt
    const choiceResult = await event.userChoice;
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the installation');
    } else {
      console.log('User dismissed the installation');
    }
  });


// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('App was successfully installed');
  
});
