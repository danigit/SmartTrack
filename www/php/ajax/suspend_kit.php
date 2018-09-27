<?php
/**
 * Created by IntelliJ IDEA.
 * User: surpa
 * Date: 27/09/18
 * Time: 12.27
 */
require_once 'helper.php';
require_once 'cs_interaction.php';

class suspend_kit extends cs_interaction {

    private $count, $data, $result;

    protected function input_elaboration(){
        $this->count = $this->validate_string('count');
        for($i = 0; $i < $this->count; $i++){
            $this->data[] = $this->validate_string($i);
        }
    }

    protected function get_db_informations(){
        $connection = $this->get_connection();
        $this->result = $connection->suspend_kit($this->data);

        if(is_error($this->result))
            $this->json_error("Errore nel recupero degli oggetti");
    }

    protected function get_returned_data(){
        return array($this->result);
    }
}

$suspend_kit = new suspend_kit();
$suspend_kit->execute();