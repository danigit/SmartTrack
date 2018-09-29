<?php
/**
 * Created by IntelliJ IDEA.
 * User: surpa
 * Date: 26/09/18
 * Time: 19.14
 */

require_once 'helper.php';
require_once 'cs_interaction.php';

/**
 * Classe che recupera tutti gli oggetti di un certo tipo
 */
class get_objects_by_type extends cs_interaction {

    private $type, $result;

    protected function input_elaboration(){
        $this->type = $this->validate_string('type');

        if(!$this->type)
            $this->json_error("Nessun tipo ricevuto");

    }

    protected function get_db_informations(){
        $connection = $this->get_connection();
        $this->result = $connection->get_objects_by_type($this->type);

        if(is_error($this->result))
            $this->json_error("Errore nel recupero degli oggetti");
    }

    protected function get_returned_data(){
        return array($this->result);
    }
}

$get_objects_type = new get_objects_by_type();
$get_objects_type->execute();