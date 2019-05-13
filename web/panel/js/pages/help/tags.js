// Function that querys all of the data we need.
$(run = function() {

	// Create twitch tags table.
	$('#twitchTagsTable').DataTable({
		'searching': true,
		'autoWidth': false,
		'lengthChange': true,
		'columnDefs': [
    		{ 'className': 'default-table', 'width': '145px', 'targets': 0 },
    		{ 'orderable': false, 'targets': 1 },
    		{ 'width': '32.5%', 'orderable': false, 'targets': 2 }
    	],
		'columns': [
			{ 'title': 'Тег' },
			{ 'title': 'Функция' },
			{ 'title': 'Пример' }
		]
	});

	// Create discord tags table.
	$('#discordTagsTable').DataTable({
		'searching': true,
		'autoWidth': false,
		'lengthChange': true,
		'columnDefs': [
    		{ 'className': 'default-table', 'width': '85px', 'targets': 0 },
    		{ 'orderable': false, 'targets': 1 },
    		{ 'width': '32.5%', 'orderable': false, 'targets': 2 }
    	],
		'columns': [
			{ 'title': 'Тег' },
			{ 'title': 'Функция' },
			{ 'title': 'Пример' }
		]
	});
});
