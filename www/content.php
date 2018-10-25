<?php
/**
 * Developer: Daniel Surpanu
 */

if (!isset($_SESSION))
    session_start();

if (!isset($_SESSION['secure'], $_SESSION['username']))
    header('Location: index.php');
?>

<!DOCTYPE html>
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
        <link rel="stylesheet" href="css/jquery.mobile-1.4.5.min.css">

        <script src="js/default/jquery-2.2.4.js"></script>
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
                        <li><a href="#crea-kit-page" id="crea-kit" class="ui-btn font-large blue-background white-color">Creazione kit</a></li>
                        <li><a href="#all-kits" class="ui-btn font-large blue-background white-color">Cronologia kit</a></li>
                        <li><a href="#insert-type" class="ui-btn font-large blue-background white-color">Gestione tipologie</a></li>
                        <li><a href="#insert-object" class="ui-btn font-large blue-background white-color">Gestione oggetti</a></li>
                        <li><a href="#" id="logout" class="ui-btn font-large blue-background white-color">Logout</a></li>
                    </ul>
                </div>
            </div>

            <div id="error-msg" class="margin-top-50"></div>

            <div class="table-label"><p class="font-xx-large center-text line-height-3 blue-color"><b>Tabella kit creati e non ancora chiusi</b></p></div>

            <div class="table-container">
                <table data-role="table" id="open-kit-table" data-mode="reflow" class="ui-responsive">
                    <thead>
                        <tr class="box-shadow-bottom">
                            <th data-priority="2" class="border-right-no-color font-x-large padding-10 center-text">Descrizione</th>
                            <th data-priority="3" class="border-right-no-color font-x-large padding-10 center-text">Data creazione</th>
                            <th colspan="3" data-priority="4" class="font-x-large padding-10 center-text">funzionalità</th>
                           <!--
                            <th data-priority="5" class="font-x-large padding-10">Funzionalitá</th>
                            <th data-priority="6" class="border-right-no-color font-x-large padding-10 center-text"></th>-->
                        </tr>
                    </thead>
                    <tbody id="open-kit-body">

                    </tbody>
                </table>
            </div>

            <div class="open-kit-body table-empty">
            </div>

            <div id="error-content-popup" data-role="popup" data-overlay-theme="a" class="ui-content error-popup" data-history="false">
                <p class="error-title"></p>
                <p class="error-content"></p>
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
                        <label for="type-select-fieldset" class="font-x-large bold-text">Seleziona una tipologia di oggetti</label>
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
                    <div class="ui-block-a"><a href="#create-kit-from-template-page" id="create-kit-from-template" class="ui-btn ui-shadow ui-corner-all font-large width-90 border-green-1 green-color inset-shadow-green">Crea da template</a></div>
                    <div class="ui-block-b ui-disabled"><a href="#" id="create-kit-suspend" class="ui-btn ui-shadow ui-corner-all font-large width-90 border-orange-1 orange-color inset-shadow-orange">Sospendi kit</a></div>
                    <div class="ui-block-c ui-disabled"><a href="#" id="create-kit-submit" class="ui-btn ui-shadow ui-corner-all font-large width-90 border-green-1 green-color inset-shadow-green">Crea kit</a></div>
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
            <div class="kit-create-label box-shadow-bottom padding-20">
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

                    <fieldset class="ui-field-contain ui-disabled" id="type-select-from-template-fieldset" data-role="controlgoup" data-inset="true">
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
                    <div class="ui-block-a ui-disabled"><a href="#" id="create-kit-suspend-from-template" class="ui-btn ui-shadow ui-corner-all font-large width-93 border-orange-1 orange-color">Sospendi kit</a></div>
                    <div class="ui-block-b ui-disabled"><a href="#" id="create-kit-submit-from-template" class="ui-btn ui-shadow ui-corner-all font-large width-93 border-green-1 green-color">Crea kit</a></div>
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
            <div class="kit-create-label box-shadow-bottom padding-20">
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
                        <th data-priority="2" class="border-right-no-color font-x-large padding-10 center-text">Nome oggetto</th>
                        <th data-priority="3" class="border-right-no-color font-x-large padding-10 center-text">Nome kit</th>
                        <th data-priority="4" class="border-right-no-color font-x-large padding-10 center-text">Descrizione ambiente</th>
                    </tr>
                    </thead>
                    <tbody id="kit-objects-body">

                    </tbody>
                </table>
            </div>

            <div class="kit-objects-body table-empty">
            </div>
        </div>
<!--end pagina visualizzazione degli oggetti di un kit-->

<!--pagina visualizzazione di tutti i kit e la cronologia dei kit -->
        <div data-role="page" id="all-kits">
            <div class="navbar-container">
                <div data-role="navbar">
                    <ul class="box-shadow-bottom">
                        <li><a href="#see-incomplete-kits" id="see-incomplete-kits-button" class="ui-btn font-large blue-background white-color">Visualizza stato kit incompleti</a></li>
                    </ul>
                </div>
            </div>

            <div class="ui-grid-d center back-home-buttons">
                <div class="ui-block-a"><a class="ui-shadow ui-btn ui-corner-all ui-icon-arrow-l ui-btn-icon-notext ui-btn-inline" data-rel="back">Button</a></div>
                <div class="ui-block-b"><a href="#main-content" class="ui-shadow ui-btn ui-corner-all ui-icon-home ui-btn-icon-notext ui-btn-inline">Button</a></div>
            </div>

            <div id="check-all-kits-content" class="margin-top-50 margin-l-5 width-90">
                <form>
                    <label>
                        <input type="checkbox" name="all-objects" id="all-objects" class="blue-color">Visualizza cronologia kit chiusi
                    </label>
                </form>
            </div>

            <div id="from-to-date" class="margin-l-5">
                <p class="float-left blue-color bold-text font-large">Visualizza la cronologia degli oggetti dal </p>
                <div class="float-left width-200 margin-l-5">
<!--                    <input style="width: 200px" type="date" id="from" data-role="datebox" data-options='{"mode": "calbox", "useNewStyle":true}'>-->
                    <input type="date" id="from" >
                </div>
                <p class="float-left margin-l-5 blue-color bold-text font-large">al</p>
                <div class="float-left width-200 margin-l-5">
<!--                    <input type="date" id="to" data-role="datebox" data-options='{"mode": "calbox", "useNewStyle":true}'>-->
                    <input type="date" id="to">
                </div>
            </div>

            <br>

            <div class="table-label">
                <p class="font-xx-large center-text line-height-3 blue-color"><b>Kit</b></p>
            </div>

            <div class="table-container">
                <table data-role="table" id="all-kit-table" data-mode="reflow" class="ui-responsive">
                    <thead>
                    <tr class="box-shadow-bottom">
                        <th data-priority="2" class="border-right-no-color font-x-large padding-10 center-text">Descrizione</th>
                        <th data-priority="4" class="border-right-no-color font-x-large padding-10 center-text">Data creazione</th>
                        <th data-priority="5" class="border-right-no-color font-x-large padding-10 center-text">Kit chiuso</th>
                        <th data-priority="6" class="border-right-no-color font-x-large padding-10 center-text">Visualizza oggetti</th>
                    </tr>
                    </thead>
                    <tbody id="all-kit-body">

                    </tbody>
                </table>
            </div>

            <div class="all-kit-body table-empty">
            </div>

            <div id="all-kit-error-message"></div>
        </div>
<!--end pagina visualizzazione di tutti i kit e la cronologia dei kit-->

<!--pagina visualizzazione di tutti i kit incompleti-->
        <div data-role="page" id="see-incomplete-kits">
            <div class="kit-create-label box-shadow-bottom padding-20">
                <p class="font-x-large blue-color">Tutti i kit incompleti</p>
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
                            <th data-priority="2" class="border-right-no-color font-x-large padding-10 center-text">Descrizione kit</th>
                            <th data-priority="4" class="border-right-no-color font-x-large padding-10 center-text">Nome oggetto</th>
                            <th data-priority="5" class="border-right-no-color font-x-large padding-10 center-text">Data creazione</th>
                            <th data-priority="6" class="border-right-no-color font-x-large padding-10 center-text">Data chiusura</th>
                            <th data-priority="6" class="border-right-no-color font-x-large padding-10 center-text"></th>
                        </tr>
                        </thead>
                        <tbody id="all-incomplete-kits-body">

                        </tbody>
                    </table>
                </div>

                <div class="all-incomplete-kits-body table-empty"></div>

                <div id="all-incomplete-kits-error-message"></div>

            </div>
        </div>
<!--end pagina visualizzazione di tutti i kit incompleti-->

<!--pagina visualizzazione delle cronologia dei kit-->
        <div data-role="page" id="see-kits-history">
            <div class="kit-create-label box-shadow-bottom padding-20">
                <p class="font-x-large blue-color">Cronologia kit</p>
            </div>

            <div class="ui-grid-d center back-home-buttons">
                <div class="ui-block-a"><a class="ui-shadow ui-btn ui-corner-all ui-icon-arrow-l ui-btn-icon-notext ui-btn-inline" data-rel="back">Button</a></div>
                <div class="ui-block-b"><a href="#main-content" class="ui-shadow ui-btn ui-corner-all ui-icon-home ui-btn-icon-notext ui-btn-inline">Button</a></div>
            </div>

            <div id="all-kit-history-error-message"></div>
            <div class="table-label"><p class="font-xx-large center-text line-height-3 blue-color"><b>Tabella della cronologia dei kit</b></p></div>
            <div class="table-container">
                <table data-role="table" id="all-kit-history-table" data-mode="reflow" class="ui-responsive">
                    <thead>
                    <tr class="box-shadow-bottom">
                        <th data-priority="2" class="border-right-no-color font-x-large padding-10 center-text">Nome kit</th>
                        <th data-priority="2" class="border-right-no-color font-x-large padding-10 center-text">Nome oggetto</th>
                        <th data-priority="4" class="border-right-no-color font-x-large padding-10 center-text">Data</th>
                        <th data-priority="5" class="border-right-no-color font-x-large padding-10 center-text">Ambiente</th>
                    </tr>
                    </thead>
                    <tbody id="all-kit-history-body">

                    </tbody>
                </table>
            </div>

            <div class="all-kit-history-body table-empty"></div>
        </div>
<!--end pagina visualizzazione della cronologia dei kit-->

<!--pagina chiusura kit-->
        <div data-role="page" id="close-kit">
            <div class="kit-create-label box-shadow-bottom padding-20">
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
                        <th data-priority="2" class="border-right-no-color font-x-large padding-10 center-text">Nome oggetto</th>
                        <th data-priority="4" class="border-right-no-color font-x-large padding-10 center-text">Tipologia oggetto</th>
                        <th data-priority="5" class="border-right-no-color font-x-large padding-10 center-text"></th>
                    </tr>
                    </thead>
                    <tbody id="close-kit-body">

                    </tbody>
                </table>
            </div>

            <div class="close-kit-body table-empty"></div>

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
                        <li><a href="#insert-type-popup" data-rel="popup" data-position-to="window" data-transition="fade" class="ui-btn font-large blue-background white-color bold-text">Inserisci tipologia</a></li>
                        <li><a href="#update-type-popup" id="update-type-popup-button" data-rel="popup" data-position-to="window" data-transition="fade" class="ui-btn font-large blue-background white-color bold-text">Aggiorna tipologia</a></li>
                    </ul>
                </div>
            </div>

            <div class="ui-grid-d center back-home-buttons">
                <div class="ui-block-a"><a class="ui-shadow ui-btn ui-corner-all ui-icon-arrow-l ui-btn-icon-notext ui-btn-inline" data-rel="back">Button</a></div>
                <div class="ui-block-b"><a href="#main-content" class="ui-shadow ui-btn ui-corner-all ui-icon-home ui-btn-icon-notext ui-btn-inline">Button</a></div>
            </div>

            <div data-role="content">
                <div class="list-type-label">
                    <p class="font-x-large orange-color bold-text">Lista delle tipologie disponibili</p>
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
                            <div class="ui-block-a"><a href="#" id="add-type" class="ui-btn ui-shadow ui-corner-all green-color border-green-1 inset-shadow-green">AGGIUNGI TIPOLOGIA</a></div>
                            <div class="ui-block-b"><a href="#" id="close-type" class="ui-btn ui-shadow ui-corner-all red-color border-red-1 inset-shadow-orange">CHIUDI</a></div>
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
                            <div class="ui-block-a"><a href="#" id="update-type" class="ui-btn ui-shadow ui-corner-all green-color border-green-1 inset-shadow-green">AGGIORNA TIPOLOGIA</a></div>
                            <div class="ui-block-b"><a href="#" id="close-update-type" class="ui-btn ui-shadow ui-corner-all red-color border-red-1 inset-shadow-orange">CHIUDI</a></div>
                        </div>
                    </fieldset>
                </form>
            </div>

            <div id="see-type-error-popup" class="error-popup" data-role="popup" data-overlay-theme="a" data-history="false">
                <p class="error-title font-large"></p>
                <span class="font-medium padding-10"></span>
            </div>

            <div data-role="popup" id="delete-type-confirm" class="confirm-delete padding-20-40" data-history="false" data-overlay-theme="a">
                <div data-role="content">
                    <h3 class="delete-type-confirm-header center-text blue-color margin-bottom-30 font-x-large"></h3>
                    <p class="delete-type-confirm-text center-text margin-bottom-30"></p>
                    <a href="#" class="delete-type-confirm-button width-90 margin-lr-auto border-red-1 red-color inset-shadow-orange" data-role="button" data-rel="back">Elimina tipologia</a>
                    <a href="#" class="width-90 margin-lr-auto border-green-1 green-color inset-shadow-green" data-role="button" data-rel="back">Anulla</a>
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
                        <li><a href="#update-object-tag-popup" id="update-object-tag-popup-button" data-rel="popup" data-position-to="window" data-transition="fade" class="ui-btn font-large blue-background white-color">Riassoccia tag</a></li>
                        <li><a href="#tag-status-page" id="tag-status" class="ui-btn font-large blue-background white-color">Stato tag</a></li>
                    </ul>
                </div>
            </div>

            <div class="ui-grid-d center back-home-buttons">
                <div class="ui-block-a"><a class="ui-shadow ui-btn ui-corner-all ui-icon-arrow-l ui-btn-icon-notext ui-btn-inline" data-rel="back">Button</a></div>
                <div class="ui-block-b"><a href="#main-content" class="ui-shadow ui-btn ui-corner-all ui-icon-home ui-btn-icon-notext ui-btn-inline">Button</a></div>
            </div>

            <div data-role="content">
                <div class="list-type-label">
                    <p class="font-x-large orange-color bold-text">Lista degli oggetti disponibili</p>
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

<!--                        <div class="input-type-container">-->
<!--                            <input class="font-large center-text border-blue-2" type="text" id="bar-code" hidden>-->
<!--                        </div>-->

                        <div class="input-type-container">
                            <input class="font-large center-text border-blue-2" type="text" name="object-field" id="object-field" placeholder="Inserisci descrizione oggetto">
                        </div>

                        <div id="insert-object-message" class="border-radius-10"></div>

                        <div class="ui-grid-a ui-responsive">
                            <div class="ui-block-a"><a href="#" id="add-object-popup" class="ui-btn ui-shadow ui-corner-all green-color border-green-1 inset-shadow-green">AGGIUNGI OGGETTO</a></div>
                            <div class="ui-block-b"><a href="#" id="close-object-popup" class="ui-btn ui-shadow ui-corner-all red-color border-red-1 inset-shadow-orange">CHIUDI</a></div>
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
                            <a href="#" id="update-object-description" class="ui-btn ui-shadow ui-corner-all green-color ui-responsive border-green-1 inset-shadow-green">AGGIORNA DESCRIZIONE</a>
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
                            <a href="#" id="update-object-type" class="ui-btn ui-shadow ui-corner-all green-color border-green-1 ui-responsive inset-shadow-green">AGGIORNA TIPOLOGIA</a>
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
                            <a href="#" id="update-object-tag" class="ui-btn ui-shadow ui-corner-all green-color border-green-1 ui-responsive inset-shadow-green">AGGIORNA TAG</a>
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

            <div id="see-objects-error-popup" class="error-popup" data-role="popup" data-overlay-theme="a" data-history="false">
                <p class="error-title font-large"></p>
                <span class="font-medium padding-10"></span>
            </div>

            <div data-role="popup" id="delete-object-confirm" class="confirm-delete padding-20-40" data-history="false" data-overlay-theme="a">
                <div data-role="content">
                    <h3 class="delete-object-confirm-header center-text blue-color margin-bottom-30 font-x-large"></h3>
                    <p class="delete-object-confirm-text center-text margin-bottom-30"></p>
                    <a href="#" id="delete-object-confirm-button" class="delete-object-confirm-button width-90 margin-lr-auto border-orange-1 red-color inset-shadow-orange" data-role="button" data-rel="back">Elimina oggetto</a>
                    <a href="#" class="width-90 margin-lr-auto border-green-1 green-color inset-shadow-green" data-role="button" data-rel="back">Anulla</a>
                </div>
            </div>
        </div>
<!--end pgina inserimento oggetto-->

        <div data-role="page" id="tag-status-page">
            <div class="kit-create-label box-shadow-bottom padding-20">
                <p class="font-x-large blue-color">Informazioni sui tag</p>
            </div>

            <div class="ui-grid-d center back-home-buttons">
                <div class="ui-block-a"><a class="ui-shadow ui-btn ui-corner-all ui-icon-arrow-l ui-btn-icon-notext ui-btn-inline" data-rel="back">Button</a></div>
                <div class="ui-block-b"><a href="#main-content" class="ui-shadow ui-btn ui-corner-all ui-icon-home ui-btn-icon-notext ui-btn-inline">Button</a></div>
            </div>

            <div class="table-container">
                <table data-role="table" id="tag-status-table" data-mode="reflow" class="ui-responsive">
                    <thead>
                    <tr class="box-shadow-bottom">
                        <th data-priority="2" class="border-right-no-color font-x-large padding-10 center-text">Mac</th>
                        <th data-priority="4" class="border-right-no-color font-x-large padding-10 center-text">Nome</th>
                        <th data-priority="5" class="border-right-no-color font-x-large padding-10 center-text">Ancora riferimento</th>
                        <th data-priority="6" class="border-right-no-color font-x-large padding-10 center-text">L'ultimo aggiornamento</th>
                        <th data-priority="7" class="border-right-no-color font-x-large padding-10 center-text">Stato bateria</th>
                    </tr>
                    </thead>

                    <tbody id="tag-status-body">

                    </tbody>
                </table>
            </div>

            <div class="tag-status-body table-empty"></div>

        </div>

        <div data-role="page" id="see-kit-objects">
            <div class="kit-create-label box-shadow-bottom padding-20">
                <p class="font-x-large blue-color">Oggetti</p>
            </div>

            <div class="ui-grid-d center back-home-buttons">
                <div class="ui-block-a"><a class="ui-shadow ui-btn ui-corner-all ui-icon-arrow-l ui-btn-icon-notext ui-btn-inline" data-rel="back">Button</a></div>
                <div class="ui-block-b"><a href="#main-content" class="ui-shadow ui-btn ui-corner-all ui-icon-home ui-btn-icon-notext ui-btn-inline">Button</a></div>
            </div>
            <div class="table-container">
                <table data-role="table" id="see-kit-objects-table" data-mode="reflow" class="ui-responsive">
                    <thead>
                    <tr class="box-shadow-bottom">
                        <th data-priority="2" class="border-right-no-color font-x-large padding-10 center-text">Nome oggetto</th>
                        <th data-priority="4" class="border-right-no-color font-x-large padding-10 center-text">Tipologia oggetto</th>
                        <th data-priority="5" class="border-right-no-color font-x-large padding-10 center-text">Tag oggetto</th>
                    </tr>
                    </thead>

                    <tbody id="see-kit-objects-body">

                    </tbody>
                </table>
            </div>

            <div class="see-kit-objects-body table-empty"></div>

        </div>

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
        <script src="js/tag-information.js"></script>
<!--end inserimento file javascript nella pagina-->

    </body>
</html>
