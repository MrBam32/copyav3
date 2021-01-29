'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', "PasteController.main").as('main')
Route.post('/paste', 'PasteController.store').validator('Pastes')
Route.get('/p/about', "PasteController.about")
Route.get('/p/debug', "PasteController.debug")


Route.get(':paste', 'PasteController.show').as('index')



// Route.on('/').render('welcome')
Route.on('/cop').render('hi')

