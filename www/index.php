<?php
/**
 * Created by IntelliJ IDEA.
 * User: Daniel Surpanu
 * Date: 8/24/2018
 * Time: 4:53 AM
 */

if (!isset($_SESSION))
    session_start();

if (isset($_SESSION['secure'], $_SESSION['username']))
    header('Location: content.php');
?>
<!DOCTYPE html>
<!--
    Licensed to the Apache Software Foundation (ASF) under one
    or more contributor license agreements.  See the NOTICE file
    distributed with this work for additional information
    regarding copyright ownership.  The ASF licenses this file
    to you under the Apache License, Version 2.0 (the
    "License"); you may not use this file except in compliance
    with the License.  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing,
    software distributed under the License is distributed on an
    "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
     KIND, either express or implied.  See the License for the
    specific language governing permissions and limitations
    under the License.
-->

<!--
       Customize this policy to fit your own app's needs. For more guidance, see:
           https://github.com/apache/cordova-plugin-whitelist/blob/master/README.md#content-security-policy
       Some notes:
           * gap: is required only on iOS (when using UIWebView) and is needed for JS->native communication
           * https://ssl.gstatic.com is required only on Android and is needed for TalkBack to function properly
           * Disables use of inline scripts in order to mitigate risk of XSS vulnerabilities. To change this:
               * Enable inline JS: add 'unsafe-inline' to default-src
-->

<html>
    <head>
        <meta http-equiv="Content-Security-Policy" content="default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'; media-src *; img-src 'self' data: content:;">
        <meta name="format-detection" content="telephone=no">
        <meta name="msapplication-tap-highlight" content="no">
        <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width">

        <link rel="stylesheet" type="text/css" href="css/index.css">
        <link rel="stylesheet" type="text/css" href="css/index_page.css">
        <link rel="stylesheet" type="text/css" href="css/helper.css">
        <link rel="stylesheet" href="../node_modules/material-design-lite/material.min.css">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <link rel="stylesheet" href="css/jquery.mobile-1.4.5.min.css">


        <script src="../node_modules/material-design-lite/material.min.js"></script>
<!--        <script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>-->
        <script src="js/default/jquery-2.2.4.js"></script>
        <script src="js/default/jquery.mobile-1.4.5.min.js"></script>

        <title>Smart Track</title>
    </head>
    <body>
        <div data-role="page" id="login">
            <div data-role="content" id="login-content">
                <div class="login-image-container">
                    <img src="img/login_image.png" class="login-image">
                </div>
                <div class="login-form-container">
                    <h1 class="login-text">Login</h1>
                    <form data-ajax="false" id="login-form">
                        <fieldset id="login-fielset">
                            <div class="input-container">
                                <input class="" type="text" name="username" id="username" placeholder="Inserisci username">
                            </div>
                            <div class="input-container">
                                <input class="" type="password" name="password" id="password" placeholder="Inserisci password">
                            </div>
                            <input type="submit" id="submit-login" data-inline="true" value="Login">
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
        <script src="js/login.js"></script>
        <script src="js/helper.js"></script>
    </body>
</html>
