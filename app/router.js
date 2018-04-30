'use strict';

/**
 * controller文件的命名最好是驼峰式，否则可能获取不到
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const secretOrPrivateKey = app.config.token_key; // 密钥
  const secretOrPrivateSign = app.config.token_sign; // 签名
  const auth = app.middleware.auth({ key: secretOrPrivateKey, sign: secretOrPrivateSign }); //token验证

  router.get('/', controller.home.index);

  router.post('/upload', controller.base.upload.create);
  router.post('/destroy', controller.base.upload.destroy);

  router.get('/user/show', auth, controller.user.show);
  router.post('/user/add', controller.user.create);
  router.post('/user/login', controller.userAccess.login);

};
