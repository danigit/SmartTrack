<?php
/**
 * Developer: Daniel Surpanu
 */

require_once 'cs_interaction.php';
require_once 'helper.php';

/**
 * Classe che recupera tutti i tipi degli oggetti
 */
class get_types extends cs_interaction{
    private $result;

    protected function input_elaboration(){}

    protected function get_db_informations(){

        $connection = $this->get_connection();
        $this->result = $connection->get_types();

        if(is_error($this->result))
            $this->json_error("Errore nel recupero delle tipologie");
    }

    protected function get_returned_data(){
        return array($this->result);
    }
}

$get_types = new get_types();
$get_types->execute();