/** @format */

const crypto = require('crypto')

/**
 * https://nodejs.org/api/crypto.html
 */

/**
 * https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback
 * https://nodejs.org/api/buffer.html#buffer_buffers_and_character_encodings
 */
function randomBytesUsage() {
	const nonceBuffer = crypto.randomBytes(256)
	const nonce64 = nonceBuffer.toString('base64')
	const nonceHex = nonceBuffer.toString('hex')
	const nonceUtf8 = nonceBuffer.toString() // data loss

	console.log(
		nonceBuffer,
		nonceBuffer.byteLength,
		nonceBuffer.BYTES_PER_ELEMENT
	)
	console.log(nonce64, nonce64.length)
	console.log(nonceHex, nonceHex.length)
	console.log(nonceUtf8, nonceUtf8.length)

	const buff64 = Buffer.from(nonce64, 'base64')
	const buffHex = Buffer.from(nonceHex, 'hex')
	const buffD = Buffer.from(nonceUtf8)

	console.log(buff64, buff64.byteLength, buff64.BYTES_PER_ELEMENT)
	console.log(buffD, buffD.byteLength, buffD.BYTES_PER_ELEMENT) // not possible to regenerate original
	console.log(buffHex, buffHex.byteLength, buffHex.BYTES_PER_ELEMENT)
}

function createHashUsage() {
	const saltString = 'abcdefghi'
	const hash = crypto.createHash('sha256')
	hash.update(saltString)
	const salt = hash.digest('hex')

	// salt.length always 64
	// hex - 2 hexadecimal characters for each byte
	// 32 bytes = 256 bits
	console.log(saltString, salt, salt.length)
}

function generateSalt() {
	const seed = crypto.randomBytes(32).toString('hex')
	const hash = crypto.createHash('sha256')
	hash.update(seed)
	return hash.digest('hex')
}

function pbkdf2Usage() {
	const userInputPassword = 'possiblyWeak'
	const salt = generateSalt()
	const iterations = 100000
	const derivedKeyBytes = 64
	const derivedKeyBuffer = crypto.pbkdf2Sync(
		userInputPassword,
		salt,
		iterations,
		derivedKeyBytes,
		'sha512'
	)
	const derivedKey = derivedKeyBuffer.toString('hex')
	console.log(derivedKeyBuffer, derivedKeyBuffer.byteLength)
	console.log(derivedKey, derivedKey.length)
}

/**
 * https://github.com/ranisalt/node-argon2/wiki/Options
 */
async function argon2Usage() {
	const argon2 = require('argon2')

	const userInputPassword = 'possiblyWeak'
	const salt = generateSalt()
	const argon2Result = await argon2.hash(userInputPassword, {
		type: argon2.argon2id,
		salt: Buffer.from(salt, 'hex'),
		timeCost: 5,
		memoryCost: 65536,
		hashLength: 64,
	})
	console.log(argon2Result)
	// $argon2id$v=19$m=65536,t=5,p=1$y7SmQAY3jsJhhA05q2zHYEjz2tFuGbfbUI+xG6RZTFE$U0XUfdIYYr8RcW1sD6evLuCbijdu5OkuB5kNsghHzcFqx0VG9a3E+lvgO1a4Qb+iV9iWXCszXQkb517fkrG0iQ

	const [
		,
		variant,
		version,
		memoryIterationsParallelism,
		salt64,
		key64,
	] = argon2Result.split('$')
	const derivedKey = Buffer.from(key64, 'base64').toString('hex')
	console.log(variant, version, memoryIterationsParallelism, salt64, key64)
	console.log(derivedKey)
}
