//onDOMload
document.addEventListener('DOMContentLoaded', function() {
   Waves.init({duration: 900});
}, false);

//turbolink fix
$(document).on('ready page:change', function() {
    Waves.init({duration: 900});
});
