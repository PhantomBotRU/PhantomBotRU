// Script that handles all of the global things.

$(function() {
    // Dark mode toggle.
    $('#dark-mode-toggle').on('click', function() {
        // Update the toggle.
        socket.updateDBValue('panel_dark_mode_toggle', 'panelData', 'isDark', $(this).is(':checked'), function() {
            window.location.reload();
        });
    });

    // the button that signs out.
    $('#sign-out-btn').on('click', function() {
        $.ajax({
            'type': 'GET',
            'url': window.location.pathname,
            'username': 'log',
            'password': 'out'
        }).done(function() {
            // Nothing should happen here.
            alert('Failed to log out.');
        }).fail(function() {
            // We logged out. We want a 401, this means the old password was dumped (The good one).
            window.location = '/';
        });
    });

    // Load the display name.
    $(function() {
        $('#main-name, #second-name').text(getDisplayName());
    });

    // Check if Discord is enabled.
    socket.getDBValue('get_discord_status_index', 'panelData', 'hasDiscord', function(e) {
        // Remove the tab if we are not using Discord.
        if (e.panelData !== 'true') {
            $('#discord_index_tab').remove();
            return;
        }
    });

    // Get bot updates.
    socket.getDBValue('get_bot_updates', 'settings', 'newrelease_info', function(e) {
        if (e.settings !== null) {
            e.settings = e.settings.split('|');

            helpers.handleNewBotUpdate(e.settings[0], e.settings[1]);
        }

        // Check for updates every 30 seconds.
        if (helpers.isDoUpdateLoop === undefined) {
            helpers.isDoUpdateLoop = true;

            // This timer is global and will never get killed.
            setInterval(function() {
                helpers.log('Running bot version check.', helpers.LOG_TYPE.INFO);

                socket.getDBValue('get_bot_updates', 'settings', 'newrelease_info', function(e) {
                    if (e.settings !== null) {
                        e.settings = e.settings.split('|');

                        helpers.handleNewBotUpdate(e.settings[0], e.settings[1]);
                    }
                });
            }, 3e4);
        }
    });
});