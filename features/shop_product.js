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
      // console.log('+-+-+');
      // console.log(a);
      console.log(message.text);
      var b = await getElem.getCategory(message.text);
      // myFunc();
      console.log(b);
      const mas = await getElem.getObjElem(b);
      console.log(mas);
      //      var mas = getObjElem(a);

      await bot.reply(message, {
        attachment: {
          type: 'template',
          payload: {
            template_type: 'generic',
            elements: mas
          }
        }
      });
    }
  );
};
