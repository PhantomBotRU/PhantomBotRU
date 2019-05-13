/**
 * random.js
 *
 * A command that randomly picks a random message from the the randoms stack and post it in the chat.
 */
(function() {
    var pg13toggle = $.getSetIniDbBoolean('randomSettings', 'pg13toggle', false),
        randomsCount = 0,
        lastRandom = 0,
        randomsPG13Count = 0,
        lastPG13Random = 0;

    /**
     * @event webPanelSocketUpdate
     */
    $.bind('webPanelSocketUpdate', function(event) {
        if (event.getScript().equalsIgnoreCase('./games/random.js')) {
            pg13toggle = $.getIniDbBoolean('randomSettings', 'pg13toggle');
        }
    });

    /**
     * @function loadResponses
     */
    function loadResponses() {
        var i;
        for (i = 1; $.lang.exists('randomcommand.' + i); i++) {
            randomsCount++;
        }
        for (i = 1; $.lang.exists('randomcommand.pg13.' + i); i++) {
            randomsPG13Count++;
        }
        $.consoleDebug($.lang.get('randomcommand.console.loaded', (randomsCount + randomsPG13Count)));
    };

    /**
     * @event command
     */
    $.bind('command', function(event) {
        var command = event.getCommand(),
            args = event.getArgs(),
            doPG13Random = false,
            rand;

        /**
         * @commandpath random - Something random will happen
         * @commandpath random pg13toggle - Toggle PG-13 mode on and off
         */
        if (command.equalsIgnoreCase('random')) {
            if (args[0] !== undefined) {
                if (args[0].equalsIgnoreCase('pg13toggle')) {
                    pg13toggle = !pg13toggle;
                    $.setIniDbBoolean('randomSettings', 'pg13toggle', pg13toggle);
                    $.say($.lang.get('randomcommand.pg13toggle', pg13toggle));
                    return;
                }
            }

            if (pg13toggle) {
                if ($.randRange(1, 100) > 80) {
                    doPG13Random = true;
                }
            }

            if (doPG13Random) {
                do {
                    rand = $.randRange(1, randomsPG13Count);
                } while (rand == lastPG13Random);

                lastPG13Random = rand;
                $.say($.tags(event, $.lang.get('randomcommand.pg13.' + rand), false));
                return;
            }

            do {
                rand = $.randRange(1, randomsCount);
            } while (rand == lastRandom);

            lastRandom = rand;
            $.say($.tags(event, $.lang.get('randomcommand.' + rand), false));
        }
    });

    /**
     * @event initReady
     */
    $.bind('initReady', function() {
        if (randomsCount == 0) {
            loadResponses();
        }

        $.registerChatCommand('./games/random.js', 'random');
        $.registerChatSubcommand('random', 'pg13toggle', 1);
    });
})();
