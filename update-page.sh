rm -rf /var/www/html/
git clone --depth 1 https://github.com/Skorplul/web-bs.git /var/www/html/
mv /var/www/html/update-page.sh /bin/update-page.sh
rm -rf /var/www/html/.git
chmod +x /bin/update-page.sh 