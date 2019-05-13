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

$.lang.register('ticketrafflesystem.err.raffle.opened', 'лотерея уже проводится');
$.lang.register('ticketrafflesystem.err.missing.syntax', 'применение: !traffle open [максимальное количество билетов] [кратность для регуляра (по умолчанию 1)] [кратность для подписчика (по умолчанию 1)] [стоимость билета в поинтах] [-followers]');
$.lang.register('ticketrafflesystem.msg.need.to.be.following', '(только для фолловеров)');
$.lang.register('ticketrafflesystem.raffle.opened', 'Стартовала лотерея, для участия наберите !tickets [количество билетов не более $1] $3'); // $2 – стоимость билета (пока не работает)
$.lang.register('ticketrafflesystem.err.raffle.not.opened', 'лотерея сейчас не проводится');
$.lang.register('ticketrafflesystem.raffle.closed', 'Лотерея завершена, ожидаем выбора победителя');
$.lang.register('ticketrafflesystem.raffle.close.err', 'Лотерея завершена, никто не принял участие');
$.lang.register('ticketrafflesystem.winner', 'Победителем лотереи стал $1 $2');
$.lang.register('ticketrafflesystem.only.buy.amount', 'максимум билетов на одного пользователя: $1');
$.lang.register('ticketrafflesystem.limit.hit', 'максимум билетов на одного пользователя: $1');
$.lang.register('ticketrafflesystem.err.not.following', 'в лотерее участвуют только фолловеры');
$.lang.register('ticketrafflesystem.err.points', 'у вас недостаточно $1 для участия в лотерее');
$.lang.register('ticketrafflesystem.entered', 'Билетов участвуют в лотерее: $1 из $2 доступных');
$.lang.register('ticketrafflesystem.usage', 'применение: !traffle open [максимальное количество билетов] [кратность для регуляра (по умолчанию 1)] [кратность для подписчика (по умолчанию 1)] [стоимость билета в поинтах] [-followers]');
$.lang.register('ticketrafflesystem.msg.enabled', 'автопубликация сообщения о проводимой лотерее включено');
$.lang.register('ticketrafflesystem.msg.disabled', 'автопубликация сообщения о проводимой лотерее выключено');
$.lang.register('ticketrafflesystem.ticket.usage', 'применение: !tickets [количество билетов] (всего куплено вами билетов: $1)');
$.lang.register('ticketrafflesystem.auto.msginterval.set', 'интервал между автопубликациями сообщения о проводимой лотерее установлен на $1 мин');
$.lang.register('ticketrafflesystem.auto.msg.set', 'установлено сообщение о проводимой лотерее: «$1»');
$.lang.register('ticketrafflesystem.auto.msg.usage', 'применение: !traffle autoannouncemessage [количество минут]');
$.lang.register('ticketrafflesystem.auto.msginterval.usage', 'применение: !traffle autoannounceinterval [количество минут]');
$.lang.register('ticketrafflesystem.reset', 'лотерея сброшена без выбора победителя');