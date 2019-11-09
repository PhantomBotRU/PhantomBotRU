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
    socket.getDBValues('traffle_module_status_toggle', {
        tables: ['modules', 'traffleSettings'],
        keys: ['./systems/ticketraffleSystem.js', 'isActive']
    }, true, function(e) {
        if (!helpers.handleModuleLoadUp(['ticketRaffleListModule', 'ticketRaffleModal'], e['./systems/ticketraffleSystem.js'], 'ticketRaffleModuleToggle')) {
            // Remove the chat.
            $('#ticket-raffle-chat').find('iframe').remove();
            return;
        }

        // Update the open button to close if the raffle is active.
        if (e['isActive'] === 'true') {
            $('#ticket-open-or-close-raffle').html($('<i/>', {
                'class': 'fa fa-lock'
            })).append('&nbsp; Завершить').removeClass('btn-success').addClass('btn-warning');
        }

        /**
         * @function Loads the raffle list.
         */
        helpers.temp.loadRaffleList = function() {
            socket.getDBTableValues('get_traffle_list', 'ticketsList', function(results) {
                const table = $('#ticket-raffle-table');

                // Remove current data content.
                table.find('tr:gt(0)').remove();

                for (let i = 0; i < results.length; i++) {
                    const tr = $('<tr/>');

                    tr.append($('<td/>', {
                        'html': results[i].key
                    }));

                    tr.append($('<td/>', {
                        'html': results[i].value
                    }));

                    table.append(tr);
                }
            });
        };

        // Add Twitch chat.
        $('#ticket-raffle-chat').html($('<iframe/>', {
            'frameborder': '0',
            'scrolling': 'no',
            'style': 'width: 100%; height: 610px;',
            'src': 'https://www.twitch.tv/embed/' + getChannelName() + '/chat' + (helpers.isDark ? '?darkpopout' : '')
        }));

        // Load the raffle list.
        helpers.temp.loadRaffleList();

        // Set a timer to auto load the raffle list.
        helpers.setInterval(function() {
            helpers.temp.loadRaffleList();
        }, 5e3);
    });
});

// Function that handlers the loading of events.
$(function() {
    // Module toggle.
    $('#ticketRaffleModuleToggle').on('change', function() {
        socket.sendCommandSync('traffle_system_module_toggle_cmd',
            'module ' + ($(this).is(':checked') ? 'enablesilent' : 'disablesilent') + ' ./systems/ticketraffleSystem.js', run);
    });

    // Open/close raffle button.
    $('#ticket-open-or-close-raffle').on('click', function() {
        if ($(this)[0].innerText.trim() === 'Начать') {
            const cost = $('#ticket-raffle-cost'),
                maxTicket = $('#ticket-raffle-max'),
                elegibility = $('#ticket-raffle-perm').val(),
                regLuck = $('#ticket-raffle-reg'),
                subLuck = $('#ticket-raffle-sub');

            // Make sure the user entered everything right.
            switch (false) {
                case helpers.handleInputNumber(cost, 1):
                case helpers.handleInputNumber(maxTicket, 1):
                case helpers.handleInputNumber(regLuck, 1, 10):
                case helpers.handleInputNumber(subLuck, 1, 10):
                    break;
                default:
                    socket.sendCommand('open_traffle_cmd', 'traffle open ' + maxTicket.val() + ' ' + regLuck.val() + ' ' +  subLuck.val() + ' ' + cost.val() + ' ' + elegibility, function() {
                        // Alert the user.
                        toastr.success('Лотерея успешно начата');
                        // Update the button.
                        $('#ticket-open-or-close-raffle').html($('<i/>', {
                            'class': 'fa fa-lock'
                        })).append('&nbsp; Завершить').removeClass('btn-success').addClass('btn-warning');
                    });
            }
        } else {
            socket.sendCommandSync('close_traffle_cmd', 'traffle close', function() {
                // Alert the user.
                toastr.success('Лотерея успешно завершена');
                // Reload to remove the winner.
                helpers.temp.loadRaffleList();
                // Update the button.
                $('#ticket-open-or-close-raffle').html($('<i/>', {
                    'class': 'fa fa-unlock-alt'
                })).append('&nbsp; Начать').removeClass('btn-warning').addClass('btn-success');
            });
        }
    });

    // Draw raffle button.
    $('#ticket-draw-raffle').on('click', function() {
        socket.sendCommandSync('draw_rraffle_cmd', 'traffle draw', function() {
            // Alert the user.
            toastr.success('Победитель лотереи успешно выбран');
            // Reload to remove the winner.
            helpers.temp.loadRaffleList();
        });
    });

    // Reset raffle button.
    $('#ticket-reset-raffle').on('click', function() {
        // Reset values.
        $('#ticket-raffle-max').val('50');
        $('#ticket-raffle-cost').val('1');
        $('#ticket-raffle-reg, #ticket-raffle-sub').val('1');
        $('#ticket-raffle-table').find('tr:gt(0)').remove();

        $('#ticket-open-or-close-raffle').html($('<i/>', {
            'class': 'fa fa-unlock-alt'
        })).append('&nbsp; Начать').removeClass('btn-warning').addClass('btn-success');

        // Close raffle but don't pick a winner.
        socket.sendCommand('reset_traffle_cmd', 'traffle reset', function() {
            toastr.success('Лотерея успешно сброшена');
        });
    });

    // Raffle settings button.
    $('#ticket-raffle-settings').on('click', function() {
        socket.getDBValues('get_traffle_settings', {
            tables: ['settings', 'settings', 'settings'],
            keys: ['tRaffleMSGToggle', 'traffleMessage', 'traffleMessageInterval']
        }, true, function(e) {
            helpers.getModal('traffle-settings-modal', 'Настройки лотереи', 'Сохранить', $('<form/>', {
                'role': 'form'
            })
            // Add the div for the col boxes.
            .append($('<div/>', {
                'class': 'panel-group',
                'id': 'accordion'
            })
            // Append first collapsible accordion.
            .append(helpers.getCollapsibleAccordion('main-1', 'Оповещение', $('<form/>', {
                    'role': 'form'
                })
                // Append interval box for the message
                .append(helpers.getInputGroup('msg-timer', 'number', 'Интервал', '', e['traffleMessageInterval'],
                    'Интервал времени между автопубликациями сообщения о проводимой лотерее, в минутах («0» означает отсутствие оповещений)'))
                // Append message box for the message
                .append(helpers.getTextAreaGroup('msg-msg', 'text', 'Сообщение', '', e['traffleMessage'],
                    'Сообщение о проводимой лотерее, публикуемое через заданные интервалы времени')
                    // Append a sub-comment.
                    .append(helpers.getSubComment('Доступные теги: (entries)'))))) // (amount) пока не работает
            // Append second collapsible accordion.
            .append(helpers.getCollapsibleAccordion('main-2', 'Дополнительные настройки',  $('<form/>', {
                    'role': 'form'
                })
            // Add toggle for warning messages.
                .append(helpers.getDropdownGroup('warning-msg', 'Предупреждения', (e['tRaffleMSGToggle'] === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'],
                    'Предупреждения о превышении лимита билетов, либо о нехватке поинтов для участия'))))),
            function() {
                let raffleTimer = $('#msg-timer'),
                    raffleMessage = $('#msg-msg'),
                    warningMsg = $('#warning-msg').find(':selected').text() === 'Да';

                switch (false) {
                    case helpers.handleInputNumber(raffleTimer):
                    case helpers.handleInputString(raffleMessage):
                        break;
                    default:
                        socket.updateDBValues('update_traffle_settings_2', {
                            tables: ['settings', 'settings', 'settings'],
                            keys: ['tRaffleMSGToggle', 'traffleMessage', 'traffleMessageInterval'],
                            values: [warningMsg, raffleMessage.val(), raffleTimer.val()]
                        }, function() {
                            socket.sendCommand('raffle_reload_cmd', 'reloadtraffle', function() {
                                // Close the modal.
                                $('#traffle-settings-modal').modal('toggle');
                                // Warn the user.
                                toastr.success('Настройки лотереи успешно обновлены');
                            });
                        });
                }
            }).modal('toggle');
        });
    });
});
