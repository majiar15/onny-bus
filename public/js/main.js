document.addEventListener("DOMContentLoaded", function() {
    "use strict";

    // Add active state to sidbar nav links
    let path = window.location.href;
    document.querySelectorAll('#layoutSidenav_nav .sb-sidenav a.nav-link').forEach(function(element) {

        if (element.href === path) {
            element.classList.add("active");
        }
    });
    // Toggle the side navigation
    document.querySelector('#sidebarToggle').addEventListener('click', function(event) {

        event.preventDefault();
        document.querySelector('body').classList.toggle('sb-sidenav-toggled');
    });
});