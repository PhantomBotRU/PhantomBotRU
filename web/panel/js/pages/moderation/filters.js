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
$(function() {
    // Get filter toggles.
    socket.getDBValues('moderation_get_toggles', {
        tables: ['chatModerator', 'chatModerator', 'chatModerator', 'chatModerator', 'chatModerator', 'chatModerator', 'chatModerator', 'chatModerator', 'chatModerator'],
        keys: ['linksToggle', 'capsToggle', 'spamToggle', 'symbolsToggle', 'emotesToggle', 'longMessageToggle', 'colorsToggle', 'spamTrackerToggle', 'fakePurgeToggle']
    }, true, function(e) {
        // Set the links filter toggle.
        $('#filter-links').prop('checked', e.linksToggle === 'true');
        // Set the caps filter toggle.
        $('#filter-caps').prop('checked', e.capsToggle === 'true');
        // Set the spam filter toggle.
        $('#filter-spam').prop('checked', e.spamToggle === 'true');
        // Set the symbols filter toggle.
        $('#filter-symbols').prop('checked', e.symbolsToggle === 'true');
        // Set the emotes filter toggle.
        $('#filter-emotes').prop('checked', e.emotesToggle === 'true');
        // Set the long messages filter toggle.
        $('#filter-messages').prop('checked', e.longMessageToggle === 'true');
        // Set the colors filter toggle.
        $('#filter-me').prop('checked', e.colorsToggle === 'true');
        // Set the spam tracker filter toggle.
        $('#filter-tracker').prop('checked', e.spamTrackerToggle === 'true');
        // Set the fake purges filter toggle.
        $('#filter-purges').prop('checked', e.fakePurgeToggle === 'true');
    });
});

// Function that handles setting events.
$(function() {
    // Filter toggle click.
    $('[data-filter]').on('change', function() {
        // Update the db with the new toggle.
        socket.updateDBValue('moderation_update_filter', 'chatModerator', $(this).data('filter'), $(this).is(':checked'), function() {
            socket.sendCommand('moderation_update_filter_cmd', 'reloadmod', function() {
                toastr.success('Фильтр успешно переключен');
            });
        });
    });

    // Cluster begins here.

    // Handle link filter settings.
    $('#filter-links-btn').on('click', function() {
        // Get link filter settings.
        socket.getDBValues('moderation_get_link_settings', {
            tables: ['chatModerator', 'chatModerator', 'chatModerator', 'chatModerator', 'chatModerator', 'chatModerator', 'chatModerator', 'chatModerator'],
            keys: ['linksMessage', 'linkPermitTime', 'subscribersModerateLinks', 'regularsModerateLinks', 'silentTimeoutLinks', 'silentLinkMessage', 'warningTimeLinks', 'timeoutTimeLinks']
        }, true, function(e) {
            // Get advance modal from our util functions in /utils/helpers.js
            helpers.getAdvanceModal('link-settings', 'Настройки фильтра ссылок', 'Сохранить', $('<form/>', {
                'role': 'form'
            })
            // Append input box for the command name. This one is disabled.
            .append(helpers.getInputGroup('timeout-message', 'text', 'Предупреждение', '', e.linksMessage, 'Сообщение с предупреждением о нарушении')
            // Append checkbox for if this message should be enabled.
            .append(helpers.getCheckBox('timeout-message-toggle', e.silentTimeoutLinks === 'true', 'тихо', 'Когда галочка установлена, сообщение не публикуется в чате')))
            // Append input box for the warning time.
            .append(helpers.getInputGroup('timeout-warning-time', 'number', 'Первый таймаут', '0', e.warningTimeLinks,
                'Длительность таймаута при первом нарушении, в секундах'))
            // Append input box for the timeout time.
            .append(helpers.getInputGroup('timeout-timeout-time', 'number', 'Повторный таймаут', '0', e.timeoutTimeLinks,
                'Длительность таймаута при повторном нарушении, в секундах'))
            // Add an advance section that can be opened with a button toggle.
            .append($('<div/>', {
                'class': 'collapse',
                'id': 'advance-collapse',
                'style': 'margin-top: 10px;',
                'html': $('<form/>', {
                    'role': 'form'
                })
                // Append ban reason. This is the message Twitch shows with the timeout.
                .append(helpers.getInputGroup('timeout-banmsg', 'text', 'Причина', '', e.silentLinkMessage,
                    'Сообщение о причине таймаута (видно только модераторам и в логах)'))
                // Append input box for the permit time.
                .append(helpers.getInputGroup('permit-time', 'number', 'Разрешение на публикацию ссылки', '60', e.linkPermitTime,
                    'Длительность разрешения в секундах на публикацию ссылки'))
                // Add group for toggles.
                .append($('<div/>', {
                    'class': 'form-group'
                })
                // Tooltip to toggle for regulars to bypass this filter.
                .append(helpers.getCheckBox('exclude-regulars', e.regularsModerateLinks !== 'true', 'кроме регуляров',
                    'Когда галочка установлена, фильтр не действует на регуляров'))
                // Tooltip to toggle for subs to bypass this filter.
                .append(helpers.getCheckBox('exclude-subscribers', e.subscribersModerateLinks !== 'true', 'кроме подписчиков',
                    'Когда галочка установлена, фильтр не действует на подписчиков')))
            // Callback function to be called once we hit the save button on the modal.
            })), function() {
                let timeoutMessage = $('#timeout-message'),
                    timeoutMessageToggle = $('#timeout-message-toggle').is(':checked') === true,
                    warningTime = $('#timeout-warning-time'),
                    timeoutTime = $('#timeout-timeout-time'),
                    timeoutReason = $('#timeout-banmsg'),
                    permitTime = $('#permit-time'),
                    isReg = $('#exclude-regulars').is(':checked') !== true,
                    isSub = $('#exclude-subscribers').is(':checked') !== true;

                // Handle each input to make sure they have a value.
                switch (false) {
                    case helpers.handleInputString(timeoutMessage):
                    case helpers.handleInputNumber(warningTime):
                    case helpers.handleInputNumber(timeoutTime):
                    case helpers.handleInputString(timeoutReason):
                    case helpers.handleInputNumber(permitTime):
                        break;
                    default:
                        // Update moderation settings.
                        socket.updateDBValues('moderation_update_links', {
                            tables: ['chatModerator', 'chatModerator', 'chatModerator', 'chatModerator', 'chatModerator',
                                    'chatModerator', 'chatModerator', 'chatModerator'],
                            keys: ['linksMessage', 'linkPermitTime', 'subscribersModerateLinks', 'regularsModerateLinks', 'silentTimeoutLinks',
                                    'silentLinkMessage', 'warningTimeLinks', 'timeoutTimeLinks'],
                            values: [timeoutMessage.val(), permitTime.val(), isSub, isReg, timeoutMessageToggle, timeoutReason.val(), warningTime.val(), timeoutTime.val()]
                        }, function() {
                            socket.sendCommand('moderation_update_filter_cmd', 'reloadmod', function() {
                                // Hide modal
                                $('#link-settings').modal('hide');
                                // Let the user know.
                                toastr.success('Настройки фильтра ссылок успешно обновлены');
                            });
                        });
                }
            }).modal('toggle');
        });
    });

    // Handle caps filter settings.
    $('#filter-caps-btn').on('click', function() {
        // Get caps filter settings.
        socket.getDBValues('moderation_get_caps_settings', {
            tables: ['chatModerator', 'chatModerator', 'chatModerator', 'chatModerator', 'chatModerator',
                    'chatModerator', 'chatModerator', 'chatModerator', 'chatModerator'],
            keys: ['capsMessage', 'capsLimitPercent', 'capsTriggerLength', 'subscribersModerateCaps',
                    'regularsModerateCaps', 'silentTimeoutCaps', 'silentCapMessage', 'warningTimeCaps', 'timeoutTimeCaps']
        }, true, function(e) {
            // Get advance modal from our util functions in /utils/helpers.js
            helpers.getAdvanceModal('caps-settings', 'Настройки фильтра капса', 'Сохранить', $('<form/>', {
                'role': 'form'
            })
            // Append input box for the command name. This one is disabled.
            .append(helpers.getInputGroup('timeout-message', 'text', 'Предупреждение', '', e.capsMessage, 'Сообщение с предупреждением о нарушении')
            // Append checkbox for if this message should be enabled.
            .append(helpers.getCheckBox('timeout-message-toggle', e.silentTimeoutCaps === 'true', 'тихо', 'Когда галочка установлена, сообщение не публикуется в чате')))
            // Append input box for the warning time.
            .append(helpers.getInputGroup('timeout-warning-time', 'number', 'Первый таймаут', '0', e.warningTimeCaps,
                'Длительность таймаута при первом нарушении, в секундах'))
            // Append input box for the timeout time.
            .append(helpers.getInputGroup('timeout-timeout-time', 'number', 'Повторный таймаут', '0', e.timeoutTimeCaps,
                'Длительность таймаута при повторном нарушении, в секундах'))
            // Add an advance section that can be opened with a button toggle.
            .append($('<div/>', {
                'class': 'collapse',
                'id': 'advance-collapse',
                'style': 'margin-top: 10px;',
                'html': $('<form/>', {
                    'role': 'form'
                })
                // Append ban reason. This is the message Twitch shows with the timeout.
                .append(helpers.getInputGroup('timeout-banmsg', 'text', 'Причина', '', e.silentCapMessage,
                    'Сообщение о причине таймаута (видно только модераторам и в логах)'))
                // Append input box for amount of caps required before checking.
                .append(helpers.getInputGroup('caps-trigger-amount', 'number', 'Минимум заглавных букв', '0', e.capsTriggerLength,
                    'Минимальное количество заглавных букв в сообщении, необходимое для срабатывания фильтра'))
                // Append input box for the max caps percent
                .append(helpers.getInputGroup('caps-amount', 'number', 'Максимум заглавных букв', '0', e.capsLimitPercent,
                    'Максимальная допустимая доля заглавных букв в сообщении, в процентах'))
                // Add group for toggles.
                .append($('<div/>', {
                    'class': 'form-group'
                })
                // Tooltip to toggle for regulars to bypass this filter.
                .append(helpers.getCheckBox('exclude-regulars', e.regularsModerateCaps !== 'true', 'кроме регуляров',
                    'Когда галочка установлена, фильтр не действует на регуляров'))
                // Tooltip to toggle for subs to bypass this filter.
                .append(helpers.getCheckBox('exclude-subscribers', e.subscribersModerateCaps !== 'true', 'кроме подписчиков',
                    'Когда галочка установлена, фильтр не действует на подписчиков')))
            // Callback function to be called once we hit the save button on the modal.
            })), function() {
                let timeoutMessage = $('#timeout-message'),
                    timeoutMessageToggle = $('#timeout-message-toggle').is(':checked') === true,
                    warningTime = $('#timeout-warning-time'),
                    timeoutTime = $('#timeout-timeout-time'),
                    timeoutReason = $('#timeout-banmsg'),
                    capsTrigger = $('#caps-trigger-amount'),
                    capsLimit = $('#caps-amount'),
                    isReg = $('#exclude-regulars').is(':checked') !== true,
                    isSub = $('#exclude-subscribers').is(':checked') !== true;

                // Handle each input to make sure they have a value.
                switch (false) {
                    case helpers.handleInputString(timeoutMessage):
                    case helpers.handleInputNumber(warningTime):
                    case helpers.handleInputNumber(timeoutTime):
                    case helpers.handleInputString(timeoutReason):
                    case helpers.handleInputNumber(capsTrigger):
                    case helpers.handleInputNumber(capsLimit):
                        break;
                    default:
                        // Update moderation settings.
                        socket.updateDBValues('moderation_update_caps', {
                            tables: ['chatModerator', 'chatModerator', 'chatModerator', 'chatModerator', 'chatModerator',
                                    'chatModerator', 'chatModerator', 'chatModerator', 'chatModerator'],
                            keys: ['capsMessage', 'capsLimitPercent', 'capsTriggerLength', 'subscribersModerateCaps',
                                    'regularsModerateCaps', 'silentTimeoutCaps', 'silentCapMessage', 'warningTimeCaps', 'timeoutTimeCaps'],
                            values: [timeoutMessage.val(), capsLimit.val(), capsTrigger.val(), isSub, isReg, timeoutMessageToggle,
                                    timeoutReason.val(), warningTime.val(), timeoutTime.val()]
                        }, function() {
                            socket.sendCommand('moderation_update_filter_cmd', 'reloadmod', function() {
                                // Hide modal
                                $('#caps-settings').modal('hide');
                                // Let the user know.
                                toastr.success('Настройки фильтра капса успешно обновлены');
                            });
                        });
                }
            }).modal('toggle');
        });
    });

    // Handle symbols filter settings.
    $('#filter-symbols-btn').on('click', function() {
        // Get symbols filter settings.
        socket.getDBValues('moderation_get_symbols_settings', {
            tables: ['chatModerator', 'chatModerator', 'chatModerator', 'chatModerator', 'chatModerator', 'chatModerator',
                    'chatModerator', 'chatModerator', 'chatModerator', 'chatModerator'],
            keys: ['symbolsMessage', 'symbolsLimitPercent', 'symbolsGroupLimit', 'symbolsTriggerLength',
                    'subscribersModerateSymbols', 'regularsModerateSymbols', 'silentTimeoutSymbols', 'silentSymbolsMessage', 'warningTimeSymbols', 'timeoutTimeSymbols']
        }, true, function(e) {
            // Get advance modal from our util functions in /utils/helpers.js
            helpers.getAdvanceModal('symbols-settings', 'Настройки фильтра символов', 'Сохранить', $('<form/>', {
                'role': 'form'
            })
            // Append input box for the command name. This one is disabled.
            .append(helpers.getInputGroup('timeout-message', 'text', 'Предупреждение', '', e.symbolsMessage, 'Сообщение с предупреждением о нарушении')
            // Append checkbox for if this message should be enabled.
            .append(helpers.getCheckBox('timeout-message-toggle', e.silentTimeoutSymbols === 'true', 'тихо', 'Когда галочка установлена, сообщение не публикуется в чате')))
            // Append input box for the warning time.
            .append(helpers.getInputGroup('timeout-warning-time', 'number', 'Первый таймаут', '0', e.warningTimeSymbols,
                'Длительность таймаута при первом нарушении, в секундах'))
            // Append input box for the timeout time.
            .append(helpers.getInputGroup('timeout-timeout-time', 'number', 'Повторный таймаут', '0', e.timeoutTimeSymbols,
                'Длительность таймаута при повторном нарушении, в секундах'))
            // Add an advance section that can be opened with a button toggle.
            .append($('<div/>', {
                'class': 'collapse',
                'id': 'advance-collapse',
                'style': 'margin-top: 10px;',
                'html': $('<form/>', {
                    'role': 'form'
                })
                // Append ban reason. This is the message Twitch shows with the timeout.
                .append(helpers.getInputGroup('timeout-banmsg', 'text', 'Причина', '', e.silentSymbolsMessage,
                    'Сообщение о причине таймаута (видно только модераторам и в логах)'))
                // Append input box for amount of symbols required before checking.
                .append(helpers.getInputGroup('symbols-trigger-amount', 'number', 'Минимум символов', '0', e.symbolsTriggerLength,
                    'Минимальное количество символов в сообщении, необходимое для срабатывания фильтра'))
                // Append input box for the max symbols percent.
                .append(helpers.getInputGroup('symbols-amount', 'number', 'Максимальная доля символов', '0', e.symbolsLimitPercent,
                    'Максимальная допустимая доля символов в сообщении, в процентах'))
                // Append input box for the max groupped symbols.
                .append(helpers.getInputGroup('symbols-amount-group', 'number', 'Максимум символов подряд', '0', e.symbolsGroupLimit,
                    'Максимальное допустимое количество символов в сообщении, набранных подряд'))
                // Add group for toggles.
                .append($('<div/>', {
                    'class': 'form-group'
                })
                // Tooltip to toggle for subs to bypass this filter.
                .append(helpers.getCheckBox('exclude-regulars', e.regularsModerateSymbols !== 'true', 'кроме регуляров',
                    'Когда галочка установлена, фильтр не действует на регуляров'))
                // Tooltip to toggle for subs to bypass this filter.
                .append(helpers.getCheckBox('exclude-subscribers', e.subscribersModerateSymbols !== 'true', 'кроме подписчиков',
                    'Когда галочка установлена, фильтр не действует на подписчиков')))
            // Callback function to be called once we hit the save button on the modal.
            })), function() {
                let timeoutMessage = $('#timeout-message'),
                    timeoutMessageToggle = $('#timeout-message-toggle').is(':checked') === true,
                    warningTime = $('#timeout-warning-time'),
                    timeoutTime = $('#timeout-timeout-time'),
                    timeoutReason = $('#timeout-banmsg'),
                    symbolsTrigger = $('#symbols-trigger-amount'),
                    symbolsLimit = $('#symbols-amount'),
                    symbolsLimitGroup = $('#symbols-amount-group'),
                    isReg = $('#exclude-regulars').is(':checked') !== true,
                    isSub = $('#exclude-subscribers').is(':checked') !== true;

                // Handle each input to make sure they have a value.
                switch (false) {
                    case helpers.handleInputString(timeoutMessage):
                    case helpers.handleInputNumber(warningTime):
                    case helpers.handleInputNumber(timeoutTime):
                    case helpers.handleInputString(timeoutReason):
                    case helpers.handleInputNumber(symbolsTrigger):
                    case helpers.handleInputNumber(symbolsLimit):
                    case helpers.handleInputNumber(symbolsLimitGroup):
                        break;
                    default:
                        // Update moderation settings.
                        socket.updateDBValues('moderation_update_symbols', {
                            tables: ['chatModerator', 'chatModerator', 'chatModerator', 'chatModerator', 'chatModerator',
                                'chatModerator', 'chatModerator', 'chatModerator', 'chatModerator', 'chatModerator'],
                            keys: ['symbolsMessage', 'symbolsLimitPercent', 'symbolsGroupLimit', 'symbolsTriggerLength',
                                'subscribersModerateSymbols', 'regularsModerateSymbols', 'silentTimeoutSymbols', 'silentSymbolsMessage', 'warningTimeSymbols', 'timeoutTimeSymbols'],
                            values: [timeoutMessage.val(), symbolsLimit.val(), symbolsLimitGroup.val(), symbolsTrigger.val(),
                                    isSub, isReg, timeoutMessageToggle, timeoutReason.val(), warningTime.val(), timeoutTime.val()]
                        }, function() {
                            socket.sendCommand('moderation_update_filter_cmd', 'reloadmod', function() {
                                // Hide modal
                                $('#symbols-settings').modal('hide');
                                // Let the user know.
                                toastr.success('Настройки фильтра символов успешно обновлены');
                            });
                        });
                }
            }).modal('toggle');
        });
    });

    // Handle spam filter settings.
    $('#filter-spam-btn').on('click', function() {
        // Get spam filter settings.
        socket.getDBValues('moderation_get_spam_settings', {
            tables: ['chatModerator', 'chatModerator', 'chatModerator', 'chatModerator', 'chatModerator',
                    'chatModerator', 'chatModerator', 'chatModerator'],
            keys: ['spamMessage', 'spamLimit', 'subscribersModerateSpam', 'regularsModerateSpam',
                    'silentTimeoutSpam', 'silentSpamMessage', 'warningTimeSpam', 'timeoutTimeSpam']
        }, true, function(e) {
            // Get advance modal from our util functions in /utils/helpers.js
            helpers.getAdvanceModal('spam-settings', 'Настройки фильтра спама', 'Сохранить', $('<form/>', {
                'role': 'form'
            })
            // Append input box for the command name. This one is disabled.
            .append(helpers.getInputGroup('timeout-message', 'text', 'Предупреждение', '', e.spamMessage,
                'Сообщение с предупреждением о нарушении')
            // Append checkbox for if this message should be enabled.
            .append(helpers.getCheckBox('timeout-message-toggle', e.silentTimeoutSpam === 'true', 'тихо',
                'Когда галочка установлена, сообщение не публикуется в чате')))
            // Append input box for the warning time.
            .append(helpers.getInputGroup('timeout-warning-time', 'number', 'Первый таймаут', '0', e.warningTimeSpam,
                'Длительность таймаута при первом нарушении, в секундах'))
            // Append input box for the timeout time.
            .append(helpers.getInputGroup('timeout-timeout-time', 'number', 'Повторный таймаут', '0', e.timeoutTimeSpam,
                'Длительность таймаута при повторном нарушении, в секундах'))
            // Add an advance section that can be opened with a button toggle.
            .append($('<div/>', {
                'class': 'collapse',
                'id': 'advance-collapse',
                'style': 'margin-top: 10px;',
                'html': $('<form/>', {
                    'role': 'form'
                })
                // Append ban reason. This is the message Twitch shows with the timeout.
                .append(helpers.getInputGroup('timeout-banmsg', 'text', 'Причина', '', e.silentSpamMessage,
                    'Сообщение о причине таймаута (видно только модераторам и в логах)'))
                // Append input box for amount of caps required before checking.
                .append(helpers.getInputGroup('spam-amount', 'number', 'Максимум повторяющихся знаков', '0', e.spamLimit,
                    'Максимальное допустимое количество повторяющихся знаков в сообщении'))
                // Add group for toggles.
                .append($('<div/>', {
                    'class': 'form-group'
                })
                // Tooltip to toggle for regulars to bypass this filter.
                .append(helpers.getCheckBox('exclude-regulars', e.regularsModerateSpam !== 'true', 'кроме регуляров',
                    'Когда галочка установлена, фильтр не действует на регуляров'))
                // Tooltip to toggle for subs to bypass this filter.
                .append(helpers.getCheckBox('exclude-subscribers', e.subscribersModerateSpam !== 'true', 'кроме подписчиков',
                    'Когда галочка установлена, фильтр не действует на подписчиков')))
            // Callback function to be called once we hit the save button on the modal.
            })), function() {
                let timeoutMessage = $('#timeout-message'),
                    timeoutMessageToggle = $('#timeout-message-toggle').is(':checked') === true,
                    warningTime = $('#timeout-warning-time'),
                    timeoutTime = $('#timeout-timeout-time'),
                    timeoutReason = $('#timeout-banmsg'),
                    spamLimit = $('#spam-amount'),
                    isReg = $('#exclude-regulars').is(':checked') !== true,
                    isSub = $('#exclude-subscribers').is(':checked') !== true;

                // Handle each input to make sure they have a value.
                switch (false) {
                    case helpers.handleInputString(timeoutMessage):
                    case helpers.handleInputNumber(warningTime):
                    case helpers.handleInputNumber(timeoutTime):
                    case helpers.handleInputString(timeoutReason):
                    case helpers.handleInputNumber(spamLimit):
                        break;
                    default:
                        // Update moderation settings.
                        socket.updateDBValues('moderation_update_spam', {
                            tables: ['chatModerator', 'chatModerator', 'chatModerator', 'chatModerator',
                                    'chatModerator', 'chatModerator', 'chatModerator', 'chatModerator', 'chatModerator'],
                            keys: ['spamMessage', 'spamLimit', 'subscribersModerateSpam', 'regularsModerateSpam',
                                     'silentTimeoutSpam', 'silentSpamMessage', 'warningTimeSpam', 'timeoutTimeSpam'],
                            values: [timeoutMessage.val(), spamLimit.val(), isSub, isReg, timeoutMessageToggle,
                                    timeoutReason.val(), warningTime.val(), timeoutTime.val()]
                        }, function() {
                            socket.sendCommand('moderation_update_filter_cmd', 'reloadmod', function() {
                                // Hide modal
                                $('#spam-settings').modal('hide');
                                // Let the user know.
                                toastr.success('Настройки фильтра спама успешно обновлены');
                            });
                        });
                }
            }).modal('toggle');
        });
    });

    // Handle emotes filter settings.
    $('#filter-emotes-btn').on('click', function() {
        // Get emotes filter settings.
        socket.getDBValues('moderation_get_emotes_settings', {
            tables: ['chatModerator', 'chatModerator', 'chatModerator', 'chatModerator', 'chatModerator',
                    'chatModerator', 'chatModerator', 'chatModerator'],
            keys: ['emotesMessage', 'emotesLimit', 'subscribersModerateEmotes',
                    'regularsModerateEmotes', 'silentTimeoutEmotes', 'silentEmoteMessage', 'warningTimeEmotes', 'timeoutTimeEmotes']
        }, true, function(e) {
            // Get advance modal from our util functions in /utils/helpers.js
            helpers.getAdvanceModal('emotes-settings', 'Настройки фильтра смайлов', 'Сохранить', $('<form/>', {
                'role': 'form'
            })
            // Append input box for the command name. This one is disabled.
            .append(helpers.getInputGroup('timeout-message', 'text', 'Предупреждение', '', e.emotesMessage,
                'Сообщение с предупреждением о нарушении')
            // Append checkbox for if this message should be enabled.
            .append(helpers.getCheckBox('timeout-message-toggle', e.silentTimeoutEmotes === 'true', 'тихо',
                'Когда галочка установлена, сообщение не публикуется в чате')))
            // Append input box for the warning time.
            .append(helpers.getInputGroup('timeout-warning-time', 'number', 'Первый таймаут', '0', e.warningTimeEmotes,
                'Длительность таймаута при первом нарушении, в секундах'))
            // Append input box for the timeout time.
            .append(helpers.getInputGroup('timeout-timeout-time', 'number', 'Повторный таймаут', '0', e.timeoutTimeEmotes,
                'Длительность таймаута при повторном нарушении, в секундах'))
            // Add an advance section that can be opened with a button toggle.
            .append($('<div/>', {
                'class': 'collapse',
                'id': 'advance-collapse',
                'style': 'margin-top: 10px;',
                'html': $('<form/>', {
                    'role': 'form'
                })
                // Append ban reason. This is the message Twitch shows with the timeout.
                .append(helpers.getInputGroup('timeout-banmsg', 'text', 'Причина', '', e.silentEmoteMessage,
                    'Сообщение о причине таймаута (видно только модераторам и в логах)'))
                // Append input box for amount of caps required before checking.
                .append(helpers.getInputGroup('emote-amount', 'number', 'Максимум смайлов', '0', e.emotesLimit,
                    'Максимальное допустимое количество смайлов в сообщении'))
                // Add group for toggles.
                .append($('<div/>', {
                    'class': 'form-group'
                })
                // Tooltip to toggle for regulars to bypass this filter.
                .append(helpers.getCheckBox('exclude-regulars', e.regularsModerateEmotes !== 'true', 'кроме регуляров',
                    'Когда галочка установлена, фильтр не действует на регуляров'))
                // Tooltip to toggle for subs to bypass this filter.
                .append(helpers.getCheckBox('exclude-subscribers', e.subscribersModerateEmotes !== 'true', 'кроме подписчиков',
                    'Когда галочка установлена, фильтр не действует на подписчиков')))
            // Callback function to be called once we hit the save button on the modal.
            })), function() {
                let timeoutMessage = $('#timeout-message'),
                    timeoutMessageToggle = $('#timeout-message-toggle').is(':checked') === true,
                    warningTime = $('#timeout-warning-time'),
                    timeoutTime = $('#timeout-timeout-time'),
                    timeoutReason = $('#timeout-banmsg'),
                    emoteLimit = $('#emote-amount'),
                    isReg = $('#exclude-regulars').is(':checked') !== true,
                    isSub = $('#exclude-subscribers').is(':checked') !== true;

                // Handle each input to make sure they have a value.
                switch (false) {
                    case helpers.handleInputString(timeoutMessage):
                    case helpers.handleInputNumber(warningTime):
                    case helpers.handleInputNumber(timeoutTime):
                    case helpers.handleInputString(timeoutReason):
                    case helpers.handleInputNumber(emoteLimit):
                        break;
                    default:
                        // Update moderation settings.
                        socket.updateDBValues('moderation_update_emotes', {
                            tables: ['chatModerator', 'chatModerator', 'chatModerator', 'chatModerator',
                                    'chatModerator', 'chatModerator', 'chatModerator', 'chatModerator', 'chatModerator'],
                            keys: ['emotesMessage', 'emotesLimit', 'subscribersModerateEmotes',
                                    'regularsModerateEmotes', 'silentTimeoutEmotes', 'silentEmoteMessage', 'warningTimeEmotes', 'timeoutTimeEmotes'],
                            values: [timeoutMessage.val(), emoteLimit.val(), isSub, isReg, timeoutMessageToggle,
                                    timeoutReason.val(), warningTime.val(), timeoutTime.val()]
                        }, function() {
                            socket.sendCommand('moderation_update_filter_cmd', 'reloadmod', function() {
                                // Hide modal
                                $('#emotes-settings').modal('hide');
                                // Let the user know.
                                toastr.success('Настройки фильтра смайлов успешно обновлены');
                            });
                        });
                }
            }).modal('toggle');
        });
    });

    // Handle me filter settings.
    $('#filter-me-btn').on('click', function() {
        // Get me filter settings.
        socket.getDBValues('moderation_get_me_settings', {
            tables: ['chatModerator', 'chatModerator', 'chatModerator', 'chatModerator',
                    'chatModerator', 'chatModerator', 'chatModerator'],
            keys: ['colorsMessage', 'subscribersModerateColors', 'regularsModerateColors',
                    'silentTimeoutColors', 'silentColorMessage', 'warningTimeColors', 'timeoutTimeColors']
        }, true, function(e) {
            // Get advance modal from our util functions in /utils/helpers.js
            helpers.getAdvanceModal('me-settings', 'Настройки фильтра цветных сообщений', 'Сохранить', $('<form/>', {
                'role': 'form'
            })
            // Append input box for the command name. This one is disabled.
            .append(helpers.getInputGroup('timeout-message', 'text', 'Предупреждение', '', e.colorsMessage,
                'Сообщение с предупреждением о нарушении')
            // Append checkbox for if this message should be enabled.
            .append(helpers.getCheckBox('timeout-message-toggle', e.silentTimeoutColors === 'true', 'тихо',
                'Когда галочка установлена, сообщение не публикуется в чате')))
            // Append input box for the warning time.
            .append(helpers.getInputGroup('timeout-warning-time', 'number', 'Первый таймаут', '0', e.warningTimeColors,
                'Длительность таймаута при первом нарушении, в секундах'))
            // Append input box for the timeout time.
            .append(helpers.getInputGroup('timeout-timeout-time', 'number', 'Повторный таймаут', '0', e.timeoutTimeColors,
                'Длительность таймаута при повторном нарушении, в секундах'))
            // Add an advance section that can be opened with a button toggle.
            .append($('<div/>', {
                'class': 'collapse',
                'id': 'advance-collapse',
                'style': 'margin-top: 10px;',
                'html': $('<form/>', {
                    'role': 'form'
                })
                // Append ban reason. This is the message Twitch shows with the timeout.
                .append(helpers.getInputGroup('timeout-banmsg', 'text', 'Причина', '', e.silentColorMessage,
                    'Сообщение о причине таймаута (видно только модераторам и в логах)'))
                // Add group for toggles.
                .append($('<div/>', {
                    'class': 'form-group'
                })
                // Tooltip to toggle for regulars to bypass this filter.
                .append(helpers.getCheckBox('exclude-regulars', e.regularsModerateColors !== 'true', 'кроме регуляров',
                    'Когда галочка установлена, фильтр не действует на регуляров'))
                // Tooltip to toggle for subs to bypass this filter.
                .append(helpers.getCheckBox('exclude-subscribers', e.subscribersModerateColors !== 'true', 'кроме подписчиков',
                    'Когда галочка установлена, фильтр не действует на подписчиков')))
            // Callback function to be called once we hit the save button on the modal.
            })), function() {
                let timeoutMessage = $('#timeout-message'),
                    timeoutMessageToggle = $('#timeout-message-toggle').is(':checked') === true,
                    warningTime = $('#timeout-warning-time'),
                    timeoutTime = $('#timeout-timeout-time'),
                    timeoutReason = $('#timeout-banmsg'),
                    isReg = $('#exclude-regulars').is(':checked') !== true,
                    isSub = $('#exclude-subscribers').is(':checked') !== true;

                // Handle each input to make sure they have a value.
                switch (false) {
                    case helpers.handleInputString(timeoutMessage):
                    case helpers.handleInputNumber(warningTime):
                    case helpers.handleInputNumber(timeoutTime):
                    case helpers.handleInputString(timeoutReason):
                        break;
                    default:
                        // Update moderation settings.
                        socket.updateDBValues('moderation_update_me', {
                            tables: ['chatModerator', 'chatModerator', 'chatModerator', 'chatModerator',
                                    'chatModerator', 'chatModerator', 'chatModerator', 'chatModerator', 'chatModerator'],
                            keys: ['colorsMessage', 'subscribersModerateColors', 'regularsModerateColors',
                                    'silentTimeoutColors', 'silentColorMessage', 'warningTimeColors', 'timeoutTimeColors'],
                            values: [timeoutMessage.val(), isSub, isReg, timeoutMessageToggle, timeoutReason.val(), warningTime.val(), timeoutTime.val()]
                        }, function() {
                            socket.sendCommand('moderation_update_filter_cmd', 'reloadmod', function() {
                                // Hide modal
                                $('#me-settings').modal('hide');
                                // Let the user know.
                                toastr.success('Настройки фильтра цветных сообщений успешно обновлены');
                            });
                        });
                }
            }).modal('toggle');
        });
    });

    // Handle message length filter settings.
    $('#filter-msglen-btn').on('click', function() {
        // Get message length filter settings.
        socket.getDBValues('moderation_get_msglen_settings', {
            tables: ['chatModerator', 'chatModerator', 'chatModerator', 'chatModerator',
                    'chatModerator', 'chatModerator', 'chatModerator', 'chatModerator'],
            keys: ['longMessageMessage', 'longMessageLimit', 'subscribersModerateLongMsg',
                    'regularsModerateLongMsg', 'silentTimeoutLongMsg', 'silentLongMessage', 'warningTimeLongMsg', 'timeoutTimeLongMsg']
        }, true, function(e) {
            // Get advance modal from our util functions in /utils/helpers.js
            helpers.getAdvanceModal('msglen-settings', 'Настройки фильтра длинных сообщений', 'Сохранить', $('<form/>', {
                'role': 'form'
            })
            // Append input box for the command name. This one is disabled.
            .append(helpers.getInputGroup('timeout-message', 'text', 'Предупреждение', '', e.longMessageMessage,
                'Сообщение с предупреждением о нарушении')
            // Append checkbox for if this message should be enabled.
            .append(helpers.getCheckBox('timeout-message-toggle', e.silentTimeoutLongMsg === 'true', 'тихо',
                'Когда галочка установлена, сообщение не публикуется в чате')))
            // Append input box for the warning time.
            .append(helpers.getInputGroup('timeout-warning-time', 'number', 'Первый таймаут', '0', e.warningTimeLongMsg,
                'Длительность таймаута при первом нарушении, в секундах'))
            // Append input box for the timeout time.
            .append(helpers.getInputGroup('timeout-timeout-time', 'number', 'Повторный таймаут', '0', e.timeoutTimeLongMsg,
                'Длительность таймаута при повторном нарушении, в секундах'))
            // Add an advance section that can be opened with a button toggle.
            .append($('<div/>', {
                'class': 'collapse',
                'id': 'advance-collapse',
                'style': 'margin-top: 10px;',
                'html': $('<form/>', {
                    'role': 'form'
                })
                // Append ban reason. This is the message Twitch shows with the timeout.
                .append(helpers.getInputGroup('timeout-banmsg', 'text', 'Причина', '', e.silentLongMessage,
                    'Сообщение о причине таймаута (видно только модераторам и в логах)'))
                // Append input box for max amount of chars allowed in a message
                .append(helpers.getInputGroup('msg-limit', 'number', 'Максимум знаков', '0', e.longMessageLimit,
                    'Максимальное допустимое количество знаков в сообщении'))
                // Add group for toggles.
                .append($('<div/>', {
                    'class': 'form-group'
                })
                // Tooltip to toggle for regulars to bypass this filter.
                .append(helpers.getCheckBox('exclude-regulars', e.regularsModerateLongMsg !== 'true', 'кроме регуляров',
                    'Когда галочка установлена, фильтр не действует на регуляров'))
                // Tooltip to toggle for subs to bypass this filter.
                .append(helpers.getCheckBox('exclude-subscribers', e.subscribersModerateLongMsg !== 'true', 'кроме подписчиков',
                    'Когда галочка установлена, фильтр не действует на подписчиков')))
            // Callback function to be called once we hit the save button on the modal.
            })), function() {
                let timeoutMessage = $('#timeout-message'),
                    timeoutMessageToggle = $('#timeout-message-toggle').is(':checked') === true,
                    warningTime = $('#timeout-warning-time'),
                    timeoutTime = $('#timeout-timeout-time'),
                    timeoutReason = $('#timeout-banmsg'),
                    msgLimit = $('#msg-limit'),
                    isReg = $('#exclude-regulars').is(':checked') !== true,
                    isSub = $('#exclude-subscribers').is(':checked') !== true;

                // Handle each input to make sure they have a value.
                switch (false) {
                    case helpers.handleInputString(timeoutMessage):
                    case helpers.handleInputNumber(warningTime):
                    case helpers.handleInputNumber(timeoutTime):
                    case helpers.handleInputString(timeoutReason):
                    case helpers.handleInputString(msgLimit):
                        break;
                    default:
                        // Update moderation settings.
                        socket.updateDBValues('moderation_update_longmsg', {
                            tables: ['chatModerator', 'chatModerator', 'chatModerator', 'chatModerator',
                                    'chatModerator', 'chatModerator', 'chatModerator', 'chatModerator', 'chatModerator'],
                            keys: ['longMessageMessage', 'longMessageLimit', 'subscribersModerateLongMsg',
                                    'regularsModerateLongMsg', 'silentTimeoutLongMsg', 'silentLongMessage', 'warningTimeLongMsg', 'timeoutTimeLongMsg'],
                            values: [timeoutMessage.val(), msgLimit.val(), isSub, isReg, timeoutMessageToggle,
                                    timeoutReason.val(), warningTime.val(), timeoutTime.val()]
                        }, function() {
                            socket.sendCommand('moderation_update_filter_cmd', 'reloadmod', function() {
                                // Hide modal
                                $('#msglen-settings').modal('hide');
                                // Let the user know.
                                toastr.success('Настройки фильтра длинных сообщений успешно обновлены');
                            });
                        });
                }
            }).modal('toggle');
        });
    });

    // Handle fake purge filter settings.
    $('#filter-purges-btn').on('click', function() {
        // Get purges filter settings.
        socket.getDBValues('moderation_get_purges_settings', {
            tables: ['chatModerator', 'chatModerator', 'chatModerator', 'chatModerator', 'chatModerator', 'chatModerator', 'chatModerator'],
            keys: ['fakePurgeMessage', 'subscribersModerateFakePurge', 'regularsModerateFakePurge',
                    'silentTimeoutFakePurge', 'silentFakePurgeMessage', 'warningTimeFakePurge', 'timeoutTimeFakePurge']
        }, true, function(e) {
            // Get advance modal from our util functions in /utils/helpers.js
            helpers.getAdvanceModal('purges-settings', 'Настройки фильтра подлога удалённого сообщения', 'Сохранить', $('<form/>', {
                'role': 'form'
            })
            // Append input box for the command name. This one is disabled.
            .append(helpers.getInputGroup('timeout-message', 'text', 'Предупреждение', '', e.fakePurgeMessage, 'Сообщение с предупреждением о нарушении')
            // Append checkbox for if this message should be enabled.
            .append(helpers.getCheckBox('timeout-message-toggle', e.silentTimeoutFakePurge === 'true', 'тихо', 'Когда галочка установлена, сообщение не публикуется в чате')))
            // Append input box for the warning time.
            .append(helpers.getInputGroup('timeout-warning-time', 'number', 'Первый таймаут', '0', e.warningTimeFakePurge,
                'Длительность таймаута при первом нарушении, в секундах'))
            // Append input box for the timeout time.
            .append(helpers.getInputGroup('timeout-timeout-time', 'number', 'Повторный таймаут', '0', e.timeoutTimeFakePurge,
                'Длительность таймаута при повторном нарушении, в секундах'))
            // Add an advance section that can be opened with a button toggle.
            .append($('<div/>', {
                'class': 'collapse',
                'id': 'advance-collapse',
                'style': 'margin-top: 10px;',
                'html': $('<form/>', {
                    'role': 'form'
                })
                // Append ban reason. This is the message Twitch shows with the timeout.
                .append(helpers.getInputGroup('timeout-banmsg', 'text', 'Причина', '', e.silentFakePurgeMessage,
                    'Сообщение о причине таймаута (видно только модераторам и в логах)'))
                // Add group for toggles.
                .append($('<div/>', {
                    'class': 'form-group'
                })
                // Tooltip to toggle for regulars to bypass this filter.
                .append(helpers.getCheckBox('exclude-regulars', e.regularsModerateFakePurge !== 'true', 'кроме регуляров',
                    'Когда галочка установлена, фильтр не действует на регуляров'))
                // Tooltip to toggle for subs to bypass this filter.
                .append(helpers.getCheckBox('exclude-subscribers', e.subscribersModerateFakePurge !== 'true', 'кроме подписчиков',
                    'Когда галочка установлена, фильтр не действует на подписчиков')))
            // Callback function to be called once we hit the save button on the modal.
            })), function() {
                let timeoutMessage = $('#timeout-message'),
                    timeoutMessageToggle = $('#timeout-message-toggle').is(':checked') === true,
                    warningTime = $('#timeout-warning-time'),
                    timeoutTime = $('#timeout-timeout-time'),
                    timeoutReason = $('#timeout-banmsg'),
                    isReg = $('#exclude-regulars').is(':checked') !== true,
                    isSub = $('#exclude-subscribers').is(':checked') !== true;

                // Handle each input to make sure they have a value.
                switch (false) {
                    case helpers.handleInputString(timeoutMessage):
                    case helpers.handleInputNumber(warningTime):
                    case helpers.handleInputNumber(timeoutTime):
                    case helpers.handleInputString(timeoutReason):
                        break;
                    default:
                        // Update moderation settings.
                        socket.updateDBValues('moderation_update_purges', {
                            tables: ['chatModerator', 'chatModerator', 'chatModerator', 'chatModerator',
                                    'chatModerator', 'chatModerator', 'chatModerator', 'chatModerator', 'chatModerator'],
                            keys: ['fakePurgeMessage', 'subscribersModerateFakePurge', 'regularsModerateFakePurge',
                                    'silentTimeoutFakePurge', 'silentFakePurgeMessage', 'warningTimeFakePurge', 'timeoutTimeFakePurge'],
                            values: [timeoutMessage.val(), isSub, isReg, timeoutMessageToggle, timeoutReason.val(), warningTime.val(), timeoutTime.val()]
                        }, function() {
                            socket.sendCommand('moderation_update_filter_cmd', 'reloadmod', function() {
                                // Hide modal
                                $('#purges-settings').modal('hide');
                                // Let the user know.
                                toastr.success('Настройки фильтра подлога удалённого сообщения успешно обновлены');
                            });
                        });
                }
            }).modal('toggle');
        });
    });

    // Handle tracker filter settings.
    $('#filter-tracker-btn').on('click', function() {
        // Get tracker length filter settings.
        socket.getDBValues('moderation_get_msglen_settings', {
            tables: ['chatModerator', 'chatModerator', 'chatModerator', 'chatModerator', 'chatModerator',
                    'chatModerator', 'chatModerator', 'chatModerator', 'chatModerator'],
            keys: ['spamTrackerMessage', 'spamTrackerTime', 'spamTrackerLimit', 'subscribersModerateSpamTracker',
                    'regularsModerateSpamTracker', 'silentTimeoutSpamTracker', 'silentSpamTrackerMessage', 'warningTimeSpamTracker', 'timeoutTimeSpamTracker']
        }, true, function(e) {
            // Get advance modal from our util functions in /utils/helpers.js
            helpers.getAdvanceModal('tracker-settings', 'Настройки фильтра флуда', 'Сохранить', $('<form/>', {
                'role': 'form'
            })
            // Append input box for the command name. This one is disabled.
            .append(helpers.getInputGroup('timeout-message', 'text', 'Предупреждение', '', e.spamTrackerMessage,
                'Сообщение с предупреждением о нарушении')
            // Append checkbox for if this message should be enabled.
            .append(helpers.getCheckBox('timeout-message-toggle', e.silentTimeoutSpamTracker === 'true', 'тихо',
                'Когда галочка установлена, сообщение не публикуется в чате')))
            // Append input box for the warning time.
            .append(helpers.getInputGroup('timeout-warning-time', 'number', 'Первый таймаут', '0', e.warningTimeSpamTracker,
                'Длительность таймаута при первом нарушении, в секундах'))
            // Append input box for the timeout time.
            .append(helpers.getInputGroup('timeout-timeout-time', 'number', 'Повторный таймаут', '0', e.timeoutTimeSpamTracker,
                'Длительность таймаута при повторном нарушении, в секундах'))
            // Add an advance section that can be opened with a button toggle.
            .append($('<div/>', {
                'class': 'collapse',
                'id': 'advance-collapse',
                'style': 'margin-top: 10px;',
                'html': $('<form/>', {
                    'role': 'form'
                })
                // Append ban reason. This is the message Twitch shows with the timeout.
                .append(helpers.getInputGroup('timeout-banmsg', 'text', 'Причина', '', e.silentSpamTrackerMessage,
                    'Сообщение о причине таймаута (видно только модераторам и в логах)'))
                // Append input box for the seconds reset time of the message caching of user.
                .append(helpers.getInputGroup('track-time', 'number', 'Интервал', '0', e.spamTrackerTime,
                    'Интервал времени в секундах, в течении которого разрешено заданное количество сообщений (см. ниже)'))
                // Append input box for the amount of messages the user can send in the reset time.
                .append(helpers.getInputGroup('track-limit', 'number', 'Максимум сообщений', '0', e.spamTrackerLimit,
                    'Максимальное допустимое количество сообщений в заданный интервал времени (см. выше)'))
                // Add group for toggles.
                .append($('<div/>', {
                    'class': 'form-group'
                })
                // Tooltip to toggle for regulars to bypass this filter.
                .append(helpers.getCheckBox('exclude-regulars', e.regularsModerateSpamTracker !== 'true', 'кроме регуляров',
                    'Когда галочка установлена, фильтр не действует на регуляров'))
                // Tooltip to toggle for subs to bypass this filter.
                .append(helpers.getCheckBox('exclude-subscribers', e.subscribersModerateSpamTracker !== 'true', 'кроме подписчиков',
                    'Когда галочка установлена, фильтр не действует на подписчиков')))
            // Callback function to be called once we hit the save button on the modal.
            })), function() {
                let timeoutMessage = $('#timeout-message'),
                    timeoutMessageToggle = $('#timeout-message-toggle').is(':checked') === true,
                    warningTime = $('#timeout-warning-time'),
                    timeoutTime = $('#timeout-timeout-time'),
                    timeoutReason = $('#timeout-banmsg'),
                    trackTime = $('#track-time'),
                    trackLimit = $('#track-limit'),
                    isReg = $('#exclude-regulars').is(':checked') !== true,
                    isSub = $('#exclude-subscribers').is(':checked') !== true;

                // Handle each input to make sure they have a value.
                switch (false) {
                    case helpers.handleInputString(timeoutMessage):
                    case helpers.handleInputNumber(warningTime):
                    case helpers.handleInputNumber(timeoutTime):
                    case helpers.handleInputString(timeoutReason):
                    case helpers.handleInputString(trackTime):
                    case helpers.handleInputString(trackLimit):
                        break;
                    default:
                        // Update moderation settings.
                        socket.updateDBValues('moderation_update_tracker', {
                            tables: ['chatModerator', 'chatModerator', 'chatModerator',
                                    'chatModerator', 'chatModerator', 'chatModerator', 'chatModerator', 'chatModerator', 'chatModerator'],
                            keys: ['spamTrackerMessage', 'spamTrackerTime', 'spamTrackerLimit',
                                    'subscribersModerateSpamTracker', 'regularsModerateSpamTracker', 'silentTimeoutSpamTracker', 'silentSpamTrackerMessage', 'warningTimeSpamTracker', 'timeoutTimeSpamTracker'],
                            values: [timeoutMessage.val(), trackTime.val(), trackLimit.val(), isSub, isReg,
                                    timeoutMessageToggle, timeoutReason.val(), warningTime.val(), timeoutTime.val()]
                        }, function() {
                            socket.sendCommand('moderation_update_filter_cmd', 'reloadmod', function() {
                                // Hide modal
                                $('#tracker-settings').modal('hide');
                                // Let the user know.
                                toastr.success('Настройки фильтра флуда успешно обновлены');
                            });
                        });
                }
            }).modal('toggle');
        });
    });
});
