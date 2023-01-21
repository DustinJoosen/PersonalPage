
$(document).ready(function () {
    // Handles the animated text.
    $(".animated-text").each(function (i, obj) {
        // Get the text to write to the element.
        let text = obj.getAttribute("content");
        if (text == null) {
            text = obj.innerHTML;
        }

        // Every 80ms, add a character to the element.
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

    // Every progress bar on the page will slowly fill up on page load.
    $("progress").each(function (i, obj) {
        let max_val = obj.value;
        obj.value = 0;

        let thread = setInterval(function () {
            obj.value++;

            if (obj.value === max_val) {
                clearInterval(thread);
            }
        }, 5)
    });

    // When clicking on an element with project class, redirect to the specified page.
    $(".project").on("click", function () {
        let href = $(this).attr("content");
        if (href == null) {
            return;
        }

        window.location.href = "projects/" + href;
    })
});
