var bby = require('bestbuy')(process.env.BESTBUY_API_TOKEN);
/// get Product
async function getProduct(id) {
  return bby.products(`categoryPath.id=${id}`, { show: 'name,url,image,sku,salePrice' }).then(function(data) {
    return data;
  });
}

module.exports.getCategory = async function getCategory(name) {
  return bby.categories(`name=${name}`, { show: 'all' }).then(function(data) {
    console.log(data);
    return data.categories[0].path;
  });
};

///get all elemets category
// module.exports.getObjElem = async function getObjElem(masiv) {
//   let elements = [];
//   for (let index = 0; index < masiv.length; index++) {
//     var data = await getProduct(masiv[index].id);
//     console.log(data);
//     for (let i = 0; i < data.products.length; i++) {
//       elements.push({
//         title: data.products[i].name,
//         image_url: data.products[i].image,
//         subtitle: `Price ${data.products[i].salePrice}`,
//         buttons: [
//           {
//             type: 'web_url',
//             url: data.products[i].url,
//             title: 'Details'
//           },
//           {
//             type: 'postback',
//             title: 'Add to favorite',
//             payload: data.products[i].productId
//           }
//         ]
//       });
//     }
//   }
//   return elements;
// };

///get all elemets category
module.exports.getObjElement = async function getObjElement(masiv) {
  let elements = [];
  for (let index = 0; index < masiv.length; index++) {
    var data = await getProduct(masiv[index].id);
    for (let i = 0; i < data.products.length; i++) {
      elements.push({
        name: data.products[i].name,
        sku: data.products[i].sku,
        image_url: data.products[i].image,
        price: data.products[i].salePrice,
        url: data.products[i].url
      });
    }
  }
  return elements;
};
module.exports.getPagin = async function getPagin(masiv, n) {
  let tempMasiv = [];
  let count;
  if (masiv.length <= 8) {
    count = masiv.length;
  } else {
    count = 8;
  }
  for (let i = 0; i < count; i++) {
    tempMasiv.push({
      title: masiv[i].name,
      image_url: masiv[i].image_url,
      subtitle: `Price ${masiv[i].price}`,
      buttons: await buttonFormate(masiv[i], n)
    });
  }
  return tempMasiv;
};
// module.exports.categoryObj = async function getPagin(masiv) {
//   let tempMasiv = [];
//   console.log('its masiv');
//   if (masiv.length <= 8) {
//     n = masiv.length;
//   } else {
//     n = 8;
//   }
//   for (let i = 0; i < n; i++) {
//     tempMasiv.push({
//       title: masiv[i].name,
//       image_url: masiv[i].image_url,
//       subtitle: `Price ${masiv[i].price}`,
//       buttons: await buttonFormate(masiv[i], 1)
//     });
//   }
//   return tempMasiv;
// };
async function buttonFormate(element, n) {
  if (n === 1) {
    return [
      {
        type: 'web_url',
        url: element.url,
        title: 'Details'
      },
      {
        type: 'postback',
        title: 'buy',
        payload: 'buy'
      }
    ];
  } else {
    return [
      {
        type: 'web_url',
        url: element.url,
        title: 'Details'
      },
      {
        type: 'postback',
        title: 'Add to favorite',
        payload: element.sku
      }
    ];
  }
}
// module.exports.getMasiv = function getMasiv(masiv) {
//   let elements = [];
//   for (let index = 0; index < masiv.length; index++) {
//     var data = getProduct(masiv[index].id);
//     console.log(data);
//     for (let i = 0; i < data.products.length; i++) {
//       elements.push(data.products[index]);
//     }
//   }
//   return elements;
// };
// function getM() {

// }
// module.exports.getObjElemPlagin = function getObjElemPlagin(masiv, demParam) {
//   let demMas = [];
//   if (demParam == null || demParam === 0) {
//     for (let i = 0; i < 9; i++) {
//       demMas.push({
//         title: masiv[i].name,
//         image_url: masiv[i].image,
//         buttons: [
//           {
//             type: 'web_url',
//             url: masiv[i].url,
//             title: 'Details'
//           },
//           {
//             type: 'postback',
//             title: 'Add to favorite',
//             payload: masiv[i].productId
//           }
//         ]
//       });
//       demMas.push({
//         title: next,
//         image_url:
//           'data:image/jpeg;base64,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',
//         buttons: [
//           {
//             type: 'postback',
//             title: 'Next',
//             payload: '1'
//           }
//         ]
//       });
//     }
//     return demMas;
//   } else if (demParam == 1) {
//     demMas.push({
//       title: next,
//       image_url:
//         'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAYFBMVEX///8AAACGhobb29t/f3/Dw8Px8fG+vr6np6f5+fnr6+tjY2NXV1c1NTWgoKBfX189PT0WFhZ4eHhCQkLW1tbh4eEQEBDJyckYGBghISEtLS2Pj4/09PSJiYk3NzccHBxZ81p4AAADS0lEQVR4nO2d7U7bUBiDCbCs7fhox2BjY+T+75JJQSJtc9D54em1bD9XwCO0GTs5JxcXIYQQQgghhMDJOA0IvlZ7tHmFCN5Va7T5BhG8rtZo8xcieFOt0WYDEdxXa7T5AhGcdtUeTa4ggsNVtUeT8RkiKJ8Tm2qNNvcQweREHZic+F2t0QaTEwfenHiECA4/qj2avDxBBHlzYruHCKZP1HENEbyv1miDyYnbbbVHE0xODGO1RxNQn+DNifEAEeTNiexOfRDnxCVEUL5PEOfET4jglJwoQ393ku8TNxDB5EQdmJx4rtZog+kTT7y7k35OyPcJ+ZxIn+hCfnd65e0T2Z36IH6O/QsiSJwT8ruT/HPs9Iku5Hcn/T7BmxM7+d3pASJInBPZnbqQ7xPE7zthcmKQzwni3Un9fSf9nMDsTt+rNdokJ7rY8/YJ0O4knxO8fUJ/d7qFCCYn6sju1AXx8wn53Ql0fuKx2qPJDvMc++HPZTUNwS2mTzDQMMQ8n6BgXRBzfoKDVUFMTpCwJgjqEySsCIJygoVzwbH6RwKjnBMzZ4aYPkHEqSCmTzChnBMzyjkxcyQI2p24OMoJzPMJMpaGmN2JDeWcmPkQxNzbwYdyTswo58TMu6BYn1iinBMzmn1iiXJOzGj2iSX/BO+qf4b/i3JOzCjnxAzoeAExBr9D/X+HBv+XGuShwd80Bn+X6ncLg36onBk+O43B1iabGVabt2hmLA31nz1pZsaxoWJmnBgK9oxTQ73MODOU6xlnhvrvRMn1jBVDscxYM9TKjFVD/XeEDd7zVsqMhqH+eQuDMzMG554Mzq4ZnD80OENqcA7Y4Cy3/nl8gzsVDO7FMLjbxCIz5O8YMrgnSv+uL4P72gzu3LPIDPm7Lx0yQ/8OWoeekW2qE+L7vC22Kfl79Q2+jZBtqhvmzJD/zkyeZ3RD3TPkv9ll8N01g2/nOWxT8t+wNPgOqUXPMNimDDIj21QnzJmB2aYm/Z6RbaoWg55hsE2lZ3TCnBnZpjqhzgzM+YxsU6Vs9XvGi/57U6DzGfqZcdDfpqjfm8LcHULdM/IMvJNNtcYnZJvqRf8Z+KSfGftqjc8wyAz9nuGwTU0QRebMCCGEEEIIIdjxBpvGaZ39FhASAAAAAElFTkSuQmCC',
//       buttons: [
//         {
//           type: 'postback',
//           title: 'previous',
//           payload: '2'
//         }
//       ]
//     });

//     for (let i = 0; i < 9; i++) {
//       demMas.push({
//         title: masiv[i].name,
//         image_url: masiv[i].image,
//         buttons: [
//           {
//             type: 'web_url',
//             url: masiv[i].url,
//             title: 'Details'
//           },
//           {
//             type: 'postback',
//             title: 'Add to favorite',
//             payload: masiv[i].productId
//           }
//         ]
//       });
//     }
//   } else {
//     demMas.push({
//       title: next,
//       image_url:
//         'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAYFBMVEX///8AAACGhobb29t/f3/Dw8Px8fG+vr6np6f5+fnr6+tjY2NXV1c1NTWgoKBfX189PT0WFhZ4eHhCQkLW1tbh4eEQEBDJyckYGBghISEtLS2Pj4/09PSJiYk3NzccHBxZ81p4AAADS0lEQVR4nO2d7U7bUBiDCbCs7fhox2BjY+T+75JJQSJtc9D54em1bD9XwCO0GTs5JxcXIYQQQgghhMDJOA0IvlZ7tHmFCN5Va7T5BhG8rtZo8xcieFOt0WYDEdxXa7T5AhGcdtUeTa4ggsNVtUeT8RkiKJ8Tm2qNNvcQweREHZic+F2t0QaTEwfenHiECA4/qj2avDxBBHlzYruHCKZP1HENEbyv1miDyYnbbbVHE0xODGO1RxNQn+DNifEAEeTNiexOfRDnxCVEUL5PEOfET4jglJwoQ393ku8TNxDB5EQdmJx4rtZog+kTT7y7k35OyPcJ+ZxIn+hCfnd65e0T2Z36IH6O/QsiSJwT8ruT/HPs9Iku5Hcn/T7BmxM7+d3pASJInBPZnbqQ7xPE7zthcmKQzwni3Un9fSf9nMDsTt+rNdokJ7rY8/YJ0O4knxO8fUJ/d7qFCCYn6sju1AXx8wn53Ql0fuKx2qPJDvMc++HPZTUNwS2mTzDQMMQ8n6BgXRBzfoKDVUFMTpCwJgjqEySsCIJygoVzwbH6RwKjnBMzZ4aYPkHEqSCmTzChnBMzyjkxcyQI2p24OMoJzPMJMpaGmN2JDeWcmPkQxNzbwYdyTswo58TMu6BYn1iinBMzmn1iiXJOzGj2iSX/BO+qf4b/i3JOzCjnxAzoeAExBr9D/X+HBv+XGuShwd80Bn+X6ncLg36onBk+O43B1iabGVabt2hmLA31nz1pZsaxoWJmnBgK9oxTQ73MODOU6xlnhvrvRMn1jBVDscxYM9TKjFVD/XeEDd7zVsqMhqH+eQuDMzMG554Mzq4ZnD80OENqcA7Y4Cy3/nl8gzsVDO7FMLjbxCIz5O8YMrgnSv+uL4P72gzu3LPIDPm7Lx0yQ/8OWoeekW2qE+L7vC22Kfl79Q2+jZBtqhvmzJD/zkyeZ3RD3TPkv9ll8N01g2/nOWxT8t+wNPgOqUXPMNimDDIj21QnzJmB2aYm/Z6RbaoWg55hsE2lZ3TCnBnZpjqhzgzM+YxsU6Vs9XvGi/57U6DzGfqZcdDfpqjfm8LcHULdM/IMvJNNtcYnZJvqRf8Z+KSfGftqjc8wyAz9nuGwTU0QRebMCCGEEEIIIdjxBpvGaZ39FhASAAAAAElFTkSuQmCC',
//       buttons: [
//         {
//           type: 'postback',
//           title: 'previous',
//           payload: '2'
//         }
//       ]
//     });
//     for (let i = 0; i < 9; i++) {
//       demMas.push({
//         title: masiv[i].name,
//         image_url: masiv[i].image,
//         buttons: [
//           {
//             type: 'web_url',
//             url: masiv[i].url,
//             title: 'Details'
//           },
//           {
//             type: 'postback',
//             title: 'Add to favorite',
//             payload: masiv[i].productId
//           }
//         ]
//       });
//     }
//   }
// };
