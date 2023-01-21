
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

    $(".project:not(.project-img)").on("click", function () {
        let href = $(this).attr("content");
        if (href == null) {
            return;
        }

        window.location.href = "projects/" + href + ".html";
    })

    $(".back-btn").on("click", function () {
        window.location.href = "../index.html";
    })
});

function isOnScreen (elem) {
    return false;
}

setInterval(function () {
    if (isOnScreen($(".skills-list"))) {
        $("progress").each(function (i, obj) {
            let max_val = obj.value;
            obj.value = 0;

            let thread = setInterval(function () {
                obj.value += 1;

                if (max_val === obj.value) {
                    clearInterval(thread);
                }
            })
        })
    }
})