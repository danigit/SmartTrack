<?php
/**
 * Created by PhpStorm.
 * User: Daniel Surpanu
 * Date: 8/22/2018
 * Time: 11:52 AM
 */
require_once 'is_logged.php';

class logout extends is_logged {

    protected function input_elaboration(){
        // TODO: Implement input_elaboration() method.
    }

    protected function get_db_informations(){
        session_start();
        $_SESSION = array();
        session_regenerate_id();
        session_write_close();
    }

    protected function get_returned_data(){
        return array();
    }
}

$logout = new logout();
$logout->execute();