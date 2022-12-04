/* =============== Setup : =============== */
var l0 = 30.42979385310831
var f0 = -9.596287037071171

// Creating map options 
var map_options = {
    center: [l0, f0],
    zoom: 5,
    zoomControl: false
}

// Creating a map object 
var map = new L.map('map', map_options)

/* Creating a Layer object */
var layer = new L.tileLayer(
    //'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    //'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png'
).addTo(map)

// Adding layer to the map 
//map.addLayer(layer)



/* =============== Loding Geojson : =============== */
import data from "/asset/univ.json" assert {type: 'json'};
import bd from "/asset/bd.json" assert {type: 'json'};

var region_layer
var markers = new Array()
var circles
var interv = {
    "total": [30000, 50000, 75000, 100000],
    "nb_etranger": [100, 500, 1000, 2000],
    "nb_new": [10000, 20000, 30000, 40000]
} 
var echelle = {
    "total": 0.07,
    "nb_etranger": 0.25,
    "nb_new": 0.09
} 
function region(color, opacity, each)
    {
        $.getJSON("./asset/maroc.geojson", function(data)
            {    
                // add GeoJSON layer to the map once the file is loaded
                region_layer = L.geoJson(data, 
                    {
                        style: function(feature)
                            {
                                return { 
                                        color: "#000000", 
                                        weight: 2, 
                                        fillColor: color(feature.properties.region), 
                                        fillOpacity: opacity 
                                    };
                            },
                        onEachFeature: each,

                    }    
                )
        
                map.addLayer(region_layer)
            } 
        )
    }


    

/* =============== AFFICAGE STANDARD : =============== */

function standard()
    {
        region( (r)=>{return "#ff0000"}, 0.1, ()=>{return})
        $("#res_select").hide()
        /* ADD Marker : */
        var univs = data.univs
        console.log(univs)

        const icon_options = 
        {
            iconUrl: './img/icon_7.png',
            iconSize: [20, 20]
        }

        // Creating a custom icon
        const custom_icon = L.icon(icon_options)
        
        // Options for the marker
        const marker_options = 
            {
                //title: "Rent/BUY",
                clickable: true,
                
                //draggable: true,
                icon: custom_icon
            }
        

        for (let i = 0; i < univs.length; i++) 
            {
                var univ = univs[i];
                
                var coord = univ.coordinates
                var Nom = univ.Nom
                var ville = univ.Ville
                var src = univ.img
                var id = univ.id
                var r
                for (let j = 0; j < bd.length; j++) 
                    {
                        console.log(bd[j].region)
                        if(bd[j].id == id)
                            {
                                r = bd[j].region
                            }
                        
                    }
                
                
                var container = '<div class="ecole" data-id='+ id +'>' +
                                    '<div class="img">' +
                                        '<img src='+ src + '>' +
                                    '</div>' +
                                    '<div class="description">' +
                                        '<h2 class="title">' + Nom + '</h2>' +
                                        "<h3><span>Région :</span>" + r +'</h3>' +
                                        '<h3><span>Ville :</span>'+ ville + '</h3>' +
                                        '<a class="view" id="view'+ id +'">View More.</a>' +
                                    '</div>' +
                                '</div>'
                

                
                var marker = new L.Marker([coord[0], coord[1]], marker_options)
                marker.bindPopup(container);
                //marker.addTo(map)
                markers.push(marker)
                map.addLayer(marker)


            }

        
        /* SIDE BAR ACTIONS : */
        var mymap = document.getElementById("map")
        var imgs = mymap.children[0].children[3].children

        /* BURGER Action */
        $('#empty h1').hide()
        var burger = document.getElementById("burger")
        burger.addEventListener("click", function()
            {
                var content = document.getElementById("content")
                if(document.getElementById('content_filter').offsetWidth != 0)
                    {
                        filtre_hide()
                    }

                if (document.getElementById("x").value == "ss")
                    {
                        if(document.getElementById("empty").offsetWidth == 0)
                            {
                                //$('#empty').fadeIn(200)
                                $('#empty').animate(
                                    {
                                        width: '300px'
                                    }, 
                                    "slow", 
                                    function(){
                                        $('#empty h1').fadeIn(200)
                                    }
                                )
                            } 
                        else if(document.getElementById("empty").offsetWidth != 0)
                            {
                                $('#empty h1').fadeOut(200)
                                $('#empty').animate(
                                    {
                                        width: '0px'
                                    }, 
                                    "slow"
                                )
                            }
                    }
                
                else    
                    {
                        if (content.offsetWidth == 0)
                            {
                                burger_show()
                            }

                        else
                            {
                                burger_hide()
                            } 
                    }
                    
            }
        )
        
        /* FILTRE ACTION : */
        if(document.getElementById("content_filter").offsetWidth == 0)
            {
                $('#content_filter .bar_title').hide()
                $('#content_filter .cont').hide()
            }
        var filtre = document.getElementById("filter")
        filtre.addEventListener("click", function()
            {
                console.log("CLICK")
                if(document.getElementById("empty").offsetWidth != 0)
                    {
                        $('#empty').fadeOut(200)
                    }
                if (document.getElementById("content").offsetWidth != 0)
                    {
                        burger_hide()
                    }    
                if(document.getElementById('content_filter').offsetWidth == 0)
                    {
                        filtre_show()
                    }
                if(document.getElementById('content_filter').offsetWidth != 0)
                    {
                        filtre_hide()
                    }
            }
        )

        /* MARKER ACTION : */    
        $('.details').hide()
        for (let i = 0; i < bd.length; i++)
            {
                imgs[i].addEventListener("click", function() 
                    {
                        setTimeout(() => 
                            {
                                var content = document.getElementById("content")

                                var n =  document.getElementsByClassName("ecole").length
                                var element = document.getElementsByClassName("ecole")[n-1]

                                console.log(element)
                                var id = parseInt(element.getAttribute("data-id"))
                                var btn = element.querySelector('#view' + id)

                                btn.addEventListener("click", function()
                                    {
                                        $('#empty').hide()

                                        if(document.getElementById('content_filter').offsetWidth != 0)
                                            {
                                                filtre_hide()
                                            }
                                        // Close :

                                        if (parseInt(document.getElementById("x").value) == id)
                                            {
                                                
                                                if (content.offsetWidth == 0)
                                                    {
                                                        $('#content').animate(
                                                            {
                                                                width: '300px'
                                                            }, 
                                                            "slow", 
                                                            function(){
                                                                $('#content .img').fadeIn(300)
                                                                $('.details').fadeIn(300)
                                                            }
                                                        )
                                                    }

                                                else
                                                    {
                                                        $('.details').fadeOut(200)
                                                        $('#content .img').fadeOut(200)
                                                        $('#content').animate(
                                                            {
                                                                width: '0px'
                                                            }, "slow"
                                                        )
                                                    } 
                                            }

                                        //Open :
                                        else
                                            {

                                                $('#content').animate(
                                                    {
                                                        width: '300px'
                                                    }, 
                                                    "slow", 
                                                    function(){
                                                        $('#content .img').fadeIn(300)
                                                        $('.details').fadeIn(300)
                                                    }
                                                )
                                            }
                                        document.getElementById("x").value = id
                                        
                                        console.log(id)
                                        
                                        show_univ(bd, id)

                                        
                                    }
                                )

                            }, 
                        100);
                    }
                )
            }

        
    }

function show_univ(bd, j)
    {

        console.log(j)

        var univ
        for (let i = 0; i < bd.length; i++) {
            const u = bd[i];
            if (u.id == j)
                {
                    univ = u
                    break
                } 
            
        }
        console.log(univ)
        
        document.getElementById("img_univ").src = univ.img
        document.getElementById("logo_univ").src = univ.logo
        document.getElementById("nom_univ").innerHTML = univ.nom
        document.getElementById("ville_univ").innerHTML = univ.ville
        document.getElementById("nb_univ").innerHTML = univ.info.total

        document.getElementById("g_univ").innerHTML = "0000"
        document.getElementById("f_univ").innerHTML = "0000"
        document.getElementById("e_univ").innerHTML = univ.info.nb_etranger
        document.getElementById("n_univ").innerHTML = univ.info.nb_new

        document.getElementById("creat_univ").innerHTML = univ.info.creation
        document.getElementById("etab_univ").innerHTML = univ.info.nb_etab

        document.getElementById("site_univ").innerHTML = univ.site
        document.getElementById("site_href").href = univ.site

        document.getElementById("sec_univ").innerHTML = "public"
        
        var etabs = univ.etabs
        var str = "" 
        for (let j = 0; j < etabs.length; j++) {
            const e = etabs[j];
            var s = '<div class="cards">'+
                        '<img src=' + e.logo + ' alt="">' +
                        '<div class="card_detail">' +
                            '<div class="title"><h2>' + e.Nom + '</h2></div>' + 
                            '<div class="site"><a href=' + e.site + '>Savoir +</a></div>' +
                        '</div>' +
                    '</div>'

            str = str + s

        }

        document.getElementById("etabs").innerHTML = str

    }


function burger_show()
    {
        $('#content').animate(
            {
                width: '300px'
            }, 
            "slow", 
            function(){
                $('#content .img').fadeIn(300)
                $('.details').fadeIn(300)
            }
        )
    }

function burger_hide()
    {
        $('.details').fadeOut(200)
        $('#content .img').fadeOut(200)
        $('#content').animate(
            {
                width: '0px'
            }, "slow"
        )
    }

function filtre_show()
    {
        $('#content_filter').show()
        $('#content_filter').animate(
            {
                width: '300px',
            }, 
            "slow",
            function(){
                $('#content_filter .bar_title').fadeIn(300)
                $('#content_filter .cont').fadeIn(300)
            }
        )
    }

function filtre_hide()
    {
        $('#content_filter .bar_title').fadeOut(300)
        $('#content_filter .cont').fadeOut(300)
        
        $('#content_filter').animate(
            {
                width: '0px'
            }, 
            "slow"
            
        )
    }


   
/* =============== AFFICAGE COROPLETTE : =============== */
function coroplette(region)
    {
        var u = new Array()
        var v = new Array()

        var chs = document.querySelectorAll('input[name="var"]');
        var vl
        for (let i = 0; i < chs.length; i++) 
            {
                var ch = chs[i]
                if (ch.checked) 
                    {
                        vl = ch.value;
                        console.log(vl)
                        break;
                    }
            }
        
        for(let i = 0; i < bd.length; i++)
            {
                if (bd[i].region == region)
                    {
                        console.log(bd[i].info[vl])
                        u.push(parseInt(bd[i].info[vl]))
                    }
            }
        
        var L = interv[vl]
        
        
        

        var n = u.reduce((a, b) => a + b, 0)
        return  n < L[0] ? '#fef0d9' :
                n < L[1] ? '#fdcc8a' :
                n < L[2] ? '#fc8d59' :
                n < L[3] ? '#e34a33' :
                                    '#b30000' ;
            
    }

function coroplette_oneach(feature, layer)
    {
        layer.on({
            mouseover: function()
                {
                    layer.setStyle({
                        weight: 4,
                        color: '#000',
                        dashArray: '',
                        fillOpacity: 0.9
                    });
                    
                    $("#res_select").fadeIn(200)
                    
                    var r = feature.properties.region
                    document.getElementById("select_reg").innerHTML = r
                    

                    var u = new Array()
                    var v = 0
                    var n = 0

                    var vl = document.getElementById("z").value
                    for(let i = 0; i < bd.length; i++)
                        {
                            if (bd[i].region == r)
                                {
                                    u.push(parseInt(bd[i].info[vl]))
                                    v = 1
                                }
                        }

                    if( v==1 )
                        {
                            n = u.reduce((a, b) => a + b, 0)
                        }
                    
                    document.getElementById("select_nb").innerHTML = n


                    /* var popup = L.popup();
                    var coord = feature.geometry.coordinates[0][0][0]
                    console.log(coord)
                    popup.setLatLng([coord[1], coord[0]])
                    popup.setContent("<center>My Photo </center>" + "</br>")
                    popup.openOn(map); */



                },



            mouseout: function()
                {
                    
                    region_layer.resetStyle(layer);
                    $("#res_select").fadeOut(200)

                }
        });
    }

/* =============== AFFICAGE SYMBOLE : =============== */
function symbole()
    {
        region((r)=>{return "#00ff00"}, 0.2, ()=>{return})
        $.getJSON("./asset/points.geojson", function(data)
            {
                circles = L.geoJSON(
                    data, 
                    {
                        pointToLayer: function(feature,latlng) 
                            {
                                var id = feature.properties.id
                                return L.circleMarker(
                                    latlng, 
                                    {
                                    weight: 1,
                                    color: '#000000',
                                    fillColor: '#2E86C1',
                                    fillOpacity: 0.9,
                                    radius: radius(id)
                                    }
                                )
                            },
                        
                        onEachFeature: function(feature, layer)
                            {
                                layer.on({
                                    mouseover: function()
                                        {
                                            layer.setStyle({
                                                weight: 4,
                                                //color: '#000',
                                                //dashArray: '',
                                                fillOpacity: 0.9
                                            });
                                            
                                            $("#res_select").fadeIn(200)
                                            
                                            var id = feature.properties.id
                                            var r
                                            for(let i = 0; i < bd.length; i++)
                                                {
                                                    if (bd[i].id == id)
                                                        {
                                                            r = bd[i].region
                                                        }
                                                    
                                                }
                                            document.getElementById("select_reg").innerHTML = r
                                            
                        
                                            var u = new Array()
                                            var v = 0
                                            var n = 0
                        
                                            var vl = document.getElementById("z").value
                                            for(let i = 0; i < bd.length; i++)
                                                {
                                                    if (bd[i].region == r)
                                                        {
                                                            u.push(parseInt(bd[i].info[vl]))
                                                            v = 1
                                                        }
                                                }
                        
                                            if( v==1 )
                                                {
                                                    n = u.reduce((a, b) => a + b, 0)
                                                }
                                            
                                            document.getElementById("select_nb").innerHTML = n
                                        },
                        
                                    mouseout: function()
                                        {
                                            region_layer.resetStyle(layer);
                                            $("#res_select").fadeOut(200)
                                        }
                                });
                            }

                    }
                )
        
                map.addLayer(circles)

            }
        )
    }

function radius(id)
    {
        var vl = document.getElementById("z").value
        for(let i = 0; i < bd.length; i++)
            {
                if (bd[i].id == id)
                    {
                        var n = parseInt(bd[i].info[vl])
                        return Math.sqrt(n/Math.PI) * echelle[vl]
                    }
                
            }
        return 0.5
    }



/* FILTRE : */
function display(choix)
    {
        console.log("display: " + choix)
        var previous =  document.getElementById("y").value 

        if (choix == "standard")
            {
                if ( document.getElementById("y").value != "standard" )
                    {
                        remove(previous)
                    }
                standard()
            }
        
        if (choix == "coroplette")
            {
                console.log("Prev: " + previous)
                remove(previous)
                region(coroplette, .9, coroplette_oneach)
            }
        
        if (choix == "symbole")
            {
                remove(previous)
                symbole()
            }
    }

function remove(prev)
    {
        console.log("remove: " + x)
        if (prev == "standard")
           {
                console.log("REMOVE")
                for (let i = 0; i < markers.length; i++) 
                    {
                        map.removeLayer(markers[i])
                    }
                map.removeLayer(region_layer)

                markers = new Array()
                region_layer = null

            }
            
        if (prev == "coroplette")
            {
                map.removeLayer(region_layer)
                region_layer = null
            } 

        if (prev == "symbole")
            {
                map.removeLayer(region_layer)
                map.removeLayer(circles)
                
                region_layer = null
                circles = null
            } 
    }




let suggestions = 
    [
        'Hassan II - Casablanca', 
        'Abdelmalek Essaadi - Tétouan', 
        'Mohammed Premier - Oujda', 
        'Sultan Moulay Slimane - Beni Mellal', 
        'Sidi Mohammed Ben Abdellah - Fès', 
        'Moulay Ismaïl - Meknès', 
        'Ibn Tofail - Kénitra', 
        'Cadi Ayyad - Marrakech', 
        'Chouaïb Doukkali - El Jadida', 
        'Hassan I - Settat', 
        'Mohammed V - Rabat', 
        'Ibn Zohr - Agadir'
    ]

// getting all required elements
const search_inp = document.querySelector(".search_inp");
const input = search_inp.querySelector("input");
const box = search_inp.querySelector(".box");


// if user press any key and release
input.onkeyup = (e)=>
    {
        let userData = e.target.value; //user enetered data
        let emptyArray = [];
        if(userData)
            {
                emptyArray = suggestions.filter((data)=>
                    {
                        //filtering array value and user characters to lowercase and return only those words which are start with user enetered chars
                        var x = data.split(" ")

                        for (let i = 0; i < x.length; i++) {
                            const out = x[i];
                            if (out.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase()))
                                {
                                    return true
                                }
                        }
                        return false
                        /* return data.toLocaleLowerCase().startsWith(userData.toLocaleLowerCase());  */
                    }
                );
                emptyArray = emptyArray.map((data)=>
                    {
                        // passing return data inside li tag
                        return '<li>'+ data +'</li>';
                    }
                );
                console.log(emptyArray)
                
                search_inp.classList.add("active"); //show autocomplete box
                
                showSuggestions(emptyArray);
                let allList = box.querySelectorAll("li");
                for (let i = 0; i < allList.length; i++) {
                    //adding onclick attribute in all li tag
                    /* allList[i].setAttribute("onclick", "select(this, 1, input)"); */
                    allList[i].addEventListener("click",function()
                        {
                            select(allList[i], 1, input)
                        }
                    )  
                }
            }
        else
            {
                search_inp.classList.remove("active"); //hide autocomplete box
            }   
    }

function showSuggestions(list)
    {
        let listData = "";
        console.log(list)

        if(list.length)
            {
                //var userValue = box.value;
                for (let i = 0; i < list.length; i++) 
                    {
                        const li = list[i];
                        listData = listData + li
                    }
                //listData = '<li>'+ userValue +'</li>';
                console.log(listData)
                box.innerHTML = listData;
            }
        else
            {
                console.log("dddd")
                return
            }   
        
    }

function select(li, id, inp)
    {
        inp.value = li.innerHTML
        
        search_inp.classList.remove("active"); //hide autocomplete box
        
        var nom = li.innerHTML
        var lat
        var lng
        for (let j = 0; j < bd.length; j++) {
            const univ = bd[j];
            if (univ.nom == nom)
                {
                    console.log(univ)
                    lat = univ.coordinates[0]
                    lng = univ.coordinates[1]
                    break
                }
            
        }

        var zoom = 12
        map.setView([lat, lng], zoom);
    }  




document.querySelector("select[name='requete']").addEventListener("change", function()
    {
        var requete = document.querySelector("select[name='requete']").value
        console.log(requete)

        if(requete == "1")
            {
                display("standard")
                var lat = 31.66451381066009
                var lng = -7.998599890222562
                var zoom = 12
                map.setView([lat, lng], zoom);
            }


    }
)


display("standard")
$("#display").click(function()
    {
        const checks = document.querySelectorAll('input[name="radio"]');
        var y = document.getElementById("y").value
        let value;
        for (const check of checks) 
            {
                if (check.checked) 
                    {
                        value = check.value;
                        console.log(value)
                        break;
                    }
            }
        
        
        if (value != "standard")
            {   
                var chs = document.querySelectorAll('input[name="var"]');
                var vl
                for (let i = 0; i < chs.length; i++) 
                    {
                        var ch = chs[i]
                        if (ch.checked) 
                            {
                                vl = ch.value;
                                console.log(vl)
                                break;
                            }
                    }

                var z = document.getElementById("z").value 
                document.getElementById("z").value = vl

                if (vl != z &&  y == value)
                    {
                        display(value)
                        return
                    }

                
            }
            
        if ( y == value )
            {
                return
            }

        display(value)
        document.getElementById("y").value = value
        
    }
)

$("#slect_var .title").hide()
$("#slect_var .var").hide()

const checkboxs = document.querySelectorAll('input[name="radio"]');
for (let i = 0; i < checkboxs.length; i++) {
    const check = checkboxs[i]
    
    check.addEventListener('change', e => 
        {
            console.log("fffffffff")
            if(e.target.checked)
                {
                    console.log(check.value)
                    if(check.value == "coroplette" || check.value == "symbole")
                        {
                            console.log("show")
                            $("#slect_var .title").fadeIn(200)
                            $("#slect_var .var").fadeIn(200)
                        }
                    else
                        {
                            console.log("hide")
                            $("#slect_var .title").fadeOut(200)
                            $("#slect_var .var").fadeOut(200)
                        }
                }
        
        }
    );
    
}




/* var legend = L.control({position: 'bottomright'});
legend.onAdd = function (map) 
    {
        var div = L.DomUtil.create('div', 'info legend');
        div.innerHTML += '<h5>Montant Moyen</h5>';
            
        return div;
    };
legend.addTo(map) */

/* var popup = L.popup();

var photoImg = '<img src="https://static.pexels.com/photos/189349/pexels-photo-189349.jpeg" height="150px" width="150px"/>';

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("<center>My Photo </center>" + "</br>"+ photoImg)
        .openOn(map);
}

map.on('click', onMapClick); */

