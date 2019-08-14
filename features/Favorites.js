var getFavorites = require('../helper/favorite_get');

module.exports = function(controller) {
  controller.hears([ 'Favorites' ], 'message', async (bot, message) => {
    const tempObj = await getFavorites.fGet(message.user);
    await bot.reply(message, {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          elements: tempObj
        }
      }
    });
  });
};
