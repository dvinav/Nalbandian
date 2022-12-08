import { CollectionNumbers } from 'types/general'
import * as RequestBody from 'types/requests'
import { getCol } from 'utils/get'
import { ObjectId } from 'mongodb'
import log from './log'
import { Connection } from './database'
import { AES } from 'crypto-js'

export const CheckKey = async (con: Connection, data: string, next: Function) => {
	var result = await con.db
		.collection('keys')
		.find({ key: data + '==' })
		.toArray()
	if (result.length > 0) next(true)
	else next(false)
}

export const GenKey = async (con: Connection, hash: string, next: Function) => {
	var data = String(AES.encrypt(hash, String(Date.now())))
	await con.db.collection('keys').insertOne({ key: data })
	next(data)
}

export const Insert = async (con: Connection, body: RequestBody.Insert) => {
	var col = getCol(Number(body.collection) as CollectionNumbers) as string
	delete body.collection
	try {
		var res = await con.db.collection(col).insertOne(body)
		return res.insertedId
	} catch (err) {
		throw err
	}
}

export const InsertB = async (con: Connection, body: RequestBody.Insert) => {
	try {
		var res = await con.db.collection('borrowed').insertOne(body)
		return res.insertedId
	} catch (err) {
		throw err
	}
}

export const GetMany = async (con: Connection, body: RequestBody.GetMany) => {
	try {
		var result = await con.db
			.collection(String(getCol(body.collection)))
			.find()
			.sort({ _id: -1 })
			.skip(--body.skip)
			.limit(body.count)
			.toArray()
		log.action.getMany(body.count, body.collection)
		return result
	} catch (err) {
		throw err
	}
}

export const GetByQuery = async (con: Connection, body: RequestBody.GetByQuery) => {
	try {
		var result = await con.db
			.collection(String(getCol(body.collection)))
			.find({ $text: { $search: body.query } })
			.toArray()
		log.action.getByQuery(result.length, body.collection)
		return result
	} catch (err) {
		throw err
	}
}

export const GetOne = async (con: Connection, body: RequestBody.GetOne) => {
	try {
		var result = await con.db
			.collection(String(getCol(body.collection)))
			.find({ _id: new ObjectId(body.id) })
			.toArray()
		log.action.getOne(body.id, body.collection)
		return result
	} catch (err) {
		throw err
	}
}

export const Delete = async (con: Connection, body: RequestBody.Delete) => {
	try {
		con.db.collection(String(getCol(body.collection))).deleteOne({ _id: new ObjectId(body.id) })
		log.action.delete(body.id, body.collection)
		return true
	} catch (err) {
		throw err
	}
}

export const Edit = async (con: Connection, body: RequestBody.Edit) => {
	var col = getCol(Number(body.collection) as CollectionNumbers) as string
	var id = body.id
	delete body.collection
	delete body.id
	try {
		await con.db.collection(col).updateOne(
			{ _id: new ObjectId(id) },
			{
				$set: body,
			}
		)
		return id
	} catch (err) {
		throw err
	}
}

export const Return = async (con: Connection, body: RequestBody.Edit) => {
	var col = body.collection
	var id = body._id
	delete body.collection
	delete body._id
	try {
		await con.db.collection(col).updateOne(
			{ _id: new ObjectId(id) },
			{
				$set: body,
			}
		)
		return await con.db
			.collection('borrowed')
			.find({ _id: new ObjectId(id) })
			.toArray()
	} catch (err) {
		throw err
	}
}
