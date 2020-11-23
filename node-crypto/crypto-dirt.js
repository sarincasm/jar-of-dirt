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

function pbkdf2Usage() {
	const userInputPassword = 'possiblyWeak'
	const saltString = crypto.randomBytes(32).toString('hex')
	const hash = crypto.createHash('sha256')
	hash.update(saltString)
	const salt = hash.digest('hex')
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
