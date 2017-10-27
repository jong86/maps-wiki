function initMap() {

  $(function () {
    var infoWindowTemplate = $("#infowindow-template").html();
    var compiledInfoWindowTemplate = Handlebars.compile(infoWindowTemplate);
  
    // Handlebars.registerHelper('convertTime', function (timeStamp) {
    //   return moment(timeStamp).fromNow();
    // });

  
    var mapOptions = {
      zoom: 6,
      center: new google.maps.LatLng(49.2827, 123.1207)
    };
    
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    var marker = new google.maps.Marker({
      map: map,
    });
    

    var currentMarkers = [];


    var pos;
    var crosshair = document.getElementById("crosshair");
    var cm = document.getElementById("context-menu");
    var newMarkerMenu = document.getElementById("new-marker-menu");
    map.addListener("rightclick", function(event) {
      pos = event.latLng;
      console.log(pos);
      $(cm).css("left", event.pixel.x + "px");
      $(cm).css("top", event.pixel.y + $("#map").offset().top + "px");
      $(cm).css("display", "inline");
      $(crosshair).css("left", event.pixel.x - ($(crosshair).width() / 2) + "px");
      $(crosshair).css("top", event.pixel.y + $("#map").offset().top - ($(crosshair).height() / 2) + "px");
      $(crosshair).css("display", "inline");
    });
    
    $("body").on("click", function() { // hides menus when anywhere else on body is clicked
      $(cm).css("display", "none");
      $(crosshair).css("display", "none");

    })
    
    $(".marker-select-button").on("click", function(event) {
      console.log(event);
      $(newMarkerMenu).css("left", $(cm).offset().left - ($(newMarkerMenu).width() / 2));
      $(newMarkerMenu).css("top", $(cm).offset().top - ($(newMarkerMenu).height()));
      $(newMarkerMenu).css("display", "inline");
      $(crosshair).css("display", "inline");
      $("#new-marker-form #image").val(randomBillMurray());
    })
    
    
    $("#new-marker-form").on("submit", function(event) { // Submits new marker form
      event.preventDefault();

      $(newMarkerMenu).css("display", "none");

      var extraData = {
        latitude: pos.lat,
        longitude: pos.lng
      };

      var data = $(this).serialize() + "&" + $.param(extraData);
      console.log(data);
      
      $("#new-marker-menu form").trigger("reset");
      $.ajax({
        method: "POST",
        url: "/pins",
        data: data
      }).done(function(results) {
        // console.log(data);
        console.log("results:", results);


        $(crosshair).css("display", "none");
        createMarker(results);
      });
    })
    
    $("#new-marker-menu #cancel").on("click", function(event) { // Submits new marker form
      event.preventDefault();
      $(newMarkerMenu).css("display", "none");
      $("#new-marker-menu form").trigger("reset");

    })


    function randomBillMurray() {
      var rand = Math.floor(Math.random() * 100 + 200);
      var url = `http://www.fillmurray.com/${rand}/300`;
      return url;
    }


    var sourceInfoWindow = `
    <ul>
      <li>latitude: {{latitude}}</li>
      <li>longitude: {{longitude}}</li>
      <li>title: {{title}}</li>
      <li>description: {{description}}</li>
      <li>image: <img src="{{image}}" /></li>
      <li>url: <a href="{{url}}">{{url}}</a></li>
      <li>user_id: {{user_id}}</li>
      <li>type_id: {{type_id}}</li>
      <li>map_id: {{map_id}}</li>
      <li>created_at: {{created_at}}</li>
      <li>version: {{version}}</li>
    </ul>`;
    
    function createMarker(data) { // Gets called after submitting new marker form...
      
      var compiledInfoWindowTemplate = Handlebars.compile(sourceInfoWindow);
      var contentString = compiledInfoWindowTemplate(data);

      var infoWindow = new google.maps.InfoWindow({
        content: contentString
      });

      var marker = new google.maps.Marker({
        map: map,
        position: {lat: Number(data.latitude.slice(0, 5)), lng: Number(data.longitude.slice(0, 5))}, // GPS coords
        title: data.description,
        label: data.title,
        draggable: true
      })
      marker.addListener("dblclick", function() { // Right to delete marker
        marker.setMap(null);
      });
      marker.addListener("click", function() { // Right to delete marker
        infoWindow.open(map, marker);
      });
      currentMarkers.push(marker);
    }




    function addAllMarkers(markers) {
      for (var i = 0; i < markers.length; i++) {
        createMarker(markers[i]);
      }
    }
    

    function retrievePins() {
      $.ajax({
        method: "GET",
        url: "/maps/0" // hard-coded 0 for now
      }).done(function(results) {
        if (results) {
          var markers = [];
          markers.push(results.id);
        }
        for (var i = 0; i < markers.length; i++) {
          $.ajax({
            method:"GET",
            url: `/pins/${i}}`
    
          }).done(function(results) {
            if (results) {
              console.log("results from pins", results);
              var markers = [results]; // temporarily makes an array for dev purposes
              addAllMarkers(markers);
            }
          })
        }
      });
    }
    
    retrievePins();

  });
}
