// Function that querys all of the data we need.
$(function() {
    // Get all module toggles.
    socket.getDBValues('games_get_modules', {
        tables: ['modules', 'modules', 'modules', 'modules', 'modules', 'modules', 'modules', 'modules'],
        keys: ['./games/adventureSystem.js', './games/gambling.js', './games/killCommand.js', './games/random.js', './games/roll.js',
                './games/roulette.js', './games/slotMachine.js', './games/8ball.js']
    }, true, function(results) {
        // Handle the settings button.
        let keys = Object.keys(results),
            module = '',
            i;

        for (i = 0; i < keys.length; i++) {
            // Handle the status of the buttons.
            if (results[keys[i]] === 'false') {
                module = keys[i].substring(keys[i].lastIndexOf('/') + 1).replace('.js', '');

                // Handle the switch.
                $('#' + module + 'Toggle').prop('checked', false);
                // Handle the settings button.
                $('#' + module + 'Settings').prop('disabled', true);
            }
        }
    });
});

// Function that handlers the loading of events.
$(function() {
    // Module toggle for games.
    $('[data-game-toggle]').on('change', function() {
        let name = $(this).attr('id'),
            checked = $(this).is(':checked');

        // Handle the module.
        socket.sendCommandSync('game_module_toggle', 'module ' + (checked ? 'enablesilent' : 'disablesilent') + ' ' + $(this).data('game-toggle'), function() {
            // Toggle the settings button.
            $('#' + name.replace('Toggle', 'Settings')).prop('disabled', !checked);
            // Alert the user.
            toastr.success('Модуль игры успешно ' + (checked ? 'включен' : 'выключен'));
        });
    });

    // Adventure settings.
    $('#adventureSystemSettings').on('click', function() {
        socket.getDBValues('get_adventure_settings', {
            tables: ['adventureSettings', 'adventureSettings', 'adventureSettings', 'adventureSettings', 'adventureSettings', 'adventureSettings',
                    'adventureSettings', 'adventureSettings'],
            keys: ['joinTime', 'coolDown', 'gainPercent', 'minBet', 'maxBet', 'enterMessage', 'warningMessage', 'coolDownAnnounce']
        }, true, function(e) {
            helpers.getModal('adventure-settings', 'Настройки игры «Приключения»', 'Сохранить', $('<form/>', {
                'role': 'form'
            })
            // Add the toggle the entry messages.
            .append(helpers.getDropdownGroup('entry-messages', 'Enable Adventure Entry Messages', (e.enterMessage === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'],
                'If a message should be said when a user joins the adventure.'))
            // Add the toggle the entry messages.
            .append(helpers.getDropdownGroup('user-messages', 'Enable Adventure Warning Messages', (e.warningMessage === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'],
                'If a message when a user already entered should be displayed in chat.'))
            // Add the toggle the cooldown message.
            .append(helpers.getDropdownGroup('cooldown-message', 'Enable Adventure Off Cooldown Message', (e.coolDownAnnounce === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'],
                'If a message should be said when the adventure is no longer on cooldown.'))
            // Add the the box for the join time.
            .append(helpers.getInputGroup('join-time', 'number', 'Adventure Join Time (Seconds)', '', e.joinTime, 'How long in seconds users have to join the adventure.'))
            // Add the the box for the cooldown.
            .append(helpers.getInputGroup('cooldown-time', 'number', 'Кулдаун', '', e.coolDown,
                'How long users have to wait in seconds before starting a new adventure after one is over, в секундах'))
            // Add the the box for gain.
            .append(helpers.getInputGroup('gain', 'number', 'Adventure Gain Percent', '', e.gainPercent,
                'How many points a user will get based on the amount they joined with. The join amount is always given back.'))
            // Add the the box for min bet.
            .append(helpers.getInputGroup('min-bet', 'number', 'Минимальная ставка', '', e.minBet, 'Минимальная входная стоимость участия в игре «Приключения», в поинтах'))
            // Add the the box for max bet.
            .append(helpers.getInputGroup('max-bet', 'number', 'Максимальная ставка', '', e.maxBet, 'Максимальная входная стоимость участия в игре «Приключения», в поинтах')),
            function() { // Callback once the user clicks save.
                let entryMessages = $('#entry-messages').find(':selected').text() === 'Да',
                    userMessages = $('#user-messages').find(':selected').text() === 'Да',
                    cooldownMessage = $('#cooldown-message').find(':selected').text() === 'Да',
                    joinTime = $('#join-time'),
                    cooldownTime = $('#cooldown-time'),
                    gainPercent = $('#gain'),
                    minBet = $('#min-bet'),
                    maxBet = $('#max-bet');

                // Make sure everything has been filled in.
                switch (false) {
                    case helpers.handleInputNumber(joinTime, 30):
                    case helpers.handleInputNumber(cooldownTime, 10):
                    case helpers.handleInputNumber(gainPercent, 1):
                    // Ненужный повтор case helpers.handleInputNumber(joinTime, 30): 
                    case helpers.handleInputNumber(minBet, 1):
                    case helpers.handleInputNumber(maxBet, 1):
                        break;
                    default:
                        socket.updateDBValues('adventure_update_settings', {
                            tables: ['adventureSettings', 'adventureSettings', 'adventureSettings', 'adventureSettings', 'adventureSettings', 'adventureSettings',
                                    'adventureSettings', 'adventureSettings'],
                            keys: ['joinTime', 'coolDown', 'gainPercent', 'minBet', 'maxBet', 'enterMessage', 'warningMessage', 'coolDownAnnounce'],
                            values: [joinTime.val(), cooldownTime.val(), gainPercent.val(), minBet.val(), maxBet.val(), entryMessages, userMessages, cooldownMessage]
                        }, function() {
                            socket.sendCommand('adventure_update_settings_cmd', 'reloadadventure', function() {
                                // Close the modal.
                                $('#adventure-settings').modal('toggle');
                                // Alert the user.
                                toastr.success('Настройки игры «Приключения» успешно обновлены');
                            });
                        });
                }
            }).modal('toggle');
        });
    });

    // Roulette settings.
    $('#rouletteSettings').on('click', function() {
        socket.getDBValue('get_roulette_settings', 'roulette', 'timeoutTime', function(e) {
            helpers.getModal('roulette-settings', 'Настройки игры «Русская рулетка»', 'Сохранить', $('<form/>', {
                'role': 'form'
            })
            // Add the box timeout time
            .append(helpers.getInputGroup('timeout-time', 'number', 'Таймаут', '', e.roulette, 'Длительность таймаута в случае неудачи, в секундах')),
            function() { // Callback once the user clicks save.
                let timeoutTime = $('#timeout-time');

                switch (false) {
                    case helpers.handleInputNumber(timeoutTime, 1):
                        break;
                    default:
                        socket.updateDBValue('update_roulette_settings', 'roulette', 'timeoutTime', timeoutTime.val(), function() {
                            socket.sendCommand('update_roulette_settings_cmd', 'reloadroulette', function() {
                                // Close the modal.
                                $('#roulette-settings').modal('toggle');
                                // Alert the user.
                                toastr.success('Настройки игры «Русская рулетка» успешно обновлены');
                            });
                        });
                }
            }).modal('toggle');
        });
    });

    // Slot machine settings.
    $('#slotMachineSettings').on('click', function() {
        socket.getDBValues('get_slot_machine_settings', {
            tables: ['slotmachine', 'slotmachine', 'slotmachine', 'slotmachine', 'slotmachine', 'slotmachineemotes', 'slotmachineemotes', 'slotmachineemotes',
                    'slotmachineemotes', 'slotmachineemotes'],
            keys: ['prizes_0', 'prizes_1', 'prizes_2', 'prizes_3', 'prizes_4', 'emote_0', 'emote_1', 'emote_2', 'emote_3', 'emote_4']
        }, true, function(e) {
            helpers.getModal('slotmachine-game', 'Настройки игры «Слот-машина»', 'Сохранить', $('<form/>', {
                'role': 'form'
            })
            // Add the div for the col boxes.
            .append($('<div/>', {
                'class': 'panel-group',
                'id': 'accordion'
            })
            // Append first collapsible accordion.
            .append(helpers.getCollapsibleAccordion('main-1', 'Вознаграждения', $('<form/>', {
                    'role': 'form'
                })
                // Add the reward 1 slot.
                .append(helpers.getInputGroup('reward-1', 'number', 'Вознаграждение слота №1', '', e.prizes_0, 'Вознаграждение для 1-го слота, в поинтах'))
                // Add the reward 2 slot.
                .append(helpers.getInputGroup('reward-2', 'number', 'Вознаграждение слота №2', '', e.prizes_1, 'Вознаграждение для 2-го слота, в поинтах'))
                // Add the reward 3 slot.
                .append(helpers.getInputGroup('reward-3', 'number', 'Вознаграждение слота №3', '', e.prizes_2, 'Вознаграждение для 3-го слота, в поинтах'))
                // Add the reward 4 slot.
                .append(helpers.getInputGroup('reward-4', 'number', 'Вознаграждение слота №4', '', e.prizes_3, 'Вознаграждение для 4-го слота, в поинтах'))
                // Add the reward 5 slot.
                .append(helpers.getInputGroup('reward-5', 'number', 'Вознаграждение слота №5', '', e.prizes_4, 'Вознаграждение для 5-го слота, в поинтах'))))
            // Append second collapsible accordion.
            .append(helpers.getCollapsibleAccordion('main-2', 'Смайлы', $('<form/>', {
                    'role': 'form'
                })
                // Add the emote 1 slot.
                .append(helpers.getInputGroup('emote-1', 'text', 'Смайл слота №1', '', e.emote_0, 'Смайл для 1-го слота'))
                // Add the emote 2 slot.
                .append(helpers.getInputGroup('emote-2', 'text', 'Смайл слота №2', '', e.emote_1, 'Смайл для 2-го слота'))
                // Add the emote 3 slot.
                .append(helpers.getInputGroup('emote-3', 'text', 'Смайл слота №3', '', e.emote_2, 'Смайл для 3-го слота'))
                // Add the emote 4 slot.
                .append(helpers.getInputGroup('emote-4', 'text', 'Смайл слота №4', '', e.emote_3, 'Смайл для 4-го слота'))
                // Add the emote 5 slot.
                .append(helpers.getInputGroup('emote-5', 'text', 'Смайл слота №5', '', e.emote_4, 'Смайл для 5-го слота'))))),
            function() { // Callback for when the user clicks save.
                let values = [];

                // Get all prices.
                for (let i = 1; i <= 5; i++) {
                    let valObj = $('#reward-' + i);

                    if (!helpers.handleInputNumber(valObj, 0)) {
                        return;
                    }
                    values.push(valObj.val());
                }

                // Get all emotes.
                for (let i = 1; i <= 5; i++) {
                    let valObj = $('#emote-' + i);

                    if (!helpers.handleInputString(valObj)) {
                        return;
                    }
                    values.push(valObj.val());
                }

                // Update settings.
                socket.updateDBValues('update_slot_settings', {
                    tables: ['slotmachine', 'slotmachine', 'slotmachine', 'slotmachine', 'slotmachine', 'slotmachineemotes', 'slotmachineemotes',
                            'slotmachineemotes', 'slotmachineemotes', 'slotmachineemotes'],
                    keys: ['prizes_0', 'prizes_1', 'prizes_2', 'prizes_3', 'prizes_4', 'emote_0', 'emote_1', 'emote_2', 'emote_3', 'emote_4'],
                    values: values
                }, function() {
                    // Close the modal.
                    $('#slotmachine-game').modal('toggle');
                    // Alert the user.
                    toastr.success('Настройки игры «Слот-машина» успешно обновлены');
                });
            }).modal('toggle');
        });
    });

    // Role settings.
    $('#rollSettings').on('click', function() {
        socket.getDBValues('get_roll_settings', {
            tables: ['rollprizes', 'rollprizes', 'rollprizes', 'rollprizes', 'rollprizes', 'rollprizes'],
            keys: ['prizes_0', 'prizes_1', 'prizes_2', 'prizes_3', 'prizes_4', 'prizes_5']
        }, true, function(e) {
            helpers.getModal('roll-settings', 'Настройки игры «Игральные кости»', 'Сохранить', $('<form/>', {
                'role': 'form'
            })
            // Add the reward 1.
            .append(helpers.getInputGroup('reward-1', 'number', 'Double 1s Reward', '', e.prizes_0, 'Reward for rolling double 1s.'))
            // Add the reward 2.
            .append(helpers.getInputGroup('reward-2', 'number', 'Double 2s Reward', '', e.prizes_1, 'Reward for rolling double 2s.'))
            // Add the reward 3.
            .append(helpers.getInputGroup('reward-3', 'number', 'Double 3s Reward', '', e.prizes_2, 'Reward for rolling double 3s.'))
            // Add the reward 4.
            .append(helpers.getInputGroup('reward-4', 'number', 'Double 4s Reward', '', e.prizes_3, 'Reward for rolling double 4s.'))
            // Add the reward 5.
            .append(helpers.getInputGroup('reward-5', 'number', 'Double 5s Reward', '', e.prizes_4, 'Reward for rolling double 5s.'))
            // Add the reward 6.
            .append(helpers.getInputGroup('reward-6', 'number', 'Double 6s Reward', '', e.prizes_5, 'Reward for rolling double 6s.')),
            function() { // Callback for when the user clicks save.
                let values = [];

                // Get all rewards
                for (let i = 1; i <= 6; i++) {
                    let valObj = $('#reward-' + i);

                    if (!helpers.handleInputNumber(valObj, 0)) {
                        return;
                    }
                    values.push(valObj.val());
                }

                // Update the rewards.
                socket.updateDBValues('roll_update_settings', {
                    tables: ['rollprizes', 'rollprizes', 'rollprizes', 'rollprizes', 'rollprizes', 'rollprizes'],
                    keys: ['prizes_0', 'prizes_1', 'prizes_2', 'prizes_3', 'prizes_4', 'prizes_5'],
                    values: values
                }, function() {
                    // Close the modal.
                    $('#roll-settings').modal('toggle');
                    // Alert the user.
                    toastr.success('Настройки игры «Игральные кости» успешно обновлены');
                });
            }).modal('toggle');
        });
    });

    // Gambling settings.
    $('#gamblingSettings').on('click', function() {
        socket.getDBValues('get_gambling_settings', {
            tables: ['gambling', 'gambling', 'gambling', 'gambling'],
            keys: ['winGainPercent', 'winRange', 'max', 'min']
        }, true, function(e) {
            helpers.getModal('gambling-settings', 'Настройки азартной игры', 'Сохранить', $('<form/>', {
                'role': 'form'
            })
            // Add the gambling gain percent.
            .append(helpers.getInputGroup('gambling-gain', 'number', 'Gambling Gain Percent', '', e.winGainPercent,
                'How many points are given based on what the user gambled. The gambled amount is always given back.'))
            // Add the gambling win range.
            .append(helpers.getInputGroup('gambling-range', 'number', 'Gambling Winning Range', '', e.winRange,
                'The winning range of the gambling game. Anything gambled below this number will be a lost. Maximum is 100.'))
            // Add the gambling max.
            .append(helpers.getInputGroup('gambling-max', 'number', 'Gambling Maximum Amount', '', e.max,
                'The maximum amount of points that can be gambled at once.'))
            // Add the gambling min.
            .append(helpers.getInputGroup('gambling-min', 'number', 'Gambling Minimum Amount', '', e.min,
                'The minimum amount of points that can be gambled at once.')),
            function() { // Callback once the user clicks save.
                let winGain = $('#gambling-gain'),
                    winRange = $('#gambling-range'),
                    max = $('#gambling-max'),
                    min = $('#gambling-min');

                switch (false) {
                    case helpers.handleInputNumber(winGain, 1, 100):
                    case helpers.handleInputNumber(winRange, 1, 100):
                    case helpers.handleInputNumber(max, 1):
                    case helpers.handleInputNumber(min, 1):
                        break;
                    default:
                        socket.updateDBValues('update_gambling_settings', {
                            tables: ['gambling', 'gambling', 'gambling', 'gambling'],
                            keys: ['winGainPercent', 'winRange', 'max', 'min'],
                            values: [winGain.val(), winRange.val(), max.val(), min.val()]
                        }, function() {
                            socket.sendCommand('update_gambling_settings_cmd', 'reloadgamble', function() {
                                // Close the modal.
                                $('#gambling-settings').modal('toggle');
                                // Alert the user.
                                toastr.success('Настройки азартной игры успешно обновлены');
                            });
                        });
                }
            }).modal('toggle');
        });
    });

    // Kill settings.
    $('#killCommandSettings').on('click', function() {
        socket.getDBValue('get_kill_settings', 'settings', 'killTimeoutTime', function(e) {
            helpers.getModal('killcmd-settings', 'Настройки игры «Покушения»', 'Сохранить', $('<form/>', {
                'role': 'form'
            })
            // Add the kill timeout.
            .append(helpers.getInputGroup('kill-timeout', 'number', 'Таймаут', '', e.settings,
                'Таймаут в случае попадания в реанимацию, в секундах')),
            function() { // Callback once the user clicks save.
                let killTimeout = $('#kill-timeout');

                switch (false) {
                    case helpers.handleInputNumber(killTimeout, 1):
                        break;
                    default:
                        socket.updateDBValue('update_kill_settings', 'settings', 'killTimeoutTime', killTimeout.val(), function() {
                            socket.sendCommand('update_kill_settings_cmd', 'reloadkill', function() {
                                // Close the modal.
                                $('#killcmd-settings').modal('toggle');
                                // Alert the user.
                                toastr.success('Настройки игры «Покушения» успешно обновлены');
                            });
                        });
                }
            }).modal('toggle');
        });
    });

    // Random command settings.
    $('#randomSettings').on('click', function() {
        socket.getDBValue('get_random_settings', 'randomSettings', 'pg13toggle', function(e) {
            helpers.getModal('random-settings', 'Настройки игры «Случайные ответы»', 'Сохранить', $('<form/>', {
                'role': 'form'
            })
            // Add the toggle the entry messages.
            .append(helpers.getDropdownGroup('pg-mode', '16+', (e.randomSettings === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'],
                'Возрастное ограничение ответов')),
            function() { // Callback once the user clicks save.
                let toggle = $('#pg-mode').find(':selected').text() === 'Да';

                socket.updateDBValue('update_random_settings', 'randomSettings', 'pg13toggle', toggle, function() {
                    socket.wsEvent('update_random_settings_ws', './games/random.js', null, [], function() {
                        // Close the modal.
                        $('#random-settings').modal('toggle');
                        // Alert the user.
                        toastr.success('Настройки игры «Случайные ответы» успешно обновлены');
                    });
                });
            }).modal('toggle');
        });
    });
});
