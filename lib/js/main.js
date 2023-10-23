const RUN_AUTO_NAME = true;

$(document).ready(function() {

    if (RUN_AUTO_NAME) {
        let element = $(".auto-written-name");
    
        let options = [
            "Dustin",
            "Software developer",
            "C# enthusiast",
            "IT student",
            "GIT magician",
            "SQL wrangler",
            "MTA certified"
        ];

        replace_element_carousel(element, options);    
    }

    // Start slideshow
    showSlides(0);

    // Gradually do skills progress bar
    onVisible(document.getElementById("skills"), () => {
        $("progress").each((idx, element) => {
            let $element = $(element);

            let thread = setInterval(() => {
                let value = parseInt($element.attr("value"));

                if (value + 1 == parseInt($element.attr("j_value"))) {
                    clearInterval(thread);
                }

                $element.attr("value", parseInt(value)+1);

            }, 10);
        });
    })

});

var replace_element_carousel = (element, options) => {
    const longest_option = options.reduce((longest, current) => {
        return current.length > longest.length ? current : longest;
    }, "");

    const max_length = longest_option.length;
    const interval = (max_length * 70) + (max_length * 120) + 1200;

    let i = 1;
    let thread = setInterval(() => {
        if (!document.hasFocus()) {
            clearInterval(thread);
            replace_element_carousel(element, options);
            return;
        }
        replace_element(element, options[i++ % options.length]);
    }, interval);
    
}

var replace_element = (element, value) => {
    let value_length_in_ms =  $(".auto-written-name").text().length * 70;
    let waiting_time = value_length_in_ms + 1000;

    slowly_remove_letters(element);

    let thread = setTimeout(() => {
        if (!document.hasFocus()) {
            clearInterval(thread);
            replace_element(element, value);
            return;
        }

        slowly_add_letters(element, value);
    }, waiting_time);
}

// Removes the last letter of the element every 70ms.
var slowly_remove_letters = (element) => {
    let thread = setInterval(() => {
        element.text(element.text().slice(0,-1));
        if(element.text().length == 0) {
            clearInterval(thread);
            return;
        }
    }, 70);
};

// Adds one letter to the element, every 120ms.
var slowly_add_letters = (element, value) => {
    let c = 0;

    let thread = setInterval(() => {
        element.text(element.text() + value[c]);
        c++;

        if (c == value.length) {
            clearInterval(thread);
        }
    }, 120);
};


let showSlides = (slide_idx) => {
    let slides = $(".mySlides");
    let dots = $(".dot");

    for (let i = 0; i < slides.length; i++) {
        $(slides[i]).css("display", "none");
    }
    for (let i = 0; i < dots.length; i++) {
        $(dots[i]).removeClass("active");
    }

    $(slides[slide_idx]).css("display", "block");
    $(dots[slide_idx]).addClass("active");

    setTimeout(() => {
        if (slide_idx == 2) {
            showSlides(0);
            return;
        }
        showSlides(slide_idx + 1);
    }, 3000);
};


let goToTop = () => {
    $("html, body").animate({
        scrollTop: 0
    }, "slow");
}

let onVisible = (element, callback) => {
    new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.intersectionRatio > 0) {
                callback(element);
                observer.disconnect();
            }
        })
    }).observe(element);

    if (!callback) return new Promise(r => callback=r);
} 

