<?php
/**
 * Developer; Daniel Surpanu
 */

require_once 'cs_interaction.php';
require_once 'helper.php';

/**
 * Classe che recupera i kit aperti
 */
class get_open_kits extends cs_interaction{
    private $result;

    protected function input_elaboration(){}

    protected function get_db_informations(){

        $connection = $this->get_connection();
        $this->result = $connection->get_open_kits();

        if(is_error($this->result))
            $this->json_error("Errore nel recupero dei kit aperti");
    }

    protected function get_returned_data(){
        return array($this->result);
    }
}

$get_open_kits = new get_open_kits();
$get_open_kits->execute();