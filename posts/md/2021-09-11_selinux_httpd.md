## 11 September, 2021

I've been having this weird problem with my httpd dev instance where, when I try to serve content, sometimes, seemingly at random, I'll get 403'ed when it serves. My file permissions are correct, my ownership is correct, but I just _won't_ be able to access the content. Very annoying.

Today, I figured out the problem: SELinux.

To fix these weird issues, you have to tell SELinux that everything is ok, and you aren't getting hacked:

```
chcon -R -t httpd_sys_content_t /var/www/html
```

Should work after that.

Source: https://serverfault.com/questions/309233/apache-serves-some-files-others-get-403
