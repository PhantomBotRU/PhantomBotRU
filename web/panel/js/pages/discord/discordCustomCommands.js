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

$(run = function() {
    // Check if the module is enabled.
    socket.getDBValue('discord_custom_command_module', 'modules', './discord/commands/customCommands.js', function(e) {
        // If the module is off, don't load any data.
        if (!helpers.getModuleStatus('discordCustomCommandsModule', e.modules)) {
            return;
        }

        // Query custom commands.
        socket.getDBTableValues('discord_commands_get_custom', 'discordCommands', function(results) {
            const tableData = [];

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
            if ($.fn.DataTable.isDataTable('#discordCustomCommandsTable')) {
                $('#discordCustomCommandsTable').DataTable().destroy();
                // Remove all of the old events.
                $('#discordCustomCommandsTable').off();
            }

            // Create table.
            const table = $('#discordCustomCommandsTable').DataTable({
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
                const command = $(this).data('command'),
                    row = $(this).parents('tr');

                // Ask the user if he want to remove the command.
                helpers.getConfirmDeleteModal('custom_command_modal_remove', 'Вы уверены, что хотите удалить команду «!' + command + '»?', true,
                    'Команда «!' + command + '» успешно удалена', function() {
                    socket.removeDBValues('rm_discord_command', {
                        tables: ['discordCommands', 'discordPermcom', 'discordCooldown', 'discordChannelcom', 'discordPricecom', 'discordAliascom'],
                        keys: [command, command, command, command, command, command]
                    }, function() {
                        socket.wsEvent('discord', './discord/commands/customCommands.js', 'remove', [command], function() {
                            // Remove the table row.
                            table.row(row).remove().draw(false);
                        });
                    });
                });
            });

            // On edit button.
            table.on('click', '.btn-warning', function() {
                const command = $(this).data('command'),
                    t = $(this);

                // Get all the info about the command.
                socket.getDBValues('custom_command_edit', {
                    tables: ['discordPricecom', 'discordPermcom', 'discordAliascom', 'discordChannelcom', 'discordCommands', 'discordCooldown', 'discordPermsObj'],
                    keys: [command, command, command, command, command, command, 'obj']
                }, function(e) {
                    let cooldownJson = (e.discordCooldown === null ? { isGlobal: 'true', seconds: 0 } : JSON.parse(e.discordCooldown));
                    let perm = JSON.parse(e.discordPermcom);
                    let perms = JSON.parse(e.discordPermsObj);

                    // Get advance modal from our util functions in /utils/helpers.js
                    helpers.getAdvanceModal('edit-command', 'Редактирование команды', 'Сохранить', $('<form/>', {
                        'role': 'form'
                    })
                    // Append input box for the command name. This one is disabled.
                    .append(helpers.getInputGroup('command-name', 'text', 'Имя', '', '!' + command, 'Имя команды (не редактируется)', true))
                    // Append a text box for the command response.
                    .append(helpers.getTextAreaGroup('command-response', 'text', 'Отклик', '', e.discordCommands, 'Текст отклика на вызов команды'))
                    // Append a select option for the command permission.
                    .append(helpers.getMultiDropdownGroup('command-permission', 'Доступ', [
                        {
                            'title': 'Права',
                            'options': perm.permissions
                        },
                        {
                            'title': 'Роли',
                            'selected': perm.roles,
                            'options': perms.roles
                        }
                    ], 'Уровень доступа команды'))
                    // Add an advance section that can be opened with a button toggle.
                    .append($('<div/>', {
                        'class': 'collapse',
                        'id': 'advance-collapse',
                        'html': $('<form/>', {
                                'role': 'form'
                            })
                            // Append input box for the command cost.
                            .append(helpers.getInputGroup('command-cost', 'number', 'Плата', '0', helpers.getDefaultIfNullOrUndefined(e.discordPricecom, '0'),
                                'Плата за вызов команды, в поинтах'))
                            // Append input box for the command channel.
                            .append(helpers.getInputGroup('command-channel', 'text', 'Канал(ы)', '#general', helpers.getDefaultIfNullOrUndefined(e.discordChannelcom, ''),
                                'Канал(ы) в Discord, где команда будет работать (через запятую с пробелом; если поле не заполнено, то во всех каналах)'))
                            // Append input box for the command alias.
                            .append(helpers.getInputGroup('command-alias', 'text', 'Псевдоним', '!ярлык', helpers.getDefaultIfNullOrUndefined(e.discordAliascom, ''),
                                'Имя псевдонима, который будет привязан к команде'))
                            // Append input box for the command cooldown.
                            .append(helpers.getInputGroup('command-cooldown', 'number', 'Кулдаун', '0', helpers.getDefaultIfNullOrUndefined(cooldownJson.seconds, '0'),
                                'Длительность кулдауна, в секундах')
                                // Append checkbox for if the cooldown is global or per-user.
                                .append(helpers.getCheckBox('command-cooldown-global', cooldownJson.isGlobal === 'true', 'глобально',
                                    'Когда галочка установлена, кулдаун действует на всех пользователей сразу, а когда не установлена – на каждого пользователя персонально')))
                            // Callback function to be called once we hit the save button on the modal.
                    })), function() {
                        let commandName = $('#command-name'),
                            commandResponse = $('#command-response'),
                            commandPermissions = $('#command-permission option'),
                            commandCost = $('#command-cost'),
                            commandChannel = $('#command-channel'),
                            commandAlias = $('#command-alias'),
                            commandCooldown = $('#command-cooldown'),
                            commandCooldownGlobal = $('#command-cooldown-global').is(':checked');

                        // Remove the ! and spaces.
                        commandName.val(commandName.val().replace(/(\!|\s)/g, '').toLowerCase());
                        commandAlias.val(commandAlias.val().replace(/(\!|\s)/g, '').toLowerCase());

                        // Generate all permissions.
                        const permObj = {
                            'roles': [],
                            'permissions': []
                        };

                        commandPermissions.each(function() {
                            var section = $(this).parent().attr('label');

                            // This is a permission.
                            if (section == 'Права') {
                                permObj.permissions.push({
                                    'name': $(this).html(),
                                    'selected': $(this).is(':selected').toString()
                                });
                            } else if ($(this).is(':selected')) {
                                permObj.roles.push($(this).attr('id'));
                            }
                        });

                        // Handle each input to make sure they have a value.
                        switch (false) {
                            case helpers.handleInputString(commandName):
                            case helpers.handleInputString(commandResponse):
                            case helpers.handleInputNumber(commandCooldown):
                                break;
                            default:
                                // Save command information here and close the modal.
                                socket.updateDBValues('custom_command_add', {
                                    tables: ['discordPricecom', 'discordPermcom', 'discordCommands', 'discordCooldown'],
                                    keys: [commandName.val(), commandName.val(), commandName.val(), commandName.val()],
                                    values: [commandCost.val(), JSON.stringify(permObj), commandResponse.val(), JSON.stringify({command: String(commandName.val()), seconds: String(commandCooldown.val()), isGlobal: String(commandCooldownGlobal)})]
                                }, function() {
                                    if (commandChannel.val().length > 0) {
                                        socket.updateDBValue('discord_channel_command_cmd', 'discordChannelcom', commandName.val(), commandChannel.val(), new Function());
                                    } else {
                                        socket.removeDBValue('discord_channel_command_cmd', 'discordChannelcom', commandName.val(), new Function());
                                    }

                                    if (commandAlias.val().length > 0) {
                                        socket.updateDBValue('discord_alias_command_cmd', 'discordAliascom', commandName.val(), commandAlias.val(), new Function());
                                    } else {
                                        socket.removeDBValue('discord_alias_command_cmd', 'discordAliascom', commandName.val(), new Function());
                                    }

                                    // Reload the table.
                                    run();
                                    // Close the modal.
                                    $('#edit-command').modal('hide');
                                    // Tell the user the command was added.
                                    toastr.success('Команда «!' + commandName.val() + '» успешно отредактирована');

                                    // I hate doing this, but the logic is fucked anyways.
                                    helpers.setTimeout(function() {
                                        // Add the cooldown to the cache.
                                        socket.wsEvent('discord', './discord/commands/customCommands.js', '',
                                            [commandName.val(), JSON.stringify(permObj),
                                            commandChannel.val(), commandAlias.val(), commandCost.val()], new Function());
                                    }, 5e2);
                                });
                        }
                    }).on('shown.bs.modal', function(e) {
                        $('#command-permission').select2();
                    }).modal('toggle');
                });
            });
        });
    });
});


// Function that handlers the loading of events.
$(function() {
    // Toggle for the module.
    $('#discordCustomCommandsModuleToggle').on('change', function() {
        // Enable the module then query the data.
        socket.sendCommandSync('discord_custom_commands_module_toggle_cmd',
            'module ' + ($(this).is(':checked') ? 'enablesilent' : 'disablesilent') + ' ./discord/commands/customCommands.js', run);
    });

    // Add command button.
    $('#discord-addcom-button').on('click', function() {
        socket.getDBValue('discord_custom_cmds_roles', 'discordPermsObj', 'obj', function(permObj) {
            let perms = JSON.parse(permObj.discordPermsObj);

            // Get advance modal from our util functions in /utils/helpers.js
            helpers.getAdvanceModal('add-command', 'Создание команды', 'Сохранить', $('<form/>', {
                'role': 'form'
            })
            // Append input box for the command name.
            .append(helpers.getInputGroup('command-name', 'text', 'Имя', '!команда','','Имя команды'))
            // Append a text box for the command response.
            .append(helpers.getTextAreaGroup('command-response', 'text', 'Отклик', 'Текст отклика','','Текст отклика на вызов команды'))
            // Append a select option for the command permission.
            .append(helpers.getMultiDropdownGroup('command-permission', 'Доступ', [
                {
                    'title': 'Права',
                    'options': [{
                        'name': 'Администратор',
                        'selected': 'true'
                    }]
                },
                {
                    'title': 'Роли',
                    'options': perms.roles
                }
            ], 'Уровень доступа команды'))
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
                    // Append input box for the command channel.
                    .append(helpers.getInputGroup('command-channel', 'text', 'Канал(ы)', '#general', '',
                        'Канал(ы) в Discord, где команда будет работать (через запятую с пробелом; если поле не заполнено, то во всех каналах)'))
                    // Append input box for the command alias.
                    .append(helpers.getInputGroup('command-alias', 'text', 'Псевдоним', '!ярлык', '',
                        'Имя псевдонима, который будет привязан к команде'))
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
                    commandPermissions = $('#command-permission option'),
                    commandCost = $('#command-cost'),
                    commandChannel = $('#command-channel'),
                    commandAlias = $('#command-alias'),
                    commandCooldown = $('#command-cooldown'),
                    commandCooldownGlobal = $('#command-cooldown-global').is(':checked');

                // Remove the ! and spaces.
                commandName.val(commandName.val().replace(/(\!|\s)/g, '').toLowerCase());
                commandAlias.val(commandAlias.val().replace(/(\!|\s)/g, '').toLowerCase());

                // Handle each input to make sure they have a value.
                switch (false) {
                    case helpers.handleInputString(commandName):
                    case helpers.handleInputString(commandResponse):
                    case helpers.handleInputNumber(commandCooldown):
                        break;
                    default:
                        // Make sure the command doesn't exist already.
                        socket.getDBValue('custom_command_exists', 'discordPermcom', commandName.val(), function(e) {
                            // If the command exists we stop here.
                            if (e.discordPermcom !== null) {
                                toastr.error('Такая команда уже существует');
                                return;
                            }

                            // Generate all permissions.
                            const permObj = {
                                'roles': [],
                                'permissions': []
                            };

                            commandPermissions.each(function() {
                                var section = $(this).parent().attr('label');

                                // This is a permission.
                                if (section == 'Права') {
                                    permObj.permissions.push({
                                        'name': $(this).html(),
                                        'selected': $(this).is(':selected').toString()
                                    });
                                } else if ($(this).is(':selected')) {
                                    permObj.roles.push($(this).attr('id'));
                                }
                            });

                            // Save command information here and close the modal.
                            socket.updateDBValues('custom_command_add', {
                                tables: ['discordPricecom', 'discordPermcom', 'discordCommands', 'discordCooldown'],
                                keys: [commandName.val(), commandName.val(), commandName.val(), commandName.val()],
                                values: [commandCost.val(), JSON.stringify(permObj), commandResponse.val(), JSON.stringify({command: String(commandName.val()), seconds: String(commandCooldown.val()), isGlobal: String(commandCooldownGlobal)})]
                            }, function() {
                                if (commandChannel.val().length > 0) {
                                    socket.updateDBValue('discord_channel_command_cmd', 'discordChannelcom', commandName.val(), commandChannel.val(), new Function());
                                } else {
                                    socket.removeDBValue('discord_channel_command_cmd', 'discordChannelcom', commandName.val(), new Function());
                                }

                                if (commandAlias.val().length > 0) {
                                    socket.updateDBValue('discord_alias_command_cmd', 'discordAliascom', commandName.val(), commandAlias.val(), new Function());
                                } else {
                                    socket.removeDBValue('discord_alias_command_cmd', 'discordAliascom', commandName.val(), new Function());
                                }

                                // Reload the table.
                                run();
                                // Close the modal.
                                $('#add-command').modal('hide');
                                // Tell the user the command was added.
                                toastr.success('Команда «!' + commandName.val() + '» успешно добавлена');

                                // I hate doing this, but the logic is fucked anyways.
                                helpers.setTimeout(function() {
                                    // Add the cooldown to the cache.
                                    socket.wsEvent('discord', './discord/commands/customCommands.js', '',
                                        [commandName.val(), JSON.stringify(permObj),
                                        commandChannel.val(), commandAlias.val(), commandCost.val()], new Function());
                                }, 5e2);
                            });
                        });
                }
            }).on('shown.bs.modal', function(e) {
                $('#command-permission').select2();
            }).modal('toggle');
        });
    });
});