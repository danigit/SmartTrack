<?php
/**
 * Created by IntelliJ IDEA.
 * User: simonabettoli
 * Date: 23/10/18
 * Time: 15:51
 */

require_once 'cs_interaction.php';
require_once 'helper.php';

/**
 * Classe che recupera tutti i kit
 */
class get_closed_kits extends cs_interaction{
    private $result;

    protected function input_elaboration(){}

    protected function get_db_informations(){

        $connection = $this->get_connection();
        $this->result = $connection->get_closed_kits();

        if(is_error($this->result))
            $this->json_error("Errore nel recupero dei kit");
    }

    protected function get_returned_data(){
        return array($this->result);
    }
}

$get_all_kits = new get_closed_kits();
$get_all_kits->execute();