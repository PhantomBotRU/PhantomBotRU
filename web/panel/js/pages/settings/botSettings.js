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
	// Get logging settings.
	socket.getDBValues('get_logging_settings', {
		tables: ['settings', 'settings', 'settings', 'settings', 'settings',
			'settings', 'settings'],
		keys: ['log.file', 'log.event', 'log.error', 'log_rotate_days',
			'response_@chat', 'response_action', 'whisperMode']
	}, true, function(e) {
		// Update log event toggle.
		$('#logging-events').val((e['log.event'] === 'true' ? 'Да' : 'Нет'));
		// Update log error toggle.
		$('#logging-errors').val((e['log.error'] === 'true' ? 'Да' : 'Нет'));
		// Update log chat toggle.
		$('#logging-chat').val((e['log.file'] === 'true' ? 'Да' : 'Нет'));
		// Update log keep days.
		$('#log-days').val(e.log_rotate_days);
		// Set mute mode.
		$('#bot-mute-mode').val((e['response_@chat'] === 'true' ? 'Нет' : 'Да'));
		// Set action mode.
		$('#bot-action-mode').val((e['response_action'] === 'true' ? 'Да' : 'Нет'));
		// Set whisper mode.
		$('#bot-whisper-mode').val((e['whisperMode'] === 'true' ? 'Да' : 'Нет'));
	});
});

// Function that handles events.
$(function() {
	// Save button
	$('#bot-logging-save').on('click', function() {
		let logEvents = $('#logging-events').find(':selected').text() === 'Да',
			logErrors = $('#logging-errors').find(':selected').text() === 'Да',
			logChat = $('#logging-chat').find(':selected').text() === 'Да',
			muteMode = $('#bot-mute-mode').find(':selected').text() !== 'Да',
			actionMode = $('#bot-action-mode').find(':selected').text() === 'Да',
			whisperMode = $('#bot-whisper-mode').find(':selected').text() === 'Да',
			logDays = $('#log-days');

		switch (false) {
			case helpers.handleInputNumber(logDays):
				break;
			default:
				socket.updateDBValues('update_logging_settings', {
					tables: ['settings', 'settings', 'settings', 'settings', 'settings',
						'settings', 'settings'],
					keys: ['log.file', 'log.event', 'log.error', 'log_rotate_days',
						'response_@chat', 'response_action', 'whisperMode'],
					values: [logChat, logEvents, logErrors, logDays.val(),
						muteMode, actionMode, whisperMode]
				}, function() {
					socket.sendCommand('update_logging_settings_cmd', 'reloadlogs', function() {
						socket.sendCommand('update_misc_settings_cmd', 'reloadmisc', function() {
							toastr.success('Настройки бота успешно обновлены');
						});
					});
				});
		}
	});
});
