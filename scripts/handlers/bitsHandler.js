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
 * This script is for announcing bits from Twitch, and rewarding the user with points if the caster wants too.
 *
 */
(function() {
    var toggle = $.getSetIniDbBoolean('bitsSettings', 'toggle', true),
        message = $.getSetIniDbString('bitsSettings', 'message', '(name) поддержал(а) (amount) битами'),
        minimum = $.getSetIniDbNumber('bitsSettings', 'minimum', 1),
        announceBits = false;

    /*
     * @function reloadBits
     */
    function reloadBits() {
        toggle = $.getIniDbBoolean('bitsSettings', 'toggle', true);
        message = $.getIniDbString('bitsSettings', 'message', '(name) поддержал(а) (amount) битами');
        minimum = $.getIniDbNumber('bitsSettings', 'minimum', 1);
    }

    /*
     * @event twitchBits
     */
    $.bind('twitchBits', function(event) {
        var username = event.getUsername(),
            bits = event.getBits(),
            ircMessage = event.getMessage(),
            emoteRegexStr = $.twitch.GetCheerEmotesRegex(),
            s = message;

        if (announceBits === false || toggle === false) {
            return;
        }

        if (bits % 100 == 11) {
            s = $.replace(s, 'битов', 'битов'),
            s = $.replace(s, 'битами', 'битами');
        }

        if (bits % 10 == 1) {
            s = $.replace(s, 'битов', 'бит'),
            s = $.replace(s, 'битами', 'битом');
        }

        if (bits % 100 >= 12 && bits % 100 <= 14) {
            s = $.replace(s, 'битов', 'битов'),
            s = $.replace(s, 'битами', 'битами');
        }

        if (bits % 10 >= 2 && bits % 10 <= 4) {
            s = $.replace(s, 'битов', 'бита'),
            s = $.replace(s, 'битами', 'битами');
        }

        if (s.match(/\(name\)/g)) {
            s = $.replace(s, '(name)', username);
        }

        if (s.match(/\(amount\)/g)) {
            s = $.replace(s, '(amount)', bits);
        }
 
        if (s.match(/\(message\)/g)) {
            s = $.replace(s, '(message)', ircMessage);
            if (emoteRegexStr.length() > 0) {
                emoteRegex = new RegExp(emoteRegexStr, 'gi');
                s = String(s).valueOf();
                s = s.replace(emoteRegex, '');
            }
        }

        /*
        * This is the beginning of custom code.
        */
        if (s.match(/\(alert [,.\w\W]+\)/g)) {
            var filename = s.match(/\(alert ([,.\w\W]+)\)/)[1];
            $.panelsocketserver.alertImage(filename);
            s = (s + '').replace(/\(alert [,.\w\W]+\)/, '');
        }

        if (s.match(/\(readfile/)) {
            if (s.search(/\((readfile ([^)]+)\))/g) >= 0) {
                s = $.replace(s, '(' + RegExp.$1, $.readFile('./addons/' + RegExp.$2)[0]);
            }
        }

        if (s.match(/\(runcode/)) {
            var code = s.match(/\(runcode (.*)\)/)[1];

            try {
                eval(code);
            } catch (ex) {
                $.log.error('Failed to run custom code: ' + ex.s);
            }
            return null;
        }

        if (s.match('\n')) {
            var splitMessage = s.split('\n');

            for (var i = 0; i < splitMessage.length && i <= 4; ++i) {
                $.say(splitMessage[i]);
            }
            return null;
        }
        /*
        * This is the end of custom code.
        */

        if (bits >= minimum) {
            $.say(s);
        }

        $.writeToFile(username + ' ', './addons/bitsHandler/latestCheer.txt', false);
        $.writeToFile(username + ': ' + bits + ' ', './addons/bitsHandler/latestCheer&Bits.txt', false);
    });

    /*
     * @event command
     */
    $.bind('command', function(event) {
        var sender = event.getSender(),
            command = event.getCommand(),
            args = event.getArgs(),
            argsString = event.getArguments(),
            action = args[0];

        /*
         * @commandpath bitstoggle - Toggles the bits announcements.
         */
        if (command.equalsIgnoreCase('bitstoggle')) {
            toggle = !toggle;
            $.setIniDbBoolean('bitsSettings', 'toggle', toggle);
            $.say($.whisperPrefix(sender) + (toggle ? $.lang.get('bitshandler.toggle.on') : $.lang.get('bitshandler.toggle.off')))
        }


        /*
         * @commandpath bitsmessage - Sets a message for when someone cheers bits.
         */
        if (command.equalsIgnoreCase('bitsmessage')) {
            if (action === undefined) {
                $.say($.whisperPrefix(sender) + $.lang.get('bitshandler.message.usage'));
                return;
            }

            message = argsString;
            $.setIniDbString('bitsSettings', 'message', message);
            $.say($.whisperPrefix(sender) + $.lang.get('bitshandler.message.set', message));
        }

        /*
         * @commandpath bitsminimum - Set how many bits someone needs to cheer before announcing it.
         */
        if (command.equalsIgnoreCase('bitsminimum')) {
            if (isNaN(parseInt(action))) {
                $.say($.whisperPrefix(sender) + $.lang.get('bitshandler.minimum.usage'));
                return;
            }

            minimum = parseInt(action);
            $.setIniDbNumber('bitsSettings', 'minimum', minimum);
            $.say($.whisperPrefix(sender) + $.lang.get('bitshandler.minimum.set', minimum));
            $.log.event(sender + ' changed the bits minimum to: ' + minimum + ' bits.');
        }
    });

    /*
     * @event initReady
     */
    $.bind('initReady', function() {
        $.registerChatCommand('./handlers/bitsHandler.js', 'bitstoggle', 1);
        $.registerChatCommand('./handlers/bitsHandler.js', 'bitsmessage', 1);
        $.registerChatCommand('./handlers/bitsHandler.js', 'bitsminimum', 1);
        announceBits = true;
    });

    $.reloadBits = reloadBits;
})();
