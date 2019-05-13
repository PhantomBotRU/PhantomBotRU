$(function() {
    var currentLang = '';

    // Load file button
    $('#load-file-button').on('click', function() {
        $.ajax({
            'url': '/get-lang?webauth=' + getAuth(),
            'type': 'GET',
            'success': function(data) {
                helpers.getModal('edit-lang', 'Открытие языкового файла', 'Открыть', $('<form/>', {
                    'role': 'form'
                })
                // Add select box.
                .append(helpers.getDropdownGroup('file-to-load', 'Файл ', 'Выбрать', data.split('\n'), 'Выбор языкового файла для редактирования')), function() {
                    currentLang = $('#file-to-load').find(':selected').text();

                    $.ajax({
                        'url': '/lang?webauth=' + getAuth(),
                        'type': 'GET',
                        'headers': {
                            'lang-path': $('#file-to-load').find(':selected').text()
                        },
                        'success': function(data) {
                            // Load the file
                            loadLang(JSON.parse(data));
                            // Alert the user.
                            toastr.success('Языковой файл успешно открыт');
                            // Close the modal.
                            $('#edit-lang').modal('toggle');
                            // Enable the insert and save buttons.
                            $('#save-button').prop('disabled', false);
                            $('#add-line-button').prop('disabled', false);
                        }
                    })
                }).modal('toggle');
            }
        });
    });

    // Add line button.
    $('#add-line-button').on('click', function() {
        helpers.getModal('add-lang', 'Добавление языковой строки', 'Сохранить', $('<form/>', {
            'role': 'form'
        })
        // ID for the lang.
        .append(helpers.getInputGroup('lang-id', 'text', 'ID', 'module.name.id', '', 'ID языковой строки'))
        // Resonse for the lang.
        .append(helpers.getTextAreaGroup('lang-response', 'text', 'Отклик', 'Пример отклика', '', 'Текст отклика языковой строки')), function() {
            const table = $('#langTable').DataTable(),
                langId = $('#lang-id'),
                langRes = $('#lang-response');

            switch (false) {
                case helpers.handleInputString(langId):
                case helpers.handleInputString(langRes):
                    break;
                default:
                    langId.val(langId.val().replace(/[^a-zA-Z0-9-\.]+/g, '-'));

                    table.row.add([
                        langId.val(),
                        langRes.val(),
                        $('<div/>', {
                            'class': 'btn-group'
                        }).append($('<button/>', {
                            'type': 'button',
                            'class': 'btn btn-xs btn-danger',
                            'style': 'float: right',
                            'data-toggle': 'tooltip',
                            'title': 'Удалить строку',
                            'data-id': langId.val(),
                            'data-response': langRes.val(),
                            'html': $('<i/>', {
                                'class': 'fa fa-trash'
                            })
                        })).append($('<button/>', {
                            'type': 'button',
                            'class': 'btn btn-xs btn-warning',
                            'style': 'float: right',
                            'data-toggle': 'tooltip',
                            'title': 'Редактировать строку',
                            'data-id': langId.val(),
                            'data-response': langRes.val(),
                            'html': $('<i/>', {
                                'class': 'fa fa-edit'
                            })
                        })).html()
                    ]).draw();

                    // Close the modal.
                    $('#add-lang').modal('toggle');
                    // Alert the user.
                    toastr.success('Языковая строка успешно добавлена');
            }
        }).modal('toggle');
    });

    // Save button
    $('#save-button').on('click', function() {
        const datas = $('#langTable').DataTable().rows().data(),
            dataObj = [];

        for (let i = 0; i < datas.length; i++) {
            if (typeof datas[i] === 'object') {
                dataObj.push({
                    'id': datas[i][0],
                    'response': datas[i][1]
                });
            } else {
                // No longer data, break the loop.
                break;
            }
        }

        // Post the lang.
        $.ajax({
            'url': '/lang?webauth=' + getAuth(),
            'type': 'PUT',
            'headers': {
                'lang-path': currentLang,
                'lang-data': JSON.stringify(dataObj)
            },
            'success': function(data, text, xhr) {
                if (xhr.status === 200) {
                    toastr.success('Языковой файл успешно сохранён');
                } else {
                    toastr.success('Не удалось сохранить языковой файл');
                }
            }
        });
    });

    // Load lang function
    function loadLang(langArray) {
        const tableData = [];

        for (let i = 0; i < langArray.length; i++) {
            langArray[i]['response'] = langArray[i]['response'].replace(/\\'/g, '\'');

            tableData.push([
                langArray[i]['id'],
                langArray[i]['response'],
                $('<div/>', {
                    'class': 'btn-group'
                }).append($('<button/>', {
                    'type': 'button',
                    'class': 'btn btn-xs btn-danger',
                    'style': 'float: right',
                    'data-toggle': 'tooltip',
                    'title': 'Удалить строку',
                    'data-id': langArray[i]['id'],
                    'data-response': langArray[i]['response'],
                    'html': $('<i/>', {
                        'class': 'fa fa-trash'
                    })
                })).append($('<button/>', {
                    'type': 'button',
                    'class': 'btn btn-xs btn-warning',
                    'style': 'float: right',
                    'data-toggle': 'tooltip',
                    'title': 'Редактировать строку',
                    'data-id': langArray[i]['id'],
                    'data-response': langArray[i]['response'],
                    'html': $('<i/>', {
                        'class': 'fa fa-edit'
                    })
                })).html()
            ])
        }

        // if the table exists, destroy it.
        if ($.fn.DataTable.isDataTable('#langTable')) {
            $('#langTable').DataTable().destroy();
            // Remove all of the old events.
            $('#langTable').off();
        }

        // Create table.
        let table = $('#langTable').DataTable({
            'searching': true,
            'autoWidth': false,
            'lengthChange': false,
            'paging': false,
            'data': tableData,
            'columnDefs': [
                { 'className': 'default-table', 'orderable': false, 'targets': 2 },
                { 'width': '25%', 'targets': 0 }
            ],
            'columns': [
                { 'title': 'ID' },
                { 'title': 'Отклик' },
                { 'title': 'Опции' }
            ]
        });

        // On delete button.
        table.on('click', '.btn-danger', function() {
            const row = $(this).parents('tr'),
                id = $(this).data('id');

            // Ask the user if he wants to delete the lang.
            helpers.getConfirmDeleteModal('lang_modal_remove', 'Вы уверены, что хотите удалить языковую строку?', true,
                'Языковая строка успешно удалена', function() { // Callback if the user clicks delete.
                // Remove the table row.
                table.row(row).remove().draw(false);
            });
        });

        // On edit button.
        table.on('click', '.btn-warning', function() {
            const t = $(this);

            helpers.getModal('edit-lang', 'Редактирование языковой строки', 'Сохранить', $('<form/>', {
                'role': 'form'
            })
            // ID for the lang.
            .append(helpers.getInputGroup('lang-id', 'text', 'ID', '', t.data('id'), 'ID языковой строки'))
            // Resonse for the lang.
            .append(helpers.getTextAreaGroup('lang-response', 'text', 'Отклик', '', t.data('response').replace(/\\'/g, '\''), 'Текст отклика языковой строки')), function() {
                let id = $('#lang-id'),
                    response = $('#lang-response');

                switch (false) {
                    case helpers.handleInputString(id):
                    case helpers.handleInputString(response):
                        break;
                    default:
                        // Update the special chars.
                        id = id.val().replace(/[^a-zA-Z0-9-\.]+/g, '-');

                        // Update the table.
                        $('#langTable').DataTable().row(t.parents('tr')).data([
                            id,
                            response.val(),
                            $('<div/>', {
                                'class': 'btn-group'
                            }).append($('<button/>', {
                                'type': 'button',
                                'class': 'btn btn-xs btn-danger',
                                'style': 'float: right',
                                'data-toggle': 'tooltip',
                                'title': 'Удалить строку',
                                'data-id': id,
                                'data-response': response.val(),
                                'html': $('<i/>', {
                                    'class': 'fa fa-trash'
                                })
                            })).append($('<button/>', {
                                'type': 'button',
                                'class': 'btn btn-xs btn-warning',
                                'style': 'float: right',
                                'data-toggle': 'tooltip',
                                'title': 'Редактировать строку',
                                'data-id': id,
                                'data-response': response.val(),
                                'html': $('<i/>', {
                                    'class': 'fa fa-edit'
                                })
                            })).html()
                        ]).draw(false);

                        // Alert the user.
                        toastr.success('Языковая строка успешно обновлена');

                        // Close the modal.
                        $('#edit-lang').modal('toggle');
                }
            }).modal('toggle');
        });
    }

    function cleanLangID(obj) {
        return obj.val(obj.val().replace(/[^a-zA-Z0-9-\.]+/g, '-'));
    }

    // Load the table for now.
    loadLang([]);
});