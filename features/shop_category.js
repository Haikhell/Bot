const getAllCategory = require('../api_bestbuy/get_shop_category');

module.exports = function(controller) {
  controller.hears([ 'Shop' ], 'message', async (bot, message) => {
    const categ = await getAllCategory();

    await bot.reply(message, {
      text: '...',
      quick_replies: categ
    });
  });
};
