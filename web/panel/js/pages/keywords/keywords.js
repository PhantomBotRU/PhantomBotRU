// Function that querys all of the data we need.
$(run = function() {
    // Check if the module is enabled.
    socket.getDBValue('keyword_module', 'modules', './handlers/keywordHandler.js', function(e) {
        // If the module is off, don't load any data.
        if (!helpers.getModuleStatus('keywordModule', e.modules)) {
            return;
        }

        // Get all keywords.
        socket.getDBTableValues('keywords_get_all', 'keywords', function(results) {
            let tableData = [];

            for (let i = 0; i < results.length; i++) {
                let json = JSON.parse(results[i].value);

                tableData.push([
                    json.keyword.replace('regex:', ''),
                    json.response,
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
            if ($.fn.DataTable.isDataTable('#keywordsTable')) {
                $('#keywordsTable').DataTable().destroy();
                // Remove all of the old events.
                $('#keywordsTable').off();
            }

            // Create table.
            let table = $('#keywordsTable').DataTable({
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
                let keyword = $(this).data('keyword'),
                    row = $(this).parents('tr');

                helpers.getConfirmDeleteModal('keyword_modal_remove', 'Вы уверены, что хотите удалить триггер для слова или фразы «' + keyword + '»?', true,
                    'Триггер для слова или фразы «' + keyword + '» успешно удалён', function() {
                    // Delete all of the info about the keyword.
                    socket.removeDBValues('rm_keyword', {
                        tables: ['keywords', 'coolkey'],
                        keys: [keyword, keyword]
                    }, function() {
                        socket.wsEvent('rm_keyword_ws', './handlers/keywordHandler.js', null, [], function() {
                            // Remove the table row.
                            table.row(row).remove().draw(false);
                        });
                    });
                });
            });

            // On edit button.
            table.on('click', '.btn-warning', function() {
                let keyword = $(this).data('keyword'),
                    t = $(this);

                socket.getDBValues('edit_keyword', {
                    tables: ['keywords', 'coolkey'],
                    keys: [keyword, keyword]
                }, function(e) {
                    e.keywords = JSON.parse(e.keywords);

                    // Get advance modal from our util functions in /utils/helpers.js
                    helpers.getAdvanceModal('edit-keyword', 'Редактирование триггера', 'Сохранить', $('<form/>', {
                        'role': 'form'
                    })
                    // Append a text box for keyword
                    .append(helpers.getTextAreaGroup('keyword-keyword', 'text', 'Слово/фраза', '',
                        e.keywords.keyword.replace('regex:', ''), 'Слово или фраза', true)
                        // Append checkbox for if the keyword is regex.
                        .append(helpers.getCheckBox('keyword-regex', e.keywords.isRegex, 'regex', 'Когда галочка установлена, можно использовать спецсимволы регулярных выражений')))
                    // Append a text box for the keyword response.
                    .append(helpers.getTextAreaGroup('keyword-response', 'text', 'Отклик', '', e.keywords.response, 'Текст отклика')
                        // Append a sub-comment.
                        .append(helpers.getSubComment('Доступные теги: (keywordcount) и (playsound)'))
                        // Append a sub-comment.
                        .append(helpers.getSubComment('Подсказка: используйте «command:имя_команды», если нужно, чтобы публиковался отклик на указанную команду')))
                    // Add an advance section that can be opened with a button toggle.
                    .append($('<div/>', {
                        'class': 'collapse',
                        'id': 'advance-collapse',
                        'html': $('<form/>', {
                                'role': 'form'
                            })
                            // Append input box for keyword cooldown
                            .append(helpers.getInputGroup('cooldown-count', 'number', 'Кулдаун', '',
                                helpers.getDefaultIfNullOrUndefined(e.coolkey, 5), 'Кулдаун, в секундах'))
                            // Append input box for keyword count
                            .append(helpers.getInputGroup('keyword-count', 'number', 'Счётчик', '',
                                helpers.getDefaultIfNullOrUndefined(e.keywords.count, 0), 'Количество срабатываний триггера при использовании в отклике тега (keywordcount)'))
                    })), function() {
                        let keywordKey = $('#keyword-keyword'),
                            keywordResponse = $('#keyword-response'),
                            isRegex = $('#keyword-regex').is(':checked'),
                            keywordCooldown = $('#cooldown-count'),
                            keywordCount = $('#keyword-count');

                        // Make sure everything was filled in.
                        switch (false) {
                            case helpers.handleInputString(keywordKey):
                            case helpers.handleInputString(keywordResponse):
                            case helpers.handleInputNumber(keywordCooldown, 1):
                            case helpers.handleInputNumber(keywordCount, 0):
                                break;
                            default:
                                keywordKey.val(keywordKey.val().toLowerCase());

                                // Remove the old keyword.
                                socket.removeDBValue('edit_keyword_rm', 'keywords', keyword, function() {
                                    // Update the values.
                                    socket.updateDBValues('edit_keyword', {
                                        tables: ['keywords', 'coolkey'],
                                        keys: [(isRegex ? 'regex:' : '') + keywordKey.val(), (isRegex ? 'regex:' : '') + keywordKey.val()],
                                        values: [JSON.stringify({
                                            keyword: (isRegex ? 'regex:' : '') + keywordKey.val(),
                                            response: keywordResponse.val(),
                                            isRegex: isRegex,
                                            count: keywordCount.val()
                                        }), keywordCooldown.val()]
                                    }, function() {
                                        // Reload the keywords in the scripts.
                                        socket.wsEvent('rm_keyword_ws', './handlers/keywordHandler.js', null, [], function() {
                                            // Update the table.
                                            t.parents('tr').find('td:eq(0)').text(keywordKey.val());
                                            // Update the table.
                                            t.parents('tr').find('td:eq(1)').text(keywordResponse.val());
                                            // Close the modal.
                                            $('#edit-keyword').modal('hide');
                                            // Alert the user.
                                            toastr.success('Триггер для слова или фразы «' + keywordKey.val() + '» успешно отредактирован');
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
    // Handle module toggle.
    $('#keywordModuleToggle').on('change', function() {
        // Enable the module then query the data.
        socket.sendCommandSync('keywords_module_toggle_cmd',
            'module ' + ($(this).is(':checked') ? 'enablesilent' : 'disablesilent') + ' ./handlers/keywordHandler.js', run);
    });

    // Add keyword button.
    $('#keywordadd-button').on('click', function() {
        // Get advance modal from our util functions in /utils/helpers.js
        helpers.getAdvanceModal('add-keyword', 'Добавление триггера', 'Сохранить', $('<form/>', {
            'role': 'form'
        })
        // Append a text box for keyword
        .append(helpers.getTextAreaGroup('keyword-keyword', 'text', 'Слово/фраза', 'ГЭС', '', 'Слово или фраза', true)
            // Append checkbox for if the keyword is regex.
            .append(helpers.getCheckBox('keyword-regex', false, 'regex', 'Когда галочка установлена, можно использовать спецсимволы регулярных выражений')))
        // Append a text box for the keyword response.
        .append(helpers.getTextAreaGroup('keyword-response', 'text', 'Отклик',
            'ГЭС – это гидроэлектростанция', '', 'Текст отклика')
            // Append a sub-comment.
            .append(helpers.getSubComment('Доступные теги: (keywordcount) и (playsound)'))
            // Append a sub-comment.
            .append(helpers.getSubComment('Подсказка: используйте «command:имя_команды», если нужно, чтобы публиковался отклик на указанную команду')))
        // Add an advance section that can be opened with a button toggle.
        .append($('<div/>', {
            'class': 'collapse',
            'id': 'advance-collapse',
            'html': $('<form/>', {
                    'role': 'form'
                })
                // Append input box for keyword cooldown
                .append(helpers.getInputGroup('cooldown-count', 'number', 'Кулдаун', '', '5',
                    'Кулдаун, в секундах'))
                // Append input box for keyword count
                .append(helpers.getInputGroup('keyword-count', 'number', 'Счётчик', '', '0',
                    'Количество срабатываний триггера при использовании тега (keywordcount)', '', '0'))
        })), function() {
            let keywordKey = $('#keyword-keyword'),
                keywordResponse = $('#keyword-response'),
                isRegex = $('#keyword-regex').is(':checked'),
                keywordCooldown = $('#cooldown-count'),
                keywordCount = $('#keyword-count');

            // Make sure everything was filled in.
            switch (false) {
                case helpers.handleInputString(keywordKey):
                case helpers.handleInputString(keywordResponse):
                case helpers.handleInputNumber(keywordCooldown, 1):
                case helpers.handleInputNumber(keywordCount, 0):
                    break;
                default:
                    keywordKey.val(keywordKey.val().toLowerCase());

                    // Update the values.
                    socket.updateDBValues('add_keyword', {
                        tables: ['keywords', 'coolkey'],
                        keys: [(isRegex ? 'regex:' : '') + keywordKey.val(), (isRegex ? 'regex:' : '') + keywordKey.val()],
                        values: [JSON.stringify({
                            keyword: (isRegex ? 'regex:' : '') + keywordKey.val(),
                            response: keywordResponse.val(),
                            isRegex: isRegex,
                            count: keywordCount.val()
                        }), keywordCooldown.val()]
                    }, function() {
                        // Reload the keywords in the scripts.
                        socket.wsEvent('add_keyword_ws', './handlers/keywordHandler.js', null, [], function() {
                            // Update the table.
                            run();
                            // Close the modal.
                            $('#add-keyword').modal('hide');
                            // Alert the user.
                            toastr.success('Триггер для слова или фразы «' + keywordKey.val() + '» успешно добавлен');
                        });
                    });
            }
        }).modal('toggle');
    });
});
