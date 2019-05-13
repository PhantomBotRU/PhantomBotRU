// Function that querys all of the data we need.
$(run = function() {
    // Query all commands.
    socket.getDBTableValues('discord_commands_get_all', 'discordPermcom', function(results) {
        socket.getDBTableValues('discord_custom_commands_get_all', 'discordCommands', function(customCommands) {
            let tableData = [],
                cmds = [];

            // Get all custom commands.
            for (let i = 0; i < customCommands.length; i++) {
                cmds.push(customCommands[i].key);
            }

            for (let i = 0; i < results.length; i++) {
                if (cmds.indexOf(results[i].key) !== -1 || results[i].key.indexOf(' ') !== -1) {
                    continue;
                }

                tableData.push([
                    '!' + results[i].key,
                    helpers.getDiscordGroupNameById(results[i].value),
                    $('<div/>', {
                        'class': 'btn-group'
                    }).append($('<button/>', {
                        'type': 'button',
                        'class': 'btn btn-xs btn-danger',
                        'style': 'float: right',
                        'data-toggle': 'tooltip',
                        'title': 'Восстановить уровень доступа команды по умолчанию (срабатывает после рестарта бота)',
                        'data-command': results[i].key,
                        'html': $('<i/>', {
                            'class': 'fa fa-refresh'
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
            if ($.fn.DataTable.isDataTable('#discordDefaultCommandsTable')) {
                $('#discordDefaultCommandsTable').DataTable().destroy();
                // Remove all of the old events.
                $('#discordDefaultCommandsTable').off();
            }

            // Create table.
            const table = $('#discordDefaultCommandsTable').DataTable({
                'searching': true,
                'autoWidth': false,
                'data': tableData,
                'columnDefs': [
                    { 'className': 'default-table-large', 'orderable': false, 'targets': 2 },
                    { 'width': '45%', 'targets': 0 }
                ],
                'columns': [
                    { 'title': 'Команда' },
                    { 'title': 'Доступ' },
                    { 'title': 'Опции' }
                ]
            });

            // On delete button.
            table.on('click', '.btn-danger', function() {
                let command = $(this).data('command'),
                    row = $(this).parents('tr'),
                    t = $(this);

                // Ask the user if he want to reset the command.
                helpers.getConfirmDeleteModal('discord_default_command_modal_remove', 'Вы уверены, что хотите восстановить уровень доступа команды «!' + command + '» по умолчанию?', false,
                        'Уровень доступа команды «!' + command + '» по умолчанию успешно восстановлен', function() {
                    socket.removeDBValue('discord_permcom_temp_del', 'discordPermcom', command, function(e) {
                        // Hide tooltip.
                        t.tooltip('hide');
                        // Remove the table row.
                        table.row(row).remove().draw(false);
                    });
                });
            });

            // On edit button.
            table.on('click', '.btn-warning', function() {
                let command = $(this).data('command'),
                    t = $(this);

                // Get all the info about the command.
                socket.getDBValues('custom_command_edit', {
                    tables: ['discordPricecom', 'discordPermcom', 'discordAliascom', 'discordChannelcom', 'discordCooldown'],
                    keys: [command, command, command, command, command, command]
                }, function(e) {
                    let cooldownJson = (e.discordCooldown === null ? { isGlobal: 'true', seconds: 0 } : JSON.parse(e.discordCooldown));

                    // Get advance modal from our util functions in /utils/helpers.js
                    helpers.getAdvanceModal('edit-command', 'Настройки команды', 'Сохранить', $('<form/>', {
                        'role': 'form'
                    })
                    // Append input box for the command name. This one is disabled.
                    .append(helpers.getInputGroup('command-name', 'text', 'Команда', '', '!' + command, 'Имя команды (не редактируется)', true))
                    // Append a select option for the command permission.
                    .append(helpers.getDropdownGroup('command-permission', 'Доступ', helpers.getDiscordGroupNameById(e.discordPermcom),
                        ['Администратор', 'Любой'], 'Уровень доступа команды'))
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
                            commandPermission = $('#command-permission'),
                            commandCost = $('#command-cost'),
                            commandChannel = $('#command-channel'),
                            commandAlias = $('#command-alias'),
                            commandCooldown = $('#command-cooldown'),
                            commandCooldownGlobal = $('#command-cooldown-global').is(':checked');

                        // Remove the ! and spaces.
                        commandName.val(commandName.val().replace(/\!/g, '').toLowerCase());
                        commandAlias.val(commandAlias.val().replace(/(\!|\s)/g, '').toLowerCase());

                        // Handle each input to make sure they have a value.
                        switch (false) {
                            case helpers.handleInputString(commandName):
                            case helpers.handleInputNumber(commandCooldown):
                                break;
                            default:
                                // Save command information here and close the modal.
                                socket.updateDBValues('custom_command_add', {
                                    tables: ['discordPricecom', 'discordPermcom', 'discordCooldown'],
                                    keys: [commandName.val(), commandName.val(), commandName.val()],
                                    values: [commandCost.val(), helpers.getDiscordGroupIdByName(commandPermission.find(':selected').text(), true), JSON.stringify({command: String(commandName.val()), seconds: String(commandCooldown.val()), isGlobal: String(commandCooldownGlobal)})]
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
                                    toastr.success('Настройки команды «!' + commandName.val() + '» успешно обновлены');

                                    // I hate doing this, but the logic is fucked anyways.
                                    helpers.setTimeout(function() {
                                        // Add the cooldown to the cache.
                                        socket.wsEvent('discord', './discord/commands/customCommands.js', '',
                                            [commandName.val(), helpers.getDiscordGroupIdByName(commandPermission.find(':selected').text(), true),
                                            commandChannel.val(), commandAlias.val(), commandCost.val()], new Function());
                                    }, 5e2);
                                });
                        }
                    }).modal('toggle');
                });
            });
        });
    });
});