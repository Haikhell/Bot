const getProduct = require('../helpers/api_bestbuy/get_obj_elem');
const Eror = require('../Errors');

module.exports = function(controller) {
  controller.on('message', async (bot, message) => {
    try {
      let tempObj = await getProduct.getProduct(message.message.quick_reply.payload, 1);
      let obj = await getProduct.getPlaginProduct(tempObj, 1, message.message.quick_reply.payload, 0);
      if (obj.length === 0) {
        bot.reply(message, 'Its category is undifiend');
      } else {
        await bot.reply(message, {
          attachment: {
            type: 'template',
            payload: {
              template_type: 'generic',
              elements: obj
            }
          }
        });
      }
    } catch (error) {
      bot.reply(message, Eror(315));
    }
  });
};
