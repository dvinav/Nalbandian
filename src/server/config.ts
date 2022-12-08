import multer from 'multer'

const MongoConfig = {
	server: '127.0.0.1',
	port: '27017',
	username: 'Ararat',
	password: 'jcu3CV2JXX7u',
}

const ServerConfig = {
	port: 2022,
	routes: ['/', '/borrowed', '/books', '/members'],
	indexHTML: `/public/index.html`,
	dir: {
		upload: `${__dirname}/uploads`,
		public: `/public`,
	},
	url: {
		upload: '/upload',
		getMany: '/getMany',
		getManyB: '/getManyB',
		getOne: '/getOne',
		getByQuery: '/getByQuery',
		delete: '/delete',
		edit: '/edit',
		getImage: '/getImage/:filename',
		insert: '/insert',
		return: '/return',
	},
}

const Upload = multer({
	storage: multer.diskStorage({
		destination: ServerConfig.dir.upload,
		filename: (req, file, callback) => {
			return callback(null, `${Date.now()}.${file.originalname.split('.').pop()}`)
		},
	}),
})

export { MongoConfig, ServerConfig, Upload }
