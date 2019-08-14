var getElem = require('../api_bestbuy/get_obj_elem');

module.exports = function(controller) {
  controller.hears(
    [
      'Gift Ideas',
      'TV & Home Theater',
      'TVs',
      'All Flat-Screen TVs',
      'TV/DVD Combos',
      'Blu-ray & DVD Players',
      'Blu-ray Players',
      'DVD Players',
      'Digital TV Tuners & Converters',
      'TV & Internet Service Providers'
    ],
    'message',
    async (bot, message) => {
      var temp = await getElem.getCategory(message.message.quick_reply.payload);
      const mas = await getElem.getObjElement(temp);
      const obj = await getElem.getPagin(mas, 0);
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
  );
};
