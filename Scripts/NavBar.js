"use strict";

$(document).ready(function() {
    $("nav [href]").each(function() {
        if (this.href.split("?")[0] == window.location.href.split("?")[0]) {
            $(this).parent("li").css("border", "5px solid #f0db4f");	
        }
    });
});