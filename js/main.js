var timers = ko.observableArray([]);
ko.applyBindings(timers);

function add_timer() {
	var object = {
		time: ko.observable(),
		timeString: ko.observable("0 hours, 0 minutes, 0 seconds"),
		interval: null,
		message: ko.observable(""),
		setMessage: function(item) {
			var message = prompt("Set Message", item.message());
			item.message(message);
		},
		deleteTimer: function(item) {
			clearInterval(item.interval);
			for (var i=0; i < timers().length; i++) {
				if (timers()[i] === item) {
					timers.splice(i,1);
					return;
				}
			}
		}
	};
	timers.push(object);
	object.time(1);
	var interval = setInterval(function() {
		var hours = Math.floor(object.time() / 3600);
		var minutes = Math.floor((object.time() - (hours * 3600)) / 60);
		var seconds = object.time() % 60;
		object.timeString(hours + " hours, " + minutes + " minutes, " + seconds + " seconds");
		object.time(object.time()+1);
	},1000);
	object.interval = interval;
}