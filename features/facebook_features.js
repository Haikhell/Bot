/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var bby = require('bestbuy')(process.env.BESTBUY_API_TOKEN);

const getAllCategory = require('../helpers/api_bestbuy/get_shop_category');
const Favorites_add = require('../helpers/db/db_function/favorite_add');
const favorite_get = require('../helpers/db/db_function/favorite_get');
const getObj = require('../helpers/api_bestbuy/get_obj_elem');
const buyProduct = require('../helpers/db/db_function/buy_set');
const getBuyProduct = require('../helpers/db/db_function/buy_get');

// async function getCategory(id) {
//   console.log(await id);
//   let data = await bby.categories(`categoryPath.id=${id}`, { show: 'all' });
//   console.log(await data);
// }
async function getCategory(id) {
  return bby.products(`categoryPath.id=${id}`, { show: 'name,url,image,sku,salePrice' }).then(function(data) {
    return data.products[0];
  });
}

module.exports = function(controller) {
  /**
     * Detect when a message has a sticker attached
     */
  controller.hears(async (message) => message.sticker_id, 'message', async (bot, message) => {
    await bot.reply(message, 'Cool sticker.');
  });

  controller.on('facebook_postback', async (bot, message) => {
    if (message.postback.title === 'Next' || message.postback.title === 'Previe') {
      let str = message.postback.payload;
      let tempStr = await str.split('_');
      if (tempStr[0] === 'next') {
        let masiv = await getObj.getProduct(tempStr[2], tempStr[1]);

        let temp = await getObj.getPlaginProduct(masiv, tempStr[1], tempStr[2], 0);
        await bot.reply(message, {
          attachment: {
            type: 'template',
            payload: {
              template_type: 'generic',
              elements: temp
            }
          }
        });
      } else {
        favorite_get.fGet(message.user, tempStr[1]);
      }
    } else if (message.postback.title === 'Favorites') {
      favorite_get.fGet(message.user, 0);
    } else if (message.postback.title === 'Add to favorite') {
      await bot.reply(message, await Favorites_add(message.user, message.text));
    } else if (message.postback.title === 'buy') {
      let callBack = await buyProduct(message.user, 0);
      await bot.reply(message, callBack);
    } else {
      await bot.reply(message, {
        text: 'Here is a menu!',
        composer_input_disabled: false,
        quick_replies: [
          {
            title: 'My purchases ',
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
