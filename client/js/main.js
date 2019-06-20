$(function () {
    //Místa kde se natáčelo
    var i = 0;
    setInterval(function () {
        $("#misto img").attr("src", "img/" + mista[i].photo);
        $("#misto figcaption").text(mista[i].place);
        i < mista.length - 1 ? i++ : (i = 0);
    }, 3500);

    //Zajímavosti z filmů
    function zmenaTextu(i) {
        $('#zajimavosti p').text(zajimavosti[index].text);
    }
    var index = 0;
    zmenaTextu(index); {
        $('#zajimavosti button').on('click', function () {
            index < zajimavosti.length - 1 ? index++ : index = 0;
            zmenaTextu(index);
        })
    };

    // Změny zobrazení
    var filmy = '#filmy h4';
    $(filmy).nextUntil('h4').hide();
    $(filmy).click(function () {
        $(this).nextUntil('h4').toggle(750);
    })
})