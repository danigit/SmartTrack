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
class tag_object_correlation extends cs_interaction{
    private $result;

    protected function input_elaboration(){}

    protected function get_db_informations(){

        $connection = $this->get_connection();
        $this->result = $connection->get_tag_object_correlation();

        if(is_error($this->result))
            $this->json_error("Errore nel recupero delle correlazioni tag-oggetto");
    }

    protected function get_returned_data(){
        return array($this->result);
    }
}

$tag_object_correlation = new tag_object_correlation();
$tag_object_correlation->execute();