ymaps.ready(function () {

  var mapCenter = [55.910483, 37.736402],
    mapCenterMob = [55.910483, 37.736402];

  var mapMargin = {
      top: 0,
      left: 0,
      width: 400,
      height: '100%'
    };

  if ($("#mobile-indicator").css("display") == "block") {
    var mCenter = mapCenterMob;
  } else {
    var mCenter = mapCenter;
  }

  var myMap = new ymaps.Map('realtyMap', {
      center: mCenter,
      zoom: 14,
      controls: ['zoomControl']
    }, {});

  myMap.margin.addArea(mapMargin);

  ymaps.geoXml.load('http://realty-yauza.ru/templates/themes/default/load/map-objects-13.kml').then(onGeoXmlLoad);

  myMap.behaviors.disable('scrollZoom');

  $(window).on("resize", function () {

    if ($("#mobile-indicator").css("display") == "block") {
      var mCenter = mapCenterMob;
    } else {
      var mCenter = mapCenter;
    }

    myMap.setCenter(mCenter);

  });

  // Обработчик загрузки XML-файлов.
  function onGeoXmlLoad(res) {

    myMap.geoObjects.add(res.geoObjects);
    if (res.mapState) {
      res.mapState.applyToMap(myMap);
    }
    else {
      if ($("#mobile-indicator").css("display") == "block") {
        myMap.setBounds(res.geoObjects.getBounds(),{ useMapMargin: false });
      } else {
        myMap.setBounds(res.geoObjects.getBounds(),{ useMapMargin: true });
      }
    }

    $(window).on("resize", function () {

      if ($("#mobile-indicator").css("display") == "block") {
        myMap.setBounds(res.geoObjects.getBounds(),{ useMapMargin: false });
      } else {
        myMap.setBounds(res.geoObjects.getBounds(),{ useMapMargin: true });
      }

    });

    res.geoObjects.get(0).each(function (el, i) {

      el.options.set("hasBalloon", false)

      el.events.add('click', function (e) {

        var objId = el.properties.get("id");

        $(".realty-popup-content").hide();
        $(".realty-popup-content[data-id='" + objId + "']").show();

        $("#realty_popup_district").val($(".realty-popup-content[data-id='" + objId + "']").find(".realty-popup-inner .h3").html());

        myMap.container.fitToViewport();

        if (!$(".realty-popup-wrapper").hasClass("active")) {


          $(".realty-popup-wrapper").fadeIn(250, function () {

            myMap.container.fitToViewport();

          }).addClass("active");

        }

      });

    });

    // if (res.geoObjects.get(0).geometry == null){
    //   // Если геометрии нет, то это коллекция. Можно обработать вложенный объект.
    //   console.log("Тип объекта из вложенной коллекции: " + res.geoObjects.get(0).get(0).geometry.getType());
    // }
    // else{
    //   // Иначе можно обработать сам объект.
    //   console.log("Тип объекта верхнего уровня: " + res.geoObjects.get(0).geometry.getType());
    // }

  }

});