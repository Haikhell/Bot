const getBuyProduct = require('../helpers/db_function/buy_get');
const Eror = require('../Errors');

module.exports = function(controller) {
  controller.hears([ 'My purchases' ], 'message', async (bot, message) => {
    try {
      let callBack = await getBuyProduct.buyGet(message.user, 1);

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
      bot.reply(message, await Eror(305));
    }
  });
};
