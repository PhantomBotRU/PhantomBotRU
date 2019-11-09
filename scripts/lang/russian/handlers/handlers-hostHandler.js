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

$.lang.register('hosthandler.host.message', '(name) захостил(а) канал на (viewers) зрителей');
$.lang.register('hosthandler.autohost.message', '(name) заавтохостил(а) канал на (viewers) зрителей'); // дополнительные теги: (viewers)
$.lang.register('hosthandler.deprecated', 'Due to Twitch issues with the API, this command is deprecated');
$.lang.register('hosthandler.newhost', 'Спасибо за хост, $1');
$.lang.register('hosthandler.newhost.reward', 'Thanks for the host $1! You\'re rewarded $2 for being awesome');
$.lang.register('hosthandler.set.hostmessage.success', 'установлено новое сообщение о хосте');
$.lang.register('hosthandler.set.hostmessage.usage', 'Применение: !hostmessage (message) - Tags: (name) (reward)');
$.lang.register('hosthandler.set.hostreward.success', 'установлена новая награда за хост: $1');
$.lang.register('hosthandler.set.hostreward.usage', 'Применение: !hostreward [$1]');
$.lang.register('hosthandler.set.autohostreward.success', 'установлена новая награда за автохост: $1');
$.lang.register('hosthandler.set.autohostreward.usage', 'Применение: !autohostreward [$1]');
$.lang.register('hosthandler.set.autohostmessage.success', 'установлено новое сообщение об автохосте');
$.lang.register('hosthandler.set.autohostmessage.usage', 'Применение: !autohostmessage (message)'); // дополнительные теги: (name)
$.lang.register('hosthandler.set.hostrewardminviewers.success', 'A minimum of $1 viewers are required to provide a hosting reward');
$.lang.register('hosthandler.set.hostrewardminviewers.usage', 'Применение: !hostrewardminviewers [count]');
$.lang.register('hosthandler.set.hostminviewers.success', 'A minimum of $1 viewers are required to provide a hosting alert');
$.lang.register('hosthandler.set.hostminviewers.usage', 'Применение: !hostminviewers [число зрителей] (сейчас $1)');
$.lang.register('hosthistory.usage', 'Применение: !hosthistory [on / off] (сейчас $1)');
$.lang.register('hosthistory.change', 'запись истории хостов $1');
$.lang.register('hosthandler.host.usage', 'Применение: !host [имя канала]');
$.lang.register('hosthandler.host.toggle', 'оповещения о хостах $1');
$.lang.register('hosthandler.auto.host.toggle', 'оповещения об автохостах $1');
