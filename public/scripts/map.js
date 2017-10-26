function initMap() {
  
  var mapOptions = {
    zoom: 6,
    center: new google.maps.LatLng(49.2827, 123.1207)
  };
  
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);
  var marker = new google.maps.Marker({
    map: map,
  });
  
  // infowindow = new google.maps.InfoWindow;
  
  var currentMarkers = [];

  var pos;
  map.addListener("rightclick", function(e) {
    pos = e.latLng;
    var cm = document.getElementById("context-menu");
    // map.setCenter(e.latLng);
    // marker.setPosition(e.latLng);
    console.log(e);
    $(cm).css("display", "inline");
    $(cm).css("top", e.pixel.y + $("#map").offset().top + "px");
    $(cm).css("left", e.pixel.x + "px");
    $(cm).css("background-color", "tomato");
  });

  $("body").on("click", function() {
    var cm = document.getElementById("context-menu");
    $(cm).css("display", "none");
  })

  $("#new-marker").on("click", function() {
    console.log(pos);
    var infoWindow = new google.maps.InfoWindow;
    var marker = new google.maps.Marker({
      map: map,
      position: pos, // GPS coords
      title: "hi",
    })
    marker.addListener("dblclick", function() { // Right to delete marker
      marker.setMap(null);
    });
    currentMarkers.push(marker);
  })


  // function addSingleMarker(markers)) {

  // }


  function addAllMarkers(markers) {
    for (var i = 0; i < markers.length; i++) {
      var contentString = `
        <ul>
          <li>latitude: ${markers[i].latitude}</li>
          <li>longitude: ${markers[i].longitude}</li>
          <li>title: ${markers[i].title}</li>
          <li>description: ${markers[i].description}</li>
          <li>image: <img src="${markers[i].image}" /></li>
          <li>url: <a href="${markers[i].url}">${markers[i].url}</a></li>
          <li>user_id: ${markers[i].user_id}</li>
          <li>type_id: ${markers[i].type_id}</li>
          <li>map_id: ${markers[i].map_id}</li>
          <li>created_at: ${markers[i].created_at}</li>
          <li>version: ${markers[i].version}</li>
        </ul>
      `;

      var infoWindow = new google.maps.InfoWindow({
        content: contentString
      });

      var marker = new google.maps.Marker({
        map: map,
        position: {lat: Number(markers[i].latitude.slice(0, 5)), lng: Number(markers[i].longitude.slice(0, 5))}, // GPS coords
        title: "hi",
        label: markers[i].title,
      })
      marker.addListener("dblclick", function() { // Right to delete marker
        marker.setMap(null);
      });
      marker.addListener("click", function() { // Right to delete marker
        infoWindow.open(map, marker);
      });
      currentMarkers.push(marker);
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

}

