'use strict'
const Route = use('Route')

Route.post('users', 'UserController.store').validator('User')
Route.post('sessions', 'SessionController.store')

Route.post('passwords', 'ForgotPasswordController.store')
Route.put('passwords', 'ForgotPasswordController.update')

Route.group(() => {
  Route.post('files', 'FileController.store')
  Route.get('files/:id', 'FileController.show')
  Route.resource('projects', 'ProjectController').apiOnly()
  Route.resource('projects.tasks', 'ProjectController').apiOnly()
}).middleware(['auth'])
