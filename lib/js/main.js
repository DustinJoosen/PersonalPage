
$(document).ready(function () {
    $(".animated-text").each(function (i, obj) {
        let text = obj.getAttribute("content");
        if (text == null) {
            text = obj.innerHTML;
        }

        let c = 0;
        let thread = setInterval(function () {
            obj.innerHTML += text[c];
            c++;

            if (c >= text.length) {
                clearInterval(thread);
                obj.classList.add("underline");
            }

        }, 80);

    });

    $(".project").on("click", function () {
        let href = $(this).attr("content");
        if (href == null) {
            return;
        }

        window.open(href);
    })
});
