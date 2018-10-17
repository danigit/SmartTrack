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
<!--pagina principale nell'area riservata-->
        <div data-role="page" id="main-content">
            <div class="navbar-container">
                <div data-role="navbar">
                    <ul class="box-shadow-bottom">
                        <li><a href="#crea-kit-page" id="crea-kit" class="ui-btn font-large blue-background white-color">Crea kit</a></li>
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
                        <tr class="box-shadow-bottom">
                            <th data-priority="1" class="border-right-no-color font-x-large padding-10 center-text">Id kit</th>
                            <th data-priority="2" class="border-right-no-color font-x-large padding-10 center-text">Descrizione</th>
                            <th data-priority="3" class="border-right-no-color font-x-large padding-10 center-text">Data creazione</th>
                            <th data-priority="4" ></th>
                            <th data-priority="5" ></th>
                        </tr>
                    </thead>
                    <tbody id="open-kit-body">

                    </tbody>
                </table>
            </div>
        </div>
<!--end pagina principale nell'area riservata-->


<!--pagina creazione kit-->
        <div data-role="page" id="crea-kit-page">
            <div class="kit-create-label box-shadow-bottom padding-20">
                <p class="font-x-large blue-color">Creazione kit</p>
            </div>

            <div class="ui-grid-d center back-home-buttons">
                <div class="ui-block-a"><a class="ui-shadow ui-btn ui-corner-all ui-icon-arrow-l ui-btn-icon-notext ui-btn-inline" data-rel="back">Button</a></div>
                <div class="ui-block-b"><a href="#main-content" class="ui-shadow ui-btn ui-corner-all ui-icon-home ui-btn-icon-notext ui-btn-inline">Button</a></div>
            </div>


            <div class="select-container">
                <form>
                    <fieldset class="ui-field-contain" id="type-select-fieldset" data-role="controlgoup" data-inset="true">
                        <label for="type-select-fieldset" class="font-x-large">Seleziona una tipologia di oggetti</label>
                        <select id="type-select" data-inset="true" title="">
                            <option>Seleziona una tipologia...</option>
                        </select>
                    </fieldset>
                </form>
            </div>

            <div class="type-list-container">
                <form class="ui-filterable">
                    <input id="filterBasic-input" data-type="search" title="">
                </form>
                <ul id="type-list-ul" data-role="listview" data-split-icon="plus" data-filter="true" data-input="#filterBasic-input">

                </ul>
            </div>

            <div class="kit-objects-container">
                <div class="object-list-label">
                    <p class="font-large blue-color center-text">Lista degli elementi selezionati per comporre il kit</p>
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
                <div class="ui-grid-b ui-responsive white-background">
                    <div class="ui-block-a"><a href="#create-kit-from-template-page" id="create-kit-from-template" class="ui-btn ui-shadow ui-corner-all font-large width-90 border-green-1 green-color">Crea da template</a></div>
                    <div class="ui-block-b ui-disabled"><a href="#" id="create-kit-suspend" class="ui-btn ui-shadow ui-corner-all font-large width-90 border-orange-1 orange-color">Sospendi kit</a></div>
                    <div class="ui-block-c ui-disabled"><a href="#" id="create-kit-submit" class="ui-btn ui-shadow ui-corner-all font-large width-90 border-green-1 green-color">Crea kit</a></div>
                </div>
            </div>

            <div id="error-popup" data-role="popup" data-overlay-theme="a" class="ui-content error-popup" data-history="false">
                <p class="error-title"></p>
                <p class="error-content"></p>
            </div>
        </div>
<!--end pagina creazione kit-->

<!--pagina creazione kit da template-->
        <div data-role="page" id="create-kit-from-template-page">
            <div class="kit-create-label box-shadow-bottom">
                <p class="font-x-large blue-color">Creazione kit da template</p>
            </div>

            <div class="ui-grid-d center back-home-buttons">
                <div class="ui-block-a"><a class="ui-shadow ui-btn ui-corner-all ui-icon-arrow-l ui-btn-icon-notext ui-btn-inline" data-rel="back">Button</a></div>
                <div class="ui-block-b"><a href="#main-content" class="ui-shadow ui-btn ui-corner-all ui-icon-home ui-btn-icon-notext ui-btn-inline">Button</a></div>
            </div>

            <div class="select-container">
                <form>
                    <fieldset class="ui-field-contain" id="see-kit-template-fielset" data-role="controlgoup" data-inset="true">
                        <label for="see-kit-template-fielset" class="font-x-large">Seleziona un template</label>
                        <select id="see-kit-template-select" data-inset="true" title="">
                            <option>Seleziona un template</option>
                        </select>
                    </fieldset>

                    <div id="type-count-container">
                        <p class="font-large center-text red-color margin-top-50"></p>
                    </div>

                    <fieldset class="ui-field-contain" id="type-select-from-template-fieldset" data-role="controlgoup" data-inset="true">
                        <label for="type-select-fieldset" class="font-x-large">Seleziona una tipologia di oggetti</label>
                        <select id="type-select-from-template" data-inset="true" title="">
                            <option>Seleziona una tipologia...</option>
                        </select>
                    </fieldset>
                </form>
            </div>

            <div class="type-list-container">
                <form class="ui-filterable">
                    <input id="filterBasic-input-from-template" data-type="search" title="">
                </form>
                <ul id="type-list-ul-from-template" data-role="listview" data-split-icon="plus" data-filter="true" data-input="#filterBasic-input">

                </ul>
            </div>

            <div class="kit-objects-container">
                <div class="object-list-label">
                    <p class="font-large blue-color">Lista degli elementi selezionati per comporre il kit</p>
                </div>
                <ul data-role="listview" id="object-list-ul-from-template">

                </ul>
            </div>
            <div class="kit-description-container">
                <fieldset id="create-kit-fielset-from-template">
                    <div class="">
                        <input class="font-large" type="text" name="description-from-template" id="description-from-template" placeholder="Inserisci la descrizione del kit">
                    </div>
                </fieldset>
            </div>

            <div id="error-msg-create-kit-from-template"></div>

            <div data-role="footer" data-id="foo1-from-template" data-position="fixed">
                <div class="ui-grid-a ui-responsive white-background">
                    <div class="ui-block-a ui-disabled"><a href="#" id="create-kit-suspend-from-template" class="ui-btn ui-shadow ui-corner-all width-93 font-large">Sospendi kit</a></div>
                    <div class="ui-block-b ui-disabled"><a href="#" id="create-kit-submit-from-template" class="ui-btn ui-shadow ui-corner-all width-93 font-large">Crea kit</a></div>
                </div>
            </div>

            <div id="error-popup-from-template" data-role="popup" data-overlay-theme="a" class="ui-content error-popup" data-history="false">
                <p class="error-title"></p>
                <p class="error-content"></p>
            </div>
        </div>
<!--end pagina creazione kit da template-->

<!--pagina visualizzazione degli oggetti di un kit-->
        <div data-role="page" id="see-kit-objects-position">
            <div class="kit-create-label box-shadow-bottom">
                <p class="font-x-large blue-color">Cronologia oggetti kit</p>
            </div>

            <div class="ui-grid-d center back-home-buttons">
                <div class="ui-block-a"><a class="ui-shadow ui-btn ui-corner-all ui-icon-arrow-l ui-btn-icon-notext ui-btn-inline" data-rel="back">Button</a></div>
                <div class="ui-block-b"><a href="#main-content" class="ui-shadow ui-btn ui-corner-all ui-icon-home ui-btn-icon-notext ui-btn-inline">Button</a></div>
            </div>

            <div class="table-label"><p class="font-xx-large center-text line-height-3 blue-color"><b>Tabella posizioni oggetti kit</b></p></div>
            <div class="table-container">
                <table data-role="table" id="kit-objects-table" data-mode="reflow" class="ui-responsive">
                    <thead>
                    <tr class="box-shadow-bottom">
                        <th data-priority="1" class="border-right-no-color font-x-large padding-10 center-text">Id oggetto</th>
                        <th data-priority="2" class="border-right-no-color font-x-large padding-10 center-text">Nome oggetto</th>
                        <th data-priority="3" class="border-right-no-color font-x-large padding-10 center-text">Id kit</th>
                        <th data-priority="4" class="border-right-no-color font-x-large padding-10 center-text">Descrizione ambiente</th>
                        <th data-priority="5" class="border-right-no-color font-x-large padding-10 center-text">Id ambiente</th>
                    </tr>
                    </thead>
                    <tbody id="kit-objects-body">

                    </tbody>
                </table>
            </div>
        </div>
<!--end pagina visualizzazione degli oggetti di un kit-->

<!--pagina visualizzazione di tutti i kit e la cronologia dei kit -->
        <div data-role="page" id="all-kits">
            <div class="navbar-container">
                <div data-role="navbar">
                    <ul class="box-shadow-bottom">
                        <li><a href="#see-all-kits" id="see-kits" class="ui-btn font-large blue-background white-color">Visualizza kit</a></li>
                        <li><a href="#see-kits-history" id="kits-history" class="ui-btn font-large blue-background white-color">Visualizza cronologia</a></li>
                    </ul>
                </div>
            </div>

            <div class="ui-grid-d center back-home-buttons">
                <div class="ui-block-a"><a class="ui-shadow ui-btn ui-corner-all ui-icon-arrow-l ui-btn-icon-notext ui-btn-inline" data-rel="back">Button</a></div>
                <div class="ui-block-b"><a href="#main-content" class="ui-shadow ui-btn ui-corner-all ui-icon-home ui-btn-icon-notext ui-btn-inline">Button</a></div>
            </div>

            <div data-role="content">
                <div class="table-label"><p class="font-xx-large center-text line-height-3 blue-color"><b>Tabella di tutti i kit incompleti</b></p></div>
                <div class="table-container">
                    <table data-role="table" id="all-incomplete-kits-table" data-mode="reflow" class="ui-responsive">
                        <thead>
                        <tr class="box-shadow-bottom">
                            <th data-priority="1" class="border-right-no-color font-x-large padding-10 center-text">Id kit</th>
                            <th data-priority="2" class="border-right-no-color font-x-large padding-10 center-text">Descrizione</th>
                            <th data-priority="3" class="border-right-no-color font-x-large padding-10 center-text">Id oggetto</th>
                            <th data-priority="4" class="border-right-no-color font-x-large padding-10 center-text">Nome oggetto</th>
                            <th data-priority="5" class="border-right-no-color font-x-large padding-10 center-text">Data creazione</th>
                            <th data-priority="6" class="border-right-no-color font-x-large padding-10 center-text">Data chiusura</th>
                        </tr>
                        </thead>
                        <tbody id="all-incomplete-kits-body">

                        </tbody>
                    </table>
                </div>

                <div id="all-incomplete-kits-error-message"></div>

            </div>
        </div>
<!--end pagina visualizzazione di tutti i kit e la cronologia dei kit-->

<!--pagina visualizzazione di tutti i kit-->
        <div data-role="page" id="see-all-kits">
            <div class="kit-create-label box-shadow-bottom padding-20">
                <p class="font-x-large blue-color">Tutti i kit</p>
            </div>

            <div class="ui-grid-d center back-home-buttons">
                <div class="ui-block-a"><a class="ui-shadow ui-btn ui-corner-all ui-icon-arrow-l ui-btn-icon-notext ui-btn-inline" data-rel="back">Button</a></div>
                <div class="ui-block-b"><a href="#main-content" class="ui-shadow ui-btn ui-corner-all ui-icon-home ui-btn-icon-notext ui-btn-inline">Button</a></div>
            </div>

            <div class="table-label"><p class="font-xx-large center-text line-height-3 blue-color"><b>Tabella di tutti i kit</b></p></div>
            <div class="table-container">
                <table data-role="table" id="all-kit-table" data-mode="reflow" class="ui-responsive">
                    <thead>
                    <tr class="box-shadow-bottom">
                        <th data-priority="1" class="border-right-no-color font-x-large padding-10 center-text">Id kit</th>
                        <th data-priority="2" class="border-right-no-color font-x-large padding-10 center-text">Descrizione</th>
                        <th data-priority="4" class="border-right-no-color font-x-large padding-10 center-text">Data creazione</th>
                        <th data-priority="5" class="border-right-no-color font-x-large padding-10 center-text">Kit chiuso</th>
                    </tr>
                    </thead>
                    <tbody id="all-kit-body">

                    </tbody>
                </table>
            </div>
            <div id="all-kit-error-message"></div>
        </div>
<!--end pagina visualizzazione di tutti i kit-->

<!--pagina visualizzazione delle cronologia dei kit-->
        <div data-role="page" id="see-kits-history">
            <div class="kit-create-label box-shadow-bottom padding-20">
                <p class="font-x-large blue-color">Cronologia kit</p>
            </div>

            <div class="ui-grid-d center back-home-buttons">
                <div class="ui-block-a"><a class="ui-shadow ui-btn ui-corner-all ui-icon-arrow-l ui-btn-icon-notext ui-btn-inline" data-rel="back">Button</a></div>
                <div class="ui-block-b"><a href="#main-content" class="ui-shadow ui-btn ui-corner-all ui-icon-home ui-btn-icon-notext ui-btn-inline">Button</a></div>
            </div>

            <fieldset id="see-kit-history-fielset" class="kit-selection-label">
                <label for="see-kit-history-fielset" class="font-x-large orange-color margin-bottom-5">Seleziona i kit da visualizzare</label>
                <select id="see-kit-history-select" data-inset="true" title="">
                    <option id="all">Tutti i kit</option>
                    <option id="closed">Kit chiusi</option>
                    <option id="incomplete">Kit incompleti</option>
                </select>
            </fieldset>

            <div id="all-kit-history-error-message"></div>
            <div class="table-label"><p class="font-xx-large center-text line-height-3 blue-color"><b>Tabella della cronologia dei kit</b></p></div>
            <div class="table-container">
                <table data-role="table" id="all-kit-history-table" data-mode="reflow" class="ui-responsive">
                    <thead>
                    <tr class="box-shadow-bottom">
                        <th data-priority="1" class="border-right-no-color font-x-large padding-10 center-text">Id kit</th>
                        <th data-priority="2" class="border-right-no-color font-x-large padding-10 center-text">Descrizione</th>
                        <th data-priority="2" class="border-right-no-color font-x-large padding-10 center-text">Nome oggetto</th>
                        <th data-priority="4" class="border-right-no-color font-x-large padding-10 center-text">Data</th>
                        <th data-priority="5" class="border-right-no-color font-x-large padding-10 center-text">Ambiente</th>
                    </tr>
                    </thead>
                    <tbody id="all-kit-history-body">

                    </tbody>
                </table>
            </div>
        </div>
<!--end pagina visualizzazione della cronologia dei kit-->

<!--pagina chiusura kit-->
        <div data-role="page" id="close-kit">
            <div class="kit-create-label box-shadow-bottom">
                <p class="font-x-large blue-color">Chiusura kit</p>
            </div>

            <div class="ui-grid-d center back-home-buttons">
                <div class="ui-block-a"><a class="ui-shadow ui-btn ui-corner-all ui-icon-arrow-l ui-btn-icon-notext ui-btn-inline" data-rel="back">Button</a></div>
                <div class="ui-block-b"><a href="#main-content" class="ui-shadow ui-btn ui-corner-all ui-icon-home ui-btn-icon-notext ui-btn-inline">Button</a></div>
            </div>

            <div class="table-label"><p class="font-xx-large center-text line-height-3 blue-color"><b>Tabella degli oggetti presenti nel kit</b></p></div>
            <div class="table-container">
                <table data-role="table" id="close-kit-table" data-mode="reflow" class="ui-responsive">
                    <thead>
                    <tr class="box-shadow-bottom">
                        <th data-priority="1" class="border-right-no-color font-x-large padding-10 center-text">Id oggetto</th>
                        <th data-priority="2" class="border-right-no-color font-x-large padding-10 center-text">Tipologia oggetto</th>
                        <th data-priority="4" class="border-right-no-color font-x-large padding-10 center-text">Nome oggetto</th>
                        <th data-priority="5" class="border-right-no-color font-x-large padding-10 center-text"></th>
                    </tr>
                    </thead>
                    <tbody id="close-kit-body">

                    </tbody>
                </table>
            </div>

            <div id="close-kit-popup" class="success-popup" data-role="popup" data-overlay-theme="a" data-history="false">
                <p class="error-title font-large"></p>
                <span class="font-medium padding-10"></span>
            </div>

            <div data-role="footer" data-id="close-kit-footer" data-position="fixed">
                <div class="ui-grid-solo white-background">
                    <div class="ui-block-a"><a href="#" id="close-kit-and-save-button" class="ui-btn ui-shadow ui-corner-all width-90 margin-auto font-large green-color border-green-1">Chiudi kit</a></div>
                </div>

            </div>
        </div>
<!--end pagina chiusura kit-->

<!--pagine inserimento tipologia-->
        <div data-role="page" id="insert-type">
            <div class="navbar-container">
                <div data-role="navbar">
                    <ul class="box-shadow-bottom">
                        <li><a href="#insert-type-popup" data-rel="popup" data-position-to="window" data-transition="fade" class="ui-btn font-large blue-background white-color">Inserisci tipologia</a></li>
                        <li><a href="#update-type-popup" id="update-type-popup-button" data-rel="popup" data-position-to="window" data-transition="fade" class="ui-btn font-large blue-background white-color">Aggiorna tipologia</a></li>
                    </ul>
                </div>
            </div>

            <div class="ui-grid-d center back-home-buttons">
                <div class="ui-block-a"><a class="ui-shadow ui-btn ui-corner-all ui-icon-arrow-l ui-btn-icon-notext ui-btn-inline" data-rel="back">Button</a></div>
                <div class="ui-block-b"><a href="#main-content" class="ui-shadow ui-btn ui-corner-all ui-icon-home ui-btn-icon-notext ui-btn-inline">Button</a></div>
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
                    <h3 class="bold-text">Inserimento tipologia</h3>

                    <fieldset id="input-type-fielset">
                        <div class="input-type-container">
                            <input class="font-large center-text border-blue-2" type="text" name="type" id="type" placeholder="Inserisci descrizione tipologia">
                        </div>

                        <div id="insert-type-message"></div>

                        <div class="ui-grid-a ui-responsive">
                            <div class="ui-block-a"><a href="#" id="add-type" class="ui-btn ui-shadow ui-corner-all green-color border-green-1">AGGIUNGI TIPOLOGIA</a></div>
                            <div class="ui-block-b"><a href="#" id="close-type" class="ui-btn ui-shadow ui-corner-all red-color border-red-1">CHIUDI</a></div>
                        </div>
                    </fieldset>
                </form>
            </div>

            <div id="update-type-popup" class="insert-popup" data-role="popup" data-overlay-theme="a" data-history="false">
                <form data-ajax="false" id="update-type-form">
                    <h3 class="bold-text">Aggiornamento tipologia</h3>

                    <fieldset id="input-type-fielset">

                        <select id="update-type-select" data-inset="true" title="">
                            <option>Seleziona una tipologia...</option>
                        </select>

                        <div class="input-type-container">
                            <input class="font-large center-text border-blue-2" type="text" name="update-type-input" id="update-type-input" placeholder="Inserisci descrizione tipologia">
                        </div>

                        <div id="update-type-message"></div>

                        <div class="ui-grid-a ui-responsive">
                            <div class="ui-block-a"><a href="#" id="update-type" class="ui-btn ui-shadow ui-corner-all green-color border-green-1">AGGIORNA TIPOLOGIA</a></div>
                            <div class="ui-block-b"><a href="#" id="close-update-type" class="ui-btn ui-shadow ui-corner-all red-color border-red-1">CHIUDI</a></div>
                        </div>
                    </fieldset>
                </form>
            </div>

            <div data-role="popup" id="delete-type-confirm" class="confirm-delete" data-history="false" data-overlay-theme="a">
                <div data-role="content">
                    <h3 class="delete-type-confirm-header center-text blue-color margin-bottom-30"></h3>
                    <p class="delete-type-confirm-text center-text margin-bottom-30"></p>
                    <a href="#" class="delete-type-confirm-button width-90 margin-lr-auto" data-role="button" data-rel="back">Elimina tipologia</a>
                    <a href="#" class="width-90 margin-lr-auto" data-role="button" data-rel="back">Anulla</a>
                </div>
            </div>
        </div>
<!--enc pagina inserimento tipologia-->

<!--pagina inserimento oggetto-->
        <div data-role="page" id="insert-object">
            <div class="navbar-container">
                <div data-role="navbar">
                    <ul class="box-shadow-bottom">
                        <li><a href="#insert-object-popup" id="insert-object-popup-button" data-rel="popup" data-position-to="window" data-transition="fade" class="ui-btn font-large blue-background white-color">Inserisci oggetto</a></li>
                        <li><a href="#update-object-description-popup" id="update-object-description-popup-button" data-rel="popup" data-position-to="window" data-transition="fade" class="ui-btn font-large blue-background white-color">Aggiorna descrizione</a></li>
                        <li><a href="#update-object-type-popup" id="update-object-type-popup-button" data-rel="popup" data-position-to="window" data-transition="fade" class="ui-btn font-large blue-background white-color">Aggiorna tipologia</a></li>
                        <li><a href="#update-object-tag-popup" id="update-object-tag-popup-button" data-rel="popup" data-position-to="window" data-transition="fade" class="ui-btn font-large blue-background white-color">Aggiorna tag</a></li>
                    </ul>
                </div>
            </div>

            <div class="ui-grid-d center back-home-buttons">
                <div class="ui-block-a"><a class="ui-shadow ui-btn ui-corner-all ui-icon-arrow-l ui-btn-icon-notext ui-btn-inline" data-rel="back">Button</a></div>
                <div class="ui-block-b"><a href="#main-content" class="ui-shadow ui-btn ui-corner-all ui-icon-home ui-btn-icon-notext ui-btn-inline">Button</a></div>
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
                    <h3 class="bold-text">Inserimento oggetti</h3>

                    <fieldset id="input-object-fielset">

                        <select id="insert-object-type-select" data-inset="true" title="">
                            <option>Seleziona una tipologia...</option>
                        </select>

                        <select id="insert-object-tag-select" data-inset="true" title="">
                            <option>Seleziona un tag...</option>
                        </select>

                        <div class="input-type-container">
                            <input class="font-large center-text border-blue-2" type="text" name="object-field" id="object-field" placeholder="Inserisci descrizione oggetto">
                        </div>

                        <div id="insert-object-message" class="border-radius-10"></div>

                        <div class="ui-grid-a ui-responsive">
                            <div class="ui-block-a"><a href="#" id="add-object-popup" class="ui-btn ui-shadow ui-corner-all green-color border-green-1">AGGIUNGI OGGETTO</a></div>
                            <div class="ui-block-b"><a href="#" id="close-object-popup" class="ui-btn ui-shadow ui-corner-all red-color border-red-1">CHIUDI</a></div>
                        </div>
                    </fieldset>
                </form>
            </div>

            <div id="update-object-description-popup" style="overflow-y: scroll;" class="insert-popup-350" data-role="popup" data-overlay-theme="a" data-history="false">
                <form data-ajax="false" id="update-object-description-form">
                    <h3 class="bold-text">Aggiornamento descrizione</h3>

                    <fieldset id="update-object-description-fielset">

                        <div class="input-type-container">
                            <input class="font-large center-text input-field border-blue-2" type="text" name="update-object-description-input" id="update-object-description-input" placeholder="Inserisci descrizione oggetto">
                        </div>

                        <div class="ui-grid-a ui-responsive">
                            <a href="#" id="update-object-description" class="ui-btn ui-shadow ui-corner-all green-color ui-responsive border-green-1">AGGIORNA DESCRIZIONE</a>
                        </div>

                        <div id="update-object-description-message" class="border-radius-10"></div>

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
                    <h3 class="bold-text">Aggiornamento tipologia</h3>

                    <fieldset id="update-object-type-fielset">

                        <select id="update-object-type-select" data-inset="true" title="">
                            <option>Seleziona una tipologia...</option>
                        </select>

                        <div class="ui-grid-a ui-responsive">
                            <a href="#" id="update-object-type" class="ui-btn ui-shadow ui-corner-all green-color border-green-1 ui-responsive">AGGIORNA TIPOLOGIA</a>
                        </div>

                        <div id="update-object-type-message" class="border-radius-10"></div>

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
                    <h3 class="bold-text">Aggiornamento tag</h3>

                    <fieldset id="update-object-tag-fielset">

                        <select id="update-object-tag-select" data-inset="true" title="">
                            <option>Seleziona un tag...</option>
                        </select>

                        <div class="ui-grid-a ui-responsive">
                            <a href="#" id="update-object-tag" class="ui-btn ui-shadow ui-corner-all green-color border-green-1 ui-responsive">AGGIORNA TAG</a>
                        </div>

                        <div id="update-object-tag-message" class="border-radius-10"></div>

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
            
            <div data-role="popup" id="delete-object-confirm" class="confirm-delete" data-history="false" data-overlay-theme="a">
                <div data-role="content">
                    <h3 class="delete-object-confirm-header center-text blue-color margin-bottom-30"></h3>
                    <p class="delete-object-confirm-text center-text margin-bottom-30"></p>
                    <a href="#" class="delete-object-confirm-button width-90 margin-lr-auto" data-role="button" data-rel="back">Elimina oggetto</a>
                    <a href="#" class="width-90 margin-lr-auto" data-role="button" data-rel="back">Anulla</a>
                </div>
            </div>
        </div>
<!--end pgina inserimento oggetto-->

<!--inserimento file javascript nella pagina-->
        <script src="js/helper.js"></script>
        <script src="js/content.js"></script>
        <script src="js/create-kit.js"></script>
        <script src="js/create-kit-from-template.js"></script>
        <script src="js/logout.js"></script>
        <script src="js/close-kit.js"></script>
        <script src="js/all-kits.js"></script>
        <script src="js/insert-type.js"></script>
        <script src="js/insert-object.js"></script>
        <script src="js/view-types.js"></script>
        <script src="js/view-objects.js"></script>
        <script src="js/object-crud.js"></script>
        <script src="js/see-history.js"></script>
<!--end inserimento file javascript nella pagina-->

    </body>
</html>
