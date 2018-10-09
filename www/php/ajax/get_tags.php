<?php
/**
 * Created by IntelliJ IDEA.
 * User: surpa
 * Date: 09/10/18
 * Time: 14.55
 */

require_once 'cs_interaction.php';
require_once 'helper.php';

/**
 * Classe che recupera tutti i tipi degli oggetti
 */
class get_tags extends cs_interaction{
    private $result;

    protected function input_elaboration(){}

    protected function get_db_informations(){

        $connection = $this->get_connection();
        $this->result = $connection->get_tags();

        if(is_error($this->result))
            $this->json_error("Errore nel recupero dei tag");
    }

    protected function get_returned_data(){
        return array($this->result);
    }
}

$get_tags = new get_tags();
$get_tags->execute();