'use strict'
const Route = use('Route')

Route.post('users', 'UserController.store').validator('User')
Route.post('sessions', 'SessionController.store').validator('Session')

Route.post('passwords', 'ForgotPasswordController.store').validator('ForgotPassword')
Route.put('passwords', 'ForgotPasswordController.update').validator('ResetPassword')

Route.group(() => {
  Route.post('files', 'FileController.store')
  Route.get('files/:id', 'FileController.show')
  Route.resource('projects', 'ProjectController')
    .apiOnly()
    // Cria validators
    .validator(new Map(
      [
        [
          ['projects.store'],
          ['Project']
        ]
      ]
    ))
    .middleware('is:(administrator || moderator)')
  Route.resource('projects.tasks', 'TaskController')
    .apiOnly()
    .validator(new Map(
      [
        [
          ['projects.task.store'],
          ['Task']
        ]
      ]
    ))

  Route.resource('permissions', 'PermissionController').apiOnly()
  Route.resource('/roles', 'RoleController').apiOnly()
}).middleware(['auth'])
