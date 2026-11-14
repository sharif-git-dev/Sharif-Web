<?php
// Upload outside the domain document root, then rename this file to config.php:
// /var/www/vhosts/sharifjamo-portfolio.com/private/sharifjamo-contact/config.php
// Enter the mailbox password only on the server. Do not put it in React or Git.
return [
    'smtp_host' => 'sharifjamo.com',
    'smtp_password' => 'SET_MAILBOX_PASSWORD_HERE',
    'hourly_limit' => 12,
    'allowed_origins' => ['https://sharifjamo.com', 'https://www.sharifjamo.com'],
];
