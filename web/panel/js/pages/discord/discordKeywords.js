// Function that querys all of the data we need.
$(run = function() {
    // Check if the module is enabled.
    socket.getDBValue('discord_keyword_module', 'modules', './discord/handlers/keywordHandler.js', function(e) {
        // If the module is off, don't load any data.
        if (!helpers.getModuleStatus('discordKeywordsModule', e.modules)) {
            return;
        }

        // Get all keywords.
        socket.getDBTableValues('keywords_get_all', 'discordKeywords', function(results) {
            const tableData = [];

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
						'title': 'Удалить триггер',
                        'data-keyword': results[i].key,
                        'html': $('<i/>', {
                            'class': 'fa fa-trash'
                        })
                    })).append($('<button/>', {
                        'type': 'button',
                        'class': 'btn btn-xs btn-warning',
                        'style': 'float: right',
						'data-toggle': 'tooltip',
						'title': 'Редактировать триггер',
                        'data-keyword': results[i].key,
                        'html': $('<i/>', {
                            'class': 'fa fa-edit'
                        })
                    })).html()
                ]);
            }

            // if the table exists, destroy it.
            if ($.fn.DataTable.isDataTable('#discordKeywordTable')) {
                $('#discordKeywordTable').DataTable().destroy();
                // Remove all of the old events.
                $('#discordKeywordTable').off();
            }

            // Create table.
            const table = $('#discordKeywordTable').DataTable({
                'searching': true,
                'autoWidth': false,
                'lengthChange': false,
                'data': tableData,
                'columnDefs': [
                    { 'className': 'default-table', 'orderable': false, 'targets': 2 },
                    { 'width': '35%', 'targets': 0 }
                ],
                'columns': [
                    { 'title': 'Слово/фраза' },
                    { 'title': 'Отклик' },
                    { 'title': 'Опции' }
                ]
            });

            // On delete button.
            table.on('click', '.btn-danger', function() {
                const keyword = $(this).data('keyword'),
                    row = $(this).parents('tr');

                // Ask the user if he want to remove the command.
                helpers.getConfirmDeleteModal('custom_command_modal_remove', 'Вы уверены, что хотите удалить триггер для слова или фразы «' + keyword + '»?', true,
                    'Триггер для слова или фразы «' + keyword + '» успешно удалён', function() {
                    socket.removeDBValue('discord_keyword_remove', 'discordKeywords', keyword, function() {
                        // Remove the table row.
                        table.row(row).remove().draw(false);
                    });
                });
            });

            // On edit button.
            table.on('click', '.btn-warning', function() {
                const keyword = $(this).data('keyword'),
                    t = $(this);

                socket.getDBValue('keyword_discord_name_get', 'discordKeywords', keyword, function(e) {
                    helpers.getModal('edit-keyword', 'Редактирование триггера', 'Сохранить', $('<form/>', {
                        'role': 'form'
                    })
                    // Append keyword.
                    .append(helpers.getInputGroup('keyword-name', 'text', 'Слово/фраза', '', keyword, 'Слово или фраза (не редактируется)', true))
                    // Append response.
                    .append(helpers.getTextAreaGroup('keyword-response', 'text', 'Отклик', '', e.discordKeywords, 'Текст отклика'))
                    // Append a note.
                    .append(helpers.getNote('Примечание: триггеры в Discord временно работают только с латиницей')), function() {
                        const keyword = $('#keyword-name'),
                            response = $('#keyword-response');

                        switch (false) {
                            case helpers.handleInputString(response):
                                break;
                            default:
                                // Update the keyword.
                                socket.updateDBValue('update_discord_keyword', 'discordKeywords', keyword.val(), response.val(), function() {
                                    // Update the table.
                                    t.parents('tr').find('td:eq(1)').text(response.val());
                                    // Close the modal.
                                    $('#edit-keyword').modal('hide');
                                    // Alert the user.
                                    toastr.success('Триггер для слова или фразы «' + keyword.val() + '» успешно отредактирован');
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
    // Toggle for the module.
    $('#discordKeywordsModuleToggle').on('change', function() {
        // Enable the module then query the data.
        socket.sendCommandSync('discord_keywords_module_toggle_cmd', 'module ' +
            ($(this).is(':checked') ? 'enablesilent' : 'disablesilent') + ' ./discord/handlers/keywordHandler.js', run);
    });

    // Add keyword button.
    $('#discord-addkey-button').on('click', function() {
         helpers.getModal('add-keyword', 'Добавление триггера', 'Сохранить', $('<form/>', {
            'role': 'form'
        })
        // Append keyword.
        .append(helpers.getInputGroup('keyword-name', 'text', 'Слово/фраза', 'привет', '', 'Слово или фраза (доступен regex)'))
        // Append response.
        .append(helpers.getTextAreaGroup('keyword-response', 'text', 'Отклик', 'И тебе привет!', '', 'Текст отклика'))
        // Append a note.
        .append(helpers.getNote('Примечание: триггеры в Discord временно работают только с латиницей')), function() {// Callback once we click the save button.
            const keyword = $('#keyword-name'),
                response = $('#keyword-response');

            switch (false) {
                case helpers.handleInputString(keyword):
                case helpers.handleInputString(response):
                    break;
                default:
                    // Set the keyword.
                    socket.updateDBValue('set_discord_keyword', 'discordKeywords', keyword.val(), response.val(), function() {
                        // Reload the table.
                        run();
                        // Close the modal.
                        $('#add-keyword').modal('hide');
                        // Alert the user.
                        toastr.success('Триггер для слова или фразы «' + keyword.val() + '» успешно добавлен');
                    });
            }
        }).modal('toggle');
    });
});
