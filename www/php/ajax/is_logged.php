<?php
/**
 * Created by PhpStorm.
 * User: Daniel Surpanu
 * Date: 8/22/2018
 * Time: 11:48 AM
 */
require_once 'cs_interaction.php';

abstract class is_logged extends cs_interaction {
    function __construct(){
        cs_interaction::__construct();

        if(!$this->check_session())
            $this->json_error("L'utente e' gia' logato", 1);
    }

    /**
     * Funzione che controlla se la sessione e' attiva
     * @return bool - true se la sessione e attiva, false altrimenti
     */
    protected function check_session(){
        if(!isset($_SESSION['username'], $_SESSION['secure']))
            return false;
        return true;
    }
}