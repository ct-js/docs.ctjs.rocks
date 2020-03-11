window.addEventListener('DOMContentLoaded', function () {
    if (location.href.indexOf('darkTheme=yep') !== -1) {
        document.body.classList.add('dark');
    }
});