// Function that querys all of the data we need.
$(run = function() {
    // Query whitelist.
    socket.getDBTableValues('moderation_whitelist_get', 'whiteList', function(results) {
        let tableData = [];

        for (let i = 0; i < results.length; i++) {
            tableData.push([
                results[i].key,
                $('<div/>', {
                    'class': 'btn-group'
                }).append($('<button/>', {
                    'type': 'button',
                    'class': 'btn btn-xs btn-danger',
                    'style': 'float: right',
                    'data-toggle': 'tooltip',
                    'title': 'Удалить запись',
                    'data-whitelist': results[i].key,
                    'html': $('<i/>', {
                        'class': 'fa fa-trash'
                    })
                })).append($('<button/>', {
                    'type': 'button',
                    'class': 'btn btn-xs btn-warning',
                    'style': 'float: right',
                    'data-toggle': 'tooltip',
                    'title': 'Редактировать запись',
                    'data-whitelist': results[i].key,
                    'html': $('<i/>', {
                        'class': 'fa fa-edit'
                    })
                })).html()
            ]);
        }

        // if the table exists, destroy it.
        if ($.fn.DataTable.isDataTable('#whitelistTable')) {
            $('#whitelistTable').DataTable().destroy();
            // Remove all of the old events.
            $('#whitelistTable').off();
        }

        // Create table.
        let table = $('#whitelistTable').DataTable({
            'searching': true,
            'autoWidth': false,
            'lengthChange': false,
            'data': tableData,
            'columnDefs': [
                { 'className': 'default-table', 'orderable': false, 'targets': 1 }
            ],
            'columns': [
                { 'title': 'Ссылка' },
                { 'title': 'Опции' }
            ]
        });

        // On delete button.
        table.on('click', '.btn-danger', function() {
            let whitelist = $(this).data('whitelist'),
                row = $(this).parents('tr');

            // Ask the user if he wants to delete the blacklist.
            helpers.getConfirmDeleteModal('blacklist_modal_remove', 'Вы уверены, что хотите удалить запись из белого списка?', true,
                'Запись успешно удалена из белого списка', function() { // Callback if the user clicks delete.
                // Delete all information about the alias.
                socket.removeDBValue('whitelist_remove', 'whiteList', whitelist, function() {
                    socket.sendCommand('whitelist_remove_cmd', 'reloadmod', function() {
                        // Remove the table row.
                        table.row(row).remove().draw(false);
                    });
                });
            });
        });

        // On edit button.
        table.on('click', '.btn-warning', function() {
            let whitelist = $(this).data('whitelist'),
                t = $(this);

            helpers.getModal('edit-whitelist', 'Редактирование записи в белом списке', 'Сохранить', $('<form/>', {
                'role': 'form'
            })
            // Append box for the whitelist.
            .append(helpers.getInputGroup('whitelist-name', 'text', 'Ссылка', '', whitelist, 'Ссылка или её фрагмент')), function() {
                let w = $('#whitelist-name');

                // Handle each input to make sure they have a value.
                switch (false) {
                    case helpers.handleInputString(w):
                        break;
                    default:
                        // Delete old whitelist.
                        socket.removeDBValue('whitelist_remove', 'whiteList', whitelist, function() {
                            // Add the whitelist
                            socket.updateDBValue('whitelist_edit', 'whiteList', w.val().toLowerCase(), 'true', function() {
                                // Reload the script cache.
                                socket.sendCommand('whitelist_remove_cmd', 'reloadmod', function() {
                                    // Edit the table row.
                                    t.parents('tr').find('td:eq(0)').text(w.val());
                                    // Close the modal.
                                    $('#edit-whitelist').modal('hide');
                                    // Alert the user.
                                    toastr.success('Запись в белом списке успешно отредактирована');
                                });
                            });
                        });
                }
            }).modal('toggle');
        });
    });
});

// Function that handlers the loading of events.
$(function() {
    // Add whitelist button.
    $('#add-whitelist-button').on('click', function() {
        helpers.getModal('add-whitelist', 'Добавление записи в белый список', 'Сохранить', $('<form/>', {
            'role': 'form'
        })
        // Append box for the whitelist.
        .append(helpers.getInputGroup('whitelist-name', 'text', 'Ссылка', 'clips.twitch.tv', '', 'Ссылка или её фрагмент')), function() {
            let whitelist = $('#whitelist-name');

            // Handle each input to make sure they have a value.
            switch (false) {
                case helpers.handleInputString(whitelist):
                    break;
                default:
                    // Add the whitelist
                    socket.updateDBValue('whitelist_add', 'whiteList', whitelist.val().toLowerCase(), 'true', function() {
                        // Reload the script cache.
                        socket.sendCommand('whitelist_add_cmd', 'reloadmod', function() {
                            // Reload the table.
                            run();
                            // Close the modal.
                            $('#add-whitelist').modal('hide');
                            // Alert the user.
                            toastr.success('Запись успешно добавлена в белый список');
                        });
                    });
            }
        }).modal('toggle');
    });
});