/* var hero = document.querySelector("#hero")
console.log(hero)
document.querySelector("#hero").style.backgroundImage = "url('./img/home/hero_2.jpg')";
 */


/* $('#hero').css('background-image', "url('./img/home/hero_2.jpg')");
var i = 0
var urls = [
    "./img/home/hero_2.jpg",
    "./img/home/hero_1.jpg",
    "./img/home/hero_3.jpg",
]
$("#click").click(function()
    {
        $("#hero").fadeTo("slow", 0.1, "linear",function ()
            {
                $("#hero").css("background-image", "url("+ urls[i] +")");
                $("#hero").fadeTo("slow", 1, "linear");
            });
        
        

        
        console.log(i)
        i = i + 1
        if(i == 3)
            {
                i = 0
            }
    }
) */

$('#hero').css('background-image', "url('./img/home/hero_2.jpg')")
$("header .button_container .right").css('background-image', "url('./img/home/hero_1.jpg')")
$("header .text .text_2").css('opacity', "0")
$("header .text .text_3").css('opacity', "0")


var i = 0
var urls = [
    "./img/home/hero_2.jpg",
    "./img/home/hero_1.jpg",
    "./img/home/hero_3.jpg",
]


var j = 1
$("header .button_container").click(function()
    {
        j = j + 1
        if(j == 3)
            {
                j = 0
            }
        $("#hero").fadeTo("slow", 0.2, "linear",function ()
            {
                $("#hero").css("background-image", "url("+ urls[i] +")");
                $("#hero").fadeTo("slow", 1, "linear");
            });
        $("header .button_container .right").animate(
            {width: "0px"},
            "slow",
            function()
                {
                    $("header .button_container .right").css("background-image", "url("+ urls[j] +")")
                }
        )
        $("header .button_container .right").delay(100).animate(
            {width: "130px"},
            "slow"
        ) 

        


        i = i + 1
        if(i == 3)
            {
                i = 0
            } 

        /* $("#hero .last").css(
            {
                "transform": "translate(-50%, -50%) matrix(1, 0, 0, 1, 0, 0)",
                "opacity": "1"
            }
        )
        
        document.querySelector("#hero .first").src = urls[i]
        document.querySelector("#hero .last").src = urls[j]

        $("#hero .last").css(
            {
                "transform": "translate(-50%, -50%) matrix(1.2, 0, 0, 1.2, 0, 0)",
                "opacity": "0.001"
            }
        ) */
    }
)

/* window.setInterval(function()
{
    var url = getCurrent();
    //start animation
    $('#hero').delay( 500 ).fadeTo(500, 0.3, function()
        {
            console.log(url)
            $(this).css('background-image', 'url(' + url + ')');
        }).fadeTo('slow', 1);
}, 1000);

// We start with index of 1 because we want to skip the first image, 
// Else we would be replacing it with the same image.
var index = 1;
var arrayOfPartenaires = [
    './img/hero/hero_1.jpg',
    './img/hero/hero_2.jpg',
    './img/hero/hero_3.jpg',
];

function getCurrent(){
    // We check if the index is higher than the ammount in the array.
    // If thats true set 0 (beginning of array)
    if (index > arrayOfPartenaires.length -1){
        index = 0;
    }
    var returnValue = index;
    index ++;
    return arrayOfPartenaires[returnValue];       
} */