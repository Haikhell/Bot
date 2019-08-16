const getFavorites = require('../helpers/db_function/favorite_get');
const Eror = require('../../Bot/Errors');
module.exports = function(controller) {
  controller.hears([ 'Favorites' ], 'message', async (bot, message) => {
    try {
      const tempObj = await getFavorites.fGet(message.user, 0);
      await bot.reply(message, {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'generic',
            elements: tempObj
          }
        }
      });
    } catch (error) {
      Eror();
    }
  });
};
