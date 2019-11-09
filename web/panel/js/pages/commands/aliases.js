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
    socket.getDBValue('alias_command_module', 'modules', './commands/customCommands.js', function(e) {
        // If the module is off, don't load any data.
        if (!helpers.handleModuleLoadUp('aliasesModule', e.modules)) {
            return;
        }

        // Query aliases.
        socket.getDBTableValues('commands_get_aliases', 'aliases', function(results) {
            let tableData = [];

            for (let i = 0; i < results.length; i++) {
                tableData.push([
                    '!' + results[i].key,
                    '!' + results[i].value,
                    $('<div/>', {
                        'class': 'btn-group'
                    }).append($('<button/>', {
                        'type': 'button',
                        'class': 'btn btn-xs btn-danger',
                        'style': 'float: right',
                        'data-toggle': 'tooltip',
                        'title': 'Удалить псевдоним',
                        'data-alias': results[i].key,
                        'html': $('<i/>', {
                            'class': 'fa fa-trash'
                        })
                    })).append($('<button/>', {
                        'type': 'button',
                        'class': 'btn btn-xs btn-warning',
                        'style': 'float: right',
                        'data-toggle': 'tooltip',
                        'title': 'Редактировать псевдоним',
                        'data-alias': results[i].key,
                        'html': $('<i/>', {
                            'class': 'fa fa-edit'
                        })
                    })).html()
                ]);
            }

            // if the table exists, destroy it.
            if ($.fn.DataTable.isDataTable('#aliasesTable')) {
                $('#aliasesTable').DataTable().destroy();
                // Remove all of the old events.
                $('#aliasesTable').off();
            }

            // Create table.
            let table = $('#aliasesTable').DataTable({
                'searching': true,
                'autoWidth': false,
                'lengthChange': false,
                'data': tableData,
                'columnDefs': [
                    { 'className': 'default-table', 'orderable': false, 'targets': 2 },
                    { 'width': '45%', 'targets': 0 }
                ],
                'columns': [
                    { 'title': 'Псевдоним' },
                    { 'title': 'Команда' },
                    { 'title': 'Опции' }
                ]
            });

            // On delete button.
            table.on('click', '.btn-danger', function() {
                let alias = $(this).data('alias'),
                    row = $(this).parents('tr');

                // Ask the user if he wants to delete the alias.
                helpers.getConfirmDeleteModal('custom_alias_modal_remove', 'Вы уверены, что хотите удалить псевдоним «!' + alias + '»?', true,
                    'Псевдоним «!' + alias + '» успешно удалён', function() { // Callback if the user clicks delete.
                // Delete all information about the alias.
                    socket.removeDBValue('alias_remove', 'aliases', alias, function() {
                        socket.sendCommand('alias_remove_cmd', 'reloadcommand ' + alias, function() {
                            // Remove the table row.
                            table.row(row).remove().draw(false);
                        });
                    });
                });
            });

            // On edit button.
            table.on('click', '.btn-warning', function() {
                let alias = $(this).data('alias'),
                    t = $(this);

                socket.getDBValue('alias_name_get', 'aliases', alias, function(e) {
                    helpers.getModal('edit-alias', 'Редактирование псевдонима', 'Сохранить', $('<form/>', {
                        'role': 'form'
                    })
                    // Append alias name.
                    .append(helpers.getInputGroup('alias-name', 'text', 'Псевдоним', '', '!' + alias, 'Имя псевдонима (не редактируется)', true))
                    // Append alias.
                    .append(helpers.getInputGroup('alias-cmd', 'text', 'Команда', '!команда', '!' + e.aliases, 'Имя команды, к которой будет привязан псевдоним')
                        // Append a sub-comment.
                        .append(helpers.getSubComment('Подсказка: для привязки одного псевдонима сразу к нескольким командам, перечислите их через точку с запятой (без пробелов)'))), function() {// Callback once we click the save button.
                        let aliasCmd = $('#alias-cmd');

                        // Remove the ! and spaces.
                        aliasCmd.val(aliasCmd.val().replace(/(\!|\s)/g, '').toLowerCase());

                        // Handle each input to make sure they have a value.
                        switch (false) {
                            case helpers.handleInputString(aliasCmd):
                                break;
                            default:
                                // Update the alias.
                                socket.updateDBValue('update_command_alias', 'aliases', alias, aliasCmd.val(), function() {
                                    // Update the table.
                                    t.parents('tr').find('td:eq(1)').text('!' + aliasCmd.val());
                                    // Close the modal.
                                    $('#edit-alias').modal('hide');
                                    // Alert the user.
                                    toastr.success('Псевдоним «!' + alias + '» успешно отредактирован');
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
    $('#aliasesModuleToggle').on('change', function() {
        // Enable the module then query the data.
        socket.sendCommandSync('aliases_commands_module_toggle_cmd', 'module ' + ($(this).is(':checked') ? 'enablesilent' : 'disablesilent') + ' ./commands/customCommands.js', run);
    });

    // Add alias button.
    $('#aliascom-button').on('click', function() {
        helpers.getModal('add-alias', 'Создание псевдонима', 'Сохранить', $('<form/>', {
            'role': 'form'
        })
        // Append alias name.
        .append(helpers.getInputGroup('alias-name', 'text', 'Псевдоним', '!ярлык', '', 'Имя псевдонима'))
        // Append alias.
        .append(helpers.getInputGroup('alias-cmd', 'text', 'Команда', '!команда', '', 'Имя команды, к которой будет привязан псевдоним')
            // Append a sub-comment.
            .append(helpers.getSubComment('Подсказка: для привязки одного псевдонима сразу к нескольким командам, перечислите их через точку с запятой (без пробелов)'))), function() {// Callback once we click the save button.
            let aliasName = $('#alias-name'),
                aliasCmd = $('#alias-cmd');

            // Remove the ! and spaces.
            aliasName.val(aliasName.val().replace(/(\!|\s)/g, '').toLowerCase());
            aliasCmd.val(aliasCmd.val().replace(/\!/g, '').toLowerCase());

            // Handle each input to make sure they have a value.
            switch (false) {
                case helpers.handleInputString(aliasName):
                case helpers.handleInputString(aliasCmd):
                    break;
                default:
                    // Make sure the alias doesn't exit already.
                    socket.getDBValue('alias_exists', 'aliases', aliasName.val(), function(e) {
                        // If the command exists we stop here.
                        if (e.aliases !== null) {
                            toastr.error('Такой псевдоним или команда уже существует');
                            return;
                        }

                        // Add the alias.
                        socket.updateDBValue('add_command_alias', 'aliases', aliasName.val(), aliasCmd.val(), function() {
                            socket.sendCommand('alias_add_cmd', 'reloadcommand', function() {
                                // Reload the table.
                                run();
                                // Close the modal.
                                $('#add-alias').modal('hide');
                                // Alert the user.
                                toastr.success('Псевдоним «!' + aliasName.val() + '» успешно создан');
                            });
                        });
                    });
            }
        }).modal('toggle');
    });
});
