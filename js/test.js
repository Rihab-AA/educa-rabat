const icon_options = 
    {
        iconUrl: 'C:\Users\YASSINE HADDAD\Desktop\formation-en-topo\learn-html\web mapping\chor\prison.png',
        iconSize: [30, 30]
    }
const custom_icon = L.icon(icon_options)

const marker_options = 
    {
        icon: custom_icon
    }

    
var casa = L.geoJson(
    prison, 
    {
        filter: casaFilter,
    
        onEachFeature: function(feature, layer)
            {
                var marker = new L.Marker([x=?, y=?] ,marker_options)
                marker.addTo(map)
                
            }
    }).addTo(map)




const icon_options = 
    {
        iconUrl: './img/position.png',
        iconSize: [30, 30]
    }

// Creating a custom icon
const custom_icon = L.icon(icon_options)
 
// Options for the marker
const marker_options = 
    {
        //title: "Rent/BUY",
        clickable: true,
        draggable: true,
        icon: custom_icon
    }
$.getJSON("./asset/maroc.geojson", function(data)
    {    
        // add GeoJSON layer to the map once the file is loaded
        L.geoJson(data, 
            {
                style: function()
                    {
                        return { 
                            color: "#ff0000", 
                            weight: 3, 
                            fillColor: "#ff0000", 
                            fillOpacity: .7 
                        };
                    },

                onEachFeature: function(feature, layer)
                    {
                        var r = feature.properties.region
                        var coord = feature.geometry.coordinates[0][0][0]
                        var marker = new L.Marker([coord[1], coord[0]], marker_options)
                        marker.bindPopup(r).openPopup();
                        marker.addTo(map)
                        
                    }
            }    
        ).addTo(map)
    } 
)