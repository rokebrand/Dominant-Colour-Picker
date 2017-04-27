jQuery(document).ready(function () {
    //fillBackground();

    // Event handlers
    jQuery("body").on("click", ".run-functions-button", function (event) {
        event.preventDefault();
        var cthis = jQuery(this);
        var cimageSection = cthis.closest(".image-section");
        var ccolorThiefOutput = cimageSection.find(".color-thief-output");
        var ctargetimage = cimageSection.find(".target-image");
        showColorsForImage(ctargetimage, cimageSection);
    });

    jQuery("body").on("click", ".swatch", function (event) {
        event.preventDefault();
        var cthis = jQuery(this);
        var thisBgColor = cthis.css("background-color");
        cthis.closest(".colourWrapper").find(".finalColour input").val(thisBgColor).trigger('input');
        cthis.closest(".colourWrapper").find(".finalColour span").css("background-color", thisBgColor);
        console.log("colour assigned :" + thisBgColor)
    });

    //jQuery(".colourWrapper").on("click", ".resetColour", function (event) {
    //    event.preventDefault();
    //    jQuery(this).parent.find(".finalColour input").val("");
    //    jQuery(this).parent.find(".finalColour span").css("background-color", "#FFFFFF");
    //});
});



var colorThief = new ColorThief();

// Run Color Thief functions and display results below image.
// We also log execution time of functions for display.
var showColorsForImage = function (cimage, cimageSection) {
    var image = cimage[0];
    var start = Date.now();
    var color = colorThief.getColor(image);
    var elapsedTimeForGetColor = Date.now() - start;
    var palette = colorThief.getPalette(image);
    var elapsedTimeForGetPalette = Date.now() - start + elapsedTimeForGetColor;

    var colorThiefOutput = {
        color: color,
        palette: palette,
        elapsedTimeForGetColor: elapsedTimeForGetColor,
        elapsedTimeForGetPalette: elapsedTimeForGetPalette
    };

    var template = "<div class=\"function get-color\"><h3 class=\"function-title smartcol\">Dominant Colour</h3><div class=\"swatches\"><div class=\"swatch\" style=\"background-color: rgb({{color.0}}, {{color.1}}, {{color.2}})\"></div></div></div><div class=\"function get-palette\"><h3 class=\"function-title smartcol\">Palette</h3><div class=\"function-output\"><div class=\"swatches\">{{#palette}}<div class=\"swatch\" style=\"background-color: rgb({{0}}, {{1}}, {{2}})\"></div>{{/palette}}</div></div></div>";
    //var colorThiefOuputHtml = Mustache.to_html(jQuery("#color-thief-output-template").html(), colorThiefOutput);
    var colorThiefOuputHtml = Mustache.to_html(template, colorThiefOutput);
    cimageSection.addClass("with-color-thief-output");
    cimageSection.find(".run-functions-button").addClass("hide");
    cimageSection.find(".color-thief-output").append(colorThiefOuputHtml).slideDown();

    // If the color-thief-output div is not in the viewport or cut off, scroll down.
    var windowHeight = jQuery(window).height();
    var currentScrollPosition = jQuery("body").scrollTop();
    var outputOffsetTop = cimageSection.find(".color-thief-output").offset().top;
    if ((currentScrollPosition < outputOffsetTop) && (currentScrollPosition + windowHeight - 250 < outputOffsetTop)) {
        jQuery("body").animate({ scrollTop: outputOffsetTop - windowHeight + 200 + "px" });
    }
};

function fillBackground() {
    $(".colourWrapper").each(function () {
        if (jQuery(this).find(".finalColour input").val() !== "") {
            var bgColor = jQuery(this).find(".finalColour input").val();
            jQuery(this).find(".finalColour span").css("background-color", bgColor);
            console.log("found one");
        }
    })
}
