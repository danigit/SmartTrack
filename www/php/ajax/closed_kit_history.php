<?php
/**
 * Created by IntelliJ IDEA.
 * User: simonabettoli
 * Date: 16/10/18
 * Time: 15:16
 */

require_once 'cs_interaction.php';
require_once 'helper.php';

/**
 * Classe che recupera tutti i kit
 */
class closed_kit_history extends cs_interaction{
    private $result;

    protected function input_elaboration(){}

    protected function get_db_informations(){

        $connection = $this->get_connection();
        $this->result = $connection->closed_kit_history();

        if(is_error($this->result))
            $this->json_error("Errore nel recupero dei kit");
    }

    protected function get_returned_data(){
        return array($this->result);
    }
}

$closed_kit_history = new closed_kit_history();
$closed_kit_history->execute();