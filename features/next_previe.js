const getElem = require('../helpers/api_bestbuy/get_obj_elem');

module.exports = function(controller) {
  controller.hears([ 'Next', 'Previe' ], 'message', async (bot, message) => {
    let str = message.message.quick_reply.payload;
    let tempRes = await str.split('_');
    let page = tempRes[1];
    let temp = await getElem.getCategory(tempRes[2]);
    var quick_reply_buttons = await getElem.getButtonsCategory(temp, page, tempRes[2]);
    await bot.reply(message, {
      text: ' Sub categori',
      quick_replies: quick_reply_buttons
    });
  });
};
