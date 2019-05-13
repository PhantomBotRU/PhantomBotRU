// Function that querys all of the data we need.
$(run = function() {
    // Get health settings.
    socket.getDBValues('time_get_settings', {
        tables: ['modules', 'healthSettings', 'healthSettings', 'healthSettings', 'healthSettings', 'healthSettings', 'healthSettings', 'healthSettings', 'healthSettings', 'healthSettings', 'healthSettings', 'healthSettings', 'healthSettings'],
        keys: ['./custom/systems/healthSystem.js', 'baseCommand', 'hydrationml', 'hydrationtimer', 'hydration', 'hungertimer', 'hunger', 'movementtimer', 'movement', 'sleeptimer', 'sleep', 'wellbeingtimer', 'wellbeing']
    }, true, function(e) {
        if (!helpers.getModuleStatus('healthModule', e['./custom/systems/healthSystem.js'], 'healthModuleToggle')) {
            return;
        }
        // Set the health settings.
        $('#baseCommand').val(e.baseCommand);
        $('#hydrationml').val(e.hydrationml);
        $('#hydrationtimer').val(e.hydrationtimer);
        $('#hydration').val((e.hydration === 'true' ? 'Да' : 'Нет'));
        $('#hungertimer').val(e.hungertimer);
        $('#hunger').val((e.hunger === 'true' ? 'Да' : 'Нет'));
        $('#movementtimer').val(e.movementtimer);
        $('#movement').val((e.movement === 'true' ? 'Да' : 'Нет'));
        $('#sleeptimer').val(e.sleeptimer);
        $('#sleep').val((e.sleep === 'true' ? 'Да' : 'Нет'));
        $('#wellbeingtimer').val(e.wellbeingtimer);
        $('#wellbeing').val((e.wellbeing === 'true' ? 'Да' : 'Нет'));
    });
});

// Function that handlers the loading of events.
$(function() {
    $('#healthModuleToggle').on('change', function () {
        socket.sendCommandSync('health_module_toggle_cmd', 'module ' + ($(this).is(':checked') ? 'enablesilent' : 'disablesilent') + ' ./custom/systems/healthSystem.js', run)
    });
    // Save time settings.
    $('#health-save-all').on('click', function() {
        let hydrationml = $('#hydrationml'),
            hydrationtimer = $('#hydrationtimer'),
            hydration = $('#hydration').find(':selected').text() === 'Да',
            hungertimer = $('#hungertimer'),
            hunger = $('#hunger').find(':selected').text() === 'Да',
            movementtimer = $('#movementtimer'),
            movement = $('#movement').find(':selected').text() === 'Да',
            sleeptimer = $('#sleeptimer'),
            sleep = $('#sleep').find(':selected').text() === 'Да';
            wellbeingtimer = $('#wellbeingtimer'),
            wellbeing = $('#wellbeing').find(':selected').text() === 'Да';

        // Make sure everything has a value.
        switch (false) {
            case helpers.handleInputNumber(hydrationml, 50):
            case helpers.handleInputNumber(hydrationtimer, 15):
            case helpers.handleInputNumber(hungertimer, 60):
            case helpers.handleInputNumber(movementtimer, 15):
            case helpers.handleInputNumber(sleeptimer, 240):
            case helpers.handleInputNumber(wellbeingtimer, 15):
                break;
            default:
                // Update database.
                socket.updateDBValues('health_update_settings', {
                    tables: ['healthSettings', 'healthSettings', 'healthSettings', 'healthSettings', 'healthSettings', 'healthSettings', 'healthSettings', 'healthSettings', 'healthSettings', 'healthSettings', 'healthSettings'],
                    keys: ['hydrationml', 'hydrationtimer', 'hydration', 'hungertimer', 'hunger', 'movementtimer', 'movement', 'sleeptimer', 'sleep', 'wellbeingtimer', 'wellbeing'],
                    values: [hydrationml.val(), hydrationtimer.val(), hydration, hungertimer.val(), hunger, movementtimer.val(), movement, sleeptimer.val(), sleep, wellbeingtimer.val(), wellbeing]
                }, function() {
                    socket.sendCommand('health_reload_settings', 'reloadHealth', function () {
                        run();
                        toastr.success('Настройки режимов питья, питания, движения и сна обновлены');
                    })
                });
        }
    });

    // Settings button.
    $('#health-settings-button').on('click', function() {
        socket.getDBValues('time_get_settings', {
            tables: ['healthSettings'],
            keys: ['baseCommand']
        }, true, function(e) {
            helpers.getModal('health-settings', 'Настройки заботы о здоровье', 'Сохранить', $('<form/>', {
                'role': 'form'
            })
            // Base command.
            .append(helpers.getInputGroup('base-command', 'text', 'Команда',
                'health', e.baseCommand, 'Имя команды')),
            function() { // Callback for when the user clicks save.
                let baseCommand = $('#base-command');

                switch (false) {
                    case helpers.handleInputString(baseCommand):
                        break;
                    default:
                        socket.updateDBValues('health_update_settings', {
                            tables: ['healthSettings'],
                            keys: ['baseCommand'],
                            values: [baseCommand.val()]
                        }, function() {
                            socket.sendCommand('health_reload_settings', 'reloadHealth', function() {
                                // Close the modal.
                                $('#health-settings').modal('toggle');
                                // Alert the user.
                                toastr.success('Настройки заботы о здоровье успешно обновлены');
                            });
                        });
                }
            }).modal('toggle');
        });
    });

});
