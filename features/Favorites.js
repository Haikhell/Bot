const getFavorites = require('../helpers/db_function/favorite_get');
const Eror = require('../Errors');
module.exports = function(controller) {
  controller.hears('Favorites', 'message', async (bot, message) => {
    const tempObj = await getFavorites.fGet(message.user, 0);
    if (tempObj.length <= 0) {
      await bot.reply(message, Eror(310));
    } else {
      await bot.reply(message, {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'generic',
            elements: tempObj
          }
        }
      });
    }
  });
};
