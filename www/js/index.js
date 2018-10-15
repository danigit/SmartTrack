/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
let app = {
    // Application Constructor
    initialize: function() {
        this.bind();
    },

    bind: function(){
        document.addEventListener('deviceready', this.deviceready, false);

        $('#main-content').on('pagebeforeshow', function () {
            $('#open-kit-body').empty();
            populateOpenKits();
        });

        $('#crea-kit-page').on('pageinit', function () {
            createKit();
            controlRecoverKit();
        });

        $('#all-kits').on('pageinit', function () {
            seeIncompleteKits();
        });

        $('#see-all-kits').on('pageinit', function () {
            seeAllKits();
        });

        $('#see-kits-history').on('pageinit', function () {
            seeKitsHistory();
        });

        $('#close-kit').on('pagebeforeshow', function () {
            closeKit();
        });

        $('#insert-type').on('pagebeforeshow', function () {
            seeTypes();
        });

        $('#insert-object').on('pagebeforeshow', function () {
            seeObjects();
        });
    }
};

$(document).ready( function () {
    app.initialize();
    populateOpenKits();
});
