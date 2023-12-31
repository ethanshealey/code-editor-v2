import { encode as b64_encode, decode as b64_decode } from 'base-64';
import utf8 from 'utf8'

const encode = (str: string) => b64_encode(utf8.encode(str))
const decode = (str: string) => utf8.decode(b64_decode(str))

export { encode, decode }