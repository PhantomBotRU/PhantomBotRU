// Function that querys all of the data we need.
$(function() {
	socket.getDBTableValues('get_all_hosts', 'hosthistory', function(results) {
		let hosts = [];

		for (let i = 0; i < results.length; i++) {
			let json = JSON.parse(results[i].value);

			hosts.push([
				json.host,
				new Date(parseInt(json.time)).toLocaleString(),
				helpers.getDefaultIfNullOrUndefined(json.viewers, 'н/д')
			]);
		}

		// Create table.
		$('#hostHistoryTable').DataTable({
			'searching': true,
			'autoWidth': false,
			'data': hosts,
			'columnDefs': [
    			{ 'width': '35%', 'targets': 0 }
    		],
			'columns': [
				{ 'title': 'Пользователь' },
				{ 'title': 'Дата', 'orderData': [1] },
				{ 'title': 'Зрителей' }
			]
		});
	});
});
