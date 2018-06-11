
// -- Message box de notification -- //
function bpMessage_Box(type, message) {
    // -- Définir l'entête -- //
    $('#modal_message_titre').html('<i class="glyphicon glyphicon-info-sign text-' + type + '"></i> Information');
    // -- Definir le message -- //
    $('#modal_message_text').html(message);
    // -- Afficher -- //
    $('#modal_message').modal('show');
}

// -- Définir un cookies -- //
function bpSetCookie(cookie_name, cookie_value, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cookie_name + "=" + cookie_value + ";" + expires + ";path=/";
}

// -- Réccupérer la valeur d'un cookie -- //
function bpGetCookie(cookie_name) {
    var name = cookie_name + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// -- Réccupérer la valeur de l'attribut d'un cookie -- //
function bpGetCookieAttribut(cookie_name, cookie_attribut) {
    // -- Réccupérer la valuer du cookie -- //
    var cookie_value = bpGetCookie(cookie_name);

    for (var i = 0; i < cookie_value.split('&').length; i++) {
        if (cookie_value.split('&')[i].split('=')[0] == cookie_attribut) {
            // -- Retourner la valeur de l'attribut -- //
            return cookie_value.split('&')[i].split('=')[1];
        }
    }
    // -- Retourner une chaine vide -- //
    return "";
}

// -- Mettre à jour l'attribut d'un cookie -- //
function bpSetCookieAttribut(cookie_name, cookie_attribut, valeur) {
    // -- Réccupérer la valuer du cookie -- //
    var cookie_value = bpGetCookie(cookie_name);
    // -- Dit oui ou non si un attribut a été trouvé -- //
    var existe = false;
    for (var i = 0; i < cookie_value.split('&').length; i++) {
        if (cookie_value.split('&')[i].split('=')[0] == cookie_attribut) {
            cookie_value = cookie_value.replace(cookie_attribut + '=' + cookie_value.split('&')[i].split('=')[1], cookie_attribut + '=' + valeur);
            existe = true;
            // -- Sortir de la boucle -- //
            break;
        }
    }
    // -- Si aucun attribut n'a été trouvé alors ajouter en un -- //
    if (!existe) {
        cookie_value = cookie_value + '&' + cookie_attribut + '=' + valeur;
    }
    // -- Mettre à jour la valeur du cookie -- //
    bpSetCookie(cookie_name, cookie_value, 1);
}

// -- Redirection -- //
function bpHref(url) {
    window.location.href = url;
}

// -- Log -- //
function bpConsole(value) {
    console.log(value);
}

// -- Notifier l'utilisation des cookies -- //
function bpCookieesNotification() {
    if (bpGetCookie('cookiewarning') == "") {
        $("#cookie_panel").slideToggle("slow");
    }
}

// -- Localiser l'entreprise -- //
/*
function customMap() {

    $('#gmap01').gmap3({
        marker: {
            values: [{
                address: 'Rond point 4em - Manège, Douala-Akwa',
                data: 'Notre entreprise',
                options: {
                    icon: "/Resources/images/png/mapicon01.png"
                }
            }],
            options: {
                draggable: false
            },
            events: {
                click: function (marker, event, context) {
                    var map = $(this).gmap3("get"),
                      infowindow = $(this).gmap3({ get: { name: "infowindow" } });
                    if (infowindow) {
                        infowindow.open(map, marker);
                        infowindow.setContent(context.data);
                    } else {
                        $(this).gmap3({
                            infowindow: {
                                anchor: marker,
                                options: { content: context.data }
                            }
                        });
                    }
                },
                closeclick: function () {
                    var infowindow = $(this).gmap3({ get: { name: "infowindow" } });
                    if (infowindow) {
                        infowindow.close();
                    }
                }
            }
        },
        map: {
            options: {
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                mapTypeControl: true,
                mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
                },
                navigationControl: true,
                zoom: 8,
                scrollwheel: true
            }
        }
    });

}
*/

// -- Localiser l'entreprise -- //
function bpInitialisationMap(id_element, latitude, longitude, content) {

    var myOptions = {
        zoom: 10,
        center: new google.maps.LatLng(latitude, longitude),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById(id_element), myOptions);
    marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(latitude, longitude)
    });
    infowindow = new google.maps.InfoWindow({
        content:    '<b>' + content + '</b>' +
                    '<br/>' +
                    'Lieu de l\'entreprise'
    });
    google.maps.event.addListener(
        marker, 'click', function () {
            infowindow.open(map, marker);
        }
    );
    infowindow.open(map, marker);

}

// -- Charger Google Maps sur la page -- //
function bpLoadGoogleMap(id_element, latitude, longitude, content) {

    try {
        // 0. Execution de la fonction javascript du google map -- //
        google.maps.event.addDomListener(window, 'load', bpInitialisationMap(id_element, latitude, longitude, content));
    } catch (e) {
        // -- Log -- //
        bpConsole(e.message);
    }

}

// -- Lorsque le document est chargé -- //
$(
    function () {

        // -- Notifier l'utilisation des cookiees -- //
        // -- Lors du click sr le bouton de validation -- //
        $("#bt_valide_cookie_use").on("click",
            function () {
                bpSetCookie('cookiewarning', 1, 365);
                $("#cookie_panel").slideToggle("slow");
            }
        );

        // -1. Notifier l'utilisation des cookiees -- //
        bpCookieesNotification();
        // -- ./Notifier l'utilisation des cookiees -- //

        // -- Message de processus non terminé -- //
        $(".bp-msg").on("click",
            function () {
                // -- Notification -- //
                bpMessage_Box('info', 'Processus en cours de developpement.');
            }
        );
        

    }
);