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

/*
 * deathCounter.js
 *
 * A death counter.
 */

(function() {
    /*
     * @function deathUpdateFile
     *
     * @param {String} game
     */
    function deathUpdateFile(game) {
        var deathFile = './addons/deathctr/deathctr.txt',
            deathCounter = parseInt($.inidb.get('deaths', game));

        if (!$.isDirectory('./addons/deathctr/')) {
            $.mkDir('./addons/deathctr');
        }
        if (isNaN(deathCounter)) {
            deathCounter = 0;
        }

        $.writeToFile(deathCounter.toFixed(0), deathFile, false);
    }

    /*
     * @function winUpdateFile
     *
     * @param {String} game
     */
    function winUpdateFile(game) {
        var winFile = './addons/deathctr/winctr.txt',
            winCounter = parseInt($.inidb.get('wins', game));

        if (!$.isDirectory('./addons/deathctr/')) {
            $.mkDir('./addons/deathctr');
        }
        if (isNaN(winCounter)) {
            winCounter = 0;
        }

        $.writeToFile(winCounter.toFixed(0), winFile, false);
    }

    /*
     * @event command
     */
    $.bind('command', function(event) {
        var sender = event.getSender(),
            command = event.getCommand(),
            args = event.getArgs(),
            action = args[0],
            game = ($.getGame($.channelName) != '' ? $.getGame($.channelName) : 'Some Game');

        /*
         * @commandpath deathctr - Display the current number of deaths in game being played.
         */
        if (command.equalsIgnoreCase('deathctr')) {
            var deathCounter = parseInt($.inidb.get('deaths', game));
            var noDeathExists = isNaN(parseInt(deathCounter)) || parseInt(deathCounter) === 0 ? (deathCounter = 0, true) : (false);
            if (action === undefined) {
                if (noDeathExists) {
                    $.say($.lang.get('deathcounter.none', $.ownerName, game));
                } else {
                    $.say($.lang.get('deathcounter.counter', $.ownerName, game, deathCounter));
                }
            } else {
                /*
                 * @commandpath deathctr reset - Reset the death counter for the game being played.
                 */
                if (action.equalsIgnoreCase('reset')) {
                    if (noDeathExists) {
                        $.say($.whisperPrefix(sender) + $.lang.get('deathcounter.reset-nil', game));
                    } else {
                        $.say($.whisperPrefix(sender) + $.lang.get('deathcounter.reset', game, deathCounter));
                        $.inidb.set('deaths', game, 0);
                        $.deathUpdateFile(game);
                    }
                    return;
                }

                /*
                 * @commandpath deathctr set [number] - Set the death counter for the game being played.
                 */
                if (action.equalsIgnoreCase('set')) {
                    if (isNaN(parseInt(args[1]))) {
                        $.say($.whisperPrefix(sender) + $.lang.get('deathcounter.set-error'));
                        return;
                    } else {
                        var setDeath = parseInt(args[1]);
                        $.say($.whisperPrefix(sender) + $.lang.get('deathcounter.set-success', game, setDeath));
                        $.inidb.set('deaths', game, setDeath);
                        $.deathUpdateFile(game);
                        return;
                    }
                }

                /*
                 * @commandpath deathctr incr - Add one to the death counter for the game being played.
                 */
                if (action.equalsIgnoreCase('add') || action.equalsIgnoreCase('incr') || action.equalsIgnoreCase('+')) {

                    $.say($.lang.get('deathcounter.add-success', $.ownerName, game, ($.inidb.exists('deaths', game) ? (parseInt($.inidb.get('deaths', game)) + 1) : 1)));
                    $.inidb.incr('deaths', game, 1);
                    $.deathUpdateFile(game);
                    return;
                }

                /*
                 * @commandpath deathctr decr - Subtract one from the death counter for the game being played.
                 */
                if (action.equalsIgnoreCase('sub') || action.equalsIgnoreCase('decr') || action.equalsIgnoreCase('-')) {
                    if (isNaN(parseInt($.inidb.get('deaths', game))) || parseInt($.inidb.get('deaths', game)) === 0) {
                        $.say($.lang.get('deathcounter.sub-zero', game));
                        return;
                    }

                    $.say($.lang.get('deathcounter.sub-success', game, ($.inidb.exists('deaths', game) ? (parseInt($.inidb.get('deaths', game)) - 1) : 0)));
                    $.inidb.decr('deaths', game, 1);
                    $.deathUpdateFile(game);
                    return;
                }
            }
        }

        /*
         * @commandpath winctr - Display the current number of wins in game being played.
         */
        if (command.equalsIgnoreCase('winctr')) {
            var winCounter = parseInt($.inidb.get('wins', game));
            var noWinExists = isNaN(parseInt(winCounter)) || parseInt(winCounter) === 0 ? (winCounter = 0, true) : (false);
            if (action === undefined) {
                if (noWinExists) {
                    $.say($.lang.get('wincounter.none', $.ownerName, game));
                } else {
                    $.say($.lang.get('wincounter.counter', $.ownerName, game, winCounter));
                }
            } else {
                /*
                 * @commandpath winctr reset - Reset the win counter for the game being played.
                 */
                if (action.equalsIgnoreCase('reset')) {
                    if (noWinExists) {
                        $.say($.whisperPrefix(sender) + $.lang.get('wincounter.reset-nil', game));
                    } else {
                        $.say($.whisperPrefix(sender) + $.lang.get('wincounter.reset', game, winCounter));
                        $.inidb.set('wins', game, 0);
                        $.winUpdateFile(game);
                    }
                    return;
                }

                /*
                 * @commandpath winctr set [number] - Set the win counter for the game being played.
                 */
                if (action.equalsIgnoreCase('set')) {
                    if (isNaN(parseInt(args[1]))) {
                        $.say($.whisperPrefix(sender) + $.lang.get('wincounter.set-error'));
                        return;
                    } else {
                        var setWin = parseInt(args[1]);
                        $.say($.whisperPrefix(sender) + $.lang.get('wincounter.set-success', game, setWin));
                        $.inidb.set('wins', game, setWin);
                        $.winUpdateFile(game);
                        return;
                    }
                }

                /*
                 * @commandpath winctr incr - Add one to the win counter for the game being played.
                 */
                if (action.equalsIgnoreCase('add') || action.equalsIgnoreCase('incr') || action.equalsIgnoreCase('+')) {

                    $.say($.lang.get('wincounter.add-success', $.ownerName, game, ($.inidb.exists('wins', game) ? (parseInt($.inidb.get('wins', game)) + 1) : 1)));
                    $.inidb.incr('wins', game, 1);
                    $.winUpdateFile(game);
                    return;
                }

                /*
                 * @commandpath winctr decr - Subtract one from the win counter for the game being played.
                 */
                if (action.equalsIgnoreCase('sub') || action.equalsIgnoreCase('decr') || action.equalsIgnoreCase('-')) {
                    if (isNaN(parseInt($.inidb.get('wins', game))) || parseInt($.inidb.get('wins', game)) === 0) {
                        $.say($.lang.get('wincounter.sub-zero', game));
                        return;
                    }

                    $.say($.lang.get('wincounter.sub-success', game, ($.inidb.exists('wins', game) ? (parseInt($.inidb.get('wins', game)) - 1) : 0)));
                    $.inidb.decr('wins', game, 1);
                    $.winUpdateFile(game);
                    return;
                }
            }
        }

    });

    /*
     * @event initReady
     */
    $.bind('initReady', function() {
        $.registerChatCommand('./commands/deathctrCommand.js', 'deathctr', 7);
        $.registerChatCommand('./commands/deathctrCommand.js', 'winctr', 7);

        $.registerChatSubcommand('deathctr', 'reset', 2);
        $.registerChatSubcommand('deathctr', 'set', 2);
        $.registerChatSubcommand('deathctr', 'add', 2);
        $.registerChatSubcommand('deathctr', 'incr', 2);
        $.registerChatSubcommand('deathctr', '+', 2);
        $.registerChatSubcommand('deathctr', 'sub', 2);
        $.registerChatSubcommand('deathctr', 'decr', 2);
        $.registerChatSubcommand('deathctr', '-', 2);

        $.registerChatSubcommand('winctr', 'reset', 2);
        $.registerChatSubcommand('winctr', 'set', 2);
        $.registerChatSubcommand('winctr', 'add', 2);
        $.registerChatSubcommand('winctr', 'incr', 2);
        $.registerChatSubcommand('winctr', '+', 2);
        $.registerChatSubcommand('winctr', 'sub', 2);
        $.registerChatSubcommand('winctr', 'decr', 2);
        $.registerChatSubcommand('winctr', '-', 2);

        setInterval(function() {
            deathUpdateFile(($.getGame($.channelName) != '' ? $.getGame($.channelName) : 'Some Game'));
            winUpdateFile(($.getGame($.channelName) != '' ? $.getGame($.channelName) : 'Some Game'));
        }, 10000);
    });

    /*
     * Export functions to API
     */
    $.deathUpdateFile = deathUpdateFile;
    $.winUpdateFile = winUpdateFile;
})();
