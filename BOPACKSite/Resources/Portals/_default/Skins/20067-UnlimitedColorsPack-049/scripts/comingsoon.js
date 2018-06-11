/**
 * Defines a new instance of the rainyday.js.
 * @param options options element with script parameters
 */

/*time*/
(function ($) {
    $.fn.countdown = function (options, callback) {

        // -- Variables -- //
        var interval;
		thisEl = $(this);
		var settings = {
			'date': null,
			'format': null,
			"time_end": "off"
		};
		if (options) {
			$.extend(settings, options)
		}

		$(".timebox").each(
            function () {

                var e = $(this);
                var box = function () {
                    e_w = e.width(), l = settings['line'];
                    e.height(e_w).css('line-height', e_w + "px");
                }

                box();

                $(window).resize(
                    function (e) {
                        box()
                    }
                );
            }
        );

		function countdown_proc() {
			eventDate = Date.parse(settings['date']) / 1000;
			currentDate = Math.floor($.now() / 1000);
			if (eventDate <= currentDate) {
				if (settings["time_end"] == "on") {
					thisEl.hide().$(".time_end").show();
				}

				callback.call(this);
				clearInterval(interval);
			}
			seconds = eventDate - currentDate;
			days = Math.floor(seconds / (60 * 60 * 24));
			seconds -= days * 60 * 60 * 24;
			hours = Math.floor(seconds / (60 * 60));
			seconds -= hours * 60 * 60;
			minutes = Math.floor(seconds / 60);
			seconds -= minutes * 60;
			if (days == 1) {
				thisEl.find(".timeRefDays").text("jour")
			} else {
			    thisEl.find(".timeRefDays").text("jours")
			}
			if (hours == 1) {
				thisEl.find(".timeRefHours").text("heure")
			} else {
			    thisEl.find(".timeRefHours").text("heures")
			}
			if (minutes == 1) {
				thisEl.find(".timeRefMinutes").text("minute")
			} else {
				thisEl.find(".timeRefMinutes").text("minutes")
			}
			if (seconds == 1) {
				thisEl.find(".timeRefSeconds").text("seconde")
			} else {
				thisEl.find(".timeRefSeconds").text("secondes")
			}


			if (settings['format'] == "on") {
				days = (String(days).length >= 2) ? days : "0" + days;
				hours = (String(hours).length >= 2) ? hours : "0" + hours;
				minutes = (String(minutes).length >= 2) ? minutes : "0" + minutes;
				seconds = (String(seconds).length >= 2) ? seconds : "0" + seconds
			}
			if (!isNaN(eventDate)) {
				thisEl.find(".days").text(days);
				thisEl.find(".hours").text(hours);
				thisEl.find(".minutes").text(minutes);
				thisEl.find(".seconds").text(seconds)
			} else {
			    thisEl.html(
                    "Error: Invalid date. Here's an example: 12 December 2012 12:00:00"
                );
				clearInterval(interval)
			}
		}

		countdown_proc();

		interval = setInterval(countdown_proc, 1000);

	}

})(jQuery);