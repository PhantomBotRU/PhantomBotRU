// Function that querys all of the data we need.
$(run = function() {
    socket.getDBValues('auction_module_status_toggle', {
        tables: ['modules', 'auctionSettings'],
        keys: ['./systems/auctionSystem.js', 'isActive']
    }, true, function(e) {
        if (!helpers.getModuleStatus(['auctionOptions'], e['./systems/auctionSystem.js'], 'auctionSystemModuleToggle')) {
            // Remove the chat.
            $('#twitch-chat-auction').find('iframe').remove();
            return;
        }

        // Update the open button to close if the raffle is active.
        if (e['isActive'] === 'true') {
            $('#open-or-close-auction').html($('<i/>', {
                'class': 'fa fa-lock'
            })).append('&nbsp; Закрыть').removeClass('btn-success').addClass('btn-warning');
        }

        // Add Twitch chat.
        $('#twitch-chat-auction').html($('<iframe/>', {
            'frameborder': '0',
            'scrolling': 'no',
            'style': 'min-width: 100%; min-height: 610px;',
            'src': 'https://www.twitch.tv/embed/' + getChannelName() + '/chat' + (helpers.isDark ? '?darkpopout' : '')
        }));

        // Add temp function.
        helpers.temp.updateStats = function() {
            socket.getDBValues('auction_module_status_toggle', {
                tables: ['auctionresults', 'auctionresults'],
                keys: ['winner', 'amount']
            }, true, function(e) {
                if (e['winner'] != null) {
                    $('#auction-top-bidder').html(e['winner']);
                    $('#auction-points').html(e['amount']);
                }
            });
        };

        // Set a timer to auto load the raffle list.
        helpers.setInterval(function() {
            helpers.temp.updateStats();
        }, 3e3);
    });
});

// Function that handlers the loading of events.
$(function() {
    // Module toggle.
    $('#auctionSystemModuleToggle').on('change', function() {
        socket.sendCommandSync('auction_system_module_toggle_cmd',
            'module ' + ($(this).is(':checked') ? 'enablesilent' : 'disablesilent') + ' ./systems/auctionSystem.js', run);
    });

    // Open/Close button.
    $('#open-or-close-auction').on('click', function() {
        if ($(this)[0].innerText.trim() === 'Начать') {
            const commandLevel = $('#auction-perm').find(':selected').text(),
                minBet = $('#auction-bet'),
                incre = $('#auction-inc'),
                timer = $('#auction-timer');

            // Make sure the user entered everything right.
            switch (false) {
                case helpers.handleInputNumber(minBet, 1):
                case helpers.handleInputNumber(incre, 1):
                case helpers.handleInputNumber(timer, 0):
                    break;
                default:
                    socket.sendCommandSync('auction_command_permisison_update', 'permcomsilent bid ' + helpers.getGroupIdByName(commandLevel, true), function() {
                        socket.sendCommand('auction_open_cmd', 'auction open ' + incre.val() + ' ' + minBet.val() + ' ' + timer.val(), function() {
                            // Alert the user.
                            toastr.success('Аукцион успешно открыт');
                            // Update the button.
                            $('#open-or-close-auction').html($('<i/>', {
                                'class': 'fa fa-lock'
                            })).append('&nbsp; Закрыть').removeClass('btn-success').addClass('btn-warning');
                        });
                    });
            }
        } else {
            socket.sendCommandSync('close_auction_cmd', 'auction close', function() {
                // Alert the user.
                toastr.success('Аукцион успешно закрыт');
                // Reload to remove the winner.
                helpers.temp.updateStats();
                // Update the button.
                $('#open-or-close-auction').html($('<i/>', {
                    'class': 'fa fa-unlock-alt'
                })).append('&nbsp; Начать').removeClass('btn-warning').addClass('btn-success');
            });
        }
    });

    // Warn auction.
    $('#warn-auction').on('click', function() {
        socket.sendCommand('auction_warn_cmd', 'auction warn', function() {
            toastr.success('Оповещение пользователей о скором закрытии аукциона успешно запущено');
        });
    });

    // Warn reset.
    $('#reset-auction').on('click', function() {
        socket.sendCommand('auction_reset_cmd', 'auction reset', function() {
            toastr.success('Аукцион успешно сброшен');

            $('#open-or-close-auction').html($('<i/>', {
                'class': 'fa fa-unlock-alt'
            })).append('&nbsp; Начать').removeClass('btn-warning').addClass('btn-success');
        });
    });
});