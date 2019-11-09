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
 * Script  : clipHandler.js
 * Purpose : Configures the automatic display of clips in chat and captures the events from Twitch.
 */
(function() {
    var toggle = $.getSetIniDbBoolean('clipsSettings', 'toggle', true),
        message = $.getSetIniDbString('clipsSettings', 'message', '(name) сделал(а) клип: (url)');

    /*
     * @function reloadClips
     */
    function reloadClips() {
        toggle = $.getIniDbBoolean('clipsSettings', 'toggle', true);
        message = $.getIniDbString('clipsSettings', 'message', '(name) сделал(а) клип: (url)');
    }

    /*
     * @event twitchClip
     */
    $.bind('twitchClip', function(event) {
        var creator = event.getCreator(),
            url = event.getClipURL(),
            s = message;

        /* Even though the Core won't even query the API if this is false, we still check here. */
        if (toggle === false) {
            return;
        }

        if (s.match(/\(name\)/g)) {
            s = $.replace(s, '(name)', creator);
        }

        if (s.match(/\(url\)/g)) {
            s = $.replace(s, '(url)', url);
        }

        /*
        * This is the beginning of custom code.
        */
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

        $.say(s);
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
         * @commandpath clipstoggle - Toggles the clips announcements.
         */
        if (command.equalsIgnoreCase('clipstoggle')) {
            toggle = !toggle;
            $.setIniDbBoolean('clipsSettings', 'toggle', toggle);
            $.say($.whisperPrefix(sender) + (toggle ? $.lang.get('cliphandler.toggle.on') : $.lang.get('cliphandler.toggle.off')));
        }

        /*
         * @commandpath clipsmessage - Sets a message for when someone creates a clip.
         */
        if (command.equalsIgnoreCase('clipsmessage')) {
            if (action === undefined) {
                $.say($.whisperPrefix(sender) + $.lang.get('cliphandler.message.usage'));
                return;
            }

            message = argsString;
            $.setIniDbString('clipsSettings', 'message', message);
            $.say($.whisperPrefix(sender) + $.lang.get('cliphandler.message.set', message));
        }

        /*
         * @commandpath lastclip - Displays information about the last clip captured.
         */
        if (command.equalsIgnoreCase('lastclip')) {
            var url = $.getIniDbString('streamInfo', 'last_clip_url', $.lang.get('cliphandler.noclip'));
            $.say($.whisperPrefix(sender) + $.lang.get('cliphandler.lastclip', url));
        }

        /*
         * @commandpath topclip - Displays the top clip from the past day.
         */
        if (command.equalsIgnoreCase('topclip')) {
            var url = $.getIniDbString('streamInfo', 'most_viewed_clip_url', $.lang.get('cliphandler.noclip'));
            $.say($.whisperPrefix(sender) + $.lang.get('cliphandler.topclip', url));
        }
    });

    /*
     * @event initReady
     */
    $.bind('initReady', function() {
        $.registerChatCommand('./handlers/clipHandler.js', 'clipstoggle', 1);
        $.registerChatCommand('./handlers/clipHandler.js', 'clipsmessage', 1);
        $.registerChatCommand('./handlers/clipHandler.js', 'lastclip', 7);
        $.registerChatCommand('./handlers/clipHandler.js', 'topclip', 7);
    });

    $.reloadClips = reloadClips;
})();
