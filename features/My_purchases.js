var getBuyProduct = require('../helpers/db/db_function/buy_get');

module.exports = function(controller) {
  controller.hears([ 'My purchases' ], 'message', async (bot, message) => {
    let callBack = await getBuyProduct.buyGet(message.user, 0);
    await bot.reply(message, {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          elements: callBack
        }
      }
    });
  });
};
