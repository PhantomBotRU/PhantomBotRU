// Function that querys all of the data we need.
$(function() {
    // Get Discord logging settings.
    socket.getDBValues('get_discord_logging_settings', {
        tables: ['discordSettings', 'discordSettings', 'discordSettings', 'discordSettings'],
        keys: ['modLogs', 'cbenniToggle', 'customCommandLogs', 'modLogChannel']
    }, true, function(e) {
        // Mod toggle.
        $('#twitch-mod-log').val((e['modLogs'] === 'true' ? 'Да' : 'Нет'));
        // Cbenni toggle.
        $('#twitch-mod-logviewer').val((e['cbenniToggle'] === 'true' ? 'Да' : 'Нет'));
        // Commands toggle.
        $('#twitch-command-log').val((e['customCommandLogs'] === 'true' ? 'Да' : 'Нет'));
        // Log channels
        $('#twitch-mod-channel, #twitch-command-channel').val((e['modLogChannel'] == null ? '' : e['modLogChannel']));
    });
});

// Function that handles events.
$(function() {
    // Save button.
    $('#discord-logging-save').on('click', function() {
    	let moderationLogs = $('#twitch-mod-log').find(':selected').text() === 'Да',
    		moderationCBenni = $('#twitch-mod-logviewer').find(':selected').text() === 'Да',
    		customCommandLog = $('#twitch-command-log').find(':selected').text() === 'Да',
    		logChannel = $('#twitch-mod-channel');

    	// Make sure all settings are entered corretly.
    	switch (false) {
    	    case helpers.handleInputString(logChannel):
    	    	break;
    	    default:
    	    	socket.updateDBValues('discord_logs_update', {
    	    		tables: ['discordSettings', 'discordSettings', 'discordSettings', 'discordSettings'],
        			keys: ['modLogs', 'cbenniToggle', 'customCommandLogs', 'modLogChannel'],
    	    		values: [moderationLogs, moderationCBenni, customCommandLog, logChannel.val()]
    	    	}, function() {
    	    		// Update the scripts variables.
    	    		socket.wsEvent('discord_logs', './core/logging.js', '', [], function() {
                        socket.sendCommand('moderation_reload_settings', 'reloadmoderation', function () {
    	    			    // Alert the user.
    	    			    toastr.success('Настройки логов в Discord успешно обновлены');
                        });
    	    		});
    	    	});
    	}
    });
});
