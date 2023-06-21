---
title: "Re-Installing my First Major Project"
date: 2021-08-13T00:00:00Z
categories: [ "Blog" ]
draft: false
---

### Background

When I was a freshman in college, I wrote BetterVent, a scheduling app that was meant to sit on a tablet outside of a conference room and display upcoming events. Freshman Will didn't do a great job of documenting the setup process, but he tried his best, and for that, I commend him. I think Freshman Will thought that he'd be messing with this app frequently enough that he'd remember everything.

Freshman Will was an idiot.

Here I am, it's 2021, and CSH is able to do things on floor again, which means that this project is allowed to be installed, and used! We've been here since about 18:00 (It's now 21:11 as I type this), and while everyone else was running around, doing things, I was here banging my head against a set of tablets that _should_ be working. But they aren't.

### Hypothesis

The reason why, I think, lies in how Google Calendar IDs work, and the absolute _cluster_ that is the way I wrote the sign-in code. For some reason, there's an option to select your Google Account when you launch the app. I don't even remember why that's in there, because I think it just pulls events directly from a calendar URL. I wish I could remember through documentation, but I didn't write any for that nuance.

So, I'm going to have to go spelunking to figure out why that is. The calendar URL I mentioned looks like this:

```
rtx888k5hi1z5nw3a9rim8pgnh@group.calendar.google.com 
```

Yikes. This is also not documented, and I have no idea where I got the one that's left on the one "functioning™" tablet. (did I mention that I had to reset two of them because I lost the credentials? Happy thoughts, happy thoughts, happy thoughts...)

Then there's also this Development API nonsense that I have _no_ idea what it's for or why it's there.

And did I mention that the GitHub Release page thinks that 0.3-beta is the latest, when 0.4.1-beta is!? Grrrrr....

*Some time later*

Okay, I'm guessing that I need some kind of "authorization" thus the signing in, and the dev token, and yada yada. Ugh. Howwww does this worrrrrrk......

Okay, got it working again. I need to build an image on a device, then take that device's androiddebugkey and put it on the Google Calendar API credentials page. Then, you gotta log into the account on the device, enter the calendar key, and it _ought_ to work.

~~The issue with this approach is that I think my apk will only work with _my_ calendar. This is problematic for a number of reasons.~~

### (Eventual) Resolution

After spending 6 hours on trying to get the old tablets working, I got nowhere, and gave up for the night. I spent the weekend delving back into the old, crusty, antiquated freshman code, but didn't gain any leads.... right away.

On Sunday night, after relieving my poor X270 of compilation duty and transfering the repo over to my new beefcake Ryzen rig, I started digging again. I had had the idea of looking over an old PR that another RTP submitted over two years ago (oops) to see if he did authentication any differently, because he had a few commits that mentioned it. Turns out, he did (kind of) do some new stuff, but, importantly, the way he was actually getting credentials was still the same: An Oauth2 Token.

Using this info, I did a _ton_ of Googling and found a few links about the Calendar API, several layers of StackOverflow posts, and some really old, crusty Android API documentation (All of which will be linked at the end).

Eventually, I decided to just _try_ the way Freshman Will had done things:

I built a debug version on my desktop, then used the `keytool` like so:
```
keytool -alias androiddebugkey -keystore ~/.android/debug.keystore -list -v 
```
to get the SHA1 fingerprint of my desktop. Then, I went over to the GCP API dashboard for BetterVent on my will.nilges@gmail.com account (the OG, the one and only), and added that to the list of OAuth 2.0 Client IDs (that list also contains my old desktop and my old laptop, neither of which probably built the APK that's on GitHub right now). That led me over to the OAuth Consent Screen tab, which explained in no unclear words that right now, my app and its Oauth nonsense is Unverified™ by Google. This means that, by default, the App's status is "In Production" and the OAuth user cap is 100. 100 Devices can use this app while it's "Unapproved." The cap will be removed if I can get it "Approved." That requires a "Verification Process" that is apparently days to weeks long.

### What now?

Sheesh, man. All I want to do is get some public calendar data. Why is this so hard!? App development scares me. Take me back to embedded land where the 'S' in IoT stands for 'Security!'

I think the reason why is that I'm not _directly_ querying the calendar, I'm technically accessing it from a user's account calendar that has the CSH Public calendar added. That kinda sucks for reading, but makes sense when you consider I also wanted to try writing to a calendar at some point, which I'd still like to do.

There's probably something in here about how to avoid requesting permissions for the app directly and instead pulling from the Calendar App, which _should_ mean no need to do Verification. (https://developer.android.com/guide/topics/providers/calendar-provider#intents)

As I mentioned, Eric K seems to have handled sign in using a different method, and I'd like to pick apart how that works (if only I could get his code to build). I sent him a message asking him to break up his PR into smaller ones. It sounds like he's on board with it, and hopefully soon enough we'll have an actual maintainer for this project. I transferred this project to the [CSH github](https://github.com/computersciencehouse/BetterVent) a while ago, so I'd like to eventually let others take over this project and just be an extra set of eyes for PRs.

### Appendix

To Friday Will's question about where that Calendar URL came from: It's the CalendarID for the CSH Calendar, and you can access it from my Homedir.

It's also worth mentioning that the "Current Release" on GitHub is _not_ the current release, nor is it probably even signed for on GCP anymore. There's a Debug APK that _should_ work in my homedir for now, but I really ought to do another release.

Oh, also, the instructions "For Development," aren't exactly "For Development." They're kinda for prod, too.
**IDEALLY, THOUGH, THAT SHOULD BE IGNORED BY YOUR AVERAGE JOE SCHMOE WHO WANTS TO JUST USE THIS APP. OAUTH _SHOULD_ WORK NOW.**

(I should put something on the wiki)

**"Important" Links**

- https://console.cloud.google.com/apis/credentials?project=bettervent
- https://console.cloud.google.com/apis/credentials/consent?project=bettervent
- https://support.google.com/cloud/answer/7454865
- https://stackoverflow.com/questions/21137453/getting-google-calendar-events-with-api-v3-without-using-oauth
- https://stackoverflow.com/questions/40941556/com-google-android-gms-auth-googleauthexception-unregistered-on-api-console
- https://stackoverflow.com/questions/5883938/getting-events-from-calendar
- https://stackoverflow.com/questions/14365219/in-a-nutshell-whats-the-difference-from-using-oauth2-request-getauthtoken-and-g/14374577
- https://stackoverflow.com/questions/22142641/access-to-google-api-googleaccountcredential-usingoauth2-vs-googleauthutil-get
- https://developers.google.com/identity/smartlock-passwords/android/retrieve-credentials
- https://developers.google.com/identity/one-tap/android/get-saved-credentials#kotlin
- https://googleapis.dev/java/google-api-client/latest/com/google/api/client/googleapis/extensions/android/gms/auth/GoogleAccountCredential.html
- https://github.com/EricKarschner37/BetterVent/tree/develop
- http://www.java2s.com/example/java-api/com/google/api/client/googleapis/extensions/android/gms/auth/googleaccountcredential/gettoken-0-0.html
- https://googleapis.dev/java/google-api-client/latest/com/google/api/client/googleapis/extensions/android/gms/auth/GoogleAccountCredential.html
- https://www.tabnine.com/code/java/methods/com.google.api.client.googleapis.extensions.android.gms.auth.GoogleAccountCredential/getToken
