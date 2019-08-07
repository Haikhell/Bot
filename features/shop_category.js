const shopFunc = require('../api_bestbuy/get_shop_category');

module.exports = function(controller) {
  controller.hears([ 'Shop' ], 'message', async (bot, message) => {
    const categ = await shopFunc();

    await bot.reply(message, {
      text: '...',
      quick_replies: categ
    });
  });
};
