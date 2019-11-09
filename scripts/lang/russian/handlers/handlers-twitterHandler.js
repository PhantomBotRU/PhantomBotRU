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

$.lang.register('twitter.tweet', 'Твит от @(twitterid): $1');
$.lang.register('twitter.tweet.mention', 'Твит от @$1 из ленты @(twitterid): $2');
$.lang.register('twitter.reward.announcement', '$1 получает $2 за ретвит');
$.lang.register('twitter.usage', 'Применение: !twitter [lasttweet или lastmention или lastretweet или set или post или id]');
$.lang.register('twitter.id', 'Стример в Twitter: https://twitter.com/$2'); // дополнительный тег: $1 – имя стримера в Twitch
$.lang.register('twitter.usage.id', ''); // в оригинале: (все команды: !twitter usage)
$.lang.register('twitter.set.usage', 'Применение: !twitter set [message / polldelay / poll / post / updatetimer / reward]');
$.lang.register('twitter.set.polldelay.usage', 'Применение: !twitter set polldelay [mentions / retweets / hometimeline / usertimeline]');
$.lang.register('twitter.set.polldelay.minerror', 'Too small of a poll delay, minimum is $1 for this setting.');
$.lang.register('twitter.set.polldelay.mentions.usage', 'Применение: !twitter set polldelay mentions [seconds]. Minimum is 60. Currently $1.');
$.lang.register('twitter.set.polldelay.retweets.usage', 'Применение: !twitter set polldelay rewteets [seconds]. Minimum is 60. Currently $1.');
$.lang.register('twitter.set.polldelay.hometimeline.usage', 'Применение: !twitter set polldelay hometimeline [seconds]. Minimum is 60. Currently $1.');
$.lang.register('twitter.set.polldelay.usertimeline.usage', 'Применение: !twitter set polldelay usertimeline [seconds]. Minimum is 15. Currently $1.');
$.lang.register('twitter.set.polldelay.mentions.success', 'Set Twitter polldelay mentions to $1 seconds.');
$.lang.register('twitter.set.polldelay.retweets.success', 'Set Twitter polldelay retweets to $1 seconds.');
$.lang.register('twitter.set.polldelay.hometimeline.success', 'Set Twitter polldelay hometimeline to $1 seconds.');
$.lang.register('twitter.set.polldelay.usertimeline.success', 'Set Twitter polldelay usertimeline to $1 seconds.');
$.lang.register('twitter.set.poll.usage', 'Применение: !twitter set poll [mentions / retweets / hometimeline / usertimeline]');
$.lang.register('twitter.set.poll.mentions.usage', 'Применение: !twitter set poll mentions [on/off]. Currently $1. Polls @mentions from Twitter.');
$.lang.register('twitter.set.poll.retweets.usage', 'Применение: !twitter set poll retweets [on/off]. Currently $1. Polls your Retweets from Twitter.');
$.lang.register('twitter.set.poll.hometimeline.usage', 'Применение: !twitter set poll hometimeline [on/off]. Currently $1. Polls your entire timeline on Twitter, includes all Tweets on your timeline from others. Disables all other polling.');
$.lang.register('twitter.set.poll.usertimeline.usage', 'Применение: !twitter set poll usertimeline [on/off]. Currently $1. Polls your Tweets from Twitter.');
$.lang.register('twitter.set.poll.mentions.success', 'Set Twitter poll mentions to $1.');
$.lang.register('twitter.set.poll.retweets.success', 'Set Twitter poll retweets to $1.');
$.lang.register('twitter.set.poll.hometimeline.success', 'Set Twitter poll hometimeline to $1. Core will no longer poll anything else.');
$.lang.register('twitter.set.poll.usertimeline.success', 'Set Twitter poll usertimeline to $1.');
$.lang.register('twitter.set.post.usage', 'Применение: !twitter set post [online / gamechange / update]');
$.lang.register('twitter.set.post.online.usage', 'Применение: !twitter set post online [on/off]. Currently $1.');
$.lang.register('twitter.set.post.gamechange.usage', 'Применение: !twitter set post gamechange [on/off]. Currently $1.');
$.lang.register('twitter.set.post.update.usage', 'Применение: !twitter set post update [on/off]. Currently $1.');
$.lang.register('twitter.set.post.online.success', 'Set Twitter post online to $1.');
$.lang.register('twitter.set.post.gamechange.success', 'Set Twitter post gamechange to $1.');
$.lang.register('twitter.set.post.update.success', 'Set Twitter post update to $1.');
$.lang.register('twitter.set.message.usage', 'usage; !twitter set message [online / gamechange]');
$.lang.register('twitter.set.message.online.usage', 'Применение: !twitter set message online [message]. Tags: (game) (twitchurl). Currently: $1');
$.lang.register('twitter.set.message.online.success', 'Set Twitter auto-post online message to $1');
$.lang.register('twitter.set.message.gamechange.usage', 'Применение: !twitter set message gamechange [message]. Tags: (game) (twitchurl). Currently: $1');
$.lang.register('twitter.set.message.gamechange.success', 'Set Twitter auto-post game change message to $1');
$.lang.register('twitter.set.message.update.usage', 'Применение: !twitter set message update [message]. Tags: (game) (twitchurl) (uptime). Currently: $1');
$.lang.register('twitter.set.message.update.success', 'Set Twitter auto-post update message to $1');
$.lang.register('twitter.set.updatetimer.usage', 'Применение: !twitter set updatetimer [minutes]. Minimum allowed is 60 minutes to attempt to offset duplicate post rejection from Twitter.');
$.lang.register('twitter.set.updatetimer.toosmall', 'The minimum allowed value is 180 minutes to attempt to offset duplicate post rejection from Twitter.');
$.lang.register('twitter.set.updatetimer.success', 'Set Twitter updatetimer to $1 minutes.');
$.lang.register('twitter.set.reward.usage', 'Применение: !twitter set reward [toggle / points / cooldown / announce]');
$.lang.register('twitter.set.reward.toggle.usage', 'Применение: !twitter set reward toggle [on/off]. Currently $1. Toggle rewards for retweets.');
$.lang.register('twitter.set.reward.toggle.success', 'Set Twitter retweet rewards to $1.');
$.lang.register('twitter.set.reward.points.usage', 'Применение: !twitter set reward points [points]. Currently $1. Set reward amount for rewtweets.');
$.lang.register('twitter.set.reward.points.success', 'Set Twitter retweet reward amount to $1.');
$.lang.register('twitter.set.reward.cooldown.usage', 'Применение: !twitter set reward cooldown [hours]. Currently $1. Hours that user must wait between rewards.');
$.lang.register('twitter.set.reward.cooldown.success', 'Set Twitter retweet reward cooldown to $1 hours.');
$.lang.register('twitter.set.reward.announce.usage', 'Применение: !twitter set reward announce [on/off]. Currently $1. Toggle announcing rewards for retweets.');
$.lang.register('twitter.set.reward.announce.success', 'Set Twitter retweet reward announcements to $1.');
$.lang.register('twitter.post.usage', 'Применение: !twitter post [текст твита]');
$.lang.register('twitter.post.sent', 'В Twitter отправлен твит: $1');
$.lang.register('twitter.post.failed', 'Не удалось отправить твит');
$.lang.register('twitter.lasttweet', 'Последний твит: $1');
$.lang.register('twitter.lasttweet.disabled', 'Not polling Tweets from home or user timeline.');
$.lang.register('twitter.lastmention', 'Последнее упоминание в Twitter: $1');
$.lang.register('twitter.lastmention.disabled', 'Not polling mentions.');
$.lang.register('twitter.lastretweet', 'Последний ретвит: $1');
$.lang.register('twitter.lastretweet.disabled', 'Not polling retweets.');
$.lang.register('twitter.register.usage', 'Применение: !twitter register [twitter_id]. Currently $1. Register/change your Twitter ID.');
$.lang.register('twitter.register.success', 'Registered your Twitter ID as $1. To unregister, run !twitter unregister.');
$.lang.register('twitter.register.notregistered', 'Twitter ID не зарегистрирован');
$.lang.register('twitter.register.inuse', 'Twitter ID $1 уже зарегистрирован');
$.lang.register('twitter.unregister', 'Регистрация Twitter ID сброшена');
