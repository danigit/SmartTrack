<?php
/**
 * Created by IntelliJ IDEA.
 * User: surpa
 * Date: 10/10/18
 * Time: 23.43
 */

require_once 'cs_interaction.php';
require_once 'helper.php';

/**
 * Classe che recupera tutti i kit
 */
class get_kits_history extends cs_interaction{
    private $result;

    protected function input_elaboration(){}

    protected function get_db_informations(){

        $connection = $this->get_connection();
        $this->result = $connection->get_kits_history();

        if(is_error($this->result))
            $this->json_error("Errore nel recupero dei kit");
    }

    protected function get_returned_data(){
        return array($this->result);
    }
}

$get_kits_history = new get_kits_history();
$get_kits_history->execute();