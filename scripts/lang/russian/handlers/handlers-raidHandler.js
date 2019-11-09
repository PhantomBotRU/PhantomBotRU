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

$.lang.register('raidhandler.применение', 'применение: !raid [пользователь] или !raid [toggle / lookup / setreward / setincomingmessage / setnewincomingmessage / setoutgoingmessage / setoutgoingmessagespam]');
$.lang.register('raidhandler.toggle.enabled', 'включены оповещения о рейдах');
$.lang.register('raidhandler.toggle.disabled', 'выключены оповещения о рейдах');
$.lang.register('raidhandler.reward.применение', 'применение: !raid setreward [поинты]');
$.lang.register('raidhandler.reward.set', 'вознаграждение за рейд установлено на $1');
$.lang.register('raidhandler.inc.message.применение', 'применение: !raid setincomingmessage [сообщение]'); // доступные теги: (username), (viewers), (url), (times) и (game)
$.lang.register('raidhandler.inc.message.set', 'Successfully updated the incoming raid message!');
$.lang.register('raidhandler.new.inc.message.применение', 'применение: !raid setnewincomingmessage [message] - Variables: (username), (viewers), (url), and (game)');
$.lang.register('raidhandler.new.inc.message.set', 'Successfully updated the new incoming raid message!');
$.lang.register('raidhandler.out.message.применение', 'применение: !raid setoutgoingmessage [message] - Variables (username) and (url)');
$.lang.register('raidhandler.out.message.set', 'Successfully updated the outgoing raid message!');
$.lang.register('raidhandler.spam.amount.применение', 'применение: !raid setoutgoingmessagespam [amount] - Maximum is 10 times.');
$.lang.register('raidhandler.spam.amount.set', 'Successfully updated the outgoing raid spam amount!');
$.lang.register('raidhandler.lookup.применение', 'применение: !raid lookup [username]');
$.lang.register('raidhandler.lookup.user', '$1 has raided this channel a total of $2 time(s). Their last raid was on $3 with $4 viewers.');
$.lang.register('raidhandler.lookup.user.404', '$1 ещё не рейдил канал');
