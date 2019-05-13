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
    // Query permissions.
    socket.getDBTableValues('permissions_get_group', 'group', function(results) {
        let tableData = [];

        for (let i = 0; i < results.length; i++) {
            // Ignore viewers.
            if (results[i].value === '7') {
                continue;
            }

            tableData.push([
                results[i].key,
                helpers.getGroupNameById(results[i].value),
                $('<div/>', {
                    'class': 'btn-group'
                }).append($('<button/>', {
                    'type': 'button',
                    'class': 'btn btn-xs btn-danger',
                    'style': 'float: right',
                    'data-toggle': 'tooltip',
                    'title': 'Сбросить роль пользователя до роли по умолчанию',
                    'data-username': results[i].key,
                    'html': $('<i/>', {
                        'class': 'fa fa-trash'
                    })
                })).append($('<button/>', {
                    'type': 'button',
                    'class': 'btn btn-xs btn-warning',
                    'style': 'float: right',
                    'data-toggle': 'tooltip',
                    'title': 'Редактировать роль',
                    'data-username': results[i].key,
                    'html': $('<i/>', {
                        'class': 'fa fa-edit'
                    })
                })).html()
            ]);
        }

        // if the table exists, destroy it.
        if ($.fn.DataTable.isDataTable('#permissionsTable')) {
            $('#permissionsTable').DataTable().destroy();
            // Remove all of the old events.
            $('#permissionsTable').off();
        }

        // Create table.
        let table = $('#permissionsTable').DataTable({
            'searching': true,
            'autoWidth': false,
            'lengthChange': false,
            'data': tableData,
            'columnDefs': [
                { 'className': 'default-table', 'orderable': false, 'targets': 2 },
                { 'width': '45%', 'targets': 0 }
            ],
            'columns': [
                { 'title': 'Пользователь' },
                { 'title': 'Роль' },
                { 'title': 'Опции' }
            ]
        });

        // On delete button.
        table.on('click', '.btn-danger', function() {
            let username = $(this).data('username'),
                row = $(this).parents('tr'),
                t = $(this);

            // Ask the user if he wants to reset the user's permission.
            helpers.getConfirmDeleteModal('user_permission_modal_remove', 'Вы уверены, что хотите сбросить роль пользователя ' + username + ' до роли по умолчанию?', false,
                'Роль пользователя ' + username + ' сброшена до роли по умолчанию', function() {
                // Delete all information about the alias.
                socket.removeDBValue('permission_remove', 'group', username, function() {
                    socket.sendCommand('permission_remove_cmd', 'permissionsetuser ' + username + ' 7', function() {
                        // Hide tooltip.
                        t.tooltip('hide');
                        // Remove the table row.
                        table.row(row).remove().draw(false);
                    });
                });
            });
        });

        // On edit button.
        table.on('click', '.btn-warning', function() {
            let username = $(this).data('username'),
                t = $(this);

            socket.getDBValue('permission_user_get', 'group', username, function(e) {
                helpers.getModal('edit-user-perm', 'Редактирование роли пользователя', 'Сохранить', $('<form/>', {
                    'role': 'form'
                })
                // Append user name.
                .append(helpers.getInputGroup('user-name', 'text', 'Пользователь', '', username, 'Имя пользователя (не редактируется)', true))
                // Append the group.
                .append(helpers.getDropdownGroup('user-permission', 'Роль', helpers.getGroupNameById(e.group),
                    ['Владелец', 'Администратор', 'Модератор', 'Подписчик', 'Донатор', 'VIP', 'Регуляр'], 'Роль и соответствующий уровень доступа')),
                // callback once the user hits save.
                function() {
                    let group = helpers.getGroupIdByName($('#user-permission').find(':selected').text());

                    socket.updateDBValue('permission_user_update', 'group', username, group, function() {
                        socket.sendCommand('permission_edit_cmd', 'permissionsetuser ' + username + ' ' + group, function() {
                            // Update the table.
                            t.parents('tr').find('td:eq(1)').text($('#user-permission').find(':selected').text());
                            // Close the modal.
                            $('#edit-user-perm').modal('hide');
                            // Alert the user.
                            toastr.success('Роль пользователя ' + username + ' успешно обновлена');
                        });
                    });
                }).modal('toggle');
            });
        });
    });
});

// Function that handlers the loading of events.
$(function() {
    // Add user permission button.
    $('#add-permissions-button').on('click', function() {
        helpers.getModal('add-user-perm', 'Назначение роли пользователю', 'Сохранить', $('<form/>', {
            'role': 'form'
        })
        // Append user name.
        .append(helpers.getInputGroup('user-name', 'text', 'Пользователь', 'ninja', '', 'Имя пользователя'))
        // Append the group.
        .append(helpers.getDropdownGroup('user-permission', 'Роль', 'Регуляр', ['Владелец', 'Администратор', 'Модератор', 'Подписчик', 'Донатор', 'VIP', 'Регуляр'], 'Роль и соответствующий уровень доступа')),
        // callback once the user hits save.
        function() {
            let group = helpers.getGroupIdByName($('#user-permission').find(':selected').text()),
                username = $('#user-name');

            // make sure the user added a username.
            switch (false) {
                case helpers.handleInputString(username):
                    break;
                default:
                    socket.updateDBValue('permission_user_add', 'group', username.val().toLowerCase(), group, function() {
                        socket.sendCommand('permission_add_cmd', 'permissionsetuser ' + username.val().toLowerCase() + ' ' + group, function() {
                            // Update the table.
                            run();
                            // Close the modal.
                            $('#add-user-perm').modal('hide');
                            // Alert the user.
                            toastr.success('Пользователю ' + username.val() + ' успешно назначена роль');
                        });
                    });
            }
        }).modal('toggle');
    });
});
