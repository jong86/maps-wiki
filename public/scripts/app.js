
function initMap() {
  
    $(function () {
      var infoWindowTemplate = $("#infowindow-template").html();
      var compiledInfoWindowTemplate = Handlebars.compile(infoWindowTemplate);
    
      // Handlebars.registerHelper('convertTime', function (timeStamp) {
      //   return moment(timeStamp).fromNow();
      // });
  
    
      var mapOptions = {
        zoom: 15,
        center: new google.maps.LatLng(49.2827, -123.1207),
        // disableDefaultUI: true,
      };
      
      var map = new google.maps.Map(document.getElementById("map"), mapOptions);
      var marker = new google.maps.Marker({
        map: map,
      });
      
  
      
      var currentMarkers = {}; // Possibly to use for edit history
  
      var mapPos; // For storing google map latitude and longitude
      var markerType;
      var crosshair = document.getElementById("crosshair");
      var cm = document.getElementById("context-menu");
      var newMarkerMenu = document.getElementById("new-marker-menu");
      map.addListener("rightclick", function(event) { // Right-click context menu to create new marker
        mapPos = event.latLng;
        $(cm).css("left", event.pixel.x + "px");
        $(cm).css("top", event.pixel.y + $("#map").offset().top + "px");
        $(cm).css("display", "inline");
        $(crosshair).css("left", event.pixel.x - ($(crosshair).width() / 2) + "px");
        $(crosshair).css("top", event.pixel.y + $("#map").offset().top - ($(crosshair).height() / 2) + "px");
        $(crosshair).css("display", "inline");
      });
      
      $("body").on("click", function() { // Hides menus when anywhere on body is clicked
        $(cm).css("display", "none");
        $(crosshair).css("display", "none");
      })
      

      $(".marker-select-button").on("click", function(event) { // When marker type selected
        $(newMarkerMenu).css("left", $(cm).offset().left - ($(newMarkerMenu).width() / 2));
        $(newMarkerMenu).css("top", $(cm).offset().top - ($(newMarkerMenu).height()));
        $(newMarkerMenu).css("display", "inline");
        $(crosshair).css("display", "inline");
        $("#new-marker-form #image").val(randomBillMurray());
        markerType = $(this).data().markertype;
      })
      

      var QueryStringToHash = function QueryStringToHash (query) { // Turns serialized data into object
        var query_string = {};
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
          var pair = vars[i].split("=");
          pair[0] = decodeURIComponent(pair[0]);
          pair[1] = decodeURIComponent(pair[1]);
              // If first entry with this name
          if (typeof query_string[pair[0]] === "undefined") {
            query_string[pair[0]] = pair[1];
              // If second entry with this name
          } else if (typeof query_string[pair[0]] === "string") {
            var arr = [ query_string[pair[0]], pair[1] ];
            query_string[pair[0]] = arr;
              // If third or later entry with this name
          } else {
            query_string[pair[0]].push(pair[1]);
          }
        } 
        return query_string;
      };
      
      var markerTypeList = {
        food: 0,
        cafe: 1,
        bar: 2,
        view: 3,
        misc: 4
      }

      $("#new-marker-form").on("submit", function(event) { // Submits new marker form
        event.preventDefault();
        $(newMarkerMenu).css("display", "none");
        var extraData = {
          latitude: mapPos.lat,
          longitude: mapPos.lng,
          type_id: Number(markerTypeList[markerType]),
          map_id: 0
        };
        var data = $(this).serialize() + "&" + $.param(extraData);
        console.log("I send: ", data);
        $("#new-marker-menu form").trigger("reset");
        $.ajax({
          method: "POST",
          url: "/pins",
          data: data
        }).done(function(results) {
          var newMarkerObj = QueryStringToHash(data); 
          newMarkerObj.id = results[0]; 
          // console.log(newMarkerObj);
          createMarker(newMarkerObj);
          $(crosshair).css("display", "none");
        });
      })
      

      $("#new-marker-menu #cancel").on("click", function(event) { // Close new marker form
        event.preventDefault();
        $(newMarkerMenu).css("display", "none");
        $("#new-marker-menu form").trigger("reset");
      })
  

      
      function randomBillMurray() { // Helper function to generate random images for now
        var rand = Math.floor(Math.random() * 100 + 200);
        var url = `http://www.fillmurray.com/${rand}/300`;
        return url;
      }
  

      // Handlebars template:
      var sourceInfoWindow = `
      <div class="info-window" data-pin_id="{{id}}">
        <div class="info-window-display">
          <ul>
            <li><img src="{{image}}" /></li>
            <li>latitude: {{latitude}}</li>
            <li>longitude: {{longitude}}</li>
            <li>title: {{title}}</li>
            <li>description: {{description}}</li>
            <li>url: <a href="{{url}}">{{url}}</a></li>
            <li>user_id: {{user_id}}</li>
            <li>type_id: {{type_id}}</li>
            <li>map_id: {{map_id}}</li>
            <li>created_at: {{created_at}}</li>
            <li>version: {{version}}</li>
            <li>
              <button class="edit">edit</button>
              <button class="delete">delete</button>
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
            <input class="save" type="submit" value="save">
            <button class="cancel">cancel</button>
          </form>
        </div>
      </div>
      `;

      $(document).on("click", ".info-window .edit", function(event) {
        event.preventDefault();
        console.log($(this).closest(".info-window-edit"));
        $(this).parent().parent().parent().css("display", "none");
        $(this).parent().parent().parent().next().css("display", "inline");
      });
      
      $(document).on("click", ".info-window .cancel", function(event) {
        event.preventDefault();
        $(this).parent().parent().css("display", "none");
        $(this).parent().parent().prev().css("display", "inline");
      });
      
      $(document).on("click", ".info-window .save", function(event) { // For updating pin values
        event.preventDefault();

        var pin_id = $(this).parent().parent().parent().data("pin_id");

        var extraData = {
          // latitude: mapPos.lat, // need to update for 'this'
          // longitude: mapPos.lng, // need to update
          // type_id: Number(markerTypeList[markerType]), // need to update
          map_id: 0,
          pin_id: pin_id
        };
        var data = $(this).parent().serialize() + "&" + $.param(extraData);
        console.log("I send: ", data);

        $.ajax({
          method:"PUT",
          url: `pins/${pin_id}`,
          data: data
        }).then(function(results) {
          console.log("Edit complete:", results);
          $(this).parent().parent().css("display", "none");
          $(this).parent().parent().prev().css("display", "inline");
        });

      });
      
      $(document).on("click", ".info-window .delete", function(event) {
        event.preventDefault();
      });
      
      function createMarker(data) { // Gets called after submitting new marker form...
        var compiledInfoWindowTemplate = Handlebars.compile(sourceInfoWindow);
        var contentString = compiledInfoWindowTemplate(data);
        var infoWindow = new google.maps.InfoWindow({
          content: contentString
        });
        var iconPath = "icons/";
        var types = ["food.png", "cafe.png", "bar.png", "view.png", "misc.png"];
        var marker = new google.maps.Marker({
          map: map,
          position: new google.maps.LatLng(Number(data.latitude), Number(data.longitude)), // GPS coords
          title: data.description,
          label: data.title,
          draggable: true,
          icon: iconPath + types[Number(data.type_id)]
        })
        marker.addListener("dblclick", function() { // Right to delete marker
          marker.setMap(null);
        });
        marker.addListener("click", function() { // Right to delete marker
          infoWindow.open(map, marker);
        });
        currentMarkers[data.id] = marker;
      }
  
   
      var currentMap = 0;
      function retrievePins() { // Gets the pins for the current map
        $.ajax({
          method:"GET",
          url: `maps/${currentMap}/pins`
        }).then(function(results) {
          results.forEach(function(item) {
            createMarker(item);
          })
        }).catch(function(error) {
          console.log("Error loading pins.");
        });
      }
      retrievePins();


    });
  }
  