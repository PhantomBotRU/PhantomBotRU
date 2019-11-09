/*
 * Copyright (C) 2016-2019 phantom.bot
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

$.lang.register('rafflesystem.open.error.opened', 'розыгрыш уже проводится');
$.lang.register('rafflesystem.open.usage', 'применение: !raffle open [-usetime количество минут / -usepoints количество поинтов] [ключевое слово] [продолжительность в минутах] [-followers / -subscribers]');
$.lang.register('rafflesystem.open.time', 'Стартовал розыгрыш, для участия наберите «$1» (только для пользователей со стажем от $2 мин на канале) $3 $4');
$.lang.register('rafflesystem.open.points', 'Стартовал розыгрыш, для участия наберите «$1» (плата за участие: $2) $3');
$.lang.register('rafflesystem.open', 'Стартовал розыгрыш, для участия наберите «$1» $2'); // $3
$.lang.register('rafflesystem.close.error.closed', 'розыгрыш сейчас не проводится');
$.lang.register('rafflesystem.close.success', 'Розыгрыш завершён, ожидаем выбора победителя');
$.lang.register('rafflesystem.winner', 'Победителем лотереи стал $1 $2');
$.lang.register('rafflesystem.whisper.winner', 'вы победили в розыгрыше на канале $1');
$.lang.register('rafflesystem.repick.error', 'в розыгрыше больше нет участников');
$.lang.register('rafflesystem.enter.404', 'вы уже принимаете участие в розыгрыше');
$.lang.register('rafflesystem.enter.following', '(только для фолловеров)');
$.lang.register('rafflesystem.enter.subscriber', '(только для подписчиков)');
$.lang.register('rafflesystem.enter.points', 'у вас недостаточно $1 для участия в розыгрыше');
$.lang.register('rafflesystem.enter.time', 'у вас недостаточно стажа на канале для участия в розыгрыше');
$.lang.register('rafflesystem.usage', 'применение: !raffle [open / close / draw / results / subscriberbonus/ regularbonus / whisperwinner]');
$.lang.register('rafflesystem.results', 'Проводится розыгрыш, для участия наберите «$1» (участников сейчас: $2)');
$.lang.register('rafflesystem.fee', '(стоимость участия: $1)');
$.lang.register('rafflesystem.subbonus.usage', 'применение: !raffle subscriberbonus [1-10]');
$.lang.register('rafflesystem.subbonus.set', 'умножение количества приобретённых подписчиком билетов установлено на x$1');
$.lang.register('rafflesystem.regbonus.usage', 'применение: !raffle regularbonus [1-10]');
$.lang.register('rafflesystem.regbonus.set', 'умножение количества приобретённых регуляром билетов установлено на x$1');
$.lang.register('rafflesystem.whisper.winner.toggle', 'победители розыгрыша $1 будут оповещаться в личные сообщения');
$.lang.register('rafflesystem.raffle.repick.toggle1', 'участники больше не смогут многократно побеждать в одном розыгрыше');
$.lang.register('rafflesystem.raffle.repick.toggle2', 'участники теперь могут многократно побеждать в одном розыгрыше');
$.lang.register('rafflesystem.message.usage', 'применение: !raffle message [сообщение]');
$.lang.register('rafflesystem.message.set', 'установлено сообщение о проводимом розыгрыше: «$1»');
$.lang.register('rafflesystem.timer.usage', 'применение: !raffle messagetimer [количество минут]');
$.lang.register('rafflesystem.timer.set', 'интервал между автопубликациями сообщения о проводимом розыгрыше установлен на $1 мин');
$.lang.register('rafflesystem.common.following', '(только для фолловеров)');
$.lang.register('rafflesystem.common.timer', 'розыгрыш завершится через $1 мин');
$.lang.register('rafflesystem.common.message', 'больше не');
$.lang.register('rafflesystem.open.keyword-exists', 'ключевое слово не может быть существующей командой или псевдонимом $1');
$.lang.register('rafflesystem.winner.404', 'невозможно выбрать победителя розыгрыша, никто не принял участие');
$.lang.register('rafflesystem.isfollowing', '(фолловер)');
$.lang.register('rafflesystem.isnotfollowing', '(не фолловер)');
$.lang.register('rafflesystem.reset', 'розыгрыш сброшен без выбора победителя');
