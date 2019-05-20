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

// Main function that gets all of our data.
$(function() {
	// Get all module toggles.
    socket.getDBValues('alerts_get_modules', {
        tables: ['modules', 'modules', 'modules', 'modules', 'modules', 'modules', 'modules', 'modules', 'modules', 'modules', 'modules', 'modules'],
        keys: ['./discord/handlers/followHandler.js', './discord/handlers/subscribeHandler.js', './discord/handlers/hostHandler.js',
        		'./discord/handlers/bitsHandler.js', './discord/handlers/clipHandler.js', './discord/systems/greetingsSystem.js', './discord/handlers/streamlabsHandler.js',
        		'./discord/handlers/raidHandler.js', './discord/handlers/tipeeeStreamHandler.js', './discord/handlers/streamElementsHandler.js',
        		'./discord/handlers/twitterHandler.js', './discord/handlers/streamHandler.js']
    }, true, function(e) {
        // Handle the settings button.
        let keys = Object.keys(e),
            module = '',
            i;

        for (i = 0; i < keys.length; i++) {
            module = keys[i].substring(keys[i].lastIndexOf('/') + 1).replace('.js', '');
            // Handle the status of the buttons.
            if (e[keys[i]] === 'false') {
                // Handle the switch.
                $('#' + module + 'Toggle').prop('checked', false);
                // Handle the settings button.
                $('#discord' + (module.charAt(0).toUpperCase() + module.substring(1)) + 'Settings').prop('disabled', true);
            }
        }
    });
});

// Function that handles events
$(function() {
	// Toggle for the alert modules.
    $('[data-alert-toggle]').on('change', function() {
        let name = $(this).attr('id'),
            checked = $(this).is(':checked');

        // Handle the module.
        socket.sendCommandSync('discord_alerts_module_toggle', 'module '
            + (checked ? 'enablesilent' : 'disablesilent') + ' ' + $(this).data('alert-toggle'), function() {
            name = name.replace('Toggle', 'Settings');
            // Toggle the settings button.
            $('#discord' + name.charAt(0).toUpperCase() + name.substring(1)).prop('disabled', !checked);
            // Alert the user.
            toastr.success('Модуль успешно ' + (checked ? 'включен' : 'выключен'));
        });
    });

    // Follower alert.
    $('#discordFollowHandlerSettings').on('click', function() {
        socket.getDBValues('discord_alerts_follow_get_settings', {
            tables: ['discordSettings', 'discordSettings', 'discordSettings'],
            keys: ['followToggle', 'followMessage', 'followChannel']
        }, true, function(e) {
            helpers.getModal('follow-alert', 'Настройки оповещений о фолловинге', 'Сохранить', $('<form/>', {
                'role': 'form'
            })
            // Add the toggle for follow alerts.
            .append(helpers.getDropdownGroup('follow-toggle', 'Срабатывание', (e.followToggle === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'],
                'Срабатывание оповещений о фолловинге'))
            // Add the the text area for the follow message.
            .append(helpers.getTextAreaGroup('follow-message', 'text', 'Cообщение', '', e.followMessage,
                'Embed-сообщение, уведомляющее о фолловинге', false)
                // Append a sub-comment.
                .append(helpers.getSubComment('Доступные теги: (name)')))
            // Add the the box for the reward.
            .append(helpers.getInputGroup('follow-channel', 'text', 'Канал', '#alerts', e.followChannel,
                'Канал на сервере Discord для публикации оповещений о фолловинге')),
            function() { // Callback once the user clicks save.
                let followToggle = $('#follow-toggle').find(':selected').text() === 'Да',
                    followMessage = $('#follow-message'),
                    followChannel = $('#follow-channel');

                // Make sure everything has been filled it correctly.
                switch (false) {
                    case helpers.handleInputString(followMessage):
                    case helpers.handleInputString(followChannel):
                        break;
                    default:
                        // Update settings.
                        socket.updateDBValues('discord_alerts_follow_update_settings', {
                            tables: ['discordSettings', 'discordSettings', 'discordSettings'],
                            keys: ['followToggle', 'followMessage', 'followChannel'],
                            values: [followToggle, followMessage.val(), followChannel.val()]
                        }, function() {
                            socket.wsEvent('discord', './discord/handlers/followHandler.js', '', [], function() {
                                // Close the modal.
                                $('#follow-alert').modal('toggle');
                                // Alert the user.
                                toastr.success('Настройки оповещений о фолловинге успешно обновлены');
                            });
                        });
                }
            }).modal('toggle');
        });
    });

    // Subscriber alerts.
    $('#discordSubscribeHandlerSettings').on('click', function() {
        socket.getDBValues('discord_alerts_subscribe_get_settings', {
            tables: ['discordSettings', 'discordSettings', 'discordSettings', 'discordSettings', 'discordSettings', 'discordSettings', 'discordSettings', 'discordSettings', 'discordSettings'],
            keys: ['subMessage', 'primeMessage', 'resubToggle', 'giftsubMessage', 'subToggle', 'primeToggle', 'resubMessage', 'giftsubToggle', 'subChannel']
        }, true, function(e) {
            helpers.getModal('subscribe-alert', 'Настройки оповещений о подписках', 'Сохранить', $('<form/>', {
                'role': 'form'
            })
            // Add the div for the col boxes.
            .append($('<div/>', {
                'class': 'panel-group',
                'id': 'accordion'
            })
            // Append first collapsible accordion.
            .append(helpers.getCollapsibleAccordion('main-1', 'Первая подписка', $('<form/>', {
                    'role': 'form'
                })
                // Add toggle for normal subscriptions.
                .append(helpers.getDropdownGroup('sub-toggle', 'Срабатывание', (e.subToggle === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'],
                    'Срабатывание оповещений о первых подписках'))
                // Append message box for the message
                .append(helpers.getTextAreaGroup('sub-msg', 'text', 'Cообщение', '', e.subMessage,
                    'Embed-сообщение, уведомляющее о первой подписке', false)
                    // Append a sub-comment.
                    .append(helpers.getSubComment('Доступные теги: (name) и (plan)')))))
            // Append second collapsible accordion.
            .append(helpers.getCollapsibleAccordion('main-2', 'Прайм-подписка',  $('<form/>', {
                    'role': 'form'
                })
                // Add toggle for prime subscriptions.
                .append(helpers.getDropdownGroup('primesub-toggle', 'Срабатывание', (e.primeToggle === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'],
                    'Срабатывание оповещений о прайм-подписках'))
                // Append message box for the message
                .append(helpers.getTextAreaGroup('primesub-msg', 'text', 'Cообщение', '', e.primeMessage,
                    'Embed-сообщение, уведомляющее о прайм-подписке', false)
                    // Append a sub-comment.
                    .append(helpers.getSubComment('Доступные теги: (name) и (plan)')))))
            // Append third collapsible accordion.
            .append(helpers.getCollapsibleAccordion('main-3', 'Мультиподписка', $('<form/>', {
                    'role': 'form'
                })
                // Add toggle for resubscriptions.
                .append(helpers.getDropdownGroup('resub-toggle', 'Срабатывание', (e.resubToggle === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'],
                    'Срабатывание оповещений о повторных подписках'))
                // Append message box for the message
                .append(helpers.getTextAreaGroup('resub-msg', 'text', 'Cообщение', '', e.resubMessage,
                    'Embed-сообщение, уведомляющее о повторной подписке', false)
                    // Append a sub-comment.
                    .append(helpers.getSubComment('Доступные теги: (name), (plan) и (months)')))))
            // Append forth collapsible accordion.
            .append(helpers.getCollapsibleAccordion('main-4', 'Подписка в подарок', $('<form/>', {
                    'role': 'form'
                })
                // Add toggle for gifted subscriptions.
                .append(helpers.getDropdownGroup('gifsub-toggle', 'Срабатывание', (e.giftsubToggle === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'],
                    'Срабатывание оповещений о подписках в подарок'))
                // Append message box for the message
                .append(helpers.getTextAreaGroup('gifsub-msg', 'text', 'Cообщение', '', e.giftsubMessage,
                    'Embed-сообщение, уведомляющее о подписке в подарок', false)
                    // Append a sub-comment.
                    .append(helpers.getSubComment('Доступные теги: (name), (recipient), (plan) и (months)')))))
            // Append fifth collapsible accordion.
            .append(helpers.getCollapsibleAccordion('main-5', 'Канал на сервере', $('<form/>', {
                    'role': 'form'
                })
                // Add channel box.
                .append(helpers.getInputGroup('channel-alert', 'text', 'Канал', '#alerts', e.subChannel,
                    'Канал на сервере Discord для публикации оповещений о подписках'))))),
            function() { // Callback once the user clicks save.
                let subToggle = $('#sub-toggle').find(':selected').text() === 'Да',
                    subMsg = $('#sub-msg'),
                    primeSubToggle = $('#primesub-toggle').find(':selected').text() === 'Да',
                    primeSubMsg = $('#primesub-msg'),
                    reSubToggle = $('#resub-toggle').find(':selected').text() === 'Да',
                    reSubMsg = $('#resub-msg'),
                    gifSubToggle = $('#gifsub-toggle').find(':selected').text() === 'Да',
                    gifSubMsg = $('#gifsub-msg'),
                    subChannel = $('#channel-alert'),
                    gifSubReward = $('#gifsub-reward');

                // Make sure the user has someone in each box.
                switch (false) {
                    case helpers.handleInputString(subMsg):
                    case helpers.handleInputString(primeSubMsg):
                    case helpers.handleInputString(reSubMsg):
                    case helpers.handleInputString(gifSubMsg):
                        break;
                    default:
                        socket.updateDBValues('discord_alerts_subscribe_update_settings', {
                            tables: ['discordSettings', 'discordSettings', 'discordSettings', 'discordSettings', 'discordSettings', 'discordSettings', 'discordSettings', 'discordSettings', 'discordSettings'],
                            keys: ['subMessage', 'primeMessage', 'resubMessage', 'giftsubMessage', 'subToggle', 'primeToggle', 'resubToggle', 'giftsubToggle', 'subChannel'],
                            values: [subMsg.val(), primeSubMsg.val(), reSubMsg.val(), gifSubMsg.val(), subToggle, primeSubToggle, reSubToggle, gifSubToggle, subChannel.val()]
                        }, function() {
                            socket.wsEvent('discord', './discord/handlers/subscribeHandler.js', '', [], function() {
                                // Close the modal.
                                $('#subscribe-alert').modal('toggle');
                                // Alert the user.
                                toastr.success('Настройки оповещений о подписках успешно обновлены');
                            });
                        });
                }
            }).modal('toggle');
        });
    });

    // Host settings button.
    $('#discordHostHandlerSettings').on('click', function() {
        socket.getDBValues('alerts_get_host_settings', {
            tables: ['discordSettings', 'discordSettings', 'discordSettings', 'discordSettings'],
            keys: ['hostToggle', 'hostMessage', 'autohostMessage', 'hostChannel']
        }, true, function(e) {
            helpers.getModal('host-alert', 'Настройки оповещений о хостах', 'Сохранить', $('<form/>', {
                'role': 'form'
            })
            // Add the div for the col boxes.
            .append($('<div/>', {
                'class': 'panel-group',
                'id': 'accordion'
            })
            // Add the toggle for host alerts.
            .append(helpers.getDropdownGroup('host-toggle', 'Срабатывание', (e.hostToggle === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'],
                'Срабатывание оповещений о хостах'))
            // Add the the text area for the host message.
            .append(helpers.getTextAreaGroup('host-message', 'text', 'Сообщение о хосте', '', e.hostMessage,
                'Embed-сообщение, уведомляющее о хосте', false)
                // Append a sub-comment.
                .append(helpers.getSubComment('Доступные теги: (name) и (viewers)')))
            // Add the the text area for the auto host message.
            .append(helpers.getTextAreaGroup('auto-host-message', 'text', 'Сообщение об автохосте', '', e.autohostMessage,
                'Embed-сообщение, уведомляющее об автохосте', false)
                // Append a sub-comment.
                .append(helpers.getSubComment('Доступные теги: (name) и (viewers)')))
            // Add the the box for the reward.
            .append(helpers.getInputGroup('host-channel', 'text', 'Канал', '#alerts', e.hostChannel,
                'Канал на сервере Discord для публикации оповещений о хостах'))),
            function() { // Callback once the user clicks save.
                let hostToggle = $('#host-toggle').find(':selected').text() === 'Да',
                    hostMsg = $('#host-message'),
                    autoHostMsg = $('#auto-host-message'),
                    hostChannel = $('#host-channel');

                // Make sure the user has someone in each box.
                switch (false) {
                    case helpers.handleInputString(hostMsg):
                    case helpers.handleInputString(autoHostMsg):
                        break;
                    default:
                        socket.updateDBValues('alerts_update_host_settings', {
                            tables: ['discordSettings', 'discordSettings', 'discordSettings', 'discordSettings'],
                            keys: ['hostToggle', 'hostMessage', 'autohostMessage', 'hostChannel'],
                            values: [hostToggle, hostMsg.val(), autoHostMsg.val(), hostChannel.val()]
                        }, function() {
                            socket.wsEvent('discord', './discord/handlers/hostHandler.js', '', [], function() {
                                // Close the modal.
                                $('#host-alert').modal('toggle');
                                // Alert the user.
                                toastr.success('Настройки оповещений о хостах успешно обновлены');
                            });
                        });
                }

            }).modal('toggle');
        });
    });

    // Bits settings.
    $('#discordBitsHandlerSettings').on('click', function() {
    	socket.getDBValues('discord_alerts_get_bits_settings', {
            tables: ['discordSettings', 'discordSettings', 'discordSettings'],
            keys: ['bitsToggle', 'bitsMessage', 'bitsChannel']
        }, true, function(e) {
            helpers.getModal('bits-alert', 'Настройки оповещений о битах', 'Сохранить', $('<form/>', {
                'role': 'form'
            })
            // Add the toggle for bits alerts.
            .append(helpers.getDropdownGroup('bits-toggle', 'Срабатывание', (e.bitsToggle === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'],
                'Срабатывание оповещений о битах'))
            // Add the the text area for the bits message.
            .append(helpers.getTextAreaGroup('bits-message', 'text', 'Cообщение', '', e.bitsMessage,
                'Embed-сообщение, уведомляющее о битах', false)
                // Append a sub-comment.
                .append(helpers.getSubComment('Доступные теги: (name), (message) и (amount)')))
            // Add the box for the reward.
            .append(helpers.getInputGroup('bits-channel', 'text', 'Канал', '#alerts', e.bitsChannel,
             	'Канал на сервере Discord для публикации оповещений о битах')),
            function() { // Callback once the user clicks save.
                let bitsToggle = $('#bits-toggle').find(':selected').text() === 'Да',
                    bitsMsg = $('#bits-message'),
                    bitsChan = $('#bits-channel');

                // Make sure the user has someone in each box.
                switch (false) {
                    case helpers.handleInputString(bitsMsg):
                        break;
                    default:
                        socket.updateDBValues('alerts_update_bits_settings', {
                            tables: ['discordSettings', 'discordSettings', 'discordSettings'],
            				keys: ['bitsToggle', 'bitsMessage', 'bitsChannel'],
                            values: [bitsToggle, bitsMsg.val(), bitsChan.val()]
                        }, function() {
                            socket.wsEvent('discord', './discord/handlers/bitsHandler.js', '', [], function() {
                                // Close the modal.
                                $('#bits-alert').modal('toggle');
                                // Alert the user.
                                toastr.success('Настройки оповещений о битах успешно обновлены');
                            });
                        });
                }
            }).modal('toggle');
        });
    });

    // Clips handler.
    $('#discordClipHandlerSettings').on('click', function() {
    	socket.getDBValues('alerts_get_clip_settings', {
            tables: ['discordSettings', 'discordSettings', 'discordSettings'],
            keys: ['clipsToggle', 'clipsMessage', 'clipsChannel']
        }, true, function(e) {
            helpers.getModal('clip-alert', 'Настройки оповещений о клипах', 'Сохранить', $('<form/>', {
                'role': 'form'
            })
            // Add the toggle for clip alerts.
            .append(helpers.getDropdownGroup('clip-toggle', 'Срабатывание', (e.clipsToggle === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'],
                'Срабатывание оповещений о создании клипов'))
            // Add the text area for the clips message.
            .append(helpers.getTextAreaGroup('clip-message', 'text', 'Сообщение', '', e.clipsMessage,
                'Сообщение, уведомляющее о создании клипа (embed-сообщение при использовании тега (embedurl))', false)
                // Append a sub-comment.
                .append(helpers.getSubComment('Доступные теги: (name), (url) и (embedurl)')))
            // Add the text area for the clips channel.
            .append(helpers.getInputGroup('clip-channel', 'text', 'Канал', '#alerts', e.clipsChannel,
                'Канал на сервере Discord для публикации оповещений о клипах'))
            // Append a note.
            .append(helpers.getNote('Примечание: при превышении 100 клипов за последние сутки оповещения приостанавливаются')),
            function() { // Callback once the user clicks save.
                let clipToggle = $('#clip-toggle').find(':selected').text() === 'Да',
                    clipMsg = $('#clip-message'),
                    clipsChan = $('#clip-channel');

                // Make sure the user has someone in each box.
                switch (false) {
                    case helpers.handleInputString(clipMsg):
                        break;
                    default:
                        socket.updateDBValues('alerts_update_clip_settings', {
                            tables: ['discordSettings', 'discordSettings', 'discordSettings'],
            				keys: ['clipsToggle', 'clipsMessage', 'clipsChannel'],
                            values: [clipToggle, clipMsg.val(), clipsChan.val()]
                        }, function() {
                            socket.wsEvent('discord', './discord/handlers/clipHandler.js', '', [], function() {
                                // Close the modal.
                                $('#clip-alert').modal('toggle');
                                // Alert the user.
                                toastr.success('Настройки оповещений о клипах успешно обновлены');
                            });
                        });
                }
            }).modal('toggle');
        });
    });

    // Stream Alert settings.
    $('#discordStreamHandlerSettings').on('click', function() {
        socket.getDBValues('alerts_get_stream_settings', {
            tables: ['discordSettings', 'discordSettings', 'discordSettings', 'discordSettings',
                    'discordSettings', 'discordSettings', 'discordSettings', 'discordSettings'],
            keys: ['onlineToggle', 'onlineMessage', 'offlineToggle', 'offlineMessage', 'gameToggle',
                'gameMessage', 'botGameToggle', 'onlineChannel']
        }, true, function(e) {
            helpers.getModal('stream-alert', 'Настройки оповещений о стримах', 'Сохранить', $('<form/>', {
                'role': 'form'
            })
            // Add the div for the col boxes.
            .append($('<div/>', {
                'class': 'panel-group',
                'id': 'accordion'
            })
            // Append first collapsible accordion.
            .append(helpers.getCollapsibleAccordion('main-1', 'Начало стрима', $('<form/>', {
                    'role': 'form'
                })
            	// Add the toggle for onine alerts.
            	.append(helpers.getDropdownGroup('online-toggle', 'Срабатывание', (e.onlineToggle === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'],
                	'Срабатывание оповещений о начале стримов в Twitch'))
            	// Add the toggle for one alerts.
            	.append(helpers.getDropdownGroup('online-status', 'Статус бота', (e.botGameToggle === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'],
                	'Установка соответствующего статуса бота в Discord во время стримов'))
            	// Add the text area for the online message.
            	.append(helpers.getTextAreaGroup('online-message', 'text', 'Cообщение', '', e.onlineMessage,
                	'Embed-сообщение о начале стрима в Twitch', false)
                	// Append a sub-comment.
                	.append(helpers.getSubComment('Доступные теги: (name) \/ Подсказка: можно использовать упоминания @here и @everyone')))))
            // Append second collapsible accordion.
            .append(helpers.getCollapsibleAccordion('main-2', 'Завершение стрима', $('<form/>', {
                    'role': 'form'
                })
            	// Add the toggle for offline alerts.
            	.append(helpers.getDropdownGroup('offline-toggle', 'Срабатывание', (e.offlineToggle === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'],
                	'Срабатывание оповещений о завершении стримов в Twitch'))
            	// Add the text area for the offline message.
            	.append(helpers.getTextAreaGroup('offline-message', 'text', 'Cообщение', '', e.offlineMessage,
                	'Embed-сообщение о завершении стрима в Twitch', false)
                	// Append a sub-comment.
                	.append(helpers.getSubComment('Доступные теги: (name)')))))
            // Append third collapsible accordion.
            .append(helpers.getCollapsibleAccordion('main-3', 'Смена игры', $('<form/>', {
                    'role': 'form'
                })
            	// Add the toggle for offline alerts.
            	.append(helpers.getDropdownGroup('game-toggle', 'Срабатывание', (e.gameToggle === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'],
                	'Срабатывание оповещений о смене игры на стриме в Twitch'))
            	// Add the text area for the offline message.
            	.append(helpers.getTextAreaGroup('game-message', 'text', 'Cообщение', '', e.gameMessage,
                	'Embed-сообщение о смене игры на стриме в Twitch', false)
                	// Append a sub-comment.
                	.append(helpers.getSubComment('Доступные теги: (name)')))))
            // Append forth collapsible accordion.
            .append(helpers.getCollapsibleAccordion('main-4', 'Канал на сервере', $('<form/>', {
                    'role': 'form'
                })
                // Add channel box.
                .append(helpers.getInputGroup('channel-alert', 'text', 'Канал', '#alerts', e.onlineChannel,
                    'Канал на сервере Discord для публикации оповещений о стримах'))))),
            function() {
            	let onlineToggle = $('#online-toggle').find(':selected').text() === 'Да',
            		statusToggle = $('#online-status').find(':selected').text() === 'Да',
            		onlineMessage = $('#online-message'),
            		offlineToggle = $('#offline-toggle').find(':selected').text() === 'Да',
            		offlineMessage = $('#offline-message'),
            		gameToggle = $('#game-toggle').find(':selected').text() === 'Да',
            		gameMessage = $('#game-message'),
            		channel = $('#channel-alert');

            	switch (false) {
            		case helpers.handleInputString(onlineMessage):
            		case helpers.handleInputString(offlineMessage):
            		case helpers.handleInputString(gameMessage):
            			break;
            		default:
            			socket.updateDBValues('discord_stream_alerts_updater', {
            				tables: ['discordSettings', 'discordSettings', 'discordSettings', 'discordSettings',
                    				'discordSettings', 'discordSettings', 'discordSettings', 'discordSettings'],
            				keys: ['onlineToggle', 'onlineMessage', 'offlineToggle', 'offlineMessage', 'gameToggle',
                				'gameMessage', 'botGameToggle', 'onlineChannel'],
            				values: [onlineToggle, onlineMessage.val(), offlineToggle, offlineMessage.val(),
            						gameToggle, gameMessage.val(), statusToggle, channel.val()]
            			}, function() {
            				socket.wsEvent('discord', './discord/handlers/streamHandler.js', '', [], function() {
                                // Close the modal.
                                $('#stream-alert').modal('toggle');
                                // Alert the user.
                                toastr.success('Настройки оповещений о стримах успешно обновлены');
                            });
            			});
            	}
            }).modal('toggle');
        });
    });

	// Greetings alerts.
	$('#discordGreetingsSystemSettings').on('click', function() {
        socket.getDBValues('alerts_get_greetings_settings', {
            tables: ['discordSettings', 'discordSettings', 'discordSettings', 'discordSettings',
                    'discordSettings', 'discordSettings'],
            keys: ['joinToggle', 'partToggle', 'joinMessage', 'partMessage', 'greetingsChannel',
                'greetingsDefaultGroup']
        }, true, function(e) {
            helpers.getModal('greeting-alert', 'Настройки оповещений о посещениях', 'Сохранить', $('<form/>', {
                'role': 'form'
            })
            // Add the div for the col boxes.
            .append($('<div/>', {
                'class': 'panel-group',
                'id': 'accordion'
            })
            // Append first collapsible accordion.
            .append(helpers.getCollapsibleAccordion('main-1', 'Вход на сервер', $('<form/>', {
                    'role': 'form'
                })
                // Add the toggle for alert
                .append(helpers.getDropdownGroup('join-toggle', 'Срабатывание', (e.joinToggle === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'],
                    'Срабатывание оповещений о входе на сервер Discord'))
                // Add a box for the join role.
                .append(helpers.getInputGroup('join-role', 'text', 'Роль', 'Новичок', e.greetingsDefaultGroup,
                    'Роль, назначаемая по умолчанию всем входящим на сервер Discord (если поле незаполнено, то роль не назначается)'))
                // Add the text area for the message.
                .append(helpers.getTextAreaGroup('join-message', 'text', 'Сообщение', '', e.joinMessage,
                    'Сообщение, уведомляющее о входе на сервер Discord', false)
                	// Append a sub-comment.
                	.append(helpers.getSubComment('Доступные теги: (name) и (@name)')))))
            // Append second collapsible accordion.
            .append(helpers.getCollapsibleAccordion('main-2', 'Выход с сервера', $('<form/>', {
                    'role': 'form'
                })
                // Add the toggle for part alerts.
                .append(helpers.getDropdownGroup('part-toggle', 'Срабатывание', (e.partToggle === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'],
                    'Срабатывание оповещений о выходе с сервера Discord'))
                // Add the text area for the part message.
                .append(helpers.getTextAreaGroup('part-message', 'text', 'Сообщение', '', e.partMessage,
                    'Сообщение, уведомляющее о выходе с сервера Discord', false)
                	// Append a sub-comment.
                	.append(helpers.getSubComment('Доступные теги: (name) и (@name)')))))
            // Append third collapsible accordion.
            .append(helpers.getCollapsibleAccordion('main-3', 'Канал на сервере', $('<form/>', {
                    'role': 'form'
                })
                // Add channel box.
                .append(helpers.getInputGroup('channel-alert', 'text', 'Канал', '#alerts', e.greetingsChannel,
                    'Канал на сервере Discord для публикации оповещений о посещениях'))))),
            function() {
                let joinToggle = $('#join-toggle').find(':selected').text() === 'Да',
                    partToggle = $('#part-toggle').find(':selected').text() === 'Да',
                    partMessage = $('#part-message'),
                    joinMessage = $('#join-message'),
                    joinRole = $('#join-role'),
                    channel = $('#channel-alert');

                switch (false) {
                    case helpers.handleInputString(joinMessage):
                    case helpers.handleInputString(partMessage):
                    case helpers.handleInputString(channel):
                        break;
                    default:
                        socket.updateDBValues('discord_greetings_alerts_updater', {
                            tables: ['discordSettings', 'discordSettings', 'discordSettings', 'discordSettings',
                                'discordSettings', 'discordSettings'],
                            keys: ['joinToggle', 'partToggle', 'joinMessage', 'partMessage', 'greetingsChannel',
                                'greetingsDefaultGroup'],
                            values: [joinToggle, partToggle, joinMessage.val(), partMessage.val(),
                                    channel.val(), joinRole.val()]
                        }, function() {
                            socket.wsEvent('discord', './discord/systems/greetingsSystem.js', '', [], function() {
                                // Close the modal.
                                $('#greeting-alert').modal('toggle');
                                // Alert the user.
                                toastr.success('Настройки оповещений о посещениях сервера Discord успешно обновлены');
                            });
                        });
                }
            }).modal('toggle');
        });
	});

    // Streamlabs settings.
    $('#discordStreamlabsHandlerSettings').on('click', function() {
        socket.getDBValues('discord_alerts_streamlabs_get_settings', {
            tables: ['discordSettings', 'discordSettings', 'discordSettings'],
            keys: ['streamlabsToggle', 'streamlabsMessage', 'streamlabsChannel']
        }, true, function(e) {
            helpers.getModal('streamlabs-alert', 'Настройки оповещений о донатах Streamlabs', 'Сохранить', $('<form/>', {
                'role': 'form'
            })
            // Add the toggle for follow alerts.
            .append(helpers.getDropdownGroup('streamlabs-toggle', 'Срабатывание', (e.streamlabsToggle === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'],
                'Срабатывание оповещений о донатах через Streamlabs'))
            // Add the the text area for the follow message.
            .append(helpers.getTextAreaGroup('streamlabs-message', 'text', 'Cообщение', '', e.streamlabsMessage,
                'Embed-сообщение, уведомляющее о донате через Streamlabs', false)
                // Append a sub-comment.
                .append(helpers.getSubComment('Доступные теги: (name), (amount), (currency) и (message)')))
            // Add the the box for the reward.
            .append(helpers.getInputGroup('streamlabs-channel', 'text', 'Канал', '#alerts', e.streamlabsChannel,
                'Канал на сервере Discord для публикации оповещений о донатах через Streamlabs'))
            // Append a note.
            .append(helpers.getNote('Примечание: для работы оповещений необходима интеграция с аккаунтом Streamlabs')),
            function() { // Callback once the user clicks save.
                let streamLabsToggle = $('#streamlabs-toggle').find(':selected').text() === 'Да',
                    streamLabsMessage = $('#streamlabs-message'),
                    streamLabsChannel = $('#streamlabs-channel');

                // Make sure everything has been filled it correctly.
                switch (false) {
                    case helpers.handleInputString(streamLabsMessage):
                    case helpers.handleInputString(streamLabsChannel):
                        break;
                    default:
                        // Update settings.
                        socket.updateDBValues('discord_alerts_streamlabs_update_settings', {
                            tables: ['discordSettings', 'discordSettings', 'discordSettings'],
                            keys: ['streamlabsToggle', 'streamlabsMessage', 'streamlabsChannel'],
                            values: [streamLabsToggle, streamLabsMessage.val(), streamLabsChannel.val()]
                        }, function() {
                            socket.wsEvent('discord', './discord/handlers/streamlabsHandler.js', '', [], function() {
                                // Close the modal.
                                $('#streamlabs-alert').modal('toggle');
                                // Alert the user.
                                toastr.success('Настройки оповещений о донатах через Streamlabs успешно обновлены');
                            });
                        });
                }
            }).modal('toggle');
        });
    });

    // TipeeeStream settings.
    $('#discordTipeeeStreamHandlerSettings').on('click', function() {
        socket.getDBValues('discord_alerts_tipeeestream_get_settings', {
            tables: ['discordSettings', 'discordSettings', 'discordSettings'],
            keys: ['tipeeestreamToggle', 'tipeeestreamMessage', 'tipeeestreamChannel']
        }, true, function(e) {
            helpers.getModal('tipeeestream-alert', 'Настройки оповещений о донатах TipeeeStream', 'Сохранить', $('<form/>', {
                'role': 'form'
            })
            // Add the toggle for follow alerts.
            .append(helpers.getDropdownGroup('tipeeestream-toggle', 'Срабатывание', (e.tipeeestreamToggle === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'],
                'Срабатывание оповещений о донатах через TipeeeStream'))
            // Add the the text area for the follow message.
            .append(helpers.getTextAreaGroup('tipeeestream-message', 'text', 'Cообщение', '', e.tipeeestreamMessage,
                'Embed-сообщение, уведомляющее о донате через TipeeeStream', false)
                // Append a sub-comment.
                .append(helpers.getSubComment('Доступные теги: (name), (amount), (currency) и (message)')))
            // Add the the box for the reward.
            .append(helpers.getInputGroup('tipeeestream-channel', 'text', 'Канал', '#alerts', e.tipeeestreamChannel,
                'Канал на сервере Discord для публикации оповещений о донатах через TipeeeStream'))
            // Append a note.
            .append(helpers.getNote('Примечание: для работы оповещений необходима интеграция с аккаунтом TipeeeStream')),
            function() { // Callback once the user clicks save.
                let tipeeeStreamToggle = $('#tipeeestream-toggle').find(':selected').text() === 'Да',
                    tipeeeStreamMessage = $('#tipeeestream-message'),
                    tipeeeStreamChannel = $('#tipeeestream-channel');

                // Make sure everything has been filled it correctly.
                switch (false) {
                    case helpers.handleInputString(tipeeeStreamMessage):
                    case helpers.handleInputString(tipeeeStreamChannel):
                        break;
                    default:
                        // Update settings.
                        socket.updateDBValues('discord_alerts_tipeeestream_update_settings', {
                            tables: ['discordSettings', 'discordSettings', 'discordSettings'],
                            keys: ['tipeeestreamToggle', 'tipeeestreamMessage', 'tipeeestreamChannel'],
                            values: [tipeeeStreamToggle, tipeeeStreamMessage.val(), tipeeeStreamChannel.val()]
                        }, function() {
                            socket.wsEvent('discord', './discord/handlers/tipeeeStreamHandler.js', '', [], function() {
                                // Close the modal.
                                $('#tipeeestream-alert').modal('toggle');
                                // Alert the user.
                                toastr.success('Настройки оповещений о донатах через TipeeeStream успешно обновлены');
                            });
                        });
                }
            }).modal('toggle');
        });
    });

    // StreamElements settings.
    $('#discordStreamElementsHandlerSettings').on('click', function() {
        socket.getDBValues('discord_alerts_streamelements_get_settings', {
            tables: ['discordSettings', 'discordSettings', 'discordSettings'],
            keys: ['streamelementsToggle', 'streamelementsMessage', 'streamelementsChannel']
        }, true, function(e) {
            helpers.getModal('streamelements-alert', 'Настройки оповещений о донатах StreamElements', 'Сохранить', $('<form/>', {
                'role': 'form'
            })
            // Add the toggle for follow alerts.
            .append(helpers.getDropdownGroup('streamelements-toggle', 'Срабатывание', (e.streamelementsToggle === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'],
                'Срабатывание оповещений о донатах через StreamElements'))
            // Add the the text area for the follow message.
            .append(helpers.getTextAreaGroup('streamelements-message', 'text', 'Cообщение', '', e.streamelementsMessage,
                'Embed-сообщение, уведомляющее о донате через StreamElements', false)
                // Append a sub-comment.
                .append(helpers.getSubComment('Доступные теги: (name), (amount), (currency) и (message)')))
            // Add the the box for the reward.
            .append(helpers.getInputGroup('streamelements-channel', 'text', 'Канал', '#alerts', e.streamelementsChannel,
                'Канал на сервере Discord для публикации оповещений о донатах через StreamElements'))
            // Append a note.
            .append(helpers.getNote('Примечание: для работы оповещений необходима интеграция с аккаунтом StreamElements')),
            function() { // Callback once the user clicks save.
                let streamElementsToggle = $('#streamelements-toggle').find(':selected').text() === 'Да',
                    streamElementsMessage = $('#streamelements-message'),
                    streamElementsChannel = $('#streamelements-channel');

                // Make sure everything has been filled it correctly.
                switch (false) {
                    case helpers.handleInputString(streamElementsMessage):
                    case helpers.handleInputString(streamElementsChannel):
                        break;
                    default:
                        // Update settings.
                        socket.updateDBValues('discord_alerts_streamelements_update_settings', {
                            tables: ['discordSettings', 'discordSettings', 'discordSettings'],
                            keys: ['streamelementsToggle', 'streamelementsMessage', 'streamelementsChannel'],
                            values: [streamElementsToggle, streamElementsMessage.val(), streamElementsChannel.val()]
                        }, function() {
                            socket.wsEvent('discord', './discord/handlers/streamElementsHandler.js', '', [], function() {
                                // Close the modal.
                                $('#streamelements-alert').modal('toggle');
                                // Alert the user.
                                toastr.success('Настройки оповещений о донатах через StreamElements успешно обновлены');
                            });
                        });
                }
            }).modal('toggle');
        });
    });

    // Twitter settings.
    $('#discordTwitterHandlerSettings').on('click', function() {
        socket.getDBValues('discord_alerts_twitter_get_settings', {
            tables: ['discordSettings', 'discordSettings'],
            keys: ['twitterToggle', 'twitterChannel']
        }, true, function(e) {
            helpers.getModal('twitter-alert', 'Настройки оповещений Twitter', 'Сохранить', $('<form/>', {
                'role': 'form'
            })
            // Add the toggle for follow alerts.
            .append(helpers.getDropdownGroup('twitter-toggle', 'Срабатывание', (e.twitterToggle === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'],
                'Срабатывание оповещений Twitter'))
            // Add the the box for the reward.
            .append(helpers.getInputGroup('twitter-channel', 'text', 'Канал', '#alerts', e.twitterChannel,
                'Канал на сервере Discord для публикации оповещений Twitter'))
            // Append a note.
            .append(helpers.getNote('Примечание: для работы оповещений необходима интеграция с аккаунтом Twitter')),
            function() { // Callback once the user clicks save.
                let twitterToggle = $('#twitter-toggle').find(':selected').text() === 'Да',
                    twitterChannel = $('#twitter-channel');

                // Make sure everything has been filled it correctly.
                switch (false) {
                    case helpers.handleInputString(twitterChannel):
                        break;
                    default:
                        // Update settings.
                        socket.updateDBValues('discord_alerts_twitter_update_settings', {
                            tables: ['discordSettings', 'discordSettings'],
                            keys: ['twitterToggle', 'twitterChannel'],
                            values: [twitterToggle, twitterChannel.val()]
                        }, function() {
                            socket.wsEvent('discord', './discord/handlers/twitterHandler.js', '', [], function() {
                                // Close the modal.
                                $('#twitter-alert').modal('toggle');
                                // Alert the user.
                                toastr.success('Настройки оповещений Twitter успешно обновлены');
                            });
                        });
                }
            }).modal('toggle');
        });
    });
});
