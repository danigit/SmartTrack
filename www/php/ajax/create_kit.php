<?php
/**
 * Created by IntelliJ IDEA.
 * User: surpa
 * Date: 26/09/18
 * Time: 22.25
 */
require_once 'helper.php';
require_once 'cs_interaction.php';

/**
 * Classe che si occupa della creazione dei kit
 */
class create_kit extends cs_interaction {

    private $count, $description, $data, $result;

    protected function input_elaboration(){
        $this->count = $this->validate_string('count');
        $this->description = $this->validate_string('description');

        for($i = 0; $i < $this->count; $i++){
            $this->data[] = $this->validate_string($i);
        }
    }

    protected function get_db_informations(){
        $connection = $this->get_connection();
        $this->result = $connection->create_kit($this->description, $this->data);

        if(is_error($this->result))
            $this->json_error("Errore nel creare il kit");
    }

    protected function get_returned_data(){
        return array($this->result);
    }
}

$create_kit = new create_kit();
$create_kit->execute();