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
    // Get all module toggles.
    socket.getDBValues('alerts_get_modules', {
        tables: ['modules', 'modules', 'modules', 'modules', 'modules', 'modules', 'modules', 'modules', 'modules', 'modules', 'modules'],
        keys: ['./handlers/followHandler.js', './handlers/subscribeHandler.js', './handlers/hostHandler.js', './handlers/bitsHandler.js', './handlers/clipHandler.js',
                './systems/greetingSystem.js', './handlers/donationHandler.js', './handlers/raidHandler.js', './handlers/tipeeeStreamHandler.js',
                './handlers/streamElementsHandler.js', './handlers/twitterHandler.js']
    }, true, function(e) {
        // Handle the settings button.
        let keys = Object.keys(e),
            module = '',
            i;

        for (i = 0; i < keys.length; i++) {
            // Handle the status of the buttons.
            if (e[keys[i]] === 'false') {
                module = keys[i].substring(keys[i].lastIndexOf('/') + 1).replace('.js', '');

                // Handle the switch.
                $('#' + module + 'Toggle').prop('checked', false);
                // Handle the settings button.
                $('#' + module + 'Settings').prop('disabled', true);
            }
        }
    });
});

// Function that handlers the loading of events.
$(function() {
    // Toggle for the alert modules.
    $('[data-alert-toggle]').on('change', function() {
        let name = $(this).attr('id'),
            checked = $(this).is(':checked');

        // Handle the module.
        socket.sendCommandSync('alerts_module_toggle', 'module ' + (checked ? 'enablesilent' : 'disablesilent') + ' ' + $(this).data('alert-toggle'), function() {
            // Toggle the settings button.
            $('#' + name.replace('Toggle', 'Settings')).prop('disabled', !checked);
            // Alert the user.
            toastr.success('Модуль успешно ' + (checked ? 'включен' : 'выключен'));
        });
    });

    // Follow handler settings.
    $('#followHandlerSettings').on('click', function() {
        socket.getDBValues('alerts_follow_get_settings', {
            tables: ['settings', 'settings', 'settings', 'settings'],
            keys: ['followToggle', 'followReward', 'followMessage', 'followDelay']
        }, true, function(e) {
            helpers.getModal('follow-alert', 'Настройки оповещений о фолловинге', 'Сохранить', $('<form/>', {
                'role': 'form'
            })
            // Add the toggle for follow alerts.
            .append(helpers.getDropdownGroup('follow-toggle', 'Срабатывание', (e.followToggle === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'],
                'Срабатывание оповещений о фолловинге и начисление вознаграждений'))
            // Add the the text area for the follow message.
            .append(helpers.getTextAreaGroup('follow-message', 'text', 'Сообщение', '', e.followMessage,
                'Сообщение, уведомляющее о фолловинге', false)
                // Append a sub-comment.
                .append(helpers.getSubComment('Доступные теги: (name) и (reward)')))
            // Add the the box for the reward.
            .append(helpers.getInputGroup('follow-reward', 'number', 'Вознаграждение', '', e.followReward,
                'Вознаграждение за фолловинг, в поинтах'))
            // Add the the box for the reward
            .append(helpers.getInputGroup('follow-delay', 'number', 'Интервал', '', e.followDelay,
                'Интервал между оповещениями, в секундах')),
            function() { // Callback once the user clicks save.
                let followToggle = $('#follow-toggle').find(':selected').text() === 'Да',
                    followMessage = $('#follow-message'),
                    followReward = $('#follow-reward'),
                    followDelay = $('#follow-delay');

                // Make sure everything has been filled it correctly.
                switch (false) {
                    case helpers.handleInputString(followMessage):
                    case helpers.handleInputNumber(followReward, 0):
                    case helpers.handleInputNumber(followDelay, 5):
                        break;
                    default:
                        // Update settings.
                        socket.updateDBValues('alerts_follow_update_settings', {
                            tables: ['settings', 'settings', 'settings', 'settings',],
                            keys: ['followToggle', 'followReward', 'followMessage', 'followDelay'],
                            values: [followToggle, followReward.val(), followMessage.val(), followDelay.val()]
                        }, function() {
                            socket.sendCommand('alerts_follow_update_settings_cmd', 'followerpanelupdate', function() {
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

    // Subscribe handler settings.
    $('#subscribeHandlerSettings').on('click', function() {
        socket.getDBValues('alerts_subscribe_get_settings', {
            tables: ['subscribeHandler', 'subscribeHandler', 'subscribeHandler', 'subscribeHandler', 'subscribeHandler', 'subscribeHandler', 'subscribeHandler', 'subscribeHandler',
                    'subscribeHandler', 'subscribeHandler', 'subscribeHandler', 'subscribeHandler', 'subscribeHandler', 'subscribeHandler', 'subscribeHandler', 'subscribeHandler',
                    'subscribeHandler', 'subscribeHandler', 'subscribeHandler', 'subscribeHandler', 'subscribeHandler', 'subscribeHandler'],
            keys: ['subscribeMessage', 'primeSubscribeMessage', 'reSubscribeMessage', 'giftSubMessage', 'subscriberWelcomeToggle', 'primeSubscriberWelcomeToggle',
                    'reSubscriberWelcomeToggle', 'giftSubWelcomeToggle', 'subscribeReward', 'reSubscribeReward', 'giftSubReward', 'resubEmote', 'subPlan1000', 'subPlan2000', 'subPlan3000',
                    'massGiftSubWelcomeToggle', 'massGiftSubMessage', 'massGiftSubReward', 'giftAnonSubMessage', 'massAnonGiftSubMessage', 'giftAnonSubWelcomeToggle', 'massAnonGiftSubWelcomeToggle']
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
                .append(helpers.getDropdownGroup('sub-toggle', 'Срабатывание', (e.subscriberWelcomeToggle === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'],
                    'Срабатывание оповещений о первых подписках и начисление вознаграждений'))
                // Append message box for the message
                .append(helpers.getTextAreaGroup('sub-msg', 'text', 'Сообщение', '', e.subscribeMessage,
                    'Сообщение, уведомляющее о первой подписке', false)
                    // Append a sub-comment.
                    .append(helpers.getSubComment('Доступные теги: (name), (plan) и (reward)')))
                // Appen the reward box
                .append(helpers.getInputGroup('sub-reward', 'number', 'Вознаграждение', '', e.subscribeReward,
                    'Вознаграждение за подписку, в том числе прайм и принятой в подарок'))))
            // Append second collapsible accordion.
            .append(helpers.getCollapsibleAccordion('main-2', 'Прайм-подписка',  $('<form/>', {
                    'role': 'form'
                })
                // Add toggle for prime subscriptions.
                .append(helpers.getDropdownGroup('primesub-toggle', 'Срабатывание', (e.primeSubscriberWelcomeToggle === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'],
                    'Срабатывание оповещений о прайм-подписках и начисление вознаграждений'))
                // Append message box for the message
                .append(helpers.getTextAreaGroup('primesub-msg', 'text', 'Сообщение', '', e.primeSubscribeMessage,
                    'Сообщение, уведомляющее о прайм-подписке', false)
                    // Append a sub-comment.
                    .append(helpers.getSubComment('Доступные теги: (name), (plan) и (reward)')))))
            // Append third collapsible accordion.
            .append(helpers.getCollapsibleAccordion('main-3', 'Мультиподписка', $('<form/>', {
                    'role': 'form'
                })
                // Add toggle for resubscriptions.
                .append(helpers.getDropdownGroup('resub-toggle', 'Срабатывание', (e.reSubscriberWelcomeToggle === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'],
                    'Срабатывание оповещений о повторных подписках и начисление вознаграждений'))
                // Append message box for the message
                .append(helpers.getTextAreaGroup('resub-msg', 'text', 'Сообщение', '', e.reSubscribeMessage,
                    'Сообщение, уведомляющее о повторной подписке', false)
                    // Append a sub-comment.
                    .append(helpers.getSubComment('Доступные теги: (name), (plan), (months), (customemote) и (reward)')))
                // Appen the reward box
                .append(helpers.getInputGroup('resub-reward', 'number', 'Вознаграждение', '', e.reSubscribeReward,
                    'Вознаграждение за повторную подписку'))
                // Appen the emotes box
                .append(helpers.getInputGroup('resub-emote', 'text', 'Смайл', '', e.resubEmote,
                    'Смайл, заменяющий тег (customemote) в количестве, равном числу подписок подряд'))))
            // Append forth collapsible accordion.
            .append(helpers.getCollapsibleAccordion('main-4', 'Подписка в подарок', $('<form/>', {
                    'role': 'form'
                })
                // Add toggle for gifted subscriptions.
                .append(helpers.getDropdownGroup('gifsub-toggle', 'Срабатывание', (e.giftSubWelcomeToggle === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'],
                    'Срабатывание оповещений о подписках в подарок и начисление вознаграждений'))
                // Append message box for the message
                .append(helpers.getTextAreaGroup('gifsub-msg', 'text', 'Сообщение', '', e.giftSubMessage,
                    'Сообщение, уведомляющее о подписке в подарок', false)
                    // Append a sub-comment.
                    .append(helpers.getSubComment('Доступные теги: (name), (recipient), (plan), (months) и (reward)')))
                // Append the reward box
                .append(helpers.getInputGroup('gifsub-reward', 'number', 'Вознаграждение', '', e.giftSubReward,
                    'Вознаграждение за дарение подписки'))))
            // Append fifth collapsible accordion.
            .append(helpers.getCollapsibleAccordion('main-5', 'Массовая подписка в подарок', $('<form/>', {
                    'role': 'form'
                })
                // Add toggle for gifted subscriptions.
                .append(helpers.getDropdownGroup('mass-gifsub-toggle', 'Срабатывание', (e.massGiftSubWelcomeToggle === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'],
                    'Срабатывание оповещений о массовых подписках в подарок и начисление вознаграждений'))
                // Append message box for the message
                .append(helpers.getTextAreaGroup('mass-gifsub-msg', 'text', 'Сообщение', '', e.massGiftSubMessage,
                    'Сообщение, уведомляющее о массовой подписке в подарок', false)
                    // Append a sub-comment.
                    .append(helpers.getSubComment('Доступные теги: (name), (amount) и (reward)')))
                // Appen the reward box
                .append(helpers.getInputGroup('mass-gifsub-reward', 'number', 'Вознаграждение', '', e.massGiftSubReward,
                    'Вознаграждение дарителю подписок (за каждую подписку)'))))
            // Append sixth collapsible accordion.
            .append(helpers.getCollapsibleAccordion('main-6', 'Анонимная подписка в подарок', $('<form/>', {
                    'role': 'form'
                })
                // Add toggle for gifted subscriptions.
                .append(helpers.getDropdownGroup('anon-gifsub-toggle', 'Срабатывание', (e.giftAnonSubWelcomeToggle === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'],
                    'Срабатывание оповещений об анонимных подписках в подарок и начисление вознаграждений'))
                // Append message box for the message
                .append(helpers.getTextAreaGroup('anon-gifsub-msg', 'text', 'Сообщение', '', e.giftAnonSubMessage,
                    'Сообщение, уведомляющее об анонимной подписке в подарок', false)
                    // Append a sub-comment.
                    .append(helpers.getSubComment('Доступные теги: (name), (plan), (amount) и (reward)')))
                // Appen the reward box
                .append(helpers.getInputGroup('anon-gifsub-reward', 'number', 'Anonymous Gift Subscription Reward', '', e.subscribeReward,
                    'Вознаграждение адресату дарения подписки', true))))
            // Append seventh collapsible accordion.
            .append(helpers.getCollapsibleAccordion('main-7', 'Массовая анонимная подписка в подарок', $('<form/>', {
                    'role': 'form'
                })
                // Add toggle for gifted subscriptions.
                .append(helpers.getDropdownGroup('anon-mass-gifsub-toggle', 'Срабатывание', (e.massAnonGiftSubWelcomeToggle === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'],
                    'Срабатывание оповещений о массовых анонимных подписках в подарок и начисление вознаграждений'))
                // Append message box for the message
                .append(helpers.getTextAreaGroup('anon-mass-gifsub-msg', 'text', 'Сообщение', '', e.massAnonGiftSubMessage,
                    'Сообщение, уведомляющее о массовой анонимной подписке в подарок', false)
                    // Append a sub-comment.
                    .append(helpers.getSubComment('Доступные теги: (name) и (amount)')))))
            // Tier settings
            .append(helpers.getCollapsibleAccordion('main-8', 'Планы подписок', $('<form/>', {
                    'role': 'form'
                })
                // Append first sub plan name
                .append(helpers.getInputGroup('sub-1000', 'text', 'Название плана подписки №1', '', e.subPlan1000, 'Название первого плана подписки'))
                // Append first sub plan name
                .append(helpers.getInputGroup('sub-2000', 'text', 'Название плана подписки №2', '', e.subPlan2000, 'Название второго плана подписки'))
                // Append first sub plan name
                .append(helpers.getInputGroup('sub-3000', 'text', 'Название плана подписки №3', '', e.subPlan3000, 'Название третьего плана подписки'))))),
            function() { // Callback once the user clicks save.
                let subToggle = $('#sub-toggle').find(':selected').text() === 'Да',
                    subMsg = $('#sub-msg'),
                    subReward = $('#sub-reward'),
                    primeSubToggle = $('#primesub-toggle').find(':selected').text() === 'Да',
                    primeSubMsg = $('#primesub-msg'),
                    reSubToggle = $('#resub-toggle').find(':selected').text() === 'Да',
                    reSubMsg = $('#resub-msg'),
                    reSubReward = $('#resub-reward'),
                    reSubEmote = $('#resub-emote'),
                    gifSubToggle = $('#gifsub-toggle').find(':selected').text() === 'Да',
                    gifSubMsg = $('#gifsub-msg'),
                    anonGifSubToggle = $('#anon-gifsub-toggle').find(':selected').text() === 'Да',
                    anonGifSubMsg = $('#anon-gifsub-msg'),
                    gifSubReward = $('#gifsub-reward'),
                    massGiftSubToggle = $('#mass-gifsub-toggle').find(':selected').text() === 'Да',
                    massGiftSubMsg = $('#mass-gifsub-msg'),
                    anonMassGiftSubToggle = $('#anon-mass-gifsub-toggle').find(':selected').text() === 'Да',
                    anonMassGiftSubMsg = $('#anon-mass-gifsub-msg'),
                    massGiftSubReward = $('#mass-gifsub-reward'),
                    tierOne = $('#sub-1000'),
                    tierTwo = $('#sub-2000'),
                    tierThree = $('#sub-3000');

                // Make sure the user has someone in each box.
                switch (false) {
                    case helpers.handleInputString(subMsg):
                    case helpers.handleInputNumber(subReward, 0):
                    case helpers.handleInputString(primeSubMsg):
                    case helpers.handleInputString(reSubMsg):
                    case helpers.handleInputNumber(reSubReward, 0):
                    case helpers.handleInputString(gifSubMsg):
                    case helpers.handleInputString(anonGifSubMsg):
                    case helpers.handleInputNumber(gifSubReward, 0):
                    case helpers.handleInputString(massGiftSubMsg):
                    case helpers.handleInputString(anonMassGiftSubMsg):
                    case helpers.handleInputNumber(massGiftSubReward, 0):
                    case helpers.handleInputString(tierOne):
                    case helpers.handleInputString(tierTwo):
                    case helpers.handleInputString(tierThree):
                        break;
                    default:
                        socket.updateDBValues('alerts_subscribe_update_settings', {
                            tables: ['subscribeHandler', 'subscribeHandler', 'subscribeHandler', 'subscribeHandler', 'subscribeHandler', 'subscribeHandler', 'subscribeHandler', 'subscribeHandler',
                    				'subscribeHandler', 'subscribeHandler', 'subscribeHandler', 'subscribeHandler', 'subscribeHandler', 'subscribeHandler', 'subscribeHandler', 'subscribeHandler',
                    				'subscribeHandler', 'subscribeHandler', 'subscribeHandler', 'subscribeHandler', 'subscribeHandler', 'subscribeHandler'],
            				keys: ['subscribeMessage', 'primeSubscribeMessage', 'reSubscribeMessage', 'giftSubMessage', 'subscriberWelcomeToggle', 'primeSubscriberWelcomeToggle',
                    				'reSubscriberWelcomeToggle', 'giftSubWelcomeToggle', 'subscribeReward', 'reSubscribeReward', 'giftSubReward', 'resubEmote', 'subPlan1000', 'subPlan2000', 'subPlan3000',
                    				'massGiftSubWelcomeToggle', 'massGiftSubMessage', 'massGiftSubReward', 'giftAnonSubMessage', 'massAnonGiftSubMessage', 'giftAnonSubWelcomeToggle', 'massAnonGiftSubWelcomeToggle'],
                            values: [subMsg.val(), primeSubMsg.val(), reSubMsg.val(), gifSubMsg.val(), subToggle, primeSubToggle, reSubToggle, gifSubToggle, subReward.val(), reSubReward.val(),
                                gifSubReward.val(), reSubEmote.val(), tierOne.val(), tierTwo.val(), tierThree.val(), massGiftSubToggle, massGiftSubMsg.val(), massGiftSubReward.val(),
                                anonGifSubMsg.val(), anonMassGiftSubMsg.val(), anonGifSubToggle, anonMassGiftSubToggle]
                        }, function() {
                            socket.sendCommand('alerts_subscribe_update_settings_cmd', 'subscriberpanelupdate', function() {
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
    $('#hostHandlerSettings').on('click', function() {
        socket.getDBValues('alerts_get_host_settings', {
            tables: ['settings', 'settings', 'settings', 'settings', 'settings', 'settings', 'settings', 'settings', 'settings'],
            keys: ['hostReward', 'autoHostReward', 'hostMinViewerCount', 'hostMinCount', 'hostMessage', 'autoHostMessage', 'hostHistory', 'hostToggle', 'autoHostToggle']
        }, true, function(e) {
            helpers.getModal('host-alert', 'Настройки оповещений о хостах', 'Сохранить', $('<form/>', {
                'role': 'form'
            })
            // Add the div for the col boxes.
            .append($('<div/>', {
                'class': 'panel-group',
                'id': 'accordion'
            })
            // Append first collapsible accordion.
            .append(helpers.getCollapsibleAccordion('main-1', 'Хосты', $('<form/>', {
                    'role': 'form'
                })
                // Add toggle for normal hosts
                .append(helpers.getDropdownGroup('host-toggle', 'Срабатывание', (e.hostToggle === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'],
                    'Срабатывание оповещений о хостах'))
                // Append message box for the message
                .append(helpers.getTextAreaGroup('host-msg', 'text', 'Сообщение', '', e.hostMessage,
                    'Сообщение, уведомляющее о хосте', false)
                    // Append a sub-comment.
                    .append(helpers.getSubComment('Доступные теги: (name), (reward) и (viewers)')))
                // Appen the reward box
                .append(helpers.getInputGroup('host-reward', 'number', 'Вознаграждение', '', e.hostReward,
                    'Вознаграждение за хост'))))
            // Append second collapsible accordion.
            .append(helpers.getCollapsibleAccordion('main-2', 'Автохосты', $('<form/>', {
                    'role': 'form'
                })
                // Add toggle for normal hosts
                .append(helpers.getDropdownGroup('autohost-toggle', 'Срабатывание', (e.autoHostToggle === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'],
                    'Срабатывание оповещений об автохостах'))
                // Append message box for the message
                .append(helpers.getTextAreaGroup('autohost-msg', 'text', 'Сообщение', '', e.autoHostMessage,
                    'Сообщение, уведомляющее об автохосте', false)
                    // Append a sub-comment.
                    .append(helpers.getSubComment('Доступные теги: (name), (reward) и (viewers)')))
                // Appen the reward box
                .append(helpers.getInputGroup('autohost-reward', 'number', 'Вознаграждение', '', e.autoHostReward,
                    'Вознаграждение за автохост'))))
            // Append third collapsible accordion.
            .append(helpers.getCollapsibleAccordion('main-3', 'Дополнительные настройки', $('<form/>', {
                    'role': 'form'
                })
                // Add toggle for host history.
                .append(helpers.getDropdownGroup('host-history', 'Ведение истории хостов', (e.hostHistory === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'],
                    'Запись истории всех хостов'))
                // Min host box reward.
                .append(helpers.getInputGroup('host-minpoint', 'number', 'Минимум зрителей для вознаграждения', '', e.hostMinViewerCount,
                    'Минимальное количество пришедших с хостом зрителей, необходимое для вознаграждения хостера'))
                // Min host box alert.
                .append(helpers.getInputGroup('host-minalert', 'number', 'Минимум зрителей для оповещения', '', e.hostMinCount,
                    'Минимальное количество пришедших с хостом зрителей, необходимое для оповещения о хосте'))))),
            function() { // Callback once the user clicks save.
                let hostToggle = $('#host-toggle').find(':selected').text() === 'Да',
                    hostMsg = $('#host-msg'),
                    hostReward = $('#host-reward'),
                    autoHostToggle = $('#autohost-toggle').find(':selected').text() === 'Да',
                    autoHostMsg = $('#autohost-msg'),
                    autoHostReward = $('#autohost-reward'),
                    hostHistory = $('#host-history').find(':selected').text() === 'Да',
                    hostMinPoints = $('#host-minpoint'),
                    hostMinAlert = $('#host-minalert');

                // Make sure the user has someone in each box.
                switch (false) {
                    case helpers.handleInputString(hostMsg):
                    case helpers.handleInputNumber(hostReward, 0):
                    case helpers.handleInputString(autoHostMsg):
                    case helpers.handleInputNumber(autoHostReward, 0):
                    case helpers.handleInputNumber(hostMinPoints, 0):
                    case helpers.handleInputNumber(hostMinAlert, 0):
                        break;
                    default:
                        socket.updateDBValues('alerts_update_host_settings', {
                            tables: ['settings', 'settings', 'settings', 'settings', 'settings', 'settings', 'settings',
                                'settings', 'settings'],
                            keys: ['hostReward', 'autoHostReward', 'hostMinViewerCount', 'hostMinCount', 'hostMessage',
                                'autoHostMessage', 'hostHistory', 'hostToggle', 'autoHostToggle'],
                            values: [hostReward.val(), autoHostReward.val(), hostMinPoints.val(), hostMinAlert.val(),
                                hostMsg.val(), autoHostMsg.val(), hostHistory, hostToggle, autoHostToggle]
                        }, function() {
                            socket.sendCommand('alerts_update_host_settings_cmd', 'reloadhost', function() {
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

    // Bits alert settings.
    $('#bitsHandlerSettings').on('click', function() {
        socket.getDBValues('alerts_get_bits_settings', {
            tables: ['bitsSettings', 'bitsSettings', 'bitsSettings'],
            keys: ['toggle', 'message', 'minimum']
        }, true, function(e) {
            helpers.getModal('bits-alert', 'Настройки оповещений о битах', 'Сохранить', $('<form/>', {
                'role': 'form'
            })
            // Add the toggle for bits alerts.
            .append(helpers.getDropdownGroup('bits-toggle', 'Срабатывание', (e.toggle === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'],
                'Срабатывание оповещений о битах'))
            // Add the the text area for the bits message.
            .append(helpers.getTextAreaGroup('bits-message', 'text', 'Сообщение', '', e.message,
                'Сообщение, уведомляющее о битах', false)
                    // Append a sub-comment.
                    .append(helpers.getSubComment('Доступные теги: (name), (message) и (amount)')))
            // Add the box for the reward.
            .append(helpers.getInputGroup('bits-minimum', 'number', 'Минимум битов', '', e.minimum, 'Минимальное количество битов, необходимое для оповещения')),
            function() { // Callback once the user clicks save.
                let bitsToggle = $('#bits-toggle').find(':selected').text() === 'Да',
                    bitsMsg = $('#bits-message'),
                    bitsMin = $('#bits-minimum');

                // Make sure the user has someone in each box.
                switch (false) {
                    case helpers.handleInputString(bitsMsg):
                    case helpers.handleInputNumber(bitsMin):
                        break;
                    default:
                        socket.updateDBValues('alerts_update_bits_settings', {
                            tables: ['bitsSettings', 'bitsSettings', 'bitsSettings'],
                            keys: ['toggle', 'message', 'minimum'],
                            values: [bitsToggle, bitsMsg.val(), bitsMin.val()]
                        }, function() {
                            socket.sendCommand('alerts_update_bits_settings_cmd', 'reloadbits', function() {
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

    // Clip alert settings.
    $('#clipHandlerSettings').on('click', function() {
        socket.getDBValues('alerts_get_clip_settings', {
            tables: ['clipsSettings', 'clipsSettings'],
            keys: ['toggle', 'message']
        }, true, function(e) {
            helpers.getModal('clip-alert', 'Настройки оповещений о клипах', 'Сохранить', $('<form/>', {
                'role': 'form'
            })
            // Add the toggle for clip alerts.
            .append(helpers.getDropdownGroup('clip-toggle', 'Срабатывание', (e.toggle === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'],
                'Срабатывание оповещений о клипах'))
            // Add the text area for the clips message.
            .append(helpers.getTextAreaGroup('clip-message', 'text', 'Сообщение', '', e.message,
                'Сообщение, уведомляющее о недавнем клипе', false)
                // Append a sub-comment.
                .append(helpers.getSubComment('Доступные теги: (name) и (url)')))
            // Append a note.
            .append(helpers.getNote('Примечание: при превышении 100 клипов за последние сутки оповещения приостанавливаются')),
            function() { // Callback once the user clicks save.
                let clipToggle = $('#clip-toggle').find(':selected').text() === 'Да',
                    clipMsg = $('#clip-message');

                // Make sure the user has someone in each box.
                switch (false) {
                    case helpers.handleInputString(clipMsg):
                        break;
                    default:
                        socket.updateDBValues('alerts_update_clip_settings', {
                            tables: ['clipsSettings', 'clipsSettings'],
                            keys: ['toggle', 'message'],
                            values: [clipToggle, clipMsg.val()]
                        }, function() {
                            socket.sendCommand('alerts_update_clip_settings_cmd', 'reloadclip', function() {
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

    // Raid settings.
    $('#raidHandlerSettings').on('click', function() {
        socket.getDBValues('alerts_get_raid_settings', {
            tables: ['raidSettings', 'raidSettings', 'raidSettings', 'raidSettings', 'raidSettings', 'raidSettings'],
            keys: ['raidToggle', 'newRaidIncMessage', 'raidIncMessage', 'raidReward', 'raidOutMessage', 'raidOutSpam']
        }, true, function(e) {
            helpers.getModal('raid-alert', 'Настройки оповещений о рейдах', 'Сохранить', $('<form/>', {
                'role': 'form'
            })
            // Add the div for the col boxes.
            .append($('<div/>', {
                'class': 'panel-group',
                'id': 'accordion'
            })
            // Append first collapsible accordion.
            .append(helpers.getCollapsibleAccordion('main-1', 'Входящие рейды', $('<form/>', {
                    'role': 'form'
                })
                 // Add the toggle for raid alerts.
                .append(helpers.getDropdownGroup('raid-toggle', 'Срабатывание', (e.raidToggle === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'],
                    'Срабатывание оповещений о входящих рейдах'))
                // Add the text area for the new raid message.
                .append(helpers.getTextAreaGroup('new-raid-message', 'text', 'Первое сообщение', '', e.newRaidIncMessage,
                    'Сообщение, уведомляющее о первом рейде', false)
                    // Append a sub-comment.
                    .append(helpers.getSubComment('Доступные теги: (name), (viewers), (url), (reward) и (game)')))
                // Add the text area for the raid message.
                .append(helpers.getTextAreaGroup('raid-message', 'text', 'Повторное сообщение', '', e.raidIncMessage,
                    'Сообщение, уведомляющее о повторном рейде', false)
                    // Append a sub-comment.
                    .append(helpers.getSubComment('Доступные теги: (name), (viewers), (url), (times), (reward) и (game)')))
                // Appen the reward box
                .append(helpers.getInputGroup('raid-reward', 'number', 'Вознаграждение', '', e.raidReward,
                    'Вознаграждение рейдера'))))
            // Append second collapsible accordion.
            .append(helpers.getCollapsibleAccordion('main-2', 'Исходящие рейды', $('<form/>', {
                    'role': 'form'
                })
                // Add the text area for the new raid message.
                .append(helpers.getTextAreaGroup('out-raid-message', 'text', 'Сообщение', '', e.raidOutMessage,
                    'Сообщение, уведомляющее об исходящем рейде', false)
                    // Append a sub-comment.
                    .append(helpers.getSubComment('Доступные теги: (name) и (url)')))
                 // Appen the spam box
                .append(helpers.getInputGroup('raid-spam', 'number', 'Спам сообщения', '', e.raidOutSpam,
                    'Количество сообщений об исходящем рейде'))))),
            function() {
                let raidToggle = $('#raid-toggle').find(':selected').text() === 'Да',
                    raidNewMsg = $('#new-raid-message'),
                    raidMsg = $('#raid-message'),
                    raidReward = $('#raid-reward'),
                    raidOutMsg = $('#out-raid-message'),
                    raidMsgSpam = $('#raid-spam');

                switch (false) {
                    case helpers.handleInputString(raidNewMsg):
                    case helpers.handleInputString(raidMsg):
                    case helpers.handleInputNumber(raidReward, 0):
                    case helpers.handleInputString(raidOutMsg):
                    case helpers.handleInputNumber(raidMsgSpam, 1, 10):
                        break;
                    default:
                        socket.updateDBValues('raid_setting_update', {
                            tables: ['raidSettings', 'raidSettings', 'raidSettings', 'raidSettings', 'raidSettings', 'raidSettings'],
                            keys: ['raidToggle', 'newRaidIncMessage', 'raidIncMessage', 'raidReward', 'raidOutMessage', 'raidOutSpam'],
                            values: [raidToggle, raidNewMsg.val(), raidMsg.val(), raidReward.val(), raidOutMsg.val(), raidMsgSpam.val()]
                        }, function() {
                            socket.sendCommand('raid_setting_update_cmd', 'reloadraid', function() {
                                // Alert the user.
                                toastr.success('Настройки оповещений о рейдах успешно обновлены');
                                // Close the modal.
                                $('#raid-alert').modal('toggle');
                            });
                        });
                }
            }).modal('toggle');
        });
    });

    // Greeting settings.
    $('#greetingSystemSettings').on('click', function() {
        socket.getDBValues('alerts_get_greeting_settings', {
            tables: ['greeting', 'greeting'],
            keys: ['autoGreetEnabled', 'cooldown']
        }, true, function(e) {
            helpers.getModal('greeting-alert', 'Настройки приветствий', 'Сохранить', $('<form/>', {
                'role': 'form'
            })
            // Add the toggle for greeting alerts.
            .append(helpers.getDropdownGroup('greeting-toggle', 'Срабатывание', (e.autoGreetEnabled === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'],
                'Срабатывание персональных приветствий'))
            // Add the input for the greeting reward.
            .append(helpers.getInputGroup('greeting-cooldown', 'number', 'Кулдаун', '', (parseInt(e.cooldown) / 36e5),
                'Кулдаун приветствия, в часах')),
            function() { // Callback once the user clicks save.
                let greetingToggle = $('#greeting-toggle').find(':selected').text() === 'Да',
                    greetingCooldown = $('#greeting-cooldown');

                // Make sure the user has someone in each box.
                switch (false) {
                    case helpers.handleInputNumber(greetingCooldown, 4):
                        break;
                    default:
                        socket.updateDBValues('alerts_update_greeting_settings', {
                            tables: ['greeting', 'greeting'],
                            keys: ['autoGreetEnabled', 'cooldown'],
                            values: [greetingToggle, (parseInt(greetingCooldown.val()) * 36e5)]
                        }, function() {
                            socket.sendCommand('alerts_update_greeting_settings_cmd', 'greetingspanelupdate', function() {
                                // Close the modal.
                                $('#greeting-alert').modal('toggle');
                                // Alert the user.
                                toastr.success('Настройки приветствий успешно обновлены');
                            });
                        });
                }
            }).modal('toggle');
        });
    });

    // Streamlabs settings.
    $('#donationHandlerSettings').on('click', function() {
        socket.getDBValues('alerts_get_streamlabs_settings', {
            tables: ['donations', 'donations', 'donations'],
            keys: ['announce', 'reward', 'message']
        }, true, function(e) {
            helpers.getModal('streamlabs-alert', 'Настройки оповещений Streamlabs', 'Сохранить', $('<form/>', {
                'role': 'form'
            })
            /// Add the toggle for streamlabs alerts.
            .append(helpers.getDropdownGroup('streamlabs-toggle', 'Срабатывание', (e.announce === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'],
                'Срабатывание оповещений о донатах Streamlabs'))
            // Add the the text area for the tip message.
            .append(helpers.getTextAreaGroup('streamlabs-message', 'text', 'Сообщение', '', e.message,
                'Сообщение, уведомляющее о донате Streamlabs')
                // Append a sub-comment.
                .append(helpers.getSubComment('Доступные теги: (name), (amount), (points), (reward), (pointname), (currency) и (message)')))
            // Add the the box for the tip reward
            .append(helpers.getInputGroup('streamlabs-reward', 'number', 'Кратность вознаграждения', '', e.reward, 'Умножение вознаграждения, в количество раз'))
            // Append a note.
            .append(helpers.getNote('Примечание: для работы оповещений необходима интеграция с аккаунтом Streamlabs')),
            function() { // Callback once the user clicks save.
                let tipToggle = $('#streamlabs-toggle').find(':selected').text() === 'Да',
                    tipMessage = $('#streamlabs-message'),
                    tipReward = $('#streamlabs-reward');

                // Make sure the user has someone in each box.
                switch (false) {
                    case helpers.handleInputString(tipMessage):
                    case helpers.handleInputNumber(tipReward, 0):
                        break;
                    default:
                        socket.updateDBValues('alerts_update_streamlabs_settings', {
                            tables: ['donations', 'donations', 'donations'],
                            keys: ['announce', 'reward', 'message'],
                            values: [tipToggle, tipReward.val(), tipMessage.val()]
                        }, function() {
                            socket.sendCommand('alerts_update_streamlabs_settings_cmd', 'donationpanelupdate', function() {
                                // Close the modal.
                                $('#streamlabs-alert').modal('toggle');
                                // Alert the user.
                                toastr.success('Настройки оповещений Streamlabs успешно обновлены');
                            });
                        });
                }
            }).modal('toggle');
        });
    });

    // TipeeeStream settings.
    $('#tipeeeStreamHandlerSettings').on('click', function() {
        socket.getDBValues('alerts_get_tipeeestream_settings', {
            tables: ['tipeeeStreamHandler', 'tipeeeStreamHandler', 'tipeeeStreamHandler'],
            keys: ['toggle', 'reward', 'message']
        }, true, function(e) {
            helpers.getModal('tipeeestream-alert', 'Настройки оповещений TipeeeStream', 'Сохранить', $('<form/>', {
                'role': 'form'
            })
            /// Add the toggle for streamlabs alerts.
            .append(helpers.getDropdownGroup('tipeeestream-toggle', 'Срабатывание', (e.toggle === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'],
                'Срабатывание оповещений о донатах TipeeeStream'))
            // Add the the text area for the tip message.
            .append(helpers.getTextAreaGroup('tipeeestream-message', 'text', 'Сообщение', '', e.message,
                'Сообщение, уведомляющее о донате TipeeeStream')
                // Append a sub-comment.
                .append(helpers.getSubComment('Доступные теги: (name), (amount), (reward) и (message)')))
            // Add the the box for the tip reward
            .append(helpers.getInputGroup('tipeeestream-reward', 'number', 'Кратность вознаграждения', '', e.reward, 'Умножение вознаграждения, в количество раз'))
            // Append a note.
            .append(helpers.getNote('Примечание: для работы оповещений необходима интеграция с аккаунтом TipeeeStream')),
            function() { // Callback once the user clicks save.
                let tipToggle = $('#tipeeestream-toggle').find(':selected').text() === 'Да',
                    tipMessage = $('#tipeeestream-message'),
                    tipReward = $('#tipeeestream-reward');

                // Make sure the user has someone in each box.
                switch (false) {
                    case helpers.handleInputString(tipMessage):
                    case helpers.handleInputNumber(tipReward, 0):
                        break;
                    default:
                        socket.updateDBValues('alerts_update_tipeeestream_settings', {
                            tables: ['tipeeeStreamHandler', 'tipeeeStreamHandler', 'tipeeeStreamHandler'],
                            keys: ['toggle', 'reward', 'message'],
                            values: [tipToggle, tipReward.val(), tipMessage.val()]
                        }, function() {
                            socket.sendCommand('alerts_update_tipeeestream_settings_cmd', 'tipeeestreamreload', function() {
                                // Close the modal.
                                $('#tipeeestream-alert').modal('toggle');
                                // Alert the user.
                                toastr.success('Настройки оповещений TipeeeStream успешно обновлены');
                            });
                        });
                }
            }).modal('toggle');
        });
    });

    // StreamElements settings.
    $('#streamElementsHandlerSettings').on('click', function() {
        socket.getDBValues('alerts_get_streamelements_settings', {
            tables: ['streamElementsHandler', 'streamElementsHandler', 'streamElementsHandler'],
            keys: ['toggle', 'reward', 'message']
        }, true, function(e) {
            helpers.getModal('streamelements-alert', 'Настройки оповещений StreamElements', 'Сохранить', $('<form/>', {
                'role': 'form'
            })
            /// Add the toggle for streamelements alerts.
            .append(helpers.getDropdownGroup('streamelements-toggle', 'Срабатывание', (e.toggle === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'],
                'Срабатывание оповещений о донатах через StreamElements'))
            // Add the the text area for the tip message.
            .append(helpers.getTextAreaGroup('streamelements-message', 'text', 'Сообщение', '', e.message,
                'Сообщение, уведомляющее о донате через StreamElements')
                    // Append a sub-comment.
                    .append(helpers.getSubComment('Доступные теги: (name), (amount), (reward), (currency) и (message)')))
            // Add the the box for the tip reward
            .append(helpers.getInputGroup('streamelements-reward', 'number', 'Кратность вознаграждения', '', e.reward, 'Умножение вознаграждения, в количество раз'))
            // Append a note.
            .append(helpers.getNote('Примечание: для работы оповещений необходима интеграция с аккаунтом StreamElements')),
            function() { // Callback once the user clicks save.
                let tipToggle = $('#streamelements-toggle').find(':selected').text() === 'Да',
                    tipMessage = $('#streamelements-message'),
                    tipReward = $('#streamelements-reward');

                // Make sure the user has someone in each box.
                switch (false) {
                    case helpers.handleInputString(tipMessage):
                    case helpers.handleInputNumber(tipReward, 0):
                        break;
                    default:
                        socket.updateDBValues('alerts_update_streamelements_settings', {
                            tables: ['streamElementsHandler', 'streamElementsHandler', 'streamElementsHandler'],
                            keys: ['toggle', 'reward', 'message'],
                            values: [tipToggle, tipReward.val(), tipMessage.val()]
                        }, function() {
                            socket.sendCommand('alerts_update_streamelements_settings_cmd', 'streamelementsreload', function() {
                                // Close the modal.
                                $('#streamelements-alert').modal('toggle');
                                // Alert the user.
                                toastr.success('Настройки оповещений StreamElements успешно обновлены');
                            });
                        });
                }
            }).modal('toggle');
        });
    });

    // Twitter settings.
    $('#twitterHandlerSettings').on('click', function() {
        socket.getDBValues('alerts_get_twitter_settings', {
            tables: ['twitter', 'twitter', 'twitter', 'twitter', 'twitter', 'twitter', 'twitter', 'twitter', 'twitter', 'twitter',
                    'twitter', 'twitter', 'twitter', 'twitter', 'twitter', 'twitter', 'twitter', 'twitter', 'twitter'],
            keys: ['message_online', 'message_gamechange', 'message_update', 'polldelay_mentions', 'polldelay_retweets', 'polldelay_hometimeline', 'polldelay_usertimeline', 'postdelay_update',
                    'reward_points', 'reward_cooldown', 'poll_mentions', 'poll_retweets', 'poll_hometimeline', 'poll_usertimeline', 'post_online', 'post_gamechange', 'post_update', 'reward_toggle', 'reward_announce']
        }, true, function(e) {
            helpers.getModal('twitter-alert', 'Настройки оповещений Twitter', 'Сохранить', $('<form/>', {
                'role': 'form'
            })
            // Add the div for the col boxes.
            .append($('<div/>', {
                'class': 'panel-group',
                'id': 'accordion'
            })
            // Append first collapsible accordion.
            .append(helpers.getCollapsibleAccordion('main-1', 'Отслеживание', $('<form/>', {
                    'role': 'form'
                })
                // Add the toggle for mentions
                .append(helpers.getDropdownGroup('poll-mentions', 'Упоминания', (e.poll_mentions === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'],
                    'Публикация твитов с упоминанием вашего имени'))
                // Add the toggle for retweets
                .append(helpers.getDropdownGroup('poll-retweets', 'Ретвиты', (e.poll_retweets === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'],
                    'Публикация ваших ретвитов чужих твитов'))
                // Add the toggle for home timeline
                .append(helpers.getDropdownGroup('poll-home', 'Лента', (e.poll_hometimeline === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'],
                    'Публикация всех твитов из вашей ленты'))
                // Add the toggle for user timeline
                .append(helpers.getDropdownGroup('poll-user', 'Собственные твиты', (e.poll_usertimeline === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'],
                    'Публикация собственных твитов'))
                // Query interval for mentions
                .append(helpers.getInputGroup('query-mentions', 'number', 'Интервал для упоминаний', '', e.polldelay_mentions, 'Интервал отслеживания твитов с упоминанием вашего имени, в секундах'))
                // Query interval for retweets
                .append(helpers.getInputGroup('query-retweets', 'number', 'Интервал для ретвитов', '', e.polldelay_retweets, 'Интервал отслеживания ваших ретвитов чужих твитов, в секундах'))
                // Query interval for mentions
                .append(helpers.getInputGroup('query-home', 'number', 'Интервал для ленты', '', e.polldelay_hometimeline, 'Интервал отслеживания всех твитов из вашей ленты, в секундах'))
                // Query interval for mentions
                .append(helpers.getInputGroup('query-user', 'number', 'Интервал для собственных твитов', '', e.polldelay_usertimeline, 'Интервал отслеживания собственных твитов, в секундах'))))
            // Append second collapsible accordion.
            .append(helpers.getCollapsibleAccordion('main-2', 'Вознаграждение', $('<form/>', {
                    'role': 'form'
                })
                // Add the toggle for mentions
                .append(helpers.getDropdownGroup('retweet-toggle', 'Срабатывание', (e.reward_toggle === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'], 'Вознаграждение за ретвиты ваших твитов'))
                // Add the toggle for retweets
                .append(helpers.getDropdownGroup('retweet-toggle-msg', 'Оповещения', (e.reward_announce === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'],
                    'Оповещения о вознаграждении за ретвиты ваших твитов'))
                // Query interval for mentions
                .append(helpers.getInputGroup('retweet-reward', 'number', 'Сумма', '', e.reward_points, 'Вознаграждение за ретвит вашего твита, в поинтах'))
                // Query interval for mentions
                .append(helpers.getInputGroup('retweet-cooldown', 'number', 'Кулдаун', '', e.reward_cooldown, 'Кулдаун вознаграждения за ретвит вашего твита, в часах'))))
            // Append third collapsible accordion.
            .append(helpers.getCollapsibleAccordion('main-3', 'Статус стрима', $('<form/>', {
                    'role': 'form'
                })
                // Add the toggle for the online Tweet.
                .append(helpers.getDropdownGroup('online-toggle', 'Начало стрима', (e.post_online === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'], 'Публикация твита о начале стрима'))
                // Add the toggle for the game Tweet.
                .append(helpers.getDropdownGroup('game-toggle', 'Смена игры', (e.post_gamechange === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'], 'Публикация твита о смене игры на стриме'))
                // Add the toggle for the timed Tweet.
                .append(helpers.getDropdownGroup('timed-toggle', 'Продолжение стрима', (e.post_update === 'true' ? 'Да' : 'Нет'), ['Да', 'Нет'], 'Публикация твитов о продолжении стрима через заданный интервал времени (ниже)'))
                // Add the the text area for online message
                .append(helpers.getTextAreaGroup('online-msg', 'text', 'Сообщение о начале стрима', '', e.message_online, 'Текст твита о начале стрима', false)
                    // Append a sub-comment.
                    .append(helpers.getSubComment('Доступные теги: (title), (game), (enter) и (twitchurl)')))
                // Add the the text area for online message
                .append(helpers.getTextAreaGroup('game-msg', 'text', 'Сообщение о смене игры', '', e.message_gamechange, 'Текст твита о смене игры', false)
                    // Append a sub-comment.
                    .append(helpers.getSubComment('Доступные теги: (title), (game), (enter) и (twitchurl)')))
                // Add the the text area for online message
                .append(helpers.getTextAreaGroup('timed-msg', 'text', 'Сообщение о продолжении стрима', '', e.message_update, 'Текст твита о продолжении стрима', false)
                    // Append a sub-comment.
                    .append(helpers.getSubComment('Доступные теги: (title), (game), (uptime), (enter) и (twitchurl)')))
                // timed message minutes.
                .append(helpers.getInputGroup('timed-msg-time', 'number', 'Интервал', '', e.postdelay_update, 'Интервал времени между твитами о продолжении стрима, в минутах'))
            // Append a note.
            .append(helpers.getNote('Примечание: Twitter запрещает #теги и @упоминания в автоматизированных сообщениях')))))
            // Append a note.
            .append(helpers.getNote('Примечание: для работы оповещений необходима интеграция с аккаунтом Twitter')),
            function() { // Callback once the user clicks save.
                let onlineToggle = $('#online-toggle').find(':selected').text() === 'Да',
                    gameToggle = $('#game-toggle').find(':selected').text() === 'Да',
                    timedToggle = $('#timed-toggle').find(':selected').text() === 'Да',
                    onlineMsg = $('#online-msg'),
                    gameMsg = $('#game-msg'),
                    timedMsg = $('#timed-msg'),
                    timedTime = $('#timed-msg-time'),
                    mentionToggle = $('#poll-mentions').find(':selected').text() === 'Да',
                    rtToggle = $('#poll-retweets').find(':selected').text() === 'Да',
                    homeToggle = $('#poll-home').find(':selected').text() === 'Да',
                    userToggle = $('#poll-user').find(':selected').text() === 'Да',
                    mentionTime = $('#query-mentions'),
                    rtTime = $('#query-retweets'),
                    homeTime = $('#query-home'),
                    userTime = $('#query-user'),
                    rtRewardToggle = $('#retweet-toggle').find(':selected').text() === 'Да',
                    rtRewardToggleMsg = $('#retweet-toggle-msg').find(':selected').text() === 'Да',
                    rtReward = $('#retweet-reward'),
                    rtCooldown = $('#retweet-cooldown');

                // Make sure the user filled in everything.
                switch (false) {
                    case helpers.handleInputString(onlineMsg):
                    case helpers.handleInputString(gameMsg):
                    case helpers.handleInputString(timedMsg):
                    case helpers.handleInputNumber(timedTime, 180):
                    case helpers.handleInputNumber(mentionTime, 60):
                    case helpers.handleInputNumber(rtTime, 60):
                    case helpers.handleInputNumber(homeTime, 60):
                    case helpers.handleInputNumber(userTime, 15):
                    case helpers.handleInputNumber(rtReward, 0):
                    case helpers.handleInputNumber(rtCooldown, 0):
                        break;
                    default:
                        socket.updateDBValues('alerts_get_twitter_settings', {
                            tables: ['twitter', 'twitter', 'twitter', 'twitter', 'twitter', 'twitter', 'twitter', 'twitter', 'twitter', 'twitter',
                                    'twitter', 'twitter', 'twitter', 'twitter', 'twitter', 'twitter', 'twitter', 'twitter', 'twitter'],
                            keys: ['message_online', 'message_gamechange', 'message_update', 'polldelay_mentions', 'polldelay_retweets', 'polldelay_hometimeline', 'polldelay_usertimeline', 'postdelay_update',
                                    'reward_points', 'reward_cooldown', 'poll_mentions', 'poll_retweets', 'poll_hometimeline', 'poll_usertimeline', 'post_online', 'post_gamechange', 'post_update', 'reward_toggle', 'reward_announce'],
                            values: [onlineMsg.val(), gameMsg.val(), timedMsg.val(), mentionTime.val(), rtTime.val(), homeTime.val(), userTime.val(), timedTime.val(), rtReward.val(), rtCooldown.val(), mentionToggle,
                                    rtToggle, homeToggle, userToggle, onlineToggle, gameToggle, timedToggle, rtRewardToggle, rtRewardToggleMsg]
                        }, function() {
                            // Close the modal.
                            $('#twitter-alert').modal('toggle');
                            // Alert the user.
                            toastr.success('Настройки оповещений Twitter успешно обновлены');
                        });
                }
            }).modal('toggle');
        });
    });
});
