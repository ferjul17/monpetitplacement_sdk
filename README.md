# MonPetitPlacement SDK

MonPetitPlacement is a French company that offers a financial investment service.  
I'm not part of this company, I'm just one of their customer.

This library is intended to provide you with an easy way to retrieve your data from MonPetitPlacement.  
It uses private API which may change and break this library at any moment.

## Installation

The SDK is currently not published on npm. As soon as I have a first usable version, I will publish it on npm.

## Usage

```typescript
import { Api } from 'monpetitplacement-sdk';

const api = new Api();
const {
  token,
  user: { id: userId },
} = await api.login({ username: 'someone@something.com', password: 'MySuperSecretPassword' });
const me = await api.getUser({ token, userId });
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Referral code

If you don't already have a MonPetitPlacement account and you want to try, you can subscribe with my referral code [FERRIERMPP](http://www.monpetitplacement.fr/fr/affiliate/sea?cp=FERRIERMPP).

## License

[MIT](./LICENSE)
