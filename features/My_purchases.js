var getBuyProduct = require('../helpers/db_function/buy_get');

module.exports = function(controller) {
  controller.hears([ 'My purchases' ], 'message', async (bot, message) => {
    try {
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
    } catch (error) {
      bot.reply(message, 'You have not made purchases your list is empty');
    }
  });
};
