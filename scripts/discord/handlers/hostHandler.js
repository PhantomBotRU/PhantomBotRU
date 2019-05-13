/**
 * This module is to handle hosts notifications.
 */
(function() {
    var toggle = $.getSetIniDbBoolean('discordSettings', 'hostToggle', false),
        hostMessage = $.getSetIniDbString('discordSettings', 'hostMessage', 'от [(name)](https://twitch.tv/(name)) на (viewers) зрителей'),
        autoHostMessage = $.getSetIniDbString('discordSettings', 'autohostMessage', 'от [(name)](https://twitch.tv/(name)) на (viewers) зрителей'),
        channelName = $.getSetIniDbString('discordSettings', 'hostChannel', ''),
        hosters = {},
        announce = false;

    /**
     * @event webPanelSocketUpdate
     */
    $.bind('webPanelSocketUpdate', function(event) {
        if (event.getScript().equalsIgnoreCase('./discord/handlers/hostHandler.js')) {
            toggle = $.getIniDbBoolean('discordSettings', 'hostToggle', false);
            hostMessage = $.getIniDbString('discordSettings', 'hostMessage', 'от [(name)](https://twitch.tv/(name)) на (viewers) зрителей');
            autoHostMessage = $.getIniDbString('discordSettings', 'autohostMessage', 'от [(name)](https://twitch.tv/(name)) на (viewers) зрителей');
            channelName = $.getIniDbString('discordSettings', 'hostChannel', '');
        }
    });

    /**
     * @event twitchHostsInitialized
     */
    $.bind('twitchHostsInitialized', function(event) {
        announce = true;
    });

    /**
     * @event twitchAutoHosted
     */
    $.bind('twitchAutoHosted', function(event) {
        var hoster = event.getHoster(),
            viewers = parseInt(event.getUsers()),
            now = $.systemTime(),
            s = autoHostMessage;

        if (toggle === false || announce === false || channelName == '') {
            return;
        }

        if (hosters[hoster] !== undefined) {
            if (hosters[hoster].time > now) {
                return;
            }
            hosters[hoster].time = now + 216e5;
        } else {
            hosters[hoster] = {};
            hosters[hoster].time = now + 216e5;
        }

        if (viewers % 100 == 11) {
            s = $.replace(s, 'зрителей', 'зрителей'),
            s = $.replace(s, 'зрителями', 'зрителями');
        }

        if (viewers % 10 == 1) {
            s = $.replace(s, 'зрителей', 'зритель'),
            s = $.replace(s, 'зрителями', 'зрителем');
        }

        if (viewers % 100 >= 12 && viewers % 100 <= 14) {
            s = $.replace(s, 'зрителей', 'зрителей');
        }

        if (viewers % 10 >= 2 && viewers % 10 <= 4) {
            s = $.replace(s, 'зрителей', 'зрителя');
        }

        if (s.match(/\(name\)/g)) {
            s = $.replace(s, '(name)', hoster);
        }

        if (s.match(/\(viewers\)/g)) {
            s = $.replace(s, '(viewers)', String(viewers));
        }

        $.discordAPI.sendMessageEmbed(channelName, new Packages.sx.blah.discord.util.EmbedBuilder()
                    .withColor(255, 0, 0)
                    .withThumbnail('https://raw.githubusercontent.com/PhantomBot/Miscellaneous/master/Discord-Embed-Icons/host-embed-icon.png')
                    .withTitle($.lang.get('discord.hosthandler.auto.host.embedtitle'))
                    .appendDescription(s)
                    .withTimestamp(Date.now())
                    .withFooterText('Twitch')
                    .withFooterIcon($.twitchcache.getLogoLink()).build());
    });

    /**
     * @event twitchHosted
     */
    $.bind('twitchHosted', function(event) {
        var hoster = event.getHoster(),
            viewers = parseInt(event.getUsers()),
            now = $.systemTime(),
            s = hostMessage;

        if (announce === false || toggle === false || channelName == '') {
            return;
        }

        if (hosters[hoster] !== undefined) {
            if (hosters[hoster].time > now) {
                return;
            }
            hosters[hoster].time = now + 216e5;
        } else {
            hosters[hoster] = {};
            hosters[hoster].time = now + 216e5;
        }

        if (viewers % 100 == 11) {
            s = $.replace(s, 'зрителей', 'зрителей'),
            s = $.replace(s, 'зрителями', 'зрителями');
        }

        if (viewers % 10 == 1) {
            s = $.replace(s, 'зрителей', 'зритель'),
            s = $.replace(s, 'зрителями', 'зрителем');
        }

        if (viewers % 100 >= 12 && viewers % 100 <= 14) {
            s = $.replace(s, 'зрителей', 'зрителей');
        }

        if (viewers % 10 >= 2 && viewers % 10 <= 4) {
            s = $.replace(s, 'зрителей', 'зрителя');
        }

        if (s.match(/\(name\)/g)) {
            s = $.replace(s, '(name)', hoster);
        }

        if (s.match(/\(viewers\)/g)) {
            s = $.replace(s, '(viewers)', String(viewers));
        }

        $.discordAPI.sendMessageEmbed(channelName, new Packages.sx.blah.discord.util.EmbedBuilder()
                    .withColor(255, 0, 0)
                    .withThumbnail('https://raw.githubusercontent.com/PhantomBot/Miscellaneous/master/Discord-Embed-Icons/host-embed-icon.png')
                    .withTitle($.lang.get('discord.hosthandler.host.embedtitle'))
                    .appendDescription(s)
                    .withTimestamp(Date.now())
                    .withFooterText('Twitch')
                    .withFooterIcon($.twitchcache.getLogoLink()).build());
    });

    /**
     * @event discordChannelCommand
     */
    $.bind('discordChannelCommand', function(event) {
        var sender = event.getSender(),
            channel = event.getDiscordChannel(),
            command = event.getCommand(),
            mention = event.getMention(),
            arguments = event.getArguments(),
            args = event.getArgs(),
            action = args[0],
            subAction = args[1];

        if (command.equalsIgnoreCase('hosthandler')) {
            if (action === undefined) {
                $.discord.say(channel, $.discord.userPrefix(mention) + $.lang.get('discord.hosthandler.usage'));
                return;
            }

            /**
             * @discordcommandpath hosthandler toggle - Toggles the hosts announcements.
             */
            if (action.equalsIgnoreCase('toggle')) {
                toggle = !toggle;
                $.inidb.set('discordSettings', 'hostToggle', toggle);
                $.discord.say(channel, $.discord.userPrefix(mention) + $.lang.get('discord.hosthandler.host.toggle', (toggle === true ? $.lang.get('common.enabled') : $.lang.get('common.disabled'))));
            }

            /**
             * @discordcommandpath hosthandler hostmessage [message] - Sets the host announcement message.
             */
            if (action.equalsIgnoreCase('hostmessage')) {
                if (subAction === undefined) {
                    $.discord.say(channel, $.discord.userPrefix(mention) + $.lang.get('discord.hosthandler.host.message.usage'));
                    return;
                }

                hostMessage = args.slice(1).join(' ');
                $.inidb.set('discordSettings', 'hostMessage', hostMessage);
                $.discord.say(channel, $.discord.userPrefix(mention) + $.lang.get('discord.hosthandler.host.message.set', hostMessage));
            }

            /**
             * @discordcommandpath hosthandler hostmessage [message] - Sets the auto-host announcement message.
             */
            if (action.equalsIgnoreCase('autohostmessage')) {
                if (subAction === undefined) {
                    $.discord.say(channel, $.discord.userPrefix(mention) + $.lang.get('discord.hosthandler.autohost.message.usage'));
                    return;
                }

                autoHostMessage = args.slice(1).join(' ');
                $.inidb.set('discordSettings', 'autohostMessage', autohostMessage);
                $.discord.say(channel, $.discord.userPrefix(mention) + $.lang.get('discord.hosthandler.autohost.message.set', autoHostMessage));
            }

            /**
             * @discordcommandpath hosthandler channel [channel name] - Sets the channel that announcements from this module will be said in.
             */
            if (action.equalsIgnoreCase('channel')) {
                if (subAction === undefined) {
                    $.discord.say(channel, $.discord.userPrefix(mention) + $.lang.get('discord.hosthandler.channel.usage'));
                    return;
                }

                channelName = subAction.replace('#', '').toLowerCase();
                $.inidb.set('discordSettings', 'hostChannel', channelName);
                $.discord.say(channel, $.discord.userPrefix(mention) + $.lang.get('discord.hosthandler.channel.set', channelName));
            }
        }
    });

    /**
     * @event initReady
     */
    $.bind('initReady', function() {
        $.discord.registerCommand('./discord/handlers/hostHandler.js', 'hosthandler', 1);
        $.discord.registerSubCommand('hosthandler', 'toggle', 1);
        $.discord.registerSubCommand('hosthandler', 'hostmessage', 1);
        $.discord.registerSubCommand('hosthandler', 'autohostmessage', 1);
        $.discord.registerSubCommand('hosthandler', 'channel', 1);
    });
})();