// Function that querys all of the data we need.
$(run = function() {
    // Check if the module is enabled.
    socket.getDBValue('dual_stream_command_module', 'modules', './commands/dualstreamCommand.js', function(e) {
        // If the module is off, don't load any data.
        if (!helpers.getModuleStatus('dualStreamModule', e.modules)) {
            return;
        }

        // Get the URL.
        socket.getDBValue('get_multi_link', 'dualStreamCommand', 'otherChannels', function(e) {
            let channels = e.dualStreamCommand;

            if (channels.indexOf('Channel-1') === -1) {
                $('#multi-channels').val(channels.split(' ').join('/'));
            }

            $('#multi-main').html('https://multistre.am/' + getChannelName() + '/');
        });
    });
});

// Function that handlers the loading of events.
$(function() {
    // Toggle for the module.
    $('#dualStreamModuleToggle').on('change', function() {
        // Enable the module then query the data.
        socket.sendCommandSync('dual_stream_command_module_toggle_cmd',
            'module ' + ($(this).is(':checked') ? 'enablesilent' : 'disablesilent') + ' ./commands/dualstreamCommand.js', run);
    });

    // Clip url update.
    $('#multi-channels').on('focusout', function() {
        let channels = $('#multi-channels').val();

        // If the box is empty, set the default channels.
        if (channels.length < 1) {
            channels = '';
        } else {
            channels = channels.split('/').join(' ');
        }

        // Update the channels.
        socket.updateDBValue('update_multi_channels', 'dualStreamCommand', 'otherChannels', channels, function() {
            socket.sendCommand('update_multi_channels_cmd', 'reloadmulti', function() {
                toastr.success('Ссылка мультистрима успешно отредактирована (или скопирована)');
            });
        });
    });

    // Copy button.
    $('#dualstream-copy-btn').on('click', function() {
        let old = $('#multi-channels').val();

        // Copy text.
        $('#multi-channels').val('https://multistre.am/' + getChannelName() + '/' + old).select();

        // Copy the text.
        document.execCommand('Copy');

        // Set back the old text.
        $('#multi-channels').val(old);
    });

    // Settings button.
    $('#dualstream-settings-button').on('click', function() {
        socket.getDBValues('get_multi_settings', {
            tables: ['dualStreamCommand', 'dualStreamCommand', 'dualStreamCommand'],
            keys: ['timerToggle', 'timerInterval', 'reqMessages']
        }, true, function(e) {
            helpers.getModal('dualstream-settings', 'Настройки мультистрима', 'Сохранить', $('<form/>', {
                'role': 'form'
            })
            // Append a select option for the toggle.
            .append(helpers.getDropdownGroup('multi-toggle', 'Автопубликация',
                (e.timerToggle === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'], 'Автопубликация ссылки мультистрима через заданные интервалы времени'))
            // Timer interval.
            .append(helpers.getInputGroup('multi-interval', 'text', 'Интервал',
                '', e.timerInterval, 'Интервал времени между автопубликациями ссылки мультистрима, в минутах'))
            // Req messages.
            .append(helpers.getInputGroup('multi-req', 'text', 'Минимум сообщений',
                '', e.reqMessages, 'Минимальное необходимое количество сообщений в чате между автопубликациями ссылки мультистрима')),
            function() { // Callback for when the user clicks save.
                let timerToggle = $('#multi-toggle').find(':selected').text() === 'Да',
                    timerInterval = $('#multi-interval'),
                    timerReq = $('#multi-req');

                switch (false) {
                    case helpers.handleInputNumber(timerInterval, 1):
                    case helpers.handleInputNumber(timerReq, 1):
                        break;
                    default:
                        socket.updateDBValues('update_multi_settings', {
                            tables: ['dualStreamCommand', 'dualStreamCommand', 'dualStreamCommand'],
                            keys: ['timerToggle', 'timerInterval', 'reqMessages'],
                            values: [timerToggle, timerInterval.val(), timerReq.val()]
                        }, function() {
                            socket.sendCommand('update_multi_settings_cmd', 'reloadmulti', function() {
                                // Close the modal.
                                $('#dualstream-settings').modal('toggle');
                                // Alert the user.
                                toastr.success('Настройки мультистрима успешно обновлены');
                            });
                        });
                }
            }).modal('toggle');
        });
    });
});
