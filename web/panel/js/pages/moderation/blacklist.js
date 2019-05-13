// Function that querys all of the data we need.
$(run = function() {
    // Query blacklist.
    socket.getDBTableValues('moderation_blacklist_get', 'blackList', function(results) {
        let tableData = [];

        for (let i = 0; i < results.length; i++) {
            let json = JSON.parse(results[i].value);

            tableData.push([
                json.phrase,
                json.isRegex,
                json.timeout,
                json.message,
                json.banReason,
                $('<div/>', {
                    'class': 'btn-group'
                }).append($('<button/>', {
                    'type': 'button',
                    'class': 'btn btn-xs btn-danger',
                    'style': 'float: right',
					'data-toggle': 'tooltip',
					'title': 'Удалить запись',
                    'data-blacklist': results[i].key,
                    'html': $('<i/>', {
                        'class': 'fa fa-trash'
                    })
                })).append($('<button/>', {
                    'type': 'button',
                    'class': 'btn btn-xs btn-warning',
                    'style': 'float: right',
					'data-toggle': 'tooltip',
					'title': 'Редактировать запись',
                    'data-blacklist': results[i].key,
                    'html': $('<i/>', {
                        'class': 'fa fa-edit'
                    })
                })).html()
            ]);
        }

        // if the table exists, destroy it.
        if ($.fn.DataTable.isDataTable('#blacklistTable')) {
            $('#blacklistTable').DataTable().destroy();
            // Remove all of the old events.
            $('#blacklistTable').off();
        }

        // Create table.
        let table = $('#blacklistTable').DataTable({
            'searching': true,
            'autoWidth': false,
            'lengthChange': false,
            'data': tableData,
            'columnDefs': [
                { 'width': '5%', 'className': 'default-table', 'orderable': false, 'targets': 5 },
                { 'width': '35%', 'targets': 0 },
                { 'width': '25%', 'targets': 3 },
                { 'width': '25%', 'targets': 4 }
            ],
            'columns': [
                { 'title': 'Слово/фраза' },
                { 'title': 'Regex' },
                { 'title': 'Таймаут' },
                { 'title': 'Предупреждение' },
                { 'title': 'Причина' },
                { 'title': 'Опции' }
            ]
        });

        // On delete button.
        table.on('click', '.btn-danger', function() {
            let blacklist = $(this).data('blacklist'),
                row = $(this).parents('tr');

            // Ask the user if he wants to delete the blacklist.
            helpers.getConfirmDeleteModal('blacklist_modal_remove', 'Вы уверены, что хотите удалить запись из чёрного списка?', true,
                'Запись успешно удалена из чёрного списка', function() { // Callback if the user clicks delete.
                socket.removeDBValue('moderation_blacklist_rm', 'blackList', blacklist, function() {
                    socket.sendCommand('moderation_blacklist_rm_cmd', 'reloadmod', function() {
                        // Remove the table row.
                        table.row(row).remove().draw(false);
                    });
                });
            });
        });

        // On edit button.
        table.on('click', '.btn-warning', function() {
            let blacklist = $(this).data('blacklist');

            socket.getDBValue('moderation_blacklist_edit_get', 'blackList', blacklist, function(e) {
                e = JSON.parse(e.blackList);
                // Get advance modal from our util functions in /utils/helpers.js
                helpers.getAdvanceModal('blacklist-edit-modal', 'Редактирование записи в чёрном списке', 'Сохранить', $('<form/>', {
                    'role': 'form'
                })
                // Append a text area box for the phrase.
                .append(helpers.getTextAreaGroup('ban-phrase', 'text', 'Слово/фраза', '', e.phrase, 'Слово или фраза', true)
                // Append checkbox for if this should be regex or not.
                .append(helpers.getCheckBox('is-regex', e.isRegex, 'regex', 'Когда галочка установлена, можно использовать спецсимволы регулярных выражений')))
                // Append ban reason. This is the message Twitch shows with the timeout.
                .append(helpers.getInputGroup('timeout-banmsg', 'text', 'Предупреждение', '', e.message, 'Сообщение с предупреждением о нарушении')
                // Append checkbox for if this should be regex or not.
                .append(helpers.getCheckBox('timeout-message-toggle', e.isSilent, 'тихо', 'Когда галочка установлена, сообщение не публикуется в чате')))
                // Append input box for the timeout time.
                .append(helpers.getInputGroup('timeout-timeout-time', 'number', 'Таймаут/бан', '0', e.timeout,
                    'Длительность таймаута в секундах («-1» означает бан)'))
                // Add an advance section that can be opened with a button toggle.
                .append($('<div/>', {
                    'class': 'collapse',
                    'id': 'advance-collapse',
                    'style': 'margin-top: 10px;',
                    'html': $('<form/>', {
                        'role': 'form'
                    })
                    // Append ban reason. This is the message Twitch shows with the timeout.
                    .append(helpers.getInputGroup('timeout-reason', 'text', 'Причина', '', e.banReason, 'Сообщение о причине таймаута/бана (видно только модераторам и в логах)'))
                    // Add group for toggles.
                    .append($('<div/>', {
                        'class': 'form-group'
                    })
                    // Tooltip to toggle for regulars to bypass this filter.
                    .append(helpers.getCheckBox('exclude-regulars', e.excludeRegulars, 'кроме регуляров', 'Когда галочка установлена, фильтр не действует на регуляров'))
                    // Tooltip to toggle for subs to bypass this filter.
                    .append(helpers.getCheckBox('exclude-subscribers', e.excludeSubscribers, 'кроме подписчиков',
                        'Когда галочка установлена, фильтр не действует на подписчиков')))
                // Callback function to be called once we hit the save button on the modal.
                })), function() {
                    let phrase = $('#ban-phrase'),
                        isRegex = $('#is-regex').is(':checked'),
                        banMsg = $('#timeout-banmsg'),
                        isSilent = $('#timeout-message-toggle').is(':checked'),
                        timeoutTime = $('#timeout-timeout-time'),
                        timeoutMsg = $('#timeout-reason'),
                        isReg = $('#exclude-regulars').is(':checked'),
                        isSub = $('#exclude-subscribers').is(':checked');

                    // Add regex prefix is regex.
                    if (isRegex && !phrase.val().startsWith('regex:')) {
                        phrase.val('regex:' + phrase.val());
                    }

                    // Handle each input to make sure they have a value.
                    switch (false) {
                        case helpers.handleInputString(phrase):
                        case helpers.handleInputString(banMsg):
                        case helpers.handleInputString(timeoutTime): // Handle as string even if it's a number.
                        case helpers.handleInputString(timeoutMsg):
                            break;
                        default:
                            // Delete the old blacklist
                            socket.removeDBValue('rm_moderation_blacklist', 'blackList', blacklist, function() {
                                // Update the blacklist
                                socket.updateDBValue('update_moderation_blacklist', 'blackList', phrase.val(), JSON.stringify({
                                    id: 'panel_' + phrase.val(),
                                    timeout: timeoutTime.val(),
                                    isRegex: isRegex,
                                    phrase: phrase.val(),
                                    isSilent: isSilent,
                                    excludeRegulars: isReg,
                                    excludeSubscribers: isSub,
                                    message: banMsg.val(),
                                    banReason: timeoutMsg.val()
                                }), function() {
                                    socket.sendCommand('moderation_blacklist_reload_cmd', 'reloadmod', function() {
                                        // Update the table.
                                        run();
                                        // Close the modal.
                                        $('#blacklist-edit-modal').modal('hide');
                                        // Alert the user.
                                        toastr.success('Запись в чёрном списке успешно отредактирована');
                                    });
                                });
                            });
                    }
                }).modal('toggle');
            });
        });
    });
});

// Function that handlers the loading of events.
$(function() {
    // Add blacklist button
    $('#add-blacklist-button').on('click', function() {
        // Get advance modal from our util functions in /utils/helpers.js
        helpers.getAdvanceModal('blacklist-add-modal', 'Добавление записи в чёрный список', 'Сохранить', $('<form/>', {
            'role': 'form'
        })
        // Append a text area box for the phrase.
        .append(helpers.getTextAreaGroup('ban-phrase', 'text', 'Слово/фраза', 'Пример фразы', '', 'Слово или фраза', true)
        // Append checkbox for if this should be regex or not.
        .append(helpers.getCheckBox('is-regex', false, 'regex', 'Когда галочка установлена, можно использовать спецсимволы регулярных выражений')))
        // Append ban reason. This is the message Twitch shows with the timeout.
        .append(helpers.getInputGroup('timeout-banmsg', 'text', 'Предупреждение', '',
            'использование слова или фразы из чёрного списка', 'Сообщение с предупреждением о нарушении')
        // Append checkbox for if this should be regex or not.
        .append(helpers.getCheckBox('timeout-message-toggle', false, 'тихо', 'Когда галочка установлена, сообщение не публикуется в чате')))
        // Append input box for the timeout time.
        .append(helpers.getInputGroup('timeout-timeout-time', 'number', 'Таймаут/бан', '0', '600',
            'Длительность таймаута в секундах («-1» означает бан)'))
        // Add an advance section that can be opened with a button toggle.
        .append($('<div/>', {
            'class': 'collapse',
            'id': 'advance-collapse',
            'style': 'margin-top: 10px;',
            'html': $('<form/>', {
                'role': 'form'
            })
            // Append ban reason. This is the message Twitch shows with the timeout.
            .append(helpers.getInputGroup('timeout-reason', 'text', 'Причина', '', 'использование слова или фразы из чёрного списка',
                'Сообщение о причине таймаута/бана (видно только модераторам и в логах)'))
            // Add group for toggles.
            .append($('<div/>', {
                'class': 'form-group'
            })
            // Tooltip to toggle for regulars to bypass this filter.
            .append(helpers.getCheckBox('exclude-regulars', false, 'кроме регуляров', 'Когда галочка установлена, фильтр не действует на регуляров'))
            // Tooltip to toggle for subs to bypass this filter.
            .append(helpers.getCheckBox('exclude-subscribers', false, 'кроме подписчиков',
                'Когда галочка установлена, фильтр не действует на подписчиков')))
        })), function() {
            let phrase = $('#ban-phrase'),
                isRegex = $('#is-regex').is(':checked'),
                banMsg = $('#timeout-banmsg'),
                isSilent = $('#timeout-message-toggle').is(':checked'),
                timeoutTime = $('#timeout-timeout-time'),
                timeoutMsg = $('#timeout-reason'),
                isReg = $('#exclude-regulars').is(':checked'),
                isSub = $('#exclude-subscribers').is(':checked');

            // Add regex prefix is regex.
            if (isRegex && !phrase.val().startsWith('regex:')) {
                phrase.val('regex:' + phrase.val());
            }

            // Handle each input to make sure they have a value.
            switch (false) {
                case helpers.handleInputString(phrase):
                case helpers.handleInputString(banMsg):
                case helpers.handleInputString(timeoutTime): // Handle as string even if it's a number.
                case helpers.handleInputString(timeoutMsg):
                    break;
                default:
                    // Add the blacklist.
                    socket.updateDBValue('add_moderation_blacklist', 'blackList', phrase.val(), JSON.stringify({
                        id: 'panel_' + phrase.val(),
                        timeout: timeoutTime.val(),
                        isRegex: isRegex,
                        phrase: phrase.val(),
                        isSilent: isSilent,
                        excludeRegulars: isReg,
                        excludeSubscribers: isSub,
                        message: banMsg.val(),
                        banReason: timeoutMsg.val()
                    }), function() {
                        socket.sendCommand('moderation_blacklist_reload_cmd', 'reloadmod', function() {
                            // Update the table.
                            run();
                            // Close the modal.
                            $('#blacklist-add-modal').modal('hide');
                            // Alert the user.
                            toastr.success('Запись успешно добавлена в чёрный список');
                        });
                    });
            }
        }).modal('toggle');
    });
});
