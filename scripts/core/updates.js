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

/**
 * updater.js
 *
 * Update PhantomBot database
 *
 * This module will be executed before loading any of the other scripts even the core!
 * Add a new wrapped function if you want to apply updates for a new version
 */

/**
 * PhantomBot v2.0
 */
(function() {
    var modules,
        versions,
        sounds,
        i;

    /** New setup */
    if ($.changed == true && $.changed != null && $.changed != undefined && !$.inidb.exists('updates', 'installedNewBot') && $.inidb.get('updates', 'installedNewBot') != 'true') {
        $.consoleLn('');
        $.consoleLn('Initializing PhantomBot version ' + $.version + ' for the first time...');

        modules = [
            './commands/topCommand.js',
            './commands/highlightCommand.js',
            './commands/deathctrCommand.js',
            './commands/dualstreamCommand.js',
            './games/8ball.js',
            './games/adventureSystem.js',
            './games/killCommand.js',
            './games/random.js',
            './games/roll.js',
            './games/roulette.js',
            './games/slotMachine.js',
            './games/gambling.js',
            './handlers/followHandler.js',
            './handlers/hostHandler.js',
            './handlers/subscribeHandler.js',
            './handlers/donationHandler.js',
            './handlers/wordCounter.js',
            './handlers/gameWispHandler.js',
            './handlers/keywordHandler.js',
            './handlers/twitterHandler.js',
            './handlers/tipeeeStreamHandler.js',
            './systems/cleanupSystem.js',
            './systems/greetingSystem.js',
            './systems/pointSystem.js',
            './systems/noticeSystem.js',
            './systems/pollSystem.js',
            './systems/quoteSystem.js',
            './systems/raffleSystem.js',
            './systems/ticketraffleSystem.js',
            './systems/raidSystem.js',
            './systems/youtubePlayer.js',
            './systems/ranksSystem.js',
            './systems/auctionSystem.js',
            './systems/audioPanelSystem.js',
            './systems/queueSystem.js',
            './systems/bettingSystem.js',
            './commands/nameConverter.js',
            './handlers/clipHandler.js',
            './handlers/dataServiceHandler.js',
            './handlers/gameScanHandler.js',
            './discord/handlers/bitsHandler.js',
            './discord/handlers/followHandler.js',
            './discord/handlers/subscribeHandler.js',
            './discord/handlers/tipeeeStreamHandler.js',
            './discord/handlers/streamlabsHandler.js',
            './discord/handlers/hostHandler.js',
            './discord/handlers/twitterHandler.js',
            './discord/handlers/keywordHandler.js',
            './discord/handlers/streamHandler.js',
            './discord/systems/greetingsSystem.js',
            './discord/commands/customCommands.js',
            './discord/games/8ball.js',
            './discord/games/kill.js',
            './discord/games/random.js',
            './discord/games/roulette.js',
            './discord/games/gambling.js',
            './discord/games/roll.js',
            './discord/games/slotMachine.js',
            './discord/systems/pointSystem.js'
        ];

        $.consoleLn('Disabling default modules...');
        for (i in modules) {
            $.inidb.set('modules', modules[i], 'false');
        }

        $.consoleLn('Adding default custom commands...');
        $.inidb.set('command', 'uptime', '(pointtouser) (channelname) has been online for (uptime)');
        $.inidb.set('command', 'followage', '(followage)');
        $.inidb.set('command', 'playtime', '(pointtouser) (channelname) has been playing (game) for (playtime)');
        $.inidb.set('command', 'title', '(pointtouser) (titleinfo)');
        $.inidb.set('command', 'game', '(pointtouser) (gameinfo)');
        $.inidb.set('command', 'age', '(age)');

        $.consoleLn('Installing old updates...');
        versions = ['installedv2', 'installedv2.0.5', 'installedv2.0.6', 'installedv2.0.7', 'installedv2.0.7.2',
            'installedv2.0.8', 'installedv2.0.9', 'installedv2.1.0', 'installedv2.1.1', 'installedv2.2.1', 'installedv2.3s',
            'installedv2.3.3ss', 'installedv2.3.5ss', 'installedv2.3.5.1', 'installedv2.3.5.2', 'installedv2.3.5.3', 'installedv2.3.6',
            'installedv2.3.6ss', 'installedv2.3.6b', 'installedv2.3.7', 'installedv2.3.7b', 'installedv2.3.9', 'installedv2.3.9.1', 'installedv2.3.9.1b',
            'installedv2.4.0', 'installedv2.4.1'
        ];
        for (i in versions) {
            $.inidb.set('updates', versions[i], 'true');
        }

        sounds = "";
        modules = "";
        versions = "";
        $.changed = false;
        $.inidb.set('updates', 'installedNewBot', 'true');
        $.consoleLn('Initializing complete!');
        $.consoleLn('');
    }

    /** Version 2.0 updates */
    if (!$.inidb.exists('updates', 'installedv2') || $.inidb.get('updates', 'installedv2') != 'true') {
        $.consoleLn('Starting PhantomBot version 2.0 updates...');
        var tableNamesList = $.inidb.GetFileList(),
            commandsBackup,
            timeBackup,
            pointsBackup,
            defaultDisabledModules = [
                './games/8ball.js',
                './games/adventureSystem.js',
                './games/killCommand.js',
                './commands/topCommand.js',
                './games/random.js',
                './games/roll.js',
                './games/roulette.js',
                './games/slotMachine.js',
                './handlers/followHandler.js',
                './handlers/hostHandler.js',
                './handlers/subscribeHandler.js',
                './handlers/donationHandler.js',
                './systems/cleanupSystem.js',
                './systems/greetingSystem.js',
                './systems/pointSystem.js',
                './systems/noticeSystem.js',
                './systems/pollSystem.js',
                './systems/quoteSystem.js',
                './systems/raffleSystem.js',
                './systems/ticketraffleSystem.js',
                './systems/raidSystem.js',
                './systems/youtubePlayer.js',
                './systems/audioPanelSystem.js'
            ];

        if ($.inidb.FileExists('points') || $.inidb.FileExists('command') || $.inidb.FileExists('time')) {
            $.consoleLn('Backing up commands...');
            commandsBackup = getTableContents('command');

            $.consoleLn('Backing up times...');
            timeBackup = getTableContents('time');

            $.consoleLn('Backing up points...');
            pointsBackup = getTableContents('points');

            $.consoleLn('Backup completed.');
            $.consoleLn('Deleting old files...');
            for (i in tableNamesList) {
                $.inidb.RemoveFile(tableNamesList[i]);
            }

            $.consoleLn('Restoring commands...');
            restoreTableContents('command', commandsBackup);

            $.consoleLn('Restoring times...');
            restoreTableContents('time', timeBackup);

            $.consoleLn('Restoring points...');
            restoreTableContents('points', pointsBackup);
        }

        $.consoleLn('Disabling default modules...');
        for (i in defaultDisabledModules) {
            $.inidb.set('modules', defaultDisabledModules[i], 'false');
        }

        $.consoleLn('PhantomBot v2.0 updates completed!');
        $.inidb.set('updates', 'installedv2', 'true');
    }

    /** Version 2.0.5 updates */
    if (!$.inidb.exists('updates', 'installedv2.0.5') || $.inidb.get('updates', 'installedv2.0.5') != 'true') {
        var newDefaultDisabledModules = [
            './systems/betSystem.js',
            './handlers/wordCounter.js',
            './systems/ranksSystem.js',
            './systems/auctionSystem.js',
            './commands/highlightCommand.js'
        ]; //ADD NEW MODULES IN 2.0.5 TO BE DISABLED PLEASE.

        $.consoleLn('Starting PhantomBot version 2.0.5 updates...');

        $.consoleLn('Disabling new default modules...');
        for (i in newDefaultDisabledModules) {
            $.inidb.set('modules', newDefaultDisabledModules[i], 'false');
        }

        $.consoleLn('Removing commandCooldown table...');
        $.inidb.RemoveFile('commandCooldown');

        $.consoleLn('PhantomBot v2.0.5 updates completed!');
        $.inidb.set('updates', 'installedv2.0.5', 'true');
    }

    /** Version 2.0.6 updates */
    if (!$.inidb.exists('updates', 'installedv2.0.6') || $.inidb.get('updates', 'installedv2.0.6') != 'true') {
        $.consoleLn('Starting PhantomBot version 2.0.6 updates...');


        if ($.inidb.exists('chatModerator', 'capsLimit')) {
            $.inidb.del('chatModerator', 'capsLimit');
        }

        $.consoleLn('PhantomBot v2.0.6 updates completed!');
        $.inidb.set('updates', 'installedv2.0.6', 'true');
    }

    /** Version 2.0.7 updates */
    if (!$.inidb.exists('updates', 'installedv2.0.7') || $.inidb.get('updates', 'installedv2.0.7') != 'true') {
        $.consoleLn('Starting PhantomBot version 2.0.7 updates...');

        var newDefaultDisabledModules = [
            './handlers/gameWispHandler.js',
            './commands/deathctrCommand.js',
        ]; //ADD NEW MODULES IN 2.0.7 TO BE DISABLED PLEASE.

        $.consoleLn('Disabling new default modules...');
        for (i in newDefaultDisabledModules) {
            $.inidb.set('modules', newDefaultDisabledModules[i], 'false');
        }

        if ($.inidb.exists('chatModerator', 'regularsToggle')) {
            if ($.inidb.get('chatModerator', 'regularsToggle').equalsIgnoreCase('true')) {
                $.inidb.set('chatModerator', 'regularsModerateLinks', false);
                $.inidb.del('chatModerator', 'regularsToggle');
            } else if ($.inidb.get('chatModerator', 'regularsToggle').equalsIgnoreCase('false')) {
                $.inidb.set('chatModerator', 'regularsModerateLinks', true);
                $.inidb.del('chatModerator', 'regularsToggle');
            }
        }

        if ($.inidb.exists('chatModerator', 'subscribersToggle')) {
            if ($.inidb.get('chatModerator', 'subscribersToggle').equalsIgnoreCase('true')) {
                $.inidb.set('chatModerator', 'subscribersModerateLinks', false);
                $.inidb.del('chatModerator', 'subscribersToggle');
            } else if ($.inidb.get('chatModerator', 'subscribersToggle').equalsIgnoreCase('false')) {
                $.inidb.set('chatModerator', 'subscribersModerateLinks', true);
                $.inidb.del('chatModerator', 'subscribersToggle');
            }
        }

        /**
         * delete uptime command if it exits because I added this as a default command.
         */
        if ($.inidb.exists('command', 'uptime')) {
            $.inidb.del('command', 'uptime');
        }

        $.consoleLn('PhantomBot v2.0.7 updates completed!');
        $.inidb.set('updates', 'installedv2.0.7', 'true');
    }

    /** Version 2.0.7.2 updates */
    if (!$.inidb.exists('updates', 'installedv2.0.7.2') || $.inidb.get('updates', 'installedv2.0.7.2') != 'true') {
        $.consoleLn('Starting PhantomBot version 2.0.7.2 updates...');

        if ($.inidb.exists('chatModerator', 'longMessageMessage')) {
            if ($.inidb.get('chatModerator', 'longMessageMessage').equalsIgnoreCase('false')) {
                $.inidb.del('chatModerator', 'longMessageMessage');
            }
        }

        $.consoleLn('PhantomBot v2.0.7.2 updates completed!');
        $.inidb.set('updates', 'installedv2.0.7.2', 'true');
    }

    /** Version 2.0.8 updates */
    if (!$.inidb.exists('updates', 'installedv2.0.8') || $.inidb.get('updates', 'installedv2.0.8') != 'true') {
        $.consoleLn('Starting PhantomBot version 2.0.8 updates...');

        var newDefaultDisabledModules = [
            './handlers/twitterHandler.js',
            './systems/audioPanelSystem.js',
            './systems/queueSystem.js'
        ]; //ADD NEW MODULES IN 2.0.8 TO BE DISABLED PLEASE.

        $.consoleLn('Disabling new default modules...');
        for (i in newDefaultDisabledModules) {
            $.inidb.set('modules', newDefaultDisabledModules[i], 'false');
        }

        $.consoleLn('PhantomBot v2.0.8 updates completed!');
        $.inidb.set('updates', 'installedv2.0.8', 'true');
    }

    /** Version 2.0.9 updates */
    if (!$.inidb.exists('updates', 'installedv2.0.9') || $.inidb.get('updates', 'installedv2.0.9') != 'true') {
        $.consoleLn('Starting PhantomBot version 2.0.9 updates...');

        $.consoleLn('Deleting old emotes cache...');
        $.inidb.del('emotescache', 'emotes');

        $.consoleLn('PhantomBot v2.0.9 updates completed!');
        $.inidb.set('updates', 'installedv2.0.9', 'true');
    }

    /** Version 2.1/2.0.10 updates */
    if (!$.inidb.exists('updates', 'installedv2.1.0') || $.inidb.get('updates', 'installedv2.1.0') != 'true') {
        $.consoleLn('Starting PhantomBot version 2.1 updates...');

        $.consoleLn('Aliasing !permission to !group...');
        $.inidb.set('aliases', 'group', 'permission');

        $.consoleLn('Aliasing !permissionpoints to !grouppoints...');
        $.inidb.set('aliases', 'grouppoints', 'permissionpoints');

        $.consoleLn('Aliasing !permissions to !groups...');
        $.inidb.set('aliases', 'groups', 'permissions');

        $.consoleLn('Disabling new modules...');
        $.inidb.set('modules', './games/gambling.js', 'false');

        $.consoleLn('Setting up the new Twitter post delay...');
        $.inidb.set('twitter', 'postdelay_update', 180);

        $.consoleLn('PhantomBot v2.1 updates completed!');
        $.inidb.set('updates', 'installedv2.1.0', 'true');
        $.inidb.set('updates', 'installedNewBot', 'true'); //If bot login is deleted after updates were installed we don't want to reset the modules.
    }

    /** Version 2.2 updates */
    if (!$.inidb.exists('updates', 'installedv2.1.1') || $.inidb.get('updates', 'installedv2.1.1') != 'true') {
        $.consoleLn('Starting PhantomBot v2.2 updates...');

        $.consoleLn('PhantomBot v2.2 updates completed!');
        $.inidb.set('updates', 'installedv2.1.1', 'true');
    }

    /** Version 2.3 updates */
    if (!$.inidb.exists('updates', 'installedv2.3s') || $.inidb.get('updates', 'installedv2.3s') != 'true') {
        $.consoleLn('Starting PhantomBot v2.3 updates...');

        $.consoleLn('Disabling new modules...');
        $.inidb.set('modules', './handlers/bitsHandler.js', 'false');

        $.consoleLn('Setting up new default custom commands...');
        if (!$.inidb.exists('command', 'uptime')) {
            $.inidb.set('command', 'uptime', '(pointtouser) (channelname) has been online for (uptime)');
        }
        if (!$.inidb.exists('command', 'followage')) {
            $.inidb.set('command', 'followage', '(followage)');
        }
        if (!$.inidb.exists('command', 'playtime')) {
            $.inidb.set('command', 'playtime', '(pointtouser) (channelname) has been playing (game) for (playtime)');
        }
        if (!$.inidb.exists('command', 'title')) {
            $.inidb.set('command', 'title', '(pointtouser) (titleinfo)');
        }
        if (!$.inidb.exists('command', 'game')) {
            $.inidb.set('command', 'game', '(pointtouser) (gameinfo)');
        }
        if (!$.inidb.exists('command', 'age')) {
            $.inidb.set('command', 'age', '(age)');
        }
        if ($.inidb.exists('permcom', 'game set')) {
            $.inidb.set('permcom', 'setgame', $.inidb.get('permcom', 'game set'));
        }
        if ($.inidb.exists('permcom', 'title set')) {
            $.inidb.set('permcom', 'settitle', $.inidb.get('permcom', 'title set'));
        }

        $.inidb.del('permcom', 'game set');
        $.inidb.del('permcom', 'title set');

        $.consoleLn('Setting up new toggles...');
        $.inidb.set('adventureSettings', 'warningMessage', true);
        $.inidb.set('adventureSettings', 'enterMessage', true);

        $.consoleLn('PhantomBot v2.3 updates completed!');
        $.inidb.set('updates', 'installedv2.3s', 'true');
    }

    /* version 2.3.3s updates */
    if (!$.inidb.exists('updates', 'installedv2.3.3ss') || $.inidb.get('updates', 'installedv2.3.3ss') != 'true') {
        $.consoleLn('Starting PhantomBot update 2.3.3 updates...');

        $.consoleLn('Deleting the old emotes cache.');
        $.inidb.RemoveFile('emotecache');

        $.consoleLn('Updating raffle settings...');
        if ($.inidb.exists('settings', 'raffleMSGToggle')) {
            $.inidb.set('raffleSettings', 'raffleMSGToggle', $.inidb.get('settings', 'raffleMSGToggle'));
            $.inidb.del('settings', 'raffleMSGToggle');
        }

        if ($.inidb.exists('settings', 'noRepickSame')) {
            $.inidb.set('raffleSettings', 'noRepickSame', $.inidb.get('settings', 'noRepickSame'));
            $.inidb.del('settings', 'noRepickSame');
        }

        if ($.inidb.exists('settings', 'raffleMessage')) {
            $.inidb.set('raffleSettings', 'raffleMessage', $.inidb.get('settings', 'raffleMessage'));
            $.inidb.del('settings', 'raffleMessage');
        }

        if ($.inidb.exists('settings', 'raffleMessageInterval')) {
            $.inidb.set('raffleSettings', 'raffleMessageInterval', $.inidb.get('settings', 'raffleMessageInterval'));
            $.inidb.del('settings', 'raffleMessageInterval');
        }

        if ($.inidb.exists('command', 'uptime') && $.inidb.get('command', 'uptime').equalsIgnoreCase('(@sender) (channelname) has been online for (uptime)')) {
            $.inidb.set('command', 'uptime', '(pointtouser) (channelname) has been online for (uptime)');
        }

        if ($.inidb.exists('command', 'playtime') && $.inidb.get('command', 'playtime').equalsIgnoreCase('(@sender) (channelname) has been playing (game) for (playtime)')) {
            $.inidb.set('command', 'playtime', '(pointtouser) (channelname) has been playing (game) for (playtime)');
        }

        if ($.inidb.exists('command', 'title') && $.inidb.get('command', 'title').equalsIgnoreCase('(@sender) (titleinfo)')) {
            $.inidb.set('command', 'title', '(pointtouser) (titleinfo)');
        }

        if ($.inidb.exists('command', 'game') && $.inidb.get('command', 'game').equalsIgnoreCase('(@sender) (gameinfo)')) {
            $.inidb.set('command', 'game', '(pointtouser) (gameinfo)');
        }


        $.consoleLn('PhantomBot update 2.3.3 completed!');
        $.inidb.set('updates', 'installedv2.3.3ss', 'true');
    }

    /* version 2.3.5 updates */
    if (!$.inidb.exists('updates', 'installedv2.3.5ss') || $.inidb.get('updates', 'installedv2.3.5ss') != 'true') {
        $.consoleLn('Starting PhantomBot update 2.3.5 updates...');

        $.inidb.set('chatModerator', 'moderationLogs', 'false');
        $.inidb.set('modules', './systems/bettingSystem.js', 'false');
        $.inidb.del('modules', './systems/betSystem.js');

        $.consoleLn('Removing old discord settings...');
        $.inidb.RemoveFile('discordSettings');
        $.inidb.RemoveFile('discordKeywords');
        $.inidb.RemoveFile('discordCommands');
        $.inidb.RemoveFile('discordCooldown');
        $.inidb.del('modules', './handlers/discordHandler.js');

        $.consoleLn('Disabling new modules.');
        $.inidb.set('modules', './handlers/tipeeeStreamHandler.js', 'false');

        $.consoleLn('Reloading blacklist and whitelist...');
        var keys = $.inidb.GetKeyList('blackList', ''),
            i;

        for (i = 0; i < keys.length; i++) {
            $.inidb.set('blackList', $.inidb.get('blackList', keys[i]), 'true');
            $.inidb.del('blackList', keys[i]);
        }

        keys = $.inidb.GetKeyList('whiteList', '');

        for (i = 0; i < keys.length; i++) {
            $.inidb.set('whiteList', $.inidb.get('whiteList', keys[i]), 'true');
            $.inidb.del('whiteList', keys[i]);
        }

        $.consoleLn('Updating host settings...');
        $.inidb.set('settings', 'hostToggle', true);

        $.consoleLn('Disabling default discord modules.');
        modules = [
            './discord/handlers/bitsHandler.js',
            './discord/handlers/followHandler.js',
            './discord/handlers/subscribeHandler.js',
            './discord/handlers/streamlabsHandler.js',
            './discord/handlers/tipeeeStreamHandler.js',
            './discord/handlers/hostHandler.js',
            './discord/handlers/twitterHandler.js',
            './discord/handlers/keywordHandler.js',
            './discord/handlers/streamHandler.js',
            './discord/handlers/gamewispHandler.js',
            './discord/systems/greetingsSystem.js',
            './discord/commands/customCommands.js',
            './discord/games/8ball.js',
            './discord/games/kill.js',
            './discord/games/random.js',
            './discord/games/roulette.js'
        ];
        for (i in modules) {
            $.inidb.set('modules', modules[i], 'false');
        }

        $.inidb.set('permcom', 'permission', '1');
        if ($.inidb.exists('permcom', 'group')) {
            $.inidb.set('permcom', 'group', '1');
        }

        $.consoleLn('PhantomBot update 2.3.5 completed!');
        $.inidb.set('updates', 'installedv2.3.5ss', 'true');
    }

    /* version 2.3.5.1 updates */
    if (!$.inidb.exists('updates', 'installedv2.3.5.1') || $.inidb.get('updates', 'installedv2.3.5.1') != 'true') {
        $.consoleLn('Starting PhantomBot update 2.3.5.1 updates...');

        if ($.inidb.exists('aliases', 'points')) {
            $.inidb.del('aliases', 'points');
        }

        if ($.inidb.exists('aliases', 'point')) {
            $.inidb.del('aliases', 'point');
        }

        $.consoleLn('PhantomBot update 2.3.5.1 completed!');
        $.inidb.set('updates', 'installedv2.3.5.1', 'true');
    }

    /* version 2.3.5.2 updates */
    if (!$.inidb.exists('updates', 'installedv2.3.5.2') || $.inidb.get('updates', 'installedv2.3.5.2') != 'true') {
        $.consoleLn('Starting PhantomBot update 2.3.5.2 updates...');

        $.consoleLn('Reloading quotes... Please do not turn off your bot.');
        var keys = $.inidb.GetKeyList('quotes', ''),
            temp = [],
            i;

        for (i in keys) {
            var quote = $.inidb.get('quotes', keys[i]);
            if (quote != null) {
                temp.push(quote);
            }
        }

        $.inidb.RemoveFile('quotes');

        $.inidb.setAutoCommit(false);
        for (i in temp) {
            $.inidb.set('quotes', i, temp[i]);
        }
        $.inidb.setAutoCommit(true);
        $.inidb.SaveAll(true);

        $.inidb.del('modules', './handlers/discordHandler.js');

        $.consoleLn('PhantomBot update 2.3.5.2 completed!');
        $.inidb.set('updates', 'installedv2.3.5.2', 'true');
    }

    /* version 2.3.5.3 updates */
    if (!$.inidb.exists('updates', 'installedv2.3.5.3') || $.inidb.get('updates', 'installedv2.3.5.3') != 'true') {
        $.consoleLn('Starting PhantomBot update 2.3.5.3 updates...');

        if (!$.inidb.exists('settings', 'followDelay') || ($.inidb.exists('settings', 'followDelay') && parseInt($.inidb.get('settings', 'followDelay')) < 5)) {
            $.inidb.set('settings', 'followDelay', 5);
        }

        $.consoleLn('PhantomBot update 2.3.5.3 completed!');
        $.inidb.set('updates', 'installedv2.3.5.3', 'true');
    }

    /* version 2.3.6 updates */
    if (!$.inidb.exists('updates', 'installedv2.3.6') || $.inidb.get('updates', 'installedv2.3.6') != 'true') {
        $.consoleLn('Starting PhantomBot update 2.3.6 updates...');

        $.consoleLn('Disabling default discord modules.');
        $.inidb.set('modules', './discord/games/roll.js', 'false');
        $.inidb.set('modules', './discord/games/slotMachine.js', 'false');
        $.inidb.set('modules', './discord/games/gambling.js', 'false');
        $.inidb.set('modules', './discord/systems/pointSystem.js', 'false');

        $.inidb.set('permcom', $.botName.toLowerCase(), '2');

        $.consoleLn('PhantomBot update 2.3.6 completed!');
        $.inidb.set('updates', 'installedv2.3.6', 'true');
    }

    /* version 2.3.6s updates */
    if (!$.inidb.exists('updates', 'installedv2.3.6ss') || $.inidb.get('updates', 'installedv2.3.6ss') != 'true') {
        $.consoleLn('Starting PhantomBot update 2.3.6s updates...');

        $.inidb.del('cooldown', 'globalCooldownTime');
        $.inidb.del('cooldown', 'modCooldown');
        $.inidb.del('cooldown', 'perUserCooldown');
        $.inidb.del('cooldown', 'globalCooldown');
        $.inidb.del('discordCooldown', 'globalCooldown');
        $.inidb.del('discordCooldown', 'globalCooldownTime');

        var keys = $.inidb.GetKeyList('cooldown', ''),
            seconds,
            i;

        $.consoleLn('Updating cooldowns...');
        for (i in keys) {
            seconds = $.inidb.get('cooldown', keys[i]);
            $.inidb.set('cooldown', keys[i], JSON.stringify({
                command: String(keys[i]),
                seconds: String(seconds),
                isGlobal: 'true'
            }));
        }

        $.consoleLn('Updating Discord cooldowns...');
        for (i in keys) {
            seconds = $.inidb.get('discordCooldown', keys[i]);
            $.inidb.set('discordCooldown', keys[i], JSON.stringify({
                command: String(keys[i]),
                seconds: String(seconds),
                isGlobal: 'true'
            }));
        }

        $.consoleLn('PhantomBot update 2.3.6s completed!');
        $.inidb.set('updates', 'installedv2.3.6ss', 'true');
    }

    /* version 2.3.6b updates */
    if (!$.inidb.exists('updates', 'installedv2.3.6b') || $.inidb.get('updates', 'installedv2.3.6b') != 'true') {
        $.consoleLn('Starting PhantomBot update 2.3.6b updates...');

        $.consoleLn('Fixing uppercase usernames in tables.');

        var keys = $.inidb.GetKeyList('points', ''),
            i;

        $.inidb.setAutoCommit(false);
        for (i in keys) {
            if (keys[i].match(/[A-Z]/)) {
                if ($.inidb.get('points', keys[i]) == null) {
                    $.inidb.del('points', null);
                    continue;
                }
                $.inidb.incr('points', keys[i].toLowerCase(), parseInt($.inidb.get('points', keys[i])));
                $.inidb.del('points', keys[i]);
                $.consoleLn('[points] ' + keys[i] + ' -> ' + keys[i].toLowerCase() + '::' + $.inidb.get('points', keys[i].toLowerCase()));
            } else if (keys[i].match(/[^a-zA-Z0-9_]/)) {
                $.inidb.del('points', keys[i]);
                $.consoleLn('[points] [remove] ' + keys[i]);
            }
        }

        keys = $.inidb.GetKeyList('group', '');

        for (i in keys) {
            if (keys[i].match(/[A-Z]/)) {
                $.inidb.set('group', keys[i].toLowerCase(), $.inidb.get('group', keys[i]));
                $.inidb.del('group', keys[i]);
                $.consoleLn('[permission] ' + keys[i] + ' -> ' + keys[i].toLowerCase() + '::' + $.inidb.get('group', keys[i].toLowerCase()));
            } else if (keys[i].match(/[^a-zA-Z0-9_]/)) {
                $.inidb.del('group', keys[i]);
                $.consoleLn('[permission] [remove] ' + keys[i]);
            }
        }
        $.inidb.setAutoCommit(true);
        $.inidb.SaveAll(true);

        $.consoleLn('PhantomBot update 2.3.6b completed!');
        $.inidb.set('updates', 'installedv2.3.6b', 'true');
    }

    /* version 2.3.7 updates */
    if (!$.inidb.exists('updates', 'installedv2.3.7b') || $.inidb.get('updates', 'installedv2.3.7b') != 'true') {
        $.consoleLn('Starting PhantomBot update 2.3.7 updates...');

        var keys = $.inidb.GetKeyList('blackList', ''),
            timeout = $.getIniDbNumber('chatModerator', 'blacklistTimeoutTime', 600),
            message = $.getIniDbString('chatModerator', 'blacklistMessage', 'you were timed out for using a blacklisted phrase.'),
            messageB = $.getIniDbString('chatModerator', 'silentBlacklistMessage', 'Using a blacklisted word. (Automated by ' + $.botName + ')'),
            obj = {},
            i;

        if ($.getIniDbNumber('chatModerator', 'msgCooldownSecs', 45) == 45) {
            $.inidb.set('chatModerator', 'msgCooldownSecs', 30);
        }

        $.consoleLn('Updating blacklist...');
        for (i in keys) {
            obj = {
                id: String(i),
                timeout: String(timeout),
                isRegex: keys[i].startsWith('regex:'),
                phrase: String(keys[i]),
                isSilent: false,
                excludeRegulars: false,
                excludeSubscribers: false,
                message: String(message),
                banReason: String(messageB)
            };
            $.inidb.set('blackList', keys[i], JSON.stringify(obj));
        }

        $.consoleLn('PhantomBot update 2.3.7 completed!');
        $.inidb.set('updates', 'installedv2.3.7b', 'true');
    }

    /* version 2.3.9 updates */
    if (!$.inidb.exists('updates', 'installedv2.3.9') || $.inidb.get('updates', 'installedv2.3.9') != 'true') {
        $.consoleLn('Starting PhantomBot update 2.3.9 updates...');

        $.consoleLn('Removing old discord handler...');
        $.inidb.del('modules', './handlers/discordHandler.js');

        $.consoleLn('Removing old emotes cache...');
        $.inidb.RemoveFile('emotecache');

        $.inidb.set('modules', './discord/handlers/streamElementsHandler.js', 'false');
        $.inidb.set('modules', './handlers/streamElementsHandler.js', 'false');

        $.consoleLn('PhantomBot update 2.3.9 completed!');
        $.inidb.set('updates', 'installedv2.3.9', 'true');
    }

    /* version 2.3.9.1 updates */
    if (!$.inidb.exists('updates', 'installedv2.3.9.1') || $.inidb.get('updates', 'installedv2.3.9.1') != 'true') {
        $.consoleLn('Starting PhantomBot update 2.3.9.1 updates...');

        $.consoleLn('Updating old variables...');

        if ($.inidb.FileExists('discordSettings')) {
            $.inidb.set('discordSettings', 'gameMessage', '(name) just changed game on Twitch!');
            $.inidb.set('discordSettings', 'onlineMessage', '(name) just went online on Twitch!');
        }

        $.consoleLn('PhantomBot update 2.3.9.1 completed!');
        $.inidb.set('updates', 'installedv2.3.9.1', 'true');
    }

    /* version 2.3.9.1b updates */
    if (!$.inidb.exists('updates', 'installedv2.3.9.1b') || $.inidb.get('updates', 'installedv2.3.9.1b') != 'true') {
        $.consoleLn('Starting PhantomBot update 2.3.9.1b updates...');

        if ($.inidb.FileExists('discordStreamStats')) {
            $.consoleLn('Removing old Discord stats...');
            $.inidb.RemoveFile('discordStreamStats');
        }

        $.consoleLn('PhantomBot update 2.3.9.1b completed!');
        $.inidb.set('updates', 'installedv2.3.9.1b', 'true');
    }

    /* version 2.4.0 updates */
    if (!$.inidb.exists('updates', 'installedv2.4.0') || $.inidb.get('updates', 'installedv2.4.0') != 'true') {
        $.consoleLn('Starting PhantomBot update 2.4.0 updates...');

        if ($.getIniDbNumber('cooldownSettings', 'defaultCooldownTime', 5) < 5) {
            $.inidb.set('cooldownSettings', 'defaultCooldownTime', 5);
        }

        $.consoleLn('Updating keywords...');
        var keys = $.inidb.GetKeyList('keywords', ''),
            keywords = [],
            i;

        for (i in keys) {
            keywords.push({
                key: keys[i],
                res: $.inidb.get('keywords', keys[i])
            });
        }

        $.inidb.RemoveFile('keywords');

        for (i in keywords) {
            try {
                new RegExp('\\b' + keywords[i].key + '\\b');

                $.inidb.set('keywords', 'regex:\\b' + keywords[i].key + '\\b', JSON.stringify({
                    keyword: 'regex:\\b' + keywords[i].key + '\\b',
                    response: keywords[i].res + '',
                    isRegex: true
                }));
                $.inidb.set('coolkey', 'regex:\\b' + keywords[i].key + '\\b', $.getIniDbNumber('coolkey', keywords[i].key, 5));
                $.inidb.del('coolkey', keywords[i].key);
            } catch (e) {
                $.inidb.set('keywords', keywords[i].key, JSON.stringify({
                    keyword: keywords[i].key,
                    response: keywords[i].res + '',
                    isRegex: false
                }));
            }
        }

        $.consoleLn('PhantomBot update 2.4.0 completed!');
        $.inidb.set('updates', 'installedv2.4.0', 'true');
    }

    /* version 2.4.1 updates */
    if (!$.inidb.exists('updates', 'installedv2.4.1') || $.inidb.get('updates', 'installedv2.4.1') != 'true') {
        $.consoleLn('Starting PhantomBot update 2.4.1 updates...');

        $.inidb.del('modules', './systems/raidSystem.js');

        // Remove old raids for the new format.
        $.inidb.RemoveFile('outgoing_raids');

        $.consoleLn('PhantomBot update 2.4.1 completed!');
        $.inidb.set('updates', 'installedv2.4.1', 'true');
    }

    /* version 2.4.2.1 updates */
    if (!$.inidb.exists('updates', 'installedv2.4.2.1') || $.inidb.get('updates', 'installedv2.4.2.1') != 'true') {
        $.consoleLn('Starting PhantomBot update 2.4.2.1 updates...');

        $.inidb.del('modules', './discord/handlers/gamewispHandler.js');
        $.inidb.del('modules', './handlers/gameWispHandler.js');

        $.consoleLn('PhantomBot update 2.4.2.1 completed!');
        $.inidb.set('updates', 'installedv2.4.2.1', 'true');
    }

    /* version 3.0.1 updates */
    if (!$.inidb.exists('updates', 'installedv3.0.1') || $.inidb.get('updates', 'installedv3.0.1') != 'true') {
        $.consoleLn('Starting PhantomBot update 3.0.1 updates...');

        if (!$.hasDiscordToken) {
            while (!$.inidb.exists('discordPermsObj', 'obj')) {
                try {
                    java.lang.Thread.sleep(1000);
                } catch (ex) {
                    $.log.error('Failed to run update as Discord is not yet connected, please restart PhantomBot...');
                    return;
                }
            }

            var discordCommandPermissions = $.inidb.GetKeyList('discordPermcom', '');
            var everyoneRoleID = 0;
            var discordRoles = $.discordAPI.getGuildRoles();

            for (var i = 0; i < discordRoles.size(); i++) {
                if (discordRoles.get(i).getName().equalsIgnoreCase('@everyone')) {
                    everyoneRoleID = discordRoles.get(i).getStringID();
                    break;
                }
            }

            for (var i = 0; i < discordCommandPermissions.length; i++) {
                var permission = $.inidb.get('discordPermcom', discordCommandPermissions[i]);
                var permissionsObj = {
                    'roles': [], // Array of string IDs.
                    'permissions': [] // Array of objects.
                };

                if ((permission + '').equals('0')) {
                    permissionsObj.roles.push(everyoneRoleID + '');
                }

                permissionsObj.permissions.push({
                    'name': 'Administrator',
                    'selected': ((permission + '').equals('1') + '')
                });

                $.inidb.set('discordPermcom', discordCommandPermissions[i], JSON.stringify(permissionsObj));
            }
        }

        $.consoleLn('PhantomBot update 3.0.1 completed!');
        $.inidb.set('updates', 'installedv3.0.1', 'true');
    }

    /* version PhantomBotRU 3.0.1 updates */
    /** if (!$.inidb.exists('updates', 'installedv3.0.1.ru') || $.inidb.get('updates', 'installedv3.0.1.ru') != 'true') {
        * $.consoleLn('Starting PhantomBotRU 3.0.1 updates...');

        * if ($.inidb.exists('command', 'age') && $.inidb.get('command', 'age').equalsIgnoreCase('(age)')) {
            * $.inidb.set('command', 'age', '(age) (adminonlyedit)');
        * }

        * if ($.inidb.exists('command', 'followage') && $.inidb.get('command', 'followage').equalsIgnoreCase('(followage)')) {
            * $.inidb.set('command', 'followage', '(followage) (adminonlyedit)');
        * }

        * if ($.inidb.exists('command', 'game') && $.inidb.get('command', 'game').equalsIgnoreCase('(pointtouser) (gameinfo)')) {
            * $.inidb.set('command', 'game', 'Текущая игра: (gameinfo) (adminonlyedit)');
        * }

        * if ($.inidb.exists('command', 'playtime') && $.inidb.get('command', 'playtime').equalsIgnoreCase('(pointtouser) (channelname) has been playing (game) for (playtime)')) {
            * $.inidb.set('command', 'playtime', 'Стрим (game) идёт (playtime) (adminonlyedit)');
        * }

        * if ($.inidb.exists('command', 'title') && $.inidb.get('command', 'title').equalsIgnoreCase('(pointtouser) (titleinfo)')) {
            * $.inidb.set('command', 'title', 'Текущий заголовок: (titleinfo) (adminonlyedit)');
        * }

        * if ($.inidb.exists('command', 'uptime') && $.inidb.get('command', 'uptime').equalsIgnoreCase('(pointtouser) (channelname) has been online for (uptime)')) {
            * $.inidb.set('command', 'uptime', 'Стрим идёт (uptime) (adminonlyedit)');
        * }

        * $.inidb.set('command', 'viewers', 'Зрителей на канале: (viewers) (adminonlyedit)');
        * $.inidb.set('command', 'followers', 'Фолловеров канала: (follows) (adminonlyedit)');
        * $.inidb.set('command', 'subscribers', 'Подписчиков канала: (subscribers) (adminonlyedit)');
        * $.inidb.set('command', 'lasttip', 'Последний донат: (lasttip) (adminonlyedit)');
        * $.inidb.set('command', 'help', 'Команды чата: !discord, !vk, !instagram, !youtube, !games, !music, !points, !specs, !subscription, !donation, !followage');
        * $.inidb.set('command', 'specs', 'ПК и девайсы стримера: MB <модель>, CPU <модель>, GPU <модель>, RAM <модель>, SSD/SSHD/HDD <модель>, HSF <модель>, PSU <модель>, корпус <модель>, монитор <модель>, клавиатура <модель>, мышь <модель>, микрофон <модель>, наушники <модель>');
        * $.inidb.set('command', 'subscription', 'Подписка на стримера: https://twitch.tv/subs/(channelname)');
        * $.inidb.set('command', 'donation', 'Чаевые стримеру: <ссылка не задана>');
        * $.inidb.set('command', 'discord', 'Стример в Discord: <ссылка не задана>');
        * $.inidb.set('command', 'vk', 'Стример в ВК: <ссылка не задана>');
        * $.inidb.set('command', 'instagram', 'Стример в Instagram: <ссылка не задана>');
        * $.inidb.set('command', 'youtube', 'Стример в YouTube: <ссылка не задана>');
        * $.inidb.set('command', 'music', 'Музыка на стриме: !play – заказ, !list – плейлист, !skip vote – голосование за пропуск трека, !now – текущий трек, !next – следующий трек, !prev – предыдущий трек (только для модераторов: !steal – заимствование трека, !skip – пропуск трека, !volume – громкость) (adminonlyedit)');
        * $.inidb.set('command', 'games', 'Игры чата: !8ball, !kill, !pan, !slap, !love, !iq, !roulette');
        * $.inidb.set('command', 'love', '(sender), любовь между вами и (1=random) по 10-балльной шкале составляет (# 0,11) (adminonlyedit)');
        * $.inidb.set('command', 'pan', '(sender) бьёт сковородой (1=random) и снимает (#)% здоровья (adminonlyedit)');
        * $.inidb.set('command', 'slap', '(sender) даёт пощёчину (1=random) и выбивает зубов (# 1,32) шт. (adminonlyedit)');
        * $.inidb.set('command', 'iq', '(sender), ваш IQ равен (# 2,16)0 (adminonlyedit)');
        * $.inidb.set('command', 'banana', '(sender) заказал(а) танец банана на стриме (alert banana.gif,24) (adminonlyedit)');
        * $.inidb.set('command', 'paycommands', 'Платные команды: (commandcostlist) (adminonlyedit)');

        * $.consoleLn('Setting up new default custom Discord commands...');
        * $.inidb.set('discordCommands', 'viewers', '(embed 255 255 255, Зрителей на канале Twitch: (viewers))');
        * $.inidb.set('discordCommands', 'followers', '(embed 255 255 255, Фолловеров канала Twitch: (follows))');
        * $.inidb.set('discordCommands', 'lasttip', '(embed 255 255 255, Последний донат: (lasttip))');

        * $.consoleLn('Setting up new default aliases...');
        * $.inidb.set('aliases', 'up', 'uptime');
        * $.inidb.set('aliases', 'whenfollow', 'followage');
        * $.inidb.set('aliases', 'followtime', 'followage');
        * $.inidb.set('aliases', 'deaths', 'deathctr');
        * $.inidb.set('aliases', 'wins', 'winctr');
        * $.inidb.set('aliases', 'social', 'vk;instagram;discord');

        * $.inidb.set('aliases', 'play', 'songrequest');
        * $.inidb.set('aliases', 'find', 'findsong');
        * $.inidb.set('aliases', 'steal', 'stealsong');
        * $.inidb.set('aliases', 'wrong', 'wrongsong');
        * $.inidb.set('aliases', 'now', 'currentsong');
        * $.inidb.set('aliases', 'prev', 'previoussong');
        * $.inidb.set('aliases', 'next', 'nextsong');
        * $.inidb.set('aliases', 'skip', 'skipsong');
        * $.inidb.set('aliases', 'jump', 'jumptosong');
        * $.inidb.set('aliases', 'volume', 'ytp volume');

        * $.consoleLn('Deleting obsolete aliases...');
        * $.inidb.del('aliases', 'group');
        * $.inidb.del('aliases', 'grouppoints');
        * $.inidb.del('aliases', 'groups');

        * $.consoleLn('PhantomBotRU 3.0.1 update completed!');
        * $.inidb.set('updates', 'installedv3.0.1.ru', 'true');
    * } */

    /**
     * @function getTableContents
     * @param {string} tableName
     * @returns {Array}
     */
    function getTableContents(tableName) {
        var contents = [],
            keyList = $.inidb.GetKeyList(tableName, ''),
            temp,
            i;

        for (i in keyList) {

            // Handle Exceptions per table
            switch (tableName) {
                // Ignore rows with less than 600 seconds (10 minutes)
                case 'time':
                    temp = parseInt($.inidb.get(tableName, keyList[i]));
                    if (temp >= 600) {
                        contents[keyList[i]] = $.inidb.get(tableName, keyList[i]);
                    }
                    break;

                    // Ignore rows with less than 10 points
                case 'points':
                    temp = parseInt($.inidb.get(tableName, keyList[i]));
                    if (temp >= 10) {
                        contents[keyList[i]] = $.inidb.get(tableName, keyList[i]);
                    }
                    break;

                    // Put the rows in by default
                default:
                    contents[keyList[i]] = $.inidb.get(tableName, keyList[i]);
                    break;
            }
        }

        return contents;
    }

    /**
     * @function setTableContents
     * @param {string} tableName
     * @param {Array} contents
     */
    function restoreTableContents(tableName, contents) {
        var i;

        $.inidb.setAutoCommit(false);
        for (i in contents) {
            $.inidb.set(tableName, i, contents[i]);
        }
        $.inidb.setAutoCommit(true);
        $.inidb.SaveAll(true);
    }
})();
