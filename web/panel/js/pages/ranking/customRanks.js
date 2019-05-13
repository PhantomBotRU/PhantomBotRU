// Function that querys all of the data we need.
$(run = function() {
    // Check if the module is enabled.
    socket.getDBValue('ranks_module_toggle', 'modules', './systems/ranksSystem.js', function(e) {
        // If the module is off, don't load any data.
        if (!helpers.getModuleStatus('ranksCustomModule', e.modules)) {
            return;
        }

        // Get all ranks.
        socket.getDBTableValues('custom_get_ranks', 'viewerRanks', function(results) {
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
                        'data-user': results[i].key,
                        'html': $('<i/>', {
                            'class': 'fa fa-trash'
                        })
                    })).append($('<button/>', {
                        'type': 'button',
                        'class': 'btn btn-xs btn-warning',
                        'style': 'float: right',
                        'data-toggle': 'tooltip',
                        'title': 'Редактировать ранг',
                        'data-user': results[i].key,
                        'html': $('<i/>', {
                            'class': 'fa fa-edit'
                        })
                    })).html()
                ]);
            }

            // if the table exists, destroy it.
            if ($.fn.DataTable.isDataTable('#ranksCustomTable')) {
                $('#ranksCustomTable').DataTable().destroy();
                // Remove all of the old events.
                $('#ranksCustomTable').off();
            }

            // Create table.
            let table = $('#ranksCustomTable').DataTable({
                'searching': true,
                'autoWidth': false,
                'lengthChange': false,
                'data': tableData,
                'columnDefs': [
                    { 'className': 'default-table', 'orderable': false, 'targets': 2 },
                    { 'width': '45%', 'targets': 0 }
                ],
                'columns': [
                    { 'title': 'Пользователь' },
                    { 'title': 'Персональный ранг' },
                    { 'title': 'Опции' }
                ]
            });

            // On delete button.
            table.on('click', '.btn-danger', function() {
                let username = $(this).data('user'),
                    row = $(this).parents('tr');

                helpers.getConfirmDeleteModal('custom_rank_modal_remove', 'Вы уверены, что хотите удалить персональный ранг пользователя ' + username + '?', true,
                    'Персональный ранг пользователя ' + username + ' успешно удалён', function() {
                    // Delete the rank
                    socket.removeDBValue('rm_custom_rank', 'viewerRanks', username, function() {
                        // Remove the table row.
                        table.row(row).remove().draw(false);
                    });
                });
            });

            // On edit button.
            table.on('click', '.btn-warning', function() {
                let user = $(this).data('user'),
                    t = $(this);

                // Get the rank info.
                socket.getDBValue('rank_get_name', 'viewerRanks', user, function(e) {
                    helpers.getModal('edit-set-rank', 'Редактирование персонального ранга', 'Сохранить', $('<form/>', {
                        'role': 'form'
                    })
                    // Append alias name.
                    .append(helpers.getInputGroup('rank-user', 'text', 'Пользователь', '', user, 'Имя пользователя'))
                    // Append alias.
                    .append(helpers.getInputGroup('rank-name', 'text', 'Ранг', '', e.viewerRanks, 'Название ранга')), function() {// Callback once we click the save button.
                        let rankUser = $('#rank-user'),
                            rankName = $('#rank-name');

                        // Make sure all boxes have an input.
                        switch (false) {
                            case helpers.handleInputString(rankUser):
                            case helpers.handleInputString(rankName):
                                break;
                            default:
                                socket.removeDBValue('del_rank_custom', 'viewerRanks', user, function() {
                                    // Add the rank.
                                    socket.updateDBValue('edit_rank_custom', 'viewerRanks', rankUser.val().toLowerCase(), rankName.val(), function() {
                                        // Update the table name.
                                        t.parents('tr').find('td:eq(0)').text(rankUser.val().toLowerCase());
                                        // Update the table hours.
                                        t.parents('tr').find('td:eq(1)').text(rankName.val());
                                        // Close the modal.
                                        $('#edit-set-rank').modal('hide');
                                        // Alert the user.
                                        toastr.success('Персональный ранг пользователя ' + user + ' успешно отредактирован');
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
    $('#ranksCustomModuleToggle').on('change', function() {
        // Enable the module then query the data.
        socket.sendCommandSync('ranks_module_toggle_cmd', 'module ' + ($(this).is(':checked') ? 'enablesilent' : 'disablesilent') + ' ./systems/ranksSystem.js', run);
    });

    // Add user rank button.
    $('#rank-user-button').on('click', function() {
        helpers.getModal('set-rank', 'Создание персонального ранга', 'Сохранить', $('<form/>', {
            'role': 'form'
        })
        // Append alias name.
        .append(helpers.getInputGroup('rank-user', 'text', 'Пользователь', 'ninja', '', 'Имя пользователя'))
        // Append alias.
        .append(helpers.getInputGroup('rank-name', 'text', 'Ранг', 'Красавчик', '', 'Название ранга')), function() {// Callback once we click the save button.
            let rankUser = $('#rank-user'),
                rankName = $('#rank-name');

            // Make sure all boxes have an input.
            switch (false) {
                case helpers.handleInputString(rankUser):
                case helpers.handleInputString(rankName):
                    break;
                default:
                    // Add the rank.
                    socket.updateDBValue('set_rank_custom', 'viewerRanks', rankUser.val().toLowerCase(), rankName.val(), function() {
                        // Update the table name.
                        run();
                        // Close the modal.
                        $('#set-rank').modal('hide');
                        // Alert the user.
                        toastr.success('Персональный ранг пользователя ' + rankUser.val() + ' успешно создан');
                    });
            }
        }).modal('toggle');
    });

    // Rank settings button.
    $('#rank-settings-button').on('click', function() {
        socket.getDBValues('get_custom_rank_settings', {
            tables: ['settings', 'settings'],
            keys: ['rankEligableTime', 'rankEligableCost']
        }, true, function(e) {
            helpers.getModal('settings-rank', 'Настройки персональных рангов', 'Сохранить', $('<form/>', {
                'role': 'form'
            })
            // Append alias name.
            .append(helpers.getInputGroup('rank-cost', 'number', 'Плата', '', e.rankEligableCost, 'Плата за персональный ранг, в поинтах'))
            // Append alias.
            .append(helpers.getInputGroup('rank-time', 'number', 'Минимальный стаж', '', e.rankEligableTime, 'Минимальный необходимый стаж для присвоения персонального ранга, в часах')), function() {// Callback once we click the save button.
                let rankCost = $('#rank-cost'),
                    rankTime = $('#rank-time');

                // Make sure all boxes have an input.
                switch (false) {
                    case helpers.handleInputNumber(rankCost):
                    case helpers.handleInputNumber(rankTime):
                        break;
                    default:
                        // Add the rank.
                        socket.updateDBValues('update_custom_rank_Settings', {
                            tables: ['settings', 'settings'],
                            keys: ['rankEligableTime', 'rankEligableCost'],
                            values: [rankTime.val(), rankCost.val()]
                        }, function() {
                            // Close the modal.
                            $('#settings-rank').modal('hide');
                            // Alert the user.
                            toastr.success('Настройки персональных рангов успешно обновлены');
                        });
                }
            }).modal('toggle');
        });
    });
});
