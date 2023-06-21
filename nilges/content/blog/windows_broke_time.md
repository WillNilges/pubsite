Windows broke my time!

### 24 December, 2018

------------------------------------------------------------------------

Updated 4 February, 2019

I\'ve had this issue several times in the past: After installing Arch to
a machine and rebooting a few times, the time may inexplicably be wrong.
When you run `timedatectl` you might get something like this back:

::: codeBlock
        Local time: Mon 2018-12-24 10:21:41 EST # Something incorrect
        Universal time: Mon 2018-12-24 14:21:41 ETC # Is probably in EST or whatever your timezone is.
        RTC time: Mon 2018-12-24 19:21:41
        Time zone: America/New_York (EST, -0500)
        System clock synchronized: yes
        NTP service: inactive
        RTC in local TZ: no
:::

The important things you will notice is that Universal Time won\'t be
UTC and Local Time might be something weird. Anyway, the point is you
fix it with this:

`timedatectl set-ntp true`

and then in Windows, you have to create a file named
WindowsTimeFixUTC.reg with the following contents and then double click
on it to merge the contents with the registry:

::: codeBlock
    Windows Registry Editor Version 5.00

    [HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\TimeZoneInformation]
     "RealTimeIsUniversal"=dword:00000001
:::
