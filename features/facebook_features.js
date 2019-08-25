const Favorites_add = require('../helpers/db_function/favorite_add');
const getObj = require('../helpers/api_bestbuy/get_obj_elem');
const buyProduct = require('../helpers/db_function/buy_set');
const getAllCategory = require('../helpers/api_bestbuy/get_shop_category');
const getFavorites = require('../helpers/db_function/favorite_get');
const getFBuy = require('../helpers/db_function/buy_get');
const findRef = require('../helpers/db_function/find_ref');
const menu = {
  text: 'Here is a menu!',
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
};

module.exports = function(controller) {
  controller.on('facebook_postback', async (bot, message) => {
    if (message.postback.title === 'Next' || message.postback.title === 'Previe') {
      var temp;
      let str = await message.postback.payload;
      let tempStr = await str.split('_');
      if (tempStr[3] === 'favoritesBuy') {
        temp = await getFBuy.buyGet(tempStr[2], tempStr[1]);
      } else if (tempStr[3] === 'favorites') {
        temp = await getFavorites.fGet(tempStr[2], tempStr[1]);
      } else if (tempStr[0] === 'next' || tempStr[0] === 'previe') {
        let masiv = await getObj.getProduct(tempStr[2], tempStr[1]);
        temp = await getObj.getPlaginProduct(masiv, tempStr[1], tempStr[2], tempStr[3]);
      }
      await bot.reply(message, {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'generic',
            elements: temp
          }
        }
      });
    } else if (message.postback.title === 'Cataloge') {
      const categ = await getAllCategory();
      await bot.reply(message, {
        text: 'All shop category',
        quick_replies: categ
      });
    } else if (message.postback.title === 'Add to favorite') {
      await bot.reply(message, await Favorites_add(message.user, message.text));
    } else if (message.postback.title === 'Get Started') {
      let str = await message.postback.referral.ref;
      let tempStr = await str.split('_');
      await findRef.refGet(message.user, tempStr[1]);
      await bot.reply(message, await menu);
    } else if (message.postback.title === 'buy') {
      let callBack = await buyProduct(message.user, message.postback.payload);

      await bot.reply(message, callBack);
    } else {
      await bot.reply(message, await menu);
    }
  });
};
