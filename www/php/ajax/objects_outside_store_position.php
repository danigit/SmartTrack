<?php
/**
 * Created by IntelliJ IDEA.
 * User: surpa
 * Date: 19/10/18
 * Time: 12.10
 */

require_once 'cs_interaction.php';
require_once 'helper.php';

/**
 * Classe che recupera tutti i kit
 */
class objects_outside_store_position extends cs_interaction{
    private $result;

    protected function input_elaboration(){}

    protected function get_db_informations(){

        $connection = $this->get_connection();
        $this->result = $connection->get_objects_outside_store_position();

        if(is_error($this->result))
            $this->json_error("Errore nel recupero delle correlazioni tag-oggetto");
    }

    protected function get_returned_data(){
        return array($this->result);
    }
}

$objects_outside_store_position = new objects_outside_store_position();
$objects_outside_store_position->execute();