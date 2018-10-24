<?php
/**
 * Created by IntelliJ IDEA.
 * User: surpa
 * Date: 11/10/18
 * Time: 13.41
 */

require_once 'cs_interaction.php';
require_once 'helper.php';

/**
 * Classe che recupera tutti i kit
 */
class get_objects_kit_position extends cs_interaction{
    private $id, $result;

    protected function input_elaboration(){
        $this->id = $this->validate_string('id');

        if ($this->id === false)
            $this->json_error('Nessun id passato');
    }

    protected function get_db_informations(){

        $connection = $this->get_connection();
        $this->result = $connection->get_objects_kit_position($this->id);

        if(is_error($this->result))
            $this->json_error("Errore nel recupero della posizione degli oggetti");
    }

    protected function get_returned_data(){
        return array($this->result);
    }
}

$get_objects_kits_position = new get_objects_kit_position();
$get_objects_kits_position->execute();