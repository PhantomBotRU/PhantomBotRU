// Function that querys all of the data we need.
$(run = function() {

	// Create table.
	$('#timezonesTable').DataTable({
		'searching': true,
		'autoWidth': false,
		'lengthChange': true,
		'columns': [
			{ 'title': 'Город/топоним' },
			{ 'title': 'Код' }
		]
	});
});
