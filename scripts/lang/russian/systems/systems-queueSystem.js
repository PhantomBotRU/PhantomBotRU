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

$.lang.register('queuesystem.open.error.opened', 'очередь уже открыта');
$.lang.register('queuesystem.open.error.usage', 'Применение: !queue open [количество участников] [название очереди]'); // 0 означает неограниченное количество пользователей
$.lang.register('queuesystem.open.usage', 'применение: !queue open [количество участников] [название очереди]');
$.lang.register('queuesystem.open.error.clear', 'предыдущая очередь не очищена, используйте !queue clear для очистки');
$.lang.register('queuesystem.open.normal', 'Открыта очередь «$1» (для вступления наберите !joinqueue или !joinqueue [игровое имя])');
$.lang.register('queuesystem.open.limit', 'Открыта очередь «$2» с максимальным допустимым количеством участников $1 чел. (для вступления наберите !joinqueue или !joinqueue [игровое имя])');
$.lang.register('queuesystem.close.error', 'открытой очереди нет');
$.lang.register('queuesystem.close.success', 'Очередь закрыта');
$.lang.register('queuesystem.clear.success', 'Очередь очищена');
$.lang.register('queuesystem.join.error.joined', 'вы уже в очереди');
$.lang.register('queuesystem.join.error.full', 'мест в очереди больше нет');
$.lang.register('queuesystem.remove.usage', 'применение: !queue remove [пользователь]');
$.lang.register('queuesystem.remove.404', 'указанный пользователь не найден в очереди');
$.lang.register('queuesystem.remove.removed', 'пользователь $1 удалён из очереди');
$.lang.register('queuesystem.info.success', 'Информация о текущей очереди «$1»: открыта $4, количество участников – $2, максимум участников – $3');
$.lang.register('queuesystem.time.info', '($1 назад)');
$.lang.register('queuesystem.position.self', 'вы №$1 в очереди с $2');
$.lang.register('queuesystem.position.self.error', 'вас нет в очереди');
$.lang.register('queuesystem.position.other', 'пользователь $1 №$2 в очереди с $3');
$.lang.register('queuesystem.position.other.error', 'пользователя $1 нет в очереди');
$.lang.register('queuesystem.queue.list', 'Текущий список участников: $1');
$.lang.register('queuesystem.queue.list.limited', 'Текущий список участников: $1 (антиспам +$2)');
$.lang.register('queuesystem.queue.list.empty', 'очередь пуста');
$.lang.register('queuesystem.queue.next', 'оставшиеся участники для выбора: $1');
$.lang.register('queuesystem.gamertag', '(игровое имя $1)');
$.lang.register('queuesystem.pick', 'Выбранные из очереди пользователи: $1');
$.lang.register('queuesystem.usage', 'применение: !queue [open / close / clear / next / list / pick / position / info]');
