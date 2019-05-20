/*
 * Copyright (C) 2016-2018 phantom.bot
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

// Function that querys all of the data we need.
$(run = function() {
    // Check if the module is enabled.
    socket.getDBValue('audio_module', 'modules', './systems/audioPanelSystem.js', function(e) {
        // If the module is off, don't load any data.
        if (!helpers.getModuleStatus('audioHookModule', e.modules)) {
            // Disable the tab selection.
            $('#audiohooks_t, #audiocommands_t').addClass('disabled').parent().addClass('disabled');
            return;
        } else {
            // Enable the tab selection.
            $('#audiohooks_t, #audiocommands_t').removeClass('disabled').parent().removeClass('disabled');
        }

        // Get all audio hooks.
        socket.getDBTableValues('get_audio_hooks', 'audio_hooks', function(results) {
            let tableData = [];

            for (let i = 0; i < results.length; i++) {
                tableData.push([
                    results[i].key,
                    $('<div/>', {
                        'class': 'btn-group'
                    }).append($('<button/>', {
                        'type': 'button',
                        'class': 'btn btn-xs btn-danger disabled',
                        // 'style': 'float: right',
                        'data-toggle': 'tooltip',
                        'title': 'Удалить звук (недоступно)',
                        'data-audio': results[i].key,
                        'html': $('<i/>', {
                            'class': 'fa fa-trash'
                        })
                    })).append($('<button/>', {
                        'type': 'button',
                        'class': 'btn btn-xs btn-success',
                        'style': 'float: right',
                        'data-toggle': 'tooltip',
                        'title': 'Воспроизвести звук',
                        'data-audio': results[i].value,
                        'html': $('<i/>', {
                            'class': 'fa fa-play'
                        })
                    })).html()
                ]);
            }

            // if the table exists, destroy it.
            if ($.fn.DataTable.isDataTable('#audioHooksTable')) {
                $('#audioHooksTable').DataTable().destroy();
                // Remove all of the old events.
                $('#audioHooksTable').off();
            }

            // Create table.
            let table = $('#audioHooksTable').DataTable({
                'searching': true,
                'autoWidth': false,
                'lengthChange': false,
                'data': tableData,
                'columnDefs': [
                    { 'className': 'default-table', 'orderable': false, 'targets': 1 }
                ],
                'columns': [
                    { 'title': 'Звук' },
                    { 'title': 'Опции' }
                ]
            });

            // On play button.
            table.on('click', '.btn-success', function() {
                let audioHook = $(this).data('audio'),
                    soundPath = '/config/audio-hooks/';

                // Load the audio.
                let audio = new Audio(soundPath + audioHook);
                // Set the volume.
                audio.volume = '0.8';
                // Add event handler.
                $(audio).on('ended', function() {
                    audio.currentTime = 0;
                });

                // Play it!
                audio.play();
            });

            // On delete button.
            table.on('click', '.btn-danger', function() {
                let audioHookName = $(this).data('audio'),
                    row = $(this).parents('tr');

                // Ask the user if he wants to delete the audio hook.
                helpers.getConfirmDeleteModal('audio_modal_remove', 'Вы уверены, что хотите удалить звук «' + audioHookName + '»?', true,
                    'Звук «' + audioHookName + '» успешно удалён', function() { // Callback if the user clicks delete.
                    socket.sendCommand('audio_hook_rm_cmd', 'panelremoveaudiohook ' + audioHookName, function() {
                        // Remove the table row.
                        table.row(row).remove().draw(false);
                    });
                });
            });
        });

        // Get audio commands.
        socket.getDBTableValues('audio_hooks_get_cmds', 'audioCommands', function(results) {
            let tableData = [];

            for (let i = 0; i < results.length; i++) {
                tableData.push([
                    '!' + results[i].key,
                    results[i].value,
                    $('<div/>', {
                        'class': 'btn-group'
                    }).append($('<button/>', {
                        'type': 'button',
                        'class': 'btn btn-xs btn-danger',
                        'style': 'float: right',
                        'data-toggle': 'tooltip',
                        'title': 'Удалить команду',
                        'data-command': results[i].key,
                        'html': $('<i/>', {
                            'class': 'fa fa-trash'
                        })
                    })).append($('<button/>', {
                        'type': 'button',
                        'class': 'btn btn-xs btn-warning',
                        'style': 'float: right',
                        'data-toggle': 'tooltip',
                        'title': 'Редактировать команду',
                        'data-command': results[i].key,
                        'html': $('<i/>', {
                            'class': 'fa fa-edit'
                        })
                    })).html()
                ]);
            }

            // if the table exists, destroy it.
            if ($.fn.DataTable.isDataTable('#audioHookCommandsTable')) {
                $('#audioHookCommandsTable').DataTable().destroy();
                // Remove all of the old events.
                $('#audioHookCommandsTable').off();
            }

            // Create table.
            let table = $('#audioHookCommandsTable').DataTable({
                'searching': true,
                'autoWidth': false,
                'lengthChange': false,
                'data': tableData,
                'columnDefs': [
                    { 'className': 'default-table', 'orderable': false, 'targets': 2 },
                    { 'width': '45%', 'targets': 0 }
                ],
                'columns': [
                    { 'title': 'Команда' },
                    { 'title': 'Звук' },
                    { 'title': 'Опции' }
                ]
            });

            // On delete button.
            table.on('click', '.btn-danger', function() {
                let command = $(this).data('command'),
                    row = $(this).parents('tr');

                // Ask the user if he want to remove the command.
                helpers.getConfirmDeleteModal('rm_audio_command_cmd_modal', 'Вы уверены, что хотите удалить звуковую команду «!' + command + '»?', true,
                    'Звуковая команда «!' + command + '» успешно удалена', function() {
                    socket.removeDBValue('rm_audio_command', 'audioCommands', command, function() {
                        socket.sendCommand('rm_audio_command_cmd', 'panelloadaudiohookcmds ' + command, function() {
                            // Remove the table row.
                            table.row(row).remove().draw(false);
                        });
                    });
                });
            });

            // On edit button.
            table.on('click', '.btn-warning', function() {
                let command = $(this).data('command'),
                    t = $(this);

                // Get all the info about the command.
                socket.getDBValues('audio_command_edit', {
                    tables: ['audioCommands', 'permcom', 'cooldown', 'pricecom', 'paycom'],
                    keys: [command, command, command, command, command]
                }, function(e) {
                    let cooldownJson = (e.cooldown === null ? { isGlobal: 'true', seconds: 0 } : JSON.parse(e.cooldown));

                    // Get advance modal from our util functions in /utils/helpers.js
                    helpers.getAdvanceModal('edit-audio-command', 'Редактирование звуковой команды', 'Сохранить', $('<form/>', {
                        'role': 'form'
                    })
                    // Append input box for the command name. This one is disabled.
                    .append(helpers.getInputGroup('command-name', 'text', 'Имя', '', '!' + command, 'Имя команды (не редактируется)', true))
                    // Append input box for the command audio. This one is disabled.
                    .append(helpers.getInputGroup('command-audio', 'text', 'Звук', '', e.audioCommands, 'Звук, воспроизводимый при вызове команды (не редактируется)', true))
                    // Append a select option for the command permission.
                    .append(helpers.getDropdownGroup('command-permission', 'Доступ', helpers.getGroupNameById(e.permcom),
                        ['Владелец', 'Администратор', 'Модератор', 'Подписчик', 'Донатор', 'VIP', 'Регуляр', 'Зритель'], 'Уровень доступа команды'))
                    // Add an advance section that can be opened with a button toggle.
                    .append($('<div/>', {
                        'class': 'collapse',
                        'id': 'advance-collapse',
                        'html': $('<form/>', {
                                'role': 'form'
                            })
                            // Append input box for the command cost.
                            .append(helpers.getInputGroup('command-cost', 'number', 'Плата', '0', helpers.getDefaultIfNullOrUndefined(e.pricecom, '0'),
                                'Плата за вызов команды, в поинтах'))
                            // Append input box for the command reward.
                            .append(helpers.getInputGroup('command-reward', 'number', 'Вознаграждение', '0', helpers.getDefaultIfNullOrUndefined(e.paycom, '0'),
                                'Вознаграждение за вызов команды, в поинтах'))
                            // Append input box for the command cooldown.
                            .append(helpers.getInputGroup('command-cooldown', 'number', 'Кулдаун', '5', cooldownJson.seconds,
                                'Длительность кулдауна, в секундах')
                                // Append checkbox for if the cooldown is global or per-user.
                                .append(helpers.getCheckBox('command-cooldown-global', cooldownJson.isGlobal === 'true', 'глобально',
                                    'Когда галочка установлена, кулдаун действует на всех пользователей сразу, а когда не установлена – на каждого пользователя персонально')))
                    })), function() {
                        let commandPermission = $('#command-permission'),
                            commandCost = $('#command-cost'),
                            commandReward = $('#command-reward'),
                            commandCooldown = $('#command-cooldown'),
                            commandCooldownGlobal = $('#command-cooldown-global').is(':checked');

                        // Handle each input to make sure they have a value.
                        switch (false) {
                            case helpers.handleInputNumber(commandCost):
                            case helpers.handleInputNumber(commandReward):
                            case helpers.handleInputNumber(commandCooldown):
                                break;
                            default:
                               // Save command information here and close the modal.
                                socket.updateDBValues('custom_command_edit', {
                                    tables: ['pricecom', 'permcom', 'paycom'],
                                    keys: [command, command, command],
                                    values: [commandCost.val(), helpers.getGroupIdByName(commandPermission.find(':selected').text(), true), commandReward.val()]
                                }, function() {
                                    // Add the cooldown to the cache.
                                    socket.wsEvent('audio_command_edit_cooldown_ws', './core/commandCoolDown.js', null,
                                        ['add', command, commandCooldown.val(), String(commandCooldownGlobal)], function() {
                                        // Update command permission.
                                        socket.sendCommand('edit_command_permission_cmd', 'permcomsilent ' + command + ' ' +
                                            helpers.getGroupIdByName(commandPermission.find(':selected').text(), true), function() {
                                            // Close modal.
                                            $('#edit-audio-command').modal('toggle');
                                            // Alert the user.
                                            toastr.success('Звуковая команда успешно отредактирована');
                                        });
                                    });
                                });
                        }
                    }).modal('toggle');
                });
            });
        });

        // Welcome the user to the new page.
        socket.getDBValue('get_audio_hook_warning', 'panelData', 'audioHookNewUser', function(e) {
            if (e.panelData !== 'true') {
                alert('Звуки можно использовать вместе с различными командами бота. Чтобы вопроизводить эти звуки через OBS, нажмите «Настройки», скопируйте оттуда ссылку и добавьте её в OBS в качестве источника BrowserSource.');
                socket.updateDBValue('audio_hook_warning_set', 'panelData', 'audioHookNewUser', 'true', new Function());
            }
        });
    });
});

// Function that handlers the loading of events.
$(function() {
    // Toggle for the module.
    $('#audioHookModuleToggle').on('change', function() {
        // Enable the module then query the data.
        socket.sendCommandSync('audio_module_toggle_cmd', 'module ' + ($(this).is(':checked') ? 'enablesilent' : 'disablesilent') + ' ./systems/audioPanelSystem.js', run);
    });

    // Reload audio hooks button.
    $('#reload-audio-hooks').on('click', function() {
        socket.sendCommandSync('reload_audio_hooks_cmd', 'reloadaudiopanelhooks', function() {
            // Load new audio hooks.
            run();
            // Alert the user.
            toastr.success('Список звуков успешно обновлён');
        });
    });

    // Audio hooks settings.
    $('#audio-hooks-settings').on('click', function() {
        // Create custom modal for this module.
        helpers.getModal('audio-settings', 'Настройки звуков', 'Сохранить', $('<form/>', {
            'role': 'form'
        })
        // Main div for the browser source link.
        .append($('<div/>', {
            'class': 'form-group',
        })
        // Append the lable.
        .append($('<label/>', {
            'text': 'Ссылка для BrowserSource'
        }))
        .append($('<div/>', {
            'class': 'input-group'
        })
        // Add client widget URL.
        .append($('<input/>', {
            'type': 'text',
            'class': 'form-control',
            'id': 'audio-url',
            'readonly': 'readonly',
            'value': window.location.protocol + '//' + window.location.host + '/alerts?allow-audio-hooks=true&allow-alerts=false&audio-hook-volume=0.8',
            'style': 'color: transparent !important; text-shadow: 0 0 5px hsla(0, 0%, 100%, .5);',
            'data-toggle': 'tooltip',
            'title': 'Нажмите на это поле, чтобы увидеть ссылку (её можно добавить в OBS в качестве источника BrowserSource)',
            'click': function() {
                // Reset styles.
                $(this).prop('style', '');
            },
            'blur': function() {
                // Reset styles.
                $(this).prop('style', 'color: transparent !important; text-shadow: 0 0 5px hsla(0, 0%, 100%, .5);');
            }
        })).append($('<span/>', {
            'class': 'input-group-btn',
            'style': 'color: transparent !important; text-shadow: 0 0 5px hsla(0, 0%, 100%, .5);',
            'html': $('<button/>', {
                'type': 'button',
                'class': 'btn btn-primary btn-flat',
                'html': 'Копировать',
                'click': function() {
                    // Select URL.
                    $('#audio-url').select().blur();
                    // Copy the URL.
                    document.execCommand('Copy');
                    // Close the modal.
                    $('#audio-settings').removeClass('fade').modal('hide');
                    // Alert the user.
                    toastr.success('Ссылка для BrowserSource успешно скопирована');
                }
            })
        }))))
            // Append command name.
            .append(helpers.getInputGroup('cooldown-hooks', 'number', 'Кулдаун', '30', '', 'Общий кулдаун для всех звуковых команд, в секундах')), function() {
            // Close the modal.
            $('#audio-settings').modal('toggle');
        }).modal('toggle');
    });

    // Audio hooks command settings.
    $('#audio-hooks-cmd-settings').on('click', function() {
        helpers.getModal('add-audio-settings-cmd', 'Настройки звуков', 'Сохранить', $('<form/>', {
                'role': 'form'
            })
            // Append command name.
            .append(helpers.getInputGroup('cooldown-hooks', 'number', 'Кулдаун', '30', '', 'Общий кулдаун для всех звуковых команд')), function() {

            // Code.
        }).modal('toggle');
    });

    // Add audio command.
    $('#audio-hooks-cmd-add').on('click', function() {
        socket.getDBTableValues('get_all_audio_hooks', 'audio_hooks', function(results) {
            let audioNames = [];

            for (let i = 0; i < results.length; i++) {
                audioNames.push(results[i].key);
            }

            helpers.getAdvanceModal('add-audio-cmd', 'Создание звуковой команды', 'Сохранить', $('<form/>', {
                'role': 'form'
            })
            // Append command name.
            .append(helpers.getInputGroup('command-name', 'text', 'Имя', '!звук', '', 'Имя звуковой команды'))
            // All audio hooks in a list.
            .append(helpers.getDropdownGroup('command-audio', 'Звук', 'Выберите звук', audioNames, 'Звук, который будет воспроизводиться при вызове команды'))
            // Append a select option for the command permission.
            .append(helpers.getDropdownGroup('command-permission', 'Доступ', 'Зритель',
                ['Владелец', 'Администратор', 'Модератор', 'Подписчик', 'Донатор', 'VIP', 'Регуляр', 'Зритель'], 'Уровень доступа команды'))
            // Add an advance section that can be opened with a button toggle.
            .append($('<div/>', {
                'class': 'collapse',
                'id': 'advance-collapse',
                'html': $('<form/>', {
                        'role': 'form'
                    })
                    // Append input box for the command cost.
                    .append(helpers.getInputGroup('command-cost', 'number', 'Плата', '0', '0',
                        'Плата за вызов команды, в поинтах'))
                    // Append input box for the command reward.
                    .append(helpers.getInputGroup('command-reward', 'number', 'Вознаграждение', '0', '0',
                    'Вознаграждение за вызов команды, в поинтах'))
                    // Append input box for the command cooldown.
                    .append(helpers.getInputGroup('command-cooldown', 'number', 'Кулдаун', '0', '5',
                        'Длительность кулдауна, в секундах')
                        // Append checkbox for if the cooldown is global or per-user.
                        .append(helpers.getCheckBox('command-cooldown-global', true, 'глобально',
                            'Когда галочка установлена, кулдаун действует на всех пользователей сразу, а когда не установлена – на каждого пользователя персонально')))
            })), function() {
                let commandName = $('#command-name'),
                    commandAudio = $('#command-audio'),
                    commandPermission = $('#command-permission'),
                    commandCost = $('#command-cost'),
                    commandReward = $('#command-reward'),
                    commandCooldown = $('#command-cooldown'),
                    commandCooldownGlobal = $('#command-cooldown-global').is(':checked');

                // Remove the ! and spaces.
                commandName.val(commandName.val().replace(/(\!|\s)/g, '').toLowerCase());

                // Handle each input to make sure they have a value.
                switch (false) {
                    case helpers.handleInputString(commandName):
                    case helpers.handleInputNumber(commandCost):
                    case helpers.handleInputNumber(commandReward):
                    case helpers.handleInputNumber(commandCooldown):
                        break;
                    default:
                        if (commandAudio.val() === null) {
                            toastr.error('Для звуковой команды не выбран звук');
                        } else {
                            // Make sure the command doesn't exist already.
                            socket.getDBValue('audio_command_exists', 'permcom', commandName.val(), function(e) {
                                // If the command exists we stop here.
                                if (e.permcom !== null) {
                                    toastr.error('Такая команда уже существует');
                                    return;
                                }

                                // Add the command.
                                socket.updateDBValues('add_audio_command', {
                                    tables: ['pricecom', 'permcom', 'paycom', 'audioCommands'],
                                    keys: [commandName.val(), commandName.val(), commandName.val(), commandName.val()],
                                    values: [commandCost.val(), helpers.getGroupIdByName(commandPermission.find(':selected').text()), commandReward.val(), commandAudio.val()]
                                }, function() {
                                    socket.wsEvent('audio_command_add_cooldown_ws', './core/commandCoolDown.js', null,
                                        ['add', commandName.val(), commandCooldown.val(), String(commandCooldownGlobal)], function() {
                                        socket.sendCommandSync('add_audio_command_cmd', 'panelloadaudiohookcmds', function() {
                                            // Reload the table
                                            run();
                                            // Close the modal.
                                            $('#add-audio-cmd').modal('toggle');
                                            // Alert the user.
                                            toastr.success('Звуковая команда «!' + commandName.val() + '» успешно создана');
                                        });
                                    });
                                });
                            });
                        }
                }
            }).modal('toggle');
        });
    });
});