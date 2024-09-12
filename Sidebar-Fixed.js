document.addEventListener('DOMContentLoaded', function() {

    var windowElem = window;
    var lastScrollTop = windowElem.scrollY;
    var wasScrollingDown = true;

    var sidebar = document.getElementById('sidebar');
    if (sidebar) {

        var initialSidebarTop = sidebar.getBoundingClientRect().top + windowElem.scrollY;
        var fixing = sidebar.getBoundingClientRect().top + windowElem.scrollY;

        windowElem.addEventListener('scroll', function() {

            var windowHeight = windowElem.innerHeight;
            var sidebarHeight = sidebar.offsetHeight;

            var scrollTop = windowElem.scrollY;
            var scrollBottom = scrollTop + windowHeight;

            var sidebarTop = sidebar.getBoundingClientRect().top + scrollTop;
            var sidebarBottom = sidebarTop + sidebarHeight;

            var heightDelta = Math.abs(windowHeight - sidebarHeight);
            var scrollDelta = lastScrollTop - scrollTop;

            var isScrollingDown = (scrollTop > lastScrollTop);
            var isWindowLarger = (windowHeight > sidebarHeight);

            if ((isWindowLarger && scrollTop > initialSidebarTop) || (!isWindowLarger && scrollTop > initialSidebarTop + heightDelta)) {
                sidebar.style.position = 'sticky';
            } else if (!isScrollingDown && scrollTop <= initialSidebarTop) {
                sidebar.style.top = '0px';
            }

            var dragBottomDown = (sidebarBottom <= scrollBottom  && isScrollingDown);
            var dragTopUp = (sidebarTop >= scrollTop && !isScrollingDown);

            if (dragBottomDown) {
                if (isWindowLarger) {
                    sidebar.style.top = '0px';
                } else {
                    sidebar.style.top = (-heightDelta) + 'px';
                }
            } else if (dragTopUp) {
                sidebar.style.top = '0px';
            } else if (sidebar.style.position === 'sticky') {
                var currentTop = parseInt(getComputedStyle(sidebar).top, 10);

                var minTop = -heightDelta;
                var scrolledTop = currentTop + scrollDelta;

                var isPageAtBottom = (scrollTop + windowHeight >= document.documentElement.scrollHeight);
                var newTop = (isPageAtBottom) ? minTop : scrolledTop;

                sidebar.style.top = newTop + 'px';
            }

            lastScrollTop = scrollTop;
            wasScrollingDown = isScrollingDown;



            //bazı çıktı alma, yazdırma işlemleri

            document.getElementById('currentTop').textContent = currentTop;
            document.getElementById('heightDelta').textContent = heightDelta;
            document.getElementById('minTop').textContent = minTop;
            document.getElementById('scrollDelta').textContent = scrollDelta;
            document.getElementById('scrolledTop').textContent = scrolledTop;
            document.getElementById('sbarTop').textContent = sidebarTop;
            document.getElementById('sbarBottom').textContent = sidebarBottom;
            document.getElementById('sbarHeight').textContent = sidebarHeight;
            document.getElementById('windowHeight').textContent = windowHeight;
            document.getElementById('scrollTop').textContent = scrollTop;
            document.getElementById('ww').textContent = document.documentElement.scrollHeight;
            document.getElementById('ispageatbottom').textContent = scrollTop + windowHeight;


        });
    }
});
