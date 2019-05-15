/*
 * Copyright (C) 2016-2019 phantombot.tv
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

$.lang.register('commercialsystem.usage', 'применение: !commercial (length_secs:30,60,90,120,150,180) [silent] --or-- !commercial autotimer');
$.lang.register('commercialsystem.run', 'запуск рекламы продолжительностью $1 сек');
$.lang.register('commercialsystem.422', 'реклама может быть запущена только на партнёрских каналах во время стрима, продолжительностью 30, 60, 90, 120, 150 или 180 сек, с интервалом не менее 8 мин');
$.lang.register('commercialsystem.autotimer.status-off', 'автоматическая реклама выключена'); // To enable: !commercial autotimer (interval_mins:8 or greater) (length_secs:30,60,90,120,150,180) [текст сообщения]
$.lang.register('commercialsystem.autotimer.status-on', 'включена автоматическая реклама продолжительностью $1 сек и с интервалом $2 мин'); // To disable: !commercial autotimer off --or-- To add/change a message: !commercial autotimer message (message) --or-- To remove message: !commercial autotimer nomessage
$.lang.register('commercialsystem.autotimer.bad-parm', 'продолжительность рекламы может быть только 30, 60, 90, 120, 150 или 180 сек, с интервалом не менее 8 мин');
$.lang.register('commercialsystem.autotimer.status-on-msg', 'The message sent when an auto commercial starts: «$1»');
$.lang.register('commercialsystem.autotimer.status-on-nomsg', 'No message is sent when an auto commercial starts');
$.lang.register('commercialsystem.autotimer.msg-set', 'установлено сообщение при срабатывании автоматической рекламы: «$1»');
$.lang.register('commercialsystem.autotimer.msg-del', 'сообщение при срабатывании автоматической рекламы удалено');