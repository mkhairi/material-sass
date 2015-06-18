//onDOMload
document.addEventListener('DOMContentLoaded', function() {
   Waves.displayEffect({duration: 900});
}, false);

//turbolink fix
$(document).on('ready page:change', function() {
    Waves.displayEffect({duration: 900});
});