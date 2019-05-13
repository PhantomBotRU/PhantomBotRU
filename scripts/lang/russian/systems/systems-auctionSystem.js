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

$.lang.register('auctionsystem.usage', 'применение: !auction open [шаг в поинтах] [минимальная ставка в поинтах] [продолжительность в секундах]');
$.lang.register('auctionsystem.err.opened', 'аукцион уже проводится');
$.lang.register('auctionsystem.opened', 'Стартовал аукцион с минимальной ставкой $2 и шагом $1, для участия наберите !bid [ставка в поинтах]');
$.lang.register('auctionsystem.auto.timer.msg', 'Аукцион завершится через $1 сек');
$.lang.register('auctionsystem.err.closed', 'аукцион сейчас не проводится');
$.lang.register('auctionsystem.err.no.bids', 'Аукцион завершён без принятых ставок');
$.lang.register('auctionsystem.closed', 'Аукцион завершён, победителем стал(а) $1 со ставкой $2');
$.lang.register('auctionsystem.warn.force', 'Аукцион скоро завершится, максимальная ставка на данный момент составляет $2 от $1, кто предложит $3?');
$.lang.register('auctionsystem.warn', 'максимальная ставка на данный момент составляет $2 от $1');
$.lang.register('auctionsystem.bid.usage', 'применение: !bid [ставка в поинтах]');
$.lang.register('auctionsystem.err.bid.minimum', 'минимальная ставка в текущем аукционе составляет $1');
$.lang.register('auctionsystem.err.points', 'у вас недостаточно $1 для участия в аукционе');
$.lang.register('auctionsystem.err.increments', 'минимальный шаг в текущем аукционе составляет $1');
$.lang.register('auctionsystem.bid', '$1 предложил(а) $2, кто предложит $3?');
