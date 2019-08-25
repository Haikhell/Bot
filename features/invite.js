const ref = require('../helpers/db_function/ref_get');

http: module.exports = function(controller) {
  controller.hears('To invite a friend', 'message', async (bot, message) => {
    const refs = await ref.refGet(message.user);
    await bot.reply(message, {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'generic',
          elements: [
            {
              title: 'Referral link',
              subtitle: 'Invite your friends',
              image_url:
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvKqR6By8KYNW_92Q-kdPd2Bn-Ol7Y12VQXmStx29aZiaTCkXnwg',
              buttons: [
                {
                  type: 'element_share',
                  share_contents: {
                    attachment: {
                      type: 'template',
                      payload: {
                        template_type: 'generic',
                        elements: [
                          {
                            title: 'Use cool chat bot',
                            subtitle: 'Connect to new cool bot,Shop bestbuy',
                            image_url:
                              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvKqR6By8KYNW_92Q-kdPd2Bn-Ol7Y12VQXmStx29aZiaTCkXnwg',
                            default_action: {
                              type: 'web_url',
                              url: `http://m.me/732890700500236?${refs}`
                            },
                            buttons: [
                              {
                                type: 'web_url',
                                url: `http://m.me/732890700500236?${refs}`,
                                title: 'Use'
                              }
                            ]
                          }
                        ]
                      }
                    }
                  }
                }
              ]
            }
          ]
        }
      }
    });
  });
};
