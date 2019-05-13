$.lang.register('donationhandler.donation.new', '(name) подарил(а) (amount) (currency) через Streamlabs'); // дополнительные теги: (points) и (pointname)
$.lang.register('donationhandler.donation.newreward', '(name) подарил(а) (amount) (currency) через Streamlabs'); // дополнительные теги: (points) и (pointname)
$.lang.register('donationhandler.lastdonation.no-donations', 'There are presently no tips.');
$.lang.register('donationhandler.lastdonation.404', 'Cannot find last tip!');
$.lang.register('donationhandler.lastdonation.success', 'The last tip was from (name) in the amount of $(amount) (currency).');
$.lang.register('donationhandler.donations.usage', 'Применение: !streamlabs (announce / rewardmultiplier n.n / message / lastmessage / currencycode)');
$.lang.register('donationhandler.donations.announce.disable', 'Tips will no longer be announced.');
$.lang.register('donationhandler.donations.announce.enable', 'Tips will now be announced.');
$.lang.register('donationhandler.donations.reward.usage', 'Применение: !streamlabs rewardmultiplier [n.n]  Set to 0 to disable');
$.lang.register('donationhandler.donations.reward.success', 'The reward for tips has been set to $1 $2 per whole amount of currency donated.');
$.lang.register('donationhandler.donations.message.usage', 'Применение: !streamlabs message [message] Tags: (name) (amount) (currency) (message)');
$.lang.register('donationhandler.donations.rewardmessage.usage', 'Применение: !streamlabs rewardmessage [message] Tags: (name) (amount) (currency) (points) (pointname) (message)');
$.lang.register('donationhandler.donations.message.no-name', 'A (name) tag was not provided, at a minimum provide the (name) tag. Tags: (name) (amount) (currency) (message)');
$.lang.register('donationhandler.donations.rewardmessage.no-name', 'A (name) tag was not provided, at a minimum provide the (name) tag. Tags: (name) (amount) (currency) (points) (pointname) (message)');
$.lang.register('donationhandler.donations.message.success', 'Updated the message for tips when rewards are disabled.');
$.lang.register('donationhandler.donations.rewardmessage.success', 'Updated the message for tips with rewards enabled.');
$.lang.register('donationhandler.enabled.donators', 'The donators group has been enabled.');
$.lang.register('donationhandler.disabled.donators', 'The donators group has been disabled.');
$.lang.register('donationhandler.donators.min', 'The minimum before being promoted to a Donator was set to $1');
$.lang.register('donationhandler.donators.min.usage', 'Применение: !streamlabs minmumbeforepromotion [amount]');
$.lang.register('donationhandler.streamlabs.currencycode.usage', 'Применение: !streamlabs currencycode [code] - You can find a valid list here: https://streamlabs.readme.io/docs/currency-codes');
$.lang.register('donationhandler.streamlabs.currencycode.success', 'The currency code for Streamlabs donations is now set to: $1');
$.lang.register('donationhandler.streamlabs.currencycode.success-erase', 'The currency code for Streamlabs donations has been removed, all donations will now appear in their original currency');
