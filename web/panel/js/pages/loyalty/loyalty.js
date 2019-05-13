// Function that querys all of the data we need.
$(run = function() {
    // Get time settings.
    socket.getDBValues('time_get_settings', {
        tables: ['timeSettings', 'timeSettings', 'timeSettings', 'timeSettings', 'settings', 'settings'],
        keys: ['timeLevel', 'timeLevelWarning', 'keepTimeWhenOffline', 'timePromoteHours', 'topListAmountTime', 'timezone']
    }, true, function(e) {
        // Set the bot timezone.
        $('#loyalty-timezone').val((e.timezone === null ? 'Europe/Moscow' : e.timezone));
        // Auto add time when offline.
        $('#time-offline').val((e.keepTimeWhenOffline === 'true' ? 'Да' : 'Нет'));
        // Auto promote users.
        $('#time-promote').val((e.timeLevel === 'true' ? 'Да' : 'Нет'));
        // Auto promote chat notice
        $('#time-promote-notice').val((e.timeLevelWarning === 'true' ? 'Да' : 'Нет'));
        // Time to be promoted.
        $('#loyalty-promotion').val(e.timePromoteHours);
        // Top list amount.
        $('#loyalty-top').val(e.topListAmountTime);
    });
});

// Function that handlers the loading of events.
$(function() {
    // Button that reloads the time top 100.
    $('#loyalty-reload').on('click', function() {
        // Reload all.
        run();
        // Alert the user.
        toastr.success('Топ-100 обладателей стажа успешно обновлён');
    });

    // Get user time button.
    $('#time-get-user').on('click', function() {
        let username = $('#time-username').val().toLowerCase();

        if (username.length > 0) {
            socket.getDBValue('time_get_user_total', 'time', username, function(e) {
                $('#time-username-time').val((e.time === null ? '0' : e.time));
            });
        }
    });

    // Save user points.
    $('#time-save-user').on('click', function() {
        let username = $('#time-username'),
            time = $('#time-username-time');

        // Make sure both input have something.
        switch (false) {
            case helpers.handleInputString(username):
            case helpers.handleInputNumber(time):
                break;
            default:
                // Save user time.
                socket.updateDBValue('time_update_user', 'time', username.val().toLowerCase(), time.val(), function() {
                    // Alert the user.
                    toastr.success('Стаж пользователя ' + username.val() + ' успешно обновлён');

                    // Reset box values.
                    username.val('');
                    time.val('');
                });
        }
    });

    // Save time settings.
    $('#loyalty-save-all').on('click', function() {
        let timeZone = $('#loyalty-timezone'),
            countOfflineTime = $('#time-offline').find(':selected').text() === 'Да',
            timePromote = $('#time-promote').find(':selected').text() === 'Да',
            timePromoteNotice = $('#time-promote-notice').find(':selected').text() === 'Да',
            regHours = $('#loyalty-promotion'),
            timeTop = $('#loyalty-top');

        // Make sure everything has a value.
        switch (false) {
            case helpers.handleInputString(timeZone):
            case helpers.handleInputNumber(regHours):
            case helpers.handleInputNumber(timeTop):
                break;
            default:
                // Update database.
                socket.updateDBValues('time_update_settings', {
                    tables: ['timeSettings', 'timeSettings', 'timeSettings', 'timeSettings', 'settings', 'settings'],
                    keys: ['timeLevel', 'timeLevelWarning', 'keepTimeWhenOffline', 'timePromoteHours', 'topListAmountTime', 'timezone'],
                    values: [timePromote, timePromoteNotice, countOfflineTime, regHours.val(), (parseInt(timeTop.val()) > 15 ? 15 : timeTop.val()), timeZone.val()]
                }, function() {
                    socket.sendCommand('update_time_settings_cmd', 'reloadtop', function() {
                        toastr.success('Настройки стажа успешно обновлены');
                    });
                });
        }
    });
});
