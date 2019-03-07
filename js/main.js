//Místa kde se natáčelo
var i = 0;
setInterval(function () {
    $("#misto img").attr("src", "img/" + mista[i].photo);
    $("#misto figcaption").text(mista[i].place);
    i < mista.length - 1 ? i++ : (i = 0);
}, 3500);

//Zajímavosti z filmů
function zmenaTextu(i) {
    $('#zajimavosti p').text(zajimavosti[a].text);
}
var a = 0;
zmenaTextu(a); {
    $('#zajimavosti button').on('click', function () {
        a < zajimavosti.length - 1 ? a++ : a = 0;
        zmenaTextu(a);
    })
};