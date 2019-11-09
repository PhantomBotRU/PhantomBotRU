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

$.lang.register('streamelements.donation.new', '(name) подарил(а) (amount) (currency) через StreamElements'); // дополнительные теги: (points) и (pointname)
$.lang.register('streamelements.donation.newreward', '(name) подарил(а) (amount) (currency) через StreamElements'); // дополнительные теги: (points) и (pointname)
$.lang.register('streamelements.donations.usage', 'Применение: !streamelements [announce / rewardmultiplier n.n / message / lastmessage]');
$.lang.register('streamelements.donations.announce.disable', 'Tips will no longer be announced.');
$.lang.register('streamelements.donations.announce.enable', 'Tips will now be announced.');
$.lang.register('streamelements.donations.reward.usage', 'Применение: !streamelements rewardmultiplier [n.n]. Set to 0 to disable');
$.lang.register('streamelements.donations.reward.success', 'The reward for tips has been set to $1 $2 per whole amount of currency donated.');
$.lang.register('streamelements.donations.message.usage', 'Применение: !streamelements message [message] Tags: (name) (amount) (currency) (currencysymbol) (message) (formattedamount)');
$.lang.register('streamelements.donations.rewardmessage.usage', 'Применение: !streamelements rewardmessage [message] Tags: (name) (amount) (currency) (reward) (message)');
$.lang.register('streamelements.donations.message.no-name', 'A (name) tag was not provided, at a minimum provide the (name) tag. Tags: (name) (amount) (currency) (message)');
$.lang.register('streamelements.donations.rewardmessage.no-name', 'A (name) tag was not provided, at a minimum provide the (name) tag. Tags: (name) (amount) (currency) (reward) (message)');
$.lang.register('streamelements.donations.message.success', 'Updated the message for tips when rewards are disabled.');
$.lang.register('streamelements.donations.rewardmessage.success', 'Updated the message for tips with rewards enabled.');
$.lang.register('streamelements.donations.lastmessage.success', 'Updates the message for !lasttip command.');
$.lang.register('streamelements.enabled.donators', 'The donators group has been enabled.');
$.lang.register('streamelements.disabled.donators', 'The donators group has been disabled.');
$.lang.register('streamelements.donators.min', 'The minimum before being promoted to a Donator was set to $1');
$.lang.register('streamelements.donators.min.usage', 'Применение: !streamelements minmumbeforepromotion (amount)');
