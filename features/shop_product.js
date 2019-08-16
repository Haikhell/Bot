var getElem = require('../helpers/api_bestbuy/get_obj_elem');
module.exports = function(controller) {
  controller.hears(
    [
      'Gift Ideas',
      'TV & Home Theater',
      'Audio',
      'Musical Instruments',
      'Car Electronics & GPS',
      'Cameras & Camcorders',
      'Computers & Tablets',
      'Movies & Music',
      'Video Games',
      'Cell Phones',
      'Appliances'
    ],
    'message',
    async (bot, message) => {
      let temp = await getElem.getCategory(message.message.quick_reply.payload);
      let quick_reply_buttons = await getElem.getButtonsCategory(temp, 0, message.message.quick_reply.payload);
      await bot.reply(message, {
        text: ' Sub categori',
        quick_replies: quick_reply_buttons
      });
    }
  );
};
