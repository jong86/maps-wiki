function initMap() {

  $(function () {

    //
    // Setup
    //

    var mapOptions = {
      zoom: 15,
      center: new google.maps.LatLng(49.2827, -123.1207),
      disableDefaultUI: true
    };
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);

    var currentMapID = 1;
    var currentMarkers = {}; // Stores all current markers displayed on map:
    var mapPos; // For storing google map latitude and longitude in mouse clicks
    var markerType; // For storing selected marker types when clicked



    //
    // Templates
    //

    var markerInfoWindow = `
    <div class="info-window" data-pin_id="{{id}}">
      <div class="info-window-display">
        <ul>
          <li><img src="{{image}}" /></li>
          <li>Title: {{title}}</li>
          <li>Description: {{description}}</li>
          <li>URL: <a href="{{url}}">{{url}}</a></li>
          <li>Created at: {{created_at}}</li>
          <li>
            <button class="edit btn btn-primary">edit</button>
            <button class="delete btn btn-primary">delete</button>
          </li>
        </ul>
      </div>
      <div class="info-window-edit">
        <form class="edit-marker-form">
          <ul>
            <li>
              <label for="title" class="noselect">Title:</label>
              <input class="input-field" class="title" type="text" name="title" /><br />
            </li>
            <li>
              <label for="description" class="noselect">Description:</label>
              <input class="input-field" class="description" type="text" name="description" /><br />
            </li>
            <li>
              <label for="image" class="noselect">Image:</label>
              <input class="input-field" class="image" type="text" name="image" /><br />
            </li>
            <li>
              <label for="url" class="noselect">URL:</label>
              <input class="input-field" class="url" type="text" name="url" /><br />
            </li>
          </ul>
          <input class="save btn btn-primary" type="submit" value="save">
          <button class="cancel btn btn-primary">cancel</button>
        </form>
      </div>
    </div>
    `;

    var iconsHTML = document.cookie ? `<i id="liked{{id}}" class="fa fa-heart liked"></i><i id="changed{{id}}" class="fa fa-pencil changed" style="color: orange;"></i>` : '';
    var sourceSidebarNewMap = `<li class="map-li noselect"><span id="list{{id}}" class="map-list-item" data-id="{{id}}">{{name}}</span>` + iconsHTML + `</li>`;



    //
    // Map Functions
    //

    // Creating a marker
    function createMarker (data) { // Gets called after submitting new marker form...
      var compiledMarkerWindowTemplate = Handlebars.compile(markerInfoWindow);
      var contentString = compiledMarkerWindowTemplate(data);
      // Information pop-up window:
      var infoWindow = new google.maps.InfoWindow({
        content: contentString
      });
      var iconPath = 'icons/';
      var types = ['food.png', 'cafe.png', 'bar.png', 'view.png', 'misc.png'];
      var marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(Number(data.latitude), Number(data.longitude)), // GPS coords
        title: data.description,
        label: {
          text: (data.title === '') ? ' ' : data.title,
          color: 'rgb(107, 80, 80)'
        },
        icon: {
          url: data.type,
          labelOrigin: new google.maps.Point(12, 32)
        },
        draggable: !!document.cookie
      });
      marker.addListener('dragend', function (event) {
        data.latitude = event.latLng.lat;
        data.longitude = event.latLng.lng;
        $.ajax({
          method: 'PUT',
          url: `pins/${data.id}`,
          data: data
        }).done(function (results) {
          markMapAsChangedOnClientSide(data.map_id);
        });
      });
      marker.addListener('click', function () {
        infoWindow.open(map, marker);
        if (!document.cookie) {
          $(".edit").hide();
          $(".delete").hide();
        } else {
          $(".edit").show();
          $(".delete").show();
        }
      });
      currentMarkers[data.id] = marker;
    }

    function loadMap (mapID) {
      for (pin in currentMarkers) {
        currentMarkers[pin].setMap(null);
      }
      currentMapID = mapID;
      retrievePins(mapID);
    }

    // Client-side "map edited" status
    function markMapAsChangedOnClientSide (map_id) {
      $(`#changed${map_id}`).css('color', 'orange');
    }

    // Removing pin on client-side (request also sent to server)
    function removePinFromClientMap (pin_id) {
      currentMarkers[pin_id].setMap(null);
      delete currentMarkers[pin_id];
    }

    // Get the pins for the current map
    function retrievePins (currentMapID) {
      $.ajax({
        method: 'GET',
        url: `maps/${currentMapID}/pins`
      }).done(function (results) {
        results.forEach(function (item) {
          createMarker(item);
        });
      })
    }

    // Show/hide login/logout buttons depending on cookie
    function refreshGuiForCookie () {
      if (document.cookie) {
        $('.login-button').hide();
        $('#logout-button').show();
      } else {
        $('#logout-button').hide();
        $('.login-button').show();
      }
    }



    //
    // Custom Map Controls
    //

    // For custom zoom controls
    function ZoomControl (controlDiv, map) {
      // Creating divs & styles for custom zoom control
      controlDiv.className = 'control-div';

      // Creates control wrapper:
      var controlWrapper = document.createElement('div');
      controlWrapper.className = 'control-wrapper';
      controlDiv.appendChild(controlWrapper);

      // Creates zoom buttons:
      var zoomInButton = document.createElement('div');
      zoomInButton.className = 'zoom-button zoom-in';
      zoomInButton.innerHTML = `<i class="fa fa-search-plus fa-2x" aria-hidden="true"></i>`;
      controlWrapper.appendChild(zoomInButton);

      var zoomOutButton = document.createElement('div');
      zoomOutButton.className = 'zoom-button zoom-out';
      zoomOutButton.innerHTML = `<i class="fa fa-search-minus fa-2x" aria-hidden="true"></i>`;
      controlWrapper.appendChild(zoomOutButton);

      // Setup the click event listener - zoomIn
      google.maps.event.addDomListener(zoomInButton, 'click', function () {
        map.setZoom(map.getZoom() + 1);
      });

      // Setup the click event listener - zoomOut
      google.maps.event.addDomListener(zoomOutButton, 'click', function () {
        map.setZoom(map.getZoom() - 1);
      });
    }

    var zoomControlDiv = document.createElement('div');
    var zoomControl = new ZoomControl(zoomControlDiv, map);

    zoomControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(zoomControlDiv);



    //
    // Other Helper Functions
    //

    // Helper function to generate random images for demo purposes
    function randomBillMurray () {
      var rand = Math.floor(Math.random() * 100 + 200);
      var url = `http://www.fillmurray.com/${rand}/300`;
      return url;
    }

    // To turn serialized data into object
    function queryStringToObject (query) {
      var query_string = {};
      var vars = query.split('&');
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        pair[0] = decodeURIComponent(pair[0]);
        pair[1] = decodeURIComponent(pair[1]);
        // If first entry with this name
        if (typeof query_string[pair[0]] === 'undefined') {
          query_string[pair[0]] = pair[1];
          // If second entry with this name
        } else if (typeof query_string[pair[0]] === 'string') {
          var arr = [ query_string[pair[0]], pair[1] ];
          query_string[pair[0]] = arr;
          // If third or later entry with this name
        } else {
          query_string[pair[0]].push(pair[1]);
        }
      }
      return query_string;
    };



    //
    // Event Listeners
    //

    var crosshair = document.getElementById('crosshair');
    var cm = document.getElementById('context-menu');
    var newMarkerMenu = document.getElementById('new-marker-menu');

    // Context menu that shows when user right-clicks
    map.addListener('rightclick', function (event) {
      if (!document.cookie) return;
      mapPos = event.latLng;
      $(cm).css('left', event.pixel.x + 'px');
      $(cm).css('top', event.pixel.y + $('#map').offset().top + 'px');
      $(cm).css('display', 'inline');
      $(crosshair).css('left', event.pixel.x - ($(crosshair).width() / 2) + 'px');
      $(crosshair).css('top', event.pixel.y + $('#map').offset().top - ($(crosshair).height() / 2) + 'px');
      $(crosshair).css('display', 'inline');
    });

    // Hides menus when anywhere on body is clicked
    $('body').on('click', function () {
      $(cm).css('display', 'none');
      $(crosshair).css('display', 'none');
    });

    // Handle selection of new marker type
    $('.marker-select-button').on('click', function (event) {
      $(newMarkerMenu).css('left', $(cm).offset().left - ($(newMarkerMenu).width() / 2));
      $(newMarkerMenu).css('top', $(cm).offset().top - ($(newMarkerMenu).height()));
      $(newMarkerMenu).css('display', 'inline');
      $(crosshair).css('display', 'inline');
      $('#new-marker-form #image').val(randomBillMurray());
      markerType = 'icons/' + $(this).data().markertype + '.png';
    });

    // Submit new marker
    $('#new-marker-form').on('submit', function (event) {
      event.preventDefault();
      $(newMarkerMenu).css('display', 'none');
      var extraData = {
        latitude: mapPos.lat,
        longitude: mapPos.lng,
        type: markerType,
        map_id: currentMapID
      };
      var data = $(this).serialize() + '&' + $.param(extraData);
      $('#new-marker-menu form').trigger('reset');
      $.ajax({
        method: 'POST',
        url: '/pins',
        data: data
      }).done(function (results) {
        var newMarkerObj = queryStringToObject(data);
        newMarkerObj.id = results[0];
        markMapAsChangedOnClientSide(extraData.map_id);
        createMarker(newMarkerObj);
        $(crosshair).css('display', 'none');
      });
    });

    // Cancel creation of new marker
    $('#new-marker-menu #cancel').on('click', function (event) { // Close new marker form
      event.preventDefault();
      $(newMarkerMenu).css('display', 'none');
      $('#new-marker-menu form').trigger('reset');
    });

    // To show marker edit form
    $(document).on('click', '.info-window .edit', function (event) {
      event.preventDefault();
      $(this).parent().parent().parent().css('display', 'none');
      $(this).parent().parent().parent().next().css('display', 'inline');
    });

    // Cancelling marker edit
    $(document).on('click', '.info-window .cancel', function (event) {
      event.preventDefault();
      $(this).parent().parent().css('display', 'none');
      $(this).parent().parent().prev().css('display', 'inline');
    });

    // Saving marker edit
    $(document).on('click', '.info-window .save', function (event) { // For updating pin values
      event.preventDefault();
      var pin_id = $(this).parent().parent().parent().data('pin_id');
      var extraData = {
        latitude: currentMarkers[pin_id].position.lat, // need to update for 'this'
        longitude: currentMarkers[pin_id].position.lng, // need to update
        type_id: currentMarkers[pin_id].type, // need to update
        map_id: currentMapID,
        pin_id: pin_id
      };
      var data = $(this).parent().serialize() + '&' + $.param(extraData);
      $.ajax({
        method: 'PUT',
        url: `pins/${pin_id}`,
        data: data
      }).done(function (results) {
        results.id = pin_id;
        results.type = currentMarkers[pin_id].icon.url;
        markMapAsChangedOnClientSide(data.map_id);
        removePinFromClientMap(pin_id);
        createMarker(results);
        $(this).parent().parent().css('display', 'none');
        $(this).parent().parent().prev().css('display', 'inline');
      });
    });

    // Deleting a marker
    $(document).on('click', '.info-window .delete', function (event) {
      event.preventDefault();
      var pin_id = $(this).parent().parent().parent().parent().data('pin_id');
      var data = {
        map_id: currentMapID
      };
      $.ajax({
        method: 'DELETE',
        url: `pins/${pin_id}`,
        data: data
      }).done(function (results) {
        markMapAsChangedOnClientSide(data.map_id);
        removePinFromClientMap(pin_id);
      });
    });

    // Changing map
    $(document).on('click', '.map-list-item', function (event) {
      event.preventDefault();
      event.stopPropagation();
      var map_id = $(this).data('id');
      loadMap(map_id);
      currentMapID = map_id;
      mapName = $(this).text();
      $('#mapname').text(`You are looking at map ${mapName}.`);
    });

    // Creating a map
    $('#create-new-map form').on('submit', function (event) {
      event.preventDefault();
      var name = $(this).children()[0].value;
      $.ajax({
        method: 'POST',
        url: '/maps/',
        data: { name: name }
      }).done(function (new_map_id) {
        var data = {
          id: new_map_id,
          name: name
        };
        var compiledSidebarNewMapTemplate = Handlebars.compile(sourceSidebarNewMap);
        var newMapItem = compiledSidebarNewMapTemplate(data);
        document.querySelector('ul.map-list').innerHTML = newMapItem + document.querySelector('ul.map-list').innerHTML;
      });
    });

    // Logging in
    $('.login-button').on('click', function (event) {
      $.ajax({
        method: 'POST',
        url: `/login/${$(this).data('id')}`
      }).done(function (response) {
        loadMap(currentMapID);
        location.reload();
      });
    });

    // Logging out
    $('#logout-button').on('click', function (event) {
      $.ajax({
        method: 'DELETE',
        url: '/login'
      }).done(function () {
        // This line clears all browser cookies:
        document.cookie.split(';').forEach(function (c) { document.cookie = c.replace(/^ +/, '').replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/'); });
        loadMap(currentMapID);
        location.reload();
      });
    });



    //
    // Initialization
    //

    loadMap(currentMapID);
    refreshGuiForCookie();

  })
}