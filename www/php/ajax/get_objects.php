<?php
/**
 * Created by IntelliJ IDEA.
 * User: surpa
 * Date: 02/10/18
 * Time: 17.45
 */

require_once 'cs_interaction.php';
require_once 'helper.php';

/**
 * Classe che recupera tutti i tipi degli oggetti
 */
class get_objects extends cs_interaction{
    private $result;

    protected function input_elaboration(){}

    protected function get_db_informations(){

        $connection = $this->get_connection();
        $this->result = $connection->get_objects();

        if(is_error($this->result))
            $this->json_error("Errore nel recupero degli oggetti");
    }

    protected function get_returned_data(){
        return array($this->result);
    }
}

$get_objects = new get_objects();
$get_objects->execute();