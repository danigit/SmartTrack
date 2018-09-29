<?php
/**
 * Created by IntelliJ IDEA.
 * User: Daniel Surpanu
 * Date: 8/24/2018
 * Time: 4:53 AM
 */

if (!isset($_SESSION))
    session_start();

if (!isset($_SESSION['secure'], $_SESSION['username']))
    header('Location: index.php');
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

<html>
    <head>
        <!--
Customize this policy to fit your own app's needs. For more guidance, see:
            https://github.com/apache/cordova-plugin-whitelist/blob/master/README.md#content-security-policy
        Some notes:
            * gap: is required only on iOS (when using UIWebView) and is needed for JS->native communication
            * https://ssl.gstatic.com is required only on Android and is needed for TalkBack to function properly
            * Disables use of inline scripts in order to mitigate risk of XSS vulnerabilities. To change this:
                * Enable inline JS: add 'unsafe-inline' to default-src
        -->
        <meta http-equiv="Content-Security-Policy" content="default-src *; style-src 'self' http://* 'unsafe-inline'; script-src 'self' http://* 'unsafe-inline' 'unsafe-eval'; media-src *; img-src 'self' data: content:;">
        <meta name="format-detection" content="telephone=no">
        <meta name="msapplication-tap-highlight" content="no">
        <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width">

        <link rel="stylesheet" type="text/css" href="css/index.css">
        <link rel="stylesheet" type="text/css" href="css/index_page.css">
        <link rel="stylesheet" type="text/css" href="css/content.css">
        <link rel="stylesheet" type="text/css" href="css/helper.css">
        <link rel="stylesheet" href="../node_modules/material-design-lite/material.min.css">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <link rel="stylesheet" href="css/jquery.mobile-1.4.5.min.css">

        <script src="../node_modules/material-design-lite/material.min.js"></script>
        <script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
        <script src="js/default/jquery.mobile-1.4.5.min.js"></script>
        <script type="text/javascript" src="js/index.js"></script>

        <title>Smart Track</title>
    </head>
    <body>
        <div data-role="page" id="main-content">
            <div class="navbar-container">
                <div data-role="navbar">
                    <ul>
                        <li><a href="#crea-kit-page" id="crea-kit" class="ui-btn font-large blue-background white-color">Crea kit</a></li>
                        <li><a href="#" class="ui-btn font-large orange-background white-color">Crea da template</a></li>
                        <li><a href="#all-kits" class="ui-btn font-large yellow-background white-color">Visualizza kit</a></li>
                        <li><a href="#" id="logout" class="ui-btn font-large blue-background white-color">Logout</a></li>
                    </ul>
                </div>
            </div>
            <div id="error-msg"></div>
            <div class="table-label"><p class="font-x-large blue-color"><b>Tabella kit disponibili</b></p></div>
            <div class="table-container">
                <table data-role="table" id="open-kit-table" data-mode="reflow" class="ui-responsive">
                    <thead>
                        <tr>
                            <th data-priority="1">Kit id</th>
                            <th data-priority="2">Descrizione</th>
                            <th data-priority="3">Data creazione</th>
                            <th data-priority="4"></th>
                            <th data-priority="5"></th>
                        </tr>
                    </thead>
                    <tbody id="open-kit-body">

                    </tbody>
                </table>
            </div>
        </div>
        <div data-role="page" id="crea-kit-page">
            <div class="kit-create-label">
                <p class="font-x-large blue-color">Creazione kit</p>
            </div>
            <div class="select-container">
                <form>
                    <fieldset class="ui-field-contain" id="type-select-fieldset" data-role="controlgoup" data-inset="true">
                        <label for="type-select-fieldset" class="font-x-large">Seleziona una tipologia di oggetti</label>
                        <select id="type-select" data-inset="true">
                            <option>Seleziona un oggetto...</option>
                        </select>
                    </fieldset>
                </form>
            </div>
            <div class="type-list-container">
                <form class="ui-filterable">
                    <input id="filterBasic-input" data-type="search">
                </form>
                <ul id="type-list-ul" data-role="listview" data-split-icon="plus" data-filter="true" data-input="#filterBasic-input">

                </ul>
            </div>

            <div class="kit-objects-container">
                <div class="object-list-label">
                    <p class="font-large blue-color">Lista degli elementi selezionati per comporre il kit</p>
                </div>
                <ul data-role="listview" id="object-list-ul">

                </ul>
            </div>
            <div class="kit-description-container">
                <fieldset id="create-kit-fielset">
                    <div class="mdl-textfield mdl-js-textfield">
                        <input class="mdl-textfield__input font-large" type="text" name="description" id="description">
                        <label class="mdl-textfield__label font-large" for="description">Inserisci la descrizione del kit</label>
                    </div>
                </fieldset>
            </div>
            <div id="error-msg-create-kit"></div>

            <div data-role="footer" data-id="foo1" data-position="fixed">
                <div data-role="navbar" class="footer-navbar">
                    <ul class="create-kit-footer-ul">
                        <li class="create-kit-button-suspend margin-r-5" data-inline="true">
                            <a href="#" id="create-kit-suspend" class="ui-btn ui-disabled font-large">Sospendi kit</a>
                        </li>
                        <li class="create-kit-button-recover margin-r-5 display-none" data-inline="true">
                            <a href="#" id="create-kit-recover" class="ui-btn font-large">Recupera kit</a>
                        </li>
                        <li class="create-kit-button-submit margin-l-5" data-inline="true">
                            <a href="#" id="create-kit-submit" class="ui-btn ui-disabled font-large">Crea kit</a>
                        </li>
                    </ul>
                </div><!-- /navbar -->
            </div><!-- /footer -->
        </div>

        <div data-role="page" id="all-kits">
            <div class="kit-create-label">
                <p class="font-x-large blue-color">Tutti i kit</p>
            </div>
            <div id="all-kit-error-message"></div>
            <div class="table-label"><p class="font-x-large blue-color"><b>Tabella di tutti i kit</b></p></div>
            <div class="table-container">
                <table data-role="table" id="all-kit-table" data-mode="reflow" class="ui-responsive">
                    <thead>
                    <tr>
                        <th data-priority="1">Kit id</th>
                        <th data-priority="2">Descrizione</th>
                        <th data-priority="4">Data creazione</th>
                        <th data-priority="5">Kit chiuso</th>
                    </tr>
                    </thead>
                    <tbody id="all-kit-body">

                    </tbody>
                </table>
            </div>
        </div>

        <div data-role="page" id="close-kit">
            <div class="kit-create-label">
                <p class="font-x-large blue-color">Chiusura kit</p>
            </div>

            <div class="table-label"><p class="font-x-large blue-color"><b>Tabella degli oggetti presenti nel kit</b></p></div>
            <div class="table-container">
                <table data-role="table" id="close-kit-table" data-mode="reflow" class="ui-responsive">
                    <thead>
                    <tr>
                        <th data-priority="1">Object id</th>
                        <th data-priority="2">Object type</th>
                        <th data-priority="4">Object name</th>
                        <th data-priority="5"></th>
                    </tr>
                    </thead>
                    <tbody id="close-kit-body">

                    </tbody>
                </table>
            </div>

            <div data-role="footer" data-id="close-kit-footer" data-position="fixed">
                <div data-role="navbar" class="footer-navbar">
                    <ul class="create-kit-footer-ul">
                        <li data-inline="true">
                            <a href="#" id="close-kit-and-save-button" class="ui-btn font-large close-kit-button">Close kit</a>
                        </li>
                    </ul>
                </div><!-- /navbar -->
            </div><!-- /footer -->
        </div>
    <script src="js/helper.js"></script>
    <script src="js/content.js"></script>
    <script src="js/create-kit.js"></script>
    <script src="js/logout.js"></script>
    <script src="js/close-kit.js"></script>
    <script src="js/all-kits.js"></script>
    </body>
</html>
