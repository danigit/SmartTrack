<?php
/**
 * Created by IntelliJ IDEA.
 * User: surpa
 * Date: 28/09/18
 * Time: 11.08
 */

require_once 'helper.php';
require_once 'cs_interaction.php';

/**
 * Classe che recupera tutti gli oggetti di un certo tipo
 */
class get_objects_by_kit extends cs_interaction {

    private $id, $result;

    protected function input_elaboration(){
        $this->id = $this->validate_string('id');

        if(!$this->id)
            $this->json_error("Nessun id ricevuto");

    }

    protected function get_db_informations(){
        $connection = $this->get_connection();
        $this->result = $connection->get_objects_by_kit($this->id);

        if(is_error($this->result))
            $this->json_error("Errore nel recupero degli oggetti");
    }

    protected function get_returned_data(){
        return array($this->result);
    }
}

$get_objects_by_kit = new get_objects_by_kit();
$get_objects_by_kit->execute();