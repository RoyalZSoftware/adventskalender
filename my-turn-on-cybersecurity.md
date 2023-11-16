1. Cybersecurity is a really important topic.
2. My three tips
	1. Don't reuse a password, use a password manager instead
	2. Use at least two factors for your password manager
	3. Change the password of your password manager frequently
	4. Utilise FIDO
	5. Don't ever store TOTP secrets on your device, rather use a hardware token
		1. If you ever loose your smartphone, all of your 2fa will be lost, unless you've saved the secret to some secure place

INTRO
Cybersecurity has bekommen very important over the years. More powerful computers force you to have immer longer passwords.
This post shall give you a rough introduction on how i handle cyber security and the products I am using for it (this is not sponsored. / unfortunately :D)

## Password management
I have dozens of accounts, just like you. To manage the credentials for all of them I use a password manager (bitwarden) with multiple factors to be sure no one will get into it. (I will come to them in just a bit)

Please do not go the wrong way and use the same password over and over again.

## 2FA is a requirement
Having a second factor is required to have a safe experience in the internet. It makes getting into your account much harder, because the second factor is not just a password that you enter on some site and that stays the same.
Even if somebody found out your entered 2FA code, it's very unlikely that somebody can zurückrechnen the secret of it.

That's because there are multiple secrets that can start with the code that you've entered.

### Storing 2FA on smartphone or even in the cloud - bad idea
The most common way of approaching 2fa is with Google or microsoft authenticator app. While this is in general better than not having a second factor, it's not necessarily great.

The best case to handle the TOTP token storage is on a hardware token, that you carry with you. In my case:

## Yubikeys
Yubikeys are hardware tokens from the manufacturer yubico and allow besides TOTP storage WebAuthN authentication which is synonym for passkeys

You're not storing anything to the cloud and even if you loose your smartphone you're good to go.
### If you want to use a yubuikey, buy two.
I struggled a lot with the thought of "what happens when I loose my yubikey?" Well you're basically fucked then, just to make this clear.

You will need to purchase two of them to be on the safe side and add both of them to your accounts. I carry one with me and the other one is stored in a very secret dark place, that nobody has access to.
// image einfügen meme

With yubikeys the doors for safe webauthn are open and you should utilise it wherever you can. Websites that allow passkeys don't require you to enter your password. Just the password from your Yubikey

## Conclusion
1. Always enable 2FA
2. You can store your secrets on your smartphone, but most preferibly...
3. Get a hardware token and a backup hardware token to safe your secrets.
4. Utilise WebAuthn everywhere you can