/*
 * Copyright (C) 2016-2018 phantombot.tv
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
    socket.getDBValue('custom_command_module', 'modules', './commands/customCommands.js', function(e) {
        // If the module is off, don't load any data.
        if (!helpers.getModuleStatus('customCommandsModule', e.modules)) {
            return;
        }
        // Query custom commands.
        socket.getDBTableValues('commands_get_custom', 'command', function(results) {
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
            if ($.fn.DataTable.isDataTable('#customCommandsTable')) {
                $('#customCommandsTable').DataTable().destroy();
                // Remove all of the old events.
                $('#customCommandsTable').off();
            }

            // Create table.
            let table = $('#customCommandsTable').DataTable({
                'searching': true,
                'autoWidth': false,
                'lengthChange': false,
                'data': tableData,
                'columnDefs': [
                    { 'className': 'default-table', 'orderable': false, 'targets': 2 },
                    { 'width': '15%', 'targets': 0 }
                ],
                'columns': [
                    { 'title': 'Команда' },
                    { 'title': 'Отклик' },
                    { 'title': 'Опции' }
                ]
            });

            // On delete button.
            table.on('click', '.btn-danger', function() {
                let command = $(this).data('command'),
                    row = $(this).parents('tr');

                // Ask the user if he want to remove the command.
                helpers.getConfirmDeleteModal('custom_command_modal_remove', 'Вы уверены, что хотите удалить команду «!' + command + '»?', true,
                    'Команда «!' + command + '» успешно удалена', function() {
                    // Delete all information about the command.
                    socket.removeDBValues('custom_command_remove', {
                        tables: ['command', 'permcom', 'cooldown', 'aliases', 'pricecom', 'paycom'],
                        keys: [command, command, command, command, command, command]
                    }, function() {
                        socket.wsEvent('custom_command_remove_ws', './commands/customCommands.js', null, ['remove', String(command)], function() {
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
                socket.getDBValues('custom_command_edit', {
                    tables: ['command', 'permcom', 'cooldown', 'pricecom', 'paycom'],
                    keys: [command, command, command, command, command]
                }, function(e) {
                    let cooldownJson = (e.cooldown === null ? { isGlobal: 'true', seconds: 0 } : JSON.parse(e.cooldown));

                    // Get advance modal from our util functions in /utils/helpers.js
                    helpers.getAdvanceModal('edit-command', 'Редактирование команды', 'Сохранить', $('<form/>', {
                        'role': 'form'
                    })
                    // Append input box for the command name. This one is disabled.
                    .append(helpers.getInputGroup('command-name', 'text', 'Имя', '', '!' + command, 'Имя команды (не редактируется)', true))
                    // Append a text box for the command response.
                    .append(helpers.getTextAreaGroup('command-response', 'text', 'Отклик', 'Текст отклика', e.command, 'Текст отклика на вызов команды')
                        // Append a sub-comment.
                        .append(helpers.getSubComment('Доступные теги см. в разделе «Помощь»')))
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
                        // Callback function to be called once we hit the save button on the modal.
                    })), function() {
                        let commandName = $('#command-name'),
                            commandResponse = $('#command-response'),
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
                            case helpers.handleInputString(commandResponse):
                            case helpers.handleInputNumber(commandCost):
                            case helpers.handleInputNumber(commandReward):
                            case helpers.handleInputNumber(commandCooldown):
                                break;
                            default:

                                // Save command information here and close the modal.
                                socket.updateDBValues('custom_command_edit', {
                                    tables: ['pricecom', 'permcom', 'paycom', 'command'],
                                    keys: [commandName.val(), commandName.val(), commandName.val(), commandName.val()],
                                    values: [commandCost.val(), helpers.getGroupIdByName(commandPermission.find(':selected').text(), true),
                                            commandReward.val(), commandResponse.val()]
                                }, function() {
                                    // Register the custom command with the cache.
                                    socket.wsEvent('custom_command_edit_ws', './commands/customCommands.js', null, ['edit', String(commandName.val()),
                                        commandResponse.val()], function() {
                                        // Add the cooldown to the cache.
                                        socket.wsEvent('custom_command_edit_cooldown_ws', './core/commandCoolDown.js', null,
                                            ['add', commandName.val(), commandCooldown.val(), String(commandCooldownGlobal)], function() {
                                            // Update command permission.
                                            socket.sendCommand('edit_command_permission_cmd', 'permcomsilent ' + commandName.val() + ' ' +
                                                helpers.getGroupIdByName(commandPermission.find(':selected').text(), true), function() {
                                                // Update the command response
                                                t.parents('tr').find('td:eq(1)').text(commandResponse.val());
                                                // Close the modal.
                                                $('#edit-command').modal('hide');
                                                // Tell the user the command was edited.
                                                toastr.success('Команда «!' + commandName.val() + '» успешно отредактирована');
                                            });
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
    // Toggle for the module.
    $('#customCommandsModuleToggle').on('change', function() {
        // Enable the module then query the data.
        socket.sendCommandSync('custom_commands_module_toggle_cmd', 'module ' + ($(this).is(':checked') ? 'enablesilent' : 'disablesilent') + ' ./commands/customCommands.js', run);
    });

    // Add command button.
    $('#addcom-button').on('click', function() {
        // Get advance modal from our util functions in /utils/helpers.js
        helpers.getAdvanceModal('add-command', 'Создание команды', 'Сохранить', $('<form/>', {
            'role': 'form'
        })
        // Append input box for the command name.
        .append(helpers.getInputGroup('command-name', 'text', 'Имя', '!команда','','Имя команды'))
        // Append a text box for the command response.
        .append(helpers.getTextAreaGroup('command-response', 'text', 'Отклик', 'Текст отклика','','Текст отклика на вызов команды')
            // Append a sub-comment.
            .append(helpers.getSubComment('Доступные теги см. в разделе «Помощь»')))
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
                // Callback function to be called once we hit the save button on the modal.
        })), function() {
            let commandName = $('#command-name'),
                commandResponse = $('#command-response'),
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
                case helpers.handleInputString(commandResponse):
                case helpers.handleInputNumber(commandCost):
                case helpers.handleInputNumber(commandReward):
                case helpers.handleInputNumber(commandCooldown):
                    break;
                default:
                    // Make sure the command doesn't exist already.
                    socket.getDBValue('custom_command_exists', 'permcom', commandName.val(), function(e) {
                        // If the command exists we stop here.
                        if (e.permcom !== null) {
                            toastr.error('Такая команда уже существует');
                            return;
                        }

                        // Save command information here and close the modal.
                        socket.updateDBValues('custom_command_add', {
                            tables: ['pricecom', 'permcom', 'paycom', 'command'],
                            keys: [commandName.val(), commandName.val(), commandName.val(), commandName.val()],
                            values: [commandCost.val(), helpers.getGroupIdByName(commandPermission.find(':selected').text(), true), commandReward.val(), commandResponse.val()]
                        }, function() {
                            // Register the custom command with the cache.
                            socket.wsEvent('custom_command_add_ws', './commands/customCommands.js', null,
                                ['add', commandName.val(), commandResponse.val()], function() {
                                // Add the cooldown to the cache.
                                socket.wsEvent('custom_command_cooldown_ws', './core/commandCoolDown.js', null,
                                    ['add', commandName.val(), commandCooldown.val(), String(commandCooldownGlobal)], function() {
                                    // Reload the table.
                                    run();
                                    // Close the modal.
                                    $('#add-command').modal('hide');
                                    // Tell the user the command was added.
                                    toastr.success('Команда «!' + commandName.val() + '» успешно создана');
                                });
                            });
                        });
                    });
            }
        }).modal('toggle');
    });
});
