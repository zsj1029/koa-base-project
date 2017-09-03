'use strict';

const log = require('pino')();
const accountLogic = new (require('../logic/accountLogic.js'))();
const userMongo = require('../models/mongodb/user.js');

class homeController {

  static async home(ctx) {

    ctx.session.count = ctx.session.count || 0;

    log.info(ctx.session.count);
    ctx.session.count++;
    await ctx.render('home/home', {
      title: 'hello'
    });

  }

  static async showAccount(ctx) {

    const list = await accountLogic.getAllAccount();

    await ctx.render('home/accountList', {
      title: 'account list',
      list: list
    });

  }

  static async showUser(ctx) {
    const user = await userMongo.model.findOne({ name: 'zack' });
    ctx.body = JSON.stringify(user);
  }

}

module.exports = homeController;