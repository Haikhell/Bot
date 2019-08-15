/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const getProduct = require('../helpers/api_bestbuy/get_obj_elem');
module.exports = function(controller) {
  controller.on('message', async (bot, message) => {
    let tempObj = await getProduct.getProduct(message.message.quick_reply.payload, 1);
    let obj = await getProduct.getPlaginProduct(tempObj, 1, message.message.quick_reply.payload, 0);
    await bot.reply(message, {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          elements: obj
        }
      }
    });
  });
};
