// Function that querys all of the data we need.
$(function() {
	socket.getDBTableValues('get_all_raids', 'incoming_raids', function(results) {
		let raids = [];

		for (let i = 0; i < results.length; i++) {
			let json = JSON.parse(results[i].value);

			raids.push([
				results[i].key,
				new Date(parseInt(json.lastRaidTime)).toLocaleString(),
				helpers.getDefaultIfNullOrUndefined(json.lastRaidViewers, '0'),
				helpers.getDefaultIfNullOrUndefined(json.totalRaids, '1'),
				helpers.getDefaultIfNullOrUndefined(json.totalViewers, '0'),
			]);
		}

        // if the table exists, destroy it.
        if ($.fn.DataTable.isDataTable('#raidHistoryTable')) {
            $('#raidHistoryTable').DataTable().destroy();
            // Remove all of the old events.
            $('#raidHistoryTable').off();
        }

		// Create table.
		$('#raidHistoryTable').DataTable({
			'searching': true,
			'autoWidth': false,
			'data': raids,
			'columnDefs': [
    			{ 'width': '20%', 'targets': 0 }
    		],
			'columns': [
				{ 'title': 'Пользователь' },
				{ 'title': 'Последний рейд', 'orderData': [1] },
				{ 'title': 'Зрителей' },
				{ 'title': 'Всего рейдов' },
				{ 'title': 'Всего зрителей' }
			]
		});
	});

    socket.getDBTableValues('get_all_out_raids', 'outgoing_raids', function(results) {
        let raids = [];

        for (let i = 0; i < results.length; i++) {
            let json = JSON.parse(results[i].value);

            raids.push([
                results[i].key,
                new Date(parseInt(json.lastRaidTime)).toLocaleString(),
                helpers.getDefaultIfNullOrUndefined(json.lastRaidViewers, '0'),
                helpers.getDefaultIfNullOrUndefined(json.totalRaids, '1'),
                helpers.getDefaultIfNullOrUndefined(json.totalViewers, '0'),
            ]);
        }

        // if the table exists, destroy it.
        if ($.fn.DataTable.isDataTable('#outRaidHistoryTable')) {
            $('#outRaidHistoryTable').DataTable().destroy();
            // Remove all of the old events.
            $('#outRaidHistoryTable').off();
        }

        // Create table.
        $('#outRaidHistoryTable').DataTable({
            'searching': true,
            'autoWidth': false,
            'data': raids,
            'columnDefs': [
                { 'width': '20%', 'targets': 0 }
            ],
            'columns': [
				{ 'title': 'Пользователь' },
				{ 'title': 'Последний рейд', 'orderData': [1] },
				{ 'title': 'Зрителей' },
				{ 'title': 'Всего рейдов' },
				{ 'title': 'Всего зрителей' }
            ]
        });
    });
});
