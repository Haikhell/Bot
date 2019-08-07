/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

module.exports = function(controller) {
  /**
     * Detect when a message has a sticker attached
     */
  controller.hears(async (message) => message.sticker_id, 'message', async (bot, message) => {
    await bot.reply(message, 'Cool sticker.');
  });

  controller.on('facebook_postback', async (bot, message) => {
    if (message.text === 'Cataloge') {
      await bot.reply(message, 'catalog');
    } else if (message.text === 'Add to favorite') {
    } else {
      await bot.reply(message, {
        text: 'Here is a menu!',
        composer_input_disabled: false,
        quick_replies: [
          {
            title: 'My purchases',
            payload: '123'
          },
          {
            title: 'Shop',
            payload: 'Shop'
          },
          {
            title: 'Favorites',
            payload: 'Favorites'
          },
          {
            title: 'To invite a friend',
            payload: 'To invite a friend'
          }
        ]
      });
    }
  });
};
