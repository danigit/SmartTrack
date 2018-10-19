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
class get_tag_status extends cs_interaction{
    private $result;

    protected function input_elaboration(){}

    protected function get_db_informations(){

        $connection = $this->get_connection();
        $this->result = $connection->get_tags_status();

        if(is_error($this->result))
            $this->json_error("Errore nel recupero dei kit");
    }

    protected function get_returned_data(){
        return array($this->result);
    }
}

$get_tag_status = new get_tag_status();
$get_tag_status->execute();