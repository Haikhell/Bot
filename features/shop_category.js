const getAllCategory = require('../helpers/api_bestbuy/get_shop_category');

module.exports = function(controller) {
  controller.hears([ 'Shop' ], 'message', async (bot, message) => {
    const categ = await getAllCategory();
    await bot.reply(message, {
      text: 'All shop category',
      quick_replies: categ
    });
  });
};
