<?php
/**
 * Created by IntelliJ IDEA.
 * User: surpa
 * Date: 13/10/18
 * Time: 16.48
 */

require_once 'cs_interaction.php';
require_once 'helper.php';

/**
 * Classe che recupera tutti i kit
 */
class get_incomplete_kits extends cs_interaction{
    private $result;

    protected function input_elaboration(){}

    protected function get_db_informations(){

        $connection = $this->get_connection();
        $this->result = $connection->get_incomplete_kits();

        if(is_error($this->result))
            $this->json_error("Errore nel recupero dei kit");
    }

    protected function get_returned_data(){
        return array($this->result);
    }
}

$get_incomplete_kits = new get_incomplete_kits();
$get_incomplete_kits->execute();