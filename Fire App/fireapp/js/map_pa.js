// Create the tile layer that will be the background of our map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    minZoom: 7,
    id: "light-v10",
    accessToken: API_KEY
});


// Initialize all of the LayerGroups we'll be using
var layers_pa = {
    Arson: new L.LayerGroup(),
    Campfire: new L.LayerGroup(),
    Children: new L.LayerGroup(),
    Debris_Burning: new L.LayerGroup(),
    Equipment_Use: new L.LayerGroup(),
    Fireworks: new L.LayerGroup(),
    Lightning: new L.LayerGroup(),
    Miscellaneous: new L.LayerGroup(),
    Missing_Undefined: new L.LayerGroup(),
    Powerline: new L.LayerGroup(),
    Railroad: new L.LayerGroup(),
    Smoking: new L.LayerGroup(),
    Structure: new L.LayerGroup(),
    Other: new L.LayerGroup()
  };
  
  // Create the map with our layers_pa
  var map_pa = L.map("map-pa", {
    center: [41.2, -77.1959],
    zoom: 7,
    layers: [
      layers_pa.Arson,
      layers_pa.Campfire,
      layers_pa.Children,
      layers_pa.Debris_Burning,
      layers_pa.Equipment_Use,
      layers_pa.Fireworks,
      layers_pa.Lightning,
      layers_pa.Miscellaneous,
      layers_pa.Missing_Undefined,
      layers_pa.Powerline,
      layers_pa.Railroad,
      layers_pa.Smoking,
      layers_pa.Structure,
      layers_pa.Other
    ]
  });
  
  // Add our 'lightmap' tile layer to the map
  lightmap.addTo(map_pa);
  
  // Create an overlays object to add to the layer control
  var overlays_pa = {
    "Arson": layers_pa.Arson,
    "Campfire": layers_pa.Campfire,
    "Children": layers_pa.Children,
    "Debris Burning": layers_pa.Debris_Burning,
    "Equipment Use": layers_pa.Equipment_Use,
    "Fireworks": layers_pa.Fireworks,
    "Lightning": layers_pa.Lightning,
    "Miscellaneous": layers_pa.Miscellaneous,
    "Missing/Undefined": layers_pa.Missing_Undefined,
    "Powerline": layers_pa.Powerline,
    "Railroad": layers_pa.Railroad,
    "Smoking": layers_pa.Smoking,
    "Structure": layers_pa.Structure,
    "Other": layers_pa.Other
  };

  // Create a control for our layers_pa, add our overlay layers_pa to it
  L.control.layers(null, overlays_pa).addTo(map_pa);
  
  // Create a legend to display information about our map
  var info = L.control({
    position: "bottomright"
  });
  
  // When the layer control is added, insert a div with the class of "legend"
  info.onAdd = function() {
    var div = L.DomUtil.create("div", "legend_pa");
    return div;
  };
  // Add the info legend to the map
  info.addTo(map_pa);
  
  // Initialize an object containing icons for each layer group
  var icons = {
    Arson: L.icon({
      iconUrl: "../img/redfireicon.png",
      iconSize: [30,30],
      iconAnchor: [15,30],
      popupAnchor: [0,-30]
    }),
    Campfire: L.icon({
      iconUrl: "../img/bluefireicon.png",
      iconSize: [30,30],
      iconAnchor: [15,30],
      popupAnchor: [0,-30]
    }),
    Children: L.icon({
      iconUrl: "../img/blackfireicon.png",
      iconSize: [30,30],
      iconAnchor: [15,30],
      popupAnchor: [0,-30]
    }),
    Debris_Burning: L.icon({
      iconUrl: "../img/brownfireicon.png",
      iconSize: [30,30],
      iconAnchor: [15,30],
      popupAnchor: [0,-30]
    }),
    Equipment_Use: L.icon({
      iconUrl: "../img/greenfireicon.png",
      iconSize: [30,30],
      iconAnchor: [15,30],
      popupAnchor: [0,-30]
    }),
    Fireworks: L.icon({
      iconUrl: "../img/yellowfireicon.png",
      iconSize: [30,30],
      iconAnchor: [15,30],
      popupAnchor: [0,-30]
    }),
    Lightning: L.icon({
      iconUrl: "../img/purplefireicon.png",
      iconSize: [30,30],
      iconAnchor: [15,30],
      popupAnchor: [0,-30]
    }),
    Miscellaneous: L.icon({
      iconUrl: "../img/orangefireicon.png",
      iconSize: [30,30],
      iconAnchor: [15,30],
      popupAnchor: [0,-30]
    }),
    Missing_Undefined: L.icon({
      iconUrl: "../img/greyfireicon.png",
      iconSize: [30,30],
      iconAnchor: [15,30],
      popupAnchor: [0,-30]
    }),
    Powerline: L.icon({
      iconUrl: "../img/pinkfireicon.png",
      iconSize: [30,30],
      iconAnchor: [15,30],
      popupAnchor: [0,-30]
    }),
    Railroad: L.icon({
      iconUrl: "../img/lightblueicon.png",
      iconSize: [30,30],
      iconAnchor: [15,30],
      popupAnchor: [0,-30]
    }),
    Smoking: L.icon({
      iconUrl: "../img/limefireicon.png",
      iconSize: [30,30],
      iconAnchor: [15,30],
      popupAnchor: [0,-30]
    }),
    Structure: L.icon({
      iconUrl: "../img/lightgreyicon.png",
      iconSize: [30,30],
      iconAnchor: [15,30],
      popupAnchor: [0,-30]
    }),
    Other: L.icon({
      iconUrl: "../img/maroonfireicon.png",
      iconSize: [30,30],
      iconAnchor: [15,30],
      popupAnchor: [0,-30]
    }),
  };
  
  // Perform an API call to the Citi Bike Station Information endpoint
  d3.json("http://127.0.0.1:5000/api/fire_log_pa", function(fireLog) {
  
      // Create an object to keep of the number of markers in each layer
      var fireCount = {
        Arson: 0,
        Campfire: 0,
        Children: 0,
        Debris_Burning: 0,
        Fireworks: 0,
        Equipment_Use: 0,
        Lightning: 0,
        Miscellaneous: 0,
        Missing_Undefined:0,
        Powerline:0,
        Railroad: 0,
        Smoking: 0,
        Structure: 0,
        Other: 0
      };
  
      // Initialize a stationStatusCode, which will be used as a key to access the appropriate layers_pa, icons, and station count for layer group
      var firetypeCode;
  
      // Loop through the stations (they're the same size and have partially matching data)
      for (var i = 0; i < fireLog.length; i++) {
        var fire = fireLog[i]
        
        // If a station is listed but not installed, it's coming soon
        if (fire.stat_cause_descr == "Arson") {
          firetypeCode = "Arson";
        }
        // If a station has no bikes available, it's empty
        else if (fire.stat_cause_descr == "Campfire") {
          firetypeCode = "Campfire";
        }
        // If a station is installed but isn't renting, it's out of order
        else if (fire.stat_cause_descr == "Children") {
          firetypeCode = "Children";
        }
        // If a station has less than 5 bikes, it's status is low
        else if (fire.stat_cause_descr == "Debris Burning") {
          firetypeCode = "Debris_Burning";
        }
        // Otherwise the station is normal
        else if (fire.stat_cause_descr == "Equipment Use") {
          firetypeCode = "Equipment_Use";
        }
        else if (fire.stat_cause_descr == "Fireworks") {
          firetypeCode = "Fireworks";
        }
        else if (fire.stat_cause_descr == "Lightning") {
          firetypeCode = "Lightning";
        }
        else if (fire.stat_cause_descr == "Miscellaneous") {
          firetypeCode = "Miscellaneous";
        }
        else if (fire.stat_cause_descr == "Missing/Undefined") {
          firetypeCode = "Missing_Undefined";
        }
        else if (fire.stat_cause_descr == "Powerline") {
          firetypeCode = "Powerline";
        }
        else if (fire.stat_cause_descr == "Railroad") {
          firetypeCode = "Railroad";
        }
        else if (fire.stat_cause_descr == "Smoking") {
          firetypeCode = "Smoking";
        }
        else if (fire.stat_cause_descr == "Structure") {
          firetypeCode = "Structure";
        }
        else {
          firetypeCode = "Other"
        }
  
        // Update the station count
        fireCount[firetypeCode]++;
        // Create a new marker with the appropriate icon and coordinates
        var newMarker = L.marker([fire.latitude, fire.longitude], {
          icon: icons[firetypeCode]
        });
  
        // Add the new marker to the appropriate layer
        newMarker.addTo(layers_pa[firetypeCode]);
  
        // Bind a popup to the marker that will  display on click. This will be rendered as HTML
        newMarker.bindPopup("Fire Name: " + fire.fire_name + "<br> Type: " + fire.stat_cause_descr + "<br> Reporting Agency: " + fire.nwcg_reporting_unit_name);
      }
  
      // Call the updateLegend function, which will... update the legend!
      updateLegend_pa(fireCount);
    });

  
  // Update the legend's innerHTML with the last updated time and station count
  function updateLegend_pa(fireCount) {
    document.querySelector(".legend_pa").innerHTML = [
      "<p class='Arson'>Arson: " + fireCount.Arson + "</p>",
      "<p class='Campfire'>Campfire: " + fireCount.Campfire + "</p>",
      "<p class='Children'>Children: " + fireCount.Children + "</p>",
      "<p class='Debris_Burning'>Debris Burning: " + fireCount.Debris_Burning + "</p>",
      "<p class='Equipment_Use'>Equipment Use: " + fireCount.Equipment_Use + "</p>",
      "<p class='Fireworks'>Fireworks: " + fireCount.Fireworks + "</p>",
      "<p class='Lightning'>Lightning: " + fireCount.Lightning + "</p>",
      "<p class='Miscellaneous'>Miscellaneous: " + fireCount.Miscellaneous + "</p>",
      "<p class='Missing_Undefined'>Missing: " + fireCount.Missing_Undefined + "</p>",
      "<p class='Powerline'>Powerline: " + fireCount.Powerline + "</p>",
      "<p class='Railroad'>Railroad: " + fireCount.Railroad + "</p>",
      "<p class='Smoking'>Smoking: " + fireCount.Smoking + "</p>",
      "<p class='Structure'>Structure: " + fireCount.Structure + "</p>",
      "<p class='Other'>Other: " + fireCount.Other + "</p>"
    ].join("");
  }