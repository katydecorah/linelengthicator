function divideChar() {
  var chars = $(".content").text().split("");
  var charsDiv = "";
  for (i = 0; i < chars.length; i++) {
    charsDiv += "<span>" + chars[i] + "</span>";
  }
  $(".content").html(charsDiv);
}

var charMax = 66;
var fSize = $("#fontSize").val();
var cWidth = $("#cWidth").val();

divideChar();

$("span:nth-child(" + charMax + ")").addClass("bing");
$("#cWidth").val($(".content").outerWidth());

/*
$("#charMax").keyup(function(){
  var charMax = $("#charMax").val();
  $("span").removeClass("bing");
  $("span:nth-child(" + charMax + ")").addClass("bing");
  $(".content").css("width","auto");
  $("span").removeClass("muted");
  $(".go").removeClass("active");
});
*/

var val = $("#charMax").val();
$("#rangeText").text(val);

function updateTextInput(val) {
  $("#rangeText").text(val);

  $("span").removeClass("bing");
  $("span:nth-child(" + val + ")").addClass("bing");
  $(".content").css("width", "auto");
  $("span").removeClass("muted");
  $(".go").removeClass("active");
}

$(".content").keyup(function () {
  var charMax = $("#charMax").val();
  divideChar();
  $("span:nth-child(" + charMax + ")").addClass("bing");
  $(this).removeAttr("style");
  $("span").removeClass("muted");
  $(".go").removeClass("active");
});

$(".go").click(function () {
  if ($(this).hasClass("active")) {
    $(this).removeClass("active");
    $(".content").css("width", "auto");
    $(".bing").removeClass("muted");
  } else {
    var charMax = $("#charMax").val();
    var charMaxWid = $("span:eq(" + charMax + ")").width();
    var fSize = $("#fontSize").val();
    var newWidth = 0;
    $("span:lt(" + charMax + ")").each(function () {
      newWidth += $(this).width();
    });
    var adjust = newWidth + fSize * 2 * 2 + charMaxWid; // adjust padding (2em) and add last value width
    $(".content").css("width", adjust);
    $("span").addClass("muted");
    $(this).addClass("active");
  }
});

$("#fontSize").keyup(function () {
  var fSize = $("#fontSize").val();
  $(".content")
    .css("font-size", fSize + "px")
    .css("width", "auto");
  $("span").removeClass("muted");
  $(".go").removeClass("active");
});

$("#break").click(function () {
  $(".content").toggleClass("break");
  $(this).toggleClass("active");
});

//////// resize plugin https://github.com/cowboy/jquery-resize

$(function () {
  $(".content").resize(function () {
    var elem = $(this);
    elem.closest(".container").find("#cWidth").val(elem.outerWidth());
  });
  $(".content").resize();
});
