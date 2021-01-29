'use strict'
const { validate } = use('Validator')
const Database = use('Database')
const query = Database.table('pastas')

const rbjs = require('random-bytes-js')

class PasteController {

    main({ view }) {
        return view.render('index')
    }

    async debug({ view }) {
        const paste = await Database.table('pastas').whereNotNull('code')

        // if (!paste || paste.code == null) {
        //     return response.redirect('/')
        // }

        return view.render('list', { paste: paste })
    }

    async about({ view }) {
        const paste = await Database.table('pastas').where('unique_id', '197b2').first()

        if (!paste || paste.code == null) {
            return response.redirect('/')
        }

        return view.render('about', { paste: paste })
    }

    async show({ view, request, response }) {
        const query = request.url()
        let res = query.replace("/", "");
        const paste = await Database.table('pastas').where('unique_id', res).first()

        if (!paste || paste.code == null) {
            // response.status(404)
            // return view.render('errors.404')
            // return view.render('index')
            return response.redirect('/')
        }

        if ((paste.expire) && paste.expire <= Date.now()) {
            // return view.render('index')
            return response.redirect('/')
        }

        return view.render('show', { paste: paste })

        // return paste
    }

    async store({ request, response }) {

        const rules = {
            code: 'required|string|max:8000|min:1',
            _token: 'string',
            expire: 'required|string',
            isim: 'string|max:20'
        }

        const validation = validate(request.all(), rules)
        // const all = request.all()
        // const code = request.input('code')
        const url = rbjs.randHex(3)

        if (validation) {

            let timetoadd = null;
            switch (request.input('expire')) {
                case 'null':
                    timetoadd = null;
                    break;
                case '1':
                    timetoadd = Date.now() + 600;
                    break;
                case '2':
                    timetoadd = Date.now() + 1800;
                    break;
                case '3':
                    timetoadd = Date.now() + 3600;
                    break;
                case '4':
                    timetoadd = Date.now() + 86400;
                    break;
                case '5':
                    timetoadd = Date.now() + 864000;
                    break;
                case '6':
                    timetoadd = Date.now() + 2629743;
                    break;
                default:
                    timetoadd = null;
                    break;
            }

            // const codetoquery = Database.insert({ code: request.input('code'), expire: timetoadd, isim: request.input('isim'), unique_id: url }).into('pastas')
            await Database.insert({ code: request.input('code'), expire: timetoadd, isim: request.input('isim'), unique_id: url }).into('pastas')

            return response.redirect(url)
            // return codetoquery

        }
        else {
            return false;
        }

        return validation
    }
}

module.exports = PasteController
