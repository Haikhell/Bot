var bby = require('bestbuy')('TGp7jkZIbKOzfRTDzkofjo2O ');
function a() {
  bby.categories('name=Sony DSLR Camera*', { show: 'path' }).then(function(data) {
    // The util package is loaded to print the complete object structure
    // console.log(require('util').inspect(data, false, null));
  });
  var z = 'pcmcat111900050004';
  bby.products(`categoryPath.id=${z}`, { show: 'all' }).then(function(data) {
    console.log('_@#!_@+#)!@+#!@+#!)@+_#)!@+#');
    console.log(data);
  });
}

const askTemplate = (text) => {
  return {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'button',
        text: text,
        buttons: [
          {
            type: 'postback',
            title: 'Cats',
            payload: 'CAT_PICS'
          },
          {
            type: 'postback',
            title: 'Dogs',
            payload: 'DOG_PICS'
          }
        ]
      }
    }
  };
};

module.exports = function(controller) {
  controller.hears([ 'Favorites' ], 'message', async (bot, message) => {
    a();
    await bot.reply(message, {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          elements: [
            {
              title: 'Welcome!',
              image_url: 'https://img.bbystatic.com/BestBuy_US/images/products/5624/5624056_sa.jpg',
              subtitle: 'We have the right hat for everyone.',

              buttons: [
                {
                  type: 'web_url',
                  url: 'https://petersfancybrownhats.com',
                  title: 'View Website'
                },
                {
                  type: 'postback',
                  title: 'Start Chatting',
                  payload: 'DEVELOPER_DEFINED_PAYLOAD'
                }
              ]
            },
            {
              title: 'Welcome!',
              image_url: 'https://petersfancybrownhats.com/company_image.png',
              subtitle: 'We have the right hat for everyone.',
              default_action: {
                type: 'web_url',
                url: 'https://petersfancybrownhats.com/view?item=103',
                webview_height_ratio: 'tall'
              },

              buttons: [
                {
                  type: 'web_url',
                  url: 'https://petersfancybrownhats.com',
                  title: 'View Website'
                },
                {
                  type: 'postback',
                  title: 'Start Chatting',
                  payload: 'DEVELOPER_DEFINED_PAYLOAD'
                }
              ]
            }
          ]
        }
      }
    });
  });
};
