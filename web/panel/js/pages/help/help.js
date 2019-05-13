// Function that querys all of the data we need.
$(function() {
	// Get the version
	socket.getBotVersion('get_panel_info_version', function(e) {
		// Set bot version
		$('#panel-bot-version').html(e['version'].substring(20));
		// Set the java version.
		$('#panel-java-version').html(e['java-version']);
		// Set the OS version.
		$('#panel-os-version').html(e['os-version']);
		// Set the panel version.
		$('#panel-version-number').html(helpers.PANEL_VERSION);
	});
});

// Function that handlers the loading of events.
$(function() {
	// On search button.
	$('#forum-search').on('click', function() {
		let search = $('#forum-search-text').val();

		// Make sure that there's something in the box.
		if (search.length > 0) {
			window.open('https://community.phantombot.tv/search?q=' + encodeURI(search));

			// Remove the box content.
			$('#forum-search-text').val('');
		}
	});

	// If the user clicks enter.
	$('#forum-search-text').on('keypress', function(e) {
		if (e.which === 13) {
			let search = $('#forum-search-text').val();

			// Make sure that there's something in the box.
			if (search.length > 0) {
				window.open('https://community.phantombot.tv/search?q=' + encodeURI(search));

				// Remove the box content.
				$('#forum-search-text').val('');
			}
		}
	});
});
