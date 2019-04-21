var numFormat = wNumb({
  thousand: ' '
});

$(window).on("scroll touchmove", function () {

  var scrollPos = $(window).scrollTop();

  if (scrollPos > 50) {

    if (!$("header").hasClass("header-fixed")) {

      $("header").addClass("header-fixed");
    }


  } else {

    if ($("header").hasClass("header-fixed")) {

      $("header").removeClass("header-fixed");

    }

  }

});

$(window).resize(function () {

  slickResponsive();

});

$(window).on("load", function () {



});

var baseUrl = ""

$(document).ready(function () {

  // Map popup

  $(".realty-popup-wrapper .close").click(function () {

    $(".realty-popup-wrapper").fadeOut(250).removeClass("active");

  });

  // Map popup END

  // Team slider

  $(".team-slider").slick({
    slidesToShow: 4,
    slidesToScroll: 4,
    speed: 500,
    infinite: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true
        }
      }
    ]
  });

  // Team slider END

  // Reviews slider

  $(".reviews-slider").slick({
    slidesToShow: 3,
    slidesToScroll: 3,
    speed: 500,
    infinite: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true
        }
      }
    ]
  });

  // Reviews slider END

  // Contacts map

  ymaps.ready(function () {

    var mapCenter = [55.723207, 37.600],
        mapCenterMob = [55.723207, 37.603945];

    if ($("#mobile-indicator").css("display") == "block") {
      var mCenter = mapCenterMob;
    } else {
      var mCenter = mapCenter;
    }

    var myMap = new ymaps.Map('contactsMap', {
        center: mCenter,
        zoom: 16,
        controls: ['zoomControl']
      }, {}),

      myPlacemark = new ymaps.Placemark([55.723207, 37.603945], {
        hintContent: '',
        balloonContent: ''
      }, {
        // Опции.
        // Необходимо указать данный тип макета.
        iconLayout: 'default#image',
        // Своё изображение иконки метки.
        iconImageHref: 'images/map-pin.png',
        // Размеры метки.
        iconImageSize: [44, 51],
        // Смещение левого верхнего угла иконки относительно
        // её "ножки" (точки привязки).
        iconImageOffset: [-22, -51]
      });

    myMap.behaviors.disable('scrollZoom');

    myMap.geoObjects
      .add(myPlacemark);

    $(window).on("resize", function () {

      if ($("#mobile-indicator").css("display") == "block") {
        var mCenter = mapCenterMob;
      } else {
        var mCenter = mapCenter;
      }

      myMap.setCenter(mCenter);

    });

  });

  // Contacts map END

  slickResponsive();

  // Anchors

  $(".navbar-nav a").click(function() {

    $(".navbar-nav a").removeClass("active");

    var curLink = $(this);

    var anchor = $(this).attr("href").replace("#","");

    var link = $(this);

    if ($("#mobile-indicator").css("display") == "block") {
      var yDiff = 70;
    } else {
      var yDiff = 150;
    }

    $("html,body").animate({
      scrollTop: $("a[name='"+anchor+"']").offset().top - yDiff
    },1000,function () {
      curLink.addClass("active")
    });

    history.pushState(null,null,$(this).attr("href"));

    return false;

  });

  $("[data-target='#serviceModal']").click(function () {

    $("#service_type").val($(this).closest(".service-tmb").find(".h3").html().replace("<br>"," "));

  });

  $("[data-target='#teamModal']").click(function () {

    $("#team_person").val($(this).closest(".team-tmb").find(".h3").html().replace("<br>"," "));

  });

  $("#callbackForm").submit(function() {
    if ($(this).valid()) {
      var form = $(this);
      $.ajax({
        type: "POST",
        url: baseUrl + "order.php",
        data: {
          subject: "Яуза — заявка на обратный звонок",
          name: $("#callback_name").val(),
          phone: $("#callback_phone").val()
        }
      }).done(function() {

        formSuccess(form);

      });
      return false;
    }
  });

  $("#topForm").submit(function() {
    if ($(this).valid()) {
      var form = $(this);
      $.ajax({
        type: "POST",
        url: baseUrl + "order.php",
        data: {
          subject: "Яуза — заявка",
          name: $("#top_name").val(),
          phone: $("#top_phone").val()
        }
      }).done(function() {

        formSuccess(form);

      });
      return false;
    }
  });

  $("#serviceForm").submit(function() {
    if ($(this).valid()) {
      var form = $(this);
      $.ajax({
        type: "POST",
        url: baseUrl + "order.php",
        data: {
          subject: "Яуза — заказ пакет услуг",
          type: $("#service_type").val(),
          name: $("#service_name").val(),
          phone: $("#service_phone").val()
        }
      }).done(function() {

        formSuccess(form);

      });
      return false;
    }
  });

  $("#teamForm").submit(function() {
    if ($(this).valid()) {
      var form = $(this);
      $.ajax({
        type: "POST",
        url: baseUrl + "order.php",
        data: {
          subject: "Яуза — связь со специалистом",
          person: $("#team_person").val(),
          name: $("#team_name").val(),
          phone: $("#team_phone").val()
        }
      }).done(function() {

        formSuccess(form);

      });
      return false;
    }
  });

  $("#realtyPopupForm").submit(function() {
    if ($(this).valid()) {
      var form = $(this);
      $.ajax({
        type: "POST",
        url: baseUrl + "order.php",
        data: {
          subject: "Яуза — консультация по району",
          district: $("#realty_popup_district").val(),
          phone: $("#realty_popup_phone").val()
        }
      }).done(function() {

        formSuccess(form);

      });
      return false;
    }
  });

  $("#orderForm").submit(function() {
    if ($(this).valid()) {
      var form = $(this);
      $.ajax({
        type: "POST",
        url: baseUrl + "order.php",
        data: {
          subject: "Яуза — заявка",
          realtytype: $("#order_type").val(),
          realtybudget: $("#order_budget").val(),
          name: $("#order_name").val(),
          phone: $("#order_phone").val(),
          realtymessage: $("#order_message").val()
        }
      }).done(function() {

        formSuccess(form);

      });
      return false;
    }
  });


  var scrollPos = $(window).scrollTop();

  if (scrollPos > 50) {

    if (!$("header").hasClass("header-fixed")) {

      $("header").addClass("header-fixed");
    }


  } else {

    if ($("header").hasClass("header-fixed")) {

      $("header").removeClass("header-fixed");

    }

  }

  // Main menu

  $(".navbar-trigger").click(function () {

    $(this).toggleClass("active");

    $(".navbar-wrapper").fadeToggle(150);
    $("body").toggleClass("menu-open");

  });

  $(".navbar-wrapper .close, .navbar-wrapper a").click(function () {

    $(".navbar-wrapper").fadeOut(150);
    $("body").removeClass("menu-open");

    $(".navbar-trigger").removeClass("active");

  });

  $(".navbar-wrapper").click(function (e) {

    if (!$(e.target).hasClass("navbar-wrapper-inner") && !$(e.target).parents().hasClass("navbar-wrapper-inner")) {

      $(".navbar-wrapper").fadeOut(150);
      $("body").removeClass("menu-open");

      $(".navbar-trigger").removeClass("active");

    }

  });


  // Numeric input

  $(document).on("input", ".numeric", function() {
    this.value = this.value.replace(/\D/g,'');
  });


  // Fancybox

  $("a.fancybox").fancybox();

  $(".fancybox[data-type=iframe]").fancybox({
    helpers : {
      media : {}
    },
    type: "iframe"
  });

  // Forms

  $("body").on("mouseup", "li.dropdown-header", function () {
    $(this).toggleClass("active");
    $(this).nextAll("li[data-optgroup='" + $(this).data("optgroup") + "']").fadeToggle(150);
    return false;
  });

  $("select").not(".picker__select--month, .picker__select--year").each(function () {
    if ($(this).attr("multiple")) {
      $(this).selectpicker({
        selectAllText: "Выбрать всё",
        deselectAllText: "Снять выбор",
        selectedTextFormat: "count",
        countSelectedText: function(count) {
          return count + " " + declOfNum(count, ['элемент', 'элемента', 'элементов']);
        }
      });
    } else {
      $(this).selectpicker({
        selectAllText: "Выбрать всё",
        deselectAllText: "Снять выбор"
      });
    }
  });

  $("select[multiple]").not(".simple-multi").on("shown.bs.select",function () {
    if (!$(this).prev(".dropdown-menu").find(".dropdown-footer").length) {
      dropdownFooter = '\
      <div class="dropdown-footer">\
      <div class="btn btn-1 btn-ico btn-save">Выбрать</div>\
      <div class="btn btn-cancel">Очистить</div>\
      </div>\
      ';
      $(this).prev(".dropdown-menu").find("ul").append(dropdownFooter);
    }
  });



  $("body").on("click",".bootstrap-select .btn-save", function () {
    $(this).closest("div.dropdown-menu").next("select").selectpicker("toggle");
    return false;
  });

  $("body").on("click",".bootstrap-select .btn-cancel", function () {
    $(this).closest("div.dropdown-menu").next("select").selectpicker('deselectAll');
    return false;
  });





  $('.input-numeric').bind('keyup paste', function(){
    this.value = this.value.replace(/[^0-9]/g, '');
  });

  if ($("input:text").length) {
    $("input:text").each(function() {
      if ($(this).val()) {
        $(this).prev(".placeholder").hide();
      }
    });
  }

  if ($("textarea").length) {
    $("textarea").each(function() {
      if ($(this).val()) {
        $(this).prev(".placeholder").hide();
      }
    });
  }

  $("body").on("focus","input, textarea",function() {
    var el = $(this);

    if (el.parent().find(".placeholder").length) {
      var placeholder = el.parent().find(".placeholder");

      placeholder.hide();

    }

  });

  $("body").on("blur","input, textarea",function() {
    var el = $(this);

    if (el.parent().find(".placeholder").length) {
      var placeholder = el.parent().find(".placeholder");

      if (!el.val() || (el.hasClass("input-phone") && ! /^(?=.*[0-9])[- +()0-9]+$/.test(el.val()))) {
        placeholder.show();
      }

    }

  });

  $("body").on("click",".placeholder",function(e) {
    if ($(this).parent().find("input").length) {
      $(this).parent().find("input").trigger("focus");
    }
    if ($(this).parent().find("textarea").length) {
      $(this).parent().find("textarea").trigger("focus");
    }
  });

  $("body").on("focus","input[type=text], input[type=email], input[type=password], textarea", function () {
    $(this).closest(".form-item").addClass("focus");
  });

  $("body").on("blur","input[type=text], input[type=email], input[type=password], textarea", function () {
    $(this).closest(".form-item").removeClass("focus")
  });

  validateForms();

});

function validateForms() {

  $("input.input-phone").mask("+7 (999) 999-99-99");

  jQuery.validator.addClassRules('phone-email-group', {
    require_from_group: [1, ".phone-email-group"]
  });

  $("select").on("change", function () {
    if (!$(this).closest(".picker").length) {
      $(this).valid();
    }
  });

  $("body").on("click", ".form-item", function (e) {
    if ($(this).find(".bootstrap-select").length && !$(e.target).hasClass("bootstrap-select") && !$(e.target).parents().hasClass("bootstrap-select")) {
      $(e.target).closest(".form-item").find("select").selectpicker('toggle');
    }
  });

  $("form").each(function() {

    form = $(this);

    $(this).validate({
      focusInvalid: true,
      sendForm : false,
      errorPlacement: function(error, element) {
        if (element[0].tagName == "SELECT") {
          element.closest(".form-item").addClass("error");
          element.closest(".btn-group").addClass("btn-group-error");
          if (element.closest(".form-item").length) {
            error.insertAfter(element.closest(".form-item"));
          } else {
            error.insertAfter(element.closest(".btn-group"));
          }
        } else {
          if (element.attr("type") == "checkbox") {
            element.siblings("label").addClass("checkbox-label-error")
          } else {
            error.insertAfter(element);
          }
        }

      },
      unhighlight: function(element, errorClass, validClass) {
        $(element).removeClass(errorClass);
        $(element).closest(".form-item").removeClass("error").addClass("valid");

        if ($(element)[0].tagName == "SELECT") {
          $(element).closest(".form-item").removeClass("error");
          $(element).closest(".btn-group").removeClass("btn-group-error");
          if ($(element).closest(".form-item").length) {
            error.insertAfter(element.closest(".form-item"));
            $(element).closest(".form-item").next("label.error").remove();
          } else {
            $(element).closest(".btn-group").next("label.error").remove();
          }
        } else {
          $(element).next(".error").remove();
          if ($(element).attr("type") == "checkbox") {
            $(element).siblings("label").removeClass("checkbox-label-error")
          }
        }
      },
      invalidHandler: function(form, validatorcalc) {
        var errors = validatorcalc.numberOfInvalids();
        if (errors && validatorcalc.errorList[0].element.tagName == "INPUT") {
          validatorcalc.errorList[0].element.focus();
        }
      }
    });

    if ($(this).find("input.password").length && $(this).find("input.password-repeat").length) {
      $(this).find("input.password-repeat").rules('add', {
        equalTo: "#"+form.find("input.password").attr("id")
      });
    }

  });

}

jQuery.extend(jQuery.validator.messages, {
  required: "Не заполнено поле",
  remote: "Please fix this field.",
  email: "Введите правильный e-mail.",
  url: "Please enter a valid URL.",
  date: "Please enter a valid date.",
  dateISO: "Please enter a valid date (ISO).",
  number: "Please enter a valid number.",
  digits: "Please enter only digits.",
  creditcard: "Please enter a valid credit card number.",
  equalTo: "Пароли не совпадают.",

  accept: "Please enter a value with a valid extension.",
  maxlength: jQuery.validator.format("Please enter no more than {0} characters."),
  minlength: jQuery.validator.format("Please enter at least {0} characters."),
  rangelength: jQuery.validator.format("Please enter a value between {0} and {1} characters long."),
  range: jQuery.validator.format("Please enter a value between {0} and {1}."),
  max: jQuery.validator.format("Please enter a value less than or equal to {0}."),
  min: jQuery.validator.format("Please enter a value greater than or equal to {0}.")
});

function declOfNum(number, titles) {
  cases = [2, 0, 1, 1, 1, 2];
  return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
}

function readURL(input, img) {

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function(e) {
      img.attr('src', e.target.result);
    }

    reader.readAsDataURL(input.files[0]);
  }
}




function declOfNum(number, titles) {
  cases = [2, 0, 1, 1, 1, 2];
  return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
}

function formSuccess(form) {

  form.find(".form-group input, .form-group textarea").val("");
  form.find(".placeholder").show();
  $("#successModal").modal("show");
  form.closest(".modal").modal("hide");
}

function slickResponsive() {

  if ($("#mobile-indicator").css("display") == "block") {

    if (!$(".team-list .row").hasClass("slick-initialized")) {

      $(".team-list .row").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: false,
        dots: true
      });

    }

  } else {

    if ($(".team-list .row").hasClass("slick-initialized")) {
      $(".team-list .row").slick("unslick");
    }

  }

}