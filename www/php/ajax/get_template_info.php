<?php
/**
 * Created by IntelliJ IDEA.
 * User: surpa
 * Date: 17/10/18
 * Time: 14.48
 */

require_once 'cs_interaction.php';
require_once 'helper.php';

/**
 * Classe che recupera tutti i tipi degli oggetti
 */
class get_template_info extends cs_interaction{
    private $id, $result;

    protected function input_elaboration(){
        $this->id = $this->validate_string('id');

        if($this->id === false)
            $this->json_error('Nessun kit ricevuto');
    }

    protected function get_db_informations(){

        $connection = $this->get_connection();
        $this->result = $connection->get_template_info($this->id);

        if(is_error($this->result))
            $this->json_error("Errore nel recupero dei kit");
    }

    protected function get_returned_data(){
        return array($this->result);
    }
}

$get_template_info = new get_template_info();
$get_template_info->execute();