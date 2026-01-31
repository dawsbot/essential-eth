# Essential-eth for React Native

## The Problem: Bundle Size = Download Time = User Acquisition

In React Native, every kilobyte counts. Your app bundle is what users download on bad 4G. Every 100 kB you save is **another 2 seconds faster download on 3G networks**. That's direct impact on your app store conversion rate.

ethers.js and viem weren't built for mobile. They pull in browser APIs, Node.js polyfills, and ecosystem baggage that balloons your bundle. React Native projects that add ethers.js often see their app size jump by **300+ kB**, translating to churn before users ever open your app.

And native modules? No thanks. essential-eth is **zero-dependency pure JavaScript**. It installs instantly, builds instantly.

## The Numbers: Bundle Impact on Mobile

| Library           | Bundle Size | Gzip        | Mobile Impact           |
| ----------------- | ----------- | ----------- | ----------------------- |
| **essential-eth** | **39.9 kB** | **12.1 kB** | **+12 kB to your app**  |
| ethers.js         | 394 kB      | 104 kB      | **+104 kB to your app** |
| viem              | 348 kB      | 89 kB       | **+89 kB to your app**  |
| web3.js           | 506 kB      | 131 kB      | **+131 kB to your app** |

On 4G (1 Mbps): ethers = **0.8s slower download**. On 3G (500 kbps): **1.6s slower**. That's how you lose users.

**essential-eth? You barely notice it's there.**

## Quick Start: React Native Wallet

```javascript
import { signMessage, formatAddress } from 'essential-eth';
import { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export const WalletScreen = () => {
  const [privateKey, setPrivateKey] = useState('');
  const [message, setMessage] = useState('');
  const [signature, setSignature] = useState(null);

  const handleSign = () => {
    try {
      const sig = signMessage(message, privateKey);
      setSignature(sig);
    } catch (err) {
      console.error('Sign failed:', err);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Private Key"
        value={privateKey}
        onChangeText={setPrivateKey}
      />
      <TextInput
        placeholder="Message"
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Sign" onPress={handleSign} />
      {signature && <Text>Signature: {signature}</Text>}
    </View>
  );
};
```

## Migrating from ethers.js

**Before (ethers.js + bloat):**

```javascript
import { ethers } from 'ethers';
import { useState } from 'react';

const wallet = new ethers.Wallet(privateKey);
const signature = await wallet.signMessage(message);
```

**After (essential-eth + lean):**

```javascript
import { signMessage } from 'essential-eth';

const signature = signMessage(message, privateKey);
// No await. No wallet class. No polyfills.
```

Zero-dependency. Synchronous. Mobile-native mindset.

## Migrating from viem

**Before (viem):**

```javascript
import { formatEther, parseEther, getAddress, isAddress } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';

const account = privateKeyToAccount(privateKey);
const formatted = formatEther(balance);
const parsed = parseEther('1.5');
const addr = getAddress(rawAddress);
```

**After (essential-eth):**

```javascript
import {
  weiToEther,
  etherToWei,
  toChecksumAddress,
  isAddress,
} from 'essential-eth';

const formatted = weiToEther(balance);
const parsed = etherToWei('1.5');
const addr = toChecksumAddress(rawAddress);
```

viem's tree-shaking helps on web, but React Native's Metro bundler doesn't tree-shake as aggressively. You end up pulling in chain definitions, ABI utilities, and transport layers you never import. essential-eth has zero internal cross-dependencies — you get exactly what you import.

## Migration Checklist

- ✅ Replace ethers.js / viem with essential-eth
- ✅ Remove any web3, ethers, or viem polyfill packages
- ✅ Replace `formatEther`/`parseEther` with `weiToEther`/`etherToWei`
- ✅ Replace `getAddress` with `toChecksumAddress`
- ✅ Use synchronous function calls (no async/await for basic operations)
- ✅ Test bundle size: `npm run build && du -h ./build`
- ✅ Profile app install size on iOS App Store / Google Play
- ✅ Celebrate lower app size = better conversion metrics

## Why No Native Modules?

pure JavaScript = works everywhere (iOS, Android, Web, Expo). No CocoaPods. No Gradle plugins. No `pod install` headaches. Ship faster, support more platforms.

## Ready to Shrink Your Bundle?

```bash
npm install essential-eth
```

Smaller apps win on mobile. Essential-eth gets out of your way.

⭐ [github.com/dawsbot/essential-eth](https://github.com/dawsbot/essential-eth)
