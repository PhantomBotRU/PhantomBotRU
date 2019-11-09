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

$.lang.register('followhandler.check.follows', '$1 отслеживает канал');
$.lang.register('followhandler.check.notfollows', '$1 не отслеживает канал');
$.lang.register('followhandler.check.usage', 'Применение: !checkfollow или !check [имя пользователя]');
$.lang.register('followhandler.follow.message', '(name) начал(а) отслеживать канал'); // Тэги: (reward) – награда
$.lang.register('followhandler.followers', 'пользователей отслеживают канал: $1');
$.lang.register('followhandler.followtrain.mega', 'Мегафолловинг ($1)');
$.lang.register('followhandler.followtrain.penta', 'Квинтофолловинг');
$.lang.register('followhandler.followtrain.quad', 'Квадрофолловинг');
$.lang.register('followhandler.followtrain.triple', 'Тройной фолловинг');
$.lang.register('followhandler.followtrain.ultra', 'Ультрафолловинг ($1)');
$.lang.register('followhandler.followtrain.unbelievable', 'Невероятный паровоз фолловеров ($1)');
$.lang.register('followhandler.set.followmessage.success', 'установлено сообщение о фолловинге: $1');
$.lang.register('followhandler.set.followmessage.usage', 'Применение: !followmessage [сообщение]'); // Тэги: (reward) и (name)
$.lang.register('followhandler.set.followreward.success', 'установлена награда за фолловинг: $1');
$.lang.register('followhandler.set.followreward.usage', 'Применение: !followreward [$1] (сейчас $2)');
$.lang.register('followhandler.shoutout.usage', 'Применение: «!$1» [имя пользователя]');
$.lang.register('followhandler.shoutout.offline', '$1 в последний раз стримил(а) $3 на канале $2');
$.lang.register('followhandler.shoutout.online', '$1 сейчас стримит $3 на канале $2');
$.lang.register('followhandler.shoutout.no.game', 'Канал $1: $2');
$.lang.register('followhandler.followtoggle.on', 'оповещения о новых фолловерах включены');
$.lang.register('followhandler.followtoggle.off', 'оповещения о новых фолловерах выключены');
$.lang.register('followhandler.followtraintoggle.on', 'оповещения о поезде фолловеров включены');
$.lang.register('followhandler.followtraintoggle.off', 'оповещения о поезде фолловеров выключены');
$.lang.register('followhandler.fixfollow.usage', 'Применение: !fixfollow [имя пользователя]');
$.lang.register('followhandler.fixfollow.error', '$1 уже есть в списке фолловеров');
$.lang.register('followhandler.fixfollow.error.404', '$1 не отслеживает этот канал');
$.lang.register('followhandler.fixfollow.added', '$1 добавлен в список фолловеров');
$.lang.register('followhandler.set.followdelay.usage', 'Применение: !followdelay [время в секундах не менее 5]');
$.lang.register('followhandler.set.followdelay.success', 'частота оповещений о фолловинге установлена на $1 сек');
$.lang.register('followhandler.follow.age.err.404', '$2 не отслеживает канал $3'); // дополнительная переменная: $1
$.lang.register('followhandler.follow.age.time.days', '$2 отслеживает канал $3 с $4 ($5 сут)'); // дополнительная переменная: $1
$.lang.register('followhandler.follow.age.time', '$2 отслеживает канал $3 с $4 (менее 1 сут)'); // дополнительная переменная: $1
$.lang.register('followhandler.follow.age.datefmt', 'd MMMM yyyy года');
$.lang.register('followhandler.follow.age.datefmt.404', 'н/д');
