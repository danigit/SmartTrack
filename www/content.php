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
                    <ul class="box-shadow-bottom">
                        <li><a href="#crea-kit-page" id="crea-kit" class="ui-btn font-large blue-background white-color">Crea kit</a></li>
<!--                        <li><a href="#" class="ui-btn font-large blue-background white-color">Crea da template</a></li>-->
                        <li><a href="#all-kits" class="ui-btn font-large blue-background white-color">Visualizza kit</a></li>
                        <li><a href="#insert-type" class="ui-btn font-large blue-background white-color">Inserisci tipologia</a></li>
                        <li><a href="#insert-object" class="ui-btn font-large blue-background white-color">Inserisci oggetto</a></li>
                        <li><a href="#" id="logout" class="ui-btn font-large blue-background white-color">Logout</a></li>
                    </ul>
                </div>
            </div>
            <div id="error-msg"></div>
            <div class="table-label"><p class="font-xx-large center-text line-height-3 blue-color"><b>Tabella kit disponibili</b></p></div>
            <div class="table-container">
                <table data-role="table" id="open-kit-table" data-mode="reflow" class="ui-responsive">
                    <thead>
                        <tr>
                            <th data-priority="1" class="border-right-no-color font-x-large padding-10">Kit id</th>
                            <th data-priority="2" class="border-right-no-color font-x-large padding-10">Descrizione</th>
                            <th data-priority="3" class="border-right-no-color font-x-large padding-10">Data creazione</th>
                            <th data-priority="4" ></th>
                            <th data-priority="5" ></th>
                        </tr>
                    </thead>
                    <tbody id="open-kit-body">

                    </tbody>
                </table>
            </div>
        </div>

        <div data-role="page" id="crea-kit-page">
            <div class="kit-create-label box-shadow-bottom">
                <p class="font-x-large blue-color">Creazione kit</p>
            </div>
            <div class="select-container">
                <form>
                    <fieldset class="ui-field-contain" id="type-select-fieldset" data-role="controlgoup" data-inset="true">
                        <label for="type-select-fieldset" class="font-x-large">Seleziona una tipologia di oggetti</label>
                        <select id="type-select" data-inset="true">
                            <option>Seleziona una tipologia...</option>
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
                    <div class="">
                        <input class="font-large" type="text" name="description" id="description" placeholder="Inserisci la descrizione del kit">
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

<!--        <div data-role="page" id="crea-kit-from-template-page">-->
<!--            <div class="kit-create-from-templatelabel box-shadow-bottom">-->
<!--                <p class="font-x-large blue-color">Creazione kit da template</p>-->
<!--            </div>-->
<!--            <div class="select-container">-->
<!--                <form>-->
<!--                    <fieldset class="ui-field-contain" id="type-select-fieldset" data-role="controlgoup" data-inset="true">-->
<!--                        <label for="type-select-fieldset" class="font-x-large">Seleziona una tipologia di oggetti</label>-->
<!--                        <select id="type-select" data-inset="true">-->
<!--                            <option>Seleziona un oggetto...</option>-->
<!--                        </select>-->
<!--                    </fieldset>-->
<!--                </form>-->
<!--            </div>-->
<!--            <div class="type-list-container">-->
<!--                <form class="ui-filterable">-->
<!--                    <input id="filterBasic-input" data-type="search">-->
<!--                </form>-->
<!--                <ul id="type-list-ul" data-role="listview" data-split-icon="plus" data-filter="true" data-input="#filterBasic-input">-->
<!---->
<!--                </ul>-->
<!--            </div>-->
<!---->
<!--            <div class="kit-objects-container">-->
<!--                <div class="object-list-label">-->
<!--                    <p class="font-large blue-color">Lista degli elementi selezionati per comporre il kit</p>-->
<!--                </div>-->
<!--                <ul data-role="listview" id="object-list-ul">-->
<!---->
<!--                </ul>-->
<!--            </div>-->
<!--            <div class="kit-description-container">-->
<!--                <fieldset id="create-kit-fielset">-->
<!--                    <div class="mdl-textfield mdl-js-textfield">-->
<!--                        <input class="mdl-textfield__input font-large" type="text" name="description" id="description">-->
<!--                        <label class="mdl-textfield__label font-large" for="description">Inserisci la descrizione del kit</label>-->
<!--                    </div>-->
<!--                </fieldset>-->
<!--            </div>-->
<!--            <div id="error-msg-create-kit"></div>-->
<!---->
<!--            <div data-role="footer" data-id="foo1" data-position="fixed">-->
<!--                <div data-role="navbar" class="footer-navbar">-->
<!--                    <ul class="create-kit-footer-ul">-->
<!--                        <li class="create-kit-button-suspend margin-r-5" data-inline="true">-->
<!--                            <a href="#" id="create-kit-suspend" class="ui-btn ui-disabled font-large">Sospendi kit</a>-->
<!--                        </li>-->
<!--                        <li class="create-kit-button-recover margin-r-5 display-none" data-inline="true">-->
<!--                            <a href="#" id="create-kit-recover" class="ui-btn font-large">Recupera kit</a>-->
<!--                        </li>-->
<!--                        <li class="create-kit-button-submit margin-l-5" data-inline="true">-->
<!--                            <a href="#" id="create-kit-submit" class="ui-btn ui-disabled font-large">Crea kit</a>-->
<!--                        </li>-->
<!--                    </ul>-->
<!--                </div><!-- /navbar -->
<!--            </div><!-- /footer -->
<!--        </div>-->

        <div data-role="page" id="all-kits">
            <div class="kit-create-label">
                <p class="font-x-large blue-color">Tutti i kit</p>
            </div>
            <div id="all-kit-error-message"></div>
            <div class="table-label"><p class="font-xx-large center-text line-height-3 blue-color"><b>Tabella di tutti i kit</b></p></div>
            <div class="table-container">
                <table data-role="table" id="all-kit-table" data-mode="reflow" class="ui-responsive">
                    <thead>
                    <tr>
                        <th data-priority="1" class="border-right-no-color font-x-large padding-10">Kit id</th>
                        <th data-priority="2" class="border-right-no-color font-x-large padding-10">Descrizione</th>
                        <th data-priority="4" class="border-right-no-color font-x-large padding-10">Data creazione</th>
                        <th data-priority="5" class="border-right-no-color font-x-large padding-10">Kit chiuso</th>
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

            <div class="table-label"><p class="font-xx-large center-text line-height-3 blue-color"><b>Tabella degli oggetti presenti nel kit</b></p></div>
            <div class="table-container">
                <table data-role="table" id="close-kit-table" data-mode="reflow" class="ui-responsive">
                    <thead>
                    <tr>
                        <th data-priority="1" class="border-right-no-color font-x-large padding-10">Object id</th>
                        <th data-priority="2" class="border-right-no-color font-x-large padding-10">Object type</th>
                        <th data-priority="4" class="border-right-no-color font-x-large padding-10">Object name</th>
                        <th data-priority="5" class="border-right-no-color font-x-large padding-10"></th>
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

<!--        <div id="error-popup" data-role="popup" data-overlay-theme="a" class="ui-content error-popup" data-history="false">-->
<!--            <p class="error-title"></p>-->
<!--            <p class="error-content"></p>-->
<!--        </div>-->

        <div data-role="page" id="insert-type">
            <div class="navbar-container">
                <div data-role="navbar">
                    <ul class="box-shadow-bottom">
                        <li><a href="#insert-type-popup" data-rel="popup" data-position-to="window" data-transition="fade" class="ui-btn font-large blue-background white-color">Inserisci tipologia</a></li>
                        <li><a href="#update-type-popup" id="update-type-popup-button" data-rel="popup" data-position-to="window" data-transition="fade" class="ui-btn font-large blue-background white-color">Aggiorna tipologia</a></li>
                    </ul>
                </div>
            </div>

            <div data-role="content">
                <div class="list-type-label">
                    <p class="font-x-large orange-color">Lista delle tipologie disponibili</p>
                </div>
                <div class="list-type-container">
                    <ul id="see-type-list-ul" data-filter="true" data-inset="true">

                    </ul>
                </div>
            </div>

            <div id="insert-type-popup"  class="insert-popup" data-role="popup" data-overlay-theme="a" data-history="false">
                <form data-ajax="false" id="insert-type-form">
                    <h3>Inserimento tipologia</h3>

                    <fieldset id="input-type-fielset">
                        <div class="input-type-container">
                            <input class="font-large center-text" type="text" name="type" id="type" placeholder="Inserisci descrizione tipologia">
                        </div>

                        <div id="insert-type-message"></div>

                        <div class="ui-grid-a ui-responsive">
                            <div class="ui-block-a"><a href="#" id="add-type" class="ui-btn ui-shadow ui-corner-all blue-color">AGGIUNGI TIPOLOGIA</a></div>
                            <div class="ui-block-b"><a href="#" id="close-type" class="ui-btn ui-shadow ui-corner-all red-color">CHIUDI</a></div>
                        </div>
                    </fieldset>
                </form>
            </div>

            <div id="update-type-popup" class="insert-popup" data-role="popup" data-overlay-theme="a" data-history="false">
                <form data-ajax="false" id="update-type-form">
                    <h3>Aggiornamento tipologia</h3>

                    <fieldset id="input-type-fielset">

                        <select id="update-type-select" data-inset="true">
                            <option>Seleziona una tipologia...</option>
                        </select>

                        <div class="input-type-container">
                            <input class="font-large center-text" type="text" name="update-type-input" id="update-type-input" placeholder="Inserisci descrizione tipologia">
                        </div>

                        <div id="update-type-message"></div>

                        <div class="ui-grid-a ui-responsive">
                            <div class="ui-block-a"><a href="#" id="update-type" class="ui-btn ui-shadow ui-corner-all blue-color">AGGIORNA TIPOLOGIA</a></div>
<!--                            <div class="ui-block-b"><a href="#" id="close-update-type" class="ui-btn ui-shadow ui-corner-all red-color">CHIUDI</a></div>-->
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>

        <div data-role="page" id="insert-object">
            <div class="navbar-container">
                <div data-role="navbar">
                    <ul class="box-shadow-bottom">
                        <li><a href="#insert-object-popup" id="insert-object-popup-button" data-rel="popup" data-position-to="window" data-transition="fade" class="ui-btn font-large blue-background white-color">Inserisci oggetti</a></li>
                        <li><a href="#update-object-description-popup" id="update-object-description-popup-button" data-rel="popup" data-position-to="window" data-transition="fade" class="ui-btn font-large blue-background white-color">Aggiorna descrizione</a></li>
                        <li><a href="#update-object-type-popup" id="update-object-type-popup-button" data-rel="popup" data-position-to="window" data-transition="fade" class="ui-btn font-large blue-background white-color">Aggiorna tipologia</a></li>
                        <li><a href="#update-object-tag-popup" id="update-object-tag-popup-button" data-rel="popup" data-position-to="window" data-transition="fade" class="ui-btn font-large blue-background white-color">Aggiorna tag</a></li>
                    </ul>
                </div>
            </div>

            <div data-role="content">
                <div class="list-type-label">
                    <p class="font-x-large orange-color">Lista degli oggetti disponibili</p>
                </div>
                <div class="list-type-container">
                    <ul id="see-object-list-ul" data-filter="true" data-inset="true">

                    </ul>
                </div>
            </div>

            <div id="insert-object-popup"  class="insert-popup" data-role="popup" data-overlay-theme="a" data-history="false">
                <form data-ajax="false" id="insert-type-form">
                    <h3>Inserimento oggetti</h3>

                    <fieldset id="input-object-fielset">

                        <select id="insert-object-type-select" data-inset="true">
                            <option>Seleziona una tipologia...</option>
                        </select>

                        <select id="insert-object-tag-select" data-inset="true">
                            <option>Seleziona un tag...</option>
                        </select>

                        <div class="input-type-container">
                            <input class="font-large center-text" type="text" name="object-field" id="object-field" placeholder="Inserisci descrizione oggetto">
                        </div>

                        <div id="insert-object-message"></div>

                        <div class="ui-grid-a ui-responsive">
                            <div class="ui-block-a"><a href="#" id="add-object-popup" class="ui-btn ui-shadow ui-corner-all blue-color">AGGIUNGI OGGETTO</a></div>
                            <div class="ui-block-b"><a href="#" id="close-object-popup" class="ui-btn ui-shadow ui-corner-all red-color">CHIUDI</a></div>
                        </div>
                    </fieldset>
                </form>
            </div>

            <div id="update-object-description-popup" style="overflow-y: scroll;" class="insert-popup-350" data-role="popup" data-overlay-theme="a" data-history="false">
                <form data-ajax="false" id="update-object-description-form">
                    <h3>Aggiornamento oggetto</h3>

                    <fieldset id="update-object-description-fielset">

                        <div class="input-type-container">
                            <input class="font-large center-text input-field" type="text" name="update-object-description-input" id="update-object-description-input" placeholder="Inserisci descrizione oggetto">
                        </div>

                        <div class="ui-grid-a ui-responsive">
                            <a href="#" id="update-object-description" class="ui-btn ui-shadow ui-corner-all blue-color ui-responsive">AGGIORNA DESCRIZIONE</a>
                        </div>

                        <div id="update-object-description-message"></div>

                    </fieldset>

                    <div id="object-description-selected">
                        <ul>

                        </ul>
                    </div>

                    <div id="view-object-description-container">
                        <ul id="view-objects-description-ul" data-filter="true">

                        </ul>
                    </div>
                </form>
            </div>

            <div id="update-object-type-popup" style="overflow-y: scroll;" class="insert-popup-350" data-role="popup" data-overlay-theme="a" data-history="false">
                <form data-ajax="false" id="update-object-type-form">
                    <h3>Aggiornamento oggetto</h3>

                    <fieldset id="update-object-type-fielset">

                        <select id="update-object-type-select" data-inset="true">-->
                            <option>Seleziona una tipologia...</option>
                        </select>

                        <div class="ui-grid-a ui-responsive">
                            <a href="#" id="update-object-type" class="ui-btn ui-shadow ui-corner-all blue-color ui-responsive">AGGIORNA TIPOLOGIA</a>
                        </div>

                        <div id="update-object-type-message"></div>

                    </fieldset>

                    <div id="object-type-selected">
                        <ul>

                        </ul>
                    </div>

                    <div id="view-object-type-container">
                        <ul id="view-objects-type-ul" data-filter="true">

                        </ul>
                    </div>
                </form>
            </div>

            <div id="update-object-tag-popup" style="overflow-y: scroll;" class="insert-popup-350" data-role="popup" data-overlay-theme="a" data-history="false">
                <form data-ajax="false" id="update-object-tag-form">
                    <h3>Aggiornamento oggetto</h3>

                    <fieldset id="update-object-tag-fielset">

                        <select id="update-object-tag-select" data-inset="true">-->
                            <option>Seleziona un tag...</option>
                        </select>

                        <div class="ui-grid-a ui-responsive">
                            <a href="#" id="update-object-tag" class="ui-btn ui-shadow ui-corner-all blue-color ui-responsive">AGGIORNA TAG</a>
                        </div>

                        <div id="update-object-tag-message"></div>

                    </fieldset>

                    <div id="object-tag-selected">
                        <ul>

                        </ul>
                    </div>

                    <div id="view-object-tag-container">
                        <ul id="view-objects-tag-ul" data-filter="true">

                        </ul>
                    </div>
                </form>
            </div>
        </div>
<!--            <div id="update-object-description-popup" class="insert-popup" data-role="popup" data-overlay-theme="a" data-history="false">-->
<!--                <form data-ajax="false" id="update-object-form">-->
<!--                    <h3>Aggiornamento oggetto</h3>-->
<!---->
<!--                    <fieldset id="update-object-fielset">-->
<!---->
<!--                        <select id="update-object-type-select" data-inset="true">-->
<!--                            <option>Seleziona una tipologia...</option>-->
<!--                        </select>-->
<!---->
<!--                        <select id="update-object-tag-select" data-inset="true">-->
<!--                            <option>Seleziona un tag...</option>-->
<!--                        </select>-->
<!---->
<!--                        <div class="input-type-container">-->
<!--                            <input class="font-large center-text" type="text" name="update-type-input" id="update-type-input" placeholder="Inserisci descrizione oggetto">-->
<!--                        </div>-->
<!---->
<!--                        <div id="update-object-message"></div>-->
<!---->
<!--                        <div class="ui-grid-a ui-responsive">-->
<!--                            <div class="ui-block-a"><a href="#" id="update-object" class="ui-btn ui-shadow ui-corner-all blue-color">AGGIORNA OGGETTO</a></div>-->
<!--                            <!--                            <div class="ui-block-b"><a href="#" id="close-update-type" class="ui-btn ui-shadow ui-corner-all red-color">CHIUDI</a></div>-->-->
<!--                        </div>-->
<!--                    </fieldset>-->
<!--                </form>-->
<!--            </div>-->
<!--            <div id="update-object-description-popup" class="insert-popup" data-role="popup" data-overlay-theme="a" data-history="false">-->
<!--                <form data-ajax="false" id="update-object-form">-->
<!--                    <h3>Aggiornamento oggetto</h3>-->
<!---->
<!--                    <fieldset id="update-object-fielset">-->
<!---->
<!--                        <select id="update-object-type-select" data-inset="true">-->
<!--                            <option>Seleziona una tipologia...</option>-->
<!--                        </select>-->
<!---->
<!--                        <select id="update-object-tag-select" data-inset="true">-->
<!--                            <option>Seleziona un tag...</option>-->
<!--                        </select>-->
<!---->
<!--                        <div class="input-type-container">-->
<!--                            <input class="font-large center-text" type="text" name="update-type-input" id="update-type-input" placeholder="Inserisci descrizione oggetto">-->
<!--                        </div>-->
<!---->
<!--                        <div id="update-object-message"></div>-->
<!---->
<!--                        <div class="ui-grid-a ui-responsive">-->
<!--                            <div class="ui-block-a"><a href="#" id="update-object" class="ui-btn ui-shadow ui-corner-all blue-color">AGGIORNA OGGETTO</a></div>-->
<!--                            <!--                            <div class="ui-block-b"><a href="#" id="close-update-type" class="ui-btn ui-shadow ui-corner-all red-color">CHIUDI</a></div>-->-->
<!--                        </div>-->
<!--                    </fieldset>-->
<!--                </form>-->
<!--            </div>-->

<!--        <div id="insert-object-popup" data-role="popup" data-overlay-theme="a" class="ui-content" data-history="false">-->
<!--            <form data-ajax="false" id="insert-object-form">-->
<!--                <h3>Inserimento oggetto</h3>-->
<!---->
<!--                <fieldset id="input-object-fielset">-->
<!--                    <select id="object-type-select" data-inset="true" data-icon="carat-d">-->
<!--                        <option>Seleziona una tipologia...</option>-->
<!--                    </select>-->
<!---->
<!--                    <div class="input-type-container">-->
<!--                        <input class="" type="text" name="object" id="object" placeholder="Inserisci descrizione oggetto">-->
<!--                    </div>-->
<!---->
<!--                    <div id="insert-object-message"></div>-->
<!---->
<!--                    <div class="input-type-container">-->
<!--                        <input type="submit" id="submit-input-object" data-inline="true" class="mdl-typography--font-bold float-left" value="AGGIUNGI OGGETTO">-->
<!--                    </div>-->
<!--                    <div class="input-type-container">-->
<!--                        <input type="button" id="close-input-object" data-inline="true" class="mdl-typography--font-bold float-right red-color" value="CHIUDI">-->
<!--                    </div>-->
<!--                </fieldset>-->
<!--            </form>-->
<!--        </div>-->

<!--        <div id="view-types-popup" data-role="popup" data-overlay-theme="a" class="ui-content" data-history="false">-->
<!--            <div id="view-types-container">-->
<!--                <h3>Tipologie di oggetti</h3>-->
<!--                <ul id="view-types-ul" data-filter="true">-->
<!---->
<!--                </ul>-->
<!--            </div>-->
<!--        </div>-->
<!---->
<!--        <div id="view-objects-popup" data-role="popup" data-overlay-theme="a" class="ui-content" data-history="false">-->
<!--            <div id="view-objects-container">-->
<!--                <h3>Lista degli oggetti</h3>-->
<!--                <ul id="view-objects-ul" data-filter="true">-->
<!---->
<!--                </ul>-->
<!--            </div>-->
<!--        </div>-->

        <script src="js/helper.js"></script>
        <script src="js/content.js"></script>
        <script src="js/create-kit.js"></script>
        <script src="js/logout.js"></script>
        <script src="js/close-kit.js"></script>
        <script src="js/all-kits.js"></script>
        <script src="js/insert-type.js"></script>
        <script src="js/insert-object.js"></script>
        <script src="js/view-types.js"></script>
        <script src="js/view-objects.js"></script>
        <script src="js/object-crud.js"></script>
    </body>
</html>
