Simple module to make requests on uberduck


You can get all the necessary informations like your key and secret key accesing: https://uberduck.ai/ and login in, them just click in your account image in the left upper side and choose manage account, finnaly create a API-KEY and get the two keys.

After done that, u can follow the example bellow.
```
Type script example:
```
```ts
import { getAudioUrl } from 'uberduck-api'

await getAudioUrl(
    your key, 
    your secret Key, 
    carachter, 
    text)
.then((url: string) => {
console.log(url)
})
```

```
Java Script example:
```
```js
const { getAudioUrl } = require('uberduck-api')

getAudioUrl( your key, 
    your secret Key, 
    carachter, 
    text)
.then(i => {
    console.log(i)
})
```
