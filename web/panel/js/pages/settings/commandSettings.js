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
    // Get command settings.
    socket.getDBValues('get_command_settings', {
        tables: ['settings', 'settings', 'settings', 'settings', 'cooldownSettings',
            'cooldownSettings'],
        keys: ['permComMsgEnabled', 'priceComMsgEnabled', 'coolDownMsgEnabled',
            'pricecomMods', 'modCooldown', 'defaultCooldownTime']
    }, true, function(e) {
        // Set cost message.
        $('#cmd-cost-messages').val((e.priceComMsgEnabled === 'true' ? 'Да' : 'Нет'));
        // Set permission message.
        $('#cmd-perm-messages').val((e.permComMsgEnabled === 'true' ? 'Да' : 'Нет'));
        // Set cooldown message.
        $('#cmd-cooldown-messages').val((e.coolDownMsgEnabled === 'true' ? 'Да' : 'Нет'));
        // Set cost for mods.
        $('#pricecom-mods').val((e.pricecomMods === 'true' ? 'Нет' : 'Да'));
        // Set cooldown for mods.
        $('#cooldown-mods').val((e.modCooldown === 'true' ? 'Нет' : 'Да'));
        // Set global cooldown.
        $('#global-cooldown').val(e.defaultCooldownTime);
    });
});

// Function that handles events.
$(function() {
    // Save button.
    $('#cmd-save-btn').on('click', function() {
        let cmdCostMessage = $('#cmd-cost-messages').find(':selected').text() === 'Да',
            cmdPermMessage = $('#cmd-perm-messages').find(':selected').text() === 'Да',
            cmdCooldownMessage = $('#cmd-cooldown-messages').find(':selected').text() === 'Да',
            priceComMods = $('#pricecom-mods').find(':selected').text() !== 'Да',
            cooldownMods = $('#cooldown-mods').find(':selected').text() !== 'Да',
            globalTime = $('#global-cooldown');

        switch (false) {
            case helpers.handleInputNumber(globalTime, 1):
                break;
            default:
                socket.updateDBValues('update_cmd_settings', {
                    tables: ['settings', 'settings', 'settings', 'settings', 'cooldownSettings',
                        'cooldownSettings'],
                    keys: ['permComMsgEnabled', 'priceComMsgEnabled', 'coolDownMsgEnabled',
                        'pricecomMods', 'modCooldown', 'defaultCooldownTime'],
                    values: [cmdPermMessage, cmdCostMessage, cmdCooldownMessage,
                        priceComMods, cooldownMods, globalTime.val()]
                }, function() {
                    socket.wsEvent('update_cmd_settings_ws', './core/commandCoolDown.js', null, ['update'], function() {
                        toastr.success('Настройки команд успешно обновлены');
                    });
                });
        }
    });
});
