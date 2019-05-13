// Function that querys all of the data we need.
$(run = function() {

	// Create table.
	$('#twitchCommandsTable').DataTable({
		'searching': true,
		'autoWidth': false,
		'lengthChange': true,
		'columnDefs': [
    		{ 'className': 'default-table', 'width': '75px', 'targets': 0 },
    		{ 'orderable': false, 'targets': 1 }
    	],
		'columns': [
			{ 'title': 'Команда' },
			{ 'title': 'Функция' }
		]
	});
});
