// Function that querys all of the data we need.
$(run = function() {
    // Check if the module is enabled.
    socket.getDBValue('ranks_module_toggle', 'modules', './systems/ranksSystem.js', function(e) {
        // If the module is off, don't load any data.
        if (!helpers.getModuleStatus('ranksModule', e.modules)) {
            return;
        }

        // Get all ranks.
        socket.getDBTableValues('global_get_ranks', 'ranksMapping', function(results) {
            let tableData = [];

            for (let i = 0; i < results.length; i++) {
                tableData.push([
                    results[i].key,
                    results[i].value,
                    $('<div/>', {
                        'class': 'btn-group'
                    }).append($('<button/>', {
                        'type': 'button',
                        'class': 'btn btn-xs btn-danger',
                        'style': 'float: right',
                        'data-toggle': 'tooltip',
                        'title': 'Удалить ранг',
                        'data-rank': results[i].key,
                        'html': $('<i/>', {
                            'class': 'fa fa-trash'
                        })
                    })).append($('<button/>', {
                        'type': 'button',
                        'class': 'btn btn-xs btn-warning',
                        'style': 'float: right',
                        'data-toggle': 'tooltip',
                        'title': 'Редактировать ранг',
                        'data-rank': results[i].key,
                        'html': $('<i/>', {
                            'class': 'fa fa-edit'
                        })
                    })).html()
                ]);
            }

            // if the table exists, destroy it.
            if ($.fn.DataTable.isDataTable('#ranksTable')) {
                $('#ranksTable').DataTable().destroy();
                // Remove all of the old events.
                $('#ranksTable').off();
            }

            // Create table.
            let table = $('#ranksTable').DataTable({
                'searching': true,
                'autoWidth': false,
                'lengthChange': false,
                'data': tableData,
                'columnDefs': [
                    { 'className': 'default-table', 'orderable': false, 'targets': 2 },
                    { 'width': '45%', 'targets': 0 }
                ],
                'columns': [
                    { 'title': 'Стаж, час' },
                    { 'title': 'Общий ранг' },
                    { 'title': 'Опции' }
                ]
            });

            // On delete button.
            table.on('click', '.btn-danger', function() {
                let rankHours = $(this).data('rank'),
                    row = $(this).parents('tr'),
                    rankName = row.find('td:eq(1)').text();

                // Ask if the user wants to remove the rank.
                helpers.getConfirmDeleteModal('global_rank_modal_remove', 'Вы уверены, что хотите удалить общий ранг «' + rankName + '»?', true,
                    'Общий ранг «' + rankName + '» успешно удалён', function() {
                    // Delete the rank
                    socket.removeDBValue('rm_global_rank', 'ranksMapping', rankHours, function() {
                        // Reload the rank table in the bot.
                        socket.sendCommand('rm_global_rank_cmd', 'rankreloadtable', function() {
                            // Remove the table row.
                            table.row(row).remove().draw(false);
                        });
                    });
                });
            });

            // On edit button.
            table.on('click', '.btn-warning', function() {
                let rank = $(this).data('rank'),
                    t = $(this);

                // Get the rank info.
                socket.getDBValue('rank_get_name', 'ranksMapping', rank, function(e) {
                    helpers.getModal('edit-rank', 'Редактирование общего ранга', 'Сохранить', $('<form/>', {
                        'role': 'form'
                    })
                    // Rank name
                    .append(helpers.getInputGroup('rank-name', 'text', 'Ранг', '', e.ranksMapping, 'Название общего ранга'))
                    // Rank hours
                    .append(helpers.getInputGroup('rank-hours', 'number', 'Стаж', '50', rank, 'Стаж (в часах) для достижения ранга')), function() {// Callback once we click the save button.
                        let rankName = $('#rank-name'),
                            rankHours = $('#rank-hours');

                        // Make sure all boxes have an input.
                        switch (false) {
                            case helpers.handleInputString(rankName):
                            case helpers.handleInputNumber(rankHours):
                                break;
                            default:
                                // Remove the old rank.
                                socket.removeDBValue('rm_rank_edit_global', 'ranksMapping', rank, function() {
                                    // Add the rank.
                                    socket.updateDBValue('edit_rank_global', 'ranksMapping', rankHours.val(), rankName.val(), function() {
                                        // Reload the rank table in the bot.
                                        socket.sendCommand('edit_global_rank_cmd', 'rankreloadtable', function() {
                                            // Update the table name.
                                            t.parents('tr').find('td:eq(0)').text(rankHours.val());
                                            // Update the table hours.
                                            t.parents('tr').find('td:eq(1)').text(rankName.val());
                                            // Update the rank hours.
                                            t.data('rank', rankHours.val());
                                            // Close the modal.
                                            $('#edit-rank').modal('hide');
                                            // Alert the user.
                                            toastr.success('Общий ранг «' + rankName.val() + '» успешно отредактирован');
                                        });
                                    });
                                });
                        }
                    }).modal('toggle');
                });
            });
        });
    });
});

// Function that handlers the loading of events.
$(function() {
    $('#ranksModuleToggle').on('change', function() {
        // Enable the module then query the data.
        socket.sendCommandSync('ranks_module_toggle_cmd', 'module ' + ($(this).is(':checked') ? 'enablesilent' : 'disablesilent') + ' ./systems/ranksSystem.js', run);
    });

    // Add rank button.
    $('#add-rank-button').on('click', function() {
        helpers.getModal('add-rank', 'Создание общего ранга', 'Сохранить', $('<form/>', {
            'role': 'form'
        })
        // Append alias name.
        .append(helpers.getInputGroup('rank-name', 'text', 'Ранг', 'Друг', '', 'Название ранга'))
        // Append alias.
        .append(helpers.getInputGroup('rank-hours', 'number', 'Стаж', '50', '', 'Стаж (в часах) для достижения ранга')), function() {// Callback once we click the save button.
            let rankName = $('#rank-name'),
                rankHours = $('#rank-hours');

            // Make sure all boxes have an input.
            switch (false) {
                case helpers.handleInputString(rankName):
                case helpers.handleInputNumber(rankHours):
                    break;
                default:
                    // Add the rank.
                    socket.updateDBValue('add_rank_global', 'ranksMapping', rankHours.val(), rankName.val(), function() {
                        // Reload the rank table in the bot.
                        socket.sendCommand('add_global_rank_cmd', 'rankreloadtable', function() {
                            // Update the table name.
                            run();
                            // Close the modal.
                            $('#add-rank').modal('hide');
                            // Alert the user.
                            toastr.success('Общий ранг успешно создан');
                        });
                    });
            }
        }).modal('toggle');
    });
});
