/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const getAllCategory = require('../api_bestbuy/get_shop_category');
const Favorites_add = require('../helper/favorite_add');
const getObj = require('../api_bestbuy/get_obj_elem');
module.exports = function(controller) {
  /**
     * Detect when a message has a sticker attached
     */
  controller.hears(async (message) => message.sticker_id, 'message', async (bot, message) => {
    await bot.reply(message, 'Cool sticker.');
  });

  controller.on('facebook_postback', async (bot, message) => {
    if (message.text === 'Cataloge') {
    } else if (message.postback.title === 'Add to favorite') {
      await bot.reply(message, await Favorites_add(message.user, message.text));
    } else if (message.postback.title === 'next') {
      console.log(message);
      Favorites_add(message.user, message.text);
    } else {
      await bot.reply(message, {
        text: 'Here is a menu!',
        composer_input_disabled: false,
        quick_replies: [
          {
            title: 'My purchases',
            payload: 'My purchases'
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
