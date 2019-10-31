'use strict'
const Database = use('Database')
const User = use('App/Models/User')

class UserController {
  async store ({ request }) {
    const { addresses, permissions, roles, ...data } = request.only([
      'username',
      'email',
      'password',
      'permissions',
      'roles',
      'addresses'
    ])

    const trx = await Database.beginTransaction()

    const user = await User.create(data, trx)

    await user.addresses().createMany(addresses, trx)

    await trx.commit()

    if (roles) {
      await user.roles().attach(roles)
    }

    if (permissions) {
      await user.permissions().attach(permissions)
    }

    await user.loadMany(['addresses', 'roles', 'permissions'])

    return user
  }
}

module.exports = UserController
